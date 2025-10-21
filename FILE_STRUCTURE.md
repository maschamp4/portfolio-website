# Portfolio Website - File Structure

Complete directory and file architecture for the Mascha portfolio website.

---

## Root Directory Structure

```
portfolio-website/
│
├── src/                          # Source files
│   ├── js/                       # JavaScript modules
│   ├── css/                      # Stylesheets
│   ├── shaders/                  # GLSL shader files
│   ├── assets/                   # Static assets
│   └── data/                     # Content data files
│
├── public/                       # Public static files
│   ├── images/                   # Optimized images
│   ├── videos/                   # Video assets
│   ├── fonts/                    # Web fonts
│   └── favicon/                  # Favicon assets
│
├── dist/                         # Build output (generated)
│
├── docs/                         # Documentation
│   ├── ARCHITECTURE.md          # Architecture overview
│   ├── FILE_STRUCTURE.md        # This file
│   ├── COMPONENTS.md            # Component documentation
│   ├── CONTENT_STRUCTURE.md     # Content specifications
│   └── ANIMATION_SPECS.md       # Animation details
│
├── index.html                    # Main HTML file
├── package.json                  # Project dependencies
├── vite.config.js               # Vite configuration
├── .gitignore                   # Git ignore rules
└── README.md                     # Project README
```

---

## Detailed File Breakdown

### `/src/js/` - JavaScript Modules

```
src/js/
│
├── main.js                       # Entry point, initialization
├── config.js                     # Global configuration constants
│
├── core/                         # Core functionality
│   ├── SmoothScroll.js          # Lenis smooth scroll setup
│   ├── ScrollTriggers.js        # GSAP ScrollTrigger animations
│   ├── Navigation.js            # Navigation logic
│   └── Utils.js                 # Utility functions
│
├── three/                        # Three.js related
│   ├── ThreeScene.js            # Scene setup and management
│   ├── MorphingShape.js         # Morphing geometry logic
│   ├── Materials.js             # Custom materials
│   ├── Lighting.js              # Scene lighting setup
│   ├── Camera.js                # Camera controller
│   └── ScrollController.js      # Scroll-based 3D updates
│
├── animations/                   # Animation modules
│   ├── HeroAnimations.js        # Hero section animations
│   ├── ProjectAnimations.js     # Project reveal animations
│   ├── ParallaxController.js    # Parallax effects
│   └── MicroInteractions.js     # Hover effects, magnetic pulls
│
├── components/                   # Component logic
│   ├── Header.js                # Header/navigation component
│   ├── Hero.js                  # Hero section logic
│   ├── Projects.js              # Projects section
│   ├── Experience.js            # CV/Experience section
│   ├── Awards.js                # Awards section
│   ├── Contact.js               # Contact form logic
│   └── Footer.js                # Footer component
│
└── lib/                         # Third-party adapters
    ├── gsap-setup.js            # GSAP initialization
    └── three-setup.js           # Three.js setup helpers
```

**Key JavaScript Files:**

#### `main.js` - Application Entry Point
```javascript
// Main initialization logic
// - Import all modules
// - Initialize smooth scroll
// - Start Three.js scene
// - Set up scroll triggers
// - Initialize components
// - Handle page load animations
```

#### `three/MorphingShape.js` - Core 3D Element
```javascript
// MorphingShape class
// - Create icosahedron geometry
// - Apply custom shader material
// - Implement morph targets
// - Handle scroll-based transformations
// - Manage performance optimization
```

#### `animations/ScrollController.js` - Scroll Integration
```javascript
// Connect scroll position to:
// - Three.js scene updates
// - Animation timelines
// - Parallax effects
// - Section reveals
```

---

### `/src/css/` - Stylesheets

```
src/css/
│
├── main.css                      # Main stylesheet (imports all)
│
├── base/                         # Foundation styles
│   ├── reset.css                # CSS reset/normalize
│   ├── typography.css           # Font definitions, scales
│   ├── variables.css            # CSS custom properties
│   └── utilities.css            # Utility classes
│
├── layout/                       # Layout components
│   ├── grid.css                 # Grid system
│   ├── containers.css           # Container classes
│   └── spacing.css              # Spacing utilities
│
├── components/                   # Component styles
│   ├── header.css               # Header/navigation
│   ├── hero.css                 # Hero section
│   ├── projects.css             # Projects section
│   ├── experience.css           # CV/experience section
│   ├── awards.css               # Awards section
│   ├── contact.css              # Contact section
│   ├── footer.css               # Footer
│   ├── buttons.css              # Button styles
│   ├── cards.css                # Card components
│   └── forms.css                # Form elements
│
└── animations/                   # Animation styles
    ├── transitions.css          # Transition utilities
    ├── keyframes.css            # CSS keyframe animations
    └── hover-effects.css        # Hover state animations
```

