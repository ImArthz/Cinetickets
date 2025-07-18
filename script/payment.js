document.addEventListener('DOMContentLoaded', () => {
    // ... (código para carregar o resumo do pedido do localStorage) ...

    const confirmButton = document.getElementById('confirm-payment');
    const apiInsertIngressoURL = 'https://p7g98h6i1c.execute-api.us-east-2.amazonaws.com/default/insert_ingresso';

    confirmButton.addEventListener('click', async () => {
        // Obter dados do formulário de cliente
        const customerName = document.getElementById('customer-name').value;
        const customerEmail = document.getElementById('customer-email').value;

        // Recuperar dados da sessão e assentos do localStorage
        const sessionId = localStorage.getItem('selectedSessionId');
        // Supondo que você tenha salvo os assentos como uma string JSON
        const seats = JSON.parse(localStorage.getItem('selectedSeats')); 
        const total = document.getElementById('grand-total').textContent;

        // Validar se os campos estão preenchidos...

        // Para cada assento selecionado, criar um ingresso
        for (const seat of seats) {
            const ingressoData = {
                id_sessao: sessionId,
                poltrona: seat.id, // ex: 'A1'
                valor: seat.price, // ex: 20.00 (preço do tipo de ingresso)
                status_pagamento: 'pago' // ou 'pendente' se for PIX
            };

            try {
                await fetch(apiInsertIngressoURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(ingressoData)
                });
            } catch (error) {
                console.error('Falha ao registrar ingresso para o assento ' + seat.id, error);
                alert('Ocorreu um erro ao processar sua compra. Por favor, tente novamente.');
                return; // Interrompe o processo se um ingresso falhar
            }
        }
        
        // Se todos os ingressos foram criados com sucesso
        alert('Compra realizada com sucesso!');
        
        // Salva os detalhes da compra para a página de confirmação
        localStorage.setItem('confirmationDetails', JSON.stringify({
            customerName,
            customerEmail,
            total,
            // ...outros detalhes
        }));

        // Redireciona para a página de confirmação
        window.location.href = 'confirmation.html';
    });
});