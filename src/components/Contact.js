/**
 * Contact Component
 * Contact form with validation and social links
 * Reference: COMPONENTS.md lines 591-979
 */

import eventBus from '../utils/EventBus.js';
import { contact } from '../data/content.js';

class Contact {
  constructor() {
    // Main element references
    this.element = document.getElementById('contact') || document.querySelector('.contact');
    
    if (!this.element) {
      console.warn('Contact: Contact element not found');
      return;
    }

    this.form = this.element.querySelector('.contact-form') || 
                this.element.querySelector('#contact-form');
    this.inputs = [];
    this.submitButton = null;
    
    // State
    this.isSubmitting = false;
    this.isInitialized = false;
    this.contactData = contact;
  }

  /**
   * Initialize contact component
   */
  init() {
    if (!this.element) return;

    console.log('Contact: Initializing...');

    this.setupFormElements();
    this.setupFormValidation();
    this.setupAnimations();
    this.setupSocialLinks();
    this.renderContactInfo();

    this.isInitialized = true;
    console.log('Contact: Initialized successfully');
  }

  /**
   * Set up form element references
   */
  setupFormElements() {
    if (!this.form) {
      console.warn('Contact: Form not found');
      return;
    }

    this.inputs = Array.from(this.form.querySelectorAll('input, textarea'));
    this.submitButton = this.form.querySelector('button[type="submit"]');
  }