**Key CSS Files:**

#### `base/variables.css` - Design Tokens
```css
/* Color palette */
/* Typography scales */
/* Spacing system */
/* Breakpoints */
/* Z-index layers */
/* Animation timings */
/* Shadow definitions */
```

#### `components/hero.css` - Hero Styles
```css
/* Hero container layout */
/* 3D canvas positioning */
/* Title typography */
/* Tagline styling */
/* Scroll indicator */
/* Responsive adaptations */
```

---

### `/src/shaders/` - GLSL Shaders

```
src/shaders/
│
├── morphing/                     # Morphing shape shaders
│   ├── vertex.glsl              # Vertex shader
│   └── fragment.glsl            # Fragment shader
│
└── effects/                      # Additional effects
    ├── glass-vertex.glsl        # Glass material vertex
    └── glass-fragment.glsl      # Glass material fragment
```

**Shader Files:**

#### `morphing/vertex.glsl` - Vertex Displacement
```glsl
// Custom vertex shader for:
// - Noise-based displacement
// - Scroll-controlled morphing
// - Vertex animation
```

#### `morphing/fragment.glsl` - Glass Material
```glsl
// Fragment shader for:
// - Glass/translucent appearance
// - Reflections and refractions
// - Color shifts
// - Fresnel effects
```

---

### `/src/assets/` - Static Assets (Development)

```
src/assets/
│
├── images/                       # Raw images (pre-optimization)
│   ├── hero/                    # Hero section images
│   ├── projects/                # Project images
│   ├── profile/                 # Profile photos
│   └── awards/                  # Award logos
│
└── icons/                       # SVG icons
    ├── social/                  # Social media icons
    ├── tech/                    # Technology logos
    └── ui/                      # UI icons
```

---

### `/src/data/` - Content Data

```
src/data/
│
├── projects.json                 # Project showcase data
├── experience.json              # CV/work experience
├── awards.json                  # Awards and recognition
├── skills.json                  # Skills and technologies
└── contact.json                 # Contact information
```

**Data File Structures:**

#### `projects.json` - Project Data Model
```json
[
  {
    "id": "project-01",
    "title": "Project Name",
    "category": "AI Cinematography",
    "year": "2024",
    "client": "Studio Name",
    "role": "Creative Technologist",
    "description": "Project description...",
    "technologies": ["ComfyUI", "Stable Diffusion", "After Effects"],
    "images": {
      "hero": "/images/projects/project-01-hero.jpg",
      "gallery": [...]
    },
    "video": "/videos/projects/project-01-demo.mp4",
    "link": "#case-study",
    "featured": true
  }
]
```

---

### `/public/` - Public Assets (Optimized)

```
public/
│
├── images/                       # Optimized images
│   ├── hero/                    # Hero section
│   │   ├── hero-bg.webp
│   │   └── hero-bg.jpg
│   │
│   ├── projects/                # Project images
│   │   ├── project-01-hero.webp
│   │   ├── project-01-hero.jpg
│   │   └── ...
│   │
│   └── awards/                  # Award logos
│       └── ...
│
├── videos/                       # Video assets
│   ├── hero-ambient.mp4        # Background ambient video
│   └── projects/               # Project demo videos
│
├── fonts/                        # Web fonts
│   ├── SpaceGrotesk-Regular.woff2
│   ├── SpaceGrotesk-Medium.woff2
│   ├── SpaceGrotesk-Bold.woff2
│   └── ...
│
├── favicon/                      # Favicon files
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   └── site.webmanifest
│
└── models/                       # 3D models (if needed)
    └── ...
```

---

### `/docs/` - Documentation Files

```
docs/
│
├── ARCHITECTURE.md              # System architecture overview
├── FILE_STRUCTURE.md            # This file
├── COMPONENTS.md                # Component specifications
├── CONTENT_STRUCTURE.md         # Content guidelines
├── ANIMATION_SPECS.md           # Animation timeline details
├── DESIGN_SYSTEM.md             # Design tokens and patterns
└── DEPLOYMENT.md                # Deployment instructions
```

---

## Configuration Files

### `package.json` - Dependencies

```json
{
  "name": "mascha-portfolio",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "three": "^0.160.0",
    "gsap": "^3.12.0",
    "@studio-freight/lenis": "^1.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "vite-plugin-glsl": "^1.1.0"
  }
}
```

### `vite.config.js` - Build Configuration

```javascript
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [glsl()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
  },
  server: {
    port: 3000,
    open: true,
  }
});
```

### `.gitignore` - Version Control

```
# Dependencies
node_modules/

# Build output
dist/

# Environment variables
.env
.env.local

# IDE
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
```

