document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('emailModal');
    // Select both buttons that should trigger the modal
    const triggerButtons = document.querySelectorAll('a[href="#demo"], a[href="#contact"]');
    const closeBtn = document.querySelector('.close');
    const submitBtn = document.getElementById('submitEmail');
    const emailInput = document.getElementById('userEmail');

    // Function to open the modal
    function openModal() {
      modal.style.display = 'block';
      // Trigger reflow for animation to work
      void modal.offsetWidth;
      modal.classList.add('active');
    }

    // Attach open event listener to both buttons
    triggerButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
      });
    });

    // Function to close the modal with animation
    function closeModal() {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 400);
    }

    // Close the modal when clicking the close button
    closeBtn.addEventListener('click', closeModal);

    // Close the modal when clicking outside the modal-content
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeModal();
      }
    });

    // Handle the email submission
    submitBtn.addEventListener('click', async function() {
      const email = emailInput.value.trim();
      const honeypot = document.getElementById('companyField');

      if (!email || !validateEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
      }

      submitBtn.disabled = true;
      const originalLabel = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';

      try {
        const response = await fetch('/api/book-call', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            company: honeypot ? honeypot.value : ''
          })
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || 'Request failed');
        }

        showMessage('Thank you! We\'ll be in touch to schedule a call.');
        emailInput.value = '';
        closeModal();
      } catch (err) {
        showMessage('Something went wrong — please try again or email us directly.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });

    // Submit on Enter from the email field
    emailInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        submitBtn.click();
      }
    });

    // Simple email validation
    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
});
