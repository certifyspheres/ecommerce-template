// Checkout functionality
class CheckoutManager {
    constructor() {
        this.currentStep = 1;
        this.formData = {};
        this.init();
    }

    init() {
        this.setupStepNavigation();
        this.setupFormValidation();
        this.setupPaymentMethods();
        this.setupCardFormatting();
        this.updateProgressIndicator();
    }

    setupStepNavigation() {
        // Navigation is handled by global functions for simplicity
        window.nextStep = () => this.nextStep();
        window.prevStep = () => this.prevStep();
        window.goToStep = (step) => this.goToStep(step);
        window.placeOrder = () => this.placeOrder();
    }

    nextStep() {
        if (this.validateCurrentStep()) {
            this.saveCurrentStepData();
            this.currentStep++;
            this.showStep(this.currentStep);
            this.updateProgressIndicator();
            
            if (this.currentStep === 3) {
                this.populateReviewStep();
            }
        }
    }

    prevStep() {
        this.currentStep--;
        this.showStep(this.currentStep);
        this.updateProgressIndicator();
    }

    goToStep(step) {
        this.currentStep = step;
        this.showStep(this.currentStep);
        this.updateProgressIndicator();
    }

    showStep(step) {
        document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));
        document.getElementById(`${this.getStepName(step)}-step`).classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    getStepName(step) {
        const steps = ['', 'shipping', 'payment', 'review'];
        return steps[step];
    }

    updateProgressIndicator() {
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            if (index + 1 <= this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    validateCurrentStep() {
        switch (this.currentStep) {
            case 1:
                return this.validateShippingForm();
            case 2:
                return this.validatePaymentForm();
            default:
                return true;
        }
    }

    validateShippingForm() {
        const form = document.querySelector('.shipping-form');
        const requiredFields = form.querySelectorAll('input[required], select[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        // Email validation
        const email = form.querySelector('#email');
        if (email.value && !this.isValidEmail(email.value)) {
            this.showFieldError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Phone validation
        const phone = form.querySelector('#phone');
        if (phone.value && !this.isValidPhone(phone.value)) {
            this.showFieldError(phone, 'Please enter a valid phone number');
            isValid = false;
        }

        return isValid;
    }

    validatePaymentForm() {
        const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
        
        if (selectedPayment === 'card') {
            return this.validateCardForm();
        }
        
        // For other payment methods, assume they're valid
        return true;
    }

    validateCardForm() {
        const form = document.getElementById('card-form');
        const cardNumber = form.querySelector('#cardNumber');
        const expiryDate = form.querySelector('#expiryDate');
        const cvv = form.querySelector('#cvv');
        const cardName = form.querySelector('#cardName');
        
        let isValid = true;

        // Card number validation
        if (!this.isValidCardNumber(cardNumber.value)) {
            this.showFieldError(cardNumber, 'Please enter a valid card number');
            isValid = false;
        } else {
            this.clearFieldError(cardNumber);
        }

        // Expiry date validation
        if (!this.isValidExpiryDate(expiryDate.value)) {
            this.showFieldError(expiryDate, 'Please enter a valid expiry date');
            isValid = false;
        } else {
            this.clearFieldError(expiryDate);
        }

        // CVV validation
        if (!this.isValidCVV(cvv.value)) {
            this.showFieldError(cvv, 'Please enter a valid CVV');
            isValid = false;
        } else {
            this.clearFieldError(cvv);
        }

        // Card name validation
        if (!cardName.value.trim()) {
            this.showFieldError(cardName, 'Please enter the name on card');
            isValid = false;
        } else {
            this.clearFieldError(cardName);
        }

        return isValid;
    }

    saveCurrentStepData() {
        switch (this.currentStep) {
            case 1:
                this.formData.shipping = this.getShippingData();
                break;
            case 2:
                this.formData.payment = this.getPaymentData();
                break;
        }
    }

    getShippingData() {
        const form = document.querySelector('.shipping-form');
        return {
            email: form.querySelector('#email').value,
            phone: form.querySelector('#phone').value,
            firstName: form.querySelector('#firstName').value,
            lastName: form.querySelector('#lastName').value,
            address: form.querySelector('#address').value,
            apartment: form.querySelector('#apartment').value,
            city: form.querySelector('#city').value,
            state: form.querySelector('#state').value,
            zipCode: form.querySelector('#zipCode').value,
            shippingMethod: form.querySelector('input[name="shipping"]:checked').value
        };
    }

    getPaymentData() {
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        const data = { method: paymentMethod };

        if (paymentMethod === 'card') {
            const form = document.getElementById('card-form');
            data.cardNumber = form.querySelector('#cardNumber').value;
            data.expiryDate = form.querySelector('#expiryDate').value;
            data.cvv = form.querySelector('#cvv').value;
            data.cardName = form.querySelector('#cardName').value;
        }

        return data;
    }

    populateReviewStep() {
        const shipping = this.formData.shipping;
        const payment = this.formData.payment;

        // Update shipping address
        const shippingSection = document.querySelector('.review-section:nth-child(1) .review-content');
        shippingSection.innerHTML = `
            <p><strong>${shipping.firstName} ${shipping.lastName}</strong></p>
            <p>${shipping.address}${shipping.apartment ? ', ' + shipping.apartment : ''}</p>
            <p>${shipping.city}, ${shipping.state} ${shipping.zipCode}</p>
            <p>Phone: ${shipping.phone}</p>
        `;

        // Update payment method
        const paymentSection = document.querySelector('.review-section:nth-child(2) .review-content');
        if (payment.method === 'card') {
            const maskedCard = '**** **** **** ' + payment.cardNumber.slice(-4);
            paymentSection.innerHTML = `
                <p><strong>Credit Card</strong></p>
                <p>${maskedCard}</p>
                <p>Expires ${payment.expiryDate}</p>
            `;
        } else {
            paymentSection.innerHTML = `
                <p><strong>${payment.method.charAt(0).toUpperCase() + payment.method.slice(1)}</strong></p>
            `;
        }

        // Update shipping method
        const shippingMethodSection = document.querySelector('.review-section:nth-child(3) .review-content');
        const shippingMethods = {
            'standard': 'Standard Shipping - 5-7 business days - Free',
            'express': 'Express Shipping - 2-3 business days - $9.99',
            'overnight': 'Overnight Shipping - Next business day - $24.99'
        };
        shippingMethodSection.innerHTML = `
            <p><strong>${shippingMethods[shipping.shippingMethod]}</strong></p>
        `;
    }

    setupFormValidation() {
        // Real-time validation for required fields
        document.querySelectorAll('input[required], select[required]').forEach(field => {
            field.addEventListener('blur', () => {
                if (!field.value.trim()) {
                    this.showFieldError(field, 'This field is required');
                } else {
                    this.clearFieldError(field);
                }
            });
        });
    }

    setupPaymentMethods() {
        document.querySelectorAll('input[name="payment"]').forEach(radio => {
            radio.addEventListener('change', () => {
                // Update active payment method visual
                document.querySelectorAll('.payment-method').forEach(method => {
                    method.classList.remove('active');
                });
                radio.closest('.payment-method').classList.add('active');

                // Show/hide card form
                const cardForm = document.getElementById('card-form');
                if (radio.value === 'card') {
                    cardForm.style.display = 'block';
                } else {
                    cardForm.style.display = 'none';
                }
            });
        });
    }

    setupCardFormatting() {
        const cardNumber = document.getElementById('cardNumber');
        const expiryDate = document.getElementById('expiryDate');
        const cvv = document.getElementById('cvv');

        if (cardNumber) {
            cardNumber.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
                let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
                e.target.value = formattedValue;
            });
        }

        if (expiryDate) {
            expiryDate.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value;
            });
        }

        if (cvv) {
            cvv.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '').substring(0, 4);
            });
        }
    }

    placeOrder() {
        const placeOrderBtn = document.querySelector('.place-order-btn');
        const originalText = placeOrderBtn.innerHTML;
        
        placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        placeOrderBtn.disabled = true;

        // Simulate order processing
        setTimeout(() => {
            this.showOrderSuccess();
        }, 3000);
    }

    showOrderSuccess() {
        // Create success modal
        const modal = document.createElement('div');
        modal.className = 'order-success-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Order Placed Successfully!</h2>
                <p>Thank you for your purchase. Your order #12345 has been confirmed.</p>
                <div class="order-details">
                    <p><strong>Order Total:</strong> $272.77</p>
                    <p><strong>Estimated Delivery:</strong> 5-7 business days</p>
                </div>
                <div class="success-actions">
                    <button class="primary-btn" onclick="window.location.href='index.html'">
                        Continue Shopping
                    </button>
                    <button class="secondary-btn" onclick="window.location.href='#orders'">
                        View Order Details
                    </button>
                </div>
            </div>
        `;

        // Add modal styles
        const styles = `
            .order-success-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .order-success-modal .modal-content {
                background: var(--card-color);
                border-radius: var(--border-radius-lg);
                padding: 3rem;
                text-align: center;
                max-width: 500px;
                width: 90%;
                animation: scaleIn 0.3s ease;
            }
            
            .success-icon {
                font-size: 4rem;
                color: var(--success-color);
                margin-bottom: 1rem;
            }
            
            .order-success-modal h2 {
                font-size: 1.8rem;
                color: var(--text-primary);
                margin-bottom: 1rem;
            }
            
            .order-success-modal p {
                color: var(--text-secondary);
                margin-bottom: 1.5rem;
            }
            
            .order-details {
                background: var(--surface-color);
                padding: 1.5rem;
                border-radius: var(--border-radius);
                margin-bottom: 2rem;
            }
            
            .order-details p {
                margin-bottom: 0.5rem;
                color: var(--text-primary);
            }
            
            .success-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            
            .primary-btn, .secondary-btn {
                padding: 0.875rem 1.5rem;
                border: none;
                border-radius: var(--border-radius);
                font-weight: 600;
                cursor: pointer;
                transition: var(--transition);
            }
            
            .primary-btn {
                background: var(--primary-gradient);
                color: white;
            }
            
            .secondary-btn {
                background: var(--surface-color);
                color: var(--text-primary);
                border: 1px solid var(--border-color);
            }
            
            .primary-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
            }
            
            .secondary-btn:hover {
                background: var(--border-color);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes scaleIn {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);

        document.body.appendChild(modal);
    }

    // Validation helper methods
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidPhone(phone) {
        return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ''));
    }

    isValidCardNumber(cardNumber) {
        const cleaned = cardNumber.replace(/\s/g, '');
        return /^\d{13,19}$/.test(cleaned);
    }

    isValidExpiryDate(expiry) {
        if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
        
        const [month, year] = expiry.split('/').map(num => parseInt(num));
        const now = new Date();
        const currentYear = now.getFullYear() % 100;
        const currentMonth = now.getMonth() + 1;
        
        return month >= 1 && month <= 12 && 
               (year > currentYear || (year === currentYear && month >= currentMonth));
    }

    isValidCVV(cvv) {
        return /^\d{3,4}$/.test(cvv);
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = message;
        
        field.parentNode.appendChild(error);
        field.classList.add('error');
    }

    clearFieldError(field) {
        const error = field.parentNode.querySelector('.field-error');
        if (error) {
            error.remove();
        }
        field.classList.remove('error');
    }
}

// Add field error styles
const errorStyles = `
    .field-error {
        color: var(--error-color);
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    .form-group input.error,
    .form-group select.error {
        border-color: var(--error-color);
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = errorStyles;
document.head.appendChild(styleSheet);

// Initialize checkout manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CheckoutManager();
});