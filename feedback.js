document.addEventListener('DOMContentLoaded', function() {
    const backToHomeBtn = document.getElementById('backToHomeBtn');
    const feedbackModal = document.getElementById('feedbackModal');
    const closeModal = document.getElementById('closeModal');
    const stars = document.querySelectorAll('#stars i');
    const submitFeedback = document.getElementById('submitFeedback');
    let selectedRating = 0;

    backToHomeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        feedbackModal.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        feedbackModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === feedbackModal) {
            feedbackModal.style.display = 'none';
        }
    });

    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-value'));
            stars.forEach(s => {
                s.classList.toggle('active', parseInt(s.getAttribute('data-value')) <= selectedRating);
            });
        });
    });

    submitFeedback.addEventListener('click', function() {
        if (selectedRating > 0) {
            alert(`Obrigado pelo seu feedback! Você avaliou com ${selectedRating} estrela(s).`);
            feedbackModal.style.display = 'none';
            window.location.href = 'home.html';
        } else {
            alert('Por favor, selecione uma avaliação antes de enviar.');
        }
    });
});
