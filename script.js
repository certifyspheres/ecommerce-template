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
        this.products = this.getProductDatabase();
        this.setupEventListeners();
    }

    getProductDatabase() {
        // Mock product database
        return [
            { id: 1, name: 'Elegant Summer Dress', category: 'Dresses', price: '$89.99', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop', url: 'products.html#dress-1' },
            { id: 2, name: 'Premium Cotton Shirt', category: 'Shirts', price: '$49.99', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop', url: 'products.html#shirt-1' },
            { id: 3, name: 'Designer Denim Jeans', category: 'Jeans', price: '$79.99', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop', url: 'products.html#jeans-1' },
            { id: 4, name: 'Luxury Leather Jacket', category: 'Jackets', price: '$199.99', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop', url: 'products.html#jacket-1' },
            { id: 5, name: 'Casual Sneakers', category: 'Shoes', price: '$69.99', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop', url: 'products.html#shoes-1' },
            { id: 6, name: 'Silk Blouse', category: 'Blouses', price: '$59.99', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop', url: 'products.html#blouse-1' },
            { id: 7, name: 'Wool Sweater', category: 'Sweaters', price: '$89.99', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop', url: 'products.html#sweater-1' },
            { id: 8, name: 'Summer Sandals', category: 'Shoes', price: '$39.99', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=400&fit=crop', url: 'products.html#sandals-1' },
            { id: 9, name: 'Evening Gown', category: 'Dresses', price: '$149.99', image: 'https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?w=300&h=400&fit=crop', url: 'products.html#gown-1' },
            { id: 10, name: 'Casual T-Shirt', category: 'T-Shirts', price: '$24.99', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop', url: 'products.html#tshirt-1' },
            { id: 11, name: 'Formal Blazer', category: 'Blazers', price: '$119.99', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop', url: 'products.html#blazer-1' },
            { id: 12, name: 'Athletic Shorts', category: 'Shorts', price: '$34.99', image: 'https://images.unsplash.com/photo-1506629905607-d9b1b2e3d3b1?w=300&h=400&fit=crop', url: 'products.html#shorts-1' }
        ];
    }

    setupEventListeners() {
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.showSearchModal();
            });
        }

        // Add keyboard shortcut for search (Ctrl/Cmd + K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.showSearchModal();
            }
        });
    }

    showSearchModal() {
        const modal = document.createElement('div');
        modal.className = 'search-modal';
        modal.innerHTML = `
            <div class="search-modal-content">
                <div class="search-header">
                    <div class="search-input-wrapper">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" placeholder="Search products... (Ctrl+K)" class="search-input" autofocus>
                    </div>
                    <button class="close-search">&times;</button>
                </div>
                <div class="search-results">
                    <div class="search-suggestions">
                        <h4>Popular Searches</h4>
                        <div class="suggestion-tags">
                            <span class="suggestion-tag" data-query="dress">Dresses</span>
                            <span class="suggestion-tag" data-query="shirt">Shirts</span>
                            <span class="suggestion-tag" data-query="jeans">Jeans</span>
                            <span class="suggestion-tag" data-query="shoes">Shoes</span>
                            <span class="suggestion-tag" data-query="jacket">Jackets</span>
                        </div>
                    </div>
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
                backdrop-filter: blur(4px);
            }
            
            .search-modal-content {
                background: var(--card-color);
                border-radius: var(--border-radius-lg);
                width: 90%;
                max-width: 600px;
                max-height: 70vh;
                overflow: hidden;
                box-shadow: var(--shadow-lg);
                border: 1px solid var(--border-color);
                animation: searchModalIn 0.3s ease;
            }
            
            @keyframes searchModalIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            .search-header {
                display: flex;
                align-items: center;
                padding: 1rem;
                border-bottom: 1px solid var(--border-color);
                background: var(--bg-color);
            }
            
            .search-input-wrapper {
                flex: 1;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                background: var(--surface-color);
                padding: 0.75rem;
                border-radius: var(--border-radius);
                border: 1px solid var(--border-color);
            }
            
            .search-input-wrapper:focus-within {
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
            }
            
            .search-icon {
                color: var(--text-secondary);
                font-size: 1rem;
            }
            
            .search-input {
                flex: 1;
                border: none;
                outline: none;
                font-size: 1rem;
                background: transparent;
                color: var(--text-primary);
            }
            
            .search-input::placeholder {
                color: var(--text-secondary);
            }
            
            .close-search {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--text-secondary);
                padding: 0.5rem;
                margin-left: 0.5rem;
                border-radius: var(--border-radius);
                transition: var(--transition);
            }
            
            .close-search:hover {
                background: var(--surface-color);
                color: var(--text-primary);
            }
            
            .search-results {
                padding: 1rem;
                max-height: 50vh;
                overflow-y: auto;
            }
            
            .search-suggestions h4 {
                color: var(--text-primary);
                margin-bottom: 1rem;
                font-size: 0.9rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .suggestion-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .suggestion-tag {
                background: var(--surface-color);
                color: var(--text-secondary);
                padding: 0.5rem 1rem;
                border-radius: var(--border-radius);
                cursor: pointer;
                font-size: 0.9rem;
                transition: var(--transition);
                border: 1px solid var(--border-color);
            }
            
            .suggestion-tag:hover {
                background: var(--primary-color);
                color: white;
                border-color: var(--primary-color);
            }
            
            .search-product-results {
                display: grid;
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .search-product-item {
                display: flex;
                gap: 1rem;
                padding: 1rem;
                background: var(--surface-color);
                border-radius: var(--border-radius);
                cursor: pointer;
                transition: var(--transition);
                border: 1px solid var(--border-color);
            }
            
            .search-product-item:hover {
                background: var(--bg-color);
                transform: translateY(-2px);
                box-shadow: var(--shadow);
            }
            
            .search-product-image {
                width: 60px;
                height: 60px;
                border-radius: var(--border-radius);
                object-fit: cover;
                flex-shrink: 0;
            }
            
            .search-product-info {
                flex: 1;
            }
            
            .search-product-name {
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 0.25rem;
            }
            
            .search-product-category {
                font-size: 0.85rem;
                color: var(--text-secondary);
                margin-bottom: 0.25rem;
            }
            
            .search-product-price {
                font-weight: 700;
                color: var(--primary-color);
            }
            
            .no-results {
                text-align: center;
                padding: 2rem;
                color: var(--text-secondary);
            }
            
            .no-results i {
                font-size: 3rem;
                margin-bottom: 1rem;
                opacity: 0.5;
            }
            
            .loading-results {
                text-align: center;
                padding: 2rem;
                color: var(--text-secondary);
            }
            
            .loading-results i {
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);

        document.body.appendChild(modal);

        // Setup functionality
        const closeBtn = modal.querySelector('.close-search');
        const searchInput = modal.querySelector('.search-input');
        const searchResults = modal.querySelector('.search-results');
        const suggestionTags = modal.querySelectorAll('.suggestion-tag');

        // Close functionality
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

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.parentNode) {
                modal.remove();
                styleSheet.remove();
            }
        });

        // Suggestion tag clicks
        suggestionTags.forEach(tag => {
            tag.addEventListener('click', () => {
                const query = tag.dataset.query;
                searchInput.value = query;
                this.performSearch(query, searchResults);
            });
        });

        // Search functionality
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            clearTimeout(searchTimeout);
            
            if (query.length === 0) {
                this.showSearchSuggestions(searchResults);
            } else if (query.length >= 2) {
                searchResults.innerHTML = `
                    <div class="loading-results">
                        <i class="fas fa-spinner"></i>
                        <p>Searching...</p>
                    </div>
                `;
                
                searchTimeout = setTimeout(() => {
                    this.performSearch(query, searchResults);
                }, 300);
            }
        });

        // Focus input
        searchInput.focus();
    }

    showSearchSuggestions(container) {
        container.innerHTML = `
            <div class="search-suggestions">
                <h4>Popular Searches</h4>
                <div class="suggestion-tags">
                    <span class="suggestion-tag" data-query="dress">Dresses</span>
                    <span class="suggestion-tag" data-query="shirt">Shirts</span>
                    <span class="suggestion-tag" data-query="jeans">Jeans</span>
                    <span class="suggestion-tag" data-query="shoes">Shoes</span>
                    <span class="suggestion-tag" data-query="jacket">Jackets</span>
                </div>
            </div>
        `;

        // Re-attach event listeners to new suggestion tags
        container.querySelectorAll('.suggestion-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const query = tag.dataset.query;
                const searchInput = document.querySelector('.search-input');
                searchInput.value = query;
                this.performSearch(query, container);
            });
        });
    }

    performSearch(query, container) {
        const results = this.products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        if (results.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h4>No products found</h4>
                    <p>Try searching for something else or browse our categories</p>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(product => `
            <div class="search-product-item" onclick="window.location.href='${product.url}'">
                <img src="${product.image}" alt="${product.name}" class="search-product-image">
                <div class="search-product-info">
                    <div class="search-product-name">${product.name}</div>
                    <div class="search-product-category">${product.category}</div>
                    <div class="search-product-price">${product.price}</div>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="search-product-results">
                <h4>Found ${results.length} product${results.length !== 1 ? 's' : ''}</h4>
                ${resultsHTML}
            </div>
        `;
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

// Countdown Timer Functionality
class CountdownTimer {
    constructor() {
        this.initTimers();
    }

    initTimers() {
        // Promo banner timer
        this.startTimer('hours', 'minutes', 'seconds', 24 * 60 * 60); // 24 hours
        
        // Deal of the day timer
        this.startTimer('deal-hours', 'deal-minutes', 'deal-seconds', 12 * 60 * 60 + 34 * 60 + 56); // 12:34:56
    }

    startTimer(hoursId, minutesId, secondsId, totalSeconds) {
        const updateTimer = () => {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            const hoursElement = document.getElementById(hoursId);
            const minutesElement = document.getElementById(minutesId);
            const secondsElement = document.getElementById(secondsId);

            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
            if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');

            if (totalSeconds > 0) {
                totalSeconds--;
                setTimeout(updateTimer, 1000);
            } else {
                // Timer expired - could trigger some action here
                if (hoursElement) hoursElement.textContent = '00';
                if (minutesElement) minutesElement.textContent = '00';
                if (secondsElement) secondsElement.textContent = '00';
            }
        };

        updateTimer();
    }
}

// Enhanced Product Filtering
class ProductFilter {
    constructor() {
        this.setupFilters();
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.product-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filter = button.dataset.filter;
                
                productCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        const badge = card.querySelector('.product-badge');
                        if (badge && badge.textContent.toLowerCase().includes(filter)) {
                            card.style.display = 'block';
                            card.style.animation = 'fadeInUp 0.5s ease';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
}

// Enhanced Newsletter with Better UX
class EnhancedNewsletter {
    constructor() {
        this.setupNewsletter();
    }

    setupNewsletter() {
        const forms = document.querySelectorAll('.newsletter-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubscription(form);
            });
        });
    }

    async handleSubscription(form) {
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.innerHTML;
        
        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        button.disabled = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success state
            button.innerHTML = '<i class="fas fa-check"></i> Welcome Aboard!';
            button.style.background = '#10b981';
            
            // Show success message
            this.showNotification('🎉 Welcome! Check your email for your 20% discount code.', 'success');
            
            // Reset form
            form.querySelector('input[type="email"]').value = '';
            
            // Reset button after delay
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
            
        } catch (error) {
            // Show error state
            button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Try Again';
            button.style.background = '#ef4444';
            
            this.showNotification('Something went wrong. Please try again.', 'error');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
        }
    }

    showNotification(message, type) {
        // Remove existing notifications
        document.querySelectorAll('.newsletter-notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `newsletter-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="close-notification">&times;</button>
            </div>
        `;

        const styles = `
            .newsletter-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 2000;
                max-width: 400px;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-lg);
                animation: slideInRight 0.3s ease;
            }
            
            .newsletter-notification.success {
                background: #10b981;
                color: white;
            }
            
            .newsletter-notification.error {
                background: #ef4444;
                color: white;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem 1.5rem;
                gap: 1rem;
            }
            
            .close-notification {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                opacity: 0.8;
            }
            
            .close-notification:hover {
                opacity: 1;
            }
        `;

        if (!document.querySelector('#newsletter-notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'newsletter-notification-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        document.body.appendChild(notification);

        // Close functionality
        const closeBtn = notification.querySelector('.close-notification');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// Smooth Scroll for Shop Now buttons
class SmoothScrollEnhanced {
    constructor() {
        this.setupScrollButtons();
    }

    setupScrollButtons() {
        // Shop now buttons in trending section
        document.querySelectorAll('.shop-now-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Hero scroll indicator
        const scrollIndicator = document.querySelector('.hero-scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const nextSection = document.querySelector('.promo-banner') || document.querySelector('.features-section');
                if (nextSection) {
                    nextSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }
}

// Initialize enhanced functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize existing functionality
    new ThemeManager();
    new ShoppingCart();
    new SmoothScroll();
    new Newsletter();
    new SearchManager();

    // Initialize new enhanced functionality
    new CountdownTimer();
    new ProductFilter();
    new EnhancedNewsletter();
    new SmoothScrollEnhanced();

    // Add enhanced loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Enhanced scroll animations with stagger effect
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger animation
            }
        });
    }, observerOptions);

    // Observe elements for staggered animation
    document.querySelectorAll('.product-card, .category-card, .feature-card, .testimonial-card, .guarantee-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero-modern');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
});