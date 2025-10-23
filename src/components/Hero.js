/**
 * Hero Component
 * Landing section with animated text and scroll indicator
 * Reference: COMPONENTS.md lines 197-431
 */

import eventBus from '../utils/EventBus.js';
import { hero } from '../data/content.js';
import { gsap } from 'gsap';

class Hero {
  constructor() {
    // Main element references
    this.element = document.getElementById('hero') || document.querySelector('.hero');
    
    if (!this.element) {
      console.warn('Hero: Hero element not found');
      return;
    }

    this.tagline = this.element.querySelector('.hero__tagline');
    this.title = this.element.querySelector('.hero__title');
    this.titleLines = Array.from(this.element.querySelectorAll('.hero__title-line'));
    this.subtitle = this.element.querySelector('.hero__subtitle');
    this.scrollIndicator = this.element.querySelector('.hero__scroll-indicator') ||
                           this.element.querySelector('.scroll-indicator');
    
    // State
    this.isAnimated = false;
    this.animations = []; // Store GSAP animations for cleanup
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isMobileOrTablet = window.innerWidth <= 1024; // Disable animations on mobile/tablet
  }

  /**
   * Initialize hero component
   */
  init() {
    if (!this.element) return;

    console.log('Hero: Initializing...');

    this.updateContent();
    this.setupTextAnimations();
    this.setupScrollIndicator();
    this.setupParallaxEffect();
    this.setupCursorInteraction();

    console.log('Hero: Initialized successfully');
  }

  /**
   * Update content from data (if needed)
   */
  updateContent() {
    // Update tagline if content data differs from HTML
    if (this.tagline && hero.tagline && this.tagline.textContent.trim() !== hero.tagline) {
      this.tagline.textContent = hero.tagline;
    }

    // Update title lines if content data differs from HTML
    if (this.titleLines.length > 0 && hero.title && Array.isArray(hero.title)) {
      hero.title.forEach((line, index) => {
        if (this.titleLines[index] && this.titleLines[index].textContent.trim() !== line) {
          this.titleLines[index].textContent = line;
        }
      });
    }

    // Update subtitle if content data differs from HTML
    if (this.subtitle && hero.subtitle && this.subtitle.textContent.trim() !== hero.subtitle) {
      this.subtitle.textContent = hero.subtitle;
    }
  }

  /**
   * Set up text animations
   * Animates title lines, tagline, and subtitle
   */
  setupTextAnimations() {
    // Skip animations on mobile/tablet - just show content immediately
    if (this.isMobileOrTablet) {
      if (this.tagline) gsap.set(this.tagline, { opacity: 1, y: 0 });
      if (this.titleLines.length > 0) gsap.set(this.titleLines, { opacity: 1, y: 0 });
      if (this.subtitle) gsap.set(this.subtitle, { opacity: 1, y: 0 });
      this.isAnimated = true;
      eventBus.emit('hero:animated');
      return;
    }

    // Animate tagline
    if (this.tagline) {
      this.animateTagline();
    }

    // Animate title lines
    if (this.titleLines.length > 0) {
      this.animateTitleLines();
    }

    // Animate subtitle
    if (this.subtitle) {
      this.animateSubtitle();
    }
  }

  /**
   * Animate tagline
   * Uses GSAP for smooth fade-in-up animation
   */
  animateTagline() {
    if (!this.tagline) return;

    if (this.prefersReducedMotion) {
      // Simple instant display for reduced motion
      gsap.set(this.tagline, { opacity: 1, y: 0 });
      return;
    }

    const anim = gsap.from(this.tagline, {
      opacity: 0,
      y: 30,
      duration: 1.2,
      delay: 0.3,
      ease: 'power3.out',
    });
    
    this.animations.push(anim);
  }

  /**
   * Animate title lines sequentially
   * Uses GSAP stagger for line-by-line reveal
   */
  animateTitleLines() {
    if (this.titleLines.length === 0) return;

    if (this.prefersReducedMotion) {
      // Simple instant display for reduced motion
      gsap.set(this.titleLines, { opacity: 1, y: 0 });
      this.isAnimated = true;
      eventBus.emit('hero:animated');
      return;
    }

    const anim = gsap.from(this.titleLines, {
      opacity: 0,
      y: 80,
      stagger: 0.12,
      duration: 1.4,
      delay: 0.5,
      ease: 'power3.out',
      onComplete: () => {
        this.isAnimated = true;
        eventBus.emit('hero:animated');
      },
    });
    
    this.animations.push(anim);
  }

  /**
   * Animate subtitle
   * Uses GSAP for smooth fade-in animation
   */
  animateSubtitle() {
    if (!this.subtitle) return;

    if (this.prefersReducedMotion) {
      // Simple instant display for reduced motion
      gsap.set(this.subtitle, { opacity: 1, y: 0 });
      return;
    }

    const anim = gsap.from(this.subtitle, {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 1.3,
      ease: 'power3.out',
    });
    
    this.animations.push(anim);
  }

  /**
   * Set up scroll indicator behavior and animation
   */
  setupScrollIndicator() {
    if (!this.scrollIndicator) return;

    // Click to scroll to next section
    this.scrollIndicator.addEventListener('click', () => {
      this.scrollToNextSection();
    });

    if (this.prefersReducedMotion) {
      return;
    }

    // Bounce animation with GSAP
    const anim = gsap.to(this.scrollIndicator, {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2.2,
    });
    
    this.animations.push(anim);
  }

