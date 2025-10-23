/**
 * Main Application Entry Point
 * Initializes all core functionality and components
 */

// Import styles
import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';
import './styles/auth.css';

// Import content data
import { content } from './data/content.js';

// Import authentication
import Auth from './components/Auth.js';

// Import utility classes
import eventBus from './utils/EventBus.js';

// Import components
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import Projects from './components/Projects.js';
import Experience from './components/Experience.js';
import Awards from './components/Awards.js';
import Contact from './components/Contact.js';

// Import Three.js scene
import MorphingShape from './three/MorphingShape.js';

// Import animations
import scrollAnimations from './animations/ScrollAnimations.js';
import { initMagneticElements, destroyMagneticElements } from './animations/MagneticEffect.js';

/**
 * Application state
 */
const state = {
  isInitialized: false,
  isAuthenticated: false,
  scrollY: 0,
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  isMobile: window.innerWidth < 768,
  isTouch: 'ontouchstart' in window,
  components: new Map(),
  threeScene: null, // Three.js morphing shape instance
  scrollAnimations: null, // Scroll animations instance
  magneticElements: [], // Magnetic effect instances
  auth: null, // Authentication instance
};

/**
 * Initialize scroll animations
 * Initializes Lenis smooth scroll and GSAP ScrollTrigger animations
 */
async function initScrollAnimations() {
  console.log('Initializing scroll animations...');
  
  try {
    await scrollAnimations.init();
    state.scrollAnimations = scrollAnimations;
    console.log('Scroll animations initialized successfully');
  } catch (error) {
    console.error('Error initializing scroll animations:', error);
    console.log('Continuing without scroll animations...');
  }
}

/**
 * Initialize magnetic hover effects
 * Applies magnetic effect to buttons and interactive elements
 */
function initMagneticEffects() {
  console.log('Initializing magnetic effects...');
  
  try {
    // Apply to all buttons and links with specific classes
    const magneticSelectors = [
      '.btn',
      '.hero__cta',
      '.project-card__link',
      'button',
      'a.magnetic',
    ];
    
    magneticSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        const instances = initMagneticElements(elements, {
          strength: 0.5,
          speed: 0.3,
          scale: 1.05,
        });
        state.magneticElements.push(...instances);
      }
    });
    
    console.log(`Magnetic effects initialized on ${state.magneticElements.length} elements`);
  } catch (error) {
    console.error('Error initializing magnetic effects:', error);
  }
}

/**
 * Initialize Three.js scene
 * Creates and initializes the morphing shape animation
 */
async function initThreeScene() {
  console.log('=== Starting Three.js Initialization ===');
  console.log('Current timestamp:', Date.now());
  
  try {
    // Get or create canvas element
    let canvas = document.getElementById('three-canvas');
    console.log('Canvas element lookup:', canvas ? 'Found existing canvas' : 'Canvas not found, will create');
    
    if (!canvas) {
      console.log('Creating new canvas element...');
      // Create canvas element if it doesn't exist
      canvas = document.createElement('canvas');
      canvas.id = 'three-canvas';
      // Don't set inline styles - let global.css handle it with proper z-index
      // The canvas styling is defined in global.css with z-index: var(--z-three-canvas) which is -1
      
      console.log('Canvas created with styles:', canvas.style.cssText);
      
      // Insert canvas as first child of body
      const hero = document.getElementById('hero');
      if (hero) {
        console.log('Inserting canvas into hero section');
        hero.insertBefore(canvas, hero.firstChild);
      } else {
        console.log('Hero section not found, inserting canvas at body start');
        document.body.insertBefore(canvas, document.body.firstChild);
      }
      console.log('Canvas inserted into DOM at:', canvas.parentElement?.tagName);
    }
    
    // Log canvas properties
    console.log('Canvas dimensions:', {
      width: canvas.width,
      height: canvas.height,
      clientWidth: canvas.clientWidth,
      clientHeight: canvas.clientHeight,
      offsetWidth: canvas.offsetWidth,
      offsetHeight: canvas.offsetHeight
    });
    
    console.log('Canvas computed styles:', {
      position: getComputedStyle(canvas).position,
      zIndex: getComputedStyle(canvas).zIndex,
      display: getComputedStyle(canvas).display,
      visibility: getComputedStyle(canvas).visibility,
      opacity: getComputedStyle(canvas).opacity
    });
    
    // Initialize morphing shape
    console.log('Creating MorphingShape instance...');
    state.threeScene = new MorphingShape(canvas);
    
    console.log('Calling MorphingShape.init()...');
    const initResult = await state.threeScene.init();
    console.log('MorphingShape.init() returned:', initResult);
    
    // Verify scene is rendering
    console.log('Three.js scene state:', {
      sceneExists: !!state.threeScene.scene,
      cameraExists: !!state.threeScene.camera,
      rendererExists: !!state.threeScene.renderer,
      isPlaying: state.threeScene.isPlaying,
      liquidGroupExists: !!state.threeScene.liquidGroup,
      liquidGroupChildren: state.threeScene.liquidGroup?.children.length
    });
    
    console.log('=== Three.js Initialization Complete ===');
  } catch (error) {
    console.error('!!! ERROR in Three.js initialization !!!');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.log('Continuing without 3D effects...');
  }
}

