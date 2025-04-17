/**
 * Login functionality for Johanna's Cambridge Life website
 */

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    
    // The password to access the website
    // In a real production environment, this would be handled server-side
    const correctPassword = 'Narnia'; // You can change this to any password you prefer
    
    // Check if user is already authenticated
    if (sessionStorage.getItem('authenticated') === 'true') {
        // If already authenticated, redirect to the main page
        window.location.href = 'index.html';
    }
    
    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const passwordInput = document.getElementById('password');
            const enteredPassword = passwordInput.value.trim();
            
            if (enteredPassword === correctPassword) {
                // Set authentication in session storage
                sessionStorage.setItem('authenticated', 'true');
                
                // Redirect to the main page
                window.location.href = 'index.html';
            } else {
                // Show error message
                loginMessage.style.display = 'block';
                
                // Clear password field
                passwordInput.value = '';
                
                // Focus on password field
                passwordInput.focus();
            }
        });
    }
});