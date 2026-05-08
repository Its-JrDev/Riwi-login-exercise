const getById = (id) => document.getElementById(id);

/**
 * Displays feedback messages in the UI using BEM modifiers
 * @param {string} text - The message to display
 * @param {string} type - The modifier type ('error' or 'success')
 */
function showMessage(text, type) {
  const box = getById('message-box');
  box.textContent = text;
  // Updates class using BEM: block--modifier
  box.className = `status-message status-message--${type}`;
}

/**
 * Handles the authentication logic with the local API
 */
async function performLogin(email, password) {
  const box = getById('message-box');
  box.className = 'status-message'; // Reset to base class only

  try {
    const url = `http://localhost:3000/coders?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 1) {
      const user = data[0];
      showMessage(`Welcome back, ${user.name}!`, 'success');
      
      // Optional: Redirect after success
      // setTimeout(() => window.location.href = 'dashboard.html', 2000);
      
      return user;
    } else {
      showMessage("Invalid email or password.", "error");
      return null;
    }
  } catch (error) {
    console.error("Fetch error:", error);
    showMessage("Server connection failed.", "error");
    return null;
  }
}

// Global Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = getById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault(); 
      
      const email = getById('userEmail').value;
      const password = getById('userPassword').value;
      
      await performLogin(email, password);
    });
  }
});