  /**
   * Set up form validation and submission
   */
  setupFormValidation() {
    if (!this.form) return;

    // Form submit handler
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (this.validateForm()) {
        await this.submitForm();
      }
    });

    // Input blur validation
    this.inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      // Clear error on input
      input.addEventListener('input', () => {
        this.clearError(input);
      });

      // Input focus animation
      input.addEventListener('focus', () => {
        input.parentElement?.classList.add('form-field--focused');
      });

      input.addEventListener('blur', () => {
        input.parentElement?.classList.remove('form-field--focused');
      });
    });
  }

  /**
   * Validate entire form
   * @returns {boolean} Form validity
   */
  validateForm() {
    let isValid = true;

    this.inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      eventBus.emit('form:validation-failed');
    }

    return isValid;
  }

  /**
   * Validate individual field
   * @param {HTMLElement} field - Input or textarea element
   * @returns {boolean} Field validity
   */
  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const name = field.name;
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    // Email validation
    else if (type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
    // Name validation (min 2 characters)
    else if (name === 'name' && value && value.length < 2) {
      isValid = false;
      errorMessage = 'Name must be at least 2 characters';
    }
    // Message validation (min 10 characters)
    else if (name === 'message' && value && value.length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters';
    }

    if (!isValid) {
      this.showError(field, errorMessage);
    } else {
      this.clearError(field);
    }

    return isValid;
  }

  /**
   * Validate email format
   * @param {string} email - Email address
   * @returns {boolean} Email validity
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Show error message for field
   * @param {HTMLElement} field - Input element
   * @param {string} message - Error message
   */
  showError(field, message) {
    field.classList.add('error');
    
    const formField = field.closest('.form-field');
    if (formField) {
      formField.classList.add('form-field--error');
    }

    // Find or create error message element
    let errorEl = field.parentElement?.querySelector('.error-message');
    
    if (!errorEl) {
      errorEl = document.createElement('span');
      errorEl.className = 'error-message';
      field.parentElement?.appendChild(errorEl);
    }

    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }

  /**
   * Clear error message for field
   * @param {HTMLElement} field - Input element
   */
  clearError(field) {
    field.classList.remove('error');
    
    const formField = field.closest('.form-field');
    if (formField) {
      formField.classList.remove('form-field--error');
    }

    const errorEl = field.parentElement?.querySelector('.error-message');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }
  }

  /**
   * Submit form data
   */
  async submitForm() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    // Show loading state
    this.setSubmitButtonState('loading');

    try {
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // if (response.ok) {
        this.showSuccess();
        this.form.reset();
        eventBus.emit('form:submitted', { data });
      // } else {
      //   throw new Error('Submission failed');
      // }
      
    } catch (error) {
      console.error('Contact: Form submission error:', error);
      this.showSubmissionError('Failed to send message. Please try again.');
      eventBus.emit('form:error', { error });
    } finally {
      this.isSubmitting = false;
      this.setSubmitButtonState('default');
    }
  }

  /**
   * Set submit button state
   * @param {string} state - 'default', 'loading', 'success', 'error'
   */
  setSubmitButtonState(state) {
    if (!this.submitButton) return;

    switch (state) {
      case 'loading':
        this.submitButton.disabled = true;
        this.submitButton.textContent = 'Sending...';
        this.submitButton.classList.add('btn--loading');
        break;
      
      case 'success':
        this.submitButton.disabled = false;
        this.submitButton.textContent = 'Sent!';
        this.submitButton.classList.add('btn--success');
        break;
      
      case 'error':
        this.submitButton.disabled = false;
        this.submitButton.textContent = 'Try Again';
        this.submitButton.classList.add('btn--error');
        break;
      
      default:
        this.submitButton.disabled = false;
        this.submitButton.textContent = 'Send Message';
        this.submitButton.classList.remove('btn--loading', 'btn--success', 'btn--error');
    }
  }

  /**
   * Show success message
   */
  showSuccess() {
    // Create success message
    const successMsg = document.createElement('div');
    successMsg.className = 'form-message form-message--success';
    successMsg.innerHTML = `
      <svg class="form-message__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M20 6L9 17l-5-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <p>Thank you! Your message has been sent successfully.</p>
    `;

    // Insert into form
    this.form.appendChild(successMsg);

    // Animate in
    setTimeout(() => {
      successMsg.classList.add('form-message--visible');
    }, 100);

    // Set button to success state temporarily
    this.setSubmitButtonState('success');

    // Remove message and reset button after delay
    setTimeout(() => {
      successMsg.classList.remove('form-message--visible');
      setTimeout(() => {
        successMsg.remove();
        this.setSubmitButtonState('default');
      }, 300);
    }, 5000);

    console.log('Contact: Form submitted successfully');
  }

  /**
   * Show submission error message
   * @param {string} message - Error message
   */
  showSubmissionError(message) {
    const errorMsg = document.createElement('div');
    errorMsg.className = 'form-message form-message--error';
    errorMsg.innerHTML = `
      <svg class="form-message__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke-width="2"/>
        <path d="M15 9l-6 6M9 9l6 6" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <p>${message}</p>
    `;

    this.form.appendChild(errorMsg);

    setTimeout(() => {
      errorMsg.classList.add('form-message--visible');
    }, 100);

    this.setSubmitButtonState('error');

    setTimeout(() => {
      errorMsg.classList.remove('form-message--visible');
      setTimeout(() => {
        errorMsg.remove();
        this.setSubmitButtonState('default');
      }, 300);
    }, 5000);
  }

  /**
   * Set up scroll animations for form fields
   * Placeholder for GSAP animations
   */
  setupAnimations() {
    const fields = this.form?.querySelectorAll('.form-field');
    
    if (!fields || fields.length === 0) return;

    // Simple stagger animation using Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Array.from(fields).indexOf(entry.target);
          
          setTimeout(() => {
            entry.target.classList.add('form-field--visible');
          }, index * 150);
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    fields.forEach((field, index) => {
      field.style.opacity = '0';
      field.style.transform = 'translateX(-30px)';
      field.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      
      observer.observe(field);
    });

    // Add CSS for visible state
    if (!document.querySelector('#contact-animation-style')) {
      const style = document.createElement('style');
      style.id = 'contact-animation-style';
      style.textContent = `
        .form-field--visible {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        .form-message {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .form-message--visible {
          opacity: 1;
          transform: translateY(0);
        }
      `;
      document.head.appendChild(style);
    }

    // TODO: Replace with GSAP animation
    // gsap.from(fields, {
    //   scrollTrigger: {
    //     trigger: this.form,
    //     start: 'top 80%',
    //     toggleActions: 'play none none reverse',
    //   },
    //   opacity: 0,
    //   x: -30,
    //   stagger: 0.15,
    //   duration: 0.8,
    //   ease: 'power2.out',
    // });
  }

  /**
   * Set up social media links with magnetic effect
   */
  setupSocialLinks() {
    const socialLinks = this.element.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
      // Click tracking
      link.addEventListener('click', (e) => {
        const platform = link.dataset.platform || link.getAttribute('aria-label');
        eventBus.emit('social:clicked', { platform });
        console.log('Contact: Social link clicked', platform);
      });

      // Magnetic hover effect (desktop only)
      if (window.innerWidth > 768) {
        this.setupMagneticEffect(link);
      }

      // Simple hover effect fallback
      link.addEventListener('mouseenter', () => {
        link.style.transition = 'transform 0.3s ease';
        link.style.transform = 'scale(1.1)';
      });

      link.addEventListener('mouseleave', () => {
        link.style.transform = 'scale(1)';
      });
    });

    console.log(`Contact: Initialized ${socialLinks.length} social links`);
  }

  /**
   * Set up magnetic hover effect for element
   * @param {HTMLElement} element - Element to apply effect to
   */
  setupMagneticEffect(element) {
    const strength = 0.5;

    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = x * strength;
      const moveY = y * strength;
      
      element.style.transition = 'transform 0.2s ease';
      element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0, 0) scale(1)';
    });
  }

  /**
   * Render contact information from content data
   */
  renderContactInfo() {
    // Render availability status if element exists
    const availabilityEl = this.element.querySelector('.contact__availability');
    if (availabilityEl && this.contactData.availability) {
      availabilityEl.innerHTML = `
        <span class="status-indicator status-indicator--${this.contactData.availability.status === 'Available for select projects' ? 'available' : 'unavailable'}"></span>
        <span>${this.contactData.availability.status}</span>
      `;
    }

    // Render email if element exists
    const emailEl = this.element.querySelector('.contact__email');
    if (emailEl && this.contactData.email) {
      emailEl.href = `mailto:${this.contactData.email}`;
      emailEl.textContent = this.contactData.email;
    }

    // Render location if element exists
    const locationEl = this.element.querySelector('.contact__location');
    if (locationEl && this.contactData.location) {
      locationEl.textContent = `${this.contactData.location.city}, ${this.contactData.location.country}`;
    }
  }

  /**
   * Get form data
   * @returns {Object} Current form data
   */
  getFormData() {
    if (!this.form) return {};
    
    const formData = new FormData(this.form);
    return Object.fromEntries(formData);
  }

  /**
   * Reset form to initial state
   */
  resetForm() {
    if (!this.form) return;
    
    this.form.reset();
    this.inputs.forEach(input => this.clearError(input));
    this.setSubmitButtonState('default');
    
    console.log('Contact: Form reset');
  }

  /**
   * Destroy component and clean up
   */
  destroy() {
    console.log('Contact: Destroying...');

    // Remove injected styles
    const style = document.querySelector('#contact-animation-style');
    if (style) {
      style.remove();
    }

    // Clear references
    this.inputs = [];
    this.submitButton = null;
    this.isSubmitting = false;

    console.log('Contact: Destroyed');
  }
}

export default Contact;