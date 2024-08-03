document.getElementById('searchBtn').addEventListener('click', function() {
    // Mostrar a animação de carregamento
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    // Esperar 5 segundos e então mostrar o resultado
    setTimeout(function() {
        // Esconder a animação de carregamento
        document.getElementById('loading').style.display = 'none';

        // Gerar um nome de sapo aleatório
        const sapos = ['Sapo Verde', 'Sapo Amarelo', 'Sapo Azul', 'Sapo Vermelho', 'Sapo Roxo'];
        const nomeAleatorio = sapos[Math.floor(Math.random() * sapos.length)];

        // Mostrar o resultado
        document.getElementById('result').style.display = 'block';
        document.getElementById('foundMessage').textContent = `Sapo encontrado: ${nomeAleatorio}`;

        // Atualizar o link do botão de chat
        const chatBtn = document.getElementById('chatBtn');
        chatBtn.href = `chat.html?sapo=${encodeURIComponent(nomeAleatorio)}`;
        chatBtn.style.display = 'inline-block'; // Mostrar o botão de chat
    }, 5000); // 5 segundos
});