/**
 * Projects Component
 * Showcase featured projects with videos, image galleries, and Challenge/Approach format
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

    // Support both .projects__grid and #projects-list
    this.grid = this.element.querySelector('#projects-list') || 
                this.element.querySelector('.projects__grid');
    this.projectCards = [];
    
    // State
    this.projects = projects;
    this.isInitialized = false;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Intersection observer for lazy loading
    this.mediaObserver = null;
    
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
    this.setupMediaLazyLoading();
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

    // Filter for featured projects (or use all if featured flag not present)
    const featuredProjects = this.projects.filter(project => 
      project.featured !== false
    );

    if (featuredProjects.length === 0) {
      console.warn('Projects: No projects found');
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

    console.log(`Projects: Rendered ${featuredProjects.length} projects`);
  }

  /**
   * Create project card HTML element with proper structure
   * @param {Object} project - Project data object
   * @param {number} index - Project index
   * @returns {HTMLElement} Project card element
   */
  createProjectCard(project, index) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-project-id', project.id);
    card.setAttribute('data-index', index);

    // Create media section (video or image gallery)
    const mediaHTML = this.createMediaSection(project);

    // Parse description for Challenge/Approach format
    const descriptionHTML = this.parseDescription(project.description);

    // Build technologies/tags list
    const techHTML = project.technologies && project.technologies.length > 0
      ? `<div class="project__tech">
           ${project.technologies.map(tech => 
             `<span class="tech-tag">${tech}</span>`
           ).join('')}
         </div>`
      : '';

    // Create card HTML with proper structure
    card.innerHTML = `
      ${mediaHTML}
      
      <div class="project__content">
        <div class="project__meta">
          <span class="project__year">${project.year}</span>
          <span class="project__client">${project.client}</span>
        </div>
        
        <h3 class="project__title">${project.title}</h3>
        <p class="project__role">${project.shortDescription || `Role: ${project.role}`}</p>
        
        <div class="project__description">
          ${descriptionHTML}
        </div>
        
        ${techHTML}
      </div>
    `;

    return card;
  }

  /**
   * Create media section (video or image gallery)
   * @param {Object} project - Project data object
   * @returns {string} Media section HTML
   */
  createMediaSection(project) {
    // Check if project has video
    if (project.video) {
      // Check if it's a Vimeo or YouTube embed URL
      const isVimeo = project.video.includes('vimeo.com');
      const isYouTube = project.video.includes('youtube.com') || project.video.includes('youtu.be');
      
      if (isVimeo || isYouTube) {
        // Use iframe for video hosting platforms
        return `
          <div class="project__media">
            <div class="project__video-wrapper">
              <iframe
                class="project__video-iframe"
                src="${project.video}"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
                loading="lazy"
                title="${project.title} video"
              ></iframe>
            </div>
          </div>
        `;
      } else {
        // Use HTML5 video for local/direct video files
        return `
          <div class="project__media">
            <video
              class="project__video"
              data-src="${project.video}"
              autoplay
              muted
              loop
              playsinline
              aria-label="${project.title} video"
            >
              <source data-src="${project.video}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        `;
      }
    }
    
    // Check if project has image gallery
    if (project.images && project.images.gallery && project.images.gallery.length > 0) {
      const galleryHTML = project.images.gallery.map((imageSrc, idx) =>
        `<img
          class="project__gallery-image"
          data-src="${imageSrc}"
          alt="${project.title} - Image ${idx + 1}"
          loading="lazy"
        />`
      ).join('');
      
      const indicatorsHTML = project.images.gallery.map((_, idx) =>
        `<span class="project__gallery-indicator ${idx === 0 ? 'active' : ''}" data-index="${idx}"></span>`
      ).join('');
      
      return `
        <div class="project__media">
          <div class="project__gallery">
            <div class="project__gallery-container">
              ${galleryHTML}
            </div>
            ${project.images.gallery.length > 1 ? `
              <div class="project__gallery-nav">
                <button class="project__gallery-btn project__gallery-btn--prev" aria-label="Previous image">
                  ‹
                </button>
                <button class="project__gallery-btn project__gallery-btn--next" aria-label="Next image">
                  ›
                </button>
              </div>
              <div class="project__gallery-indicators">
                ${indicatorsHTML}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }
    
    // Fallback to hero image
    if (project.images && project.images.hero) {
      return `
        <div class="project__media">
          <img 
            class="project__image" 
            data-src="${project.images.hero}" 
            alt="${project.title}"
            loading="lazy"
          />
        </div>
      `;
    }

    // No media available
    return '<div class="project__media"></div>';
  }

  /**
   * Parse description to format Challenge/Approach sections
   * @param {string} description - Project description
   * @returns {string} Formatted description HTML
   */
  parseDescription(description) {
    if (!description) return '';

    // Split by double newline to separate paragraphs
    const paragraphs = description.split('\n\n').filter(p => p.trim());

    return paragraphs.map(para => {
      const trimmed = para.trim();
      
      // Check if it starts with "The Challenge:" or "The Approach:"
      if (trimmed.startsWith('The Challenge:') || trimmed.startsWith('The Approach:')) {
        // Split keyword from text
        const colonIndex = trimmed.indexOf(':');
        const keyword = trimmed.substring(0, colonIndex + 1);
        const text = trimmed.substring(colonIndex + 1);
        
        return `<p><span class="project__keyword">${keyword}</span><span class="project__text">${text}</span></p>`;
      }
      
      return `<p>${trimmed}</p>`;
    }).join('');
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

      // Set up media parallax for each card
      const media = card.querySelector('.project__media');
      if (media) {
        this.setupMediaParallax(card, media);
      }
    });
  }

  /**
   * Set up media parallax effect with GSAP
   * @param {HTMLElement} card - Project card element
   * @param {HTMLElement} media - Media element
   */
  setupMediaParallax(card, media) {
    if (this.prefersReducedMotion) {
      return;
    }

    // Use GSAP ScrollTrigger for smooth parallax
    // Note: This is handled automatically by ScrollAnimations.js
    // but we can set initial state here
    gsap.set(media, {
      y: 0,
    });
  }

  /**
   * Set up hover effects for project cards
   * Uses GSAP for smooth animations
   */
  setupHoverEffects() {
    this.projectCards.forEach(card => {
      const media = card.querySelector('.project__media');
      const video = card.querySelector('.project__video');
      const image = card.querySelector('.project__image, .project__gallery-image');

      if (!media) return;

      // Mouse enter - scale media
      card.addEventListener('mouseenter', () => {
        if (this.prefersReducedMotion) return;

        gsap.to(media, {
          scale: 1.05,
          duration: 0.6,
          ease: 'power2.out',
        });

        // Pause video on hover for better viewing
        if (video && !video.paused) {
          // Keep playing, just scale
        }

        eventBus.emit('project:hover', { projectId: card.dataset.projectId });
      });

      // Mouse leave - reset
      card.addEventListener('mouseleave', () => {
        if (this.prefersReducedMotion) return;

        gsap.to(media, {
          scale: 1,
          duration: 0.5,
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
   * Set up lazy loading for project videos and images
   */
  setupMediaLazyLoading() {
    // Create intersection observer for media
    const mediaObserverOptions = {
      root: null,
      rootMargin: '100px',
      threshold: 0.01
    };

    this.mediaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const media = entry.target;
          
          if (media.tagName === 'VIDEO') {
            this.loadVideo(media);
          } else if (media.tagName === 'IMG') {
            this.loadImage(media);
          }
          
          this.mediaObserver.unobserve(media);
        }
      });
    }, mediaObserverOptions);

    // Observe all videos
    const videos = this.element.querySelectorAll('video[data-src]');
    videos.forEach(video => {
      this.mediaObserver.observe(video);
    });

    // Observe all images
    const images = this.element.querySelectorAll('img[data-src]');
    images.forEach(img => {
      this.mediaObserver.observe(img);
    });

    console.log(`Projects: Lazy loading enabled for ${videos.length} videos and ${images.length} images`);
  }

  /**
   * Load video with fade-in effect
   * @param {HTMLVideoElement} video - Video element
   */
  loadVideo(video) {
    const src = video.getAttribute('data-src');
    if (!src) return;

    video.style.opacity = '0';
    video.style.transition = 'opacity 0.5s ease';

    // Get source element
    const source = video.querySelector('source[data-src]');
    
    if (source) {
      source.src = src;
      source.removeAttribute('data-src');
    }
    
    video.src = src;
    video.removeAttribute('data-src');

    // Handle load events
    video.addEventListener('loadeddata', () => {
      video.style.opacity = '1';
      video.play().catch(err => {
        console.warn('Projects: Video autoplay failed:', err);
      });
    }, { once: true });

    video.addEventListener('error', (e) => {
      console.error(`Projects: Failed to load video: ${src}`, e);
      video.style.opacity = '0.3';
      
      // Create fallback message
      const fallback = document.createElement('div');
      fallback.className = 'project__media-fallback';
      fallback.textContent = 'Video unavailable';
      video.parentElement.appendChild(fallback);
    }, { once: true });

    video.load();
  }

  /**
   * Load image with fade-in effect
   * @param {HTMLImageElement} img - Image element
   */
  loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;

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
      // Set placeholder
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23333" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" fill="%23999" text-anchor="middle"%3EImage unavailable%3C/text%3E%3C/svg%3E';
      img.style.opacity = '0.3';
    };

    tempImg.src = src;
  }

  /**
   * Set up modal/detail view for project case studies
   * Basic structure - full implementation would require modal component
   */
  setupModalSetup() {
    this.projectCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't trigger if clicking on a link or interactive element
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
          return;
        }
        
        // Don't trigger if interacting with gallery
        if (e.target.closest('.project__gallery')) {
          return;
        }

        const projectId = card.getAttribute('data-project-id');
        const project = this.projects.find(p => p.id === projectId);

        if (project) {
          this.openProjectDetail(project);
        }
      });

      // Add cursor pointer to indicate clickability
      card.style.cursor = 'pointer';
      
      // Setup gallery navigation for this card
      this.setupGalleryNavigation(card);
    });
  }

  /**
   * Setup interactive gallery navigation
   * @param {HTMLElement} card - Project card element
   */
  setupGalleryNavigation(card) {
    const gallery = card.querySelector('.project__gallery');
    if (!gallery) return;

    const container = gallery.querySelector('.project__gallery-container');
    const prevBtn = gallery.querySelector('.project__gallery-btn--prev');
    const nextBtn = gallery.querySelector('.project__gallery-btn--next');
    const indicators = gallery.querySelectorAll('.project__gallery-indicator');
    const images = gallery.querySelectorAll('.project__gallery-image');

    if (!container || images.length <= 1) return;

    let currentIndex = 0;

    // Scroll to specific image
    const scrollToImage = (index) => {
      if (index < 0 || index >= images.length) return;
      
      const image = images[index];
      const scrollLeft = image.offsetLeft - container.offsetLeft;
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
      
      currentIndex = index;
      updateIndicators();
    };

    // Update active indicator
    const updateIndicators = () => {
      indicators.forEach((indicator, idx) => {
        indicator.classList.toggle('active', idx === currentIndex);
      });
    };

    // Previous button
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
        scrollToImage(newIndex);
      });
    }

    // Next button
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        scrollToImage(newIndex);
      });
    }

    // Indicator clicks
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', (e) => {
        e.stopPropagation();
        scrollToImage(index);
      });
    });

    // Update current index based on scroll position
    let scrollTimeout;
    container.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.offsetWidth;
        
        // Find closest image
        let closestIndex = 0;
        let minDistance = Infinity;
        
        images.forEach((img, idx) => {
          const imgLeft = img.offsetLeft - container.offsetLeft;
          const distance = Math.abs(scrollLeft - imgLeft);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = idx;
          }
        });
        
        if (closestIndex !== currentIndex) {
          currentIndex = closestIndex;
          updateIndicators();
        }
      }, 100);
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    }, { passive: true });
    
    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next image
          const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
          scrollToImage(newIndex);
        } else {
          // Swipe right - previous image
          const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
          scrollToImage(newIndex);
        }
      }
    };
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
    // For now, just log
    console.log('Project details:', {
      title: project.title,
      client: project.client,
      year: project.year,
      description: project.description
    });
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
    this.setupMediaLazyLoading();
    this.setupModalSetup();

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
    this.setupMediaLazyLoading();
    this.setupModalSetup();
    
    console.log('Projects: Refreshed');
  }

  /**
   * Destroy component and clean up
   */
  destroy() {
    console.log('Projects: Destroying...');

    // Disconnect media observer
    if (this.mediaObserver) {
      this.mediaObserver.disconnect();
      this.mediaObserver = null;
    }

    // Pause and clean up all videos
    const videos = this.element.querySelectorAll('video');
    videos.forEach(video => {
      video.pause();
      video.src = '';
      video.load();
    });

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
      
      const media = card.querySelector('.project__media');
      if (media) gsap.set(media, { clearProps: 'all' });
    });

    // Clear project cards
    this.projectCards = [];

    console.log('Projects: Destroyed');
  }
}

export default Projects;