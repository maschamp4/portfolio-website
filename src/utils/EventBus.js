/**
 * EventBus - Simple event bus for component communication
 * Enables decoupled component interactions via publish/subscribe pattern
 * Reference: COMPONENTS.md lines 719-766
 */

class EventBus {
  constructor() {
    /**
     * Event storage object
     * Structure: { eventName: [callback1, callback2, ...] }
     */
    this.events = {};
    
    /**
     * Debug mode - logs all event emissions
     */
    this.debug = false;
  }

  /**
   * Subscribe to an event
   * @param {string} event - Event name to listen for
   * @param {Function} callback - Function to call when event is emitted
   * @returns {Function} Unsubscribe function
   */
  on(event, callback) {
    if (!event || typeof event !== 'string') {
      console.error('EventBus.on: Event name must be a non-empty string');
      return () => {};
    }

    if (typeof callback !== 'function') {
      console.error('EventBus.on: Callback must be a function');
      return () => {};
    }

    // Create event array if it doesn't exist
    if (!this.events[event]) {
      this.events[event] = [];
    }

    // Add callback to event listeners
    this.events[event].push(callback);

    if (this.debug) {
      console.log(`EventBus: Subscribed to "${event}"`);
    }

    // Return unsubscribe function
    return () => this.off(event, callback);
  }

  /**
   * Unsubscribe from an event
   * @param {string} event - Event name to stop listening to
   * @param {Function} callback - Specific callback to remove (optional)
   */
  off(event, callback) {
    if (!this.events[event]) {
      return;
    }

    if (callback) {
      // Remove specific callback
      this.events[event] = this.events[event].filter(cb => cb !== callback);
      
      if (this.debug) {
        console.log(`EventBus: Unsubscribed from "${event}"`);
      }
    } else {
      // Remove all callbacks for this event
      delete this.events[event];
      
      if (this.debug) {
        console.log(`EventBus: Removed all listeners for "${event}"`);
      }
    }
  }

  /**
   * Emit an event with optional data
   * @param {string} event - Event name to emit
   * @param {*} data - Data to pass to callbacks (optional)
   */
  emit(event, data) {
    if (!event || typeof event !== 'string') {
      console.error('EventBus.emit: Event name must be a non-empty string');
      return;
    }

    if (!this.events[event] || this.events[event].length === 0) {
      if (this.debug) {
        console.warn(`EventBus: No listeners for event "${event}"`);
      }
      return;
    }

    if (this.debug) {
      console.log(`EventBus: Emitting "${event}"`, data);
    }

    // Call all registered callbacks with data
    this.events[event].forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`EventBus: Error in callback for "${event}":`, error);
      }
    });
  }

  /**
   * Subscribe to an event only once
   * @param {string} event - Event name to listen for
   * @param {Function} callback - Function to call when event is emitted
   * @returns {Function} Unsubscribe function
   */
  once(event, callback) {
    const wrappedCallback = (data) => {
      callback(data);
      this.off(event, wrappedCallback);
    };

    return this.on(event, wrappedCallback);
  }

  /**
   * Get count of listeners for an event
   * @param {string} event - Event name
   * @returns {number} Number of listeners
   */
  listenerCount(event) {
    return this.events[event] ? this.events[event].length : 0;
  }

  /**
   * Remove all event listeners
   */
  clear() {
    this.events = {};
    
    if (this.debug) {
      console.log('EventBus: Cleared all listeners');
    }
  }

  /**
   * Enable/disable debug mode
   * @param {boolean} enabled - Debug mode state
   */
  setDebug(enabled) {
    this.debug = !!enabled;
  }
}

// Create and export a global event bus instance
const eventBus = new EventBus();

// Make it globally available
if (typeof window !== 'undefined') {
  window.eventBus = eventBus;
}

export default eventBus;