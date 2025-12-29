"use client";

import { useState, useEffect } from "react";
import { Download, ExternalLink } from "lucide-react";
import MinimalProjectsCarousel from "./MinimalProjectsCarousel";
import { downloadFile, isMobileDevice } from "@/lib/utils-client";

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
    title: "Rakshak AI",
    description:
      "AI-powered real-time surveillance and monitoring system with intelligent alert generation and simulation controls.",
    color: "from-red-500 to-orange-600",
    tags: ["AI", "React", "Node.js", "Security"],
    github: "https://github.com/Psyodrz/Rakshak-AI",
    demo: "https://github.com/Psyodrz/Rakshak-AI",
    featured: true,
    order: 1,
  },
  {
    title: "Future of Cloud Computing",
    description:
      "An exploration of futuristic cloud architectures and decentralized computing systems.",
    color: "from-blue-400 to-indigo-600",
    tags: ["Cloud", "Architecture", "Future Tech"],
    github: "https://github.com/Psyodrz/future-cloud",
    demo: "https://github.com/Psyodrz/future-cloud",
    featured: true,
    order: 2,
  },
  {
    title: "Dreamscape Maze Frontend",
    description:
      "A surreal, interactive 3D maze experience built with modern frontend technologies and immersive animations.",
    color: "from-purple-500 to-pink-600",
    tags: ["3D", "React", "Three.js", "UI/UX"],
    github: "https://github.com/Psyodrz/dreamscape-maze-frontend",
    demo: "https://github.com/Psyodrz/dreamscape-maze-frontend",
    featured: true,
    order: 3,
  },
  {
    title: "Flippy Floppy",
    description:
      "Enhanced Flappy Bird-style game with smooth gameplay mechanics and responsive design.",
    color: "from-pink-500 to-rose-600",
    tags: ["JavaScript", "Game Dev", "HTML5", "CSS"],
    github: "https://github.com/Psyodrz/flippy-Floppy",
    demo: "https://psyodrz.github.io/flippy-Floppy/",
    featured: true,
    order: 4,
  },
  {
    title: "Skill Synergy",
    description:
      "A comprehensive platform for skill sharing and AI-powered tutor matching with real-time interaction.",
    color: "from-teal-400 to-cyan-600",
    tags: ["Full Stack", "React", "AI", "Education"],
    github: "https://github.com/Psyodrz/skill-synergy",
    demo: "https://github.com/Psyodrz/skill-synergy",
    featured: true,
    order: 5,
  },
  {
    title: "Nature Explorer",
    description:
      "Nature exploration app featuring interactive maps, educational content, and biodiversity tracking.",
    color: "from-green-400 to-emerald-600",
    tags: ["React", "TypeScript", "Nature", "Maps"],
    github: "https://github.com/Psyodrz/nature-explorer",
    demo: "https://github.com/Psyodrz/nature-explorer",
    featured: true,
    order: 6,
  },
  {
    title: "Trecab App",
    description:
      "Modern full-stack application featuring scalable architecture and seamless frontend-backend integration.",
    color: "from-indigo-500 to-blue-600",
    tags: ["Full Stack", "Frontend", "Backend", "Architecture"],
    github: "https://github.com/Psyodrz/trecab-app",
    demo: "https://github.com/Psyodrz/trecab-app",
    featured: true,
    order: 7,
  },
  {
    title: "Mindspace",
    description:
      "A personal mindfulness companion with intelligent chat features and emotional wellness tracking.",
    color: "from-violet-500 to-fuchsia-600",
    tags: ["AI", "React", "Wellness", "Chat"],
    github: "https://github.com/Psyodrz/mindspace",
    demo: "https://github.com/Psyodrz/mindspace",
    featured: true,
    order: 8,
  },
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
          const response = await fetch("./data/projects.json");
          if (response.ok) {
            const fetchedData = await response.json();
            data = fetchedData;
          }
        } catch (fetchError) {
          console.log("Using static projects data (fetch failed):", fetchError);
        }

        // Sort by order and filter featured projects
        const sortedProjects = data
          .filter((project: Project) => project.featured)
          .sort((a: Project, b: Project) => a.order - b.order);
        setProjects(sortedProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
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
          onClick={() =>
            downloadFile("/Resume.pdf", "Aditya_Srivastava_Resume.pdf")
          }
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg cursor-pointer"
        >
          <Download className="w-4 h-4" />
          {typeof window !== "undefined" && isMobileDevice()
            ? "View Resume"
            : "Download Resume"}
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
          Explore my projects with intuitive swipe gestures • Resume includes
          detailed experience
        </p>
      </div>
    </div>
  );
}
