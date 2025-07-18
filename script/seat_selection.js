// JavaScript para a página de seleção de assentos

document.addEventListener('DOMContentLoaded', () => {
    console.log('=== SEAT SELECTION SCRIPT INICIADO ===');
    
    // Carregar informações das seleções anteriores
    let selectedCinema = JSON.parse(localStorage.getItem('selectedCinema') || '{}');
    let selectedMovie = JSON.parse(localStorage.getItem('selectedMovie') || '{}');
    let selectedSession = JSON.parse(localStorage.getItem('selectedSession') || '{}');

    console.log('Dados brutos do localStorage:');
    console.log('selectedCinema:', localStorage.getItem('selectedCinema'));
    console.log('selectedMovie:', localStorage.getItem('selectedMovie'));
    console.log('selectedSession:', localStorage.getItem('selectedSession'));
    
    console.log('Dados parseados:');
    console.log('selectedCinema:', selectedCinema);
    console.log('selectedMovie:', selectedMovie);
    console.log('selectedSession:', selectedSession);

    // Fallback para formato antigo se as informações não estiverem no novo formato
    if (!selectedCinema.name) {
        selectedCinema = {
            name: localStorage.getItem('selectedCinemaName') || 'Cinema não selecionado'
        };
        console.log('Usando fallback para cinema:', selectedCinema);
    }
    
    if (!selectedMovie.title) {
        selectedMovie = {
            title: localStorage.getItem('selectedMovieTitle') || 'Filme não selecionado',
            synopsis: 'Sinopse não disponível',
            genre: 'Gênero não informado',
            trailer: null
        };
        console.log('Usando fallback para filme:', selectedMovie);
    }
    
    if (!selectedSession.time) {
        selectedSession = {
            time: localStorage.getItem('selectedSessionTime') || 'Horário não selecionado',
            room: localStorage.getItem('selectedSessionRoom') || 'Sala não selecionada'
        };
        console.log('Usando fallback para sessão:', selectedSession);
    }

    // Função para formatar data e hora
    function formatDateTime(dateTimeString) {
        if (!dateTimeString) return 'Horário não disponível';
        
        try {
            const date = new Date(dateTimeString);
            if (!isNaN(date.getTime())) {
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${day}/${month} às ${hours}:${minutes}`;
            }
        } catch (e) {
            console.log('Erro ao parsear data:', e);
        }
        
        return dateTimeString;
    }

    // Função para extrair ID do YouTube de uma URL
    function extractYouTubeId(url) {
        if (!url) return null;
        
        // Múltiplos padrões para diferentes formatos de URL do YouTube
        const patterns = [
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
            /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        
        return null;
    }

    // Função para configurar o trailer
    function setupTrailer() {
        console.log('=== CONFIGURANDO TRAILER ===');
        console.log('selectedMovie objeto completo:', selectedMovie);
        console.log('selectedMovie.trailer:', selectedMovie.trailer);
        
        const trailerSection = document.getElementById('movie-trailer');
        const trailerIframe = document.getElementById('trailer-iframe');
        
        console.log('Elementos encontrados:');
        console.log('trailerSection:', trailerSection);
        console.log('trailerIframe:', trailerIframe);
        
        if (!trailerSection || !trailerIframe) {
            console.error('Elementos do trailer não encontrados no DOM!');
            return;
        }
        
        if (selectedMovie.trailer) {
            console.log('Trailer URL encontrada:', selectedMovie.trailer);
            const youtubeId = extractYouTubeId(selectedMovie.trailer);
            console.log('YouTube ID extraído:', youtubeId);
            
            if (youtubeId) {
                const embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
                console.log('URL de embed:', embedUrl);
                trailerIframe.src = embedUrl;
                trailerSection.style.display = 'block';
                console.log('Trailer configurado com sucesso!');
                console.log('Display do trailerSection:', trailerSection.style.display);
            } else {
                console.log('Não foi possível extrair ID do YouTube, usando URL direta');
                trailerIframe.src = selectedMovie.trailer;
                trailerSection.style.display = 'block';
            }
        } else {
            console.log('Nenhuma URL de trailer encontrada');
            trailerSection.style.display = 'none';
        }
    }

    // Atualizar informações da sessão
    console.log('=== ATUALIZANDO INFORMAÇÕES DA PÁGINA ===');
    
    const cinemaNameElement = document.getElementById('cinema-name');
    const movieInfoElement = document.getElementById('movie-info');
    const sessionInfoElement = document.getElementById('session-info');
    const movieSynopsisElement = document.getElementById('movie-synopsis');
    
    console.log('Elementos encontrados:');
    console.log('cinemaNameElement:', cinemaNameElement);
    console.log('movieInfoElement:', movieInfoElement);
    console.log('sessionInfoElement:', sessionInfoElement);
    console.log('movieSynopsisElement:', movieSynopsisElement);
    
    if (cinemaNameElement) {
        cinemaNameElement.textContent = `Cinema: ${selectedCinema.name}`;
    }
    if (movieInfoElement) {
        movieInfoElement.textContent = `Filme: ${selectedMovie.title}`;
    }
    if (sessionInfoElement) {
        sessionInfoElement.textContent = `Sessão: ${formatDateTime(selectedSession.time)} - ${selectedSession.room}`;
    }
    if (movieSynopsisElement) {
        movieSynopsisElement.textContent = selectedMovie.synopsis || 'Sinopse não disponível';
    }

    // Configurar trailer
    setupTrailer();

    console.log('=== CONFIGURAÇÃO INICIAL CONCLUÍDA ===');

    // Funcionalidade dos assentos
    const availableSeats = document.querySelectorAll('.seat.available');
    const selectionSummary = document.getElementById('selection-summary');
    const continueBtn = document.getElementById('continue-btn');
    
    let selectedSeats = [];
    const ticketPrice = 25.00; // Preço por ingresso

    console.log('Assentos disponíveis encontrados:', availableSeats.length);

    // Adicionar evento de clique para assentos disponíveis
    availableSeats.forEach(seat => {
        seat.addEventListener('click', () => {
            const seatId = seat.getAttribute('data-seat');
            
            if (seat.classList.contains('selected')) {
                // Desselecionar assento
                seat.classList.remove('selected');
                selectedSeats = selectedSeats.filter(s => s !== seatId);
            } else {
                // Selecionar assento (máximo 6 assentos)
                if (selectedSeats.length < 6) {
                    seat.classList.add('selected');
                    selectedSeats.push(seatId);
                } else {
                    alert('Você pode selecionar no máximo 6 assentos por compra.');
                    return;
                }
            }
            
            updateSelectionSummary();
        });
    });

    function updateSelectionSummary() {
        if (selectedSeats.length > 0) {
            const totalPrice = selectedSeats.length * ticketPrice;
            
            const selectedSeatsInfo = document.getElementById('selected-seats-info');
            const totalPriceElement = document.getElementById('total-price');
            
            if (selectedSeatsInfo) {
                selectedSeatsInfo.textContent = `Assentos: ${selectedSeats.join(', ')} (${selectedSeats.length} ingresso${selectedSeats.length > 1 ? 's' : ''})`;
            }
            if (totalPriceElement) {
                totalPriceElement.textContent = `Total: R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
            }
            
            if (selectionSummary) {
                selectionSummary.style.display = 'block';
            }
        } else {
            if (selectionSummary) {
                selectionSummary.style.display = 'none';
            }
        }
    }

    // Evento do botão continuar
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            if (selectedSeats.length > 0) {
                // Salvar seleção no localStorage
                const seatSelection = {
                    seats: selectedSeats,
                    quantity: selectedSeats.length,
                    totalPrice: selectedSeats.length * ticketPrice
                };
                
                localStorage.setItem('selectedSeats', JSON.stringify(seatSelection));
                
                // Redirecionar para seleção de produtos
                window.location.href = 'product_selection.html';
            } else {
                alert('Por favor, selecione pelo menos um assento.');
            }
        });
    }
});