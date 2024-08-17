    document.addEventListener('DOMContentLoaded', function() {
        const chatHeader = document.getElementById('chatHeader');
        const chatContent = document.getElementById('chatContent');
        const userInput = document.getElementById('userInput');
        const sendBtn = document.getElementById('sendBtn');

        function getQueryParam(param) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(param);
        }

        const sapo = getQueryParam('sapo') || 'verde';

        const sapoColors = {
            'verde': 'figures/sapos/sapo-verde.png',
            'amarelo': 'figures/sapos/sapo-amarelo.png',
            'azul': 'figures/sapos/sapo-azul.png',
            'vermelho': 'figures/sapos/sapo-vermelho.png',
            'roxo': 'figures/sapos/sapo-roxo.png',
            'laranja': 'figures/sapos/sapo-laranja.png'
        };

        chatHeader.style.backgroundImage = `url('${sapoColors[sapo]}')`;

        const responses = {
            'Olá': 'Olá! Como posso ajudar você hoje?',
            'Oi': 'Oi!! Como posso ajudar você hoje?',
            'Como posso te chamar?': `Pode me chamar de Sapo ${sapo.charAt(0).toUpperCase() + sapo.slice(1)}.`,
            'Como você está?': 'Estou ótimo, obrigado por perguntar, e como você está?',
            'O que você faz?': 'Eu sou um usuário como você e estou aqui para ajudar você com suas perguntas.',
            'Tchau': 'Até logo! Lembre-se que sempre estarei aqui.',
            'Não estou bem': 'O que você está sentindo?'
        };

        const forbiddenWords = ['palavrão', 'insulto']; 

        function addMessage(sender, text) {
            const message = document.createElement('p');
            message.textContent = text;
            message.className = sender === 'Você' ? 'message-user' : 'message-sapo';
            chatContent.appendChild(message);

            if (sender === 'Sapo') {
                const sapoIcon = document.createElement('span');
                sapoIcon.className = 'sapo-icon';
                sapoIcon.style.backgroundImage = `url('${sapoColors[sapo]}')`;
                message.appendChild(sapoIcon);
            }

            chatContent.scrollTop = chatContent.scrollHeight;
        }

        function showWarning() {
            alert('Palavra inapropriada detectada. Por favor, evite usar linguagem ofensiva !!!');
        }

        function containsForbiddenWord(message) {
            return forbiddenWords.some(word => message.includes(word));
        }

        function sendMessage() {
            const userMessage = userInput.value.trim();

            if (containsForbiddenWord(userMessage)) {
                showWarning();
                userInput.value = ''; 
                return;
            }

            if (userMessage) {
                addMessage('Você', userMessage);
                userInput.value = '';

                const response = responses[userMessage] || 'Desculpe, eu não entendi isso.';
                setTimeout(() => {
                    addMessage('Sapo', response);
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

        chatHeader.textContent = `Você está conversando com o Sapo ${sapo.charAt(0).toUpperCase() + sapo.slice(1)}`;
    });