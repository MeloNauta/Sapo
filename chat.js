document.addEventListener('DOMContentLoaded', function() {
    const chatHeader = document.getElementById('chatHeader');
    const chatContent = document.getElementById('chatContent');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatMode = localStorage.getItem('chatMode');


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
        'supportMode': { // Respostas para o modo de suporte
            'Olá': 'Olá',
            'Oi': 'Oi',
            'Como posso te chamar?': `Pode me chamar de Sapo ${sapo.charAt(0).toUpperCase() + sapo.slice(1)}.`,
            'Como você está?': 'Não estou muito bem',
            'Se cuide': 'Muito Obrigado !!',
           
            },
        'seekSupportMode': { // Respostas para o modo de buscar suporte
            'Olá': 'Olá! Este é o lugar para você que busca receber apoio. Como você está se sentindo hoje?',
            'Oi': 'Oi! Este é o lugar certo para você que busca receber apoio. Como você está se sentindo hoje?',
            'Não estou bem': 'O que aconteceu?',
            'Como posso te chamar?': `Pode me chamar de Sapo ${sapo.charAt(0).toUpperCase() + sapo.slice(1)}.`,
            'O que você faz?': 'Eu sou um usuário como você e estou aqui para ajudar ou somento conversar com você !!',
            'Estou triste': 'Você gostaria de conversar sobre algo que aconteceu recentemente?',
            'Estou desmotivado': 'Você gostaria de conversar sobre o que está te desmotivando?',
            'Estou insatisfeito comigo mesmo': 'Existe algo que você gostaria de mudar ou melhorar?',
            'Me sinto sozinho': 'Lembre-se, você nunca está sozinho, pois há sempre alguém que se importa muito com você.',
            'Estou confuso': 'Há algo que você gostaria de esclarecer ou entender melhor?',
            'Estou preocupado': 'Há algo que possamos fazer para aliviar essa preocupação?',
            'Sim, eu gostaria': 'Ok. Pode se sentir à vontade.',
            'Não, eu não gostaria': 'OK. Quando quiser conversar sobre, eu estarei aqui.',
            'Sim, há algo': 'Certo, quando se sentir preparado, pode falar sobre o que está te deixando confuso.',
            'Sim, há algo para aliviar': 'Certo, o que seria?',
            'Não, não há': 'Certo, se mudar de ideia, estarei aqui para te ajudar!',
            'Não, não há algo para aliviar': 'OK. Desculpe por não conseguir ajudar, mas se mudar de ideia, estarei aqui.',
            'Estou com medo de pedir ajuda': 'Tudo bem, quando se sentir confortável para pedir ajuda, estarei aqui para te apoiar!',
            'Estou Sentindo Culpa': 'Você quer falar sobre o motivo dessa culpa?',
            'Estou preocupado com o futuro': 'Você gostaria de conversar sobre suas preocupações em relação ao futuro?',
            'Estou sem esperança': 'Você gostaria de conversar sobre o que está fazendo você se sentir assim?',
            'Estou ansioso sobre algo': 'Você quer falar sobre o que está causando essa ansiedade?',
            'Estou sobrecarregado': 'Você quer conversar sobre o que está te deixando sobrecarregado?',
            'Estou me sentindo inútil': 'Você quer conversar sobre o que está te fazendo se sentir assim?',
            'Estou me sentindo desvalorizado': 'Você gostaria de falar sobre o que está fazendo você se sentir assim?',
            'Estou sem motivação': 'Você quer conversar sobre o que está tirando sua motivação?',
            'Estou confuso sobre o que fazer': 'Você quer conversar sobre as opções e ver se podemos encontrar uma solução juntos?',
            'Estou me sentindo perdido': 'Você gostaria de conversar sobre o que está te fazendo se sentir assim e explorar possíveis caminhos para seguir em frente?'
            
        }
    };

    const forbiddenWords = ['palavrão', 'insulto'];

    function saveConversation(sender, text) {
        const conversations = JSON.parse(localStorage.getItem('conversations')) || [];
        conversations.push({ sender, text, timestamp: new Date().toISOString() });
        localStorage.setItem('conversations', JSON.stringify(conversations));
    }

    function addMessage(sender, text) {
        const message = document.createElement('div');
        message.className = sender === 'Você' ? 'message-user' : 'message-sapo';
    
        const messageText = document.createElement('p');
        messageText.textContent = text;
    
        if (sender === 'Sapo') {
            const sapoIcon = document.createElement('span');
            sapoIcon.className = 'sapo-icon';
            sapoIcon.style.backgroundImage = `url('${sapoColors[sapo]}')`;
            message.appendChild(sapoIcon); 
            message.appendChild(messageText); 
        } else {
            message.appendChild(messageText); 
            const selectedIconClass = localStorage.getItem('selectedIcon');
            if (selectedIconClass) {
                const userIcon = document.createElement('i');
                userIcon.className = selectedIconClass;
                message.appendChild(userIcon);
            }
        }
    
        chatContent.appendChild(message);
        chatContent.scrollTop = chatContent.scrollHeight;
    
        saveConversation(sender, text);
    }
    

    function showWarning() {
        alert('Palavra inapropriada detectada. Por favor, evite usar linguagem ofensiva!');
    }

    function containsForbiddenWord(message) {
        return forbiddenWords.some(word => message.toLowerCase().includes(word));
    }

    function getResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        const modeResponses = responses[chatMode] || {}; 
        for (let key in modeResponses) {
            if (lowerCaseMessage.includes(key.toLowerCase())) {
                return modeResponses[key];
            }
        }
        return 'Desculpe, eu não entendi isso.';
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

            const response = getResponse(userMessage);
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

const userInput = document.getElementById('userInput');

userInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});
