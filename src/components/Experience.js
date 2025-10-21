/**
 * Experience Component
 * Timeline visualization and skills display
 * Reference: COMPONENTS.md lines 423-725
 */

import eventBus from '../utils/EventBus.js';
import { experience } from '../data/content.js';
import { gsap } from 'gsap';

class Experience {
  constructor() {
    // Main element references
    this.element = document.getElementById('experience') || document.querySelector('.experience');
    
    if (!this.element) {
      console.warn('Experience: Experience element not found');
      return;
    }

    this.timeline = this.element.querySelector('.timeline') || 
                    this.element.querySelector('.experience__timeline');
    this.skillsGrid = this.element.querySelector('.skills-grid') || 
                      this.element.querySelector('.experience__skills');
    this.timelineEntries = [];
    this.skillBars = [];
    
    // State
    this.experienceData = experience;
    this.isInitialized = false;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Store animations for cleanup
    this.animations = [];
  }

  /**
   * Initialize experience component
   */
  init() {
    if (!this.element) return;

    console.log('Experience: Initializing...');

    this.updateSectionTitle();
    this.renderTimeline();
    this.renderSkills();
    this.setupTimelineAnimation();
    this.setupSkillBars();
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
   * Render timeline entries from content data
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

    // Add timeline line element
    const timelineLine = document.createElement('div');
    timelineLine.className = 'timeline__line';
    this.timeline.appendChild(timelineLine);

    // Render each timeline entry
    this.experienceData.timeline.forEach((item, index) => {
      const entry = this.createTimelineEntry(item, index);
      this.timeline.appendChild(entry);
    });

    // Store entry references
    this.timelineEntries = Array.from(this.timeline.querySelectorAll('.timeline__entry'));

    console.log(`Experience: Rendered ${this.timelineEntries.length} timeline entries`);
  }

  /**
   * Create timeline entry element
   * @param {Object} item - Timeline item data
   * @param {number} index - Entry index
   * @returns {HTMLElement} Timeline entry element
   */
  createTimelineEntry(item, index) {
    const entry = document.createElement('div');
    entry.className = `timeline__entry timeline__entry--${index % 2 === 0 ? 'left' : 'right'}`;
    entry.setAttribute('data-index', index);

    // Build highlights list if available
    let highlightsHTML = '';
    if (item.highlights && item.highlights.length > 0) {
      highlightsHTML = `
        <ul class="timeline__highlights">
          ${item.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
        </ul>
      `;
    }

    entry.innerHTML = `
      <div class="timeline__marker"></div>
      <div class="timeline__content">
        <span class="timeline__year">${item.year}</span>
        <h4 class="timeline__title">${item.position}</h4>
        <p class="timeline__company">${item.company}</p>
        <span class="timeline__type">${item.type || ''}</span>
        <p class="timeline__description">${item.description}</p>
        ${highlightsHTML}
      </div>
    `;

    return entry;
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

    // Store skill bar references
    this.skillBars = Array.from(this.skillsGrid.querySelectorAll('.skill-bar'));

    console.log(`Experience: Rendered ${this.skillBars.length} skill bars`);
  }

  /**
   * Create skill category section
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

    // Create skill items
    category.items.forEach(skill => {
      const item = this.createSkillItem(skill);
      section.appendChild(item);
    });

    return section;
  }

  /**
   * Create skill item element with progress bar
   * @param {Object} skill - Skill data
   * @returns {HTMLElement} Skill item element
   */
  createSkillItem(skill) {
    const item = document.createElement('div');
    item.className = 'skill-item';
    item.setAttribute('data-skill', skill.name);

    item.innerHTML = `
      <div class="skill-item__header">
        <span class="skill-item__name">${skill.name}</span>
        <span class="skill-item__level">${skill.level}%</span>
      </div>
      <div class="skill-item__bar-container">
        <div class="skill-bar" style="--skill-level: ${skill.level}%; width: 0%;"></div>
      </div>
    `;

    return item;
  }

