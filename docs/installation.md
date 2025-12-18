# Installation Guide

## Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS, and JavaScript

## Installation Methods

### Method 1: Direct Download

1. **Download the template**
   ```bash
   git clone git@github.com:certifyspheres/ecommerce-template.git
   cd ecommerce-template
   ```

2. **Open in browser**
   - Navigate to the project folder
   - Double-click `index.html` or open it in your browser

### Method 2: Local Development Server

For better development experience, use a local server:

#### Using Python (if installed)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js (if installed)
```bash
# Install a simple server
npm install -g http-server

# Run the server
http-server
```

#### Using VS Code Live Server Extension
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## File Structure

```
ecommerce-template/
├── index.html              # Homepage
├── products.html           # Products listing page
├── categories.html         # Categories page
├── about.html             # About us page
├── cart.html              # Shopping cart
├── checkout.html          # Checkout process
├── login.html             # Login page
├── signup.html            # Registration page
├── styles.css             # Main stylesheet
├── script.js              # Main JavaScript
├── auth.js                # Authentication logic
├── cart.js                # Cart functionality
├── checkout.js            # Checkout process
├── products.js            # Products page logic
├── README.md              # Project documentation
├── LICENSE-OPEN-SOURCE    # Open source license
├── LICENSE-COMMERCIAL     # Commercial license
└── docs/                  # Documentation folder
    ├── installation.md
    ├── customization.md
    ├── themes.md
    ├── components.md
    └── deployment.md
```

## Verification

After installation, verify everything works:

1. **Open the homepage** (`index.html`)
2. **Test navigation** - Click through all menu items
3. **Check responsiveness** - Resize browser window
4. **Test theme switching** - Use the theme selector in top-right
5. **Verify all pages load** - Navigate to products, cart, login, etc.

## Next Steps

- [Customize the template](./customization.md)
- [Configure themes](./themes.md)
- [Learn about components](./components.md)
- [Deploy your site](./deployment.md)

## Troubleshooting

### Common Issues

**Images not loading:**
- Ensure you have internet connection (images are loaded from Unsplash)
- Check browser console for any errors

**Styles not applying:**
- Verify `styles.css` is in the same directory as HTML files
- Check for any CSS syntax errors in browser console

**JavaScript not working:**
- Ensure all `.js` files are in the correct location
- Check browser console for JavaScript errors
- Verify script tags in HTML files are correct

**Theme switching not working:**
- Check that `script.js` is loaded properly
- Verify localStorage is enabled in your browser

### Getting Help

- **Open Source**: [GitHub Issues](https://github.com/certifyspheres/ecommerce-template/issues)
- **Commercial License**: [support@certifysphere.com](mailto:support@certifysphere.com)
- **Documentation**: Check other files in the `docs/` folder