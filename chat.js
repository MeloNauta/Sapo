document.addEventListener('DOMContentLoaded', function() {
    const chatHeader = document.getElementById('chatHeader');
    const chatContent = document.getElementById('chatContent');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const responses = {
        'Olá': 'Olá! Como posso ajudar você hoje?',
        'Oi': 'Oi!! Como posso ajudar você hoje?',
        'Como posso te chamar?': `Pode me chamar de ${getQueryParam('sapo')}.`,
        'Como você está?': 'Estou ótimo, obrigado por perguntar!',
        'O que você faz?': 'Eu sou um usuário como você e estou aqui para ajudar você com suas perguntas.',
        'Tchau': 'Até logo! Lembre-se que sempre estrei aqui.'
    };

    function addMessage(sender, text) {
        const message = document.createElement('p');
        message.textContent = text;
        message.className = sender === 'Você' ? 'message-user' : 'message-sapo';
        chatContent.appendChild(message);
        chatContent.scrollTop = chatContent.scrollHeight; 
    }

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            addMessage('Você', userMessage);
            userInput.value = '';

            const response = responses[userMessage] || 'Desculpe, eu não entendi isso.';
            setTimeout(() => {
                addMessage(getQueryParam('sapo'), response);
            }, 500); 
        }
    }

    sendBtn.addEventListener('click', sendMessage);

    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    chatHeader.textContent = `Você está conversando com ${getQueryParam('sapo')}`;
});