---

## HTML Structure

### `index.html` - Main HTML Document

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mascha - Artist & Creative Technologist</title>
  <meta name="description" content="...">
  
  <!-- Preload critical assets -->
  <link rel="preload" href="/fonts/SpaceGrotesk-Regular.woff2" as="font">
  
  <!-- Styles -->
  <link rel="stylesheet" href="/src/css/main.css">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico">
</head>
<body>
  <!-- Navigation -->
  <header id="header">...</header>
  
  <!-- Main Content -->
  <main id="main">
    <section id="hero">...</section>
    <section id="projects">...</section>
    <section id="experience">...</section>
    <section id="awards">...</section>
    <section id="contact">...</section>
  </main>
  
  <!-- Footer -->
  <footer id="footer">...</footer>
  
  <!-- Three.js Canvas -->
  <canvas id="three-canvas"></canvas>
  
  <!-- Scripts -->
  <script type="module" src="/src/js/main.js"></script>
</body>
</html>
```

---

## File Size Guidelines

### Performance Targets

**Images:**
- Hero background: < 200KB (WebP), < 300KB (JPEG fallback)
- Project images: < 150KB each (WebP), < 200KB (JPEG)
- Award logos: < 20KB each (SVG preferred)
- Profile photo: < 100KB

**Videos:**
- Hero ambient: < 5MB, compressed, loop
- Project demos: < 10MB each, compressed

**Fonts:**
- WOFF2 format only
- Regular + Medium + Bold weights
- < 100KB total

**JavaScript:**
- Total bundle: < 300KB (minified + gzipped)
- Initial load: < 100KB
- Code splitting for Three.js (lazy load if not visible)

**CSS:**
- Total CSS: < 50KB (minified + gzipped)
- Critical CSS: < 10KB (inlined)

---

## Directory Creation Order

### Build Sequence

1. **Phase 1 - Foundation:**
   ```bash
   portfolio-website/
   ├── public/
   └── src/
       ├── css/
       ├── js/
       └── data/
   ```

2. **Phase 2 - Core Structure:**
   ```bash
   src/css/base/
   src/js/core/
   src/js/components/
   ```

3. **Phase 3 - Three.js Setup:**
   ```bash
   src/js/three/
   src/shaders/
   ```

4. **Phase 4 - Animations:**
   ```bash
   src/js/animations/
   src/css/animations/
   ```

5. **Phase 5 - Assets:**
   ```bash
   public/images/
   public/videos/
   public/fonts/
   ```

---

## Module Import Strategy

### Main Entry Point Flow

```javascript
// main.js
import './css/main.css';
import { initThreeScene } from './js/three/ThreeScene.js';
import { initSmoothScroll } from './js/core/SmoothScroll.js';
import { initScrollTriggers } from './js/core/ScrollTriggers.js';
import { initNavigation } from './js/core/Navigation.js';
import { initComponents } from './js/components/index.js';

// Initialize application
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Smooth scroll
  initSmoothScroll();
  
  // 2. Three.js scene
  await initThreeScene();
  
  // 3. Scroll triggers
  initScrollTriggers();
  
  // 4. Navigation
  initNavigation();
  
  // 5. Components
  initComponents();
});
```

---

## Asset Naming Conventions

### Consistency Rules

**Images:**
```
{section}-{descriptor}-{size}.{format}
hero-background-1920.webp
project-01-hero-1200.jpg
award-logo-aicff.svg
```

**Videos:**
```
{section}-{descriptor}.{format}
hero-ambient-loop.mp4
project-02-demo-compressed.mp4
```

**Components:**
```
{ComponentName}.js
{component-name}.css
```

**Data:**
```
{plural-noun}.json
projects.json
awards.json
```

---

## Build Output Structure

### `/dist/` - Production Build

```
dist/
│
├── assets/                       # Hashed assets
│   ├── index-[hash].js          # Main JS bundle
│   ├── three-[hash].js          # Three.js bundle (code-split)
│   ├── main-[hash].css          # Compiled CSS
│   └── ...
│
├── images/                       # Optimized images
├── videos/                       # Compressed videos
├── fonts/                        # Web fonts
│
└── index.html                    # Processed HTML
```

---

## Development Workflow

### File Watching

Vite automatically watches:
- `/src/**/*` - All source files
- `/public/**/*` - Static assets
- `index.html` - Main HTML

### Hot Module Replacement (HMR)

- CSS changes: Instant update (no reload)
- JS changes: Fast refresh
- Three.js changes: Scene hot reload
- HTML changes: Full page reload

---

**Document Version:** 1.0  
**Last Updated:** October 2025  
**Related:** [`ARCHITECTURE.md`](ARCHITECTURE.md)