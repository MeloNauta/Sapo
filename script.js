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
        chatHeader.style.backgroundImage = `url('figures/sapos/sapo-${sapoCor}.png')`;

        const userMessages = document.querySelectorAll('.message-user::before');
        const sapoMessages = document.querySelectorAll('.message-sapo::before');
        
        userMessages.forEach(message => {
            message.style.backgroundImage = `url('figures/sapos/sapo-${sapoCor}.png')`;
        });

        sapoMessages.forEach(message => {
            message.style.backgroundImage = `url('figures/sapos/sapo-${sapoCor}.png')`;
        });
    }
});