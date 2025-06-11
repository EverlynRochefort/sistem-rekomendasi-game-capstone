import "../styles/main.css";
import "../styles/tentangKami.css";
import { Navbar, Footer } from "../components/index.js";

export async function renderTentangkamiPage() {
    const username = localStorage.getItem("username");
    return `
    ${Navbar(username)}
    <div class="about-page">
        <div class="about-header">
            <h1>Tentang Kami</h1>
            <p class="subtitle">Mengenal lebih dekat dengan GameMatch</p>
        </div>

        <div class="about-content">
            <section class="about-section">
                <h2>Visi Kami</h2>
                <p>GameMatch hadir untuk membantu para gamer menemukan game yang sesuai dengan preferensi mereka. Kami percaya bahwa setiap gamer memiliki selera unik, dan kami berkomitmen untuk memberikan rekomendasi yang personal dan akurat.</p>
            </section>

            <section class="about-section">
                <h2>Apa yang Kami Tawarkan</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <span class="feature-icon">🎮</span>
                        <h3>Rekomendasi Personal</h3>
                        <p>Sistem rekomendasi cerdas yang memahami selera gaming Anda</p>
                    </div>
                    <div class="feature-card">
                        <span class="feature-icon">📊</span>
                        <h3>Analisis Mendalam</h3>
                        <p>Analisis detail untuk setiap game berdasarkan berbagai parameter</p>
                    </div>
                    <div class="feature-card">
                        <span class="feature-icon">🤖</span>
                        <h3>Chatbot Asisten</h3>
                        <p>Asisten virtual yang siap membantu Anda menemukan game yang tepat</p>
                    </div>
                    <div class="feature-card">
                        <span class="feature-icon">📱</span>
                        <h3>Koleksi Pribadi</h3>
                        <p>Simpan dan kelola game favorit Anda dalam satu tempat</p>
                    </div>
                </div>
            </section>

            <section class="about-section">
                <h2>Tim Kami</h2>
                <div class="team-grid">
                    <div class="team-member">
                        <div class="member-avatar">👨‍💻</div>
                        <h3>Tim Pengembang</h3>
                        <p>Para ahli yang berdedikasi untuk menciptakan pengalaman terbaik</p>
                    </div>
                    <div class="team-member">
                        <div class="member-avatar">🎨</div>
                        <h3>Tim Desain</h3>
                        <p>Kreator yang memastikan tampilan yang menarik dan intuitif</p>
                    </div>
                    <div class="team-member">
                        <div class="member-avatar">📈</div>
                        <h3>Tim Machine Learning</h3>
                        <p>Spesialis yang mengembangkan algoritma rekomendasi</p>
                    </div>
                </div>
            </section>

            <section class="about-section contact-section">
                <h2>Hubungi Kami</h2>
                <p>Kami selalu terbuka untuk saran, masukan, dan kolaborasi. Jangan ragu untuk menghubungi kami!</p>
                <div class="contact-info">
                    <p>📧 Email: info@gamematch.com</p>
                    <p>📱 WhatsApp: +62 898 3049 046</p>
                    <p>📍 Alamat: Jl. Teknologi No. 123, Jakarta</p>
                </div>
            </section>
        </div>
    </div>
    ${Footer()}
    `;
}

//fungsi button logout untuk ke halaman beranda sebelum login
export function attachTentangKamiHandlers() {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("username");
            window.location.hash = "#/";
            window.location.reload(); 
        });
    }

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
}
