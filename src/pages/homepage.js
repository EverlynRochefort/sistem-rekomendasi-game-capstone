import "../styles/main.css";
import "../styles/login.css";
import "../styles/register.css";

/* change dir to pages/auth */
import { LoginPage } from "./auth/loginpage.js";
import { RegisterPage } from "./auth/registerpage.js";

import { getRecommendedGames, getTrendingGames, searchGames } from "../api";
import {
  attachRegisterHandler,
  attachLoginHandler,
} from "../database/registerScript";
import { attachRekomendasiHandler } from "./rekomendasiPage.js";

/* use init to get the component rather than manually importing 1by1 */
import { createGameCard, Navbar, Footer } from "../components/index.js";

// Routing handler
export function handleRouting() {
  const app = document.getElementById("app");
  if (window.location.hash === "#/login") {
    app.innerHTML = LoginPage();
    attachLoginHandler();
  } else if (window.location.hash === "#/register") {
    app.innerHTML = RegisterPage(); // add the register page
    attachRegisterHandler();
  } else if (window.location.hash.startsWith("#/detail/")) {
    const appId = window.location.hash.split("#/detail/")[1];
    import("./dekripsipage.js").then((module) => {
      module.renderDeskripsiPage(appId);
    });
  } else if (window.location.hash === "#/koleksi") {
    import("./koleksiPage.js").then((module) => {
      module.renderKoleksiPage();
    });
  } else if (window.location.hash === "#/rekomendasi") {
    import("./rekomendasiPage.js").then(async (module) => {
      app.innerHTML = await module.renderRekomendasiPage();
      module.attachRekomendasiHandler();
    });
  } else {
    render();
  }
}

window.addEventListener("hashchange", handleRouting);
document.addEventListener("DOMContentLoaded", handleRouting);

