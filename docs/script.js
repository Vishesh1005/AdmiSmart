// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const selector = this.getAttribute('href');
        if (selector === "#") return;
        const target = document.querySelector(selector);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Open modal
function openModal() {
    document.getElementById('contactModal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('contactModal').style.display = 'none';
}

// Open modal from buttons
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById('contactModal');
    const getStartedBtn = document.querySelector('.cta-button');
    const trialBtn = document.querySelector('.btn-primary');
    const closeBtn = document.querySelector('.close');

    [getStartedBtn, trialBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                openModal();
            });
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
