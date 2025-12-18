# Contributing Guidelines

## Welcome Contributors!

Thank you for your interest in contributing to the StyleHub ecommerce template! This document provides guidelines for contributing to the project.

## How to Contribute

### 1. Reporting Issues

**Before submitting an issue:**
- Search existing issues to avoid duplicates
- Check if the issue exists in the latest version
- Test in multiple browsers if it's a compatibility issue

**When creating an issue:**
- Use a clear, descriptive title
- Provide detailed steps to reproduce
- Include browser/OS information
- Add screenshots if applicable
- Specify if you're using open source or commercial license

**Issue Template:**
```
**Bug Description:**
Brief description of the issue

**Steps to Reproduce:**
1. Go to...
2. Click on...
3. See error...

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- Browser: Chrome 120.0
- OS: Windows 11
- License: Open Source/Commercial
- Template Version: 1.0.0

**Screenshots:**
[Attach screenshots if applicable]
```

### 2. Feature Requests

**Before requesting a feature:**
- Check if it already exists
- Consider if it fits the template's scope
- Think about backward compatibility

**Feature Request Template:**
```
**Feature Description:**
Clear description of the proposed feature

**Use Case:**
Why is this feature needed?

**Proposed Solution:**
How should this feature work?

**Alternatives Considered:**
Other ways to achieve the same goal

**Additional Context:**
Any other relevant information
```

### 3. Code Contributions

#### Getting Started

1. **Fork the repository**
   ```bash
   git clone git@github.com:certifyspheres/ecommerce-template.git
   cd ecommerce-template
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the coding standards below
   - Test your changes thoroughly
   - Update documentation if needed

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push and create pull request**
   ```bash
   git push origin feature/your-feature-name
   ```

#### Coding Standards

**HTML Guidelines:**
- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Maintain consistent indentation (2 spaces)
- Use descriptive class names
- Include alt text for images

```html
<!-- Good -->
<section class="products-section" aria-label="Featured Products">
  <h2 class="section-title">Featured Products</h2>
  <div class="product-grid">
    <article class="product-card">
      <img src="product.jpg" alt="Elegant Summer Dress" class="product-image">
    </article>
  </div>
</section>

<!-- Avoid -->
<div class="sec">
  <div class="title">Products</div>
  <div class="grid">
    <div class="card">
      <img src="product.jpg">
    </div>
  </div>
</div>
```

**CSS Guidelines:**
- Use CSS variables for theming
- Follow BEM methodology for class naming
- Mobile-first responsive design
- Consistent spacing using variables
- Group related properties

```css
/* Good */
.product-card {
  background: var(--card-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  transition: var(--transition);
}

.product-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

/* Avoid */
.card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.card img {
  width: 100%;
}
```

**JavaScript Guidelines:**
- Use ES6+ features
- Follow consistent naming conventions
- Add JSDoc comments for functions
- Handle errors gracefully
- Use async/await for promises

```javascript
// Good
class ProductManager {
  /**
   * Adds a product to the cart
   * @param {Object} product - Product object
   * @param {string} product.id - Product ID
   * @param {string} product.name - Product name
   * @param {number} product.price - Product price
   * @returns {Promise<boolean>} Success status
   */
  async addToCart(product) {
    try {
      const cartItem = this.createCartItem(product);
      await this.saveToStorage(cartItem);
      this.updateCartUI();
      return true;
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      this.showErrorMessage('Unable to add item to cart');
      return false;
    }
  }

  createCartItem(product) {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      addedAt: new Date().toISOString()
    };
  }
}

// Avoid
function addCart(prod) {
  cart.push(prod);
  updateUI();
}
```

#### Pull Request Guidelines

**Before submitting:**
- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Verify mobile responsiveness
- Check accessibility with screen readers
- Validate HTML and CSS
- Test with both light and dark themes

**Pull Request Template:**
```
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested on mobile devices
- [ ] Tested with screen reader
- [ ] Tested all themes

