/**
 * Authentication Component
 * Handles 4-digit code authentication for portfolio access
 */

class Auth {
  constructor() {
    this.authKey = 'portfolio_authenticated';
    this.accessCode = '5910'; // 4-digit access code
    this.container = null;
    this.isAuthenticated = false;
    this.inputs = [];
  }

  /**
   * Initialize authentication
   */
  async init() {
    console.log('Initializing authentication...');
    
    // Check if already authenticated in this session
    this.isAuthenticated = sessionStorage.getItem(this.authKey) === 'true';
    
    if (!this.isAuthenticated) {
      this.render();
    }
    
    return this.isAuthenticated;
  }

  /**
   * Render authentication UI
   */
  render() {
    // Create auth container
    this.container = document.createElement('div');
    this.container.id = 'auth-overlay';
    this.container.className = 'auth-overlay';
    this.container.innerHTML = `
      <div class="auth-container">
        <div class="auth-content">
          <div class="auth-logo">
            <h1 class="auth-title">MASCHA</h1>
          </div>
          
          <div class="auth-form">
            <p class="auth-label">Enter Access Code</p>
            
            <div class="auth-code-inputs">
              <input type="text" maxlength="1" class="auth-code-box" data-index="0" autocomplete="off" inputmode="numeric" pattern="[0-9]*" />
              <input type="text" maxlength="1" class="auth-code-box" data-index="1" autocomplete="off" inputmode="numeric" pattern="[0-9]*" />
              <input type="text" maxlength="1" class="auth-code-box" data-index="2" autocomplete="off" inputmode="numeric" pattern="[0-9]*" />
              <input type="text" maxlength="1" class="auth-code-box" data-index="3" autocomplete="off" inputmode="numeric" pattern="[0-9]*" />
            </div>
            
            <div id="auth-error" class="auth-error" role="alert"></div>
          </div>
          
          <div class="auth-footer">
            <p class="auth-hint-text">Need access?</p>
            <a href="https://www.linkedin.com/in/mascha-sheludiakova/" target="_blank" rel="noopener noreferrer" class="auth-linkedin">
              Contact on LinkedIn
            </a>
          </div>
        </div>
      </div>
    `;
    
    // Insert at the beginning of body to overlay everything
    document.body.insertBefore(this.container, document.body.firstChild);
    
    // Get input references
    this.inputs = Array.from(this.container.querySelectorAll('.auth-code-box'));
    
    // Focus first input
    setTimeout(() => this.inputs[0].focus(), 100);
    
    // Add event listeners
    this.attachEventListeners();
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    const errorDiv = document.getElementById('auth-error');
    
    this.inputs.forEach((input, index) => {
      // Handle input
      input.addEventListener('input', (e) => {
        const value = e.target.value;
        
        // Clear error on input
        errorDiv.textContent = '';
        errorDiv.classList.remove('show');
        this.inputs.forEach(inp => inp.classList.remove('error'));
        
        // Only allow digits
        if (value && !/^\d$/.test(value)) {
          e.target.value = '';
          return;
        }
        
        // Move to next input if value entered
        if (value && index < 3) {
          this.inputs[index + 1].focus();
          this.inputs[index + 1].select();
        }
        
        // Check if all inputs are filled
        if (index === 3 && value) {
          this.checkCode();
        }
      });
      
      // Handle keydown for backspace
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
          this.inputs[index - 1].focus();
          this.inputs[index - 1].select();
        }
        
        // Handle arrow keys
        if (e.key === 'ArrowLeft' && index > 0) {
          e.preventDefault();
          this.inputs[index - 1].focus();
          this.inputs[index - 1].select();
        }
        if (e.key === 'ArrowRight' && index < 3) {
          e.preventDefault();
          this.inputs[index + 1].focus();
          this.inputs[index + 1].select();
        }
      });
      
      // Handle paste
      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        
        // Only process if it's 4 digits
        if (/^\d{4}$/.test(pastedData)) {
          pastedData.split('').forEach((char, i) => {
            if (this.inputs[i]) {
              this.inputs[i].value = char;
            }
          });
          this.inputs[3].focus();
          this.checkCode();
        }
      });
      
      // Select all on focus
      input.addEventListener('focus', (e) => {
        e.target.select();
      });
      
      // Prevent non-numeric input
      input.addEventListener('keypress', (e) => {
        if (!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
          e.preventDefault();
        }
      });
    });
  }

  /**
   * Check if entered code is correct
   */
  checkCode() {
    const enteredCode = this.inputs.map(input => input.value).join('');
    
    if (enteredCode.length !== 4) {
      return;
    }
    
    // Add checking animation
    this.container.querySelector('.auth-code-inputs').classList.add('checking');
    
    setTimeout(() => {
      if (enteredCode === this.accessCode) {
        // Authentication successful
        this.authenticate();
      } else {
        // Authentication failed
        this.showError();
      }
    }, 600);
  }

  /**
   * Show error state
   */
  showError() {
    const errorDiv = document.getElementById('auth-error');
    const codeInputs = this.container.querySelector('.auth-code-inputs');
    
    codeInputs.classList.remove('checking');
    codeInputs.classList.add('error');
    
    this.inputs.forEach(input => {
      input.classList.add('error');
      input.value = '';
    });
    
    errorDiv.textContent = 'Invalid code';
    errorDiv.classList.add('show');
    
    // Shake animation
    this.container.querySelector('.auth-content').classList.add('shake');
    
    setTimeout(() => {
      this.container.querySelector('.auth-content').classList.remove('shake');
      codeInputs.classList.remove('error');
      this.inputs[0].focus();
    }, 500);
  }

  /**
   * Authenticate and grant access
   */
  authenticate() {
    console.log('Authentication successful!');
    
    // Store authentication state
    sessionStorage.setItem(this.authKey, 'true');
    this.isAuthenticated = true;
    
    // Add success animation
    const authContent = this.container.querySelector('.auth-content');
    authContent.classList.add('success');
    
    // Wait for animation then remove overlay and initialize app
    setTimeout(() => {
      this.container.classList.add('fade-out');
      
      setTimeout(() => {
        if (this.container && this.container.parentNode) {
          this.container.remove();
        }
        this.container = null;
        
        // Dispatch custom event to notify app that authentication is complete
        window.dispatchEvent(new CustomEvent('authenticated'));
      }, 500);
    }, 800);
  }

  /**
   * Check if user is authenticated
   */
  isUserAuthenticated() {
    return sessionStorage.getItem(this.authKey) === 'true';
  }

  /**
   * Logout (for testing purposes)
   */
  logout() {
    sessionStorage.removeItem(this.authKey);
    this.isAuthenticated = false;
    window.location.reload();
  }

  /**
   * Destroy component
   */
  destroy() {
    if (this.container && this.container.parentNode) {
      this.container.remove();
    }
    this.container = null;
  }
}

export default Auth;