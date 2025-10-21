# Design System & Visual Language

Complete design system documentation including typography, colors, spacing, responsive strategy, and component patterns.

---

## Table of Contents

1. [Design Principles](#design-principles)
2. [Typography System](#typography-system)
3. [Color System](#color-system)
4. [Spacing & Layout](#spacing--layout)
5. [Responsive Strategy](#responsive-strategy)
6. [Component Patterns](#component-patterns)
7. [Motion & Animation](#motion--animation)
8. [Accessibility](#accessibility)

---

## Design Principles

### Core Values

1. **Minimalism with Impact** - Every element serves a purpose; remove the unnecessary
2. **Technology as Art** - Showcase technical prowess through aesthetic excellence
3. **Cinematic Quality** - Film-inspired composition and timing
4. **Progressive Enhancement** - Core experience works everywhere, enhanced on capable devices
5. **Performance First** - Beauty shouldn't sacrifice speed

### Visual Language

- **Monochromatic Foundation:** Black/white with subtle accent colors
- **Glass Morphism:** Translucent surfaces, blur effects, depth
- **Geometric Precision:** Clean lines, perfect alignment, mathematical ratios
- **Organic Motion:** Fluid animations inspired by natural movement
- **Spatial Depth:** Layering, parallax, 3D elements create dimensionality

---

## Typography System

### Font Stack

**Primary Font: Space Grotesk**
```css
font-family: 'Space Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif;
```

**Backup System Stack:**
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Helvetica Neue', Arial, sans-serif;
```

**Monospace (Technical):**
```css
font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

### Font Weights

```css
:root {
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

### Type Scale (Major Third - 1.250)

Based on 16px base size with Major Third ratio (1.250) for desktop:

```css
:root {
  /* Desktop Type Scale */
  --text-xs: 0.64rem;      /* 10.24px */
  --text-sm: 0.8rem;       /* 12.8px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.25rem;      /* 20px */
  --text-xl: 1.563rem;     /* 25px */
  --text-2xl: 1.953rem;    /* 31.25px */
  --text-3xl: 2.441rem;    /* 39px */
  --text-4xl: 3.052rem;    /* 48.83px */
  --text-5xl: 3.815rem;    /* 61.04px */
  --text-6xl: 4.768rem;    /* 76.29px */
  --text-7xl: 5.96rem;     /* 95.37px */
  
  /* Mobile Type Scale (Reduced) */
  --text-xs-mobile: 0.7rem;    /* 11.2px */
  --text-sm-mobile: 0.875rem;  /* 14px */
  --text-base-mobile: 1rem;    /* 16px */
  --text-lg-mobile: 1.125rem;  /* 18px */
  --text-xl-mobile: 1.25rem;   /* 20px */
  --text-2xl-mobile: 1.5rem;   /* 24px */
  --text-3xl-mobile: 1.875rem; /* 30px */
  --text-4xl-mobile: 2.25rem;  /* 36px */
  --text-5xl-mobile: 2.5rem;   /* 40px */
}
```

### Typography Classes

```css
/* Headings */
.h1 {
  font-size: var(--text-6xl);
  font-weight: var(--font-weight-bold);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.h2 {
  font-size: var(--text-5xl);
  font-weight: var(--font-weight-bold);
  line-height: 1.15;
  letter-spacing: -0.01em;
}

.h3 {
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-semibold);
  line-height: 1.2;
}

.h4 {
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-semibold);
  line-height: 1.25;
}

.h5 {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-medium);
  line-height: 1.3;
}

.h6 {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-medium);
  line-height: 1.35;
}

/* Body Text */
.body-large {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-regular);
  line-height: 1.6;
}

.body {
  font-size: var(--text-base);
  font-weight: var(--font-weight-regular);
  line-height: 1.65;
}

.body-small {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-regular);
  line-height: 1.5;
}

/* Special */
.caption {
  font-size: var(--text-xs);
  font-weight: var(--font-weight-regular);
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.lead {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-light);
  line-height: 1.7;
}

.display {
  font-size: var(--text-7xl);
  font-weight: var(--font-weight-bold);
  line-height: 1;
  letter-spacing: -0.03em;
}
```

### Responsive Typography

```css
@media (max-width: 768px) {
  .h1 { font-size: var(--text-4xl-mobile); }
  .h2 { font-size: var(--text-3xl-mobile); }
  .h3 { font-size: var(--text-2xl-mobile); }
  .h4 { font-size: var(--text-xl-mobile); }
  .h5 { font-size: var(--text-lg-mobile); }
  .h6 { font-size: var(--text-base-mobile); }
  
  .display { font-size: var(--text-5xl-mobile); }
  .lead { font-size: var(--text-lg-mobile); }
}
```

---

## Color System

### Core Palette

```css
:root {
  /* Grayscale */
  --color-black: #000000;
  --color-gray-950: #0a0a0a;
  --color-gray-900: #171717;
  --color-gray-800: #262626;
  --color-gray-700: #404040;
  --color-gray-600: #525252;
  --color-gray-500: #737373;
  --color-gray-400: #a3a3a3;
  --color-gray-300: #d4d4d4;
  --color-gray-200: #e5e5e5;
  --color-gray-100: #f5f5f5;
  --color-white: #ffffff;
  
  /* Accent Colors */
  --color-accent-blue: #3b82f6;      /* Primary accent */
  --color-accent-cyan: #06b6d4;      /* Secondary accent */
  --color-accent-purple: #8b5cf6;    /* Tertiary accent */
  
  /* Semantic Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* Background */
  --color-bg-primary: var(--color-black);
  --color-bg-secondary: var(--color-gray-950);
  --color-bg-tertiary: var(--color-gray-900);
  
  /* Text */
  --color-text-primary: var(--color-white);
  --color-text-secondary: var(--color-gray-300);
  --color-text-tertiary: var(--color-gray-500);
  --color-text-inverse: var(--color-black);
  
  /* Borders */
  --color-border-subtle: rgba(255, 255, 255, 0.1);
  --color-border-default: rgba(255, 255, 255, 0.2);
  --color-border-strong: rgba(255, 255, 255, 0.3);
}
```

### Glass Morphism Colors

```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  --glass-blur: 10px;
  
  --glass-hover-bg: rgba(255, 255, 255, 0.08);
  --glass-hover-border: rgba(255, 255, 255, 0.15);
}
```

### Gradient Definitions

```css
:root {
  --gradient-primary: linear-gradient(135deg, 
    var(--color-accent-blue) 0%, 
    var(--color-accent-purple) 100%);
  
  --gradient-secondary: linear-gradient(135deg, 
    var(--color-accent-cyan) 0%, 
    var(--color-accent-blue) 100%);
  
  --gradient-dark: linear-gradient(180deg, 
    rgba(0, 0, 0, 0) 0%, 
    rgba(0, 0, 0, 0.8) 100%);
  
  --gradient-light: linear-gradient(180deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    rgba(255, 255, 255, 0) 100%);
}
```

### Color Usage Guidelines

**Backgrounds:**
- Primary background: Pure black (#000000)
- Secondary surfaces: Gray-950 (#0a0a0a)
- Cards/containers: Glass morphism (rgba(255,255,255,0.05))

**Text:**
- Primary text: White (#ffffff)
- Secondary text: Gray-300 (#d4d4d4)
- Disabled text: Gray-600 (#525252)

**Accents:**
- Links/CTAs: Accent blue (#3b82f6)
- Highlights: Accent cyan (#06b6d4)
- Special features: Accent purple (#8b5cf6)

**Semantic:**
- Success states: Green (#10b981)
- Warnings: Orange (#f59e0b)
- Errors: Red (#ef4444)

---

## Spacing & Layout

### Spacing Scale

Based on 8px base unit:

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
  --space-40: 10rem;     /* 160px */
  --space-48: 12rem;     /* 192px */
  --space-56: 14rem;     /* 224px */
  --space-64: 16rem;     /* 256px */
}
```

### Container System

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-6);
  padding-right: var(--space-6);
}

