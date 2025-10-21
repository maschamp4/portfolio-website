/**
 * Projects Component
 * Showcase featured projects with hover effects and scroll animations
 * Reference: COMPONENTS.md lines 296-602
 */

import eventBus from '../utils/EventBus.js';
import { projects } from '../data/content.js';
import { gsap } from 'gsap';

class Projects {
  constructor() {
    // Main element references
    this.element = document.getElementById('projects') || document.querySelector('.projects');
    
    if (!this.element) {
      console.warn('Projects: Projects element not found');
      return;
    }

    this.grid = this.element.querySelector('.projects__grid');
    this.projectCards = [];
    
    // State
    this.projects = projects;
    this.isInitialized = false;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Intersection observer for lazy loading
    this.imageObserver = null;
    
    // Store animations for cleanup
    this.animations = [];
  }

  /**
   * Initialize projects component
   */
  init() {
    if (!this.element) return;

    console.log('Projects: Initializing...');

    this.renderProjects();
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupImageLazyLoading();
    this.setupModalSetup();

    this.isInitialized = true;
    console.log('Projects: Initialized successfully');
  }

  /**
   * Render project cards from content data
   */
  renderProjects() {
    if (!this.grid) {
      console.warn('Projects: Grid container not found');
      return;
    }

    // Filter for featured projects
    const featuredProjects = this.projects.filter(project => project.featured);

    if (featuredProjects.length === 0) {
      console.warn('Projects: No featured projects found');
      return;
    }

    // Clear existing content
    this.grid.innerHTML = '';

    // Render each project card
    featuredProjects.forEach((project, index) => {
      const card = this.createProjectCard(project, index);
      this.grid.appendChild(card);
    });

    // Store card references
    this.projectCards = Array.from(this.grid.querySelectorAll('.project-card'));

    console.log(`Projects: Rendered ${featuredProjects.length} featured projects`);
  }

  /**
   * Create project card HTML element
   * @param {Object} project - Project data object
   * @param {number} index - Project index
   * @returns {HTMLElement} Project card element
   */
  createProjectCard(project, index) {
    const card = document.createElement('article');
    card.className = `project-card project-card--${index % 2 === 0 ? 'left' : 'right'}`;
    card.setAttribute('data-project-id', project.id);
    card.setAttribute('data-index', index);

    // Build technologies/tags list
    const tagsHTML = project.technologies
      .slice(0, 5) // Limit to first 5 technologies
      .map(tech => `<li class="tag">${tech}</li>`)
      .join('');

    // Create card HTML
    card.innerHTML = `
      <div class="project-card__image-wrapper">
        <img 
          class="project-card__image" 
          data-src="${project.images.hero}" 
          alt="${project.title}"
          loading="lazy"
        />
        <div class="project-card__overlay">
          <a href="${project.link || '#'}" class="project-card__link" data-project="${project.id}">
            View Case Study →
          </a>
        </div>
      </div>
      
      <div class="project-card__content">
        <span class="project-card__category">${project.category}</span>
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__description">${project.description}</p>
        
        <div class="project-card__meta">
          <span class="project-card__role">${project.role}</span>
          <span class="project-card__year">${project.year}</span>
        </div>
        
        <ul class="project-card__tags">
          ${tagsHTML}
        </ul>
      </div>
    `;

    return card;
  }

  /**
   * Set up scroll-triggered animations for project cards
   * Note: Main scroll animations are handled by ScrollAnimations.js
   * This method only sets up component-specific interactions
   */
  setupScrollAnimations() {
    // The global ScrollAnimations.js handles the card reveal animations
    // We only need to ensure cards are ready for animation
    this.projectCards.forEach((card) => {
      // Set initial state for GSAP animations
      if (!this.prefersReducedMotion) {
        gsap.set(card, {
          opacity: 0,
          y: 100,
          scale: 0.95,
        });
      }

      // Set up image parallax for each card
      const image = card.querySelector('.project-card__image');
      if (image) {
        this.setupImageParallax(card, image);
      }
    });
  }

  /**
   * Set up image parallax effect with GSAP
   * @param {HTMLElement} card - Project card element
   * @param {HTMLElement} image - Image element
   */
  setupImageParallax(card, image) {
    if (this.prefersReducedMotion) {
      return;
    }

    // Use GSAP ScrollTrigger for smooth parallax
    // Note: This is handled automatically by ScrollAnimations.js
    // but we can set initial state here
    gsap.set(image, {
      y: 0,
    });
  }

