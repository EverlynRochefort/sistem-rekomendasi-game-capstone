export function LoginPage() {
  return `
<div class="login-container">
        <!-- Left Side - Login Form -->
        <div class="login-form-section">
            <div class="login-form">
                <h1 class="signin-title">Masuk</h1>
                
                <form id="loginForm">
                    <div class="form-group">
                        <input id="loginEmail" type="text" class="form-input" placeholder="username kamu">
                    </div>
                    
                    <div class="form-group">
                        <input id="loginPassword" type="password" class="form-input" placeholder="••••••••">
                    </div>
                    
                    <button type="submit" class="signin-btn">Masuk!</button>
                </form>
                
                <div class="divider">or signin with</div>
                
                <div class="social-buttons">
                    <button class="social-btn google-btn" title="Google"></button>
                    <button class="social-btn github-btn" title="Github"></button>
                </div>
            </div>
        </div>

        <!-- Right Side - Welcome Section -->
        <div class="welcome-section">
            <h1 class="welcome-title">Selamat datang kembali!</h1>
            <p class="welcome-text">
                Kami sangat senang melihat anda lagi! Silahkan masuk untuk akses penuh untuk semua fitur yang ada.
            </p>
            <p class="signup-text">Belum punya akun? <a href="#/register">Gabung dengan kami!.</a></p>
        </div>
    </div>
    `;
}
