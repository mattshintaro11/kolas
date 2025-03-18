// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('emailModal');
    const demoBtn = document.querySelector('a[href="#demo"]');
    const closeBtn = document.querySelector('.close');
    const submitBtn = document.getElementById('submitEmail');
    const emailInput = document.getElementById('userEmail');
  
    // Open modal with animation
    demoBtn.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'block';
      // Trigger reflow for animation to work
      void modal.offsetWidth;
      modal.classList.add('active');
    });
  
    // Close modal
    function closeModal() {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 400);
    }
  
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  
    // Submit email
    submitBtn.addEventListener('click', function() {
      const email = emailInput.value.trim();
      if (email && validateEmail(email)) {
        showMessage('Thank you! Demo request received.');
        emailInput.value = '';
        closeModal();
      } else {
        showMessage('Please enter a valid email address.', 'error');
      }
    });
  
    // Email validation function
    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  });