  /**
   * Set up timeline scroll animations
   * Note: Main scroll animations are handled by ScrollAnimations.js
   * This method only sets up component-specific states
   */
  setupTimelineAnimation() {
    const line = this.timeline?.querySelector('.timeline__line');
    
    if (line && !this.prefersReducedMotion) {
      // Set initial state for GSAP animation
      gsap.set(line, {
        scaleY: 0,
        transformOrigin: 'top',
      });
    }

    // Set initial state for timeline entries
    this.timelineEntries.forEach((entry, index) => {
      if (this.prefersReducedMotion) {
        gsap.set(entry, { opacity: 1, x: 0 });
        return;
      }

      // Set initial state for GSAP animations
      const direction = index % 2 === 0 ? -50 : 50;
      gsap.set(entry, {
        opacity: 0,
        x: direction,
      });
    });
  }

  /**
   * Set up skill bar animations
   * Note: Main scroll animations are handled by ScrollAnimations.js
   * This method only sets up component-specific states
   */
  setupSkillBars() {
    this.skillBars.forEach((bar, index) => {
      if (this.prefersReducedMotion) {
        // Show bars immediately for reduced motion
        const skillLevel = bar.style.getPropertyValue('--skill-level');
        bar.style.width = skillLevel;
        return;
      }

      // Set initial state for GSAP animations
      gsap.set(bar, {
        width: '0%',
      });
    });
  }

  /**
   * Set up hover interactions for timeline and skills
   * Uses GSAP for smooth hover animations
   */
  setupHoverInteractions() {
    // Timeline entry hover effects with GSAP
    this.timelineEntries.forEach(entry => {
      entry.addEventListener('mouseenter', () => {
        if (this.prefersReducedMotion) return;

        gsap.to(entry, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        });
        
        const marker = entry.querySelector('.timeline__marker');
        if (marker) {
          gsap.to(marker, {
            scale: 1.5,
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

        gsap.to(entry, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
        
        const marker = entry.querySelector('.timeline__marker');
        if (marker) {
          gsap.to(marker, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });
    });

    // Skill item hover effects with GSAP
    const skillItems = this.skillsGrid?.querySelectorAll('.skill-item');
    skillItems?.forEach(item => {
      item.addEventListener('mouseenter', () => {
        if (this.prefersReducedMotion) return;

        gsap.to(item, {
          x: 5,
          duration: 0.3,
          ease: 'power2.out',
        });
        
        const bar = item.querySelector('.skill-bar');
        if (bar) {
          gsap.to(bar, {
            scaleY: 1.2,
            duration: 0.3,
            ease: 'power2.out',
          });
        }

        eventBus.emit('skill:hover', {
          skill: item.dataset.skill
        });
      });

      item.addEventListener('mouseleave', () => {
        if (this.prefersReducedMotion) return;

        gsap.to(item, {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
        
        const bar = item.querySelector('.skill-bar');
        if (bar) {
          gsap.to(bar, {
            scaleY: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
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
    this.renderTimeline();
    this.renderSkills();
    this.setupTimelineAnimation();
    this.setupSkillBars();
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

    // Reset GSAP transforms on timeline elements
    const line = this.timeline?.querySelector('.timeline__line');
    if (line) gsap.set(line, { clearProps: 'all' });

    this.timelineEntries.forEach(entry => {
      gsap.set(entry, { clearProps: 'all' });
      
      const marker = entry.querySelector('.timeline__marker');
      if (marker) gsap.set(marker, { clearProps: 'all' });
    });

    // Reset skill bars
    this.skillBars.forEach(bar => {
      gsap.set(bar, { clearProps: 'all' });
    });

    const skillItems = this.skillsGrid?.querySelectorAll('.skill-item');
    skillItems?.forEach(item => {
      gsap.set(item, { clearProps: 'all' });
    });

    // Clear references
    this.timelineEntries = [];
    this.skillBars = [];

    console.log('Experience: Destroyed');
  }
}

export default Experience;