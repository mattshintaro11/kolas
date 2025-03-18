document.addEventListener('DOMContentLoaded', function() {
    const messageHandler = new Message();
    const modalHandler = new Modal('emailModal', messageHandler);
  
    // Attach event listeners to open the modal on specific links
    document.querySelectorAll('a[href="#contact"], a[href="#demo"]').forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        modalHandler.openModal();
      });
    });
  });
  