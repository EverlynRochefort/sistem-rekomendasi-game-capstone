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
            <div class="logo" id="game-match-logo">
                <a href="#/">
                    <span class="logo-icon">🎮</span>
                    GameMatch
                </a>
            </div>
            <ul class="nav-links">
                <li id="nav-beranda"><a href="#/">Beranda</a></li>
                <li id="nav-koleksi"><a href="#/koleksi">Koleksi</a></li>
                <li id="nav-tentang"><a href="#/chatbot">Chatbot</a></li>
                <li id="nav-tentang"><a href="#/TentangKami">Tentang Kami</a></li>
            </ul>
            <div class="auth-buttons">
                ${authButtons}
            </div>
        </nav>
    `;
}
