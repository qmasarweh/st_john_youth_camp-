document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorElement = document.getElementById("error");

    // Valid credentials with redirect URLs and admin status
    const validCredentials = [
        { username: "team1", password: "password1", redirect: "main.html" },
        { username: "team2", password: "password2", redirect: "main.html" },
        { username: "qusai", password: "qosi2004", redirect: "admin.html", isAdmin: true }
    ];

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent form from refreshing the page

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            // Validate inputs
            if (!username || !password) {
                return showError("Username and password cannot be empty.");
            }

            try {
                // Find a matching user
                const matchedUser = validCredentials.find(
                    (user) => user.username === username && user.password === password
                );

                if (matchedUser) {
                    handleSuccessfulLogin(matchedUser); // Handle successful login
                } else {
                    showError("Invalid username or password. Please try again.");
                }
            } catch (error) {
                console.error("Unexpected error occurred:", error);
                showError("An unexpected error occurred. Please try again later.");
            }
        });
    }

    // Handle successful login
    function handleSuccessfulLogin(user) {
        localStorage.setItem("isLoggedIn", "true"); // Store login status
        if (user.isAdmin) {
            localStorage.setItem("isAdmin", "true"); // Store admin status
        }
        window.location.href = user.redirect; // Redirect to the specified page
    }

    // Show error message
    function showError(message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.color = "#ff4444"; // Red color for errors
            errorElement.style.display = "block";

            // Fade-in effect
            errorElement.style.opacity = "1";

            // Fade out after 3 seconds
            setTimeout(() => {
                errorElement.style.opacity = "0";
                setTimeout(() => {
                    errorElement.style.display = "none";
                }, 500); // Smooth fade-out
            }, 3000);
        }
    }

    // Clear error message on input focus
    function clearError() {
        if (errorElement) {
            errorElement.style.display = "none";
            errorElement.textContent = "";
        }
    }

    // Attach input focus event listeners to clear errors
    if (usernameInput && passwordInput) {
        usernameInput.addEventListener("focus", clearError);
        passwordInput.addEventListener("focus", clearError);
    }
});