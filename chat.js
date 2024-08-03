document.addEventListener('DOMContentLoaded', function() {
    const chatHeader = document.getElementById('chatHeader');
    const chatContent = document.getElementById('chatContent');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    // Obtém o nome do sapo da URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Define respostas predefinidas
    const responses = {
        'Olá': 'Olá! Como posso ajudar você hoje?',
        'Qual é o seu nome?': `Eu sou o ${getQueryParam('sapo')}.`,
        'Como você está?': 'Estou ótimo, obrigado por perguntar!',
        'O que você faz?': 'Eu sou um sapo virtual aqui para ajudar você com suas perguntas.',
        'Adeus': 'Até logo! Lembre-se que sempre estou aqui.'
    };

    // Adiciona uma mensagem ao chat
    function addMessage(sender, text) {
        const message = document.createElement('p');
        message.textContent = text;
        message.className = sender === 'Você' ? 'message-user' : 'message-sapo';
        chatContent.appendChild(message);
        chatContent.scrollTop = chatContent.scrollHeight; // Scroll para baixo
    }

    // Envia uma mensagem
    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage('Você', userMessage);
            userInput.value = '';

            // Resposta do sapo
            const response = responses[userMessage] || 'Desculpe, eu não entendi isso.';
            setTimeout(() => {
                addMessage(getQueryParam('sapo'), response);
            }, 500); // Simula um pequeno atraso
        }
    }

    // Configura o evento de clicar no botão Enviar
    sendBtn.addEventListener('click', sendMessage);

    // Configura o evento de pressionar Enter
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    // Define o nome do sapo no cabeçalho do chat
    chatHeader.textContent = `Você está conversando com ${getQueryParam('sapo')}`;
});