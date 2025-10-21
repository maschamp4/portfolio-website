# Mascha Portfolio Website - Architecture Documentation

## Project Overview

A cutting-edge portfolio website for Mascha, an Artist & Creative Technologist specializing in AI-driven visual effects and cinematography for film production companies. Inspired by WRK Timepieces' refined aesthetic and smooth interactions.

**Target Audience:** Film production companies, VFX studios, creative agencies seeking AI visual direction and creative technology expertise.

**Key Differentiator:** Seamless integration of Three.js morphing glass/slime animations with scroll-driven storytelling, showcasing both technical prowess and artistic vision.

---

## Design Philosophy

### Visual Language
- **Aesthetic:** Modern, futuristic, minimalistic, epic
- **Color Palette:** Monochromatic black/white base with subtle accent colors
- **Materials:** Glass morphism, reflective surfaces, translucent effects
- **Typography:** Clean, contemporary sans-serif (Space Grotesk primary)
- **Inspiration:** WRK Timepieces - refined animations, smooth parallax, magnetic hover states

### User Experience Principles
1. **Scroll-Driven Narrative:** Content unfolds naturally through smooth scrolling
2. **Progressive Disclosure:** Information revealed through elegant fade-in-up animations
3. **Tactile Interactions:** Magnetic hover effects, responsive micro-interactions
4. **Performance First:** Optimized Three.js rendering, lazy loading, efficient animations
5. **Accessibility:** Semantic HTML, keyboard navigation, reduced motion support

---

## Technical Stack

### Core Technologies
- **HTML5:** Semantic markup, accessibility features
- **CSS3:** Custom properties, Grid, Flexbox, transforms, filters
- **Vanilla JavaScript:** ES6+, modular architecture
- **Three.js (r160+):** WebGL rendering for 3D morphing shapes

### Animation Libraries
- **GSAP (GreenSock):** Timeline-based animations, ScrollTrigger plugin
- **Lenis:** Smooth scroll implementation
- **Three.js:** Shader-based morphing animations

### Development Tools
- **Module Bundler:** Vite (recommended) or Webpack
- **CSS Preprocessor:** PostCSS with modern CSS features
- **Version Control:** Git
- **Package Manager:** npm or yarn

### Performance Optimizations
- Intersection Observer for lazy loading
- RequestAnimationFrame for smooth animations
- WebGL shader optimizations
- Image optimization (WebP with fallbacks)
- Code splitting and tree shaking
- Service Worker for offline capability (optional)

---

## Site Structure

### Navigation Flow
```
HOME (Hero Section)
   ↓
HERO 3D ANIMATION
   ↓
PROJECTS (3-5 Showcases)
   ↓
CV/EXPERIENCE
   ↓
AWARDS & RECOGNITION
   ↓
CONTACT
```

### Page Sections

#### 1. Hero Section
- **Tagline:** "Mascha - Artist & Creative Technologist with strong visual style and love for cinematography"
- **Main Title:** "AI - TECHNOLOGY - CREATIVE DIRECTION"
- **3D Element:** Morphing glass/slime shape (Three.js)
- **Scroll Indicator:** Animated down arrow

#### 2. Projects Section
- 5 featured projects with alternating layouts
- Each project includes:
  - Large hero image/video
  - Project title and category
  - Brief description (2-3 sentences)
  - Technologies used
  - Role and year
  - Case study link (hover reveal)

#### 3. Experience/CV Section
- Timeline-based layout
- Key positions and roles
- Skills matrix
- Technical expertise showcase

#### 4. Awards Section
- Grid/masonry layout
- Award name, category, year
- Recognition badges/logos
- Festival/organization names

#### 5. Contact Section
- Professional contact form
- Social/professional links
- Availability status
- Location information

---

## Responsive Strategy

### Breakpoints
```css
/* Mobile First Approach */
--mobile: 320px - 767px
--tablet: 768px - 1023px
--desktop: 1024px - 1439px
--desktop-large: 1440px+
```

### Device-Specific Adaptations

**Mobile (< 768px):**
- Simplified 3D animations or 2D fallback
- Single column layouts
- Reduced parallax effects
- Touch-optimized interactions
- Hamburger navigation

**Tablet (768px - 1023px):**
- Two-column project layouts
- Moderate 3D animation complexity
- Touch and mouse support
- Adaptive navigation

**Desktop (1024px+):**
- Full 3D animation capabilities
- Multi-column complex layouts
- Enhanced parallax effects
- Magnetic hover interactions
- Full navigation bar

---

## Animation Strategy

### Scroll-Driven Animations

#### Hero Section
- **0% - 50% scroll:** 3D shape morphs and scales
- **50% - 100% scroll:** Shape fades/transitions to projects

#### Project Reveals
- **Trigger:** When 20% of project enters viewport
- **Animation:** Fade-in-up (0.8s ease-out)
- **Stagger:** 0.2s between elements

#### Parallax Layers
- Background: 0.5x scroll speed
- Midground: 0.75x scroll speed
- Foreground: 1x scroll speed

### Micro-Interactions
- Link hover: Magnetic pull effect (10px radius)
- Button hover: Scale (1.05), shadow expand
- Image hover: Scale (1.1), overlay fade-in
- Card hover: Lift effect, shadow grow

### Performance Targets
- 60fps on desktop
- 30fps minimum on mobile
- < 100ms interaction response time
- Smooth scroll at all times

---

## Three.js Animation System

