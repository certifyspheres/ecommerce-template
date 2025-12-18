# Theme Configuration Guide

## Overview

StyleHub includes a powerful theming system with 5 built-in color themes and light/dark mode support. All themes are managed through CSS variables and JavaScript.

## Built-in Themes

### Color Themes

1. **Blue (Default)** - `data-theme="blue"`
   - Primary: `#3b82f6`
   - Professional and trustworthy

2. **Purple** - `data-theme="purple"`
   - Primary: `#8b5cf6`
   - Creative and modern

3. **Green** - `data-theme="green"`
   - Primary: `#10b981`
   - Natural and eco-friendly

4. **Orange** - `data-theme="orange"`
   - Primary: `#f59e0b`
   - Energetic and vibrant

5. **Pink** - `data-theme="pink"`
   - Primary: `#ec4899`
   - Playful and feminine

### Mode Themes

- **Light Mode** - `data-mode="light"` (default)
- **Dark Mode** - `data-mode="dark"`

## Theme System Architecture

### CSS Variables Structure

```css
:root {
  /* Color Theme Variables */
  --primary-color: #3b82f6;
  --primary-dark: #2563eb;
  --primary-light: #93c5fd;
  --primary-gradient: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  
  /* Light Mode Variables */
  --bg-color: #ffffff;
  --surface-color: #f8fafc;
  --card-color: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --border-color: #e2e8f0;
  --shadow: rgba(0, 0, 0, 0.08);
  
  /* Common Variables */
  --border-radius: 12px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --max-width: 1200px;
}

/* Dark Mode Override */
[data-mode="dark"] {
  --bg-color: #0f172a;
  --surface-color: #1e293b;
  --card-color: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --border-color: #334155;
  --shadow: rgba(0, 0, 0, 0.3);
}

/* Color Theme Overrides */
[data-theme="purple"] {
  --primary-color: #8b5cf6;
  --primary-dark: #7c3aed;
  --primary-light: #c4b5fd;
  --primary-gradient: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}
```

## Creating Custom Themes

### 1. Adding a New Color Theme

**Step 1: Define CSS Variables**

```css
[data-theme="custom"] {
  --primary-color: #your-primary-color;
  --primary-dark: #your-darker-shade;
  --primary-light: #your-lighter-shade;
  --primary-gradient: linear-gradient(135deg, #your-primary-color 0%, #your-darker-shade 100%);
}
```

**Step 2: Add Theme Button**

```html
<!-- In theme selector -->
<div class="color-themes">
  <!-- Existing themes -->
  <button class="color-theme" data-theme="custom" style="background: #your-primary-color;"></button>
</div>
```

**Step 3: Update JavaScript (Optional)**

The theme system automatically handles new themes, but you can add custom logic:

```javascript
// In script.js - ThemeManager class
setColorTheme(theme) {
  this.currentTheme = theme;
  localStorage.setItem('color-theme', theme);
  this.applyTheme();
  this.updateActiveButtons();
  
  // Custom logic for specific themes
  if (theme === 'custom') {
    // Add custom behavior
  }
}
```

### 2. Creating Brand-Specific Themes

**Example: Corporate Theme**

```css
[data-theme="corporate"] {
  --primary-color: #1f2937;
  --primary-dark: #111827;
  --primary-light: #6b7280;
  --primary-gradient: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  
  /* Override other variables if needed */
  --border-radius: 4px; /* Less rounded for corporate look */
}
```

**Example: Eco-Friendly Theme**

```css
[data-theme="eco"] {
  --primary-color: #059669;
  --primary-dark: #047857;
  --primary-light: #6ee7b7;
  --primary-gradient: linear-gradient(135deg, #059669 0%, #047857 100%);
  
  /* Earth tone accents */
  --success-color: #10b981;
  --warning-color: #d97706;
}
```

## Advanced Theme Customization

### 1. Component-Specific Theming

Target specific components with theme variations:

```css
/* Button variations per theme */
[data-theme="luxury"] .cta-btn {
  background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
}

[data-theme="luxury"] .product-card:hover {
  box-shadow: 0 20px 60px rgba(212, 175, 55, 0.2);
}
```

### 2. Seasonal Themes

Create themes that change based on seasons or events:

