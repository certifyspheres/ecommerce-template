# Deployment Guide

## Overview

This guide covers various deployment options for the StyleHub ecommerce template, from simple static hosting to advanced cloud deployments.

## Quick Deployment Options

### 1. Static File Hosting

#### Netlify (Recommended for beginners)

1. **Prepare your files**
   ```bash
   # Ensure all files are in root directory
   ls -la
   # Should show: index.html, styles.css, script.js, etc.
   ```

2. **Deploy via Netlify Drop**
   - Visit [netlify.com](https://netlify.com)
   - Drag and drop your project folder to the deploy area
   - Get instant live URL

3. **Deploy via Git (Recommended)**
   ```bash
   # Connect your GitHub repo
   # Netlify will auto-deploy on git push
   ```

4. **Custom Domain Setup**
   - Go to Domain settings in Netlify
   - Add your custom domain
   - Configure DNS records

#### Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd your-project-folder
   vercel
   # Follow the prompts
   ```

3. **Custom Domain**
   ```bash
   vercel --prod
   vercel domains add yourdomain.com
   ```

#### GitHub Pages

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to Pages section
   - Select source: Deploy from branch
   - Choose main branch
   - Save

3. **Access your site**
   - URL: `https://yourusername.github.io/your-repo`

### 2. Traditional Web Hosting

#### cPanel/Shared Hosting

1. **Prepare files**
   ```bash
   # Create a zip file of your project
   zip -r stylehub-template.zip .
   ```

2. **Upload via File Manager**
   - Login to cPanel
   - Open File Manager
   - Navigate to public_html
   - Upload and extract zip file

3. **Set permissions**
   ```bash
   # Set proper file permissions
   chmod 644 *.html *.css *.js
   chmod 755 images/
   ```

#### FTP Upload

```bash
# Using FileZilla or command line FTP
ftp your-server.com
# Enter credentials
# Navigate to public_html
# Upload all files
```

## Advanced Deployment

### 1. Docker Deployment

**Create Dockerfile**
```dockerfile
FROM nginx:alpine

# Copy static files
COPY . /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Create nginx.conf**
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    server {
        listen 80;
        server_name localhost;
        
        location / {
            root /usr/share/nginx/html;
            index index.html;
            try_files $uri $uri/ /index.html;
        }
        
        # Cache static assets
        location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

**Build and run**
```bash
# Build Docker image
docker build -t stylehub-template .

# Run container
docker run -p 8080:80 stylehub-template
```

### 2. AWS S3 + CloudFront

**S3 Setup**
```bash
# Install AWS CLI
aws configure

# Create S3 bucket
aws s3 mb s3://your-stylehub-site

# Upload files
aws s3 sync . s3://your-stylehub-site --exclude ".git/*"

# Enable static website hosting
aws s3 website s3://your-stylehub-site --index-document index.html
```

**CloudFront Setup**
```bash
# Create CloudFront distribution
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

### 3. Google Cloud Platform

**App Engine Deployment**

Create `app.yaml`:
```yaml
runtime: python39

handlers:
- url: /
  static_files: index.html
  upload: index.html

- url: /(.*)
  static_files: \1
  upload: (.*)
```

Deploy:
```bash
gcloud app deploy
```

### 4. Azure Static Web Apps

```bash
# Install Azure CLI
az login

# Create resource group
az group create --name stylehub-rg --location eastus

# Deploy static web app
az staticwebapp create \
  --name stylehub-app \
  --resource-group stylehub-rg \
  --source https://github.com/yourusername/your-repo \
  --location eastus \
  --branch main \
  --app-location "/" \
  --output-location "/"
```

## Performance Optimization

### 1. Image Optimization

**WebP Conversion**
```bash
# Convert images to WebP
for file in *.jpg *.png; do
  cwebp "$file" -o "${file%.*}.webp"
done
```

**Responsive Images**
```html
<picture>
  <source srcset="image-800w.webp" media="(min-width: 800px)" type="image/webp">
  <source srcset="image-400w.webp" media="(min-width: 400px)" type="image/webp">
  <img src="image-400w.jpg" alt="Product" loading="lazy">
</picture>
```

### 2. CSS/JS Minification

**Using build tools**
```bash
# Install build tools
npm install -g clean-css-cli uglify-js

# Minify CSS
cleancss -o styles.min.css styles.css

# Minify JavaScript
uglifyjs script.js -o script.min.js
```

**Update HTML references**
```html
<link rel="stylesheet" href="styles.min.css">
<script src="script.min.js"></script>
```

### 3. Gzip Compression

**Nginx configuration**
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types
  text/plain
  text/css
  text/xml
  text/javascript
  application/javascript
  application/xml+rss
  application/json;
```

**Apache .htaccess**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE application/xhtml+xml
  AddOutputFilterByType DEFLATE application/rss+xml
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

## Security Configuration

### 1. HTTPS Setup

**Let's Encrypt (Free SSL)**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### 2. Security Headers

**Nginx configuration**
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

**Apache .htaccess**
```apache
Header always set X-Frame-Options SAMEORIGIN
Header always set X-XSS-Protection "1; mode=block"
Header always set X-Content-Type-Options nosniff
Header always set Referrer-Policy "no-referrer-when-downgrade"
```

### 3. Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https://images.unsplash.com https://via.placeholder.com;
">
```

## Monitoring and Analytics

### 1. Google Analytics

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Performance Monitoring

**Web Vitals**
```javascript
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### 3. Error Tracking

**Sentry Integration**
```html
<script src="https://browser.sentry-cdn.com/7.0.0/bundle.min.js"></script>
<script>
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN'
  });
