'use client';

import { FiUser, FiBook, FiCode } from 'react-icons/fi';
import AOSWrapper from './animations/AOSWrapper';
import ParallaxSection from './animations/ParallaxSection';
import ScrollReveal from './animations/ScrollReveal';
import Waves from './Waves/Waves';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const AboutSection = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <ParallaxSection 
      bgImage="/backgrounds/about-bg.jpg" 
      strength={200}
      blur={2}
      overlayOpacity={0.8}
      className="bg-gray-50 dark:bg-gray-900"
    >
      <section id="about" className="relative overflow-hidden">
        {/* Wave Effects */}
        <div className="absolute inset-0 z-[15] pointer-events-none overflow-hidden">
          <Waves 
            lineColor={mounted && theme === 'dark' ? "rgba(79, 70, 229, 0.4)" : "rgba(66, 135, 245, 0.3)"}
            waveSpeedX={0.01}
            waveSpeedY={0.006}
            waveAmpX={25}
            waveAmpY={15}
            xGap={25}
            yGap={35}
            className="waves"
          />
        </div>
        
        <div className="section-container relative z-20 py-16">
          <ScrollReveal
            origin="top"
            distance="20px"
            duration={800}
            className="mb-12"
          >
            <h2 className="section-title">
          About Me
            </h2>
          </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AOSWrapper
              animation="fade-right"
              duration={800}
              delay={100}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold flex items-center text-blue-800 dark:text-blue-400">
              <FiUser className="text-blue-700 dark:text-primary mr-2" size={20} /> Who I Am
            </h3>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
              I'm a Computer Science Engineering student passionate about software development and problem solving.
              With a strong foundation in both frontend and backend technologies, I enjoy building applications that are 
              not only functional but also provide an excellent user experience.
            </p>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
              I'm constantly learning and exploring new technologies to improve my skills and stay up-to-date with the latest trends
              in the industry. My interests range from web development to mobile app development and everything in between.
            </p>
            </AOSWrapper>

            <div className="space-y-6">
              <ScrollReveal
                origin="right"
                distance="30px"
                duration={1000}
                delay={200}
                className="space-y-4"
              >
              <h3 className="text-2xl font-bold flex items-center text-blue-800 dark:text-blue-400">
                <FiBook className="text-blue-700 dark:text-primary mr-2" size={20} /> Education
              </h3>
              <div className="border-l-2 border-primary pl-4 space-y-2">
                  <AOSWrapper
                    animation="fade-up"
                    duration={600}
                    delay={300}
                  >
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-200">B.Tech in Computer Science Engineering</h4>
                  <p className="text-gray-700 dark:text-gray-400">Maharishi University of information technology• 2023 - 2027</p>
                  <p className="text-gray-800 dark:text-gray-300">CGPA: 7.0/10</p>
                </div>
                  </AOSWrapper>
                  <AOSWrapper
                    animation="fade-up"
                    duration={600}
                    delay={500}
                  >
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-200">Higher Secondary Education</h4>
                  <p className="text-gray-700 dark:text-gray-400">Bal Mitra School Prayagraj • 2022 - 2023</p>
                  <p className="text-gray-800 dark:text-gray-300">Percentage: 77%</p>
                </div>
                  </AOSWrapper>
              </div>
              </ScrollReveal>

              <AOSWrapper
                animation="zoom-in"
                duration={800}
                delay={700}
                className="space-y-4"
              >
              <h3 className="text-2xl font-bold flex items-center text-blue-800 dark:text-blue-400">
                <FiCode className="text-blue-700 dark:text-primary mr-2" size={20} /> Interests
              </h3>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
                Web Development, Mobile App Development, Game Development
              </p>
              </AOSWrapper>
            </div>
        </div>
      </div>
    </section>
    </ParallaxSection>
  );
};

export default AboutSection; 