  /**
   * Set up hover effects for project cards
   * Uses GSAP for smooth animations
   */
  setupHoverEffects() {
    this.projectCards.forEach(card => {
      const image = card.querySelector('.project-card__image');
      const overlay = card.querySelector('.project-card__overlay');
      const imageWrapper = card.querySelector('.project-card__image-wrapper');

      if (!image || !overlay) return;

      // Set initial overlay state
      gsap.set(overlay, { opacity: 0 });

      // Mouse enter - scale image and show overlay with GSAP
      card.addEventListener('mouseenter', () => {
        if (this.prefersReducedMotion) {
          overlay.style.opacity = '1';
          return;
        }

        gsap.to(image, {
          scale: 1.1,
          duration: 0.6,
          ease: 'power2.out',
        });
        
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        });

        eventBus.emit('project:hover', { projectId: card.dataset.projectId });
      });

      // Mouse leave - reset with GSAP
      card.addEventListener('mouseleave', () => {
        if (this.prefersReducedMotion) {
          overlay.style.opacity = '0';
          return;
        }

        gsap.to(image, {
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
        });
        
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      // Subtle lift effect on card hover
      card.addEventListener('mouseenter', () => {
        if (this.prefersReducedMotion) return;

        gsap.to(card, {
          y: -5,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        if (this.prefersReducedMotion) return;

        gsap.to(card, {
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      });
    });
  }

  /**
   * Set up lazy loading for project images
   */
  setupImageLazyLoading() {
    // Create intersection observer for images
    const imageObserverOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.01
    };

    this.imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          if (src) {
            this.loadImage(img, src);
            this.imageObserver.unobserve(img);
          }
        }
      });
    }, imageObserverOptions);

    // Observe all project images
    const images = this.element.querySelectorAll('img[data-src]');
    images.forEach(img => {
      this.imageObserver.observe(img);
    });

    console.log(`Projects: Lazy loading enabled for ${images.length} images`);
  }

  /**
   * Load image with fade-in effect
   * @param {HTMLImageElement} img - Image element
   * @param {string} src - Image source URL
   */
  loadImage(img, src) {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';

    const tempImg = new Image();
    tempImg.onload = () => {
      img.src = src;
      img.removeAttribute('data-src');
      
      // Fade in image
      setTimeout(() => {
        img.style.opacity = '1';
      }, 50);
    };

    tempImg.onerror = () => {
      console.error(`Projects: Failed to load image: ${src}`);
      // Set placeholder or error image
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3C/svg%3E';
      img.style.opacity = '0.3';
    };

    tempImg.src = src;
  }

  /**
   * Set up modal/detail view for project case studies
   * Basic structure - full implementation would require modal component
   */
  setupModalSetup() {
    const projectLinks = this.element.querySelectorAll('.project-card__link');

    projectLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const projectId = link.getAttribute('data-project');
        const project = this.projects.find(p => p.id === projectId);

        if (project) {
          this.openProjectDetail(project);
        }
      });
    });
  }

  /**
   * Open project detail view
   * @param {Object} project - Project data
   */
  openProjectDetail(project) {
    console.log('Projects: Opening detail for', project.title);
    
    // Emit event for modal/detail view
    eventBus.emit('project:detail-opened', { project });

    // TODO: Implement modal component
    // For now, just log or show alert
    alert(`Project detail view coming soon!\n\nProject: ${project.title}\n${project.longDescription}`);
    
    // Future implementation would:
    // 1. Create/show modal overlay
    // 2. Populate modal with project details
    // 3. Add close functionality
    // 4. Handle escape key and backdrop clicks
  }

  /**
   * Filter projects by category
   * @param {string} category - Category to filter by (or 'all')
   */
  filterByCategory(category) {
    if (category === 'all') {
      this.projects = projects;
    } else {
      this.projects = projects.filter(p => p.category === category);
    }

    this.renderProjects();
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupImageLazyLoading();

    console.log(`Projects: Filtered by category: ${category}`);
  }

  /**
   * Get project by ID
   * @param {string} id - Project ID
   * @returns {Object|null} Project data or null
   */
  getProjectById(id) {
    return this.projects.find(project => project.id === id) || null;
  }

  /**
   * Refresh project cards (for dynamic updates)
   */
  refresh() {
    this.renderProjects();
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupImageLazyLoading();
    this.setupModalSetup();
    
    console.log('Projects: Refreshed');
  }

  /**
   * Destroy component and clean up
   */
  destroy() {
    console.log('Projects: Destroying...');

    // Disconnect image observer
    if (this.imageObserver) {
      this.imageObserver.disconnect();
      this.imageObserver = null;
    }

    // Kill all GSAP animations
    this.animations.forEach(anim => {
      if (anim && anim.kill) {
        anim.kill();
      }
    });
    this.animations = [];

    // Reset GSAP transforms on project cards
    this.projectCards.forEach(card => {
      gsap.set(card, { clearProps: 'all' });
      
      const image = card.querySelector('.project-card__image');
      const overlay = card.querySelector('.project-card__overlay');
      
      if (image) gsap.set(image, { clearProps: 'all' });
      if (overlay) gsap.set(overlay, { clearProps: 'all' });
    });

    // Clear project cards
    this.projectCards = [];

    console.log('Projects: Destroyed');
  }
}

export default Projects;