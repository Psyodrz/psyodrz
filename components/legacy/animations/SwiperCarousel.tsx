'use client';

import { ReactNode } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, EffectCube, EffectFlip, EffectCards, EffectCreative } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-creative';

type EffectType = 'slide' | 'fade' | 'cube' | 'flip' | 'cards' | 'creative';

interface SwiperCarouselProps {
  slides: ReactNode[];
  effect?: EffectType;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
  spaceBetween?: number;
  slidesPerView?: number | 'auto';
  navigation?: boolean;
  pagination?: boolean;
  className?: string;
}

export default function SwiperCarousel({
  slides,
  effect = 'slide',
  autoplay = true,
  loop = true,
  speed = 800,
  spaceBetween = 30,
  slidesPerView = 1,
  navigation = true,
  pagination = true,
  className = '',
}: SwiperCarouselProps) {
  // Register required modules based on effect
  const getModules = () => {
    const modules = [Navigation, Pagination];
    
    if (autoplay) {
      modules.push(Autoplay);
    }
    
    switch (effect) {
      case 'fade':
        modules.push(EffectFade);
        break;
      case 'cube':
        modules.push(EffectCube);
        break;
      case 'flip':
        modules.push(EffectFlip);
        break;
      case 'cards':
        modules.push(EffectCards);
        break;
      case 'creative':
        modules.push(EffectCreative);
        break;
      default:
        break;
    }
    
    return modules;
  };

  return (
    <Swiper
      modules={getModules()}
      effect={effect === 'slide' ? undefined : effect}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      navigation={navigation}
      pagination={pagination ? { clickable: true } : false}
      loop={loop}
      speed={speed}
      autoplay={autoplay ? { delay: 5000, disableOnInteraction: false } : false}
      className={className}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
} 