.container--narrow {
  max-width: 768px;
}

.container--default {
  max-width: 1200px;
}

.container--wide {
  max-width: 1440px;
}

.container--full {
  max-width: 100%;
}

@media (min-width: 768px) {
  .container {
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: var(--space-12);
    padding-right: var(--space-12);
  }
}
```

### Grid System

```css
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
.grid-cols-6 { grid-template-columns: repeat(6, 1fr); }
.grid-cols-12 { grid-template-columns: repeat(12, 1fr); }

/* Responsive Grid */
@media (max-width: 768px) {
  .grid-cols-2, .grid-cols-3, .grid-cols-4, 
  .grid-cols-6, .grid-cols-12 {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .grid-cols-3, .grid-cols-4, .grid-cols-6, .grid-cols-12 {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Section Spacing

```css
.section {
  padding-top: var(--space-24);
  padding-bottom: var(--space-24);
}

.section--hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section--large {
  padding-top: var(--space-32);
  padding-bottom: var(--space-32);
}

@media (max-width: 768px) {
  .section {
    padding-top: var(--space-16);
    padding-bottom: var(--space-16);
  }
  
  .section--large {
    padding-top: var(--space-20);
    padding-bottom: var(--space-20);
  }
}
```

---

## Responsive Strategy

### Breakpoint System

```css
:root {
  /* Breakpoint values */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### Media Query Mixins (in CSS)

```css
/* Small devices (landscape phones, 640px and up) */
@media (min-width: 640px) {
  /* Styles */
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  /* Styles */
}

/* Large devices (desktops, 1024px and up) */
@media (min-width: 1024px) {
  /* Styles */
}

/* Extra large devices (large desktops, 1280px and up) */
@media (min-width: 1280px) {
  /* Styles */
}

/* 2X large devices (larger desktops, 1536px and up) */
@media (min-width: 1536px) {
  /* Styles */
}
```

### Responsive Design Patterns

#### Mobile-First Approach

```css
/* Base styles (mobile) */
.element {
  font-size: 1rem;
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .element {
    font-size: 1.25rem;
    padding: 1.5rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .element {
    font-size: 1.5rem;
    padding: 2rem;
  }
}
```

#### Component Adaptations

**Navigation:**
- **Mobile (<768px):** Hamburger menu, full-screen overlay
- **Tablet (768-1023px):** Collapsible menu or horizontal nav
- **Desktop (1024px+):** Full horizontal navigation

**Three.js Shape:**
- **Mobile (<768px):** Reduced polygon count, simplified shaders, or 2D fallback
- **Tablet (768-1023px):** Medium polygon count, standard materials
- **Desktop (1024px+):** Full detail, advanced shaders, all effects

**Project Cards:**
- **Mobile (<768px):** Single column, vertical layout
- **Tablet (768-1023px):** Two columns
- **Desktop (1024px+):** Alternating left/right layout with parallax

**Grid Layouts:**
- **Mobile (<768px):** 1 column
- **Tablet (768-1023px):** 2 columns
- **Desktop (1024px+):** 3-4 columns

### Touch vs. Hover States

```css
/* Hover effects for devices that support hover */
@media (hover: hover) and (pointer: fine) {
  .interactive-element:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
  }
}

/* Touch-friendly tap states */
@media (hover: none) {
  .interactive-element:active {
    transform: scale(0.98);
  }
}
```

### Performance Considerations

```css
/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --color-border-subtle: rgba(255, 255, 255, 0.3);
    --color-border-default: rgba(255, 255, 255, 0.5);
  }
}
```

---

## Component Patterns

### Buttons

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  text-decoration: none;
  border: 2px solid transparent;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.btn--primary {
  background: transparent;
  border-color: var(--color-white);
  color: var(--color-white);
}

.btn--primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-white);
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.btn--primary:hover::before {
  transform: translateX(0);
}

.btn--primary:hover {
  color: var(--color-black);
}

.btn--ghost {
  background: transparent;
  color: var(--color-white);
  border: none;
}

.btn--ghost:hover {
  background: rgba(255, 255, 255, 0.1);
}
```

### Cards

```css
.card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--space-4);
  padding: var(--space-6);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  background: var(--glass-hover-bg);
  border-color: var(--glass-hover-border);
  transform: translateY(-10px);
  box-shadow: var(--glass-shadow);
}

.card__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-3);
}

.card__description {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.6;
}
```

### Forms

```css
.form-field {
  margin-bottom: var(--space-6);
}

.form-label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
  color: var(--color-text-secondary);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: var(--space-4);
  font-family: inherit;
  font-size: var(--text-base);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border-subtle);
  color: var(--color-white);
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-accent-blue);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input.error {
  border-color: var(--color-error);
}

.error-message {
  display: block;
  margin-top: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-error);
}
```

---

## Motion & Animation

### Easing Functions

```css
:root {
  --ease-in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  
  --ease-in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
  
  --ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Duration Scale

```css
:root {
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 800ms;
  --duration-slowest: 1200ms;
}
```

### Animation Utilities

```css
.fade-in {
  animation: fadeIn var(--duration-slow) var(--ease-out-cubic);
}

.fade-in-up {
  animation: fadeInUp var(--duration-slow) var(--ease-out-cubic);
}

.scale-in {
  animation: scaleIn var(--duration-normal) var(--ease-out-cubic);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## Accessibility

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--color-accent-blue);
  outline-offset: 4px;
}

