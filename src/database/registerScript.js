// REGISTER
export function attachRegisterHandler() {
  const registerForm = document.getElementById('registerForm');
  const errorMessage = document.getElementById('errorMessage');
  if (!registerForm) return;

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate passwords match
    if (password !== confirmPassword) {
      errorMessage.textContent = 'Password tidak sama dengan konfirmasi password';
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registrasi berhasil! Silakan login.");
        window.location.hash = '#/login';
      } else {
        errorMessage.textContent = data.message || 'Registration failed';
      }
    } catch (error) {
      errorMessage.textContent = 'An error occurred. Please try again.';
      console.error('Registration error:', error);
    }
  });
}

// LOGIN
export function attachLoginHandler() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login berhasil!");
        localStorage.setItem('username', email);
        window.location.hash = '#/';
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  });
}
