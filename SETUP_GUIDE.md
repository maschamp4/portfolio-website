# Portfolio Website - Setup Guide

Complete installation and setup instructions for the Mascha Portfolio Website.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Development Server](#running-the-development-server)
4. [Building for Production](#building-for-production)
5. [Project Structure](#project-structure)
6. [Development Tips](#development-tips)
7. [Troubleshooting](#troubleshooting)
8. [Browser Compatibility](#browser-compatibility)
9. [Performance Optimization](#performance-optimization)

---

## Prerequisites

### Required Software

| Software | Minimum Version | Recommended | Purpose |
|----------|----------------|-------------|---------|
| **Node.js** | 18.x | 20.x or later | JavaScript runtime |
| **npm** | 9.x | 10.x or later | Package manager |
| **Git** | 2.x | Latest | Version control |
| **Modern Browser** | - | Chrome 90+, Firefox 88+, Edge 90+ | Development testing |

### Check Your Versions

```bash
# Check Node.js version
node --version
# Should output: v18.x.x or higher

# Check npm version
npm --version
# Should output: 9.x.x or higher

# Check Git version
git --version
# Should output: git version 2.x.x or higher
```

### Installing Prerequisites (if needed)

**Windows:**
1. Download Node.js from [nodejs.org](https://nodejs.org/)
2. Run the installer (includes npm)
3. Restart your terminal

**Verify Installation:**
```bash
node --version && npm --version
```

---

## Installation

### Step 1: Navigate to Project Directory

```bash
cd portfolio-website
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- **three** (^0.160.0) - 3D graphics library
- **gsap** (^3.12.0) - Animation library
- **lenis** (^1.0.0) - Smooth scroll library
- **vite** (^5.0.0) - Build tool (dev dependency)

**Expected Output:**
```
added 87 packages, and audited 88 packages in 15s
found 0 vulnerabilities
```

### Step 3: Verify Installation

Check that `node_modules` directory was created:

```bash
dir node_modules
# or on Linux/Mac: ls node_modules
```

You should see folders for: `three`, `gsap`, `lenis`, `vite`, etc.

---

## Running the Development Server

### Quick Start

```bash
npm run dev
```

**What happens:**
1. Vite starts the development server
2. Browser automatically opens to `http://localhost:3000`
3. Hot Module Replacement (HMR) is enabled
4. File changes trigger instant updates

**Expected Output:**
```
  VITE v5.0.0  ready in 523 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.1.x:3000/
  ➜  press h to show help
```

### Development Server Features

- **Hot Module Replacement (HMR)** - See changes instantly without page reload
- **Fast Refresh** - Preserves component state during updates
- **Error Overlay** - Compilation errors displayed in browser
- **Source Maps** - Easy debugging with original source code

### Accessing from Other Devices

The development server is accessible on your local network:

```
http://192.168.1.x:3000/  (from the terminal output)
```

Use this to test on mobile devices connected to the same WiFi.

---

## Building for Production

### Build the Project

```bash
npm run build
```

**What happens:**
1. Optimizes and minifies all code
2. Processes and compresses images
3. Generates production-ready bundle
4. Outputs to `dist/` directory

**Expected Output:**
```
vite v5.0.0 building for production...
✓ 127 modules transformed.
dist/index.html                   2.45 kB
dist/assets/index-a1b2c3d4.css   15.23 kB │ gzip: 4.12 kB
dist/assets/index-e5f6g7h8.js    89.45 kB │ gzip: 28.67 kB
✓ built in 3.42s
```

### Preview Production Build

Test the production build locally:

```bash
npm run preview
```

Opens `http://localhost:4173` with the production build.

### Build Output Structure

```
dist/
├── index.html              # Main HTML file
├── assets/
│   ├── index-*.css        # Minified stylesheets
│   ├── index-*.js         # Minified JavaScript bundles
│   ├── three-*.js         # Three.js chunk
│   ├── gsap-*.js          # GSAP chunk
│   └── lenis-*.js         # Lenis chunk
├── images/                # Optimized images
└── fonts/                 # Web fonts
```

---

## Project Structure

### Directory Overview

```
portfolio-website/
│
├── src/                          # Source files
│   ├── main.js                  # Application entry point
│   ├── components/              # UI components
│   │   ├── Header.js
│   │   ├── Hero.js
│   │   ├── Projects.js
│   │   ├── Experience.js
│   │   ├── Awards.js
│   │   └── Contact.js
│   │
│   ├── three/                   # Three.js scene
│   │   ├── MorphingShape.js
│   │   ├── ScrollController.js
│   │   └── shaders/
│   │       ├── morphing.vert.js
│   │       └── morphing.frag.js
│   │
│   ├── animations/              # Animation modules
│   │   ├── ScrollAnimations.js
│   │   └── MagneticEffect.js
│   │
│   ├── utils/                   # Utility functions
│   │   └── EventBus.js
│   │
│   ├── data/                    # Content data
│   │   └── content.js
│   │
│   └── styles/                  # CSS stylesheets
│       ├── reset.css
│       ├── variables.css
│       └── global.css
│
├── public/                      # Static assets
│   ├── images/
│   ├── fonts/
│   └── favicon/
│
├── index.html                   # Main HTML file
├── package.json                 # Project configuration
├── vite.config.js              # Vite configuration
├── SETUP_GUIDE.md              # This file
└── TESTING_CHECKLIST.md        # Testing checklist
```

### Key Files

| File | Purpose |
|------|---------|
| `src/main.js` | Application initialization and component orchestration |
| `vite.config.js` | Build configuration (port, chunks, optimization) |
| `package.json` | Dependencies and npm scripts |
| `index.html` | HTML structure and meta tags |

---

## Development Tips

### 1. Console Logging

The application logs initialization progress to the browser console:

```javascript
// Open browser DevTools (F12) and check Console
// You'll see:
Initializing Mascha Portfolio...
Content loaded: { projects: [...], experience: [...] }
Initializing components...
All components initialized successfully (6 components)
Initializing Three.js scene...
Three.js scene initialized successfully
...
```

### 2. File Watching

Vite automatically watches for file changes. Supported files:
- `.js` - JavaScript modules
- `.css` - Stylesheets
- `.html` - HTML files
- Images and fonts in `public/`

### 3. Module Import Syntax

Always use ES6 module syntax:

```javascript
// ✅ Correct
import Header from './components/Header.js';

// ❌ Incorrect (CommonJS)
const Header = require('./components/Header.js');
```

### 4. Path Aliases

No path aliases are configured. Always use relative paths:

```javascript
// ✅ Correct
import './styles/global.css';
import Header from './components/Header.js';

// ❌ Incorrect
import '@/styles/global.css';
```

### 5. Browser DevTools

Essential tools for development:

- **Console (F12)** - View logs and errors
- **Network Tab** - Check resource loading
- **Performance Tab** - Profile animations and 3D rendering
- **Elements Tab** - Inspect DOM and styles

### 6. Hot Module Replacement (HMR)

Most changes apply instantly without page reload:
- ✅ CSS changes - Instant update
- ✅ JavaScript logic - Instant update (preserves state)
- ⚠️ HTML changes - Full page reload
- ⚠️ Three.js scene changes - May require manual refresh

### 7. Code Formatting

Maintain consistent code style:
- Use 2 spaces for indentation
- Add semicolons at end of statements
- Use single quotes for strings
- Add comments for complex logic

---

## Troubleshooting

### Issue: `npm install` fails

**Error:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete `node_modules` and `package-lock.json`:
   ```bash
   rmdir /s node_modules
   del package-lock.json
   npm install
   ```

3. Try using `--legacy-peer-deps`:
   ```bash
   npm install --legacy-peer-deps
   ```

---

### Issue: Port 3000 already in use

**Error:**
```
Port 3000 is in use, trying another one...
```

**Solutions:**

1. **Use the automatically assigned port** (e.g., 3001)

2. **Kill the process using port 3000:**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <process_id> /F
   ```

3. **Change the port in `vite.config.js`:**
   ```javascript
   server: {
     port: 3001,  // Change to any available port
     open: true
   }
   ```

---

### Issue: Three.js scene not rendering

**Symptoms:**
- Black screen where 3D shape should be
- Console errors related to WebGL

**Solutions:**

1. **Check WebGL support:**
   - Visit: https://get.webgl.org/
   - Should see a spinning cube

2. **Update graphics drivers:**
   - NVIDIA: https://www.nvidia.com/download/index.aspx
   - AMD: https://www.amd.com/support
   - Intel: https://www.intel.com/content/www/us/en/download-center/home.html

3. **Check browser console for errors:**
   ```
   WebGL: CONTEXT_LOST_WEBGL
   ```
   - Try disabling hardware acceleration
   - Try a different browser

4. **Verify canvas element exists:**
   Open DevTools > Elements, search for `<canvas id="three-canvas">`

---

### Issue: Animations not working

**Symptoms:**
- Scroll animations don't trigger
- Hover effects inactive
- Elements don't fade in

**Solutions:**

1. **Check GSAP is loaded:**
   Open Console and type:
   ```javascript
   typeof gsap
   // Should output: "function"
   ```

2. **Check ScrollTrigger plugin:**
   ```javascript
   typeof ScrollTrigger
   // Should output: "function"
   ```

3. **Check for JavaScript errors:**
   - Open Console (F12)
   - Look for red error messages
   - Fix any syntax or reference errors

4. **Verify Lenis smooth scroll:**
   ```javascript
   console.log(window.lenis);
   // Should output: Lenis object
   ```

---

### Issue: Module not found errors

**Error:**
```
Failed to resolve import "./components/Header.js"
```

**Solutions:**

1. **Check file exists:**
   ```bash
   dir src\components\Header.js
   ```

2. **Check file extension:**
   - Must include `.js` extension
   - Case-sensitive on some systems

3. **Check relative path:**
   ```javascript
   // From src/main.js
   import Header from './components/Header.js';  // ✅ Correct
   
   // From src/animations/ScrollAnimations.js
   import eventBus from '../utils/EventBus.js';  // ✅ Correct
   ```

---

### Issue: Blank white page

**Symptoms:**
- Browser shows blank page
- No errors in console

**Solutions:**

1. **Check index.html loads:**
   - View page source (Ctrl+U)
   - Verify `<script type="module" src="/src/main.js">` present

2. **Check main.js executes:**
   - Open Console
   - Should see initialization logs

3. **Hard refresh the page:**
   ```
   Ctrl + Shift + R (Windows/Linux)
   Cmd + Shift + R (Mac)
   ```

4. **Clear browser cache:**
   - Chrome: Settings > Privacy > Clear browsing data
   - Check "Cached images and files"
   - Clear data

---

### Issue: Styles not applying

**Symptoms:**
- Page has no styling
- Layout is broken
- Colors are wrong

**Solutions:**

1. **Check CSS files are imported in main.js:**
   ```javascript
   import './styles/reset.css';
   import './styles/variables.css';
   import './styles/global.css';
   ```

2. **Check CSS files exist:**
   ```bash
   dir src\styles\*.css
   ```

3. **Check browser console for 404 errors:**
   - Network tab should show all CSS files loaded (200 status)

4. **Verify CSS custom properties:**
   - Open DevTools > Elements
   - Click on `<body>`
   - Check Computed styles for `--color-*` variables

---

### Issue: Content not loading

**Symptoms:**
- Sections are empty
- No projects/experience/awards shown

**Solutions:**

1. **Check content.js is imported:**
   ```javascript
   import { content } from './data/content.js';
   ```

2. **Check content.js exports correctly:**
   ```javascript
   export const content = {
     projects: [...],
     experience: [...]
   };
   ```

3. **Check browser console:**
   ```javascript
   Content loaded: { projects: Array(5), experience: Array(6) }
   ```

4. **Verify component initialization:**
   ```
   All components initialized successfully (6 components)
   ```

---

### Issue: Slow performance

**Symptoms:**
- Low FPS (< 30fps)
- Laggy scrolling
- Delayed interactions

**Solutions:**

1. **Check FPS counter:**
   - Open DevTools > Performance
   - Click Record, scroll the page
   - Check FPS graph

2. **Disable 3D effects temporarily:**
   ```javascript
   // In main.js, comment out:
   // await initThreeScene();
   ```

3. **Reduce Three.js complexity:**
   ```javascript
   // In MorphingShape.js
   const geometry = new THREE.IcosahedronGeometry(1, 1);  // Lower detail
   ```

4. **Check other programs:**
   - Close unnecessary browser tabs
   - Close resource-intensive applications

5. **Use a more capable device:**
   - Minimum: Integrated graphics
   - Recommended: Dedicated GPU

---

## Browser Compatibility

### Supported Browsers

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| **Chrome** | 90+ | ✅ Full support, best performance |
| **Firefox** | 88+ | ✅ Full support |
| **Edge** | 90+ | ✅ Full support (Chromium-based) |
| **Safari** | 14+ | ✅ Full support on macOS/iOS |
| **Opera** | 76+ | ✅ Full support |

### Required Browser Features

- ✅ ES6+ JavaScript support
- ✅ CSS Grid and Flexbox
- ✅ CSS Custom Properties (variables)
- ✅ WebGL 1.0 (for Three.js)
- ✅ IntersectionObserver API
- ✅ ResizeObserver API
- ✅ ES6 Modules

### Testing Browsers

```bash
# Check current browser
# Open DevTools > Console and run:
console.log(navigator.userAgent);
```

### Browser-Specific Issues

**Safari:**
- May require `-webkit-` prefixes for some animations
- Smooth scrolling behavior slightly different

**Firefox:**
- Slightly lower 3D performance vs Chrome
- Different font rendering

**Mobile Browsers:**
- Simplified 3D scene for performance
- Touch-optimized interactions
- Hamburger menu on mobile

---

## Performance Optimization

### Development Mode

Development builds are **not optimized**:
- Unminified code
- Source maps included
- No code splitting
- Hot Module Replacement overhead

**Expected performance:**
- Initial load: 2-4 seconds
- Bundle size: ~500KB unminified

### Production Mode

Production builds are **fully optimized**:
- Minified code
- Tree-shaking (removes unused code)
- Code splitting (separate chunks)
- Compressed assets

**Expected performance:**
- Initial load: < 1 second
- Bundle size: ~100KB gzipped

### Build Optimization Checklist

- [x] Code splitting (three, gsap, lenis as separate chunks)
- [x] Minification (Terser)
- [x] Tree-shaking (removes unused exports)
- [ ] Image optimization (use WebP format)
- [ ] Lazy loading images
- [ ] Preload critical fonts
- [ ] CDN hosting for assets

### Performance Metrics to Monitor

**Lighthouse Scores (Target):**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

**Core Web Vitals (Target):**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

**Custom Metrics:**
- Three.js FPS: 60fps (desktop), 30fps+ (mobile)
- Time to Interactive: < 3s
- Bundle Size: < 300KB gzipped

### Monitoring Performance

1. **Lighthouse Audit:**
   - Open DevTools > Lighthouse
   - Click "Generate report"
   - Review recommendations

2. **FPS Monitoring:**
   ```javascript
   // Add to main.js temporarily
   const stats = new Stats();
   document.body.appendChild(stats.dom);
   
   function animate() {
     stats.begin();
     // ... your render code
     stats.end();
   }
   ```

3. **Bundle Analysis:**
   ```bash
   npm run build
   # Check dist/assets/ folder sizes
   ```

---

## Next Steps

✅ Installation complete!

**Now you can:**

1. 📖 **Review [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)** - Testing guide
2. 🚀 **Start development server** - `npm run dev`
3. 🧪 **Test all features** - Follow testing checklist
4. 🎨 **Customize content** - Edit `src/data/content.js`
5. 🌍 **Deploy** - Build and upload to hosting

**Need help?**
- Check the [Troubleshooting](#troubleshooting) section above
- Review console logs for errors
- Test in different browsers

---

**Updated:** October 2024  
**Version:** 1.0.0  
**Maintainer:** Mascha Portfolio Development Team