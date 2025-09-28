'use client';

import { ReactNode, useEffect } from 'react';

interface AnimationProviderProps {
  children: ReactNode;
}

export default function AnimationProvider({ children }: AnimationProviderProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize all animation libraries
    const initializeAnimations = async () => {
      try {
        const { initAnimations } = await import('@/lib/animations');
    initAnimations();
      } catch (error) {
        console.error('Failed to initialize animations:', error);
      }
    };

    initializeAnimations();
    
    // Handle page transitions and reinitialize animations
    const handleRouteChange = async () => {
      if (typeof window === 'undefined') return;
      
      try {
        const AOS = await import('aos');
        setTimeout(() => {
            AOS.refresh();
        }, 200);
      } catch (error) {
        console.error('Failed to refresh animations:', error);
      }
    };
    
    // Add route change listener
    window.addEventListener('popstate', handleRouteChange);
    
    // Clean up animations on unmount
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);
  
  return <>{children}</>;
} 