/**
 * Header Component
 * Main navigation with scroll behavior and mobile menu
 * Reference: COMPONENTS.md lines 89-361
 */

import eventBus from '../utils/EventBus.js';

class Header {
  constructor() {
    // Main element references
    this.element = document.getElementById('header') || document.querySelector('.header');
    
    if (!this.element) {
      console.warn('Header: Header element not found');
      return;
    }

    this.nav = this.element.querySelector('nav');
    this.menuToggle = this.element.querySelector('.menu-toggle') || 
                      this.element.querySelector('.nav__toggle');
    this.navLinks = Array.from(this.element.querySelectorAll('.nav-link') || 
                               this.element.querySelectorAll('.nav__link'));
    
    // State
    this.isMenuOpen = false;
    this.lastScrollY = 0;
    this.isScrolling = false;
    this.scrollTimeout = null;
    
    // Observers
    this.intersectionObserver = null;
  }

  /**
   * Initialize header component
   */
  init() {
    if (!this.element) return;

    console.log('Header: Initializing...');

    this.setupEventListeners();
    this.setupScrollBehavior();
    this.setupActiveSection();
    this.setupMagneticEffect();

    console.log('Header: Initialized successfully');
  }

  /**
   * Set up all event listeners
   */
  setupEventListeners() {
    // Mobile menu toggle
    if (this.menuToggle) {
      this.menuToggle.addEventListener('click', () => {
        this.toggleMenu();
      });
    }

    // Smooth scroll on nav link click
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        
        if (target && target.startsWith('#')) {
          this.scrollToSection(target);
          
          // Close mobile menu if open
          if (this.isMenuOpen) {
            this.toggleMenu();
          }

          // Emit navigation event
          eventBus.emit('navigation:clicked', { target });
        }
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.toggleMenu();
      }
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen && 
          !this.element.contains(e.target) && 
          !this.menuToggle.contains(e.target)) {
        this.toggleMenu();
      }
    });
  }

  /**
   * Set up scroll-based header behavior
   * Hides header on scroll down, shows on scroll up
   * Adds background when scrolled past threshold
   */
  setupScrollBehavior() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      this.isScrolling = true;

      // Clear existing timeout
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }

      // Set timeout to detect scroll end
      this.scrollTimeout = setTimeout(() => {
        this.isScrolling = false;
        eventBus.emit('scroll:end');
      }, 150);

      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Handle scroll behavior
   */
  handleScroll() {
    const scrollY = window.scrollY;

    // Hide/show header based on scroll direction
    if (scrollY > this.lastScrollY && scrollY > 100) {
      // Scrolling down
      this.element.classList.add('header--hidden');
    } else {
      // Scrolling up
      this.element.classList.remove('header--hidden');
    }

    // Add background on scroll
    if (scrollY > 50) {
      this.element.classList.add('header--scrolled');
    } else {
      this.element.classList.remove('header--scrolled');
    }

    // Emit scroll progress event
    const scrollProgress = Math.min(scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1);
    eventBus.emit('scroll:progress', { scrollY, scrollProgress });

    this.lastScrollY = scrollY;
  }

  /**
   * Set up active section tracking with Intersection Observer
   */
  setupActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length === 0) {
      console.warn('Header: No sections found for active tracking');
      return;
    }

    // Intersection Observer options
    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is in middle third of viewport
      threshold: 0
    };

    // Create observer
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.setActiveLink(entry.target.id);
          
          // Emit active section change event
          eventBus.emit('section:active', { 
            sectionId: entry.target.id 
          });
        }
      });
    }, options);

    // Observe all sections
    sections.forEach(section => {
      this.intersectionObserver.observe(section);
    });
  }

  /**
   * Set active navigation link
   * @param {string} sectionId - ID of active section
   */
  setActiveLink(sectionId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      
      const href = link.getAttribute('href');
      if (href === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Set up magnetic hover effect for nav items
   * Placeholder for GSAP implementation
   */
  setupMagneticEffect() {
    // TODO: Implement magnetic hover effect with GSAP
    // This will be implemented when GSAP is integrated
    
    this.navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.transition = 'transform 0.3s ease';
      });

      link.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return; // Skip on mobile

        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Subtle magnetic effect
        const moveX = x * 0.2;
        const moveY = y * 0.2;
        
        link.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });

      link.addEventListener('mouseleave', () => {
        link.style.transform = 'translate(0, 0)';
      });
    });
  }

  /**
   * Toggle mobile menu
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    // Update element classes
    this.element.classList.toggle('menu-open', this.isMenuOpen);
    
    // Update menu toggle aria attributes
    if (this.menuToggle) {
      this.menuToggle.setAttribute('aria-expanded', this.isMenuOpen);
      this.menuToggle.classList.toggle('active', this.isMenuOpen);
    }

    // Prevent body scroll when menu is open
    document.body.classList.toggle('no-scroll', this.isMenuOpen);
    
    // Emit menu state event
    eventBus.emit('menu:toggle', { isOpen: this.isMenuOpen });

    console.log(`Header: Menu ${this.isMenuOpen ? 'opened' : 'closed'}`);
  }

  /**
   * Scroll to section smoothly
   * @param {string} target - Target selector (e.g., '#projects')
   */
  scrollToSection(target) {
    const element = document.querySelector(target);
    
    if (!element) {
      console.warn(`Header: Section "${target}" not found`);
      return;
    }

    const offset = 80; // Header height offset
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    console.log(`Header: Scrolling to ${target}`);
  }

  /**
   * Update header visibility
   * @param {boolean} visible - Show or hide header
   */
  setVisibility(visible) {
    if (visible) {
      this.element.classList.remove('header--hidden');
    } else {
      this.element.classList.add('header--hidden');
    }
  }

  /**
   * Get current active section
   * @returns {string|null} Active section ID
   */
  getActiveSection() {
    const activeLink = this.element.querySelector('.nav-link.active, .nav__link.active');
    if (activeLink) {
      const href = activeLink.getAttribute('href');
      return href ? href.replace('#', '') : null;
    }
    return null;
  }

  /**
   * Destroy component and clean up
   */
  destroy() {
    console.log('Header: Destroying...');

    // Disconnect intersection observer
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }

    // Clear scroll timeout
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }

    // Remove classes from body
    document.body.classList.remove('no-scroll');

    // Clean up would go here if we stored event listeners in arrays
    // For now, listeners will be garbage collected when component is destroyed

    console.log('Header: Destroyed');
  }
}

export default Header;