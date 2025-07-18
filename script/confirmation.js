// JavaScript para a página de confirmação

document.addEventListener('DOMContentLoaded', () => {
    // Carregar dados do pagamento
    const paymentData = JSON.parse(localStorage.getItem('paymentData'));
    const selectedCinema = JSON.parse(localStorage.getItem('selectedCinema'));
    const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
    const selectedSession = JSON.parse(localStorage.getItem('selectedSession'));

    if (!paymentData) {
        // Redirecionar se não houver dados de pagamento
        window.location.href = 'index.html';
        return;
    }

    // Gerar número do pedido
    const orderNumber = 'CT' + Date.now().toString().slice(-8);
    const orderDate = new Date();

    // Atualizar informações do recibo
    document.getElementById('order-number').textContent = orderNumber;
    document.getElementById('order-date').textContent = orderDate.toLocaleDateString('pt-BR');
    document.getElementById('order-time').textContent = orderDate.toLocaleTimeString('pt-BR');

    // Dados do cliente
    document.getElementById('customer-name').textContent = paymentData.customer.name;
    document.getElementById('customer-email').textContent = paymentData.customer.email;
    document.getElementById('customer-phone').textContent = paymentData.customer.phone || 'Não informado';

    // Detalhes da sessão
    document.getElementById('cinema-name').textContent = selectedCinema.name;
    document.getElementById('movie-title').textContent = selectedMovie.title;
    document.getElementById('session-datetime').textContent = `${orderDate.toLocaleDateString('pt-BR')} às ${selectedSession.time}`;
    document.getElementById('session-room').textContent = selectedSession.room;
    document.getElementById('selected-seats').textContent = paymentData.order.tickets.seats.join(', ');

    // Itens do pedido - Ingressos
    const ticketsList = document.getElementById('tickets-list');
    ticketsList.innerHTML = `
        <div class="item-line">
            <span>${paymentData.order.tickets.quantity} ingresso${paymentData.order.tickets.quantity > 1 ? 's' : ''}</span>
            <span>R$ ${paymentData.order.tickets.total.toFixed(2).replace('.', ',')}</span>
        </div>
    `;

    // Itens do pedido - Produtos
    if (paymentData.order.products.items.length > 0) {
        const productsSection = document.getElementById('products-section');
        const productsList = document.getElementById('products-list');
        
        productsSection.style.display = 'block';
        productsList.innerHTML = '';
        
        paymentData.order.products.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item-line';
            itemDiv.innerHTML = `
                <span>${item.name} (${item.quantity}x)</span>
                <span>R$ ${item.total.toFixed(2).replace('.', ',')}</span>
            `;
            productsList.appendChild(itemDiv);
        });
    }

    // Método de pagamento
    const paymentMethods = {
        'pix': 'PIX',
        'credit': 'Cartão de Crédito',
        'debit': 'Cartão de Débito'
    };
    
    document.getElementById('payment-method').textContent = paymentMethods[paymentData.method];

    // Mostrar QR Code se for PIX
    if (paymentData.method === 'pix') {
        document.getElementById('pix-qr').style.display = 'block';
    }

    // Totais
    document.getElementById('tickets-subtotal').textContent = `R$ ${paymentData.order.tickets.total.toFixed(2).replace('.', ',')}`;
    document.getElementById('products-subtotal').textContent = `R$ ${paymentData.order.products.total.toFixed(2).replace('.', ',')}`;
    document.getElementById('grand-total').textContent = `R$ ${paymentData.order.grandTotal.toFixed(2).replace('.', ',')}`;

    // Eventos dos botões
    const printBtn = document.getElementById('print-receipt');
    const downloadBtn = document.getElementById('download-receipt');
    const emailBtn = document.getElementById('email-receipt');
    const emailStatus = document.getElementById('email-status');

    printBtn.addEventListener('click', () => {
        window.print();
    });

    downloadBtn.addEventListener('click', () => {
        // Simular download do PDF
        const link = document.createElement('a');
        link.href = '#';
        link.download = `recibo-${orderNumber}.pdf`;
        
        // Mostrar mensagem de download
        const originalText = downloadBtn.textContent;
        downloadBtn.textContent = '📄 Baixando...';
        downloadBtn.disabled = true;
        
        setTimeout(() => {
            downloadBtn.textContent = originalText;
            downloadBtn.disabled = false;
            alert('Download do recibo iniciado!');
        }, 1500);
    });

    emailBtn.addEventListener('click', () => {
        // Simular envio de email
        const originalText = emailBtn.textContent;
        emailBtn.textContent = '📧 Enviando...';
        emailBtn.disabled = true;
        
        setTimeout(() => {
            emailBtn.textContent = originalText;
            emailBtn.disabled = false;
            
            // Mostrar status de sucesso
            emailStatus.style.display = 'block';
            
            // Ocultar status após 5 segundos
            setTimeout(() => {
                emailStatus.style.display = 'none';
            }, 5000);
        }, 2000);
    });

    // Salvar dados da compra para relatórios (simulação)
    const purchaseRecord = {
        orderNumber: orderNumber,
        date: orderDate.toISOString(),
        cinema: selectedCinema,
        movie: selectedMovie,
        session: selectedSession,
        customer: paymentData.customer,
        order: paymentData.order,
        paymentMethod: paymentData.method
    };

    // Salvar no localStorage para simular banco de dados
    const existingPurchases = JSON.parse(localStorage.getItem('purchaseRecords')) || [];
    existingPurchases.push(purchaseRecord);
    localStorage.setItem('purchaseRecords', JSON.stringify(existingPurchases));

    // Limpar dados temporários do carrinho
    localStorage.removeItem('selectedCinema');
    localStorage.removeItem('selectedMovie');
    localStorage.removeItem('selectedSession');
    localStorage.removeItem('selectedSeats');
    localStorage.removeItem('orderSummary');
    localStorage.removeItem('paymentData');
});

