# Component Documentation

## Overview

StyleHub is built with modular, reusable components. This guide covers all major components, their structure, customization options, and usage examples.

## Navigation Components

### Header Navigation

**Location**: All HTML files
**Files**: `styles.css` (header styles), `script.js` (mobile menu)

```html
<header class="header">
    <div class="container">
        <div class="nav-brand">
            <h1><a href="index.html">StyleHub</a></h1>
        </div>
        <nav class="nav-menu">
            <a href="index.html">Home</a>
            <a href="products.html">Products</a>
            <!-- More nav items -->
        </nav>
        <div class="nav-actions">
            <button class="search-btn"><i class="fas fa-search"></i></button>
            <button class="cart-btn">
                <i class="fas fa-shopping-cart"></i>
                <span class="cart-count">3</span>
            </button>
            <div class="user-menu">
                <button class="user-btn"><i class="fas fa-user"></i></button>
                <div class="user-dropdown">
                    <!-- Dropdown items -->
                </div>
            </div>
        </div>
    </div>
</header>
```

**Customization Options:**
- Change logo/brand name
- Add/remove navigation items
- Modify user dropdown content
- Adjust cart count display

### Breadcrumb Navigation

```html
<div class="breadcrumb">
    <div class="container">
        <a href="index.html">Home</a>
        <i class="fas fa-chevron-right"></i>
        <span>Current Page</span>
    </div>
</div>
```

## Product Components

### Product Card

**Location**: `index.html`, `products.html`
**Files**: `styles.css` (product card styles), `script.js` (interactions)

```html
<div class="product-card">
    <div class="product-badge">New</div>
    <button class="wishlist-btn"><i class="far fa-heart"></i></button>
    <div class="product-image">
        <img src="product-image.jpg" alt="Product Name">
        <div class="product-overlay">
            <button class="quick-view">Quick View</button>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    </div>
    <div class="product-info">
        <h3>Product Name</h3>
        <p class="product-price">$99.99</p>
        <div class="product-rating">
            <i class="fas fa-star"></i>
            <!-- More stars -->
            <span>(24 reviews)</span>
        </div>
        <div class="product-actions">
            <button class="share-btn" title="Share">
                <i class="fas fa-share-alt"></i>
            </button>
        </div>
    </div>
</div>
```

**Badge Types:**
- `new` - Green "New" badge
- `sale` - Red "Sale" badge  
- `trending` - Orange "Trending" badge

**Customization:**
```css
.product-badge.custom {
  background: #your-color;
  color: white;
}
```

### Product Grid

```html
<div class="product-grid">
    <!-- Product cards go here -->
</div>
```

**Grid Variations:**
```css
/* 3 columns */
.product-grid {
  grid-template-columns: repeat(3, 1fr);
}

/* Auto-fit responsive */
.product-grid {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* List view */
.product-grid.list-view {
  display: flex;
  flex-direction: column;
}
```

## Form Components

### Authentication Forms

**Location**: `login.html`, `signup.html`
**Files**: `auth.js` (functionality), `styles.css` (styling)

```html
<form class="auth-form" id="loginForm">
    <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" required>
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <div class="password-input">
            <input type="password" id="password" name="password" required>
            <button type="button" class="password-toggle">
                <i class="fas fa-eye"></i>
            </button>
        </div>
    </div>
    <button type="submit" class="auth-btn primary">Sign In</button>
</form>
```

### Checkout Forms

**Location**: `checkout.html`
**Files**: `checkout.js` (validation), `styles.css` (styling)

```html
<form class="shipping-form">
    <div class="form-section">
        <h3>Contact Information</h3>
        <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" required>
        </div>
    </div>
</form>
```

**Form Validation:**
```javascript
validateField(field) {
  if (!field.value.trim()) {
    this.showFieldError(field, 'This field is required');
    return false;
  }
  this.clearFieldError(field);
  return true;
}
```

## Filter Components

### Sidebar Filters

**Location**: `products.html`
**Files**: `products.js` (functionality)

