'use client';

import { useRef, useEffect } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useInView } from 'react-intersection-observer';

interface LottieAnimationProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  playOnScroll?: boolean;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
}

export default function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  playOnScroll = false,
  className = '',
  style = {},
  width = '100%',
  height = '100%',
}: LottieAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  useEffect(() => {
    if (playOnScroll && lottieRef.current) {
      if (inView) {
        lottieRef.current.play();
      } else {
        lottieRef.current.pause();
      }
    }
  }, [inView, playOnScroll]);

  return (
    <div ref={ref} className={className} style={{ width, height, ...style }}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay && !playOnScroll}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
} 