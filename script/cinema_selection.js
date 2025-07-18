// JavaScript para a página de seleção de cinema

document.addEventListener('DOMContentLoaded', () => {
    const cinemaCards = document.querySelectorAll('.cinema-card');
    const selectButtons = document.querySelectorAll('.select-cinema-btn');

    // Adicionar evento de clique para cada cartão de cinema
    cinemaCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remover seleção anterior
            cinemaCards.forEach(c => c.classList.remove('selected'));
            
            // Adicionar seleção ao cartão clicado
            card.classList.add('selected');
        });
    });

    // Adicionar evento de clique para os botões de seleção
    selectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que o evento se propague para o cartão
            
            const cinemaCard = button.closest('.cinema-card');
            const cinemaId = cinemaCard.getAttribute('data-cinema-id');
            const cinemaName = cinemaCard.querySelector('h3').textContent;
            
            // Salvar a seleção no localStorage
            localStorage.setItem('selectedCinema', JSON.stringify({
                id: cinemaId,
                name: cinemaName
            }));
            
            // Redirecionar para a página de seleção de filmes
            window.location.href = 'movie_selection.html';
        });
    });
});

