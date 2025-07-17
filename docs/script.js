
// Typing Animation for Bot Messages
document.addEventListener("DOMContentLoaded", () => {
    const botMessages = document.querySelectorAll(".bot-message p");

    botMessages.forEach((p, index) => {
        const fullText = p.textContent;
        p.textContent = ""; // Clear initially

        let charIndex = 0;
        const delay = 30; // Typing speed in ms

        function typeNextChar() {
            if (charIndex < fullText.length) {
                p.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeNextChar, delay);
            }
        }

        // Add staggered start time for multiple messages
        setTimeout(typeNextChar, index * fullText.length * delay + 500);
    });
});

// Contact Form Modal Logic
const openFormBtn = document.querySelector("#openFormBtn");
const modal = document.querySelector("#contactModal");
const closeBtn = document.querySelector(".close-modal");

// Show the modal
if (openFormBtn && modal) {
    openFormBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });
}

// Hide the modal on close click
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

// Hide modal if clicked outside the form
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Form submission
const form = document.querySelector("#contactForm");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const message = document.querySelector("#message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("message", message);

        try {
            const response = await fetch("https://Vishesh1005-admismart.hf.space/submit_form", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                alert("Form submitted successfully!");
                form.reset();
                modal.style.display = "none";
            } else {
                alert("Submission failed: " + result.message);
            }
        } catch (error) {
            alert("Error submitting form. Please try again later.");
            console.error("Form submission error:", error);
        }
    });
}

