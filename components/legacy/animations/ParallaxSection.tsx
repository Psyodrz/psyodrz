'use client';

import { ReactNode } from 'react';
import { Parallax } from 'react-parallax';

interface ParallaxSectionProps {
  children: ReactNode;
  bgImage: string;
  strength?: number;
  blur?: number;
  className?: string;
  overlayColor?: string;
  overlayOpacity?: number;
}

export default function ParallaxSection({
  children,
  bgImage,
  strength = 400,
  blur = 0,
  className = '',
  overlayColor = '#000000',
  overlayOpacity = 0.5,
}: ParallaxSectionProps) {
  return (
    <Parallax
      bgImage={bgImage}
      strength={strength}
      blur={blur}
      className={`relative ${className}`}
    >
      {overlayOpacity > 0 && (
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
          }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </Parallax>
  );
} 