.btn:focus-visible {
  outline-offset: 2px;
}
```

### Skip Links

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background: var(--color-white);
  color: var(--color-black);
  padding: var(--space-4);
  text-decoration: none;
  z-index: 9999;
}

.skip-link:focus {
  top: 0;
}
```

### Screen Reader Only

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

---

## Z-Index Scale

```css
:root {
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-tooltip: 700;
  --z-notification: 800;
  --z-three-canvas: -1;
}
```

---

## Shadow System

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.3);
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.4);
  
  /* Glow effects */
  --shadow-glow-sm: 0 0 10px rgba(255, 255, 255, 0.1);
  --shadow-glow-md: 0 0 20px rgba(255, 255, 255, 0.15);
  --shadow-glow-lg: 0 0 40px rgba(255, 255, 255, 0.2);
}
```

---

## Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.25rem;    /* 4px */
  --radius-md: 0.5rem;     /* 8px */
  --radius-lg: 1rem;       /* 16px */
  --radius-xl: 1.5rem;     /* 24px */
  --radius-full: 9999px;
}
```

---

**Document Version:** 1.0  
**Last Updated:** October 2025  
**Related:** [`ARCHITECTURE.md`](ARCHITECTURE.md), [`FILE_STRUCTURE.md`](FILE_STRUCTURE.md)