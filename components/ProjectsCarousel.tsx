'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GitHubRepoCard from './GitHubRepoCard';

interface Project {
  title: string;
  description: string;
  color: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  order: number;
}

interface ProjectsCarouselProps {
  projects: Project[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [animationId, setAnimationId] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || projects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  // Update transform when currentIndex changes
  useEffect(() => {
    const newTranslate = -currentIndex * 100;
    setCurrentTranslate(newTranslate);
    setPrevTranslate(newTranslate);
  }, [currentIndex]);

  // Animation function
  const animation = useCallback(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${currentTranslate}%)`;
    }
    if (isDragging) {
      const id = requestAnimationFrame(animation);
      setAnimationId(id);
    }
  }, [currentTranslate, isDragging]);

  // Start animation when dragging
  useEffect(() => {
    if (isDragging) {
      const id = requestAnimationFrame(animation);
      setAnimationId(id);
    } else if (animationId) {
      cancelAnimationFrame(animationId);
      setAnimationId(null);
    }
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isDragging, animation, animationId]);

  // Utility functions
  const stopAutoPlay = () => {
    setIsAutoPlaying(false);
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  const getPositionX = (event: React.TouchEvent | React.MouseEvent): number => {
    if ('touches' in event) {
      return event.touches[0].clientX;
    }
    return event.clientX;
  };

  const getPositionY = (event: React.TouchEvent | React.MouseEvent): number => {
    if ('touches' in event) {
      return event.touches[0].clientY;
    }
    return event.clientY;
  };

  // Touch/Mouse start handlers
  const handleStart = (event: React.TouchEvent | React.MouseEvent) => {
    const x = getPositionX(event);
    const y = getPositionY(event);
    
    setIsDragging(true);
    setStartPos({ x, y });
    stopAutoPlay();
    
    // Prevent default behavior for mouse events to avoid text selection
    if ('preventDefault' in event) {
      event.preventDefault();
    }
  };

  // Touch/Mouse move handlers
  const handleMove = (event: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    
    const currentX = getPositionX(event);
    const currentY = getPositionY(event);
    const diffX = currentX - startPos.x;
    const diffY = currentY - startPos.y;
    
    // Check if this is more of a vertical scroll (prevent interference with page scroll)
    if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 10) {
      setIsDragging(false);
      return;
    }
    
    // Prevent page scrolling when swiping horizontally
    if (Math.abs(diffX) > 10) {
      event.preventDefault();
    }
    
    const movePercentage = (diffX / (carouselRef.current?.offsetWidth || 1)) * 100;
    const newTranslate = prevTranslate + movePercentage;
    
    // Add resistance at boundaries
    const maxTranslate = 0;
    const minTranslate = -(projects.length - 1) * 100;
    
    if (newTranslate > maxTranslate) {
      setCurrentTranslate(maxTranslate + (newTranslate - maxTranslate) * 0.3);
    } else if (newTranslate < minTranslate) {
      setCurrentTranslate(minTranslate + (newTranslate - minTranslate) * 0.3);
    } else {
      setCurrentTranslate(newTranslate);
    }
  };

  // Touch/Mouse end handlers
  const handleEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    const movedBy = currentTranslate - prevTranslate;
    const threshold = 25; // Percentage of container width needed to trigger slide change
    
    if (Math.abs(movedBy) > threshold) {
      if (movedBy < -threshold && currentIndex < projects.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (movedBy > threshold && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else {
        // Snap back to current slide
        setCurrentTranslate(prevTranslate);
      }
    } else {
      // Snap back to current slide
      setCurrentTranslate(prevTranslate);
    }
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    stopAutoPlay();
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(projects.length - 1);
    }
    stopAutoPlay();
  };

  const goToNext = () => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
    stopAutoPlay();
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No projects to display</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-xl">
        <div
          ref={carouselRef}
          className="flex cursor-grab active:cursor-grabbing select-none"
          style={{
            transform: `translateX(${currentTranslate}%)`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onDragStart={(e) => e.preventDefault()} // Prevent image dragging
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="w-full flex-shrink-0 px-2 sm:px-4"
              style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
            >
              <GitHubRepoCard
                repoUrl={project.github}
                title={project.title}
                description={project.description}
                tags={project.tags}
                color={project.color}
                className="h-full"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        {projects.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isDragging}
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background border rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isDragging}
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {projects.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isDragging}
              className={`w-2 h-2 rounded-full transition-all duration-200 disabled:cursor-not-allowed ${
                index === currentIndex
                  ? 'bg-primary scale-125'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mobile Swipe Indicator */}
      <div className="sm:hidden text-center mt-4">
        <p className="text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            👆 Swipe to explore projects
          </span>
        </p>
      </div>

      {/* Project Counter */}
      <div className="text-center mt-2">
        <p className="text-sm text-muted-foreground">
          {currentIndex + 1} of {projects.length}
        </p>
      </div>
    </div>
  );
}
