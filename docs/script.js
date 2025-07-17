// ----- Modal Logic -----
document.addEventListener("DOMContentLoaded", function () {
  const openButtons = document.querySelectorAll('.btn-primary');
  const modal = document.querySelector('.contact .modal');
  const closeModal = document.querySelector('.close-modal');
  const form = document.querySelector('#contactForm');

  // Open modal
  openButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      modal.style.display = "block";
    });
  });

  // Close modal
  closeModal.addEventListener('click', function () {
    modal.style.display = "none";
  });

  window.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Form Submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const response = await fetch("https://Vishesh1005-admismart.hf.space/submit-form", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      alert(result.message);
      if (result.success) {
        form.reset();
        modal.style.display = "none";
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  });
});

// ----- Typing Animation in Hero Chatbox -----
document.addEventListener("DOMContentLoaded", function () {
  const messages = document.querySelectorAll(".chat-messages .message p");

  messages.forEach((el, index) => {
    const originalText = el.textContent;
    el.textContent = "";
    let charIndex = 0;

    const typeWriter = () => {
      if (charIndex < originalText.length) {
        el.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 30);
      }
    };

    setTimeout(typeWriter, 500 * index);
  });
});
