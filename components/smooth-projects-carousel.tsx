"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, Github, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  code?: string
  demo?: string
  featured: boolean
}

const projects: Project[] = [
  {
    id: "maze-game",
    title: "3D Maze Game",
    description: "Procedurally generated 3D maze with pathfinding algorithms built with Three.js and WebGL for immersive gaming experience.",
    image: '/projects/3d-maze.jpg',
    tags: ["Three.js", "WebGL", "JavaScript", "Algorithms"],
    code: "https://github.com/psyodrz/3d-maze-game",
    demo: "https://maze-game-demo.vercel.app",
    featured: true
  },
  {
    id: "face-detection",
    title: "AI Face Detection",
    description: "Real-time face detection system using computer vision and machine learning with high accuracy and performance optimization.",
    image: '/projects/face-detection.jpg',
    tags: ["Python", "OpenCV", "AI/ML", "Computer Vision"],
    code: "https://github.com/psyodrz/face-detection-ai",
    demo: "https://face-detection-demo.vercel.app",
    featured: true
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "Modern responsive portfolio with interactive animations, smooth UX, and optimized performance across all devices.",
    image: '/placeholder.jpg',
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    code: "https://github.com/psyodrz/portfolio",
    demo: "https://aditya-srivastava.vercel.app",
    featured: true
  },
  {
    id: "flippy-floppy",
    title: "Flippy Floppy",
    description: "Casual arcade game with innovative flipping mechanics, progressive difficulty, and engaging gameplay mechanics.",
    image: '/placeholder.jpg',
    tags: ["JavaScript", "CSS", "Game Dev", "UI/UX"],
    code: "https://github.com/psyodrz/flippy-floppy",
    demo: "https://flippy-floppy-game.vercel.app",
    featured: true
  },
  {
    id: "haunted-hunter",
    title: "Haunted Hunter Arena",
    description: "Multiplayer arena game where players hunt supernatural creatures with real-time multiplayer functionality.",
    image: '/placeholder.jpg',
    tags: ["Unity", "C#", "Multiplayer", "Game Design"],
    code: "https://github.com/psyodrz/haunted-hunter",
    demo: "https://haunted-hunter-demo.vercel.app",
    featured: true
  }
]

export function SmoothProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Handle smooth transitions
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    
    setIsTransitioning(true)
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % projects.length)
  }

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + projects.length) % projects.length)
  }

  const currentProject = projects[currentIndex]

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Main Carousel */}
      <div className="relative sci-fi-card overflow-hidden rounded-2xl">
        {/* Project Display */}
        <div className="relative h-[400px] sm:h-[500px] md:h-[600px]">
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
            style={{ 
              backgroundImage: `url(${currentProject.image})`,
              transform: `scale(${isTransitioning ? 1.05 : 1})`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 md:p-8">
            <div className="max-w-2xl">
              {/* Project Number Indicator */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="px-2 sm:px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full border border-primary/30">
                  Featured
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {currentIndex + 1} of {projects.length}
                </span>
              </div>
              
              {/* Project Title */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 sci-fi-text">
                {currentProject.title}
              </h3>
              
              {/* Project Description */}
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 sci-fi-muted leading-relaxed max-w-xl">
                {currentProject.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                {currentProject.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium bg-card/60 text-foreground/80 rounded-full border border-border/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {currentProject.demo && (
                  <Button
                    size="sm"
                    className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
                    onClick={() => window.open(currentProject.demo, '_blank')}
                  >
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    Live Demo
                  </Button>
                )}
                {currentProject.code && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2 border-primary/50 text-primary hover:bg-primary/10 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
                    onClick={() => window.open(currentProject.code, '_blank')}
                  >
                    <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                    View Code
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-primary/20 hover:border-primary/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-primary/20 hover:border-primary/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next project"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          </button>
        </div>

        {/* Project Indicators */}
        <div className="flex justify-center gap-2 p-4 bg-card/20">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                index === currentIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-border hover:bg-primary/50'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

    </div>
  )
}
