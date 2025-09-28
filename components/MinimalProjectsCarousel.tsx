'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

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

interface MinimalProjectsCarouselProps {
  projects: Project[];
}

export default function MinimalProjectsCarousel({ projects }: MinimalProjectsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const dragThreshold = 50; // Minimum distance to trigger slide change

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || projects.length <= 1) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, projects.length]);

  // Update transform
  useEffect(() => {
    setTranslateX(-currentIndex * 100);
  }, [currentIndex]);

  const stopAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setTimeout(() => setIsAutoPlaying(true), 3000);
  }, []);

  // Universal event handlers (works for both touch and mouse)
  const handleStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
    stopAutoPlay();
  }, [stopAutoPlay]);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    
    setCurrentX(clientX);
    const diff = clientX - startX;
    const containerWidth = containerRef.current.offsetWidth;
    const movePercentage = (diff / containerWidth) * 100;
    
    // Apply resistance at boundaries
    let newTranslate = -currentIndex * 100 + movePercentage;
    
    if (currentIndex === 0 && movePercentage > 0) {
      newTranslate = movePercentage * 0.3;
    } else if (currentIndex === projects.length - 1 && movePercentage < 0) {
      newTranslate = -currentIndex * 100 + movePercentage * 0.3;
    }
    
    setTranslateX(newTranslate);
  }, [isDragging, startX, currentIndex, projects.length]);

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const diff = currentX - startX;
    
    if (Math.abs(diff) > dragThreshold) {
      if (diff > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (diff < 0 && currentIndex < projects.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
    
    // Reset to current slide position
    setTranslateX(-currentIndex * 100);
  }, [isDragging, currentX, startX, currentIndex, projects.length]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    stopAutoPlay();
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : projects.length - 1);
    stopAutoPlay();
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex < projects.length - 1 ? currentIndex + 1 : 0);
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
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/50 to-card border border-border/50 shadow-xl">
        <div
          ref={containerRef}
          className="flex cursor-grab active:cursor-grabbing"
          style={{
            transform: `translateX(${translateX}%)`,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            touchAction: 'pan-y',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={isDragging ? handleMouseMove : undefined}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="w-full flex-shrink-0 relative"
              style={{ minHeight: '400px' }}
            >
              {/* Project Content */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10`} />
              <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center">
                <div className="max-w-2xl">
                  {/* Project Number */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-mono text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="h-px bg-primary/30 flex-1" />
                    <span className="text-xs text-muted-foreground">
                      {index + 1} of {projects.length}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 max-w-xl">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-background/60 text-foreground rounded-full border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-background/80 text-foreground rounded-lg hover:bg-background border border-border/50 transition-colors font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/90 hover:bg-background border border-border/50 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-background/90 hover:bg-background border border-border/50 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
          aria-label="Next project"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots Indicator */}
      {projects.length > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-primary scale-110'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Swipe Hint */}
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground">
          Swipe or drag to explore • Auto-advances every 4 seconds
        </p>
      </div>
    </div>
  );
}
