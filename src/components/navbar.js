export function Navbar(username) {
  let authButtons = "";
  if (username) {
    authButtons = `<span class="greeting">Hi, ${username} apa kabar?</span>
        <button id="logout-btn" class="logout-btn">Logout</button>`;
  } else {
    authButtons = `
            <button id="register-btn" class="register-btn">Daftar</button>
            <button id="login-btn" class="login-btn">Masuk</button>
        `;
  }

  return `
        <nav class="navbar">
            <div class="logo">
                <span class="logo-icon">🎮</span>
                GameMatch
            </div>
            <ul class="nav-links">
                <li id="nav-beranda"><a href="#/">Beranda</a></li>
                <li id="nav-eksplorasi"><a href="#/eksplorasi">Eksplorasi</a></li>
                <li id="nav-koleksi"><a href="#/koleksi">Koleksi</a></li>
                <li id="nav-tentang"><a href="#/tentang">Tentang Kami</a></li>
                <li><a href="#/blog">Blog</a></li>
            </ul>
            <div class="auth-buttons">
                ${authButtons}
            </div>
        </nav>
    `;
}
