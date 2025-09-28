'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import scrollReveal from 'scrollreveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Global initialization flags to prevent multiple initializations
let aosInitialized = false;
let srInitialized = false;

/**
 * Initializes all animation libraries
 */
export function initAnimations() {
  if (typeof window === 'undefined') return;
  
  // Initialize AOS (Animate on Scroll)
  if (!aosInitialized) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 0,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
    
    aosInitialized = true;
    console.log('AOS initialized');
  }
  
  // Initialize ScrollReveal
  if (!srInitialized) {
    scrollReveal({
      origin: 'bottom',
      distance: '20px',
      duration: 800,
      delay: 0,
      reset: false,
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      viewFactor: 0.2,
    });
    
    srInitialized = true;
    console.log('ScrollReveal initialized');
  }
  
  // Initialize GSAP ScrollTrigger
  // This automatically works with any new ScrollTrigger instances
}

/**
 * Hook to initialize animations in components
 */
export function useAnimations() {
  useEffect(() => {
    initAnimations();
    
    // Refresh animations on component mount
    if (typeof window !== 'undefined') {
      AOS.refresh();
    }
    
    // Setup window resize handler to refresh animations
    const handleResize = () => {
      AOS.refresh();
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);
}

/**
 * GSAP utility functions
 */
export const gsapUtils = {
  fadeIn: (element: string | Element, delay = 0, duration = 0.8) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration, 
        delay,
        ease: 'power2.out',
      }
    );
  },
  
  staggerFadeIn: (elements: string | Element[], stagger = 0.1, delay = 0, duration = 0.8) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration, 
        delay,
        stagger,
        ease: 'power2.out',
      }
    );
  },
  
  revealFromLeft: (element: string | Element, delay = 0, duration = 0.8) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0, 
        duration, 
        delay,
        ease: 'power2.out',
      }
    );
  },
  
  revealFromRight: (element: string | Element, delay = 0, duration = 0.8) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: 50 },
      { 
        opacity: 1, 
        x: 0, 
        duration, 
        delay,
        ease: 'power2.out',
      }
    );
  },
  
  clipReveal: (element: string | Element, delay = 0, duration = 1) => {
    return gsap.fromTo(
      element,
      { 
        clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' 
      },
      { 
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration,
        delay,
        ease: 'power3.inOut'
      }
    );
  },
  
  createScrollTrigger: (
    element: string | Element, 
    animation: gsap.core.Tween,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false
  ) => {
    return ScrollTrigger.create({
      trigger: element,
      start,
      end,
      scrub,
      animation,
      toggleActions: 'play none none none'
    });
  }
}; 