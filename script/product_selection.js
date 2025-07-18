// JavaScript para a página de seleção de produtos

document.addEventListener('DOMContentLoaded', () => {
    // Carregar informações das seleções anteriores
    const selectedCinema = JSON.parse(localStorage.getItem('selectedCinema'));
    const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
    const selectedSession = JSON.parse(localStorage.getItem('selectedSession'));
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    // Atualizar resumo do pedido
    if (selectedCinema && selectedMovie && selectedSession && selectedSeats) {
        document.getElementById('cinema-name').textContent = `Cinema: ${selectedCinema.name}`;
        document.getElementById('movie-info').textContent = `Filme: ${selectedMovie.title}`;
        document.getElementById('session-info').textContent = `Sessão: ${selectedSession.time} - ${selectedSession.room}`;
        document.getElementById('seats-info').textContent = `Assentos: ${selectedSeats.seats.join(', ')} (${selectedSeats.quantity} ingresso${selectedSeats.quantity > 1 ? 's' : ''})`;
    }

    const qtyButtons = document.querySelectorAll('.qty-btn');
    const continueBtn = document.getElementById('continue-btn');
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    
    let cart = [];
    let ticketsTotal = selectedSeats ? selectedSeats.totalPrice : 0;

    // Eventos do modal do carrinho
    cartIcon.addEventListener('click', () => {
        cartModal.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    // Atualizar total dos ingressos
    updateCartDisplay();

    // Adicionar eventos aos botões de quantidade
    qtyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sizeOption = button.closest('.size-option');
            const product = sizeOption.getAttribute('data-product');
            const size = sizeOption.getAttribute('data-size');
            const price = parseFloat(sizeOption.getAttribute('data-price'));
            const quantitySpan = sizeOption.querySelector('.quantity');
            let quantity = parseInt(quantitySpan.textContent);

            if (button.classList.contains('plus')) {
                quantity++;
            } else if (button.classList.contains('minus') && quantity > 0) {
                quantity--;
            }

            quantitySpan.textContent = quantity;

            // Atualizar carrinho
            updateCart(product, size, price, quantity);
        });
    });

    function updateCart(product, size, price, quantity) {
        const itemKey = `${product}-${size}`;
        const existingItemIndex = cart.findIndex(item => item.key === itemKey);

        if (quantity === 0) {
            // Remover item do carrinho
            if (existingItemIndex !== -1) {
                cart.splice(existingItemIndex, 1);
            }
        } else {
            // Adicionar ou atualizar item no carrinho
            const item = {
                key: itemKey,
                name: `${formatProductName(product)} ${formatSize(size)}`,
                price: price,
                quantity: quantity,
                total: price * quantity
            };

            if (existingItemIndex !== -1) {
                cart[existingItemIndex] = item;
            } else {
                cart.push(item);
            }
        }

        updateCartDisplay();
    }

    function formatProductName(product) {
        const names = {
            'pipoca-salgada': 'Pipoca Salgada',
            'pipoca-doce': 'Pipoca Doce',
            'refrigerante': 'Refrigerante',
            'suco': 'Suco Natural',
            'agua': 'Água Mineral'
        };
        return names[product] || product;
    }

    function formatSize(size) {
        const sizes = {
            'pequena': 'Pequena',
            'pequeno': 'Pequeno',
            'media': 'Média',
            'medio': 'Médio',
            'grande': 'Grande'
        };
        return sizes[size] || size;
    }

    function updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        const ticketsTotalSpan = document.getElementById('tickets-total');
        const productsTotalSpan = document.getElementById('products-total');
        const grandTotalSpan = document.getElementById('grand-total');
        const cartCount = document.getElementById('cart-count');
        const cartTotalDisplay = document.getElementById('cart-total-display');

        // Limpar itens do carrinho
        cartItems.innerHTML = '';

        // Adicionar itens do carrinho
        let productsTotal = 0;
        let totalItems = 0;
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span class="item-name">${item.name} (${item.quantity}x)</span>
                <span class="item-price">R$ ${item.total.toFixed(2).replace('.', ',')}</span>
            `;
            cartItems.appendChild(cartItem);
            productsTotal += item.total;
            totalItems += item.quantity;
        });

        const grandTotal = ticketsTotal + productsTotal;

        // Atualizar totais
        ticketsTotalSpan.textContent = `R$ ${ticketsTotal.toFixed(2).replace('.', ',')}`;
        productsTotalSpan.textContent = `R$ ${productsTotal.toFixed(2).replace('.', ',')}`;
        grandTotalSpan.textContent = `R$ ${grandTotal.toFixed(2).replace('.', ',')}`;

        // Atualizar ícone do carrinho
        cartCount.textContent = totalItems;
        cartTotalDisplay.textContent = `R$ ${grandTotal.toFixed(2).replace('.', ',')}`;
        
        // Mostrar/ocultar contador se não há itens
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Evento do botão continuar
    continueBtn.addEventListener('click', () => {
        // Salvar produtos selecionados no localStorage
        const productsTotal = cart.reduce((total, item) => total + item.total, 0);
        const orderSummary = {
            tickets: {
                total: ticketsTotal,
                quantity: selectedSeats.quantity,
                seats: selectedSeats.seats
            },
            products: {
                items: cart,
                total: productsTotal
            },
            grandTotal: ticketsTotal + productsTotal
        };

        localStorage.setItem('orderSummary', JSON.stringify(orderSummary));

        // Redirecionar para pagamento
        window.location.href = 'payment.html';
    });
});

