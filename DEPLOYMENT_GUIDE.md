# Deployment Guide

Complete guide to deploying Mascha's portfolio website to production.

---

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Build Optimization](#build-optimization)
3. [Deployment Options](#deployment-options)
   - [Vercel (Recommended)](#option-1-vercel-recommended)
   - [Netlify](#option-2-netlify)
   - [GitHub Pages](#option-3-github-pages)
   - [Custom Hosting](#option-4-custom-hosting)
4. [Environment Variables](#environment-variables)
5. [Custom Domain Configuration](#custom-domain-configuration)
6. [SSL/HTTPS Setup](#sslhttps-setup)
7. [Performance Optimization](#performance-optimization)
8. [Post-Deployment Checklist](#post-deployment-checklist)
9. [Monitoring & Maintenance](#monitoring--maintenance)
10. [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Before deploying, ensure you've completed these steps:

### Content & Assets

- [ ] All placeholder content replaced with real content (see [`CONTENT_UPDATE_GUIDE.md`](CONTENT_UPDATE_GUIDE.md))
- [ ] Project images optimized and placed in [`/public/images/projects/`](public/images/projects/)
- [ ] Profile/about images added to [`/public/images/profile/`](public/images/profile/)
- [ ] Award logos added to [`/public/images/awards/`](public/images/awards/)
- [ ] Favicon files generated and placed in [`/public/favicon/`](public/favicon/)
- [ ] OG image created and placed at [`/public/images/og-image.jpg`](public/images/og-image.jpg)
- [ ] All social media links updated in [`src/data/content.js`](src/data/content.js)

### Technical

- [ ] All features tested locally with `npm run dev`
- [ ] Production build tested with `npm run build && npm run preview`
- [ ] No console errors in browser DevTools
- [ ] Three.js scene renders correctly
- [ ] All animations working smoothly
- [ ] Forms submit correctly (or connected to form service)
- [ ] Responsive design tested on mobile, tablet, desktop
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

### SEO & Meta

- [ ] Page title updated in [`index.html`](index.html:9)
- [ ] Meta description accurate and compelling
- [ ] Keywords relevant and updated
- [ ] Open Graph tags configured
- [ ] Twitter Card tags configured
- [ ] Structured data added (optional but recommended)

### Performance

- [ ] Lighthouse audit run (target: >90 across all metrics)
- [ ] Images compressed and optimized
- [ ] Lazy loading implemented for images
- [ ] Core Web Vitals acceptable (LCP <2.5s, FID <100ms, CLS <0.1)

---

## Build Optimization

### 1. Image Optimization

Before deploying, optimize all images:

```bash
# Install image optimization tool (if not already)
npm install -g sharp-cli

# Optimize project images
npx sharp -i public/images/projects/ -o public/images/projects/ -f webp -q 80

# Optimize other images
npx sharp -i public/images/ -o public/images/ -f webp -q 85
```

**Manual alternatives:**
- Use [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
- Target file sizes: Hero images <500KB, thumbnails <200KB

### 2. Production Build

Create an optimized production build:

```bash
# Clean previous builds
rm -rf dist

# Build for production
npm run build
```

This creates a [`dist/`](dist/) folder with:
- Minified JavaScript (<300KB total)
- Optimized CSS
- Code-split chunks for better caching
- Source maps (for debugging)

### 3. Test Production Build

Always test the production build locally before deploying:

```bash
# Preview the production build
npm run preview
```

Visit `http://localhost:4173` and verify:
- All pages load correctly
- No console errors
- Assets load properly
- Animations work smoothly
- Three.js scene renders

---

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel:**
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Excellent performance
- GitHub integration
- Free for personal projects

#### Method A: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project directory:**
   ```bash
   cd portfolio-website
   vercel
   ```

4. **Follow prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? `mascha-portfolio` (or your choice)
   - Directory? `./`
   - Override settings? **N**

5. **Deploy to production:**
   ```bash
   vercel --prod
   ```

Your site is now live at: `https://mascha-portfolio.vercel.app`

#### Method B: Deploy via Vercel Website

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"

3. **Configuration (auto-detected):**
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Deployment:** Vercel builds and deploys automatically. Each push to `main` triggers a new deployment.

#### Vercel Project Settings

Optional configuration in Vercel dashboard:

- **Domain:** Add custom domain (see [Custom Domain Configuration](#custom-domain-configuration))
- **Analytics:** Enable Vercel Analytics for performance insights
- **Environment Variables:** None needed for this project
- **Build Settings:** Default Vite settings work perfectly

---

### Option 2: Netlify

**Why Netlify:**
- Simple drag-and-drop deployment
- Continuous deployment from Git
- Form handling built-in
- Free SSL
- Global CDN

#### Method A: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login:**
   ```bash
   netlify login
   ```

3. **Initialize and deploy:**
   ```bash
   cd portfolio-website
   netlify init
   ```

4. **Follow prompts:**
   - Create & configure a new site
   - Team: Select your team
   - Site name: `mascha-portfolio`
   - Build command: `npm run build`
   - Directory: `dist`

5. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

#### Method B: Deploy via Netlify Website

1. **Push to GitHub** (same as Vercel method)

2. **Import on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to Git provider and select repository
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click "Deploy site"

#### Method C: Drag & Drop (Quick Test)

For quick testing without Git:

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Go to Netlify:**
   - Visit [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag and drop the `dist` folder
   - Get instant deployment URL

**Note:** This method doesn't enable continuous deployment.

#### Netlify Configuration File

Create [`netlify.toml`](netlify.toml) in project root for advanced settings:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

### Option 3: GitHub Pages

**Why GitHub Pages:**
- Free hosting
- Simple setup
- Good for open-source portfolios
- Directly from GitHub repository

#### Setup Steps

1. **Install gh-pages package:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update [`package.json`](package.json):**
   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview",
       "deploy": "npm run build && gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/portfolio-website"
   }
   ```

3. **Update [`vite.config.js`](vite.config.js:1) for GitHub Pages:**
   ```javascript
   import { defineConfig } from 'vite';

   export default defineConfig({
     base: '/portfolio-website/', // Your repo name
     root: '.',
     publicDir: 'public',
     build: {
       outDir: 'dist',
       assetsDir: 'assets',
       sourcemap: false,
       minify: 'terser'
     }
   });
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to repository → Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` → `/ (root)`
   - Save

Your site will be live at: `https://yourusername.github.io/portfolio-website`

#### Custom Domain with GitHub Pages

1. Add `CNAME` file to `public/` directory with your domain:
   ```
   mascha.art
   ```

2. Configure DNS (see [Custom Domain Configuration](#custom-domain-configuration))

3. In GitHub repository Settings → Pages:
   - Custom domain: `mascha.art`
   - Enforce HTTPS: ✓

---

### Option 4: Custom Hosting

For traditional web hosting (cPanel, FTP, VPS):

#### Build and Upload

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder contents** to your web server:
   - Via FTP: Use FileZilla or Cyberduck
   - Via SSH: Use `rsync` or `scp`
   - Via cPanel: File Manager

#### SSH/SCP Example

```bash
# Build locally
npm run build

# Upload to server
scp -r dist/* user@yourserver.com:/var/www/html/
```

#### Rsync Example (Efficient Updates)

```bash
rsync -avz --delete dist/ user@yourserver.com:/var/www/html/
```

#### Server Configuration

**Apache (.htaccess):**

Create `.htaccess` in web root:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

**Nginx:**

Add to nginx configuration:

```nginx
server {
    listen 80;
    server_name mascha.art;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|webp|svg|ico|css|js|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

---

## Environment Variables

This project **doesn't require environment variables** for basic deployment. However, if you add features that need them:

### Adding Environment Variables

**For Vercel:**
- Dashboard → Project → Settings → Environment Variables
- Add variables for Production, Preview, and Development

**For Netlify:**
- Dashboard → Site settings → Build & deploy → Environment
- Add variables

**For local development:**

Create `.env` file (already in [`.gitignore`](.gitignore)):

```env
# Example environment variables (if needed in future)
VITE_API_KEY=your_api_key_here
VITE_FORM_ENDPOINT=your_form_endpoint
```

Access in code:
```javascript
const apiKey = import.meta.env.VITE_API_KEY;
```

**Note:** All env variables must be prefixed with `VITE_` to be accessible in the browser.

---

## Custom Domain Configuration

### Step 1: Purchase Domain

Recommended registrars:
- [Namecheap](https://www.namecheap.com)
- [Google Domains](https://domains.google)
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)

### Step 2: DNS Configuration

#### For Vercel

1. **Add domain in Vercel:**
   - Project → Settings → Domains
   - Add `mascha.art` and `www.mascha.art`

2. **Update DNS records at your registrar:**
   ```
   Type    Name    Value
   A       @       76.76.21.21
   CNAME   www     cname.vercel-dns.com
   ```

3. **Wait for DNS propagation** (5 minutes to 48 hours)

#### For Netlify

1. **Add domain in Netlify:**
   - Site settings → Domain management → Add custom domain

2. **Update DNS records:**
   ```
   Type    Name    Value
   A       @       75.2.60.5
   CNAME   www     your-site.netlify.app
   ```

#### For GitHub Pages

1. **Update DNS records:**
   ```
   Type    Name    Value
   A       @       185.199.108.153
   A       @       185.199.109.153
   A       @       185.199.110.153
   A       @       185.199.111.153
   CNAME   www     yourusername.github.io
   ```

2. **Add CNAME file** to `public/` (contains your domain name)

### Step 3: Verify Domain

- Use [WhatsMyDNS.net](https://whatsmydns.net) to check DNS propagation
- Can take up to 48 hours, usually 1-4 hours

---

## SSL/HTTPS Setup

### Automatic SSL (Recommended)

**Vercel:** SSL certificates automatically provisioned and renewed. Nothing to do!

**Netlify:** Free SSL via Let's Encrypt, automatically enabled. Just:
- Site settings → Domain management → HTTPS
- Click "Verify DNS configuration"
- Certificate provisions automatically

**GitHub Pages:** Automatically enabled when using custom domain:
- Settings → Pages → Enforce HTTPS ✓

### Manual SSL (Custom Hosting)

**Using Let's Encrypt with Certbot:**

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# For Nginx
sudo certbot --nginx -d mascha.art -d www.mascha.art

# For Apache
sudo certbot --apache -d mascha.art -d www.mascha.art

# Auto-renewal (test)
sudo certbot renew --dry-run
```

**Using Cloudflare (Easiest for custom hosting):**
1. Point your domain nameservers to Cloudflare
2. Enable "Full (strict)" SSL mode
3. Free SSL certificate automatically applied

---

## Performance Optimization

### 1. Lighthouse Audit

Run before deploying:

```bash
# Build for production
npm run build
npm run preview

# In Chrome DevTools
# 1. Open DevTools (F12)
# 2. Go to Lighthouse tab
# 3. Select "Performance", "Accessibility", "Best Practices", "SEO"
# 4. Click "Analyze page load"
```

**Target Scores:**
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >90

### 2. Core Web Vitals

Monitor after deployment:
- **LCP (Largest Contentful Paint):** <2.5s
- **FID (First Input Delay):** <100ms
- **CLS (Cumulative Layout Shift):** <0.1

### 3. Image Optimization Checklist

- [ ] Convert images to WebP format
- [ ] Implement lazy loading (`loading="lazy"`)
- [ ] Use appropriate image sizes (no oversized images)
- [ ] Compress images (80-85% quality)
- [ ] Add width/height attributes to prevent CLS

### 4. JavaScript Optimization

Already configured in [`vite.config.js`](vite.config.js:1):
- ✓ Code splitting (three, gsap, lenis in separate chunks)
- ✓ Minification (Terser)
- ✓ Tree shaking (unused code removed)

### 5. Caching Strategy

Set up in hosting platform or via headers:

**Vercel (`vercel.json`):**
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**Netlify:** Already configured in [`netlify.toml`](#netlify-configuration-file) above

---

## Post-Deployment Checklist

After deployment, verify everything works:

### Functionality Tests

- [ ] Visit all sections (Hero, Projects, Experience, Awards, Contact)
- [ ] Test navigation (header links, smooth scroll)
- [ ] Three.js scene loads and animates correctly
- [ ] Scroll animations trigger properly
- [ ] Contact form validates (test with invalid data)
- [ ] Social media links open correctly
- [ ] Mobile menu works on small screens

### Technical Checks

- [ ] HTTPS working (padlock in browser)
- [ ] Custom domain resolving correctly
- [ ] Favicon displays properly
- [ ] No console errors
- [ ] No 404 errors for assets
- [ ] All images loading
- [ ] Fonts loading correctly

### SEO Verification

- [ ] Open Graph preview looks good (use [OpenGraph.xyz](https://www.opengraph.xyz/))
- [ ] Twitter Card preview correct
- [ ] Google Search Console submitted
- [ ] Sitemap submitted (optional: create with [XML-Sitemaps.com](https://www.xml-sitemaps.com/))

### Performance Testing

- [ ] Lighthouse audit >90 on all metrics
- [ ] Page loads in <3 seconds on 3G
- [ ] Three.js maintains 60fps on desktop
- [ ] Mobile performance acceptable (>50 score)

### Cross-Browser Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Device Testing

- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

---

## Monitoring & Maintenance

### Analytics Setup

**Google Analytics 4:**

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to [`index.html`](index.html:1) before closing `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Vercel Analytics (Recommended for Vercel hosting):**
- Enable in Vercel dashboard
- Provides Core Web Vitals tracking
- No code changes needed

### Uptime Monitoring

Free monitoring services:
- [UptimeRobot](https://uptimerobot.com) - Free for 50 monitors
- [Freshping](https://www.freshworks.com/website-monitoring/) - Free unlimited checks
- [StatusCake](https://www.statuscake.com) - Free tier available

### Error Tracking

Consider adding error tracking (optional):
- [Sentry](https://sentry.io) - Real-time error tracking
- [LogRocket](https://logrocket.com) - Session replay

### Regular Maintenance

**Monthly:**
- [ ] Check uptime/downtime
- [ ] Review analytics (traffic, popular pages)
- [ ] Check for broken links
- [ ] Monitor Core Web Vitals

**Quarterly:**
- [ ] Update dependencies (`npm update`)
- [ ] Run security audit (`npm audit`)
- [ ] Review and update content
- [ ] Check Lighthouse scores

**Annually:**
- [ ] Renew domain
- [ ] Review and refresh portfolio projects
- [ ] Update copyright year
- [ ] Major dependency updates

---

## Troubleshooting

### Build Fails

**Issue:** `npm run build` fails with errors

**Solutions:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node version (need 18+)
node --version

# Ensure all files are saved
```

### Three.js Scene Not Rendering

**Issue:** Black screen or no 3D shape visible

**Possible causes:**
- WebGL not supported (check at [get.webgl.org](https://get.webgl.org/))
- Asset paths incorrect (check console for 404s)
- GPU acceleration disabled

**Solutions:**
- Enable hardware acceleration in browser settings
- Update graphics drivers
- Test in different browser

### Images Not Loading

**Issue:** 404 errors for images

**Solution:**
- Ensure images in `public/` directory (not `src/`)
- Check paths: `/images/...` not `./images/...`
- Verify file names match exactly (case-sensitive)

### Custom Domain Not Working

**Issue:** Domain doesn't resolve after DNS setup

**Solutions:**
- Wait 24-48 hours for DNS propagation
- Clear browser DNS cache: `chrome://net-internals/#dns`
- Verify DNS records with [DNS Checker](https://dnschecker.org)
- Check nameservers at registrar

### SSL Certificate Error

**Issue:** "Not Secure" warning or certificate errors

**Solutions:**
- Wait for certificate provisioning (5-10 minutes on Vercel/Netlify)
- Verify DNS correctly pointing to hosting provider
- Check "Force HTTPS" enabled in hosting dashboard
- Clear browser cache

### Poor Performance

**Issue:** Lighthouse score <90 or slow loading

**Solutions:**
- Optimize images (compress, use WebP)
- Check network throttling in DevTools
- Reduce Three.js complexity on mobile
- Enable browser caching headers
- Use CDN for assets

### Contact Form Not Working

**Issue:** Form submits but doesn't send email

**Note:** This project uses client-side form validation only. To actually send emails, you need to:

1. **Use form service (recommended):**
   - [Formspree](https://formspree.io)
   - [Netlify Forms](https://www.netlify.com/products/forms/)
   - [Web3Forms](https://web3forms.com)

2. **Update form action in [`index.html`](index.html:225):**
   ```html
   <form action="https://formspree.io/f/your-form-id" method="POST">
   ```

### Animations Choppy

**Issue:** Animations not smooth, stuttering

**Solutions:**
- Check browser performance in DevTools
- Reduce Three.js scene complexity
- Disable animations on slower devices:
  ```javascript
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Disable animations
  }
  ```

---

## Quick Reference

### Essential Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build           # Build for production
npm run preview         # Preview production build

# Deployment
vercel --prod           # Deploy to Vercel
netlify deploy --prod   # Deploy to Netlify
npm run deploy          # Deploy to GitHub Pages (if configured)

# Maintenance
npm update              # Update dependencies
npm audit               # Check for vulnerabilities
npm audit fix           # Fix vulnerabilities
```

### Important Files

| File | Purpose |
|------|---------|
| [`vite.config.js`](vite.config.js:1) | Build configuration |
| [`package.json`](package.json:1) | Dependencies and scripts |
| [`index.html`](index.html:1) | Main HTML file |
| [`src/data/content.js`](src/data/content.js:1) | All website content |
| `.env` | Environment variables (not committed) |

### Support Resources

- **Vite Docs:** [vitejs.dev](https://vitejs.dev)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **GitHub Pages:** [pages.github.com](https://pages.github.com)

---

## Success! 🎉

Your portfolio is now live and accessible to the world. Don't forget to:

1. Share your new website on social media
2. Update your LinkedIn profile with the URL
3. Add to your email signature
4. Submit to portfolio directories (Awwwards, Behance, etc.)
5. Monitor analytics and iterate based on user behavior

For content updates, see [`CONTENT_UPDATE_GUIDE.md`](CONTENT_UPDATE_GUIDE.md).

---

**Last Updated:** October 2024  
**Maintained by:** Mascha Portfolio Development Team