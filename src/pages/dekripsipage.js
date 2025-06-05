import "../styles/deskripsi.css";
import "../styles/main.css";
import { fetchGameDetails, getSimilarGames } from "../api";
import { createGameCard } from "./components";

export async function renderDeskripsiPage(appId) {
  const app = document.getElementById("app");
  app.innerHTML = `<div class='loading'>Loading...</div>`;
  try {
    const detail = await fetchGameDetails(appId);
    if (!detail.success) throw new Error("Data tidak ditemukan");
    const data = detail.data;
    // Genre
    const genres = data.genres ? data.genres.map(g => `<span class='genre-badge'>${g.description}</span>`).join("") : "";
    // Platform
    const platforms = data.platforms ? Object.keys(data.platforms).filter(p => data.platforms[p]).map(p => `<span class='platform-badge'>${p}</span>`).join("") : "";
    // Screenshot
    const screenshots = data.screenshots ? data.screenshots.map((s, i) => `<img src='${s.path_full}' class='ss-img' data-ss-idx='${i}'/>`).join("") : "<div style='color:#b8c1ec'>Tidak ada screenshot.</div>";
    // Fitur utama (contoh)
    const features = data.categories ? data.categories.slice(0,4).map(f => `<li><span class='checkmark'>✔</span> ${f.description}</li>`).join("") : "";
    // System requirements
    const sysreq = data.pc_requirements ? (data.pc_requirements.recommended || data.pc_requirements.minimum || "-") : "-";
    // Ulasan
    const reviews = data.recommendations ? `<div class='review-box'><b>Total Review:</b> ${data.recommendations.total.toLocaleString()}</div>` : "<div class='review-box'>Tidak ada data ulasan.</div>";
    // Navbar greeting sesuai status login
    const username = localStorage.getItem('username');
    let authButtons = '';
    if (username) {
      authButtons = `
        <span class="greeting">Hi, ${username} apa kabar?</span>
        <button id="logout-btn" class="logout-btn">Logout</button>
      `;
    } else {
      authButtons = `
        <button id="register-btn" class="register-btn">Daftar</button>
        <button id="login-btn" class="login-btn">Masuk</button>
      `;
    }
    // Info
    app.innerHTML = `
      <nav class="navbar detail-navbar">
        <div class="logo"><span class="logo-icon">🎮</span> GameMatch</div>
        <ul class="nav-links">
          <li onclick="window.location.hash=''">Beranda</li>
          <li>Eksplorasi</li>
          <li>Koleksi</li>
          <li>Tentang</li>
          <li>Tentang</li>
        </ul>
        <div class="auth-buttons">
            ${authButtons}
        </div>
      </nav>
      <div class="detail-container">
        <div class="detail-header">
          <img class="detail-cover" src="https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/header.jpg"/>
          <div class="detail-main">
            <h1>${data.name}</h1>
            <div class="genre-list">${genres}</div>
            <div class="rating-match">
              <span class="star">★</span> <span class="rating">${data.metacritic ? data.metacritic.score/10 : "-"}/10</span>
              <span class="match">${Math.floor(Math.random()*10+85)}% Match</span>
            </div>
            <div class="detail-actions">
              <a href="${data.website || `https://store.steampowered.com/app/${appId}` }" target="_blank" class="trailer-btn">Tonton Trailer</a>
              <button class="koleksi-btn">+ Tambah ke Koleksi</button>
              <button class="share-btn">Bagikan</button>
            </div>
          </div>
        </div>
        <div class="detail-tabs">
          <button class="tab-btn active" data-tab="ikhtisar">Ikhtisar</button>
          <button class="tab-btn" data-tab="screenshot">Screenshot</button>
          <button class="tab-btn" data-tab="system">Persyaratan Sistem</button>
          <button class="tab-btn" data-tab="ulasan">Ulasan</button>
          <button class="tab-btn" data-tab="dlc">DLC & Konten</button>
        </div>
        <div class="detail-content" id="tab-content">
          <!-- Ikhtisar default -->
          <div class="overview-section">
            <h2>Tentang Game</h2>
            <p>${data.short_description || ""}</p>
            <div class="info-box">
              <h3>Informasi</h3>
              <div><b>Pengembang:</b> ${data.developers ? data.developers.join(", ") : "-"}</div>
              <div><b>Penerbit:</b> ${data.publishers ? data.publishers.join(", ") : "-"}</div>
              <div><b>Tanggal Rilis:</b> ${data.release_date ? data.release_date.date : "-"}</div>
              <div><b>Platform:</b> ${platforms}</div>
              <div><b>Mode:</b> ${data.categories && data.categories.some(c=>c.id===2) ? "Single-player" : "Multi-player"}</div>
              <div><b>Rating Usia:</b> ${data.required_age ? `PEGI ${data.required_age}` : "-"}</div>
            </div>
          </div>
          <div class="feature-section">
            <h3>Fitur Utama</h3>
            <ul>${features}</ul>
          </div>
        </div>
      </div>
      <div id="lightbox-overlay" class="lightbox-overlay" style="display:none">
        <div class="lightbox-content">
          <span class="lightbox-close">&times;</span>
          <img id="lightbox-img" src="" alt="Screenshot Besar" />
        </div>
      </div>
    <section class="recommend-section" id="similar-section">
        <h3>Game Serupa yang Mungkin Anda Suka</h3>
        <div class="game-grid" id="similar-list">
          <div class="loading">Loading...</div>
        </div>
      </section>

      <footer class="footer">
        <div class="footer-columns">
            <div class="footer-col">
                <div class="footer-logo">
                    <span>🎮</span>
                    GameMatch
                </div>
                <p>Temukan game terbaik yang sesuai dengan selera Anda melalui sistem rekomendasi game pintar kami.</p>
            </div>
            
            <div class="footer-col">
                <h3>Navigasi</h3>
                <ul>
                    <li>Beranda</li>
                    <li>Eksplorasi</li>
                    <li>Koleksi</li>
                    <li>Tentang Kami</li>
                    <li>Blog</li>
                </ul>
            </div>

            <div class="footer-col">
                <h3>Genre</h3>
                <ul>
                    <li>Action</li>
                    <li>Adventure</li>
                    <li>RPG</li>
                    <li>Strategy</li>
                    <li>Sports</li>
                    <li>Simulation</li>
                </ul>
            </div>

            <div class="footer-col">
                <h3>Hubungi Kami</h3>
                <ul>
                    <li>info@gamematch.com</li>
                    <li>+62 123 4567 890</li>
                </ul>
                
                <h3 class="subscribe-title">Berlangganan</h3>
                <div class="subscribe-form">
                    <input type="email" placeholder="Email Anda" />
                    <button class="subscribe-btn">Kirim</button>
                </div>
            </div>
        </div>
        
        <div class="copyright">
            © 2023 GameMatch. Semua hak dilindungi.
        </div>
    </footer>
    `;

    // 5 Tab logic
    const tabContent = document.getElementById("tab-content");
    const tabBtns = document.querySelectorAll(".tab-btn");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        tabBtns.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        const tab = this.getAttribute("data-tab");
        if(tab === "ikhtisar") {
          tabContent.innerHTML = `
            <div class='overview-section'>
              <h2>Tentang Game</h2>
              <p>${data.short_description || ""}</p>
              <div class='info-box'>
                <h3>Informasi</h3>
                <div><b>Pengembang:</b> ${data.developers ? data.developers.join(", ") : "-"}</div>
                <div><b>Penerbit:</b> ${data.publishers ? data.publishers.join(", ") : "-"}</div>
                <div><b>Tanggal Rilis:</b> ${data.release_date ? data.release_date.date : "-"}</div>
                <div><b>Platform:</b> ${platforms}</div>
                <div><b>Mode:</b> ${data.categories && data.categories.some(c=>c.id===2) ? "Single-player" : "Multi-player"}</div>
                <div><b>Rating Usia:</b> ${data.required_age ? `PEGI ${data.required_age}` : "-"}</div>
              </div>
            </div>
            <div class='feature-section'>
              <h3>Fitur Utama</h3>
              <ul>${features}</ul>
            </div>
          `;
        } else if(tab === "screenshot") {
          tabContent.innerHTML = `
            <div class='screenshot-section' style='width:100%'>
              <h3>Screenshot</h3>
              <div class='ss-list'>${screenshots}</div>
            </div>
          `;
          setupLightbox();
        } else if(tab === "system") {
          tabContent.innerHTML = `
            <div class='sysreq-section'>
              <h3>Persyaratan Sistem</h3>
              <div class='sysreq-box'>${sysreq}</div>
            </div>
          `;
        } else if(tab === "ulasan") {
          tabContent.innerHTML = `
            <div class='review-section'>
              <h3>Ulasan</h3>
              ${reviews}
            </div>
          `;
        } else if(tab === "dlc") {
          tabContent.innerHTML = `<div class='dlc-section'><h3>DLC & Konten</h3><div style='color:#b8c1ec'>Belum tersedia.</div></div>`;
        }
      });
    });

    // Lightbox logic
    function setupLightbox() {
      const imgs = document.querySelectorAll('.ss-img');
      const overlay = document.getElementById('lightbox-overlay');
      const lightboxImg = document.getElementById('lightbox-img');
      const closeBtn = document.querySelector('.lightbox-close');
      imgs.forEach(img => {
        img.addEventListener('click', function() {
          lightboxImg.src = this.src;
          overlay.style.display = 'flex';
        });
      });
      closeBtn.addEventListener('click', function() {
        overlay.style.display = 'none';
        lightboxImg.src = '';
      });
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          overlay.style.display = 'none';
          lightboxImg.src = '';
        }
      });
    }
    setupLightbox();

    // Event untuk button login register
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        window.location.hash = "#/login";
      });
    }
    const registerBtn = document.getElementById("register-btn");
    if (registerBtn) {
      registerBtn.addEventListener("click", () => {
        window.location.hash = "#/register";
      });
    }
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("username");
        window.location.hash = "#/";
      });
    }

    // Load similar games
    try {
      const similarGames = await getSimilarGames(appId);
      const similarList = document.getElementById("similar-list");
      if (similarGames.length > 0) {
        similarList.innerHTML = similarGames
          .map((game) => createGameCard(game))
          .join("");
        
        // Add event listeners to the detail buttons
        similarList.querySelectorAll(".detail-btn").forEach((button) => {
          button.addEventListener("click", (e) => {
            const appId = e.target.dataset.appid;
            window.location.hash = `#/detail/${appId}`;
          });
        });
      } else {
        similarList.innerHTML = '<div class="no-results">Tidak ada game serupa yang ditemukan.</div>';
      }
    } catch (error) {
      console.error("Error loading similar games:", error);
      document.getElementById("similar-list").innerHTML =
        '<div class="error">Error loading similar games</div>';
    }
  } catch (e) {
    app.innerHTML = `<div class='error'>Gagal memuat data game.</div>`;
  }
}

