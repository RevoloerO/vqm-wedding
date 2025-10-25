/**
 * Custom React Hooks for Optimized Scroll Handling
 * Uses requestAnimationFrame and throttling for better performance
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { throttle } from '../utils/performanceUtils';

/**
 * Optimized scroll position hook
 * Uses RAF and throttling to prevent excessive re-renders
 *
 * @param {number} throttleMs - Throttle interval in milliseconds
 * @returns {Object} { scrollY, scrollX, scrollDirection }
 */
export const useOptimizedScroll = (throttleMs = 100) => {
  const [scrollPosition, setScrollPosition] = useState({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: 'down'
  });

  const lastScrollY = useRef(0);
  const rafId = useRef(null);

  const updateScrollPosition = useCallback(() => {
    const currentScrollY = window.scrollY;
    const currentScrollX = window.scrollX;

    setScrollPosition({
      scrollY: currentScrollY,
      scrollX: currentScrollX,
      scrollDirection: currentScrollY > lastScrollY.current ? 'down' : 'up'
    });

    lastScrollY.current = currentScrollY;
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(updateScrollPosition);
    }, throttleMs);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial call
    updateScrollPosition();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updateScrollPosition, throttleMs]);

  return scrollPosition;
};

/**
 * Hook to detect if element is visible in viewport
 * Uses Intersection Observer API for optimal performance
 *
 * @param {Object} options - Intersection Observer options
 * @returns {Array} [ref, isVisible]
 */
export const useInView = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, options]);

  return [setRef, isVisible];
};

/**
 * Hook to trigger animation on scroll into view
 * Combines Intersection Observer with animation classes
 *
 * @param {string} animationClass - CSS class to apply when visible
 * @param {Object} options - Intersection Observer options
 * @returns {Array} [ref, isVisible, hasAnimated]
 */
export const useScrollAnimation = (animationClass = 'is-visible', options = {}) => {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
          ref.classList.add(animationClass);

          // Clean up will-change after animation
          setTimeout(() => {
            ref.classList.add('animation-complete');
            ref.classList.remove('animating');
          }, 1000);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
        ...options
      }
    );

    if (ref) {
      ref.classList.add('reveal-on-scroll');
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, animationClass, hasAnimated, options]);

  return [setRef, isVisible, hasAnimated];
};

/**
 * Hook for detecting scroll direction
 * Useful for hiding/showing headers on scroll
 *
 * @param {number} threshold - Scroll threshold in pixels
 * @returns {string} 'up' | 'down' | 'static'
 */
export const useScrollDirection = (threshold = 10) => {
  const [scrollDirection, setScrollDirection] = useState('static');
  const lastScrollY = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const difference = Math.abs(currentScrollY - lastScrollY.current);

      if (difference < threshold) {
        setScrollDirection('static');
      } else if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      lastScrollY.current = currentScrollY;
    };

    const handleScroll = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      rafId.current = requestAnimationFrame(updateScrollDirection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [threshold]);

  return scrollDirection;
};

/**
 * Hook to show/hide element based on scroll position
 * Common pattern for "scroll to top" buttons
 *
 * @param {number} showAfter - Scroll position in pixels to show element
 * @returns {boolean} isVisible
 */
export const useScrollVisibility = (showAfter = 300) => {
  const [isVisible, setIsVisible] = useState(false);
  const rafId = useRef(null);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > showAfter);
    };

    const handleScroll = throttle(() => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      rafId.current = requestAnimationFrame(updateVisibility);
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    updateVisibility();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [showAfter]);

  return isVisible;
};

/**
 * Hook for parallax scrolling effect
 * Provides scroll-based transform values
 *
 * @param {number} speed - Parallax speed multiplier (0.1 - 1.0)
 * @returns {Object} { transform, opacity }
 */
export const useParallax = (speed = 0.5) => {
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');
  const rafId = useRef(null);

  useEffect(() => {
    const updateParallax = () => {
      const scrolled = window.scrollY;
      const yPos = -(scrolled * speed);
      setTransform(`translate3d(0, ${yPos}px, 0)`);
    };

    const handleScroll = throttle(() => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      rafId.current = requestAnimationFrame(updateParallax);
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [speed]);

  return { transform };
};

export default useOptimizedScroll;
