'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ResumeSection from '@/components/ResumeSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';
import Waves from '@/components/Waves/Waves';
import { useTheme } from 'next-themes';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      <div className="fixed inset-0 z-0 w-full h-full">
        <ParticlesBackground />
        <Waves 
          lineColor="rgba(255,255,255,0.3)"
          backgroundColor="transparent"
          waveSpeedX={0.01}
          waveSpeedY={0.005}
          waveAmpX={20}
          waveAmpY={10}
          xGap={15}
          yGap={25}
          friction={0.95}
          tension={0.003}
          maxCursorMove={80}
        />
      </div>
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
} 