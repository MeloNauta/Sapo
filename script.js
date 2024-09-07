document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('supportMode').addEventListener('click', function () {
        document.getElementById('interactionConfirmation').style.display = 'block';
        document.getElementById('supportConfirmation').style.display = 'block';
        document.getElementById('seekSupportConfirmation').style.display = 'none';

        const chatBtn = document.getElementById('chatBtn');
        chatBtn.href = 'chat.html?sapo=verde'; 
    });

    document.getElementById('seekSupportMode').addEventListener('click', function () {
        document.getElementById('interactionConfirmation').style.display = 'block';
        document.getElementById('supportConfirmation').style.display = 'none';
        document.getElementById('seekSupportConfirmation').style.display = 'block';

        const chatBtn = document.getElementById('chatBtn');
        chatBtn.href = 'chat.html?sapo=azul';
    });

    var historyModal = document.getElementById("historyModal");
    var historyBtn = document.getElementById("historyBtn");
    var closeHistory = document.querySelector("#historyModal .close");
    var clearHistoryBtn = document.getElementById("clearHistoryBtn");

    historyBtn.onclick = function () {
        loadHistory();
        historyModal.style.display = "block";
    }

    closeHistory.onclick = function () {
        historyModal.style.display = "none";
    }

    clearHistoryBtn.onclick = function () {
        localStorage.removeItem('conversations');
        loadHistory();
    }

    window.onclick = function (event) {
        if (event.target === historyModal) {
            historyModal.style.display = "none";
        }
    }

    // Modal de configurações
    var settingsModal = document.getElementById("settingsModal");
    var settingsBtn = document.getElementById("settingsBtn");
    var closeSettings = document.querySelector("#settingsModal .close-settings");

    settingsBtn.onclick = function () {
        settingsModal.style.display = "block";
    }

    closeSettings.onclick = function () {
        settingsModal.style.display = "none";
    }

    // Seletor de ícone
    var iconSelection = document.querySelectorAll("#iconSelection .icon-option");
    iconSelection.forEach(function (icon) {
        icon.addEventListener("click", function () {
            var selectedIcon = icon.getAttribute("data-icon");
            console.log("Ícone selecionado: " + selectedIcon);
        });
    });

    // Carregar ícone selecionado
    function loadSelectedIcon() {
        const selectedIconClass = localStorage.getItem('selectedIcon');
        if (selectedIconClass) {
            iconOptions.forEach(icon => {
                if (icon.className === selectedIconClass) {
                    icon.classList.add('selected');
                }
            });
        }
    }

    loadSelectedIcon();
});

document.getElementById('searchBtn').addEventListener('click', function() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    setTimeout(function() {
        document.getElementById('loading').style.display = 'none';

        const sapos = ['Sapo Verde', 'Sapo Amarelo', 'Sapo Azul', 'Sapo Vermelho', 'Sapo Roxo', 'Sapo Laranja'];
        const nomeAleatorio = sapos[Math.floor(Math.random() * sapos.length)];

        document.getElementById('result').style.display = 'block';
        document.getElementById('foundMessage').textContent = `Sapo encontrado: ${nomeAleatorio}`;

        const sapoCor = nomeAleatorio.split(' ')[1].toLowerCase();
        const chatBtn = document.getElementById('chatBtn');
        chatBtn.href = `chat.html?sapo=${encodeURIComponent(sapoCor)}`;
        chatBtn.style.display = 'inline-block';
    }, 5000);
});

window.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const sapoCor = urlParams.get('sapo');

    if (sapoCor) {
        const chatHeader = document.getElementById('chatHeader');
        if (chatHeader) {
            chatHeader.style.backgroundImage = `url('figures/sapos/sapo-${sapoCor}.png')`;
        }

        const userMessages = document.querySelectorAll('.message-user');
        const sapoMessages = document.querySelectorAll('.message-sapo');
        
        userMessages.forEach(message => {
            message.style.backgroundImage = `url('figures/sapos/sapo-${sapoCor}.png')`;
        });

        sapoMessages.forEach(message => {
            message.style.backgroundImage = `url('figures/sapos/sapo-${sapoCor}.png')`;
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const historyBtn = document.getElementById('historyBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const historyModal = document.getElementById('historyModal');
    const settingsModal = document.getElementById('settingsModal');
    const closeHistoryBtn = document.querySelector('.close');
    const closeSettingsBtn = document.querySelector('.close-settings');
    const historyContent = document.getElementById('historyContent');
    const iconOptions = document.querySelectorAll('.icon-option');
    const clearHistoryBtn = document.getElementById('clearHistoryBtn');

    function loadHistory() {
        const conversations = JSON.parse(localStorage.getItem('conversations')) || [];
        historyContent.innerHTML = '';

        if (conversations.length === 0) {
            historyContent.innerHTML = '<p>Nenhuma conversa encontrada.</p>';
        } else {
            conversations.forEach(convo => {
                const convoElement = document.createElement('div');
                convoElement.className = 'convo-item';

                const sapoColor = convo.sapoColor || 'green';
                const sapoColorDiv = `<div class="sapo-color" style="background-color: ${sapoColor};"></div>`;

                convoElement.innerHTML = `${sapoColorDiv}<strong>${convo.sender}:</strong> ${convo.text} <br><small>${new Date(convo.timestamp).toLocaleString()}</small>`;
                historyContent.appendChild(convoElement);
            });
        }
    }

    historyBtn.addEventListener('click', function() {
        loadHistory();
        historyModal.style.display = 'block';
    });

    settingsBtn.addEventListener('click', function() {
        settingsModal.style.display = 'block';
    });

    closeHistoryBtn.addEventListener('click', function() {
        historyModal.style.display = 'none';
    });

    closeSettingsBtn.addEventListener('click', function() {
        settingsModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === historyModal) {
            historyModal.style.display = 'none';
        }
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    iconOptions.forEach(icon => {
        icon.addEventListener('click', function() {
            iconOptions.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            localStorage.setItem('selectedIcon', this.className);
        });
    });

    function loadSelectedIcon() {
        const selectedIconClass = localStorage.getItem('selectedIcon');
        if (selectedIconClass) {
            iconOptions.forEach(icon => {
                if (icon.className === selectedIconClass) {
                    icon.classList.add('selected');
                }
            });
        }
    }

    loadSelectedIcon();

    clearHistoryBtn.addEventListener('click', function() {
        localStorage.removeItem('conversations');
        loadHistory();
    });
});
