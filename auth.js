// Authentication functionality
class AuthManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupPasswordToggles();
        this.setupPasswordStrength();
        this.setupFormValidation();
        this.setupSocialLogin();
    }

    setupPasswordToggles() {
        document.querySelectorAll('.password-toggle').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const input = toggle.previousElementSibling;
                const icon = toggle.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.className = 'fas fa-eye-slash';
                } else {
                    input.type = 'password';
                    icon.className = 'fas fa-eye';
                }
            });
        });
    }

    setupPasswordStrength() {
        const passwordInput = document.getElementById('password');
        if (!passwordInput) return;

        const strengthBar = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');

        passwordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            const strength = this.calculatePasswordStrength(password);
            
            if (strengthBar && strengthText) {
                strengthBar.className = `strength-fill ${strength.level}`;
                strengthText.textContent = `Password strength: ${strength.text}`;
            }
        });
    }

    calculatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        const levels = [
            { level: 'weak', text: 'Weak' },
            { level: 'weak', text: 'Weak' },
            { level: 'fair', text: 'Fair' },
            { level: 'good', text: 'Good' },
            { level: 'strong', text: 'Strong' }
        ];

        return levels[score] || levels[0];
    }

    setupFormValidation() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(new FormData(loginForm));
            });
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateSignupForm(signupForm)) {
                    this.handleSignup(new FormData(signupForm));
                }
            });
        }
    }

    validateSignupForm(form) {
        const password = form.querySelector('#password').value;
        const confirmPassword = form.querySelector('#confirmPassword').value;
        const terms = form.querySelector('input[name="terms"]').checked;

        if (password !== confirmPassword) {
            this.showError('Passwords do not match');
            return false;
        }

        if (!terms) {
            this.showError('Please accept the terms of service');
            return false;
        }

        return true;
    }

    handleLogin(formData) {
        const submitBtn = document.querySelector('.auth-btn.primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Signing In...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Mock successful login
            this.showSuccess('Login successful! Redirecting...');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 2000);
    }

    handleSignup(formData) {
        const submitBtn = document.querySelector('.auth-btn.primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Mock successful signup
            this.showSuccess('Account created successfully! Please check your email to verify your account.');
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }, 2000);
    }

    setupSocialLogin() {
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const provider = btn.classList.contains('google') ? 'Google' : 
                               btn.classList.contains('facebook') ? 'Facebook' : 'Apple';
                
                this.handleSocialLogin(provider);
            });
        });
    }

    handleSocialLogin(provider) {
        // Mock social login
        this.showInfo(`Redirecting to ${provider} login...`);
        
        setTimeout(() => {
            this.showSuccess(`${provider} login successful! Redirecting...`);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 2000);
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showInfo(message) {
        this.showNotification(message, 'info');
    }

    showNotification(message, type) {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 
                              type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add notification styles
        const styles = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                border-radius: var(--border-radius);
                box-shadow: 0 8px 32px var(--shadow-large);
                animation: slideIn 0.3s ease;
            }
            
            .notification.error {
                background: var(--error-color);
                color: white;
            }
            
            .notification.success {
                background: var(--success-color);
                color: white;
            }
            
            .notification.info {
                background: var(--primary-color);
                color: white;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem 1.25rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.2rem;
                cursor: pointer;
                margin-left: auto;
                opacity: 0.8;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;

        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'notification-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }
}

// Initialize auth manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
});