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