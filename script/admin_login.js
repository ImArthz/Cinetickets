// JavaScript para a página de login administrativo
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    const apiUrls = {
        funcionario: 'https://p7g98h6i1c.execute-api.us-east-2.amazonaws.com/default/select_funcionario',
        gerente: 'https://p7g98h6i1c.execute-api.us-east-2.amazonaws.com/default/select_gerente'
    };

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        errorMessage.style.display = 'none';

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const userType = document.getElementById('user-type').value;

        if (!userType) {
            alert('Por favor, selecione o tipo de usuário.');
            return;
        }

        try {
            const response = await fetch(apiUrls[userType]);
            const users = await response.json();
            
            // Procura um usuário com o login e senha correspondentes
            const authenticatedUser = users.find(user => user.login === username && user.senha === password);

            if (authenticatedUser) {
                // Salva informações do usuário logado
                localStorage.setItem('loggedInUser', JSON.stringify(authenticatedUser));
                localStorage.setItem('userRole', userType);
                
                // Redireciona para o dashboard
                window.location.href = 'admin_dashboard.html';
            } else {
                errorMessage.style.display = 'flex';
            }

        } catch (error) {
            console.error('Erro no login:', error);
            errorMessage.querySelector('.error-text').textContent = 'Erro ao conectar com o servidor.';
            errorMessage.style.display = 'flex';
        }
    });
});