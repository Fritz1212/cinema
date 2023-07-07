document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('#registerForm');
    const loginForm = document.querySelector('#loginForm');
  
    registerForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const registerName = document.querySelector('#registerName').value;
      const registerPassword = document.querySelector('#registerPassword').value;
  
      // Store the username and password in local storage
      localStorage.setItem('username', registerName);
      localStorage.setItem('password', registerPassword);
  
      // Clear the input fields
      document.querySelector('#registerName').value = '';
      document.querySelector('#registerPassword').value = '';
  
      alert('Registration successful!');
    });
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const loginName = document.querySelector('#loginName').value;
      const loginPassword = document.querySelector('#loginPassword').value;
  
      // Retrieve the stored username and password from local storage
      const storedName = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');
  
      if (loginName === storedName && loginPassword === storedPassword) {
        // Redirect to index.html (change the URL as per your requirements)
        window.location.href = 'index.html';
      } else {
        alert('Invalid credentials. Please try again.');
      }
  
      // Clear the input fields
      document.querySelector('#loginName').value = '';
      document.querySelector('#loginPassword').value = '';
    });
  });
  