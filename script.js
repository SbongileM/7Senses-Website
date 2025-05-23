document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const closeSidebar = document.getElementById("closeSidebar");
  
    // Open sidebar menu
    menuToggle.addEventListener("click", function () {
      sidebar.style.right = "0"; // Slide in
    });

    // Close sidebar menu
    closeSidebar.addEventListener("click", function () {
      sidebar.style.right = "-250px"; // Slide out
    });
  });

  // Modal functionality
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('contactModal');
  const closeModal = document.getElementById('closeModal');
  // All "Contact Us" buttons
  const contactBtns = document.querySelectorAll('a[href="#contact"].btn, a.btn[href="#contact"]');

  contactBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'block';
    });
  });

  closeModal.onclick = function() {
    modal.style.display = 'none';
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
});