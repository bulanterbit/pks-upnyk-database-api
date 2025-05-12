// Check authentication status
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    
    // If not logged in and trying to access protected page
    if (!isLoggedIn && (window.location.pathname.includes("adminview.html") || 
                       window.location.pathname.includes("editform.html") || 
                       window.location.pathname.includes("formAdmin.html"))) {
      // Redirect to login page
      window.location.href = "index.html";
    }
  }
  
  // Logout function
  function logout() {
    sessionStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
  }
  
  // Run check on page load
  document.addEventListener("DOMContentLoaded", checkAuth);