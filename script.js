document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const registerResult = document.getElementById('register-result');
    const loginResult = document.getElementById('login-result');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(registerForm);

        fetch('register.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            registerResult.textContent = data;
            registerResult.style.color = data.includes("sucesso") ? "green" : "red";
            registerForm.reset();
        })
        .catch(error => {
            registerResult.textContent = "Ocorreu um erro: " + error;
            registerResult.style.color = "red";
        });
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
            loginResult.textContent = data;
            loginResult.style.color = data.includes("sucesso") ? "green" : "red";
            loginForm.reset();
        })
        .catch(error => {
            loginResult.textContent = "Ocorreu um erro: " + error;
            loginResult.style.color = "red";
        });
    });
});

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
