'use client';

import { ReactNode, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

type AOSAnimation = 
  | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right'
  | 'fade-up-right' | 'fade-up-left' | 'fade-down-right' | 'fade-down-left'
  | 'flip-left' | 'flip-right' | 'flip-up' | 'flip-down'
  | 'zoom-in' | 'zoom-in-up' | 'zoom-in-down' | 'zoom-in-left' | 'zoom-in-right'
  | 'zoom-out' | 'zoom-out-up' | 'zoom-out-down' | 'zoom-out-left' | 'zoom-out-right'
  | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';

interface AOSWrapperProps {
  children: ReactNode;
  animation: AOSAnimation;
  duration?: number;
  delay?: number;
  once?: boolean;
  easing?: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
  anchor?: string;
  anchorPlacement?: 
    | 'top-bottom' | 'top-center' | 'top-top'
    | 'center-bottom' | 'center-center' | 'center-top'
    | 'bottom-bottom' | 'bottom-center' | 'bottom-top';
  className?: string;
}

// Initialize AOS
let initialized = false;

export default function AOSWrapper({
  children,
  animation,
  duration = 800,
  delay = 0,
  once = true,
  easing = 'ease',
  anchor,
  anchorPlacement,
  className = '',
}: AOSWrapperProps) {
  useEffect(() => {
    if (!initialized) {
      AOS.init({
        // Global settings
        disable: false,
        startEvent: 'DOMContentLoaded',
        initClassName: 'aos-init',
        animatedClassName: 'aos-animate',
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
        
        // Settings that can be overridden per element
        offset: 120,
        delay: 0,
        duration: 800,
        easing: 'ease',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom',
      });
      
      initialized = true;
    }
    
    // Refresh AOS when props change
    AOS.refresh();
  }, []);

  return (
    <div 
      className={className}
      data-aos={animation}
      data-aos-duration={duration}
      data-aos-delay={delay}
      data-aos-once={once}
      data-aos-easing={easing}
      data-aos-anchor={anchor}
      data-aos-anchor-placement={anchorPlacement}
    >
      {children}
    </div>
  );
} 