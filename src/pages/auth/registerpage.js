export function RegisterPage() {
  return `
<div class="register-container">
    <!-- Left Side - Register Form -->
    <div class="register-form-section">
        <div class="register-form">
            <h1 class="register-title">Bergabunglah dengan kami</h1>

            <form id="registerForm">
                <div class="form-group">
                    <input id="username" type="text" class="form-input" placeholder="Username kamu">
                </div>
                <div class="form-group">
                    <input id="email" type="text" class="form-input" placeholder="example@gmail.com">
                </div>
                <div class="form-group">
                    <input id="password" type="password" class="form-input" placeholder="Password">
                </div>
                <div class="form-group">
                    <input id="confirmPassword" type="password" class="form-input" placeholder="Konfirmasi Password">
                </div>
                <div id="errorMessage" style="color:red;"></div>
                <button type="submit" class="register-btn-in">Gabung</button>
            </form>

            <div class="divider">or signup with</div>

            <div class="social-buttons">
                <button class="social-btn google-btn" title="Google"></button>
                <button class="social-btn github-btn" title="Github"></button>
            </div>
        </div>
    </div>

    <!-- Right Side - Welcome Section -->
    <div class="register-welcome-section">
        <h1 class="welcome-title">Bergabunglah agar bisa membuka fitur rekomendasi dan chatbot secara gratis!</h1>
        <p class="welcome-text">
            kami sangat senang menyambut anda disini!.
        </p>
        <p class="signin-text">sudah punya akun? <a href="#/login">Masuk.</a></p>
    </div>
</div>
  `;
}
