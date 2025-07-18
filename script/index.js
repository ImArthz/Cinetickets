// JavaScript para a página inicial

document.addEventListener('DOMContentLoaded', () => {
    // Botões de call-to-action
    const startBookingBtn = document.getElementById('start-booking');
    const startBookingBtn2 = document.getElementById('start-booking-2');

    // Adicionar eventos aos botões
    startBookingBtn.addEventListener('click', startBookingProcess);
    startBookingBtn2.addEventListener('click', startBookingProcess);

    // Limpar dados de sessões anteriores ao carregar a página inicial
    clearPreviousSession();
});

function startBookingProcess() {
    // Redirecionar para a página de seleção de cinema
    window.location.href = 'cinema_selection.html';
}

function clearPreviousSession() {
    // Limpar dados de sessões anteriores para garantir um novo fluxo limpo
    const keysToRemove = [
        'selectedCinema',
        'selectedMovie', 
        'selectedSession',
        'selectedSeats',
        'orderSummary',
        'paymentData'
    ];

    keysToRemove.forEach(key => {
        localStorage.removeItem(key);
    });
}

