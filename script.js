document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const closeSidebar = document.getElementById("closeSidebar");
  const modal = document.getElementById("contactModal");
  const closeModal = document.getElementById("closeModal");

  // Open sidebar menu
  menuToggle.addEventListener("click", function () {
    sidebar.style.right = "0"; // Slide in
  });

  // Close sidebar menu
  closeSidebar.addEventListener("click", function () {
    sidebar.style.right = "-250px"; // Slide out
  });

  // All "Contact Us" buttons
  const contactBtns = document.querySelectorAll(
    'a[href="#contact"].btn, a.btn[href="#contact"]'
  );

  contactBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      modal.style.display = "block";
    });
  });

  closeModal.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Privacy Policy Modal functionality
  const privacyModal = document.getElementById("privacyModal");
  const openPrivacy = document.getElementById("openPrivacy");
  const closePrivacy = document.getElementById("closePrivacy");

  if (openPrivacy && privacyModal && closePrivacy) {
    openPrivacy.addEventListener("click", function (e) {
      e.preventDefault();
      privacyModal.style.display = "block";
    });

    closePrivacy.addEventListener("click", function () {
      privacyModal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target === privacyModal) {
        privacyModal.style.display = "none";
      }
    });
  }

  // Terms of Service Modal functionality
  const termsModal = document.getElementById("termsModal");
  const openTerms = document.getElementById("openTerms");
  const closeTerms = document.getElementById("closeTerms");

  if (openTerms && termsModal && closeTerms) {
    openTerms.addEventListener("click", function (e) {
      e.preventDefault();
      termsModal.style.display = "block";
    });

    closeTerms.addEventListener("click", function () {
      termsModal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target === termsModal) {
        termsModal.style.display = "none";
      }
    });
  }

  //Contact Form fuctionality
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById("name").value.trim(),
      company_name: document.getElementById("company_name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone_number: document.getElementById("phone_number").value.trim(),
      industry_type: document.getElementById("industry_type").value,
      message: document.getElementById("message").value.trim(),
    };

    // Basic client-side validation
    if (!formData.name || !formData.company_name || !formData.email) {
      alert("Please fill in all required fields (Name, Company name, Email)");
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    try {
      const response = await fetch("contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert(
          result.message ||
            "Thank you for your submission! We will get back to you soon."
        );
        contactForm.reset();
      } else {
        alert(
          "Error: " +
            (result.error || "Something went wrong. Please try again.")
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      alert(
        "Network error occurred. Please check your connection and try again."
      );
    } finally {
      // Reset button state
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    }
  });

  // Phone number formatting (basic)
  const phoneInput = document.getElementById("phone_number");
  phoneInput.addEventListener("input", function () {
    // Remove all non-numeric characters
    let value = this.value.replace(/\D/g, "");

    if (value.length != 10) {
      this.style.borderColor = "#ff6b6b";
    } else {
      this.style.borderColor = "";
    }
    this.value = value;
  });
});
