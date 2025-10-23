/**
 * Experience Component
 * Modern animated timeline with scroll-triggered effects
 * Reference: COMPONENTS.md lines 423-725
 */

import eventBus from '../utils/EventBus.js';
import { experience } from '../data/content.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class Experience {
  constructor() {
    // Main element references
    this.element = document.getElementById('experience') || document.querySelector('.experience');
    
    if (!this.element) {
      console.warn('Experience: Experience element not found');
      return;
    }

    // Support both class names
    this.timeline = this.element.querySelector('#experience-timeline') ||
                    this.element.querySelector('.experience__timeline') ||
                    this.element.querySelector('.timeline');
    this.skillsGrid = this.element.querySelector('.experience__skills') ||
                      this.element.querySelector('.skills-grid');
    this.timelineEntries = [];
    this.skillBars = [];
    
    // State
    this.experienceData = experience;
    this.isInitialized = false;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Store animations for cleanup
    this.animations = [];
    this.scrollTriggers = [];
  }

  /**
   * Initialize experience component
   */
  init() {
    if (!this.element) return;

    console.log('Experience: Initializing...');

    this.updateSectionTitle();
    this.renderTimeline();
    this.renderCraft();
    this.renderSkills();
    this.setupScrollAnimations();
    this.setupProgressLine();
    this.setupHoverInteractions();

    this.isInitialized = true;
    console.log('Experience: Initialized successfully');
  }

  /**
   * Update section title from content data
   */
  updateSectionTitle() {
    const titleElement = this.element.querySelector('.section__title');
    if (titleElement && this.experienceData.title) {
      titleElement.textContent = this.experienceData.title;
      console.log('Experience: Updated section title to:', this.experienceData.title);
    }
  }

  /**
   * Render timeline entries with modern vertical layout
   */
  renderTimeline() {
    if (!this.timeline) {
      console.warn('Experience: Timeline container not found');
      return;
    }

    if (!this.experienceData.timeline || this.experienceData.timeline.length === 0) {
      console.warn('Experience: No timeline data found');
      return;
    }

    // Clear existing content
    this.timeline.innerHTML = '';

    // Create timeline structure with progress line
    const timelineWrapper = document.createElement('div');
    timelineWrapper.className = 'timeline__wrapper';

    // Central line
    const timelineLine = document.createElement('div');
    timelineLine.className = 'timeline__line';
    timelineWrapper.appendChild(timelineLine);

    // Progress line that animates
    const progressLine = document.createElement('div');
    progressLine.className = 'timeline__progress';
    timelineWrapper.appendChild(progressLine);

    // Create container for items
    const timelineItems = document.createElement('div');
    timelineItems.className = 'timeline__items';

    // Render each timeline entry
    this.experienceData.timeline.forEach((item, index) => {
      const entry = this.createTimelineEntry(item, index);
      timelineItems.appendChild(entry);
    });

    timelineWrapper.appendChild(timelineItems);
    this.timeline.appendChild(timelineWrapper);

    // Store entry references
    this.timelineEntries = Array.from(this.timeline.querySelectorAll('.timeline-item'));
    this.progressLine = progressLine;
    this.timelineLine = timelineLine;

    console.log(`Experience: Rendered ${this.timelineEntries.length} timeline entries`);
  }

  /**
   * Create modern timeline entry element with alternating layout
   * @param {Object} item - Timeline item data
   * @param {number} index - Entry index
   * @returns {HTMLElement} Timeline entry element
   */
  createTimelineEntry(item, index) {
    const entry = document.createElement('div');
    entry.className = 'timeline-item';
    entry.setAttribute('data-index', index);
    
    // Alternate left/right positioning
    const side = index % 2 === 0 ? 'left' : 'right';
    entry.classList.add(`timeline-item--${side}`);

    // Build highlights list if available
    let highlightsHTML = '';
    if (item.highlights && item.highlights.length > 0) {
      highlightsHTML = `
        <ul class="timeline-item__highlights">
          ${item.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
        </ul>
      `;
    }

    entry.innerHTML = `
      <div class="timeline-item__marker">
        <div class="timeline-item__marker-inner"></div>
        <div class="timeline-item__marker-pulse"></div>
      </div>
      <div class="timeline-item__content">
        <span class="timeline-item__year">${item.year}</span>
        <h3 class="timeline-item__title">${item.title}</h3>
        <p class="timeline-item__company">${item.company}</p>
        ${item.type ? `<span class="timeline-item__type">${item.type}</span>` : ''}
        ${item.description ? `<p class="timeline-item__description">${item.description}</p>` : ''}
        ${highlightsHTML}
      </div>
    `;

    return entry;
  }

  /**
   * Render craft section from content data
   */
  renderCraft() {
    const craftContainer = this.element.querySelector('.experience__craft');
    
    if (!craftContainer) {
      console.warn('Experience: Craft container not found');
      return;
    }

    if (!this.experienceData.craft || this.experienceData.craft.length === 0) {
      console.warn('Experience: No craft data found');
      return;
    }

    // Clear existing content
    craftContainer.innerHTML = '';

    // Create craft title
    const craftTitle = document.createElement('h3');
    craftTitle.className = 'craft__title';
    craftTitle.textContent = 'My Craft';
    craftContainer.appendChild(craftTitle);

    // Create craft grid
    const craftGrid = document.createElement('div');
    craftGrid.className = 'craft__grid';

    // Render each craft item
    this.experienceData.craft.forEach((item, index) => {
      const craftCard = this.createCraftCard(item, index);
      craftGrid.appendChild(craftCard);
    });

    craftContainer.appendChild(craftGrid);

    // Store craft card references
    this.craftCards = Array.from(craftContainer.querySelectorAll('.craft-card'));

    console.log(`Experience: Rendered ${this.craftCards.length} craft cards`);
  }

  /**
   * Create craft card element
   * @param {Object} item - Craft item data
   * @param {number} index - Card index
   * @returns {HTMLElement} Craft card element
   */
  createCraftCard(item, index) {
    const card = document.createElement('div');
    card.className = 'craft-card';
    card.setAttribute('data-index', index);

    card.innerHTML = `
      <h4 class="craft-card__title">${item.title}</h4>
      <p class="craft-card__description">${item.description}</p>
    `;

    return card;
  }

  /**
   * Render skills grid from content data
   */
  renderSkills() {
    if (!this.skillsGrid) {
      console.warn('Experience: Skills grid container not found');
      return;
    }

    if (!this.experienceData.skills || this.experienceData.skills.length === 0) {
      console.warn('Experience: No skills data found');
      return;
    }

    // Clear existing content
    this.skillsGrid.innerHTML = '';

    // Render each skill category
    this.experienceData.skills.forEach(category => {
      const categorySection = this.createSkillCategory(category);
      this.skillsGrid.appendChild(categorySection);
    });

    // Store skill pill references
    this.skillPills = Array.from(this.skillsGrid.querySelectorAll('.skill-pill'));

    console.log(`Experience: Rendered ${this.skillPills.length} skill pills`);
  }

  /**
   * Create skill category section with compact pill layout
   * @param {Object} category - Skill category data
   * @returns {HTMLElement} Category section element
   */
  createSkillCategory(category) {
    const section = document.createElement('div');
    section.className = 'skill-category';

    const categoryTitle = document.createElement('h4');
    categoryTitle.className = 'skill-category__title';
    categoryTitle.textContent = category.category;
    section.appendChild(categoryTitle);

    // Create skills container for pills
    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'skills-pills-container';

    // Create skill pills
    category.items.forEach(skill => {
      const pill = this.createSkillPill(skill);
      skillsContainer.appendChild(pill);
    });

    section.appendChild(skillsContainer);

    return section;
  }

  /**
   * Create compact skill pill element
   * @param {Object} skill - Skill data
   * @returns {HTMLElement} Skill pill element
   */
  createSkillPill(skill) {
    const pill = document.createElement('div');
    pill.className = 'skill-pill';
    pill.setAttribute('data-skill', skill.name);

    pill.innerHTML = `
      <span class="skill-name">${skill.name}</span>
      <span class="skill-percentage">${skill.level}%</span>
    `;

    return pill;
  }

  /**
   * Set up scroll-triggered animations for timeline
   */
  setupScrollAnimations() {
    if (this.prefersReducedMotion) {
      // Show everything immediately for reduced motion
      this.timelineEntries.forEach(entry => {
        gsap.set(entry, { opacity: 1, x: 0 });
      });
      if (this.craftCards) {
        this.craftCards.forEach(card => {
          gsap.set(card, { opacity: 1, y: 0, scale: 1 });
        });
      }
      return;
    }

    // Animate craft cards with stagger
    if (this.craftCards) {
      this.craftCards.forEach((card, index) => {
        gsap.set(card, {
          opacity: 0,
          y: 60,
          scale: 0.9,
          rotateX: -15
        });

        const trigger = gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1,
          delay: index * 0.15,
          ease: 'power3.out',
        });

        this.scrollTriggers.push(trigger.scrollTrigger);
      });
    }

    // Set initial states and animate items
    this.timelineEntries.forEach((entry, index) => {
      const side = index % 2 === 0 ? 'left' : 'right';
      const direction = side === 'left' ? -80 : 80;

      // Set initial state
      gsap.set(entry, {
        opacity: 0,
        x: direction,
      });

      // Animate on scroll
      const trigger = gsap.to(entry, {
        scrollTrigger: {
          trigger: entry,
          start: 'top 85%',
          end: 'top 60%',
          toggleActions: 'play none none reverse',
          markers: false,
        },
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
      });

      this.scrollTriggers.push(trigger.scrollTrigger);

      // Marker pulse animation when visible
      const marker = entry.querySelector('.timeline-item__marker-pulse');
      if (marker) {
        gsap.to(marker, {
          scrollTrigger: {
            trigger: entry,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          scale: 1.5,
          opacity: 0,
          duration: 1.5,
          repeat: -1,
          ease: 'power2.out',
        });
      }
    });

    // Animate skill pills
    this.skillPills.forEach((pill, index) => {
      gsap.set(pill, {
        opacity: 0,
        y: 20,
        scale: 0.9
      });

      const trigger = gsap.to(pill, {
        scrollTrigger: {
          trigger: pill,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.05,
        ease: 'power3.out',
      });

      this.scrollTriggers.push(trigger.scrollTrigger);
    });
  }

  /**
   * Setup progressive line animation that follows scroll
   */
  setupProgressLine() {
    if (this.prefersReducedMotion || !this.progressLine || !this.timelineLine) {
      return;
    }

    // Set initial state - line starts from top
    gsap.set(this.progressLine, {
      scaleY: 0,
      transformOrigin: 'top center',
    });

    // Animate line based on timeline scroll progress
    const trigger = gsap.to(this.progressLine, {
      scrollTrigger: {
        trigger: this.timeline,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1,
        markers: false,
      },
      scaleY: 1,
      ease: 'none',
    });

    this.scrollTriggers.push(trigger.scrollTrigger);
  }

  /**
   * Set up hover interactions for timeline and skills
   */
  setupHoverInteractions() {
    // Timeline entry hover effects
    this.timelineEntries.forEach(entry => {
      const content = entry.querySelector('.timeline-item__content');
      const marker = entry.querySelector('.timeline-item__marker');

      entry.addEventListener('mouseenter', () => {
        if (this.prefersReducedMotion) return;

        gsap.to(content, {
          y: -8,
          boxShadow: '0 20px 60px rgba(6, 182, 212, 0.3)',
          duration: 0.3,
          ease: 'power2.out',
        });
        
        if (marker) {
          gsap.to(marker.querySelector('.timeline-item__marker-inner'), {
            scale: 1.3,
            boxShadow: '0 0 30px rgba(6, 182, 212, 0.8)',
            duration: 0.3,
            ease: 'power2.out',
          });
        }

        eventBus.emit('timeline:hover', {
          index: entry.dataset.index
        });
      });

      entry.addEventListener('mouseleave', () => {
        if (this.prefersReducedMotion) return;

        gsap.to(content, {
          y: 0,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out',
        });
        
        if (marker) {
          gsap.to(marker.querySelector('.timeline-item__marker-inner'), {
            scale: 1,
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });
    });

    // Skill pill hover effects
    const skillPills = this.skillsGrid?.querySelectorAll('.skill-pill');
    skillPills?.forEach(pill => {
      pill.addEventListener('mouseenter', () => {
        if (this.prefersReducedMotion) return;

        gsap.to(pill, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });

        eventBus.emit('skill:hover', {
          skill: pill.dataset.skill
        });
      });

      pill.addEventListener('mouseleave', () => {
        if (this.prefersReducedMotion) return;

        gsap.to(pill, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }

  /**
   * Get timeline entry by index
   * @param {number} index - Entry index
   * @returns {HTMLElement|null} Timeline entry element
   */
  getTimelineEntry(index) {
    return this.timelineEntries[index] || null;
  }

  /**
   * Highlight specific skill
   * @param {string} skillName - Name of skill to highlight
   */
  highlightSkill(skillName) {
    const skillItem = this.skillsGrid?.querySelector(`[data-skill="${skillName}"]`);
    
    if (skillItem) {
      skillItem.classList.add('skill-item--highlighted');
      
      setTimeout(() => {
        skillItem.classList.remove('skill-item--highlighted');
      }, 2000);

      console.log(`Experience: Highlighted skill: ${skillName}`);
    }
  }

  /**
   * Refresh component (for dynamic updates)
   */
  refresh() {
    // Kill existing scroll triggers
    this.scrollTriggers.forEach(trigger => {
      if (trigger) trigger.kill();
    });
    this.scrollTriggers = [];

    this.renderTimeline();
    this.renderCraft();
    this.renderSkills();
    this.setupScrollAnimations();
    this.setupProgressLine();
    this.setupHoverInteractions();
    
    console.log('Experience: Refreshed');
  }

  /**
   * Destroy component and clean up
   */
  destroy() {
    console.log('Experience: Destroying...');

    // Kill all GSAP animations
    this.animations.forEach(anim => {
      if (anim && anim.kill) {
        anim.kill();
      }
    });
    this.animations = [];

    // Kill all ScrollTriggers
    this.scrollTriggers.forEach(trigger => {
      if (trigger) trigger.kill();
    });
    this.scrollTriggers = [];

    // Reset GSAP transforms
    this.timelineEntries.forEach(entry => {
      gsap.set(entry, { clearProps: 'all' });
      
      const marker = entry.querySelector('.timeline-item__marker');
      if (marker) gsap.set(marker, { clearProps: 'all' });
    });

    // Reset craft cards
    if (this.craftCards) {
      this.craftCards.forEach(card => {
        gsap.set(card, { clearProps: 'all' });
      });
    }

    // Reset skill pills
    if (this.skillPills) {
      this.skillPills.forEach(pill => {
        gsap.set(pill, { clearProps: 'all' });
      });
    }

    // Clear references
    this.timelineEntries = [];
    this.craftCards = [];
    this.skillPills = [];

    console.log('Experience: Destroyed');
  }
}

export default Experience;