  /**
   * Scroll to next section smoothly
   */
  scrollToNextSection() {
    const nextSection = this.element.nextElementSibling;
    
    if (nextSection) {
      const offset = 80; // Header offset
      const elementPosition = nextSection.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      eventBus.emit('hero:scroll-clicked');
      console.log('Hero: Scrolling to next section');
    } else {
      // Fallback: scroll one viewport height
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Set up parallax effect for hero content
   */
  setupParallaxEffect() {
    if (this.prefersReducedMotion) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Listen for scroll progress from header
    eventBus.on('scroll:progress', (data) => {
      this.updateParallax(data.scrollY);
    });
  }

  /**
   * Update parallax based on scroll position
   * @param {number} scrollY - Current scroll position
   */
  updateParallax(scrollY) {
    if (!scrollY) scrollY = window.scrollY;

    // Only apply parallax while hero is visible
    const heroHeight = this.element.offsetHeight;
    if (scrollY > heroHeight) return;

    // Calculate parallax amount
    const parallaxAmount = scrollY * 0.5;

    // Apply subtle parallax to content
    if (this.title) {
      this.title.style.transform = `translateY(${parallaxAmount}px)`;
    }

    if (this.tagline) {
      this.tagline.style.transform = `translateY(${parallaxAmount * 0.3}px)`;
    }

    // Fade out scroll indicator as user scrolls
    if (this.scrollIndicator && scrollY > 0) {
      const opacity = Math.max(0, 1 - (scrollY / 300));
      this.scrollIndicator.style.opacity = opacity;
    }
  }

  /**
   * Set up modern magnetic cursor interaction
   * Letters repel from cursor with spring physics
   */
  setupCursorInteraction() {
    if (!this.title || this.titleLines.length === 0) return;
    if (this.prefersReducedMotion || this.isMobileOrTablet) return; // Disable on mobile/tablet

    // Store original text for each line
    this.originalText = this.titleLines.map(line => line.textContent);

    // Split text into individual letters
    this.titleLines.forEach((line, lineIndex) => {
      const text = this.originalText[lineIndex];
      line.innerHTML = text.split('').map(char =>
        char === ' ' ? '&nbsp;' : `<span class="hero__title-letter">${char}</span>`
      ).join('');
    });

    // Get all letter elements
    const letters = document.querySelectorAll('.hero__title-letter');
    
    // Magnetic repulsion effect on mouse move
    const handleMouseMove = (e) => {
      letters.forEach(letter => {
        const rect = letter.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from cursor
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Magnetic effect radius (150px)
        const maxDistance = 150;
        
        if (distance < maxDistance) {
          // Calculate repulsion strength (inverse of distance)
          const strength = (maxDistance - distance) / maxDistance;
          // Apply repulsion in opposite direction from cursor
          const moveX = -deltaX * strength * 0.3;
          const moveY = -deltaY * strength * 0.3;
          
          letter.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          // Reset to original position
          letter.style.transform = 'translate(0, 0)';
        }
      });
    };

    // Reset all letters on mouse leave
    const handleMouseLeave = () => {
      letters.forEach(letter => {
        letter.style.transform = 'translate(0, 0)';
      });
    };

    // Attach event listeners to document for smooth tracking
    document.addEventListener('mousemove', handleMouseMove);
    this.title.addEventListener('mouseleave', handleMouseLeave);

    // Store references for cleanup
    this.magneticHandlers = {
      mousemove: handleMouseMove,
      mouseleave: handleMouseLeave
    };

    console.log('Hero: Magnetic cursor interaction setup complete');
  }

  /**
   * Reset animations (for testing/debugging)
   */
  resetAnimations() {
    this.isAnimated = false;
    
    if (this.tagline) {
      gsap.set(this.tagline, { opacity: 0, y: 30 });
    }

    this.titleLines.forEach(line => {
      gsap.set(line, { opacity: 0, y: 100 });
    });

    if (this.subtitle) {
      gsap.set(this.subtitle, { opacity: 0, y: 20 });
    }

    console.log('Hero: Animations reset');
  }

  /**
   * Play animations (for re-triggering)
   */
  playAnimations() {
    this.animateTagline();
    this.animateTitleLines();
    this.animateSubtitle();
  }

  /**
   * Destroy component and clean up
   */
  destroy() {
    console.log('Hero: Destroying...');

    // Kill all GSAP animations
    this.animations.forEach(anim => {
      if (anim && anim.kill) {
        anim.kill();
      }
    });
    this.animations = [];

    // Remove magnetic effect event listeners
    if (this.magneticHandlers) {
      document.removeEventListener('mousemove', this.magneticHandlers.mousemove);
      if (this.title) {
        this.title.removeEventListener('mouseleave', this.magneticHandlers.mouseleave);
      }
      this.magneticHandlers = null;
    }

    // Reset GSAP transforms
    if (this.tagline) gsap.set(this.tagline, { clearProps: 'all' });
    if (this.subtitle) gsap.set(this.subtitle, { clearProps: 'all' });
    if (this.scrollIndicator) gsap.set(this.scrollIndicator, { clearProps: 'all' });
    
    this.titleLines.forEach(line => gsap.set(line, { clearProps: 'all' }));

    console.log('Hero: Destroyed');
  }
}

export default Hero;