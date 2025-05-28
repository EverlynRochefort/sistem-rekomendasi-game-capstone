export function LoginPage() {
    return `
<div class="login-container">
        <!-- Left Side - Login Form -->
        <div class="login-form-section">
            <div class="login-form">
                <h1 class="signin-title">Sign In</h1>
                
                <form>
                    <div class="form-group">
                        <input type="text" class="form-input" placeholder="example@gmail.com">
                    </div>
                    
                    <div class="form-group">
                        <input type="password" class="form-input" placeholder="••••••••">
                    </div>
                    
                    <button type="submit" class="signin-btn">Sign In</button>
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
            <h1 class="welcome-title">Welcome back!</h1>
            <p class="welcome-text">
                Welcome back! We are so happy to have you here. It's great to see you again. We hope you had a safe and enjoyable time away.
            </p>
            <p class="signup-text">No account yet? Signup.</p>
        </div>
    </div>
    `;
}