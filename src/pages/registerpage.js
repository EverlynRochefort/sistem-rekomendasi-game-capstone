export function RegisterPage() {
  return `
<div class="register-container">
    <!-- Left Side - Register Form -->
    <div class="register-form-section">
        <div class="register-form">
            <h1 class="register-title">Sign Up</h1>

            <form>
                <div class="form-group">
                    <input type="text" class="form-input" placeholder="Your Name">
                </div>

                <div class="form-group">
                    <input type="text" class="form-input" placeholder="example@gmail.com">
                </div>

                <div class="form-group">
                    <input type="password" class="form-input" placeholder="••••••••">
                </div>

                <div class="form-group">
                    <input type="password" class="form-input" placeholder="Confirm Password">
                </div>

                <button type="submit" class="register-btn-in">Sign Up</button>
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
        <h1 class="welcome-title">Join our community!</h1>
        <p class="welcome-text">
            Create an account to connect with others! We're excited to have you join us. Sign up today and become a part of our growing community.
        </p>
        <p class="signin-text">Already have an account? Sign in.</p>
    </div>
</div>
  `;
}
