document.addEventListener('DOMContentLoaded', () => {
    const userRole = localStorage.getItem('userRole');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Proteção de rota: se não estiver logado, volta para o login
    if (!userRole || !loggedInUser) {
        window.location.href = 'admin_login.html';
        return;
    }
    
    // Customização da interface com base na função
    document.getElementById('welcome-message').textContent = `Bem-vindo, ${loggedInUser.nome || 'Usuário'}!`;
    document.getElementById('user-name').textContent = loggedInUser.nome || 'Usuário';
    document.getElementById('user-role').textContent = userRole.charAt(0).toUpperCase() + userRole.slice(1);

    const cinemasMenu = document.getElementById('cinemas-menu');
    if (userRole === 'gerente') {
        cinemasMenu.style.display = 'block'; // Mostra o menu "Gerenciar Cinemas" para gerentes
    }
    
    // Lógica para navegação entre as abas (Dashboard, Filmes, etc.)
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove a classe 'active' de todos
            menuItems.forEach(i => i.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));

            // Adiciona a classe 'active' ao item clicado e à seção correspondente
            item.classList.add('active');
            const sectionId = item.getAttribute('data-section') + '-section';
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Lógica para Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('userRole');
        window.location.href = 'admin_login.html';
    });

    // --- Funcionalidade de Adicionar Filme ---
    const addMovieBtn = document.getElementById('add-movie-btn');
    const movieModal = document.getElementById('movie-modal');
    const movieForm = document.getElementById('movie-form');
    const apiInsertFilmeURL = 'https://p7g98h6i1c.execute-api.us-east-2.amazonaws.com/default/insert_filme';
    
    addMovieBtn.addEventListener('click', () => {
        movieModal.style.display = 'block';
    });

    movieModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-modal') || e.target.classList.contains('modal')) {
            movieModal.style.display = 'none';
        }
    });

    movieForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const filmeData = {
            // Os nomes das chaves devem corresponder exatamente ao esperado pela sua API/Lambda
            titulo: document.getElementById('movie-title').value,
            genero: document.getElementById('movie-genre').value,
            duracao: document.getElementById('movie-duration').value,
            classificacao: document.getElementById('movie-rating').value,
            // Outros campos como sinopse, url_poster se existirem no formulário e API
        };

        try {
            const response = await fetch(apiInsertFilmeURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filmeData)
            });

            if (response.ok) {
                alert('Filme adicionado com sucesso!');
                movieModal.style.display = 'none';
                // Aqui você pode adicionar a lógica para recarregar a lista de filmes
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao adicionar filme');
            }
        } catch (error) {
            console.error('Erro ao salvar filme:', error);
            alert('Erro: ' + error.message);
        }
    });
});