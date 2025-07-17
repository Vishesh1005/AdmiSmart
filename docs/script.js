// === Modal Open/Close Functions ===
function openModal() {
  document.getElementById('formModal').style.display = 'block';
  const ts = new Date().toLocaleString();
  document.getElementById('timestamp').value = ts;
}

function closeModal() {
  document.getElementById('formModal').style.display = 'none';
}

// === Typing Animation ===
function simulateChatSequence() {
  const chatContainer = document.querySelector(".chat-messages");
  const messages = [
    {
      class: "bot-message",
      text: "Hi! I'm here to help with your admission queries. What would you like to know?"
    },
    {
      class: "user-message",
      text: "What's the application deadline for Computer Science?"
    },
    {
      class: "bot-message",
      text: "The application deadline for Computer Science is January 15th. You can apply through our online portal."
    }
  ];

  chatContainer.innerHTML = ""; // Clear existing

  let index = 0;
  function showNextMessage() {
    if (index >= messages.length) return;

    const { class: messageClass, text } = messages[index];
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", messageClass);

    const p = document.createElement("p");
    messageDiv.appendChild(p);
    chatContainer.appendChild(messageDiv);

    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        p.textContent += text.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        index++;
        setTimeout(showNextMessage, 800); // Delay before next message
      }
    }, 30);
  }

  showNextMessage();
}

// === Mobile Nav Toggle ===
function toggleMobileMenu() {
  const nav = document.querySelector(".mobile-nav");
  nav.classList.toggle("open");
}

function closeMobileMenu() {
  const nav = document.querySelector(".mobile-nav");
  nav.classList.remove("open");
}

// === Scroll Parallax ===
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

// === Lazy Image Loading ===
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });
  images.forEach(img => observer.observe(img));
}

// // === DOM Ready ===
// document.addEventListener("DOMContentLoaded", function () {
//   simulateChatSequence();
//   initParallax();
//   initLazyLoading();

//   const getStarted = document.querySelector(".cta-button");
//   const startTrial = document.querySelector(".btn-primary"); 
//   const trialButton = document.querySelector(".startTrialBtn");  
//   const closeBtn = document.querySelector("#formModal .close");
//   const form = document.getElementById("contact-form");

//   // Open modal buttons
//   [getStarted, startTrial, trialButton]].forEach(btn => {
//     if (btn) {
//       btn.addEventListener("click", function (e) {
//         e.preventDefault();
//         openModal();
//       });
//     }
//   });

//   // Close modal events
//   if (closeBtn) {
//     closeBtn.addEventListener("click", closeModal);
//   }

//   window.addEventListener("click", function (e) {
//     if (e.target.id === "formModal") closeModal();
//   });

//   document.addEventListener("keydown", function (e) {
//     if (e.key === 'Escape') closeModal();
//   });

document.addEventListener("DOMContentLoaded", function () {
  const openModalButtons = [
    document.querySelector(".cta-button"),
    document.querySelector(".btn-primary:not(.large)"),
    document.getElementById("startTrialBtn"),
    document.getElementById("cntBtn")  
  ];

  const modal = document.getElementById("formModal");
  const closeModalButton = modal?.querySelector(".close");

  function openModal() {
    if (modal) {
      modal.style.display = "block";
    }
  }

  function closeModal() {
    if (modal) {
      modal.style.display = "none";
    }
  }

  openModalButtons.forEach(btn => {
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal();
      });
    }
  });

  if (closeModalButton) {
    closeModalButton.addEventListener("click", closeModal);
  }

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });
});



  // Form submission
  if (form) {
    form.addEventListener("submit", async function (e) {
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
