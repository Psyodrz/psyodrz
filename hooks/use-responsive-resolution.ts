import { useState, useEffect, useCallback } from 'react';

export function useResponsiveResolution() {
  const [resolution, setResolution] = useState(0.5);

  const updateResolution = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;
    
    // Consider both width and pixel ratio for better performance
    const effectiveWidth = width * pixelRatio;
    
    if (width <= 480 || effectiveWidth <= 960) {
      setResolution(0.2); // Very low resolution for small screens
    } else if (width <= 768 || effectiveWidth <= 1536) {
      setResolution(0.3); // Low resolution for mobile
    } else if (width <= 1024 || effectiveWidth <= 2048) {
      setResolution(0.4); // Medium resolution for tablets
    } else if (width <= 1440) {
      setResolution(0.5); // Standard resolution for desktop
    } else {
      setResolution(0.6); // Higher resolution for large screens
    }
  }, []);

  useEffect(() => {
    // Set initial resolution
    updateResolution();

    // Throttle resize events for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateResolution, 100);
    };

    window.addEventListener('resize', throttledUpdate, { passive: true });

    return () => {
      window.removeEventListener('resize', throttledUpdate);
      clearTimeout(timeoutId);
    };
  }, [updateResolution]);

  return resolution;
}
