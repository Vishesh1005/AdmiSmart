document.addEventListener("DOMContentLoaded", () => {
    // Typing animation for chat messages
    const chatMessages = document.querySelectorAll(".chat-window .message p");
    let delay = 0;

    chatMessages.forEach((msg, idx) => {
        const originalText = msg.textContent;
        msg.textContent = "";
        msg.style.visibility = "hidden"; // hide until animation

        setTimeout(() => {
            msg.style.visibility = "visible";
            let charIndex = 0;

            const typeInterval = setInterval(() => {
                msg.textContent += originalText.charAt(charIndex);
                charIndex++;

                if (charIndex >= originalText.length) {
                    clearInterval(typeInterval);
                }
            }, 200); // typing speed
        }, delay);

        delay += originalText.length * 20 + 500; // delay next message
    });

    // Modal contact form
    const contactBtn = document.getElementById("contact-btn");
    const modal = document.getElementById("contact-modal");
    const closeModalBtn = document.querySelector(".close-modal");
    const contactForm = document.getElementById("contact-form");

    if (contactBtn && modal && closeModalBtn && contactForm) {
        contactBtn.addEventListener("click", () => {
            modal.style.display = "block";
        });

        closeModalBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });

        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);

            try {
                const res = await fetch("https://Vishesh1005-admismart.hf.space/submit-form", {
                    method: "POST",
                    body: formData,
                });

                const data = await res.json();
                alert(data.message);
                if (data.success) {
                    contactForm.reset();
                    modal.style.display = "none";
                }
            } catch (err) {
                alert("Something went wrong. Please try again.");
            }
        });
    }
});