## Screenshots
[Add screenshots of changes]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### 4. Documentation Contributions

**Areas needing documentation:**
- Component usage examples
- Customization tutorials
- Deployment guides
- Troubleshooting tips
- Best practices

**Documentation Standards:**
- Use clear, concise language
- Include code examples
- Add screenshots where helpful
- Keep content up-to-date
- Follow markdown formatting

## Development Setup

### Prerequisites
- Modern web browser
- Text editor (VS Code recommended)
- Git
- Basic knowledge of HTML, CSS, JavaScript

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "ms-vscode.vscode-html-css-support",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "ritwickdey.liveserver"
  ]
}
```

### Local Development
```bash
# Clone repository
git clone git@github.com:certifyspheres/ecommerce-template.git
cd ecommerce-template

# Start local server (using VS Code Live Server or Python)
python -m http.server 8000
# OR
npx http-server

# Open browser
open http://localhost:8000
```

## Testing Guidelines

### Manual Testing Checklist

**Functionality:**
- [ ] All navigation links work
- [ ] Theme switching works
- [ ] Product interactions (add to cart, wishlist, share)
- [ ] Form validation
- [ ] Responsive design
- [ ] Cart functionality
- [ ] Checkout process

**Accessibility:**
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast ratios
- [ ] Focus indicators
- [ ] ARIA labels

**Performance:**
- [ ] Page load times
- [ ] Image optimization
- [ ] CSS/JS minification
- [ ] Mobile performance

**Browser Compatibility:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

### Automated Testing

**HTML Validation:**
```bash
# Using W3C validator
curl -H "Content-Type: text/html; charset=utf-8" \
     --data-binary @index.html \
     https://validator.w3.org/nu/?out=json
```

**CSS Validation:**
```bash
# Using W3C CSS validator
curl -F "file=@styles.css" \
     -F "output=json" \
     https://jigsaw.w3.org/css-validator/validator
```

**Accessibility Testing:**
```bash
# Using axe-core CLI
npm install -g @axe-core/cli
axe http://localhost:8000
```

## Release Process

### Version Numbers
- Follow semantic versioning (MAJOR.MINOR.PATCH)
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Version number bumped
- [ ] Changelog updated
- [ ] Release notes prepared
- [ ] Commercial license holders notified

## Community Guidelines

### Code of Conduct

**Our Pledge:**
We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

**Our Standards:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable Behavior:**
- Harassment of any kind
- Discriminatory language or actions
- Personal attacks
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

### Communication Channels

**GitHub Issues:**
- Bug reports
- Feature requests
- Technical discussions

**Email Support:**
- Commercial license: support@certifysphere.com
- General inquiries: info@certifysphere.com

**Response Times:**
- Open source issues: Best effort (usually within 1 week)
- Commercial support: Within 24-48 hours

## Recognition

### Contributors

We recognize all contributors in our README and release notes. Contributors include:
- Code contributors
- Documentation writers
- Bug reporters
- Feature requesters
- Community helpers

### Contribution Types

**Code Contributions:**
- New features
- Bug fixes
- Performance improvements
- Refactoring

**Non-Code Contributions:**
- Documentation improvements
- Design suggestions
- Testing and QA
- Community support
- Translations

## Getting Help

**For Contributors:**
- Check existing documentation
- Search closed issues for similar problems
- Ask questions in GitHub discussions
- Contact maintainers for guidance

**For Users:**
- Read the documentation first
- Check FAQ section
- Search existing issues
- Create new issue with proper template

## License Information

**Open Source Contributors:**
- Contributions are licensed under MIT with Attribution
- Must maintain CertifySphere attribution
- Can be used in commercial projects

**Commercial License:**
- Available for purchase at https://www.certifysphere.com/
- Removes attribution requirements
- Includes priority support

Thank you for contributing to StyleHub! Your efforts help make this template better for everyone. 🚀