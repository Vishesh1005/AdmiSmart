// === Modal Controls ===
function openModal() {
    document.getElementById('contact-form-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('contact-form-modal').style.display = 'none';
}

// === Modal Triggers ===
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById('contact-form-modal');
    const closeBtn = document.querySelector('#contact-form-modal .close');
    const getStartedBtn = document.querySelector('.cta-button');
    const trialBtn = document.querySelector('.btn-primary');

    // Attach modal open
    [getStartedBtn, trialBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                openModal();
            });
        }
    });

    // Attach modal close
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

// === Form Submission ===
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            try {
                const res = await fetch("https://Vishesh1005-admismart.hf.space/submit_form", {
                    method: "POST",
                    body: formData
                });

                const result = await res.json();
                alert(result.message || "Submitted successfully.");
                form.reset();
                closeModal();
            } catch (err) {
                alert("Submission failed. Please try again later.");
            }
        });
    }
});
