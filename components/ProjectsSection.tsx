'use client';

import { useState, useEffect } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import MinimalProjectsCarousel from './MinimalProjectsCarousel';

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
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Main Projects Carousel */}
      {projects.length > 0 ? (
        <MinimalProjectsCarousel projects={projects} />
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Download Resume */}
        <button
          onClick={() => {
            // Create a temporary link element for better mobile support
            const link = document.createElement('a');
            link.href = '/Resume.pdf';
            link.download = 'Aditya_Srivastava_Resume.pdf';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            
            // For mobile devices, open in new tab instead of download
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            
            if (isMobile) {
              // On mobile, open the PDF in a new tab
              window.open('/Resume.pdf', '_blank');
            } else {
              // On desktop, trigger download
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg cursor-pointer"
        >
          <Download className="w-4 h-4" />
          {typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'View Resume' : 'Download Resume'}
        </button>

        {/* View GitHub */}
        <a
          href="https://github.com/Psyodrz"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-background/80 text-foreground rounded-lg hover:bg-background border border-border/50 transition-colors font-medium shadow-lg"
        >
          <ExternalLink className="w-4 h-4" />
          View All Projects
        </a>
      </div>

      {/* Additional Info */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Explore my projects with intuitive swipe gestures • Resume includes detailed experience
        </p>
      </div>
    </div>
  );
}
