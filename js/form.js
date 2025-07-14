document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
  input.addEventListener('blur', function () {
    if (this.value !== '') {
      this.setAttribute('data-filled', 'true');
    } else {
      this.removeAttribute('data-filled');
    }
  });
});

document.getElementById("contactForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = this.querySelector('.submit-btn');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<span>Sending...</span>';
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.innerHTML = '<span>Message Sent!</span>';
    submitBtn.style.background = '#4CAF50';

    setTimeout(() => {
      this.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = 'var(--accent-color)';
      submitBtn.disabled = false;
    }, 2000);
  }, 1500);

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const body = `Nombre: ${name}%0AEmail: ${email}%0A%0AMensaje:%0A${encodeURIComponent(message)}`;
  const mailtoLink = `mailto:francinaferretti@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

  window.location.href = mailtoLink;
});