</script>
```

## SEO Optimization

### 1. Meta Tags

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>StyleHub - Premium Fashion Store</title>
  <meta name="description" content="Discover premium fashion at StyleHub. Modern clothing, accessories, and lifestyle products.">
  <meta name="keywords" content="fashion, clothing, ecommerce, style, premium">
  
  <!-- Open Graph -->
  <meta property="og:title" content="StyleHub - Premium Fashion Store">
  <meta property="og:description" content="Discover premium fashion at StyleHub">
  <meta property="og:image" content="https://yourdomain.com/og-image.jpg">
  <meta property="og:url" content="https://yourdomain.com">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="StyleHub - Premium Fashion Store">
  <meta name="twitter:description" content="Discover premium fashion at StyleHub">
  <meta name="twitter:image" content="https://yourdomain.com/twitter-image.jpg">
</head>
```

### 2. Structured Data

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "StyleHub",
  "url": "https://yourdomain.com",
  "description": "Premium fashion ecommerce store",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://yourdomain.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### 3. Sitemap Generation

Create `sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/products.html</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Add more URLs -->
</urlset>
```

## Backup and Maintenance

### 1. Automated Backups

```bash
#!/bin/bash
# backup-script.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/stylehub"
SOURCE_DIR="/var/www/html"

# Create backup
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" -C "$SOURCE_DIR" .

# Keep only last 30 backups
find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +30 -delete

echo "Backup completed: backup_$DATE.tar.gz"
```

### 2. Update Monitoring

```bash
# Check for broken links
wget --spider -r -nd -nv -H -l 1 -w 2 -o broken-links.log https://yourdomain.com

# Monitor uptime
curl -f https://yourdomain.com || echo "Site is down!"
```

## Troubleshooting

### Common Issues

**Files not loading:**
- Check file paths are correct
- Verify file permissions (644 for files, 755 for directories)
- Ensure MIME types are configured

**Slow loading:**
- Enable gzip compression
- Optimize images
- Use CDN for static assets
- Minify CSS/JS

**Mobile issues:**
- Test viewport meta tag
- Check responsive CSS
- Verify touch interactions

**SEO problems:**
- Validate HTML markup
- Check meta tags
- Ensure proper heading structure
- Test with Google Search Console

### Performance Testing

```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://yourdomain.com --output html --output-path report.html

# PageSpeed Insights API
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://yourdomain.com"
```

## Deployment Checklist

- [ ] All files uploaded correctly
- [ ] HTTPS enabled and working
- [ ] Custom domain configured
- [ ] Gzip compression enabled
- [ ] Security headers configured
- [ ] Analytics tracking installed
- [ ] SEO meta tags added
- [ ] Sitemap submitted to search engines
- [ ] Performance optimized (images, CSS, JS)
- [ ] Mobile responsiveness tested
- [ ] Cross-browser compatibility verified
- [ ] Backup system configured
- [ ] Monitoring and alerts set up

## Support Resources

- **Hosting Issues**: Contact your hosting provider
- **Template Issues**: [GitHub Issues](https://github.com/certifyspheres/ecommerce-template/issues)
- **Commercial Support**: [support@certifysphere.com](mailto:support@certifysphere.com)
- **Performance**: Use Google PageSpeed Insights
- **SEO**: Use Google Search Console