```css
[data-theme="winter"] {
  --primary-color: #3b82f6;
  --bg-color: #f8fafc;
  /* Add winter-specific styling */
}

[data-theme="summer"] {
  --primary-color: #f59e0b;
  --bg-color: #fffbeb;
  /* Add summer-specific styling */
}
```

### 3. Accessibility-Focused Themes

```css
[data-theme="high-contrast"] {
  --primary-color: #000000;
  --bg-color: #ffffff;
  --text-primary: #000000;
  --border-color: #000000;
  /* High contrast for accessibility */
}
```

## Theme Persistence

### Local Storage Implementation

The theme system automatically saves user preferences:

```javascript
// Saving theme preference
localStorage.setItem('color-theme', 'purple');
localStorage.setItem('theme-mode', 'dark');

// Loading saved preference
const savedTheme = localStorage.getItem('color-theme') || 'blue';
const savedMode = localStorage.getItem('theme-mode') || 'light';
```

### Server-Side Persistence (Advanced)

For user accounts, save theme preferences to database:

```javascript
// Example API call to save theme
async function saveThemePreference(userId, theme, mode) {
  await fetch('/api/user/theme', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, theme, mode })
  });
}
```

## Theme Switching Animation

### Smooth Transitions

Add smooth transitions between themes:

```css
* {
  transition: background-color 0.3s ease, 
              color 0.3s ease, 
              border-color 0.3s ease,
              box-shadow 0.3s ease;
}

/* Disable transitions during theme switch to prevent flashing */
.theme-switching * {
  transition: none !important;
}
```

### JavaScript Implementation

```javascript
applyTheme() {
  // Add class to prevent transition flashing
  document.body.classList.add('theme-switching');
  
  // Apply theme
  document.documentElement.setAttribute('data-mode', this.currentMode);
  document.documentElement.setAttribute('data-theme', this.currentTheme);
  
  // Remove class after a brief delay
  setTimeout(() => {
    document.body.classList.remove('theme-switching');
  }, 50);
}
```

## Theme Testing

### Browser Testing Checklist

- [ ] All color themes display correctly
- [ ] Light/dark mode switches properly
- [ ] Theme persistence works after page reload
- [ ] No color contrast accessibility issues
- [ ] Smooth transitions between themes
- [ ] Mobile theme selector works
- [ ] All interactive elements maintain visibility

### Automated Testing

```javascript
// Example theme testing function
function testAllThemes() {
  const themes = ['blue', 'purple', 'green', 'orange', 'pink'];
  const modes = ['light', 'dark'];
  
  themes.forEach(theme => {
    modes.forEach(mode => {
      // Apply theme
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-mode', mode);
      
      // Test visibility and contrast
      console.log(`Testing ${theme} theme in ${mode} mode`);
      // Add your testing logic here
    });
  });
}
```

## Performance Considerations

### CSS Optimization

```css
/* Use CSS containment for better performance */
.theme-selector {
  contain: layout style paint;
}

/* Optimize transitions */
.product-card {
  will-change: transform, box-shadow;
}
```

### JavaScript Optimization

```javascript
// Debounce theme changes
const debouncedThemeChange = debounce((theme) => {
  this.setColorTheme(theme);
}, 100);
```

## Troubleshooting

### Common Issues

**Theme not applying:**
- Check CSS variable names match exactly
- Verify data attributes are set correctly
- Ensure CSS specificity is sufficient

**Flashing during theme switch:**
- Add transition disable class during switch
- Use CSS containment
- Optimize transition properties

**Performance issues:**
- Limit transition properties
- Use `will-change` sparingly
- Debounce rapid theme changes

## Best Practices

1. **Consistent Naming**: Use consistent variable naming conventions
2. **Accessibility**: Ensure sufficient color contrast in all themes
3. **Performance**: Optimize transitions and animations
4. **Testing**: Test all theme combinations thoroughly
5. **Documentation**: Document custom themes for team members
6. **Fallbacks**: Provide fallback colors for unsupported browsers

## Examples and Resources

### Color Palette Tools
- [Coolors.co](https://coolors.co/) - Color palette generator
- [Adobe Color](https://color.adobe.com/) - Professional color tools
- [Material Design Colors](https://material.io/design/color/) - Google's color system

### Accessibility Tools
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)

### CSS Variable Resources
- [MDN CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [CSS Variables Guide](https://css-tricks.com/a-complete-guide-to-custom-properties/)