/**
 * ScrollController
 * Simplified controller - NO scroll transformations applied to shape
 * Shape remains FIXED in background while content scrolls over it
 */

export default class ScrollController {
  /**
   * @param {THREE.Mesh} mesh - The morphing shape mesh (unused for transformations)
   * @param {THREE.Camera} camera - The Three.js camera (unused for transformations)
   */
  constructor(mesh, camera) {
    this.mesh = mesh;
    this.camera = camera;
    
    // Scroll tracking (kept for potential future use)
    this.scrollY = 0;
    this.targetScrollY = 0;
    this.scrollProgress = 0;
    this.easedScrollProgress = 0;
    
    // Hero section height
    this.heroHeight = window.innerHeight;
    
    // Bind methods
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
    
    // Initialize
    this.init();
  }
  
  /**
   * Initialize scroll controller
   */
  init() {
    // Calculate hero height
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      this.heroHeight = heroElement.offsetHeight;
    }
    
    // Add event listeners
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleResize, { passive: true });
    
    // Initial scroll update
    this.handleScroll();
  }
  
  /**
   * Handle scroll event
   */
  handleScroll() {
    this.targetScrollY = window.pageYOffset || window.scrollY || 0;
  }
  
  /**
   * Handle window resize
   */
  handleResize() {
    // Recalculate hero height
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      this.heroHeight = heroElement.offsetHeight;
    }
  }
  
  /**
   * Update scroll controller (call this in animation loop)
   * NO TRANSFORMATIONS APPLIED - shape stays fixed
   */
  update(deltaTime = 0.016) {
    if (!this.mesh) return;
    
    // Track scroll for potential future use, but apply NO transformations
    this.scrollY += (this.targetScrollY - this.scrollY) * 0.1;
    this.scrollProgress = Math.min(Math.max(this.scrollY / this.heroHeight, 0), 1);
    this.easedScrollProgress += (this.scrollProgress - this.easedScrollProgress) * 0.1;
    
    // Shape stays FIXED - no position, rotation, or scale updates
    // All animation comes from MorphingShape.js internal animation only
  }
  
  /**
   * Get current scroll progress
   * @returns {number} Scroll progress (0 to 1)
   */
  getScrollProgress() {
    return this.easedScrollProgress;
  }
  
  /**
   * Get raw scroll position
   * @returns {number} Scroll Y position in pixels
   */
  getScrollY() {
    return this.scrollY;
  }
  
  /**
   * Cleanup and remove event listeners
   */
  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    this.mesh = null;
    this.camera = null;
  }
}