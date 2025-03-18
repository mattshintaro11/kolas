class Message {
    constructor() {
      this.messageContainer = document.createElement('div');
      this.messageContainer.className = 'message-container';
      document.body.appendChild(this.messageContainer);
    }
  
    showMessage(text, duration = 3000) {
      const messageEl = document.createElement('div');
      messageEl.className = 'message';
      messageEl.innerText = text;
      this.messageContainer.appendChild(messageEl);
  
      // Fade out and remove message after a set duration
      setTimeout(() => {
        messageEl.classList.add('fade-out');
        setTimeout(() => {
          messageEl.remove();
        }, 500);
      }, duration);
    }
  }
  