async function render() {
  const app = document.getElementById("app");
  const username = localStorage.getItem("username");
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

  /* use component for navbar and footer */
  app.innerHTML = `
    ${Navbar(username)}

    <section class="hero">
        <h1>Temukan Game Terbaik untuk Anda</h1>
        <p>Sistem rekomendasi game pintar yang memahami selera Anda dan menyarankan game yang akan Anda sukai.</p>
        <div class="search-bar">
            <input type="text" id="search-input" placeholder="Cari game atau masukkan game favorit Anda..." />
            <button class="search-btn" id="search-btn">🔍</button>
        </div>
    </section>

    <div class="filter-bar">
        <div class="genre-filter">
            <span>Filter berdasarkan Genre :</span>
            <div class="genre-list">
                <button class="genre-btn active">Semua</button>
                <button class="genre-btn">Action</button>
                <button class="genre-btn">Adventure</button>
                <button class="genre-btn">RPG</button>
                <button class="genre-btn">Strategy</button>
                <button class="genre-btn">Simulation</button>
                <button class="genre-btn">Sports</button>
                <button class="genre-btn">Puzzle</button>
            </div>
        </div>
        <div class="platform-filter">
            <span>Platform :</span>
            <div class="platform-list">
                <button class="platform-btn">💻</button>
            </div>
        </div>
    </div>

    <main>
        <section class="recommend-section">
            <h2>Rekomendasi untuk Anda</h2>
            <div class="game-grid" id="recommendation-list">
                <div class="loading">Loading...</div>
            </div>
        </section>

        <section class="trending-section">
            <h2>Trending Minggu Ini</h2>
            <div class="game-grid" id="trending-list">
                <div class="loading">Loading...</div>
            </div>
        </section>

        <section class="search-results-section" style="display: none;">
            <h2>Hasil Pencarian</h2>
            <div class="game-grid" id="search-results">
                <div class="loading">Loading...</div>
            </div>
        </section>

        <section class="signup-banner">
            <h2>Dapatkan Rekomendasi yang Lebih Personal</h2>
            <p>Buat akun untuk mendapatkan rekomendasi game yang disesuaikan dengan preferensi dan riwayat bermain Anda.</p>
            ${username ? 
              `<button id="signup-btn" class="signup-btn">Dapatkan Rekomendasi</button>` :
              `<button id="signup-btn" class="signup-btn">Yuk Mulai!</button>`
            }
            <a href="#" class="learn-more">Pelajari Lebih Lanjut</a>
        </section>
    </main>

    ${Footer()}
    `;

  // Add event listener ke login page
  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      window.location.hash = "#/login";
    });
  }

  // add event listener ke daftar button di navbar
  const registerBtn = document.getElementById("register-btn");
  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      window.location.hash = "#/register";
    });
  }

  const rekomendasiBtn = document.getElementById("rekomendasi-btn");
  if (rekomendasiBtn) {
    rekomendasiBtn.addEventListener("click", () => {
      window.location.hash = "#/rekomendasi";
    });
  }

  // add event listener ke daftar button di card rekomendasi
  const signUpBtn = document.getElementById("signup-btn");
  if (signUpBtn) {
    signUpBtn.addEventListener("click", () => {
      if (username) {
        window.location.hash = "#/rekomendasi";
      } else {
        window.location.hash = "#/register";
      }
    });
  }

  //Action Recomendation Games
  try {
    const recommendedGames = await getRecommendedGames();
    const recList = document.getElementById("recommendation-list");
    recList.innerHTML = recommendedGames
      .map((game) => createGameCard(game))
      .join("");
  } catch (error) {
    console.error("Error loading recommended games:", error);
    document.getElementById("recommendation-list").innerHTML =
      '<div class="error">Error loading games</div>';
  }

  //Action Trending Games
  try {
    const trendingGames = await getTrendingGames();
    const trendList = document.getElementById("trending-list");
    trendList.innerHTML = trendingGames
      .map((game) => createGameCard(game))
      .join("");
  } catch (error) {
    console.error("Error loading trending games:", error);
    document.getElementById("trending-list").innerHTML =
      '<div class="error">Error loading games</div>';
  }

  //Action Detail Button
  document.querySelectorAll(".detail-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const appId = e.target.dataset.appid;
      window.location.hash = `#/detail/${appId}`;
    });
  });

  document.querySelector(".signup-banner").style.display = "block";

  // Action untuk fitur search
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const searchResultsSection = document.querySelector(
    ".search-results-section"
  );
  const recommendSection = document.querySelector(".recommend-section");
  const trendingSection = document.querySelector(".trending-section");

  async function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
      searchResultsSection.style.display = "block";
      recommendSection.style.display = "none";
      trendingSection.style.display = "none";
      searchResultsSection.querySelector("h2").textContent =
        "Menampilkan Hasil Game Yang Dicari";
      const searchResults = document.getElementById("search-results");
      searchResults.innerHTML = '<div class="loading">Mencari game...</div>';
      try {
        const results = await searchGames(query);
        if (results.length > 0) {
          searchResults.innerHTML = results
            .map((game) => createGameCard(game))
            .join("");
          // Event Listener untuk button detail game diluar ID populer
          searchResults.querySelectorAll(".detail-btn").forEach((button) => {
            button.addEventListener("click", (e) => {
              const appId = e.target.dataset.appid;
              window.location.hash = `#/detail/${appId}`;
            });
          });
        } else {
          searchResults.innerHTML =
            '<div class="no-results">Game yang kamu cari ga ada nih :(</div>';
        }
      } catch (error) {
        console.error("Error searching games:", error);
        searchResults.innerHTML =
          '<div class="error">Error saat mencari game</div>';
      }
    } else {
      searchResultsSection.style.display = "none";
      recommendSection.style.display = "block";
      trendingSection.style.display = "block";
    }
  }

  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("username");
      window.location.hash = "#/";
      render();
    });
  }

  // Tambahkan event listener untuk navigasi Koleksi
  const navKoleksi = document.getElementById("nav-koleksi");
  if (navKoleksi) {
    navKoleksi.addEventListener("click", () => {
      window.location.hash = "#/koleksi";
    });
  }
}
