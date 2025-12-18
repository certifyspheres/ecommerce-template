# Customization Guide

## Overview

StyleHub is built with modern CSS variables and modular JavaScript, making it easy to customize colors, fonts, layouts, and functionality.

## Basic Customization

### 1. Colors and Themes

The template uses CSS variables for easy color customization. Edit the `:root` section in `styles.css`:

```css
:root {
  /* Primary Colors */
  --primary-color: #3b82f6;        /* Main brand color */
  --primary-dark: #2563eb;         /* Darker shade */
  --primary-light: #93c5fd;        /* Lighter shade */
  --primary-gradient: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  
  /* Background Colors */
  --bg-color: #ffffff;             /* Main background */
  --surface-color: #f8fafc;        /* Card backgrounds */
  --card-color: #ffffff;           /* Individual cards */
  
  /* Text Colors */
  --text-primary: #1e293b;         /* Main text */
  --text-secondary: #64748b;       /* Secondary text */
  --text-muted: #94a3b8;          /* Muted text */
}
```

### 2. Typography

Change fonts by updating the Google Fonts import and CSS:

```css
/* In HTML head */
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

/* In CSS */
body {
  font-family: 'Poppins', sans-serif;
}
```

### 3. Logo and Branding

Replace the text logo with your own:

```html
<!-- In header section -->
<div class="nav-brand">
    <img src="your-logo.png" alt="Your Brand" class="logo">
    <!-- OR -->
    <h1>Your Brand Name</h1>
</div>
```

## Advanced Customization

### 1. Adding New Color Themes

To add a new color theme:

1. **Add CSS variables:**
```css
[data-theme="yourtheme"] {
  --primary-color: #your-color;
  --primary-dark: #your-dark-color;
  --primary-light: #your-light-color;
  --primary-gradient: linear-gradient(135deg, #your-color 0%, #your-dark-color 100%);
}
```

2. **Add theme button:**
```html
<button class="color-theme" data-theme="yourtheme" style="background: #your-color;"></button>
```

### 2. Customizing Product Cards

Modify product card structure in HTML and corresponding CSS:

```html
<div class="product-card">
    <div class="product-badge">Your Badge</div>
    <button class="wishlist-btn"><i class="far fa-heart"></i></button>
    <div class="product-image">
        <img src="your-image.jpg" alt="Product">
        <div class="product-overlay">
            <button class="quick-view">Quick View</button>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    </div>
    <div class="product-info">
        <h3>Product Name</h3>
        <p class="product-price">$99.99</p>
        <!-- Add your custom elements -->
    </div>
</div>
```

### 3. Layout Modifications

#### Changing Grid Layouts

```css
/* Products grid - modify columns */
.product-grid {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Adjust min width */
  gap: 2rem; /* Adjust spacing */
}

/* Categories grid */
.categories-grid-modern {
  grid-template-columns: repeat(3, 1fr); /* Fixed 3 columns */
}
```

#### Adjusting Container Width

```css
.container {
  max-width: 1400px; /* Increase from default 1200px */
  margin: 0 auto;
  padding: 0 20px;
}
```

### 4. Adding New Pages

1. **Create HTML file** (e.g., `services.html`)
2. **Copy header/footer** from existing pages
3. **Add navigation link:**
```html
<nav class="nav-menu">
    <a href="index.html">Home</a>
    <a href="products.html">Products</a>
    <a href="services.html">Services</a> <!-- New page -->
    <!-- ... other links -->
</nav>
```

### 5. Custom JavaScript Functionality

Add your custom JavaScript to `script.js` or create new files:

```javascript
// Example: Custom product filter
class CustomFilter {
    constructor() {
        this.init();
    }
    
    init() {
        // Your custom functionality
    }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    new CustomFilter();
});
```

## Component Customization

### 1. Hero Section

Modify the hero section in `index.html`:

```html
<section class="hero-modern">
    <div class="hero-slide active">
        <div class="hero-background">
            <img src="your-hero-image.jpg" alt="Your Hero">
        </div>
        <div class="container">
            <div class="hero-content-modern">
                <span class="hero-badge">Your Badge Text</span>
                <h1 class="hero-title">Your Headline</h1>
                <p class="hero-subtitle">Your description</p>
                <!-- Customize buttons and content -->
            </div>
        </div>
    </div>
</section>
```

### 2. Footer Customization

Update footer content and links:

```html
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h3>Your Brand</h3>
                <p>Your brand description</p>
                <!-- Update social links -->
            </div>
            <!-- Add/modify footer sections -->
        </div>
    </div>
</footer>
```

### 3. Form Styling

Customize form elements:

```css
.form-group input,
.form-group select {
  padding: 1rem;
  border: 2px solid var(--border-color); /* Increase border width */
  border-radius: 12px; /* More rounded corners */
  background: var(--surface-color); /* Different background */
}
```

## Responsive Customization

### Mobile-First Approach

Customize breakpoints and mobile layouts:

```css
/* Mobile styles (default) */
.your-element {
  font-size: 1rem;
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .your-element {
    font-size: 1.2rem;
    padding: 1.5rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .your-element {
    font-size: 1.4rem;
    padding: 2rem;
  }
}
```

## Performance Optimization

### 1. Image Optimization

- Use WebP format when possible
- Implement lazy loading
- Optimize image sizes for different devices

### 2. CSS Optimization

- Remove unused CSS rules
- Minimize CSS file size
- Use CSS containment for better performance

### 3. JavaScript Optimization

- Minimize JavaScript files
- Use async/defer for script loading
- Implement code splitting for large applications

## Attribution Requirements

### Open Source License
If using the open source license, maintain attribution:

```html
<!-- Keep this in footer -->
<p>Created by <a href="https://www.certifysphere.com/">CertifySphere</a></p>
```

### Commercial License
With commercial license, attribution is optional but appreciated.

## Best Practices

1. **Test thoroughly** after customizations
2. **Keep backups** of original files
3. **Use version control** (Git) for tracking changes
4. **Validate HTML/CSS** for standards compliance
5. **Test on multiple devices** and browsers
6. **Optimize for accessibility** (ARIA labels, alt text, etc.)

## Getting Help

- **Documentation**: Check other files in `docs/` folder
- **Examples**: Look at existing code patterns in the template
- **Support**: 
  - Open Source: [GitHub Issues](https://github.com/certifyspheres/ecommerce-template/issues)
  - Commercial: [support@certifysphere.com](mailto:support@certifysphere.com)