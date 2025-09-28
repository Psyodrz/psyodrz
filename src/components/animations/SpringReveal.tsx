'use client';

import { ReactNode } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

type SpringEffectType = 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'rotate' | 'bounce';
type SpringConfigType = 'default' | 'gentle' | 'wobbly' | 'stiff' | 'slow' | 'molasses';

interface SpringRevealProps {
  children: ReactNode;
  effect: SpringEffectType;
  config?: SpringConfigType;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
}

export default function SpringReveal({
  children,
  effect,
  config: springConfig = 'default',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
}: SpringRevealProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  const getSpringProps = () => {
    const baseProps = {
      config: config[springConfig as keyof typeof config],
      delay,
    };

    switch (effect) {
      case 'slide-up':
        return {
          ...baseProps,
          from: { opacity: 0, transform: 'translateY(50px)' },
          to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0px)' : 'translateY(50px)' },
        };
      case 'slide-down':
        return {
          ...baseProps,
          from: { opacity: 0, transform: 'translateY(-50px)' },
          to: { opacity: inView ? 1 : 0, transform: inView ? 'translateY(0px)' : 'translateY(-50px)' },
        };
      case 'slide-left':
        return {
          ...baseProps,
          from: { opacity: 0, transform: 'translateX(-50px)' },
          to: { opacity: inView ? 1 : 0, transform: inView ? 'translateX(0px)' : 'translateX(-50px)' },
        };
      case 'slide-right':
        return {
          ...baseProps,
          from: { opacity: 0, transform: 'translateX(50px)' },
          to: { opacity: inView ? 1 : 0, transform: inView ? 'translateX(0px)' : 'translateX(50px)' },
        };
      case 'scale':
        return {
          ...baseProps,
          from: { opacity: 0, transform: 'scale(0.8)' },
          to: { opacity: inView ? 1 : 0, transform: inView ? 'scale(1)' : 'scale(0.8)' },
        };
      case 'rotate':
        return {
          ...baseProps,
          from: { opacity: 0, transform: 'rotate(-15deg)' },
          to: { opacity: inView ? 1 : 0, transform: inView ? 'rotate(0deg)' : 'rotate(-15deg)' },
        };
      case 'bounce':
        return {
          config: config.wobbly,
          from: { opacity: 0, transform: 'scale(0.5)' },
          to: { opacity: inView ? 1 : 0, transform: inView ? 'scale(1)' : 'scale(0.5)' },
        };
      default:
        return {
          ...baseProps,
          from: { opacity: 0 },
          to: { opacity: inView ? 1 : 0 },
        };
    }
  };

  const springProps = useSpring(getSpringProps());

  return (
    <div ref={ref} className={className}>
      <animated.div style={springProps}>
        {children}
      </animated.div>
    </div>
  );
} 