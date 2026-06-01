// hooks/useScrollAnimation.js
'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Custom hook for scroll-based animations
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @param {string} options.rootMargin - Root margin for intersection observer
 * @param {boolean} options.triggerOnce - Whether to trigger animation only once
 * @returns {Object} - Refs and animation states
 */
export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: triggerOnce, threshold, rootMargin });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return { ref, isInView, hasAnimated };
};

/**
 * Hook for parallax scrolling effect
 * @param {number} speed - Parallax speed factor
 * @param {string} direction - Direction of parallax ('vertical' or 'horizontal')
 * @returns {Object} - Transform value and ref
 */
export const useParallax = (speed = 0.5, direction = 'vertical') => {
  const ref = useRef(null);
  const [transform, setTransform] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const offset = rect.top + scrolled;
      const distance = scrolled - offset;
      
      if (direction === 'vertical') {
        setTransform(distance * speed);
      } else {
        setTransform(distance * speed);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return { ref, transform };
};

/**
 * Hook for sequential text reveal animation
 * @param {string} text - Text to animate
 * @param {number} delay - Delay before animation starts
 * @param {number} duration - Duration per character
 * @returns {Object} - Animated text and states
 */
export const useTextReveal = (text, delay = 0, duration = 0.05) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const startAnimation = () => {
      setIsAnimating(true);
      indexRef.current = 0;
      setDisplayText('');
      
      const animateChar = () => {
        if (indexRef.current < text.length) {
          setDisplayText(prev => prev + text[indexRef.current]);
          indexRef.current++;
          timeoutRef.current = setTimeout(animateChar, duration * 1000);
        } else {
          setIsAnimating(false);
          setIsComplete(true);
        }
      };
      
      timeoutRef.current = setTimeout(animateChar, delay * 1000);
    };
    
    startAnimation();
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, delay, duration]);

  return { displayText, isAnimating, isComplete };
};

/**
 * Hook for scroll-triggered counter animation
 * @param {number} end - End value for counter
 * @param {number} duration - Animation duration in seconds
 * @returns {Object} - Current count and ref
 */
export const useCountAnimation = (end, duration = 2) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return { count, ref };
};

/**
 * Hook for staggered child animations
 * @param {number} staggerDelay - Delay between each child animation
 * @returns {Object} - Parent and child animation variants
 */
export const useStaggerAnimation = (staggerDelay = 0.1) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return { containerVariants, itemVariants };
};

/**
 * Hook for hover animations
 * @param {number} scale - Scale factor on hover
 * @returns {Object} - Animation controls and event handlers
 */
export const useHoverAnimation = (scale = 1.05) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const hoverProps = {
    whileHover: { scale, transition: { duration: 0.3 } },
    onHoverStart: () => setIsHovered(true),
    onHoverEnd: () => setIsHovered(false)
  };
  
  return { isHovered, hoverProps };
};

/**
 * Hook for page transition animations
 * @returns {Object} - Page transition variants
 */
export const usePageTransition = () => {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.61, 1, 0.88, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.61, 1, 0.88, 1]
      }
    }
  };

  return { pageVariants };
};

/**
 * Hook for scroll progress tracking
 * @returns {Object} - Scroll progress percentage
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { progress };
};

/**
 * Hook for element fade-in on scroll
 * @param {number} threshold - Visibility threshold
 * @returns {Object} - Ref and visibility state
 */
export const useFadeInOnScroll = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

/**
 * Hook for magnetic button effect
 * @returns {Object} - Position and event handlers
 */
export const useMagneticEffect = () => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return { ref, position, handleMouseMove, handleMouseLeave };
};

/**
 * Hook for smooth scroll to element
 * @returns {Function} - Scroll function
 */
export const useSmoothScroll = () => {
  const scrollToElement = (elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return { scrollToElement };
};

/**
 * Hook for background parallax effect
 * @param {number} speed - Parallax speed
 * @returns {Object} - Transform style and ref
 */
export const useBackgroundParallax = (speed = 0.3) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrolled = window.scrollY;
      const rate = scrolled * speed;
      setOffset(rate);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  const transform = `translateY(${offset}px)`;
  
  return { ref, transform };
};

export default {
  useScrollAnimation,
  useParallax,
  useTextReveal,
  useCountAnimation,
  useStaggerAnimation,
  useHoverAnimation,
  usePageTransition,
  useScrollProgress,
  useFadeInOnScroll,
  useMagneticEffect,
  useSmoothScroll,
  useBackgroundParallax
};