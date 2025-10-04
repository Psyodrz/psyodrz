"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  image: string
  code?: string
  demo?: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: "maze-game",
    title: "3D Maze Game",
    description: "Procedurally generated maze with interactive elements and pathfinding algorithms. Built with Three.js and WebGL for immersive 3D experience.",
    tags: ["JavaScript", "Three.js", "WebGL", "Algorithms"],
    image: '/projects/3d-maze.jpg',
    code: "https://github.com/psyodrz/3d-maze-game",
    demo: "https://maze-game-demo.vercel.app",
    featured: true
  },
  {
    id: "face-detection",
    title: "AI Face Detection",
    description: "Real-time face detection system using computer vision and machine learning. Tracks facial features and emotions with high accuracy.",
    tags: ["Python", "OpenCV", "TensorFlow", "Machine Learning"],
    image: '/projects/face-detection.jpg',
    code: "https://github.com/psyodrz/face-detection-ai",
    demo: "https://face-detection-demo.vercel.app",
    featured: true
  },
  {
    id: "flippy-floppy",
    title: "Flippy Floppy",
    description: "Casual arcade game with innovative flipping mechanics and progressive difficulty. Features smooth animations and engaging gameplay.",
    tags: ["JavaScript", "CSS", "Game Dev", "UI/UX"],
    image: '/placeholder.jpg',
    code: "https://github.com/psyodrz/flippy-floppy",
    demo: "https://flippy-floppy-game.vercel.app"
  },
  {
    id: "haunted-hunter",
    title: "Haunted Hunter Arena",
    description: "Multiplayer arena game where players hunt supernatural creatures. Features real-time multiplayer and dynamic environments.",
    tags: ["Unity", "C#", "Multiplayer", "Game Design"],
    image: '/placeholder.jpg',
    code: "https://github.com/psyodrz/haunted-hunter",
    demo: "https://haunted-hunter-demo.vercel.app"
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "Responsive portfolio built with Next.js showcasing projects and skills. Features modern design and smooth animations.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: '/placeholder.jpg',
    code: "https://github.com/psyodrz/portfolio",
    demo: "https://aditya-srivastava.vercel.app",
    featured: true
  }
]

export function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
    setIsAutoPlaying(false)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setIsAutoPlaying(false)
  }

  const goToProject = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const currentProject = projects[currentIndex]

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-2xl sci-fi-card">
        {/* Project Display */}
        <div className="relative h-[400px] md:h-[500px]">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out"
            style={{ backgroundImage: `url(${currentProject.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Project Content */}
          <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                {currentProject.featured && (
                  <span className="px-2 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full border border-primary/30">
                    Featured
                  </span>
                )}
                <span className="text-sm text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {currentIndex + 1} of {projects.length}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-3 sci-fi-text">
                {currentProject.title}
              </h3>
              
              <p className="text-sm md:text-base mb-4 sci-fi-muted leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {currentProject.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {currentProject.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-card/60 text-foreground/80 rounded-full border border-border/50"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {currentProject.code && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/50"
                    onClick={() => window.open(currentProject.code, '_blank')}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </Button>
                )}
                {currentProject.demo && (
                  <Button
                    size="sm"
                    className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                    onClick={() => window.open(currentProject.demo, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevProject}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-primary/20 hover:border-primary/50 transition-all duration-200"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          
          <button
            onClick={nextProject}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 hover:bg-primary/20 hover:border-primary/50 transition-all duration-200"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Project Indicators */}
        <div className="flex justify-center gap-2 p-4 bg-card/20">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-border hover:bg-primary/50'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Grid View */}
      <div className="mt-8 md:hidden">
        <h4 className="text-lg font-semibold mb-4 sci-fi-text" style={{ fontFamily: 'Times New Roman, serif' }}>All Projects</h4>
        <div className="grid grid-cols-1 gap-4">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="sci-fi-card p-4">
              <div className="flex items-start gap-3">
                <div 
                  className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold sci-fi-text truncate" style={{ fontFamily: 'Times New Roman, serif' }}>{project.title}</h5>
                  <p className="text-sm sci-fi-muted line-clamp-2 mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{project.description}</p>
                  <div className="flex gap-2 mt-2">
                    {project.code && (
                      <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                        Code
                      </Button>
                    )}
                    {project.demo && (
                      <Button size="sm" className="text-xs px-2 py-1">
                        Demo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
