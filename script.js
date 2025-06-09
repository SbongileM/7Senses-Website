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

  // Privacy Policy Modal functionality
  const privacyModal = document.getElementById('privacyModal');
  const openPrivacy = document.getElementById('openPrivacy');
  const closePrivacy = document.getElementById('closePrivacy');

  if (openPrivacy && privacyModal && closePrivacy) {
    openPrivacy.addEventListener('click', function(e) {
      e.preventDefault();
      privacyModal.style.display = 'block';
    });

    closePrivacy.addEventListener('click', function() {
      privacyModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
      if (event.target === privacyModal) {
        privacyModal.style.display = 'none';
      }
    });
  }

  // Terms of Service Modal functionality
  const termsModal = document.getElementById('termsModal');
  const openTerms = document.getElementById('openTerms');
  const closeTerms = document.getElementById('closeTerms');

  if (openTerms && termsModal && closeTerms) {
    openTerms.addEventListener('click', function(e) {
      e.preventDefault();
      termsModal.style.display = 'block';
    });

    closeTerms.addEventListener('click', function() {
      termsModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
      if (event.target === termsModal) {
        termsModal.style.display = 'none';
      }
    });
  }
});