'use client';

import { useRef, useEffect, ReactNode } from 'react';
import scrollReveal from 'scrollreveal';

interface ScrollRevealProps {
  children: ReactNode;
  origin?: 'top' | 'right' | 'bottom' | 'left';
  distance?: string;
  duration?: number;
  delay?: number;
  interval?: number;
  rotate?: { x?: number; y?: number; z?: number };
  opacity?: number;
  scale?: number;
  easing?: string;
  mobile?: boolean;
  reset?: boolean;
  viewFactor?: number;
  viewOffset?: { top?: number; right?: number; bottom?: number; left?: number };
  className?: string;
}

let srInitialized = false;

export default function ScrollReveal({
  children,
  origin = 'bottom',
  distance = '50px',
  duration = 1000,
  delay = 0,
  interval = 0,
  rotate = { x: 0, y: 0, z: 0 },
  opacity = 0,
  scale = 1,
  easing = 'cubic-bezier(0.5, 0, 0, 1)',
  mobile = true,
  reset = false,
  viewFactor = 0.2,
  viewOffset = { top: 0, right: 0, bottom: 0, left: 0 },
  className = '',
}: ScrollRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scrollReveal if not already done
    if (typeof window !== 'undefined' && !srInitialized) {
      scrollReveal({ reset: false });
      srInitialized = true;
    }

    if (sectionRef.current) {
      const sr = scrollReveal();
      
      sr.reveal(sectionRef.current, {
        origin,
        distance,
        duration,
        delay,
        interval,
        rotate,
        opacity,
        scale,
        easing,
        mobile,
        reset,
        viewFactor,
        viewOffset,
        beforeReveal: (domEl: HTMLElement) => {
          // Optional callback before reveal
        },
        beforeReset: (domEl: HTMLElement) => {
          // Optional callback before reset
        },
        afterReveal: (domEl: HTMLElement) => {
          // Optional callback after reveal
        },
        afterReset: (domEl: HTMLElement) => {
          // Optional callback after reset
        },
      });
    }
    
    // Cleanup function to prevent memory leaks
    return () => {
      if (sectionRef.current) {
        scrollReveal().clean(sectionRef.current);
      }
    };
  }, [
    origin, distance, duration, delay, interval, 
    rotate, opacity, scale, easing, mobile, reset,
    viewFactor, viewOffset
  ]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
} 