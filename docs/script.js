// Form Modal Logic
document.querySelectorAll('.open-form').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.contact .modal').style.display = 'block';
  });
});

document.querySelector('.close-modal').addEventListener('click', () => {
  document.querySelector('.contact .modal').style.display = 'none';
});

// Navbar Toggle Logic (uses existing toggle button)
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('mobile-active');
  navToggle.textContent = navLinks.classList.contains('mobile-active') ? '✕' : '☰';
});

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('mobile-active')) {
      navLinks.classList.remove('mobile-active');
      navToggle.textContent = '☰';
    }
  });
});

// Hero Stats Counter Animation
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.textContent.replace(/\D/g, '')) || 0;
    let current = 0;
    const increment = Math.ceil(target / 100);
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = el.textContent;
        clearInterval(interval);
      } else {
        el.textContent = `${current}${el.textContent.match(/\D+$/) || ''}`;
      }
    }, 20);
  });
}

document.addEventListener('DOMContentLoaded', animateCounters);


// === Modal Open/Close Functions ===
function openModal() {
  document.getElementById('formModal').style.display = 'block';
  const ts = new Date().toLocaleString();
  document.getElementById('timestamp').value = ts;
}

function closeModal() {
  document.getElementById('formModal').style.display = 'none';
}

// === Event Listeners ===
document.addEventListener("DOMContentLoaded", function () {
  const getStarted = document.querySelector(".cta-button");
  const startTrial = document.querySelector(".btn-primary");
  const closeBtn = document.querySelector("#formModal .close");
  const form = document.getElementById("contact-form");

  // Open modal on button clicks
  [getStarted, startTrial].forEach(btn => {
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal();
      });
    }
  });

  // Close modal on close button click
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Close modal if clicking outside the modal content
  window.addEventListener("click", function (e) {
    if (e.target.id === "formModal") {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Handle form submission
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
