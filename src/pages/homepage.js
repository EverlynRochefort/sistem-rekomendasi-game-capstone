import '../styles/main.css';
import '../styles/login.css';
import { LoginPage } from './loginpage';
import { getRecommendedGames, getTrendingGames } from '../api';

// Routing handler
function handleRouting() {
    const app = document.getElementById('app');
    if (window.location.hash === '#/login') {
        app.innerHTML = LoginPage();
    } else {
        render();
    }
}

window.addEventListener('hashchange', handleRouting);
document.addEventListener('DOMContentLoaded', handleRouting);

function createGameCard(game) {
    const posterUrl = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`;
    return `
    <div class="game-card">
        <img class="game-poster" src="${posterUrl}" alt="${game.title} poster" />
        <h3>${game.title}</h3>
        <div class="game-genres">
            ${game.genres.map(genre => `<span class="genre-badge">${genre}</span>`).join('')}
        </div>
        <p class="game-description">${game.description}</p>
        <button class="detail-btn" data-appid="${game.appid}">Lihat Detail</button>
    </div>
    `;
}

async function render() {
    const app = document.getElementById('app');
    app.innerHTML = `
    <nav class="navbar">
        <div class="logo">
            <span class="logo-icon">🎮</span>
            GameMatch
        </div>
        <ul class="nav-links">
            <li>Beranda</li>
            <li>Eksplorasi</li>
            <li>Koleksi</li>
            <li>Tentang Kami</li>
            <li>Blog</li>
        </ul>
        <div class="auth-buttons">
            <button class="register-btn">Daftar</button>
            <button id="login-btn" class="login-btn">Masuk</button>
        </div>
    </nav>

    <section class="hero">
        <h1>Temukan Game Terbaik untuk Anda</h1>
        <p>Sistem rekomendasi game pintar yang memahami selera Anda dan menyarankan game yang akan Anda sukai.</p>
        <div class="search-bar">
            <input type="text" placeholder="Cari game atau masukkan game favorit Anda..." />
            <button class="search-btn">🔍</button>
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

        <section class="signup-banner">
            <h2>Dapatkan Rekomendasi yang Lebih Personal</h2>
            <p>Buat akun untuk mendapatkan rekomendasi game yang disesuaikan dengan preferensi dan riwayat bermain Anda.</p>
            <button class="signup-btn">Buat Akun</button>
            <a href="#" class="learn-more">Pelajari Lebih Lanjut</a>
        </section>
    </main>

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

    // Add event listener ke login page
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.hash = '#/login';
        });
    }

     //Action Recomendation Games
    try {
        const recommendedGames = await getRecommendedGames();
        const recList = document.getElementById('recommendation-list');
        recList.innerHTML = recommendedGames.map(game => createGameCard(game)).join('');
    } catch (error) {
        console.error('Error loading recommended games:', error);
        document.getElementById('recommendation-list').innerHTML = '<div class="error">Error loading games</div>';
    }

    //Action Trending Games
    try {
        const trendingGames = await getTrendingGames();
        const trendList = document.getElementById('trending-list');
        trendList.innerHTML = trendingGames.map(game => createGameCard(game)).join('');
    } catch (error) {
        console.error('Error loading trending games:', error);
        document.getElementById('trending-list').innerHTML = '<div class="error">Error loading games</div>';
    }

    //Action Detail Button
    document.querySelectorAll('.detail-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const appId = e.target.dataset.appid;
            window.open(`https://store.steampowered.com/app/${appId}`, '_blank');
        });
    });

    document.querySelector('.signup-banner').style.display = 'block';
}