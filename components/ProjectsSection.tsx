'use client';

import { useState, useEffect } from 'react';
import GitHubRepoCard from './GitHubRepoCard';
import ProjectsCarousel from './ProjectsCarousel';

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

// Static projects data for reliable display in production builds
const projectsData: Project[] = [
  {
    title: "3D Maze Game",
    description: "A 3D maze game built with Node.js featuring procedural generation, interactive elements and pathfinding algorithms.",
    color: "from-blue-500 to-purple-600",
    tags: ["Node.js", "JavaScript", "3D Graphics", "Algorithms"],
    github: "https://github.com/Psyodrz/3DMaze",
    demo: "https://github.com/Psyodrz/3DMaze",
    featured: true,
    order: 1
  },
  {
    title: "AI Code Generator",
    description: "AI-powered browser extension for HackerRank problem solving with intelligent code generation and optimization.",
    color: "from-green-500 to-teal-600",
    tags: ["AI", "Browser Extension", "JavaScript", "Machine Learning"],
    github: "https://github.com/Psyodrz/ai-code-generator",
    demo: "https://github.com/Psyodrz/ai-code-generator",
    featured: true,
    order: 2
  },
  {
    title: "Face Detection Mobile",
    description: "Ionic/Capacitor mobile app for real-time face detection with computer vision and machine learning capabilities.",
    color: "from-orange-500 to-red-600",
    tags: ["Ionic", "Capacitor", "Computer Vision", "Mobile"],
    github: "https://github.com/Psyodrz/face-detection-mobile",
    demo: "https://github.com/Psyodrz/face-detection-mobile",
    featured: true,
    order: 3
  },
  {
    title: "Flappy Bird Game",
    description: "Flappy Bird-style game built with HTML5 and JavaScript featuring smooth gameplay and responsive design.",
    color: "from-yellow-500 to-orange-600",
    tags: ["HTML5", "JavaScript", "Game Development", "Canvas"],
    github: "https://github.com/Psyodrz/floppy-bird-game",
    demo: "https://github.com/Psyodrz/floppy-bird-game",
    featured: true,
    order: 4
  },
  {
    title: "Horror Hunter Arena",
    description: "Horror-themed arena game project with immersive gameplay and atmospheric design elements.",
    color: "from-purple-500 to-indigo-600",
    tags: ["Game Development", "Horror", "Arena", "Interactive"],
    github: "https://github.com/Psyodrz/horror-hunter-arena",
    demo: "https://github.com/Psyodrz/horror-hunter-arena",
    featured: true,
    order: 5
  },
  {
    title: "Nature Explorer",
    description: "Nature exploration app built with React and TypeScript featuring interactive maps and educational content.",
    color: "from-green-400 to-emerald-600",
    tags: ["React", "TypeScript", "Nature", "Education"],
    github: "https://github.com/Psyodrz/nature-explorer",
    demo: "https://github.com/Psyodrz/nature-explorer",
    featured: true,
    order: 6
  },
  {
    title: "Flippy Floppy",
    description: "Another Flappy Bird-style game with enhanced features and improved gameplay mechanics.",
    color: "from-pink-500 to-rose-600",
    tags: ["JavaScript", "Game Development", "HTML5", "CSS"],
    github: "https://github.com/Psyodrz/flippy-Floppy",
    demo: "https://psyodrz.github.io/flippy-Floppy/",
    featured: true,
    order: 7
  }
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        // Try to fetch from JSON first, fallback to static data
        let data = projectsData;
        
        try {
          const response = await fetch('/data/projects.json');
          if (response.ok) {
            const fetchedData = await response.json();
            data = fetchedData;
          }
        } catch (fetchError) {
          console.log('Using static projects data (fetch failed):', fetchError);
        }
        
        // Sort by order and filter featured projects
        const sortedProjects = data
          .filter((project: Project) => project.featured)
          .sort((a: Project, b: Project) => a.order - b.order);
        setProjects(sortedProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback to static data
        const sortedProjects = projectsData
          .filter((project: Project) => project.featured)
          .sort((a: Project, b: Project) => a.order - b.order);
        setProjects(sortedProjects);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="rounded-xl border bg-card p-6">
              <div className="h-6 bg-muted rounded mb-3"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded mb-4 w-3/4"></div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-muted rounded w-16"></div>
                <div className="h-6 bg-muted rounded w-20"></div>
                <div className="h-6 bg-muted rounded w-14"></div>
              </div>
              <div className="flex gap-4">
                <div className="h-8 bg-muted rounded w-20"></div>
                <div className="h-8 bg-muted rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-balance mb-4">
          <span className="sci-fi-text">Featured Projects</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto">
          <span className="sci-fi-muted">
            A showcase of my best work across web development, AI, mobile apps, and game development. 
            Each project demonstrates different skills and technologies I've mastered.
          </span>
        </p>
      </div>

      {projects.length > 0 ? (
        <>
          {/* Mobile Carousel - Hidden on desktop */}
          <div className="block sm:hidden">
            <ProjectsCarousel projects={projects} />
          </div>
          
          {/* Desktop Grid - Hidden on mobile */}
          <div className="hidden sm:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <GitHubRepoCard
                key={project.title}
                repoUrl={project.github}
                title={project.title}
                description={project.description}
                tags={project.tags}
                color={project.color}
                className="group h-full"
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No featured projects found. Please check the data file.
          </p>
          <p className="text-sm text-muted-foreground">
            Debug: Projects loaded: {projects.length}
          </p>
        </div>
      )}

      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-6">
          <span className="sci-fi-muted">
            Want to see more? Check out all my repositories on GitHub.
          </span>
        </p>
        <a
          href="https://github.com/Psyodrz"
          target="_blank"
          rel="noopener noreferrer"
          className="glow inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View All Projects on GitHub
        </a>
      </div>
    </div>
  );
}