```html
<aside class="filters-sidebar">
    <div class="filter-section">
        <h3>Categories</h3>
        <div class="filter-options">
            <label class="filter-option">
                <input type="checkbox" name="category" value="women">
                <span class="checkmark"></span>
                Women's Fashion (89)
            </label>
        </div>
    </div>
</aside>
```

### Price Range Filter

```html
<div class="filter-section">
    <h3>Price Range</h3>
    <div class="price-range">
        <div class="price-inputs">
            <input type="number" placeholder="Min" min="0" max="1000">
            <span>-</span>
            <input type="number" placeholder="Max" min="0" max="1000">
        </div>
    </div>
</div>
```

### Size Filter

```html
<div class="filter-section">
    <h3>Size</h3>
    <div class="size-options">
        <button class="size-btn">XS</button>
        <button class="size-btn">S</button>
        <button class="size-btn active">M</button>
        <!-- More sizes -->
    </div>
</div>
```

### Color Filter

```html
<div class="filter-section">
    <h3>Color</h3>
    <div class="color-options">
        <button class="color-btn" style="background: #000;" title="Black"></button>
        <button class="color-btn active" style="background: #3b82f6;" title="Blue"></button>
        <!-- More colors -->
    </div>
</div>
```

## Modal Components

### Quick View Modal

**Files**: `script.js` (ShoppingCart class)

```javascript
showQuickView(product) {
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
          <!-- More content -->
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}
```

### Share Modal

```javascript
showShareModal(product) {
  // Creates social sharing modal
  // Includes Facebook, Twitter, Pinterest, WhatsApp, Email, Copy Link
}
```

## Cart Components

### Cart Item

**Location**: `cart.html`
**Files**: `cart.js` (functionality)

```html
<div class="cart-item">
    <div class="item-image">
        <img src="product-image.jpg" alt="Product">
    </div>
    <div class="item-details">
        <h3>Product Name</h3>
        <p class="item-sku">SKU: ABC123</p>
        <div class="item-options">
            <span>Size: M</span>
            <span>Color: Blue</span>
        </div>
    </div>
    <div class="item-quantity">
        <button class="qty-btn minus">-</button>
        <input type="number" value="1" min="1" max="10">
        <button class="qty-btn plus">+</button>
    </div>
    <div class="item-price">
        <span class="current-price">$89.99</span>
    </div>
</div>
```

### Cart Summary

```html
<div class="cart-summary">
    <div class="summary-card">
        <h3>Order Summary</h3>
        <div class="summary-row">
            <span>Subtotal</span>
            <span>$309.96</span>
        </div>
        <!-- More summary rows -->
        <button class="checkout-btn">Proceed to Checkout</button>
    </div>
</div>
```

## Theme Components

### Theme Selector

**Location**: All HTML files
**Files**: `script.js` (ThemeManager class)

```html
<div class="theme-selector">
    <button class="theme-toggle" id="themeToggle">
        <i class="fas fa-palette"></i>
    </button>
    <div class="theme-options" id="themeOptions">
        <div class="theme-mode-toggle">
            <button class="mode-btn active" data-mode="light">
                <i class="fas fa-sun"></i> Light
            </button>
            <button class="mode-btn" data-mode="dark">
                <i class="fas fa-moon"></i> Dark
            </button>
        </div>
        <div class="color-themes">
            <button class="color-theme active" data-theme="blue" style="background: #3b82f6;"></button>
            <!-- More theme buttons -->
        </div>
    </div>
</div>
```

## Layout Components

### Hero Section (Modern)

**Location**: `index.html`

```html
<section class="hero-modern">
    <div class="hero-slider">
        <div class="hero-slide active">
            <div class="hero-background">
                <img src="hero-image.jpg" alt="Hero">
            </div>
            <div class="container">
                <div class="hero-content-modern">
                    <span class="hero-badge">New Collection 2024</span>
                    <h1 class="hero-title">Your Headline</h1>
                    <p class="hero-subtitle">Your description</p>
                    <div class="hero-cta-group">
                        <button class="cta-btn primary">Shop Now</button>
                        <button class="cta-btn secondary">Watch Video</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
```

### Section Headers

