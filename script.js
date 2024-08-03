document.getElementById('searchBtn').addEventListener('click', function() {
 
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    setTimeout(function() {
        document.getElementById('loading').style.display = 'none';

        const sapos = ['Sapo Verde', 'Sapo Amarelo', 'Sapo Azul', 'Sapo Vermelho', 'Sapo Roxo'];
        const nomeAleatorio = sapos[Math.floor(Math.random() * sapos.length)];

        document.getElementById('result').style.display = 'block';
        document.getElementById('foundMessage').textContent = `Sapo encontrado: ${nomeAleatorio}`;

        const chatBtn = document.getElementById('chatBtn');
        chatBtn.href = `chat.html?sapo=${encodeURIComponent(nomeAleatorio)}`;
        chatBtn.style.display = 'inline-block'; 
    }, 5000); 
});