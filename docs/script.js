function openModal() {
  document.getElementById('formModal').style.display = 'block';
  const ts = new Date().toLocaleString();
  document.getElementById('timestamp').value = ts;
}

function closeModal() {
  document.getElementById('formModal').style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
  const getStarted = document.querySelector(".cta-button");
  const startTrial = document.querySelector(".btn-primary");
  const closeBtn = document.querySelector("#formModal .close");

  [getStarted, startTrial].forEach(btn => {
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal();
      });
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  window.addEventListener("click", function (e) {
    if (e.target.id === "formModal") {
      closeModal();
    }
  });
});
