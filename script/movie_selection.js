// JavaScript para a página de seleção de filmes

document.addEventListener('DOMContentLoaded', () => {
    // Função para obter parâmetros da URL
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            cinemaId: params.get('cinemaId'),
            cinemaNome: params.get('cinemaNome')
        };
    }

    // Busca as informações do cinema
    const urlParams = getUrlParams();
    let cinemaId = urlParams.cinemaId;
    let cinemaName = urlParams.cinemaNome;

    // Se não veio pela URL, tenta pegar do localStorage
    if (!cinemaId) {
        const selectedCinema = localStorage.getItem('selectedCinema');
        if (selectedCinema) {
            try {
                const cinema = JSON.parse(selectedCinema);
                cinemaId = cinema.id || cinema.nome;
                cinemaName = cinema.name || cinema.nome;
            } catch (e) {
                console.error('Erro ao parsear cinema do localStorage:', e);
            }
        }
    }

    if (!cinemaId && !cinemaName) {
        alert('Nenhum cinema selecionado. Redirecionando para a seleção de cinemas.');
        window.location.href = 'cinema_selection.html';
        return;
    }

    // Atualiza o nome do cinema na página
    document.getElementById('selected-cinema-name').textContent = cinemaName;

    // Adicionar eventos aos botões de horário (delegação de eventos)
    const movieList = document.getElementById('movieList');
    movieList.addEventListener('click', function(event) {
        if (event.target.classList.contains('time-slot')) {
            const movieCard = event.target.closest('.movie-card');
            const movieTitle = movieCard.querySelector('h3').textContent;
            const time = event.target.dataset.time;
            const room = event.target.dataset.room;
            const sessionId = event.target.dataset.sessionId;

            // Obter dados do filme armazenados no card (se disponíveis)
            const movieData = movieCard.movieData || {};
            
            // Buscar dados completos do filme no card ou usar dados do movieData
            const moviePoster = movieData.poster || movieCard.querySelector('img')?.src || '../img/movie-default.svg';
            const movieSynopsis = movieData.sinopse || movieData.Sinopse || 'Sinopse não disponível';
            const movieGenre = movieData.genero || movieData.Genero || 'Gênero não informado';
            const movieTrailer = movieData.trailer || movieCard.dataset.trailer || null;

            // Salva os dados completos do filme no localStorage
            localStorage.setItem('selectedMovie', JSON.stringify({
                title: movieTitle,
                poster: moviePoster,
                synopsis: movieSynopsis,
                genre: movieGenre,
                trailer: movieTrailer
            }));

            // Salva a sessão escolhida no localStorage
            localStorage.setItem('selectedSession', JSON.stringify({
                movieTitle: movieTitle,
                time: time,
                room: room,
                sessionId: sessionId,
                cinemaId: cinemaId || cinemaName,
                cinemaName: cinemaName
            }));

            // Redireciona para a próxima página
            window.location.href = 'seat_selection.html';
        }
    });
});