### Morphing Shape Specifications

**Base Geometry:**
- IcosahedronGeometry with subdivisions
- Custom shader material
- Glass/translucent appearance

**Morphing Behavior:**
- Noise-based vertex displacement
- Scroll-controlled morph targets
- Color shifts based on scroll position

**Material Properties:**
```javascript
{
  color: 0xffffff,
  metalness: 0.9,
  roughness: 0.1,
  transmission: 0.9,
  thickness: 0.5,
  envMapIntensity: 1.5,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1
}
```

**Scroll Integration:**
- Position: translateZ based on scroll (0 to -500)
- Rotation: rotateY (0 to 360deg)
- Morph: vertex displacement intensity (0 to 1)
- Scale: grows/shrinks (0.8 to 1.2)
- Opacity: fades on exit (1 to 0)

---

## File Structure

See [`FILE_STRUCTURE.md`](FILE_STRUCTURE.md) for complete directory architecture.

---

## Component Architecture

See [`COMPONENTS.md`](COMPONENTS.md) for detailed component breakdown.

---

## Content Structure

See [`CONTENT_STRUCTURE.md`](CONTENT_STRUCTURE.md) for placeholder content and data models.

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1)
- [ ] Set up project structure and build tools
- [ ] Implement base HTML structure
- [ ] Create CSS design system
- [ ] Set up responsive grid framework

### Phase 2: Core Features (Week 2)
- [ ] Implement smooth scroll (Lenis)
- [ ] Build navigation system
- [ ] Create section components
- [ ] Implement fade-in-up animations

### Phase 3: Three.js Integration (Week 3)
- [ ] Set up Three.js scene
- [ ] Create morphing geometry
- [ ] Implement glass material shader
- [ ] Integrate scroll controls
- [ ] Optimize performance

### Phase 4: Content & Polish (Week 4)
- [ ] Add all project content
- [ ] Implement micro-interactions
- [ ] Add hover effects
- [ ] Optimize images and assets
- [ ] Cross-browser testing

### Phase 5: Refinement (Week 5)
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Mobile responsiveness testing
- [ ] Final polish and tweaks
- [ ] Deployment preparation

---

## Performance Considerations

### Critical Rendering Path
1. Inline critical CSS
2. Defer non-critical JavaScript
3. Preload key assets (fonts, hero image)
4. Lazy load below-fold content

### Three.js Optimization
- Use LOD (Level of Detail) for 3D objects
- Implement frustum culling
- Reduce polygon count on mobile
- Use texture compression
- Disable shadows on low-end devices

### Image Strategy
- WebP with JPEG/PNG fallbacks
- Responsive images (srcset)
- Lazy loading with blur-up
- Hero image: 1920x1080, < 200KB
- Project images: 1200x800, < 150KB

---

## Browser Support

### Target Browsers
- Chrome 90+ (primary)
- Firefox 88+
- Safari 14+
- Edge 90+

### Feature Detection & Fallbacks
- WebGL: 2D canvas fallback
- CSS Grid: Flexbox fallback
- Custom Properties: Static values fallback
- IntersectionObserver: Scroll event fallback

---

## Accessibility Guidelines

### WCAG 2.1 Level AA Compliance
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Focus indicators
- Alt text for all images
- Sufficient color contrast (4.5:1 minimum)
- Reduced motion media query support

### Keyboard Navigation
- Tab order follows visual flow
- Skip to main content link
- Escape to close modals/menus
- Arrow keys for sliders/carousels

---

## SEO Strategy

### On-Page Optimization
- Semantic HTML5 structure
- Meta descriptions (150-160 characters)
- Open Graph tags for social sharing
- Schema.org markup (Person, CreativeWork)
- XML sitemap
- robots.txt

### Content Strategy
- Focus keywords: "AI visual effects", "creative technologist", "AI cinematography"
- Long-tail: "AI-driven VFX for film production"
- Target: Film production companies searching for AI/VFX talent

---

## Deployment Strategy

### Hosting Options
1. **Vercel** (recommended) - Automatic deployments, CDN, SSL
2. **Netlify** - Similar features, good CI/CD
3. **GitHub Pages** - Free, simple, version controlled
4. **Custom VPS** - Full control, requires maintenance

### Domain Setup
- Custom domain (mascha.art or similar)
- SSL certificate (free with hosting)
- CDN for global performance

### Monitoring
- Google Analytics or Plausible
- Performance monitoring (Lighthouse CI)
- Error tracking (optional: Sentry)

---

## Future Enhancements

### Version 2.0 Potential Features
- [ ] WebGL shader-based text effects
- [ ] Interactive project case studies
- [ ] Real-time 3D project previews
- [ ] Blog/thought leadership section
- [ ] Client testimonials with video
- [ ] Live availability calendar
- [ ] Multi-language support (EN/DE)
- [ ] Dark/light mode toggle
- [ ] Interactive resume/CV download

---

## References & Inspiration

### Design References
- WRK Timepieces: https://www.wrk-timepieces.com/products/acf-01
- Awwwards: Three.js portfolio examples
- Codrops: Creative UI/UX patterns

### Technical Resources
- Three.js Documentation: https://threejs.org/docs/
- GSAP ScrollTrigger: https://greensock.com/scrolltrigger/
- WebGL Fundamentals: https://webglfundamentals.org/

---

**Document Version:** 1.0  
**Last Updated:** October 2025  
**Author:** Architecture Planning Phase