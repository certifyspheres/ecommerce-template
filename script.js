// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('color-theme') || 'blue';
        this.currentMode = localStorage.getItem('theme-mode') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupEventListeners();
        this.updateActiveButtons();
    }

    setupEventListeners() {
        // Theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        const themeOptions = document.getElementById('themeOptions');

        themeToggle.addEventListener('click', () => {
            themeOptions.classList.toggle('active');
        });

        // Close theme options when clicking outside
        document.addEventListener('click', (e) => {
            if (!themeToggle.contains(e.target) && !themeOptions.contains(e.target)) {
                themeOptions.classList.remove('active');
            }
        });

        // Mode buttons
        const modeButtons = document.querySelectorAll('.mode-btn');
        modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const mode = btn.dataset.mode;
                this.setMode(mode);
            });
        });

        // Color theme buttons
        const colorButtons = document.querySelectorAll('.color-theme');
        colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.dataset.theme;
                this.setColorTheme(theme);
            });
        });
    }

    setMode(mode) {
        this.currentMode = mode;
        localStorage.setItem('theme-mode', mode);
        this.applyTheme();
        this.updateActiveButtons();
    }

    setColorTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('color-theme', theme);
        this.applyTheme();
        this.updateActiveButtons();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-mode', this.currentMode);
        document.documentElement.setAttribute('data-theme', this.currentTheme);
    }

    updateActiveButtons() {
        // Update mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === this.currentMode);
        });

        // Update color theme buttons
        document.querySelectorAll('.color-theme').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === this.currentTheme);
        });
    }
}

// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart-items')) || [];
        this.updateCartCount();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = btn.closest('.product-card');
                const product = this.extractProductInfo(productCard);
                this.addItem(product);
                this.showAddedToCartMessage(btn);
            });
        });

        // Wishlist buttons
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleWishlist(btn);
            });
        });

        // Share buttons
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = btn.closest('.product-card');
                const product = this.extractProductInfo(productCard);
                this.showShareModal(product);
            });
        });

        // Quick view buttons
        document.querySelectorAll('.quick-view').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const productCard = btn.closest('.product-card');
                const product = this.extractProductInfo(productCard);
                this.showQuickView(product);
            });
        });
    }

    extractProductInfo(productCard) {
        const img = productCard.querySelector('img');
        const title = productCard.querySelector('.product-info h3');
        const price = productCard.querySelector('.product-price');
        
        return {
            id: Date.now() + Math.random(),
            image: img.src,
            title: title.textContent,
            price: price.textContent,
            quantity: 1
        };
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.title === product.title);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push(product);
        }
        
        this.saveCart();
        this.updateCartCount();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
    }

    saveCart() {
        localStorage.setItem('cart-items', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    toggleWishlist(button) {
        const icon = button.querySelector('i');
        const isActive = button.classList.contains('active');
        
        if (isActive) {
            button.classList.remove('active');
            icon.className = 'far fa-heart';
            this.showNotification('Removed from wishlist', 'info');
        } else {
            button.classList.add('active');
            icon.className = 'fas fa-heart';
            this.showNotification('Added to wishlist', 'success');
        }
    }

    showShareModal(product) {
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.innerHTML = `
            <div class="share-modal-content">
                <div class="share-header">
                    <h3>Share ${product.title}</h3>
                    <button class="close-share">&times;</button>
                </div>
                <div class="share-options">
                    <button class="share-option facebook" data-platform="facebook">
                        <i class="fab fa-facebook-f"></i>
                        <span>Facebook</span>
                    </button>
                    <button class="share-option twitter" data-platform="twitter">
                        <i class="fab fa-twitter"></i>
                        <span>Twitter</span>
                    </button>
                    <button class="share-option pinterest" data-platform="pinterest">
                        <i class="fab fa-pinterest"></i>
                        <span>Pinterest</span>
                    </button>
                    <button class="share-option whatsapp" data-platform="whatsapp">
                        <i class="fab fa-whatsapp"></i>
                        <span>WhatsApp</span>
                    </button>
                    <button class="share-option email" data-platform="email">
                        <i class="fas fa-envelope"></i>
                        <span>Email</span>
                    </button>
                    <button class="share-option copy" data-platform="copy">
                        <i class="fas fa-copy"></i>
                        <span>Copy Link</span>
                    </button>
                </div>
            </div>
        `;

        const modalStyles = `
            .share-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                opacity: 0;
                animation: fadeIn 0.3s forwards;
            }
            
            .share-modal-content {
                background: var(--card-color);
                border-radius: var(--border-radius-lg);
                padding: 2rem;
                max-width: 400px;
                width: 90%;
                transform: scale(0.9);
                animation: scaleIn 0.3s forwards;
            }
            
            .share-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
            }
            
            .share-header h3 {
                color: var(--text-primary);
                font-size: 1.2rem;
                font-weight: 600;
            }
            
            .close-share {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--text-secondary);
                padding: 4px;
            }
            
            .share-options {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
            }
            
            .share-option {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem;
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius);
                background: var(--bg-color);
                color: var(--text-primary);
                cursor: pointer;
                transition: var(--transition);
                font-weight: 500;
            }
            
            .share-option:hover {
                background: var(--surface-color);
                transform: translateY(-2px);
            }
            
            .share-option.facebook:hover { border-color: #1877f2; color: #1877f2; }
            .share-option.twitter:hover { border-color: #1da1f2; color: #1da1f2; }
            .share-option.pinterest:hover { border-color: #bd081c; color: #bd081c; }
            .share-option.whatsapp:hover { border-color: #25d366; color: #25d366; }
            .share-option.email:hover { border-color: var(--primary-color); color: var(--primary-color); }
            .share-option.copy:hover { border-color: var(--success-color); color: var(--success-color); }
            
            .share-option i {
                font-size: 1.2rem;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);

        document.body.appendChild(modal);

        // Close functionality
        const closeBtn = modal.querySelector('.close-share');
        closeBtn.addEventListener('click', () => {
            modal.remove();
            styleSheet.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                styleSheet.remove();
            }
        });

        // Share functionality
        modal.querySelectorAll('.share-option').forEach(option => {
            option.addEventListener('click', () => {
                const platform = option.dataset.platform;
                this.shareProduct(product, platform);
                modal.remove();
                styleSheet.remove();
            });
        });
    }

    shareProduct(product, platform) {
        const url = window.location.href;
        const text = `Check out this amazing ${product.title} for ${product.price}!`;
        
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(product.image)}&description=${encodeURIComponent(text)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
            email: `mailto:?subject=${encodeURIComponent(product.title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
        };

        if (platform === 'copy') {
            navigator.clipboard.writeText(url).then(() => {
                this.showNotification('Link copied to clipboard!', 'success');
            });
        } else if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    }

    showAddedToCartMessage(button) {
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1500);
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

        if (!document.querySelector('#notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'notification-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    showQuickView(product) {
        // Create modal for quick view
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                <div class="modal-body">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="modal-info">
                        <h3>${product.title}</h3>
                        <p class="modal-price">${product.price}</p>
                        <div class="size-selector">
                            <label>Size:</label>
                            <select>
                                <option>XS</option>
                                <option>S</option>
                                <option selected>M</option>
                                <option>L</option>
                                <option>XL</option>
                            </select>
                        </div>
                        <div class="quantity-selector">
                            <label>Quantity:</label>
                            <input type="number" value="1" min="1" max="10">
                        </div>
                        <button class="modal-add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        const modalStyles = `
            .quick-view-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                opacity: 0;
                animation: fadeIn 0.3s forwards;
            }
            
            @keyframes fadeIn {
                to { opacity: 1; }
            }
            
            .modal-content {
                background: var(--bg-color);
                border-radius: var(--border-radius);
                max-width: 800px;
                width: 90%;
                max-height: 90%;
                overflow-y: auto;
                position: relative;
                transform: scale(0.9);
                animation: scaleIn 0.3s forwards;
            }
            
            @keyframes scaleIn {
                to { transform: scale(1); }
            }
            
            .close-modal {
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--text-secondary);
                z-index: 1;
            }
            
            .modal-body {
                display: flex;
                gap: 2rem;
                padding: 2rem;
            }
            
            .modal-body img {
                width: 300px;
                height: 400px;
                object-fit: cover;
                border-radius: var(--border-radius);
            }
            
            .modal-info {
                flex: 1;
            }
            
            .modal-info h3 {
                font-size: 1.5rem;
                margin-bottom: 1rem;
                color: var(--text-primary);
            }
            
            .modal-price {
                font-size: 1.3rem;
                font-weight: 700;
                color: var(--primary-color);
                margin-bottom: 1.5rem;
            }
            
            .size-selector, .quantity-selector {
                margin-bottom: 1rem;
            }
            
            .size-selector label, .quantity-selector label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
                color: var(--text-primary);
            }
            
            .size-selector select, .quantity-selector input {
                padding: 0.5rem;
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius);
                background: var(--bg-color);
                color: var(--text-primary);
            }
            
            .modal-add-to-cart {
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 1rem 2rem;
                border-radius: var(--border-radius);
                cursor: pointer;
                font-weight: 600;
                width: 100%;
                margin-top: 1rem;
                transition: var(--transition);
            }
            
            .modal-add-to-cart:hover {
                background: var(--primary-dark);
            }
            
            @media (max-width: 768px) {
                .modal-body {
                    flex-direction: column;
                    padding: 1rem;
                }
                
                .modal-body img {
                    width: 100%;
                    height: 300px;
                }
            }
        `;

        // Add styles to head
        const styleSheet = document.createElement('style');
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);

        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.remove();
            styleSheet.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                styleSheet.remove();
            }
        });

        // Add to cart from modal
        const modalAddBtn = modal.querySelector('.modal-add-to-cart');
        modalAddBtn.addEventListener('click', () => {
            const quantity = parseInt(modal.querySelector('input[type="number"]').value);
            const productWithQuantity = { ...product, quantity };
            this.addItem(productWithQuantity);
            modal.remove();
            styleSheet.remove();
        });
    }
}

// Smooth Scrolling for Navigation
class SmoothScroll {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Newsletter Subscription
class Newsletter {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const form = document.querySelector('.newsletter-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            this.subscribe(email);
        });
    }

    subscribe(email) {
        // Simulate API call
        const button = document.querySelector('.newsletter-form button');
        const originalText = button.textContent;
        
        button.textContent = 'Subscribing...';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = 'Subscribed!';
            button.style.background = '#10b981';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
                document.querySelector('.newsletter-form input').value = '';
            }, 2000);
        }, 1000);
    }
}

// Search Functionality
class SearchManager {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const searchBtn = document.querySelector('.search-btn');
        searchBtn.addEventListener('click', () => {
            this.showSearchModal();
        });
    }

    showSearchModal() {
        const modal = document.createElement('div');
        modal.className = 'search-modal';
        modal.innerHTML = `
            <div class="search-modal-content">
                <div class="search-header">
                    <input type="text" placeholder="Search products..." class="search-input" autofocus>
                    <button class="close-search">&times;</button>
                </div>
                <div class="search-results">
                    <p>Start typing to search products...</p>
                </div>
            </div>
        `;

        const modalStyles = `
            .search-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 2000;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                padding-top: 10vh;
            }
            
            .search-modal-content {
                background: var(--bg-color);
                border-radius: var(--border-radius);
                width: 90%;
                max-width: 600px;
                max-height: 70vh;
                overflow: hidden;
            }
            
            .search-header {
                display: flex;
                align-items: center;
                padding: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .search-input {
                flex: 1;
                border: none;
                outline: none;
                font-size: 1.1rem;
                background: transparent;
                color: var(--text-primary);
            }
            
            .close-search {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--text-secondary);
                padding: 0 10px;
            }
            
            .search-results {
                padding: 1rem;
                max-height: 50vh;
                overflow-y: auto;
                color: var(--text-secondary);
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);

        document.body.appendChild(modal);

        // Close functionality
        const closeBtn = modal.querySelector('.close-search');
        closeBtn.addEventListener('click', () => {
            modal.remove();
            styleSheet.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                styleSheet.remove();
            }
        });

        // Search functionality (mock)
        const searchInput = modal.querySelector('.search-input');
        const searchResults = modal.querySelector('.search-results');
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length > 2) {
                searchResults.innerHTML = `
                    <p>Searching for "${query}"...</p>
                    <div style="margin-top: 1rem;">
                        <p>• Elegant Summer Dress</p>
                        <p>• Premium Cotton Shirt</p>
                        <p>• Designer Denim Jeans</p>
                    </div>
                `;
            } else {
                searchResults.innerHTML = '<p>Start typing to search products...</p>';
            }
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new ShoppingCart();
    new SmoothScroll();
    new Newsletter();
    new SearchManager();

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.product-card, .category-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});