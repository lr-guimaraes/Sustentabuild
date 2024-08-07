document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(registerForm);

        fetch('register.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById('register-result').textContent = data;
            registerForm.reset();
        })
        .catch(error => console.error('Error:', error));
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(loginForm);

        fetch('login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById('login-result').textContent = data;
            loginForm.reset();
        })
        .catch(error => console.error('Error:', error));
    });
});
// script.js
function toggleForm(formType) {
    var loginForm = document.getElementById('login-form');
    var registerForm = document.getElementById('register-form');
    var loginToggle = document.getElementById('login-toggle');
    var registerToggle = document.getElementById('register-toggle');

    if (formType === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginToggle.classList.add('active');
        registerToggle.classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        loginToggle.classList.remove('active');
        registerToggle.classList.add('active');
    }
}
