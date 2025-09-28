'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out' | 'flip-up' | 'flip-down';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  animation: AnimationType;
  duration?: number;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
}

export default function ScrollAnimationWrapper({
  children,
  animation,
  duration = 0.8,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
}: ScrollAnimationWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  useEffect(() => {
    if (!elementRef.current) return;
    
    const element = elementRef.current;
    
    // Set initial state
    gsap.set(element, { 
      autoAlpha: 0,
      ...(animation === 'fade-up' && { y: 50 }),
      ...(animation === 'fade-down' && { y: -50 }),
      ...(animation === 'fade-left' && { x: -50 }),
      ...(animation === 'fade-right' && { x: 50 }),
      ...(animation === 'zoom-in' && { scale: 0.8 }),
      ...(animation === 'zoom-out' && { scale: 1.2 }),
      ...(animation.includes('flip') && { 
        rotationX: animation === 'flip-up' ? -90 : 90,
        transformPerspective: 500
      }),
    });
    
    // Animate when in view
    if (inView) {
      gsap.to(element, {
        autoAlpha: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotationX: 0,
        duration,
        delay,
        ease: "power3.out",
      });
    }
  }, [inView, animation, duration, delay]);

  return (
    <div ref={ref} className={className}>
      <div ref={elementRef}>
        {children}
      </div>
    </div>
  );
} 