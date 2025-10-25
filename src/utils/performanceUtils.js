/**
 * Performance Utilities
 * Optimized helper functions for animations, scroll, and rendering
 */

/**
 * Debounce function - limits how often a function can fire
 * Use for scroll, resize, and input events
 *
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 150) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function - ensures function fires at most once per interval
 * Use for continuous events like scroll
 *
 * @param {Function} func - Function to throttle
 * @param {number} limit - Minimum time between calls in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * RequestAnimationFrame-based scroll handler
 * More performant than traditional scroll listeners
 *
 * @param {Function} callback - Function to call on scroll
 * @returns {Function} Cleanup function
 */
export const useRAFScroll = (callback) => {
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

/**
 * Intersection Observer for lazy animations
 * Triggers animations when element enters viewport
 *
 * @param {HTMLElement} element - Element to observe
 * @param {Function} callback - Function to call when visible
 * @param {Object} options - Intersection Observer options
 * @returns {IntersectionObserver} Observer instance
 */
export const observeElement = (element, callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);

  if (element) {
    observer.observe(element);
  }

  return observer;
};

/**
 * Preload image for better UX
 *
 * @param {string} src - Image source URL
 * @returns {Promise} Resolves when image is loaded
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Preload multiple images
 *
 * @param {Array<string>} srcArray - Array of image URLs
 * @returns {Promise<Array>} Resolves when all images loaded
 */
export const preloadImages = (srcArray) => {
  return Promise.all(srcArray.map(preloadImage));
};

/**
 * Check if reduced motion is preferred by user
 * Respects user's accessibility preferences
 *
 * @returns {boolean} True if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get safe animation duration based on user preference
 * Returns 0 if user prefers reduced motion
 *
 * @param {number} duration - Default animation duration in ms
 * @returns {number} Safe duration (0 if reduced motion preferred)
 */
export const getSafeAnimationDuration = (duration) => {
  return prefersReducedMotion() ? 0 : duration;
};

/**
 * Measure performance of a function
 * Useful for debugging performance bottlenecks
 *
 * @param {Function} fn - Function to measure
 * @param {string} label - Label for the measurement
 * @returns {any} Result of the function
 */
export const measurePerformance = (fn, label = 'Operation') => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${label} took ${(end - start).toFixed(2)}ms`);
  return result;
};

/**
 * Lazy load component with timeout fallback
 * Prevents indefinite loading states
 *
 * @param {Function} importFunc - Dynamic import function
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise} Component promise
 */
export const lazyWithTimeout = (importFunc, timeout = 10000) => {
  return Promise.race([
    importFunc(),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Component load timeout')), timeout)
    )
  ]);
};
