// src/lib/utils/scrollManager.js
import scrollama from 'scrollama';

export class ScrollManager {
  constructor() {
    this.scrollers = new Map(); // sectionId -> scrollama instance
    this.handlers = new Map(); // sectionId -> Map(stepId -> handlers)
    this.globalHandlers = []; // Global handlers for any step
  }

  // ==================== SECTION MANAGEMENT ====================
  
  /**
   * Initialize a section with Scrollama
   * @param {string} sectionId - Unique section identifier
   * @param {Object} options - Scrollama options
   */
  initSection(sectionId, options = {}) {
    // Clean up existing if present
    this.destroySection(sectionId);
    
    const scroller = scrollama();
    
    const defaultOptions = {
      step: `[data-section="${sectionId}"]`,
      offset: 0.65,
      progress: true,
      threshold: 1,
      debug: false,
      once: false,
      ...options
    };
    
    scroller
      .setup(defaultOptions)
      .onStepEnter((response) => this._handleStepEnter(sectionId, response))
      .onStepExit((response) => this._handleStepExit(sectionId, response))
      .onStepProgress((response) => this._handleStepProgress(sectionId, response));
    
    this.scrollers.set(sectionId, scroller);
    this.handlers.set(sectionId, new Map());
    
    // Handle resize
    const resizeHandler = () => scroller.resize();
    window.addEventListener('resize', resizeHandler);
    
    // Store cleanup function
    const cleanup = () => {
      window.removeEventListener('resize', resizeHandler);
    };
    
    return { scroller, cleanup };
  }
  
  /**
   * Destroy a specific section
   */
  destroySection(sectionId) {
    const scroller = this.scrollers.get(sectionId);
    if (scroller) {
      scroller.destroy();
      this.scrollers.delete(sectionId);
      this.handlers.delete(sectionId);
    }
  }
  
  /**
   * Destroy all sections
   */
  destroyAll() {
    this.scrollers.forEach((scroller) => {
      scroller.destroy();
    });
    this.scrollers.clear();
    this.handlers.clear();
    this.globalHandlers = [];
  }
  
  // ==================== HANDLER MANAGEMENT ====================
  
  /**
   * Add handler for a specific step
   */
  addStepHandler(sectionId, stepId, handlers) {
    if (!this.handlers.has(sectionId)) {
      this.handlers.set(sectionId, new Map());
    }
    this.handlers.get(sectionId).set(String(stepId), handlers);
  }
  
  /**
   * Add handler that triggers for any step
   */
  addGlobalHandler(handlers, filter = {}) {
    const handler = { ...handlers, filter };
    this.globalHandlers.push(handler);
    return () => this.removeGlobalHandler(handler);
  }
  
  /**
   * Remove a global handler
   */
  removeGlobalHandler(handlerToRemove) {
    this.globalHandlers = this.globalHandlers.filter(h => h !== handlerToRemove);
  }
  
  // ==================== HELPER FUNCTIONS ====================
  
  /**
   * Create a step element
   */
  static createStep(sectionId, stepId, height = '100vh') {
    const step = document.createElement('div');
    step.dataset.section = sectionId;
    step.dataset.stepId = stepId;
    step.style.height = height;
    step.style.pointerEvents = 'none';
    step.style.opacity = '0';
    return step;
  }
  