/**
 * Refresh scroll animations
 * Call this when DOM content changes dynamically
 */
function refreshScrollAnimations() {
  if (state.scrollAnimations) {
    state.scrollAnimations.refresh();
    console.log('Scroll animations refreshed');
  }
}


/**
 * Initialize all components
 */
async function initComponents() {
  console.log('Initializing components...');

  try {
    // Initialize Header
    const header = new Header();
    await header.init();
    state.components.set('header', header);

    // Initialize Hero
    const hero = new Hero();
    await hero.init();
    state.components.set('hero', hero);

    // Initialize Projects
    const projects = new Projects();
    await projects.init();
    state.components.set('projects', projects);

    // Initialize Experience
    const experience = new Experience();
    await experience.init();
    state.components.set('experience', experience);

    // Initialize Awards
    const awards = new Awards();
    await awards.init();
    state.components.set('awards', awards);

    // Initialize Contact
    const contact = new Contact();
    await contact.init();
    state.components.set('contact', contact);

    console.log(`All components initialized successfully (${state.components.size} components)`);
  } catch (error) {
    console.error('Error initializing components:', error);
  }
}

/**
 * Handle window resize
 */
function handleResize() {
  state.windowWidth = window.innerWidth;
  state.windowHeight = window.innerHeight;
  state.isMobile = window.innerWidth < 768;
  
  // Notify Three.js scene of resize (it has its own handler but this ensures coordination)
  if (state.threeScene) {
    // The MorphingShape class already handles resize internally
    console.log('Window resized - Three.js scene will update');
  }
  
  // Refresh scroll animations on resize
  refreshScrollAnimations();
}

/**
 * Initialize application (after authentication)
 */
async function initApp() {
  if (state.isInitialized) return;
  
  console.log('Initializing Mascha Portfolio...');
  console.log('Content loaded:', content);
  
  // Step 1: Initialize all components first
  await initComponents();
  
  // Step 2: Initialize Three.js scene
  await initThreeScene();
  
  // Step 3: Initialize scroll animations (must be last to capture all DOM elements)
  await initScrollAnimations();
  
  // Step 4: Initialize magnetic effects on interactive elements
  initMagneticEffects();
  
  // Set up event listeners
  window.addEventListener('resize', handleResize);
  
  state.isInitialized = true;
  console.log('Application initialized successfully!');
}

/**
 * Initialize authentication and check access
 */
async function init() {
  console.log('Starting authentication check...');
  
  // Initialize authentication
  state.auth = new Auth();
  const isAuthenticated = await state.auth.init();
  state.isAuthenticated = isAuthenticated;
  
  if (isAuthenticated) {
    // User is already authenticated, initialize app immediately
    console.log('User already authenticated, initializing app...');
    await initApp();
  } else {
    // Wait for authentication event
    console.log('Waiting for user authentication...');
    window.addEventListener('authenticated', async () => {
      console.log('Authentication successful, initializing app...');
      state.isAuthenticated = true;
      await initApp();
    });
  }
}

/**
 * Cleanup on page unload
 */
function cleanup() {
  console.log('Cleaning up application...');
  
  // Destroy scroll animations
  if (state.scrollAnimations) {
    state.scrollAnimations.destroy();
    state.scrollAnimations = null;
  }
  
  // Destroy magnetic effects
  if (state.magneticElements.length > 0) {
    destroyMagneticElements(state.magneticElements);
    state.magneticElements = [];
  }
  
  // Destroy Three.js scene
  if (state.threeScene) {
    state.threeScene.destroy();
    state.threeScene = null;
  }
  
  // Cleanup components
  state.components.forEach((component, name) => {
    if (component.destroy && typeof component.destroy === 'function') {
      console.log(`Destroying component: ${name}`);
      component.destroy();
    }
  });
  state.components.clear();
}

/**
 * Start application when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/**
 * Cleanup on page unload
 */
window.addEventListener('beforeunload', cleanup);

/**
 * Export for potential external access
 */
export { state, content, eventBus, refreshScrollAnimations };