```html
<div class="section-header">
    <div class="section-header-content">
        <span class="section-badge">What's Hot</span>
        <h2 class="section-title-modern">Section Title</h2>
        <p class="section-subtitle">Section description</p>
    </div>
    <a href="#" class="view-all-btn">
        View All <i class="fas fa-arrow-right"></i>
    </a>
</div>
```

## Interactive Components

### Testimonials

**Location**: `index.html`

```html
<div class="testimonial-card">
    <div class="testimonial-rating">
        <i class="fas fa-star"></i>
        <!-- More stars -->
    </div>
    <p>"Customer testimonial text here..."</p>
    <div class="testimonial-author">
        <img src="customer-photo.jpg" alt="Customer Name">
        <div class="author-info">
            <h4>Customer Name</h4>
            <span>Verified Buyer</span>
        </div>
    </div>
</div>
```

### Newsletter Signup

```html
<section class="newsletter-modern">
    <div class="container">
        <div class="newsletter-content-modern">
            <div class="newsletter-text">
                <span class="newsletter-badge">Stay in the Loop</span>
                <h2>Get Exclusive Offers</h2>
                <p>Subscribe description...</p>
            </div>
            <div class="newsletter-form-modern">
                <form class="newsletter-form">
                    <div class="form-group-modern">
                        <input type="email" placeholder="Enter email" required>
                        <button type="submit">Subscribe Now</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
```

## Utility Components

### Buttons

```html
<!-- Primary Button -->
<button class="cta-btn primary">Primary Action</button>

<!-- Secondary Button -->
<button class="cta-btn secondary">Secondary Action</button>

<!-- Icon Button -->
<button class="icon-btn">
    <i class="fas fa-heart"></i>
</button>
```

### Badges

```html
<span class="badge">New</span>
<span class="badge sale">Sale</span>
<span class="badge trending">Trending</span>
```

### Loading States

```html
<div class="loading-spinner">
    <i class="fas fa-spinner fa-spin"></i>
</div>
```

## Responsive Behavior

### Breakpoints

```css
/* Mobile First */
.component { /* Mobile styles */ }

@media (min-width: 768px) {
  .component { /* Tablet styles */ }
}

@media (min-width: 1024px) {
  .component { /* Desktop styles */ }
}
```

### Mobile-Specific Components

```html
<!-- Mobile-only elements -->
<button class="mobile-only filters-toggle">
    <i class="fas fa-filter"></i> Filters
</button>

<!-- Desktop-only elements -->
<div class="desktop-only">
    <!-- Desktop content -->
</div>
```

## Accessibility Features

### ARIA Labels

```html
<button aria-label="Add to wishlist" class="wishlist-btn">
    <i class="far fa-heart"></i>
</button>

<div role="tablist" class="theme-mode-toggle">
    <button role="tab" aria-selected="true">Light</button>
    <button role="tab" aria-selected="false">Dark</button>
</div>
```

### Keyboard Navigation

```css
.interactive-element:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
```

## Performance Optimization

### Lazy Loading

```html
<img src="placeholder.jpg" data-src="actual-image.jpg" class="lazy-load" alt="Product">
```

### CSS Containment

```css
.product-card {
  contain: layout style paint;
}
```

## Component Best Practices

1. **Modularity**: Keep components self-contained
2. **Reusability**: Design for multiple use cases
3. **Accessibility**: Include ARIA labels and keyboard support
4. **Performance**: Use CSS containment and lazy loading
5. **Consistency**: Follow established patterns
6. **Documentation**: Comment complex components

## Extending Components

### Adding New Product Card Variants

```css
.product-card.featured {
  border: 2px solid var(--primary-color);
  transform: scale(1.05);
}

.product-card.compact {
  max-width: 250px;
}

.product-card.detailed {
  .product-info {
    padding: 2rem;
  }
}
```

### Custom Form Components

```html
<div class="form-group custom">
    <label class="custom-label">Custom Field</label>
    <div class="custom-input-wrapper">
        <input type="text" class="custom-input">
        <span class="custom-icon"><i class="fas fa-check"></i></span>
    </div>
</div>
```

This component documentation provides a comprehensive guide to all major components in the StyleHub template, making it easy for developers to understand, customize, and extend the functionality.