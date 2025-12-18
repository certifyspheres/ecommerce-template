// Cart functionality
class CartManager {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart-items')) || [];
        this.init();
    }

    init() {
        this.setupQuantityControls();
        this.setupItemActions();
        this.setupPromoCode();
        this.updateCartDisplay();
    }

    setupQuantityControls() {
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const input = btn.parentNode.querySelector('input');
                const currentValue = parseInt(input.value);
                
                if (btn.classList.contains('plus')) {
                    input.value = Math.min(currentValue + 1, 10);
                } else if (btn.classList.contains('minus')) {
                    input.value = Math.max(currentValue - 1, 1);
                }
                
                this.updateItemTotal(btn.closest('.cart-item'));
                this.updateCartTotals();
            });
        });

        document.querySelectorAll('.item-quantity input').forEach(input => {
            input.addEventListener('change', (e) => {
                const value = Math.max(1, Math.min(10, parseInt(e.target.value) || 1));
                e.target.value = value;
                this.updateItemTotal(input.closest('.cart-item'));
                this.updateCartTotals();
            });
        });
    }

    setupItemActions() {
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.removeItem(btn.closest('.cart-item'));
            });
        });

        document.querySelectorAll('.save-later').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.saveForLater(btn.closest('.cart-item'));
            });
        });
    }

    setupPromoCode() {
        const applyBtn = document.querySelector('.apply-btn');
        const promoInput = document.querySelector('.promo-code input');

        if (applyBtn && promoInput) {
            applyBtn.addEventListener('click', () => {
                this.applyPromoCode(promoInput.value);
            });

            promoInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.applyPromoCode(promoInput.value);
                }
            });
        }
    }

    updateItemTotal(cartItem) {
        const quantity = parseInt(cartItem.querySelector('.item-quantity input').value);
        const priceElement = cartItem.querySelector('.current-price');
        const basePrice = parseFloat(priceElement.textContent.replace('$', ''));
        
        // This is a simplified calculation - in real app, you'd get base price from data
        const itemBasePrice = basePrice / parseInt(cartItem.querySelector('.item-quantity input').defaultValue || 1);
        const newTotal = (itemBasePrice * quantity).toFixed(2);
        
        priceElement.textContent = `$${newTotal}`;
    }

    updateCartTotals() {
        const cartItems = document.querySelectorAll('.cart-item');
        let subtotal = 0;

        cartItems.forEach(item => {
            const price = parseFloat(item.querySelector('.current-price').textContent.replace('$', ''));
            subtotal += price;
        });

        const tax = subtotal * 0.08; // 8% tax
        const discount = subtotal * 0.2; // 20% discount
        const total = subtotal + tax - discount;

        // Update summary
        document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = `$${tax.toFixed(2)}`;
        document.querySelector('.summary-row.discount span:last-child').textContent = `-$${discount.toFixed(2)}`;
        document.querySelector('.summary-row.total span:last-child').textContent = `$${total.toFixed(2)}`;

        // Update item count
        const itemCount = Array.from(cartItems).reduce((sum, item) => {
            return sum + parseInt(item.querySelector('.item-quantity input').value);
        }, 0);
        
        document.querySelector('.cart-count-text').textContent = `${itemCount} items`;
    }

    removeItem(cartItem) {
        // Add removal animation
        cartItem.style.transition = 'all 0.3s ease';
        cartItem.style.transform = 'translateX(-100%)';
        cartItem.style.opacity = '0';

        setTimeout(() => {
            cartItem.remove();
            this.updateCartTotals();
            this.showNotification('Item removed from cart', 'info');
            
            // Check if cart is empty
            if (document.querySelectorAll('.cart-item').length === 0) {
                this.showEmptyCart();
            }
        }, 300);
    }

    saveForLater(cartItem) {
        const itemName = cartItem.querySelector('h3').textContent;
        
        // Add to saved items (mock)
        this.showNotification(`${itemName} saved for later`, 'success');
        
        // Remove from cart
        this.removeItem(cartItem);
    }

    applyPromoCode(code) {
        const validCodes = {
            'SAVE20': { discount: 0.2, description: '20% off' },
            'WELCOME10': { discount: 0.1, description: '10% off' },
            'FREESHIP': { discount: 0, description: 'Free shipping', freeShipping: true }
        };

        const promoCode = validCodes[code.toUpperCase()];
        
        if (promoCode) {
            this.showNotification(`Promo code applied: ${promoCode.description}`, 'success');
            this.updateCartTotals();
            
            // Update UI to show applied code
            const promoInput = document.querySelector('.promo-code input');
            promoInput.value = '';
            promoInput.placeholder = `Applied: ${code.toUpperCase()}`;
        } else {
            this.showNotification('Invalid promo code', 'error');
        }
    }

    showEmptyCart() {
        const cartItems = document.querySelector('.cart-items');
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-content">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added any items to your cart yet.</p>
                    <a href="index.html" class="continue-shopping-btn">
                        Continue Shopping
                    </a>
                </div>
            </div>
        `;

        // Add empty cart styles
        const styles = `
            .empty-cart {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 300px;
                text-align: center;
            }
            
            .empty-cart-content i {
                font-size: 4rem;
                color: var(--text-muted);
                margin-bottom: 1rem;
            }
            
            .empty-cart-content h3 {
                font-size: 1.5rem;
                color: var(--text-primary);
                margin-bottom: 0.5rem;
            }
            
            .empty-cart-content p {
                color: var(--text-secondary);
                margin-bottom: 2rem;
            }
            
            .continue-shopping-btn {
                display: inline-block;
                background: var(--primary-gradient);
                color: white;
                padding: 1rem 2rem;
                border-radius: var(--border-radius);
                text-decoration: none;
                font-weight: 600;
                transition: var(--transition);
            }
            
            .continue-shopping-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
            }
        `;

        if (!document.querySelector('#empty-cart-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'empty-cart-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
    }

    updateCartDisplay() {
        // Update cart count in header if on cart page
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    showNotification(message, type) {
        // Remove existing notifications
        document.querySelectorAll('.cart-notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `cart-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 
                              type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add notification styles
        const styles = `
            .cart-notification {
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 1000;
                max-width: 300px;
                border-radius: var(--border-radius);
                box-shadow: 0 4px 12px var(--shadow);
                animation: slideInRight 0.3s ease;
            }
            
            .cart-notification.error {
                background: var(--error-color);
                color: white;
            }
            
            .cart-notification.success {
                background: var(--success-color);
                color: white;
            }
            
            .cart-notification.info {
                background: var(--primary-color);
                color: white;
            }
            
            .cart-notification .notification-content {
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

        if (!document.querySelector('#cart-notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'cart-notification-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        document.body.appendChild(notification);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.3s ease reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }
}

// Initialize cart manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CartManager();
});