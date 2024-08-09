document.addEventListener('DOMContentLoaded', function() {
    const chatHeader = document.getElementById('chatHeader');
    const chatContent = document.getElementById('chatContent');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const sapo = getQueryParam('Sapo') || 'Verde';
    const sapoColors = {
        'Verde': 'figures/sapos/sapo-verde.png',
        'Amarelo': 'figures\sapos\sapo-amarelo.png',
        'Azul': 'figures/sapos/sapo-azul.png',
        'Vermelho': 'figures/sapos/sapo-vermelho.png',
        'Roxo': 'figures\sapos\sapo-roxo.png',
        'Laranja': 'figures\sapos\sapo-laranja.png'
    };

    // Atualiza a imagem do fundo do cabeçalho com base na cor do sapo
    chatHeader.style.backgroundImage = `url('figures/sapos/${sapoColors[sapo]}')`;

    const responses = {
        'Olá': 'Olá! Como posso ajudar você hoje?',
        'Oi': 'Oi!! Como posso ajudar você hoje?',
        'Como posso te chamar?': `Pode me chamar de Sapo ${sapo}.`,
        'Como você está?': 'Estou ótimo, obrigado por perguntar !!! E como você está?',
        'O que você faz?': 'Eu sou um usuário como você e estou aqui para ajudar você com suas perguntas.',
        'Tchau': 'Até logo! Lembre-se que sempre estarei aqui.',
        'Não estou bem': 'O que você está sentindo?'
        
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
                addMessage(sapo, response);
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

    chatHeader.textContent = `Você está conversando com o Sapo ${sapo}`;
});