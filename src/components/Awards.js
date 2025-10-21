/**
 * Awards Component
 * Display recognition and awards in grid layout
 * Reference: COMPONENTS.md lines 512-819
 */

import eventBus from '../utils/EventBus.js';
import { awards } from '../data/content.js';

class Awards {
  constructor() {
    // Main element references
    this.element = document.getElementById('awards') || document.querySelector('.awards');
    
    if (!this.element) {
      console.warn('Awards: Awards element not found');
      return;
    }

    this.grid = this.element.querySelector('.awards-grid') || 
                this.element.querySelector('.awards__grid');
    this.awardCards = [];
    
    // State
    this.awards = awards;
    this.isInitialized = false;
    this.currentFilter = 'all';
  }

  /**
   * Initialize awards component
   */
  init() {
    if (!this.element) return;

    console.log('Awards: Initializing...');

    this.updateSectionTitle();
    this.renderAwards();
    this.setupAnimations();
    this.setupHoverEffects();
    this.setupFilterButtons();

    this.isInitialized = true;
    console.log('Awards: Initialized successfully');
  }

  /**
   * Update section title from content data
   */
  updateSectionTitle() {
    const titleElement = this.element.querySelector('.section__title');
    if (titleElement && this.awards.title) {
      titleElement.textContent = this.awards.title;
      console.log('Awards: Updated section title to:', this.awards.title);
    }
  }

  /**
   * Render award cards from content data
   */
  renderAwards() {
    if (!this.grid) {
      console.warn('Awards: Grid container not found');
      return;
    }

    if (!this.awards || this.awards.length === 0) {
      console.warn('Awards: No awards data found');
      return;
    }

    // Clear existing content
    this.grid.innerHTML = '';

    // Filter awards if needed
    const filteredAwards = this.currentFilter === 'all' 
      ? this.awards 
      : this.awards.filter(award => award.category === this.currentFilter);

    // Render each award card
    filteredAwards.forEach((award, index) => {
      const card = this.createAwardCard(award, index);
      this.grid.appendChild(card);
    });

    // Store card references
    this.awardCards = Array.from(this.grid.querySelectorAll('.award-card'));

    console.log(`Awards: Rendered ${this.awardCards.length} award cards`);
  }

  /**
   * Create award card element
   * @param {Object} award - Award data object
   * @param {number} index - Award index
   * @returns {HTMLElement} Award card element
   */
  createAwardCard(award, index) {
    const card = document.createElement('div');
    card.className = 'award-card';
    card.setAttribute('data-award-id', award.id);
    card.setAttribute('data-index', index);
    card.setAttribute('data-category', award.category);

    card.innerHTML = `
      <div class="award-card__icon">
        ${award.logo ? `<img src="${award.logo}" alt="${award.organization}" loading="lazy" />` : '🏆'}
      </div>
      <h4 class="award-card__title">${award.title}</h4>
      <p class="award-card__category">${award.category}</p>
      <p class="award-card__organization">${award.organization}</p>
      <span class="award-card__year">${award.year}</span>
      ${award.description ? `<p class="award-card__description">${award.description}</p>` : ''}
      ${award.project ? `<span class="award-card__project">Project: ${award.project}</span>` : ''}
    `;

    return card;
  }

  /**
   * Set up scroll-triggered animations for award cards
   * Placeholder for GSAP ScrollTrigger animations
   */
  setupAnimations() {
    // Simple stagger animation using Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          
          // Add visible class with stagger delay
          setTimeout(() => {
            entry.target.classList.add('award-card--visible');
          }, index * 80);
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    this.awardCards.forEach(card => {
      // Set initial state
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px) scale(0.9)';
      card.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

      observer.observe(card);
    });

    // Add CSS for visible state
    if (!document.querySelector('#awards-animation-style')) {
      const style = document.createElement('style');
      style.id = 'awards-animation-style';
      style.textContent = `
        .award-card--visible {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }
      `;
      document.head.appendChild(style);
    }

