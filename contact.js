// Contact Page Functionality
class ContactManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.setupFAQAccordion();
        this.setupLiveChat();
        this.setupFormSubmission();
    }

    setupFormValidation() {
        const form = document.getElementById('contactForm');
        const inputs = form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error styling
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${this.getFieldLabel(fieldName)} is required`;
        }

        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (fieldName === 'phone' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Name validation
        if ((fieldName === 'firstName' || fieldName === 'lastName') && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = `${this.getFieldLabel(fieldName)} must be at least 2 characters`;
            }
        }

        // Message validation
        if (fieldName === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    getFieldLabel(fieldName) {
        const labels = {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'Email Address',
            phone: 'Phone Number',
            subject: 'Subject',
            orderNumber: 'Order Number',
            message: 'Message'
        };
        return labels[fieldName] || fieldName;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);

        // Add error styles if not already present
        if (!document.querySelector('#contact-error-styles')) {
            const styles = document.createElement('style');
            styles.id = 'contact-error-styles';
            styles.textContent = `
                .form-group input.error,
                .form-group select.error,
                .form-group textarea.error {
                    border-color: #ef4444;
                    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
                }
                
                .error-message {
                    color: #ef4444;
                    font-size: 0.875rem;
                    margin-top: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }
                
                .error-message::before {
                    content: '⚠';
                    font-size: 0.75rem;
                }
                
                .success-message {
                    background: #10b981;
                    color: white;
                    padding: 1rem;
                    border-radius: var(--border-radius);
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .success-message::before {
                    content: '✓';
                    font-weight: bold;
                }
            `;
            document.head.appendChild(styles);
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    setupFormSubmission() {
        const form = document.getElementById('contactForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });
    }

    async handleFormSubmit(form) {
        // Validate all fields
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Please fix the errors above', 'error');
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await this.simulateFormSubmission(data);
            
            // Show success message
            this.showSuccessMessage(form);
            form.reset();
            
        } catch (error) {
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    simulateFormSubmission(data) {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve();
            }, 2000);
        });
    }

    showSuccessMessage(form) {
        // Remove existing success message
        const existingSuccess = form.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }

        // Add success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.</span>
        `;
        
        form.insertBefore(successDiv, form.firstChild);

        // Remove success message after 5 seconds
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.remove();
            }
        }, 5000);
    }

    setupFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active', !isActive);
            });
        });
    }

    setupLiveChat() {
        const chatBtn = document.querySelector('.chat-btn');
        if (chatBtn) {
            chatBtn.addEventListener('click', () => {
                this.openLiveChat();
            });
        }
    }

    openLiveChat() {
        // Create chat modal
        const modal = document.createElement('div');
        modal.className = 'chat-modal';
        modal.innerHTML = `
            <div class="chat-modal-content">
                <div class="chat-header">
                    <div class="chat-agent">
                        <div class="agent-avatar">
                            <i class="fas fa-user-headset"></i>
                        </div>
                        <div class="agent-info">
                            <h4>Sarah Johnson</h4>
                            <span class="status online">Online</span>
                        </div>
                    </div>
                    <button class="close-chat">&times;</button>
                </div>
                <div class="chat-messages">
                    <div class="message agent-message">
                        <div class="message-content">
                            <p>Hi! I'm Sarah from StyleHub customer service. How can I help you today?</p>
                            <span class="message-time">Just now</span>
                        </div>
                    </div>
                </div>
                <div class="chat-input-area">
                    <input type="text" placeholder="Type your message..." class="chat-input">
                    <button class="send-message"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        `;

        // Add chat styles
        const chatStyles = `
            .chat-modal {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 350px;
                height: 500px;
                background: var(--card-color);
                border-radius: var(--border-radius-lg);
                box-shadow: var(--shadow-lg);
                border: 1px solid var(--border-color);
                z-index: 2000;
                display: flex;
                flex-direction: column;
                animation: slideInUp 0.3s ease;
            }
            
            @keyframes slideInUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
            
            .chat-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem;
                background: var(--primary-color);
                color: white;
                border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
            }
            
            .chat-agent {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .agent-avatar {
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .agent-info h4 {
                margin: 0;
                font-size: 1rem;
                font-weight: 600;
            }
            
            .status {
                font-size: 0.8rem;
                opacity: 0.9;
            }
            
            .status.online::before {
                content: '●';
                color: #10b981;
                margin-right: 0.25rem;
            }
            
            .close-chat {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 4px;
            }
            
            .chat-messages {
                flex: 1;
                padding: 1rem;
                overflow-y: auto;
                background: var(--bg-color);
            }
            
            .message {
                margin-bottom: 1rem;
            }
            
            .agent-message .message-content {
                background: var(--surface-color);
                padding: 0.75rem;
                border-radius: var(--border-radius);
                max-width: 80%;
            }
            
            .user-message .message-content {
                background: var(--primary-color);
                color: white;
                padding: 0.75rem;
                border-radius: var(--border-radius);
                max-width: 80%;
                margin-left: auto;
            }
            
            .message-content p {
                margin: 0 0 0.25rem 0;
                line-height: 1.4;
            }
            
            .message-time {
                font-size: 0.75rem;
                opacity: 0.7;
            }
            
            .chat-input-area {
                display: flex;
                padding: 1rem;
                gap: 0.5rem;
                border-top: 1px solid var(--border-color);
                background: var(--card-color);
                border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
            }
            
            .chat-input {
                flex: 1;
                padding: 0.75rem;
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius);
                background: var(--bg-color);
                color: var(--text-primary);
                outline: none;
            }
            
            .chat-input:focus {
                border-color: var(--primary-color);
            }
            
            .send-message {
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 0.75rem;
                border-radius: var(--border-radius);
                cursor: pointer;
                transition: var(--transition);
            }
            
            .send-message:hover {
                background: var(--primary-dark);
            }
            
            @media (max-width: 480px) {
                .chat-modal {
                    width: calc(100vw - 40px);
                    height: 400px;
                    bottom: 10px;
                    right: 20px;
                    left: 20px;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = chatStyles;
        document.head.appendChild(styleSheet);

        document.body.appendChild(modal);

        // Setup chat functionality
        const closeBtn = modal.querySelector('.close-chat');
        const chatInput = modal.querySelector('.chat-input');
        const sendBtn = modal.querySelector('.send-message');
        const messagesContainer = modal.querySelector('.chat-messages');

        closeBtn.addEventListener('click', () => {
            modal.remove();
            styleSheet.remove();
        });

        const sendMessage = () => {
            const message = chatInput.value.trim();
            if (message) {
                this.addChatMessage(messagesContainer, message, 'user');
                chatInput.value = '';
                
                // Simulate agent response
                setTimeout(() => {
                    const responses = [
                        "I'd be happy to help you with that! Let me check our system.",
                        "That's a great question. Let me get you the most up-to-date information.",
                        "I understand your concern. Let me see what options we have available.",
                        "Thank you for reaching out. I'll make sure to get this resolved for you."
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    this.addChatMessage(messagesContainer, randomResponse, 'agent');
                }, 1000);
            }
        };

        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Focus input
        chatInput.focus();
    }

    addChatMessage(container, message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${timeString}</span>
            </div>
        `;
        
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    }

    showNotification(message, type) {
        // Remove existing notifications
        document.querySelectorAll('.contact-notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `contact-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        const styles = `
            .contact-notification {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 1000;
                max-width: 300px;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-lg);
                animation: slideInRight 0.3s ease;
            }
            
            .contact-notification.error {
                background: #ef4444;
                color: white;
            }
            
            .contact-notification.success {
                background: #10b981;
                color: white;
            }
            
            .contact-notification .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem;
            }
            
            @keyframes slideInRight {
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

        if (!document.querySelector('#contact-notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'contact-notification-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 4000);
    }
}

// Initialize contact functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
});