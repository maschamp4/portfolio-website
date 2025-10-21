/**
 * Magnetic Hover Effect
 * Creates smooth magnetic attraction effect for interactive elements
 * Reference: ANIMATION_SPECS.md lines 777-806
 */

import { gsap } from 'gsap';

class MagneticEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      strength: options.strength || 0.5,
      speed: options.speed || 0.3,
      scale: options.scale || 1.05,
      tolerance: options.tolerance || 0.8,
      ...options,
    };

    this.rect = null;
    this.isActive = false;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  /**
   * Initialize magnetic effect
   */
  init() {
    if (this.prefersReducedMotion) {
      console.log('MagneticEffect: Reduced motion detected, skipping magnetic effect');
      return;
    }

    this.updateRect();
    this.bindEvents();
  }

  /**
   * Update element bounding rect
   */
  updateRect() {
    this.rect = this.element.getBoundingClientRect();
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    this.element.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.element.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.element.addEventListener('mouseleave', this.onMouseLeave.bind(this));

    // Update rect on scroll and resize
    window.addEventListener('scroll', this.updateRect.bind(this), { passive: true });
    window.addEventListener('resize', this.updateRect.bind(this));
  }

  /**
   * Handle mouse enter
   */
  onMouseEnter() {
    this.isActive = true;
    this.updateRect();

    // Scale up on hover
    gsap.to(this.element, {
      scale: this.options.scale,
      duration: this.options.speed,
      ease: 'power2.out',
    });
  }

  /**
   * Handle mouse move
   * @param {MouseEvent} event - Mouse event
   */
  onMouseMove(event) {
    if (!this.isActive || !this.rect) return;

    // Calculate mouse position relative to element center
    const centerX = this.rect.left + this.rect.width / 2;
    const centerY = this.rect.top + this.rect.height / 2;
    
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    // Calculate distance from center
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = Math.max(this.rect.width, this.rect.height) / 2;

    // Only apply effect within tolerance range
    if (distance < maxDistance * this.options.tolerance) {
      // Calculate magnetic pull
      const moveX = deltaX * this.options.strength;
      const moveY = deltaY * this.options.strength;

      // Apply magnetic movement
      gsap.to(this.element, {
        x: moveX,
        y: moveY,
        duration: this.options.speed,
        ease: 'power2.out',
      });
    }
  }

  /**
   * Handle mouse leave
   */
  onMouseLeave() {
    this.isActive = false;

    // Reset position and scale with spring easing
    gsap.to(this.element, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  }

  /**
   * Destroy magnetic effect and clean up
   */
  destroy() {
    this.element.removeEventListener('mouseenter', this.onMouseEnter);
    this.element.removeEventListener('mousemove', this.onMouseMove);
    this.element.removeEventListener('mouseleave', this.onMouseLeave);
    
    window.removeEventListener('scroll', this.updateRect);
    window.removeEventListener('resize', this.updateRect);

    // Reset element transforms
    gsap.set(this.element, { clearProps: 'all' });
  }
}

/**
 * Initialize magnetic effect on multiple elements
 * @param {string|NodeList|Array} selector - Elements to apply effect to
 * @param {Object} options - Effect options
 * @returns {Array} Array of MagneticEffect instances
 */
export function initMagneticElements(selector, options = {}) {
  const elements = typeof selector === 'string' 
    ? document.querySelectorAll(selector)
    : selector;

  const instances = [];

  elements.forEach(element => {
    const instance = new MagneticEffect(element, options);
    instances.push(instance);
  });

  console.log(`MagneticEffect: Initialized ${instances.length} magnetic elements`);
  return instances;
}

/**
 * Destroy multiple magnetic effect instances
 * @param {Array} instances - Array of MagneticEffect instances
 */
export function destroyMagneticElements(instances) {
  if (!Array.isArray(instances)) return;
  
  instances.forEach(instance => {
    if (instance && instance.destroy) {
      instance.destroy();
    }
  });

  console.log(`MagneticEffect: Destroyed ${instances.length} magnetic elements`);
}

export default MagneticEffect;