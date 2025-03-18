class Modal {
    constructor(modalId, messageHandler) {
      this.modal = document.getElementById(modalId);
      this.messageHandler = messageHandler;
      this.init();
    }
  
    init() {
      this.submitButton = this.modal.querySelector('#submitEmail');
      this.emailInput = this.modal.querySelector('#userEmail');
      this.closeBtn = this.modal.querySelector('.close');
  
      // When the submit button is clicked, validate and respond
      this.submitButton.addEventListener('click', () => {
        if (this.emailInput.value.trim() !== "") {
          this.messageHandler.showMessage("Thanks! A team member will reach out to you shortly.");
          this.closeModal();
        } else {
          this.messageHandler.showMessage("Please enter a valid email address.");
        }
      });
  
      // Close modal on clicking the close button
      this.closeBtn.addEventListener('click', () => this.closeModal());
  
      // Close modal when clicking outside of modal content
      window.addEventListener("click", (event) => {
        if (event.target === this.modal) {
          this.closeModal();
        }
      });
    }
  
    openModal() {
      this.modal.style.display = 'block';
    }
  
    closeModal() {
      this.modal.style.display = 'none';
      this.emailInput.value = "";
    }
  }
  