  /**
   * Setup steps from an array
   */
  setupSteps(sectionId, items, config = {}) {
    const {
      container = document.body,
      stepHeight = '100vh',
      getStepId = (item, i) => i,
      onEnter = null,
      onExit = null,
      onProgress = null,
      stepClass = ''
    } = config;
    
    // Create container for steps
    const stepsContainer = document.createElement('div');
    stepsContainer.className = `${sectionId}-steps`;
    stepsContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      pointer-events: none;
      opacity: 0;
      z-index: 1;
    `;
    
    // Create and add steps
    items.forEach((item, index) => {
      const stepId = getStepId(item, index);
      const step = ScrollManager.createStep(sectionId, stepId, stepHeight);
      
      if (stepClass) {
        step.classList.add(stepClass);
      }
      
      // Add item data as attributes
      Object.entries(item).forEach(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number') {
          step.dataset[key] = value;
        }
      });
      
      stepsContainer.appendChild(step);
      
      // Add handlers if provided
      if (onEnter || onExit || onProgress) {
        this.addStepHandler(sectionId, stepId, {
          onEnter: onEnter ? (res) => onEnter(item, index, res) : undefined,
          onExit: onExit ? (res) => onExit(item, index, res) : undefined,
          onProgress: onProgress ? (res) => onProgress(item, index, res) : undefined
        });
      }
    });
    
    container.appendChild(stepsContainer);
    return stepsContainer;
  }
  
  /**
   * Enable/disable debug for a section
   * Note: Requires reinitialization due to Scrollama limitation
   */
  setDebug(sectionId, debugEnabled = true) {
    const scroller = this.scrollers.get(sectionId);
    if (scroller) {
      console.warn('Debug mode requires reinitialization. Destroy and re-init section with debug:', debugEnabled);
      // You would need to:
      // 1. Store current options
      // 2. Destroy section
      // 3. Re-init with new debug setting
    }
  }
  
  /**
   * Update offset for a section
   * Note: Requires reinitialization due to Scrollama limitation
   */
  setOffset(sectionId, newOffset) {
    const scroller = this.scrollers.get(sectionId);
    if (scroller) {
      console.warn('Offset change requires reinitialization with offset:', newOffset);
      // You would need to:
      // 1. Store current handlers
      // 2. Destroy section
      // 3. Re-init with new offset
    }
  }
  
  /**
   * Get all active sections
   */
  getSections() {
    return Array.from(this.scrollers.keys());
  }
  
  /**
   * Check if section exists
   */
  hasSection(sectionId) {
    return this.scrollers.has(sectionId);
  }
  
  /**
   * Get step count for a section
   */
  getStepCount(sectionId) {
    const sectionHandlers = this.handlers.get(sectionId);
    return sectionHandlers ? sectionHandlers.size : 0;
  }
  
  // ==================== INTERNAL HANDLERS ====================
  
  _handleStepEnter(sectionId, response) {
    const stepId = response.element.dataset.stepId || response.index;
    
    // Section-specific handler
    const sectionHandlers = this.handlers.get(sectionId);
    if (sectionHandlers) {
      const handlers = sectionHandlers.get(String(stepId));
      if (handlers?.onEnter) handlers.onEnter(response);
    }
    
    // Global handlers
    this._callGlobalHandlers('onEnter', sectionId, response);
  }
  
  _handleStepExit(sectionId, response) {
    const stepId = response.element.dataset.stepId || response.index;
    
    // Section-specific handler
    const sectionHandlers = this.handlers.get(sectionId);
    if (sectionHandlers) {
      const handlers = sectionHandlers.get(String(stepId));
      if (handlers?.onExit) handlers.onExit(response);
    }
    
    // Global handlers
    this._callGlobalHandlers('onExit', sectionId, response);
  }
  
  _handleStepProgress(sectionId, response) {
    const stepId = response.element.dataset.stepId || response.index;
    
    // Section-specific handler
    const sectionHandlers = this.handlers.get(sectionId);
    if (sectionHandlers) {
      const handlers = sectionHandlers.get(String(stepId));
      if (handlers?.onProgress) handlers.onProgress(response);
    }
    
    // Global handlers
    this._callGlobalHandlers('onProgress', sectionId, response);
  }
  
  _callGlobalHandlers(type, sectionId, response) {
    this.globalHandlers.forEach(handler => {
      // Check filter conditions
      const filter = handler.filter || {};
      if (filter.sectionId && filter.sectionId !== sectionId) return;
      if (filter.stepClass && !response.element.classList.contains(filter.stepClass)) return;
      
      // Call handler if it exists
      if (handler[type]) handler[type](response);
    });
  }
}

// Singleton instance
export const scrollManager = new ScrollManager();

// Utility function for common step ID pattern
export function createStepId(sectionId, index) {
  return `${sectionId}-${index}`;
}

// Quick setup function for common use case
export function quickSetup(sectionId, items, callbacks = {}, options = {}) {
  const stepsContainer = scrollManager.setupSteps(sectionId, items, {
    getStepId: (item, i) => createStepId(sectionId, i),
    onEnter: callbacks.onEnter,
    onExit: callbacks.onExit,
    onProgress: callbacks.onProgress,
    ...options
  });
  
  const { cleanup } = scrollManager.initSection(sectionId, {
    step: `[data-section="${sectionId}"]`,
    offset: options.offset || 0.65,
    progress: callbacks.onProgress ? true : false,
    debug: options.debug || false,
    ...options
  });
  
  return {
    stepsContainer,
    destroy: () => {
      stepsContainer.remove();
      scrollManager.destroySection(sectionId);
      cleanup();
    }
  };
}

// Helper for creating step elements in Svelte components
export function createSteps(sectionId, count, height = '100vh') {
  const steps = [];
  for (let i = 0; i < count; i++) {
    const step = ScrollManager.createStep(sectionId, i, height);
    steps.push(step);
  }
  return steps;
}