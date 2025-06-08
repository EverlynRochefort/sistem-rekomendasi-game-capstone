import { createGameCard, Navbar } from "../components/index";
import { fetchGameDetails } from "../api";
import "../styles/main.css";

export async function renderKoleksiPage() {
  const app = document.getElementById("app");
  const username = localStorage.getItem("username");
  if (!username) {
    alert("Silakan login untuk melihat koleksi game Anda.");
    window.location.hash = "#/login";
    return;
  }
  const koleksiKey = `koleksi_${username}`;
  const koleksi = JSON.parse(localStorage.getItem(koleksiKey) || "[]");

  app.innerHTML = `
    ${Navbar(username)}  

    <section class="koleksi-section">
      <h2>Koleksi Game Saya</h2>
      <div class="game-grid" id="koleksi-list">
        <div class="loading">Loading...</div>
      </div>
    </section>
  `;

  // Event listener untuk navigasi
  const navKoleksi = document.getElementById("nav-koleksi");
  if (navKoleksi)
    navKoleksi.addEventListener(
      "click",
      () => (window.location.hash = "#/koleksi")
    );
  const navBeranda = document.getElementById("nav-beranda");
  if (navBeranda)
    navBeranda.addEventListener("click", () => (window.location.hash = "#/"));
  const navTentang = document.getElementById("nav-tentang");
  if (navTentang)
    navTentang.addEventListener(
      "click",
      () => (window.location.hash = "#/tentang")
    );

  // Logout
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("username");
      window.location.hash = "#/";
    });
  }

  // Render koleksi
  const koleksiList = document.getElementById("koleksi-list");
  if (!koleksi || koleksi.length === 0) {
    koleksiList.innerHTML = `<div class='koleksi-empty'>Belum ada game di koleksi Anda.</div>`;
    return;
  }
  // Ambil detail game dari API
  Promise.all(koleksi.map((appid) => fetchGameDetails(appid))).then(
    (detailsArr) => {
      const games = detailsArr
        .filter((d) => d && d.success)
        .map((d) => ({
          title: d.data.name,
          description: d.data.short_description,
          genres: d.data.genres ? d.data.genres.map((g) => g.description) : [],
          appid: d.data.steam_appid,
        }));
      if (games.length === 0) {
        koleksiList.innerHTML = `<div class='koleksi-empty'>Belum ada game di koleksi Anda.</div>`;
      } else {
        koleksiList.innerHTML = games.map(createGameCard).join("");
        // Event detail
        koleksiList.querySelectorAll(".detail-btn").forEach((button) => {
          button.addEventListener("click", (e) => {
            const appId = e.target.dataset.appid;
            window.location.hash = `#/detail/${appId}`;
          });
        });
      }
    }
  );
}
