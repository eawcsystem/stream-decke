document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    showLoginPage();

    function showLoginPage() {
        app.innerHTML = `
            <h2>Login</h2>
            <input type="email" id="email" placeholder="Email">
            <input type="password" id="password" placeholder="Password">
            <button id="loginBtn">Login</button>
            <button id="registerBtn">Register</button>
        `;

        document.getElementById('loginBtn').addEventListener('click', login);
        document.getElementById('registerBtn').addEventListener('click', showRegisterPage);
    }

    function showRegisterPage() {
        app.innerHTML = `
            <h2>Register</h2>
            <input type="email" id="email" placeholder="Email">
            <input type="password" id="password" placeholder="Password">
            <button id="registerBtn">Register</button>
        `;

        document.getElementById('registerBtn').addEventListener('click', register);
    }

    function register() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        // Simulate sending confirmation code via email
        sendConfirmationCode(email);
        showConfirmationPage(email, password);
    }

    function sendConfirmationCode(email) {
        // Simulate sending an email with the confirmation code
        console.log(`Sending confirmation code to ${email}`);
        alert(`Confirmation code sent to ${email}`);
    }

    function showConfirmationPage(email, password) {
        app.innerHTML = `
            <h2>Confirm Registration</h2>
            <input type="text" id="confirmationCode" placeholder="Confirmation Code">
            <button id="confirmBtn">Confirm</button>
        `;

        document.getElementById('confirmBtn').addEventListener('click', () => confirmRegistration(email, password));
    }

    function confirmRegistration(email, password) {
        const confirmationCode = document.getElementById('confirmationCode').value;
        if (confirmationCode === '1234') { // Simulate confirmation code check
            alert('Registration successful');
            // Store user credentials securely
            localStorage.setItem('user', JSON.stringify({ email, password }));
            showFilmSelectionPage();
        } else {
            alert('Invalid confirmation code');
        }
    }

    function login() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        // Retrieve stored user credentials
        const storedUser = JSON.parse(localStorage.getItem('user'));
        // Simulate login
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            showFilmSelectionPage();
        } else {
            alert('Invalid login credentials');
        }
    }

    function showFilmSelectionPage() {
        app.innerHTML = `
            <h2>Select a Film</h2>
            <button class="filmBtn" data-film="Film 1">Film 1</button>
            <button class="filmBtn" data-film="Film 2">Film 2</button>
            <button class="filmBtn" data-film="Film 3">Film 3</button>
        `;

        document.querySelectorAll('.filmBtn').forEach(button => {
            button.addEventListener('click', (e) => {
                const film = e.target.getAttribute('data-film');
                showFilmPage(film);
            });
        });
    }

    function showFilmPage(film) {
        app.innerHTML = `
            <h2>${film}</h2>
            <video id="filmVideo" controls controlsList="nodownload">
                <source src="intro.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;

        const video = document.getElementById('filmVideo');
        video.addEventListener('ended', () => {
            video.src = `${film.toLowerCase().replace(' ', '_')}.mp4`;
            video.play();
        });

        video.play();
    }
});
