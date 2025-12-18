# StyleHub - Premium Ecommerce Website Template

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Commercial License](https://img.shields.io/badge/Commercial-License-blue.svg)](https://www.certifysphere.com/)
[![Created by CertifySphere](https://img.shields.io/badge/Created%20by-CertifySphere-orange.svg)](https://www.certifysphere.com/)

A modern, professional ecommerce website template with multiple color themes, light/dark mode support, complete authentication, shopping cart, and checkout functionality.

**Created by [CertifySphere](https://www.certifysphere.com/)** - Premium web development solutions and templates.

## 🌐 Live Demo

**[View Live Demo →](https://ecommerce-theme.certifysphere.com/)**

Experience the full functionality of StyleHub with our interactive demo featuring all pages, themes, and ecommerce features.

## Features

### 🎨 Theme Customization
- **5 Color Themes**: Blue (default), Purple, Green, Orange, and Pink
- **Light/Dark Mode**: Toggle between light and dark themes with smooth transitions
- **Persistent Settings**: Theme preferences saved in localStorage
- **Modern Gradients**: Beautiful gradient effects throughout the design

### 🛍️ Complete Ecommerce Features
- **Product Catalog**: Modern product grid with badges (New, Sale, Trending)
- **Wishlist**: Save favorite products with heart icon
- **Social Sharing**: Share products on Facebook, Twitter, Pinterest, WhatsApp, Email
- **Quick View**: Modal for quick product preview
- **Shopping Cart**: Full-featured cart with quantity controls
- **Promo Codes**: Apply discount codes at checkout
- **Product Ratings**: Star ratings and review counts
- **Category Browsing**: Organized product categories

### 🔐 Authentication System
- **Login Page**: Email/password authentication
- **Sign Up Page**: Complete registration form with validation
- **Social Login**: Google, Facebook, and Apple sign-in options
- **Password Strength**: Real-time password strength indicator
- **Form Validation**: Client-side validation with error messages
- **Remember Me**: Persistent login option

### 🛒 Shopping Cart & Checkout
- **Cart Management**: Add, remove, update quantities
- **Save for Later**: Move items to wishlist
- **Order Summary**: Real-time price calculations
- **Promo Codes**: Discount code application
- **Multi-Step Checkout**: Shipping, Payment, Review
- **Payment Options**: Credit card, PayPal, Apple Pay, Google Pay
- **Shipping Methods**: Standard, Express, Overnight options
- **Order Confirmation**: Success modal with order details

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Large tap targets and smooth interactions
- **Adaptive Layout**: Grid systems that adjust to viewport
- **Modern UI**: Glass morphism and smooth animations

### 🚀 Performance & UX
- **Fast Loading**: Optimized images from Unsplash
- **Smooth Animations**: CSS transitions and keyframe animations
- **Intersection Observer**: Lazy loading for better performance
- **Form Validation**: Real-time validation feedback
- **Notifications**: Toast notifications for user actions
- **Progress Indicators**: Visual feedback for multi-step processes

## How to Use

1. **Open the website**: Simply open `index.html` in your browser

2. **Change themes**: 
   - Click the palette icon in the top-right corner
   - Select light or dark mode
   - Choose from 5 color themes

3. **Browse products**:
   - Hover over products to see action buttons
   - Click "Quick View" for detailed product modal
   - Click "Add to Cart" to add items

4. **Search**: Click the search icon in the header

5. **Newsletter**: Subscribe at the bottom of the page

## File Structure

```
├── index.html          # Main homepage
├── login.html          # Login page with social auth
├── signup.html         # Registration page
├── cart.html           # Shopping cart page
├── checkout.html       # Multi-step checkout
├── styles.css          # All styles with theme variables
├── script.js           # Main JavaScript functionality
├── auth.js             # Authentication logic
├── cart.js             # Shopping cart functionality
├── checkout.js         # Checkout process management
└── README.md          # This documentation
```

## Pages Overview

### 🏠 Homepage (index.html)
- Hero section with call-to-action
- Featured product categories
- Product grid with modern cards
- Newsletter subscription
- Social sharing for products
- Wishlist functionality

### 🔐 Authentication Pages
- **Login (login.html)**: Email/password + social login options
- **Sign Up (signup.html)**: Complete registration with validation

### 🛒 Shopping Pages
- **Cart (cart.html)**: Full cart management with recommendations
- **Checkout (checkout.html)**: 3-step checkout process

## Key Features Breakdown

### 🎯 Product Cards
- High-quality product images
- Hover effects with action buttons
- Product badges (New, Sale, Trending)
- Wishlist toggle with heart animation
- Social sharing modal
- Star ratings and review counts
- Price display with original/sale prices

### 🔄 Social Sharing
- Facebook, Twitter, Pinterest integration
- WhatsApp sharing for mobile
- Email sharing option
- Copy link to clipboard
- Beautiful sharing modal with platform icons

### 💳 Checkout Process
1. **Shipping Step**: Address and delivery options
2. **Payment Step**: Multiple payment methods
3. **Review Step**: Order confirmation before purchase
- Real-time form validation
- Progress indicator
- Secure payment badges
- Order success confirmation

## Customization

### Change Colors
Edit the CSS variables in `styles.css`:

```css
:root {
  --primary-color: #3b82f6;
  --primary-dark: #2563eb;
  --primary-light: #93c5fd;
}
```

### Add Products
Add new product cards in `index.html`:

```html
<div class="product-card">
  <div class="product-image">
    <img src="your-image-url" alt="Product Name">
    <div class="product-overlay">
      <button class="quick-view">Quick View</button>
      <button class="add-to-cart">Add to Cart</button>
    </div>
  </div>
  <div class="product-info">
    <h3>Product Name</h3>
    <p class="product-price">$99.99</p>
    <div class="product-rating">
      <!-- Star ratings -->
    </div>
  </div>
</div>
```

### Modify Themes
Add new color themes in `styles.css`:

```css
[data-theme="yourtheme"] {
  --primary-color: #yourcolor;
  --primary-dark: #yourdarkcolor;
  --primary-light: #yourlightcolor;
}
```

Then add a button in `index.html`:

```html
<button class="color-theme" data-theme="yourtheme" style="background: #yourcolor;"></button>
```

## 📋 Quick Start

1. **Clone the repository**
   ```bash
   git clone git@github.com:certifyspheres/ecommerce-template.git
   cd ecommerce-template
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   ```

3. **Start customizing**
   - Edit `styles.css` for styling
   - Modify `script.js` for functionality
   - Update content in HTML files

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) folder:

- [Installation Guide](./docs/installation.md)
- [Customization Guide](./docs/customization.md)
- [Theme Configuration](./docs/themes.md)
- [Component Documentation](./docs/components.md)
- [Deployment Guide](./docs/deployment.md)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Variables, Grid, Flexbox
- **Vanilla JavaScript (ES6+)** - No framework dependencies
- **Font Awesome Icons** - Professional iconography
- **Google Fonts (Inter)** - Modern typography
- **Unsplash Images** - High-quality stock photography

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 Licensing Options

### Open Source License (MIT with Attribution)
- ✅ Free for personal and commercial use
- ✅ Modify and distribute
- ❗ **Must retain CertifySphere attribution**
- ❗ Must include link to https://www.certifysphere.com/

### Commercial License
- ✅ Remove attribution requirements
- ✅ Unlimited commercial projects
- ✅ Priority support and updates
- ✅ Extended customization rights

**[Purchase Commercial License](https://www.certifysphere.com/)** starting at $99

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./docs/contributing.md) for details.

## 📞 Support

- **Open Source Support**: [GitHub Issues](https://github.com/certifyspheres/ecommerce-template/issues)
- **Commercial Support**: [support@certifysphere.com](mailto:support@certifysphere.com)
- **Documentation**: [docs/](./docs/)

## 🏢 About CertifySphere

[CertifySphere](https://www.certifysphere.com/) specializes in creating premium web development solutions, templates, and digital products. We help businesses and developers build modern, professional websites with cutting-edge technology.

### Our Services:
- Premium Website Templates
- Custom Web Development
- E-commerce Solutions
- Digital Product Development

## 📜 Credits

- **Template Design & Development**: [CertifySphere](https://www.certifysphere.com/)
- **Images**: [Unsplash](https://unsplash.com)
- **Icons**: [Font Awesome](https://fontawesome.com)
- **Fonts**: [Google Fonts](https://fonts.google.com)

---

**Created with ❤️ by [CertifySphere](https://www.certifysphere.com/)** - Building the future of web development