    // TODO: Replace with GSAP animation
    // gsap.from(this.awardCards, {
    //   scrollTrigger: {
    //     trigger: this.grid,
    //     start: 'top 75%',
    //     toggleActions: 'play none none reverse',
    //   },
    //   opacity: 0,
    //   y: 50,
    //   scale: 0.9,
    //   stagger: 0.08,
    //   duration: 0.8,
    //   ease: 'back.out(1.5)',
    // });
  }

  /**
   * Set up hover effects for award cards
   */
  setupHoverEffects() {
    this.awardCards.forEach(card => {
      // Mouse enter - lift card
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 20px 60px rgba(255, 255, 255, 0.15)';

        // Pulse icon
        const icon = card.querySelector('.award-card__icon');
        if (icon) {
          icon.style.transition = 'transform 0.4s ease';
          icon.style.transform = 'scale(1.1) rotate(5deg)';
        }

        eventBus.emit('award:hover', { 
          awardId: card.dataset.awardId 
        });
      });

      // Mouse leave - reset
      card.addEventListener('mouseleave', () => {
        const isVisible = card.classList.contains('award-card--visible');
        card.style.transform = isVisible ? 'translateY(0) scale(1)' : card.style.transform;
        card.style.boxShadow = '0 10px 30px rgba(255, 255, 255, 0.05)';

        const icon = card.querySelector('.award-card__icon');
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
      });

      // Click to emit event
      card.addEventListener('click', () => {
        const awardId = card.dataset.awardId;
        const award = this.awards.find(a => a.id === awardId);
        
        if (award) {
          eventBus.emit('award:clicked', { award });
          console.log('Awards: Card clicked', award.title);
        }
      });

      // TODO: Replace with GSAP animations
      // card.addEventListener('mouseenter', () => {
      //   gsap.to(card, {
      //     y: -10,
      //     scale: 1.02,
      //     boxShadow: '0 20px 60px rgba(255,255,255,0.15)',
      //     duration: 0.4,
      //     ease: 'power2.out',
      //   });
      // });
    });
  }

  /**
   * Set up filter buttons (if present)
   * Allows filtering awards by category
   */
  setupFilterButtons() {
    const filterButtons = this.element.querySelectorAll('.awards__filter-btn');
    
    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.dataset.category || 'all';
        
        // Update active button state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter and re-render
        this.filterByCategory(category);
      });
    });

    console.log('Awards: Filter buttons initialized');
  }

  /**
   * Filter awards by category
   * @param {string} category - Category to filter by (or 'all')
   */
  filterByCategory(category) {
    this.currentFilter = category;
    
    console.log(`Awards: Filtering by category: ${category}`);
    
    this.renderAwards();
    this.setupAnimations();
    this.setupHoverEffects();
    
    eventBus.emit('awards:filtered', { category });
  }

  /**
   * Get award by ID
   * @param {string} id - Award ID
   * @returns {Object|null} Award data or null
   */
  getAwardById(id) {
    return this.awards.find(award => award.id === id) || null;
  }

  /**
   * Get awards by category
   * @param {string} category - Category name
   * @returns {Array} Filtered awards
   */
  getAwardsByCategory(category) {
    return this.awards.filter(award => award.category === category);
  }

  /**
   * Get awards by year
   * @param {string|number} year - Year to filter by
   * @returns {Array} Filtered awards
   */
  getAwardsByYear(year) {
    return this.awards.filter(award => award.year === String(year));
  }

  /**
   * Highlight specific award
   * @param {string} awardId - ID of award to highlight
   */
  highlightAward(awardId) {
    const card = this.grid?.querySelector(`[data-award-id="${awardId}"]`);
    
    if (card) {
      card.classList.add('award-card--highlighted');
      
      // Scroll to award
      card.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      setTimeout(() => {
        card.classList.remove('award-card--highlighted');
      }, 3000);

      console.log(`Awards: Highlighted award: ${awardId}`);
    }
  }

  /**
   * Get unique categories from awards
   * @returns {Array} Array of unique categories
   */
  getCategories() {
    const categories = new Set(this.awards.map(award => award.category));
    return ['all', ...Array.from(categories)];
  }

  /**
   * Get awards statistics
   * @returns {Object} Statistics object
   */
  getStats() {
    return {
      total: this.awards.length,
      categories: this.getCategories().length - 1, // Exclude 'all'
      years: new Set(this.awards.map(a => a.year)).size,
      latestYear: Math.max(...this.awards.map(a => parseInt(a.year)))
    };
  }

  /**
   * Refresh component (for dynamic updates)
   */
  refresh() {
    this.renderAwards();
    this.setupAnimations();
    this.setupHoverEffects();
    this.setupFilterButtons();
    
    console.log('Awards: Refreshed');
  }

  /**
   * Reset filter to show all awards
   */
  resetFilter() {
    this.filterByCategory('all');
    
    // Reset filter buttons
    const filterButtons = this.element.querySelectorAll('.awards__filter-btn');
    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === 'all');
    });
  }

  /**
   * Destroy component and clean up
   */
  destroy() {
    console.log('Awards: Destroying...');

    // Remove injected styles
    const style = document.querySelector('#awards-animation-style');
    if (style) {
      style.remove();
    }

    // Clear references
    this.awardCards = [];
    this.currentFilter = 'all';

    console.log('Awards: Destroyed');
  }
}

export default Awards;