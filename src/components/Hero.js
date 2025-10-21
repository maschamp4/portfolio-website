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
    this.subtitle = this.element.querySelector('.hero__subtitle');
    this.ctaButtons = Array.from(this.element.querySelectorAll('.hero__cta, .btn'));
    this.scrollIndicator = this.element.querySelector('.scroll-indicator');
    
    // State
    this.isAnimated = false;
    this.titleChars = [];
    this.animations = []; // Store GSAP animations for cleanup
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Initialize hero component
   */
  init() {
    if (!this.element) return;

    console.log('Hero: Initializing...');

    this.setupTextAnimations();
    this.setupScrollIndicator();
    this.setupCTAButtons();
    this.setupParallaxEffect();

    console.log('Hero: Initialized successfully');
  }

  /**
   * Set up text animations
   * Splits text into characters/words for sequential animation
   */
  setupTextAnimations() {
    // Animate tagline
    if (this.tagline && hero.tagline) {
      this.tagline.textContent = hero.tagline;
      this.animateTagline();
    }

    // Animate title
    if (this.title) {
      this.prepareTitle();
      this.animateTitle();
    }

    // Animate subtitle
    if (this.subtitle && hero.subtitle) {
      this.subtitle.textContent = hero.subtitle;
      this.animateSubtitle();
    }
  }

  /**
   * Prepare title for character-by-character animation
   */
  prepareTitle() {
    if (!this.title) return;

    // Get title from content data or existing text
    const titleText = hero.title ? hero.title.join(' - ') : this.title.textContent;
    
    // Split into characters
    const chars = titleText.split('');
    
    // Wrap each character in span for animation
    this.title.innerHTML = chars.map((char, index) => {
      const className = char === ' ' ? 'char char--space' : 'char';
      const content = char === ' ' ? '&nbsp;' : char;
      return `<span class="${className}" data-char="${index}">${content}</span>`;
    }).join('');

    // Store character elements for animation
    this.titleChars = Array.from(this.title.querySelectorAll('.char'));
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
   * Animate title characters sequentially
   * Character-by-character reveal with GSAP stagger
   */
  animateTitle() {
    if (this.titleChars.length === 0) return;

    if (this.prefersReducedMotion) {
      // Simple instant display for reduced motion
      gsap.set(this.titleChars, { opacity: 1, y: 0, rotationX: 0 });
      this.isAnimated = true;
      eventBus.emit('hero:animated');
      return;
    }

    const anim = gsap.from(this.titleChars, {
      opacity: 0,
      y: 50,
      rotationX: -90,
      stagger: 0.05,
      duration: 1.5,
      delay: 0.6,
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
      duration: 0.8,
      delay: 1.5,
      ease: 'power2.out',
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
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      delay: 2,
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
   * Set up CTA button interactions
   * Note: Magnetic effects are now handled globally in main.js
   */
  setupCTAButtons() {
    this.ctaButtons.forEach(button => {
      // Click tracking
      button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        eventBus.emit('hero:cta-clicked', {
          href,
          text: button.textContent.trim()
        });
        
        console.log('Hero: CTA button clicked', href);
      });
    });
  }

  /**
   * Set up parallax effect for hero content
   * Placeholder for scroll-based parallax
   */
  setupParallaxEffect() {
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
   * Reset animations (for testing/debugging)
   */
  resetAnimations() {
    this.isAnimated = false;
    
    if (this.tagline) {
      this.tagline.style.opacity = '0';
      this.tagline.style.transform = 'translateY(30px)';
    }

    this.titleChars.forEach(char => {
      char.style.opacity = '0';
      char.style.transform = 'translateY(50px) rotateX(-90deg)';
    });

    if (this.subtitle) {
      this.subtitle.style.opacity = '0';
      this.subtitle.style.transform = 'translateY(20px)';
    }

    console.log('Hero: Animations reset');
  }

  /**
   * Play animations (for re-triggering)
   */
  playAnimations() {
    this.animateTagline();
    this.animateTitle();
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

    // Reset GSAP transforms
    if (this.tagline) gsap.set(this.tagline, { clearProps: 'all' });
    if (this.subtitle) gsap.set(this.subtitle, { clearProps: 'all' });
    if (this.scrollIndicator) gsap.set(this.scrollIndicator, { clearProps: 'all' });
    this.titleChars.forEach(char => gsap.set(char, { clearProps: 'all' }));

    console.log('Hero: Destroyed');
  }
}

export default Hero;