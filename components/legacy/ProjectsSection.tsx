'use client';

import { FiGithub, FiExternalLink, FiRefreshCw } from 'react-icons/fi';
import { useState, useEffect, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import SwiperCarousel from './animations/SwiperCarousel';
import ScrollAnimationWrapper from './animations/ScrollAnimationWrapper';
import Waves from './Waves/Waves';
import gsap from 'gsap';

interface Project {
  _id: string;
  title: string;
  description: string;
  color: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const ProjectsSection = () => {
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
    fetchProjects();
    
    // Initialize GSAP animations for background elements
    const tl = gsap.timeline();
    
    tl.fromTo('.glow-orb', 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 0.6, 
        scale: 1, 
        duration: 1.5, 
        stagger: 0.3, 
        ease: 'power3.out',
        delay: 0.2
      }
    );

    return () => {
      // Cleanup animations
      tl.kill();
    };
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Add a timestamp to avoid caching issues
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/projects?t=${timestamp}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        console.log(`Loaded ${data.length} projects successfully`);
        setProjects(data);
      } else {
        console.error('API returned empty array or invalid data:', data);
        setProjects([]);
        setError('No projects found. Please add some projects through the admin panel.');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fallback projects in case the API call fails
  const fallbackProjects = [
    {
      _id: '1',
      title: '3D Maze',
      description:
        'A 3D maze game with procedural generation, interactive elements and pathfinding algorithms.',
      color: 'from-blue-500 to-purple-600',
      tags: ['JavaScript', 'Three.js', 'WebGL', 'Algorithms'],
      github: 'https://github.com/username/3d-maze',
      demo: 'https://3d-maze-demo.com',
      featured: true,
      order: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '2',
      title: 'Face Detection',
      description:
        'A real-time face detection application using computer vision algorithms that can identify facial features and track expressions.',
      color: 'from-green-500 to-teal-600',
      tags: ['Python', 'OpenCV', 'TensorFlow', 'Machine Learning'],
      github: 'https://github.com/username/face-detection',
      demo: 'https://face-detection-demo.com',
      featured: true,
      order: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '3',
      title: 'Flippy Floppy',
      description:
        'A casual arcade game with flipping mechanics, colorful aesthetics and increasing difficulty levels.',
      color: 'from-red-500 to-orange-600',
      tags: ['JavaScript', 'CSS', 'Game Development', 'UI/UX'],
      github: 'https://github.com/psyodrz/flippy-floppy',
      demo: 'https://psyodrz.github.io/flippy-Floppy/',
      featured: true,
      order: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '4',
      title: 'Haunted Hunter Arena',
      description:
        'A thrilling multiplayer arena game where players hunt supernatural creatures in a haunted environment.',
      color: 'from-purple-500 to-indigo-600',
      tags: ['Unity', 'C#', 'Game Development', 'Multiplayer'],
      github: 'https://github.com/username/haunted-hunter',
      demo: 'https://haunted-hunter-demo.com',
      featured: true,
      order: 4,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: '5',
      title: 'Portfolio Website',
      description:
        'A responsive personal portfolio website built with Next.js, showcasing projects and skills with a modern design.',
      color: 'from-green-400 to-emerald-600',
      tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      github: 'https://github.com/username/portfolio',
      demo: 'https://portfolio-demo.com',
      featured: true,
      order: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  // Use fallback projects if there's an error or no projects loaded
  const displayProjects = projects.length > 0 ? projects : error ? fallbackProjects : [];

  // Create project card components for mobile grid view
  const ProjectCard = ({ project, index }: { project: Project, index: number }) => (
    <div
      className={`rounded-lg overflow-hidden ${mounted && theme === 'dark' ? 'bg-gray-800/80 hover:shadow-neon' : 'bg-white/80 hover:shadow-neon-sm'} backdrop-blur-sm hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full`}
              >
                {/* CSS Gradient Background instead of Image */}
                <div className={`relative w-full h-48 bg-gradient-to-br ${project.color} ${mounted && theme === 'dark' ? 'opacity-80' : 'opacity-90'}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl font-bold font-heading text-white text-shadow">
                      {project.title}
          </div>
                  </div>
                  {/* Overlay pattern */}
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-50"></div>
                </div>

                <div className="p-6 relative">
                  {/* Futuristic accent line */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500/0 via-purple-500/40 to-blue-500/0"></div>
                  
                  <h3 className="text-xl font-bold mb-2 pl-4 font-heading tracking-wider">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 font-body">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2 py-1 rounded-full ${mounted && theme === 'dark' 
                          ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 text-blue-300' 
                          : 'bg-gradient-to-r from-blue-100 to-purple-100 text-primary'} 
                          backdrop-blur-sm font-heading text-[10px] tracking-wider uppercase`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-purple-400 transition-colors group font-heading text-xs tracking-wider uppercase"
                    >
                      <FiGithub className="mr-1 group-hover:animate-bounce" /> Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-purple-400 transition-colors group font-heading text-xs tracking-wider uppercase"
                    >
                      <FiExternalLink className="mr-1 group-hover:animate-bounce" /> Live Demo
                    </a>
                  </div>
                </div>
    </div>
  );

  // Create slides for Swiper carousel (desktop/tablet)
  const projectSlides: ReactNode[] = displayProjects.map((project, index) => (
    <ProjectCard key={project._id} project={project} index={index} />
  ));

  return (
    <section id="projects" className={`relative overflow-hidden ${mounted && theme === 'dark' ? 'bg-[#0d1117]' : 'bg-[#f0f4ff]'} transition-colors duration-300 py-16`}>
      {/* Wave Effects */}
      <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden">
        <Waves 
          lineColor={mounted && theme === 'dark' ? "rgba(139, 92, 246, 0.3)" : "rgba(79, 70, 229, 0.2)"}
          waveSpeedX={0.008}
          waveSpeedY={0.006}
          waveAmpX={25}
          waveAmpY={12}
          xGap={25}
          yGap={25}
          className="waves"
        />
      </div>
      
      {/* Dynamic neon background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {/* Animated glow orbs with GSAP animations */}
        <div className={`glow-orb absolute -top-20 right-32 w-96 h-96 rounded-full ${mounted && theme === 'dark' ? 'bg-purple-600/10' : 'bg-purple-300/20'} blur-3xl animate-float opacity-0`}></div>
        <div className={`glow-orb absolute bottom-40 left-20 w-80 h-80 rounded-full ${mounted && theme === 'dark' ? 'bg-cyan-600/10' : 'bg-cyan-300/20'} blur-3xl animate-float opacity-0 animation-delay-2000`}></div>
        <div className={`glow-orb absolute top-1/3 left-1/4 w-72 h-72 rounded-full ${mounted && theme === 'dark' ? 'bg-blue-600/10' : 'bg-blue-300/20'} blur-3xl animate-float-slow opacity-0 animation-delay-1000`}></div>
        <div className={`glow-orb absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full ${mounted && theme === 'dark' ? 'bg-indigo-600/10' : 'bg-indigo-300/20'} blur-3xl animate-float-reverse opacity-0 animation-delay-3000`}></div>
        
        {/* Subtle grid effect */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 dark:opacity-20"></div>
        
        {/* Subtle animated gradient background */}
        <div className={`absolute inset-0 ${mounted && theme === 'dark' 
          ? 'bg-gradient-to-br from-purple-900/5 via-blue-900/5 to-cyan-900/5' 
          : 'bg-gradient-to-br from-purple-100/30 via-blue-100/30 to-cyan-100/30'} 
          bg-size-200 animate-gradient-slow`}></div>
      </div>

      <div className="section-container relative z-20 py-12">
        <ScrollAnimationWrapper
          animation="fade-down"
          duration={0.7}
          className="flex justify-center mb-12"
        >
          <h2 className="section-title font-heading tracking-wider neon-text">PROJECTS</h2>
        </ScrollAnimationWrapper>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Desktop/Tablet View: Beautiful Swiper Carousel */}
            <ScrollAnimationWrapper
              animation="fade-up"
              duration={0.8}
              delay={0.3}
              className="hidden md:block"
            >
              <SwiperCarousel
                slides={projectSlides}
                effect="cards"
                slidesPerView={2.5}
                spaceBetween={30}
                speed={700}
                className="projects-carousel"
              />
            </ScrollAnimationWrapper>

            {/* Mobile View: Grid Layout */}
            <div className="grid grid-cols-1 gap-8 md:hidden">
              {displayProjects.map((project, index) => (
                <ScrollAnimationWrapper
                  key={`${project._id}-${index}`}
                  animation="fade-up"
                  duration={0.7}
                  delay={index * 0.1}
                >
                  <ProjectCard project={project} index={index} />
                </ScrollAnimationWrapper>
              ))}
            </div>
          </>
        )}

        <ScrollAnimationWrapper
          animation="fade-up"
          duration={0.5}
          delay={0.5}
          className="flex justify-center mt-12"
        >
          {error ? (
            <button 
              onClick={fetchProjects}
              className="btn-outline flex items-center space-x-2 transform hover:scale-105 transition-transform"
            >
              <FiRefreshCw className="mr-2" /> Retry Loading Projects
            </button>
          ) : null}
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
};

export default ProjectsSection; 