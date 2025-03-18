// Message functionality
function showMessage(text, type = 'success') {
    const container = document.querySelector('.message-container') || createMessageContainer();
    const message = document.createElement('div');
    message.className = 'message ' + type;
    message.textContent = text;
    
    container.appendChild(message);
    
    // Trigger animation
    setTimeout(() => {
      message.classList.add('show');
    }, 10);
    
    // Remove message after delay
    setTimeout(() => {
      message.classList.remove('show');
      message.classList.add('fade-out');
      setTimeout(() => {
        message.remove();
      }, 400);
    }, 5000);
  }
  
  function createMessageContainer() {
    const container = document.createElement('div');
    container.className = 'message-container';
    document.body.appendChild(container);
    return container;
  }
  
  // Add a global function to show messages from other scripts
  window.showMessage = showMessage;