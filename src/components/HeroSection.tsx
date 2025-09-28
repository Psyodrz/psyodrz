'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight, FiUser } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import ParticlesBackground from './ParticlesBackground';
import SpringReveal from './animations/SpringReveal';
import ScrollAnimationWrapper from './animations/ScrollAnimationWrapper';
import Waves from './Waves/Waves';
import gsap from 'gsap';

const HeroSection = () => {
  const [imgError, setImgError] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // GSAP animations for background elements
    const tl = gsap.timeline();
    
    tl.fromTo('.glass-orb', 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 0.7, 
        scale: 1, 
        duration: 1.5, 
        stagger: 0.2, 
        ease: 'power3.out'
      }
    );

    // Main title animation
    gsap.fromTo('.hero-title', 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: 'power3.out',
        delay: 0.3
      }
    );
    
    return () => {
      // Cleanup animations
      tl.kill();
    };
  }, []);
  
  const titleText = "Aditya Srivastava";
  
  return (
    <section id="hero" className={`min-h-screen flex items-center pt-20 md:pt-24 lg:pt-32 pb-16 relative overflow-hidden ${mounted && theme === 'dark' ? 'bg-gradient-to-br from-[#051428] via-[#0a2744] to-[#103a6a]' : 'bg-gradient-to-br from-[#f0f9ff] via-[#e0f7ff] to-[#dbeafe]'} transition-colors duration-300`}>
      {/* Particle Effects Background */}
      <ParticlesBackground />
      
      {/* Wave Effects */}
      <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden">
        <Waves 
          lineColor={mounted && theme === 'dark' ? "rgba(66, 135, 245, 0.6)" : "rgba(79, 70, 229, 0.4)"}
          waveSpeedX={0.015}
          waveSpeedY={0.007}
          waveAmpX={30}
          waveAmpY={20}
          xGap={20}
          yGap={30}
          className="waves"
        />
      </div>
      
      {/* Aesthetically pleasing blurry effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 backdrop-blur-[10px]">
        {/* Glass morphism elements with GSAP animations */}
        <div className={`glass-orb absolute top-20 left-1/4 w-64 h-64 rounded-full ${mounted && theme === 'dark' ? 'bg-blue-600/10' : 'bg-indigo-400/20'} blur-3xl backdrop-blur-xl animate-pulse-slow opacity-0`}></div>
        <div className={`glass-orb absolute bottom-40 right-1/4 w-80 h-80 rounded-full ${mounted && theme === 'dark' ? 'bg-purple-700/20' : 'bg-purple-300/30'} blur-3xl backdrop-blur-xl animate-float opacity-0 animation-delay-2000`}></div>
        <div className={`glass-orb absolute top-1/3 right-1/3 w-72 h-72 rounded-full ${mounted && theme === 'dark' ? 'bg-cyan-600/10' : 'bg-cyan-300/20'} blur-3xl backdrop-blur-xl animate-float-slow opacity-0 animation-delay-1000`}></div>
        <div className={`glass-orb absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full ${mounted && theme === 'dark' ? 'bg-indigo-600/10' : 'bg-indigo-300/20'} blur-3xl backdrop-blur-xl animate-float-reverse opacity-0 animation-delay-3000`}></div>
        
        {/* Decorative accents */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.15] dark:opacity-[0.25]"></div>
        
        {/* Radial gradient overlay */}
        <div className={`absolute inset-0 ${mounted && theme === 'dark' 
          ? 'bg-radial-gradient-dark' 
          : 'bg-radial-gradient-light'}`}></div>
      </div>

      <div className="section-container relative z-50 w-full max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-8 lg:gap-16">
          <ScrollAnimationWrapper
            animation="fade-right"
            duration={0.8}
            delay={0.2}
            className="md:w-1/2 pt-8 md:pt-0"
          >
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading tracking-wide relative z-30">
                <div className="hero-title">
                  <span className="text-blue-800 dark:text-blue-400 font-bold">Hi, I'm </span>
                  <span className="relative inline-block name-highlight-light dark:name-highlight-dark py-2 px-4">
                    <span className="text-white font-bold tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">{titleText}</span>
                    <span className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-600 rounded-full animate-pulse"></span>
                  </span>
                </div>
              </h1>
              
              <SpringReveal
                effect="slide-up"
                config="gentle"
                delay={300}
              >
                <h2 className="text-3xl md:text-4xl text-gray-900 dark:text-gray-200 font-medium font-heading tracking-wider">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-indigo-700 dark:from-blue-400 dark:to-indigo-400">Full Stack Developer & B.Tech CSE Student</span>
                </h2>
              </SpringReveal>
              
              <SpringReveal
                effect="slide-up"
                config="gentle"
                delay={400}
              >
                <p className="text-xl text-gray-800 dark:text-gray-300 max-w-lg font-body leading-relaxed">
                  Passionate about building modern web applications and solving complex problems with clean, efficient code.
                </p>
              </SpringReveal>
              
              <ScrollAnimationWrapper
                animation="fade-up"
                duration={0.6}
                delay={0.5}
              >
                <div className="flex flex-wrap gap-4 pt-6">
                  <a 
                    href="#contact" 
                    className="btn-primary flex items-center gap-2 transform hover:translate-y-[-2px] hover:shadow-neon transition-all font-heading text-base tracking-wider uppercase py-3 px-8 backdrop-blur-sm"
                  >
                  Contact Me <FiArrowRight className="ml-1" />
                </a>
                  <a 
                    href="/resume.pdf" 
                    className="btn-outline flex items-center gap-2 transform hover:translate-y-[-2px] hover:shadow-neon transition-all font-heading text-base tracking-wider uppercase py-3 px-8 backdrop-blur-sm" 
                    download
                  >
                  Resume <FiDownload className="ml-1" />
                </a>
                </div>
              </ScrollAnimationWrapper>
            </div>
          </ScrollAnimationWrapper>

          <SpringReveal
            effect="scale"
            config="wobbly"
            delay={100}
            className="md:w-2/5 flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-gradient-br-blue-purple transform hover:scale-105 transition-transform shadow-neon-sm backdrop-blur-sm">
              {!imgError ? (
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  fill
                  unoptimized={true}
                  style={{ objectFit: 'cover' }}
                  priority
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                  <FiUser className="text-primary animate-pulse" size={80} />
                </div>
              )}
            </div>
          </SpringReveal>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 