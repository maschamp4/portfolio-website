/**
 * Scroll Animations with Lenis and GSAP ScrollTrigger
 * Enhanced for progressive content reveal with proper viewport blocking
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

class ScrollAnimations {
  constructor() {
    this.lenis = null;
    this.scrollTriggers = [];
    this.isInitialized = false;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Animation settings
    this.settings = {
      // Lenis configuration
      lenis: {
        smooth: 1.2,
        lerp: 0.08,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      },
      
      // Animation timings - adjusted for progressive reveal
      timings: {
        fadeInDuration: 1.2,
        staggerDelay: 0.15,
        textStaggerDelay: 0.08,
        parallaxScrub: 1.5,
        revealDuration: 1.5,
      },
      
      // Easing functions
      easing: {
        default: 'power2.out',
        smooth: 'power3.out',
        elastic: 'elastic.out(1, 0.5)',
        spring: 'back.out(1.5)',
      },
    };
  }

  /**
   * Initialize Lenis smooth scroll and GSAP ScrollTrigger
   */
  async init() {
    if (this.isInitialized) {
      console.warn('ScrollAnimations: Already initialized');
      return;
    }

    console.log('ScrollAnimations: Initializing...');

    // Initialize Lenis smooth scroll
    this.initLenis();

    // Set up GSAP ScrollTrigger with Lenis
    this.setupScrollTrigger();

    // Set initial states for progressive reveal
    this.setInitialStates();

    // Register all section animations
    this.registerAnimations();

    // Set up window resize handler
    this.setupResizeHandler();

    this.isInitialized = true;
    console.log('ScrollAnimations: Initialized successfully');
  }

  /**
   * Initialize Lenis smooth scroll
   */
  initLenis() {
    // Skip smooth scroll if user prefers reduced motion
    if (this.prefersReducedMotion) {
      console.log('ScrollAnimations: Reduced motion detected, skipping smooth scroll');
      return;
    }

    try {
      this.lenis = new Lenis(this.settings.lenis);

      // Integrate with requestAnimationFrame
      const raf = (time) => {
        this.lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      console.log('ScrollAnimations: Lenis smooth scroll initialized');
    } catch (error) {
      console.error('ScrollAnimations: Error initializing Lenis:', error);
    }
  }

  /**
   * Set up GSAP ScrollTrigger with Lenis integration
   */
  setupScrollTrigger() {
    if (this.lenis) {
      // Integrate Lenis with ScrollTrigger using scrollerProxy
      const self = this;
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          return arguments.length ? self.lenis.scrollTo(value) : self.lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: document.body.style.transform ? 'transform' : 'fixed',
      });

      // Update ScrollTrigger on Lenis scroll
      this.lenis.on('scroll', ScrollTrigger.update);

      // Refresh ScrollTrigger after page loads
      ScrollTrigger.addEventListener('refresh', () => this.lenis?.raf(Date.now()));
    }

    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
      markers: false, // Set to true for debugging
    });

    console.log('ScrollAnimations: ScrollTrigger configured');
  }

  /**
   * Set initial states for progressive content reveal
   * Hide content that should be revealed on scroll
   */
  setInitialStates() {
    if (this.prefersReducedMotion) return;

    // Hide all sections initially except hero
    const sections = ['#projects', '#experience', '#awards', '#about', '#contact'];
    sections.forEach(selector => {
      const section = document.querySelector(selector);
      if (section) {
        gsap.set(section, { 
          opacity: 0,
          y: 100
        });
      }
    });

    // Hide project cards
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
      gsap.set(projectCards, { 
        opacity: 0,
        y: 100,
        scale: 0.95
      });
    }

    // Hide timeline entries
    const timelineEntries = document.querySelectorAll('.timeline__entry');
    if (timelineEntries.length > 0) {
      gsap.set(timelineEntries, { 
        opacity: 0,
        x: (i) => i % 2 === 0 ? -50 : 50
      });
    }

    // Hide award cards
    const awardCards = document.querySelectorAll('.award-card');
    if (awardCards.length > 0) {
      gsap.set(awardCards, { 
        opacity: 0,
        y: 50,
        scale: 0.9
      });
    }

    // Hide form fields
    const formFields = document.querySelectorAll('.form-field, .contact__form input, .contact__form textarea');
    if (formFields.length > 0) {
      gsap.set(formFields, { 
        opacity: 0,
        x: -30
      });
    }

    console.log('ScrollAnimations: Initial states set for progressive reveal');
  }

  /**
   * Register all scroll animations for sections
   */
  registerAnimations() {
    if (this.prefersReducedMotion) {
      console.log('ScrollAnimations: Skipping animations due to reduced motion preference');
      return;
    }

    // Hero section animations
    this.animateHero();

    // Section reveals
    this.animateSectionReveals();

    // Projects section animations
    this.animateProjects();

    // Experience section animations
    this.animateExperience();

    // Awards section animations
    this.animateAwards();

    // Contact section animations
    this.animateContact();

    console.log(`ScrollAnimations: Registered ${this.scrollTriggers.length} ScrollTriggers`);
  }

  /**
   * Hero section animations - fade out on scroll
   * UPDATED: Faster, smoother transition with no text overlay
   */
  animateHero() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const title = hero.querySelector('.hero__title');
    const subtitle = hero.querySelector('.hero__subtitle');
    const tagline = hero.querySelector('.hero__tagline');
    const subheadline = hero.querySelector('.hero__subheadline');
    const scrollIndicator = hero.querySelector('.scroll-indicator, .hero__scroll-indicator');
    const ctaButtons = hero.querySelector('.hero__cta');

    // Hero content parallax and fade - MUCH FASTER
    if (title) {
      const trigger = gsap.to(title, {
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '50% top', // Faster end point
          scrub: 0.5, // Much faster scrub for immediate response
        },
        y: -150,
        opacity: 0,
        ease: 'power3.out', // Smoother easing
      });
      this.scrollTriggers.push(trigger);
    }

    if (tagline) {
      const trigger = gsap.to(tagline, {
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '50% top',
          scrub: 0.5,
        },
        y: -100,
        opacity: 0,
        ease: 'power3.out',
      });
      this.scrollTriggers.push(trigger);
    }

    // Subheadline - disappears FIRST (faster animation)
    if (subheadline) {
      const trigger = gsap.to(subheadline, {
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '30% top', // Earlier end point - disappears faster
          scrub: 0.3, // Faster scrub for more immediate response
        },
        y: -120,
        opacity: 0,
        ease: 'power3.out',
      });
      this.scrollTriggers.push(trigger);
    }

    if (subtitle) {
      const trigger = gsap.to(subtitle, {
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '50% top',
          scrub: 0.5,
        },
        y: -100,
        opacity: 0,
        ease: 'power3.out',
      });
      this.scrollTriggers.push(trigger);
    }

    if (ctaButtons) {
      const trigger = gsap.to(ctaButtons, {
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '50% top',
          scrub: 0.5,
        },
        y: -80,
        opacity: 0,
        ease: 'power3.out',
      });
      this.scrollTriggers.push(trigger);
    }

    // Scroll indicator fade - very fast
    if (scrollIndicator) {
      const trigger = gsap.to(scrollIndicator, {
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '20% top',
          scrub: 0.3,
        },
        opacity: 0,
        y: -30,
        ease: 'power2.out',
      });
      this.scrollTriggers.push(trigger);
    }
  }

  /**
   * Progressive section reveals - each section fades in as it enters viewport
   */
  animateSectionReveals() {
    const sections = ['#projects', '#experience', '#awards', '#about', '#contact'];
    
    sections.forEach((selector, index) => {
      const section = document.querySelector(selector);
      if (!section) return;

      const trigger = gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        y: 0,
        duration: this.settings.timings.revealDuration,
        ease: this.settings.easing.smooth,
      });
      this.scrollTriggers.push(trigger);
    });
  }

  /**
   * Projects section animations
   */
  animateProjects() {
    const projects = document.getElementById('projects');
    if (!projects) return;

    const projectCards = projects.querySelectorAll('.project-card');

    // Stagger reveal project cards
    projectCards.forEach((card, index) => {
      const trigger = gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: this.settings.timings.fadeInDuration,
        delay: index * this.settings.timings.staggerDelay,
        ease: this.settings.easing.default,
      });
      this.scrollTriggers.push(trigger);

      // Image parallax effect
      const image = card.querySelector('.project-card__image');
      if (image) {
        const imageTrigger = gsap.to(image, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: this.settings.timings.parallaxScrub,
          },
          y: '-20%',
          ease: 'none',
        });
        this.scrollTriggers.push(imageTrigger);
      }
    });
  }

  /**
   * Experience section animations
   */
  animateExperience() {
    const experience = document.getElementById('experience');
    if (!experience) return;

    // Timeline line drawing animation
    const timelineLine = experience.querySelector('.timeline__line');
    if (timelineLine) {
      const trigger = gsap.from(timelineLine, {
        scrollTrigger: {
          trigger: experience.querySelector('.timeline'),
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: this.settings.timings.parallaxScrub,
        },
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'none',
      });
      this.scrollTriggers.push(trigger);
    }

    // Timeline entries fade-in
    const timelineEntries = experience.querySelectorAll('.timeline__entry');
    timelineEntries.forEach((entry, index) => {
      const trigger = gsap.to(entry, {
        scrollTrigger: {
          trigger: entry,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: this.settings.easing.default,
      });
      this.scrollTriggers.push(trigger);
    });

    // Skills bar fill animation
    const skillBars = experience.querySelectorAll('.skill-bar');
    skillBars.forEach((bar, index) => {
      const skillLevel = bar.style.getPropertyValue('--skill-level') || '0%';
      const trigger = gsap.from(bar, {
        scrollTrigger: {
          trigger: bar,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        width: '0%',
        duration: this.settings.timings.revealDuration,
        delay: index * this.settings.timings.staggerDelay,
        ease: this.settings.easing.smooth,
        onStart: () => {
          bar.style.width = skillLevel;
        },
      });
      this.scrollTriggers.push(trigger);
    });
  }

  /**
   * Awards section animations
   */
  animateAwards() {
    const awards = document.getElementById('awards');
    if (!awards) return;

    const awardCards = awards.querySelectorAll('.award-card');

    // Stagger grid reveal with spring easing
    awardCards.forEach((card, index) => {
      const trigger = gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.08,
        ease: this.settings.easing.spring,
      });
      this.scrollTriggers.push(trigger);
    });
  }

  /**
   * Contact section animations
   */
  animateContact() {
    const contact = document.getElementById('contact');
    if (!contact) return;

    // Form fields sequential fade-in
    const formFields = contact.querySelectorAll('.form-field, .contact__form input, .contact__form textarea');
    formFields.forEach((field, index) => {
      const trigger = gsap.to(field, {
        scrollTrigger: {
          trigger: field,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: this.settings.easing.default,
      });
      this.scrollTriggers.push(trigger);
    });

    // Social links stagger
    const socialLinks = contact.querySelectorAll('.contact__social a, .social-link');
    if (socialLinks.length > 0) {
      const trigger = gsap.from(socialLinks, {
        scrollTrigger: {
          trigger: socialLinks[0],
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: this.settings.easing.default,
      });
      this.scrollTriggers.push(trigger);
    }
  }

  /**
   * Reusable animation functions
   */

  /**
   * Fade-in-up animation for elements
   */
  fadeInUp(target, options = {}) {
    const defaults = {
      y: 50,
      opacity: 0,
      duration: this.settings.timings.fadeInDuration,
      ease: this.settings.easing.default,
      stagger: 0,
      scrollTrigger: null,
    };

    const config = { ...defaults, ...options };

    const trigger = gsap.from(target, config);
    if (config.scrollTrigger) {
      this.scrollTriggers.push(trigger);
    }
    return trigger;
  }

  /**
   * Stagger animation for lists/grids
   */
  staggerReveal(targets, options = {}) {
    const defaults = {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: this.settings.timings.staggerDelay,
      ease: this.settings.easing.default,
      scrollTrigger: null,
    };

    const config = { ...defaults, ...options };

    const trigger = gsap.from(targets, config);
    if (config.scrollTrigger) {
      this.scrollTriggers.push(trigger);
    }
    return trigger;
  }

  /**
   * Parallax effect for images/backgrounds
   */
  parallax(target, options = {}) {
    const defaults = {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: target,
        start: 'top bottom',
        end: 'bottom top',
        scrub: this.settings.timings.parallaxScrub,
      },
    };

    const config = { ...defaults, ...options };

    const trigger = gsap.to(target, config);
    this.scrollTriggers.push(trigger);
    return trigger;
  }

  /**
   * Scale and reveal animation for cards
   */
  scaleReveal(target, options = {}) {
    const defaults = {
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: this.settings.easing.default,
      scrollTrigger: null,
    };

    const config = { ...defaults, ...options };

    const trigger = gsap.from(target, config);
    if (config.scrollTrigger) {
      this.scrollTriggers.push(trigger);
    }
    return trigger;
  }

  /**
   * Line drawing animation for SVG paths or progress bars
   */
  drawLine(target, options = {}) {
    const defaults = {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: null,
    };

    const config = { ...defaults, ...options };

    // For SVG paths, use strokeDashoffset
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (element?.tagName === 'path') {
      const length = element.getTotalLength();
      element.style.strokeDasharray = length;
      element.style.strokeDashoffset = length;

      const trigger = gsap.to(element, {
        strokeDashoffset: 0,
        ...config,
      });

      if (config.scrollTrigger) {
        this.scrollTriggers.push(trigger);
      }
      return trigger;
    }

    // For regular elements, use scaleY
    const trigger = gsap.from(target, config);
    if (config.scrollTrigger) {
      this.scrollTriggers.push(trigger);
    }
    return trigger;
  }

  /**
   * Set up window resize handler
   */
  setupResizeHandler() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.refresh();
      }, 250);
    });
  }

  /**
   * Refresh ScrollTrigger instances
   */
  refresh() {
    ScrollTrigger.refresh();
    if (this.lenis) {
      this.lenis.resize();
    }
    console.log('ScrollAnimations: Refreshed');
  }

  /**
   * Scroll to specific position or element
   */
  scrollTo(target, options = {}) {
    if (this.lenis) {
      this.lenis.scrollTo(target, {
        offset: options.offset || 0,
        duration: options.duration || 1.2,
        easing: options.easing || this.settings.lenis.easing,
        ...options,
      });
    } else {
      // Fallback for when Lenis is not available
      const element = typeof target === 'string' 
        ? document.querySelector(target) 
        : target;
      
      if (element instanceof HTMLElement) {
        element.scrollIntoView({ behavior: 'smooth', ...options });
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      }
    }
  }

  /**
   * Stop smooth scroll
   */
  stop() {
    if (this.lenis) {
      this.lenis.stop();
    }
  }

  /**
   * Start smooth scroll
   */
  start() {
    if (this.lenis) {
      this.lenis.start();
    }
  }

  /**
   * Destroy all animations and clean up
   */
  destroy() {
    console.log('ScrollAnimations: Destroying...');

    // Kill all ScrollTriggers
    this.scrollTriggers.forEach(trigger => {
      if (trigger.scrollTrigger) {
        trigger.scrollTrigger.kill();
      }
    });
    this.scrollTriggers = [];

    // Kill all ScrollTrigger instances
    ScrollTrigger.killAll();

    // Destroy Lenis
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }

    this.isInitialized = false;
    console.log('ScrollAnimations: Destroyed');
  }
}

// Export singleton instance
const scrollAnimations = new ScrollAnimations();
export default scrollAnimations;