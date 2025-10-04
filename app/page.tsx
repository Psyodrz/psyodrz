"use client"

import type React from "react"
import { memo } from "react"

import { Mail, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Hero3D from "@/components/hero-3d"
import LiquidEther from '@/components/LiquidEther'
import ProjectsSection from '@/components/ProjectsSection'
import { TimelineSection } from '@/components/timeline-section'
import { SkillsShowcase } from '@/components/skills-showcase'
import { EnhancedContact } from '@/components/enhanced-contact'
import { ProfilePhotoSection } from '@/components/profile-photo-section'
import { CursorParticles } from '@/components/cursor-particles'
import { useResponsiveResolution } from '@/hooks/use-responsive-resolution';

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string
  title: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28">
      <header className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-balance hollow-font-primary leading-tight" style={{ fontFamily: 'Times New Roman, serif' }}>{title}</h2>
        {description ? <p className="mt-2 sm:mt-3 md:mt-4 text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-pretty max-w-4xl" style={{ fontFamily: 'Poppins, sans-serif' }}>{description}</p> : null}
      </header>
      {children}
    </section>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border/80 bg-card/60 px-2 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 text-xs xs:text-sm sm:text-base text-muted-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {children}
    </span>
  )
}

function ProjectCard({
  title,
  blurb,
  tags,
  code,
  demo,
  className,
}: {
  title: string
  blurb: string
  tags: string[]
  code?: string
  demo?: string
  className?: string
}) {
  return (
    <article className={`group rounded-xl border bg-card p-3 sm:p-4 md:p-5 lg:p-6 transition-colors hover:border-primary/40 ${className}`}>
      <h3 className="text-lg sm:text-xl md:text-2xl font-medium hollow-font-accent leading-tight" style={{ fontFamily: 'Times New Roman, serif' }}>{title}</h3>
      <p className="mt-2 sm:mt-3 text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>{blurb}</p>
      <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
        {tags.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
      <div className="mt-4 sm:mt-5 flex flex-col xs:flex-row gap-2 sm:gap-3">
        {code ? (
          <a
            href={code}
            className="glow inline-flex items-center justify-center rounded-md bg-secondary/40 px-3 py-2 xs:px-4 xs:py-2.5 sm:px-5 sm:py-3 text-xs xs:text-sm sm:text-base hover:bg-secondary/60 min-h-[44px]"
            target="_blank"
            rel="noreferrer"
          >
            Code
          </a>
        ) : null}
        {demo ? (
          <a
            href={demo}
            className="glow inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 xs:px-4 xs:py-2.5 sm:px-5 sm:py-3 text-xs xs:text-sm sm:text-base text-primary-foreground hover:opacity-90 min-h-[44px]"
            target="_blank"
            rel="noreferrer"
          >
            Live Demo
          </a>
        ) : null}
      </div>
    </article>
  )
}

const Page = memo(function Page() {
  const responsiveResolution = useResponsiveResolution();

  return (
    <main className="min-h-dvh relative">
      {/* HERO - Liquid Ether background with content overlay */}
      <section className="hero-section relative w-full min-h-[100vh] sm:min-h-[100vh] md:min-h-[100vh] lg:min-h-[100vh] xl:min-h-[100vh] 2xl:min-h-[100vh] overflow-visible z-10">
        <LiquidEther
          colors={[ '#5227FF', '#FF9FFC', '#B19EEF', '#3a2e6e', '#2a2250' ]}
          mouseForce={8}
          cursorSize={50}
          isViscous={false}
          viscous={10}
          iterationsViscous={8}
          iterationsPoisson={8}
          resolution={responsiveResolution}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.15}
          autoIntensity={1.0}
          takeoverDuration={0.4}
          autoResumeDelay={4000}
          autoRampDuration={0.8}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        />
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 pt-32 sm:pt-36 md:pt-40 lg:pt-44 xl:pt-48 2xl:pt-52 pb-4 sm:pb-6 md:pb-8">
          <div className="hero-content text-center max-w-7xl mx-auto flex flex-col xl:grid xl:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 items-center min-h-full w-full">
            {/* Profile Photo - Now above the name */}
            <div className="order-1 flex justify-center xl:justify-center w-full xl:w-auto">
              <ProfilePhotoSection />
            </div>
            
            {/* Text Content - Now below the profile photo */}
            <div className="order-2 text-center xl:text-left px-1 sm:px-2 md:px-3 lg:px-4 w-full xl:w-auto">
              <h1 className="hero-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6">
                <span className="block hollow-font-primary" style={{ fontFamily: 'Times New Roman, serif', color: 'white' }}>
                  <span className="block leading-tight">ADITYA</span>
                  <span className="block leading-tight">SRIVASTAVA</span>
                </span>
                <span className="hero-subtitle block text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal mt-1 sm:mt-2 md:mt-3">
                  <span className="inline-block bg-[#5227FF] text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-lg text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl">
                    Computer Science Engineer
                  </span>
                </span>
              </h1>
              <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl mb-4 sm:mb-5 md:mb-6 lg:mb-8 sci-fi-muted leading-relaxed max-w-3xl mx-auto xl:mx-0 px-1 sm:px-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Building functional, user‑centered applications across the stack
              </p>
              <div className="hero-buttons flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-center xl:justify-start items-center mb-3 sm:mb-4 md:mb-5 lg:mb-6 px-1 sm:px-2">
                <Button 
                  size="lg" 
                  className="glow bg-[#5227FF] text-white hover:bg-[#5227FF]/90 px-3 py-2 xs:px-4 xs:py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 w-full xs:w-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl interactive min-h-[44px]"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Work
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="glow border-[#5227FF] text-[#5227FF] hover:bg-[#5227FF]/10 px-3 py-2 xs:px-4 xs:py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 w-full xs:w-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl interactive min-h-[44px]"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get In Touch
                </Button>
              </div>
              
              {/* Social Links */}
              <div className="flex justify-center xl:justify-start gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-1 sm:px-2">
                <a 
                  href="mailto:Adisrivastav23@gmail.com" 
                  className="glow p-2 xs:p-2.5 sm:p-3 md:p-4 rounded-full bg-card/60 hover:bg-card/80 transition-colors interactive min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Email"
                >
                  <Mail className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 sci-fi-accent" />
                </a>
                <a 
                  href="https://github.com/psyodrz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glow p-2 xs:p-2.5 sm:p-3 md:p-4 rounded-full bg-card/60 hover:bg-card/80 transition-colors interactive min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="GitHub"
                >
                  <Github className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 sci-fi-accent" />
                </a>
                <a 
                  href="https://linkedin.com/in/adisrivastav23" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glow p-2 xs:p-2.5 sm:p-3 md:p-4 rounded-full bg-card/60 hover:bg-card/80 transition-colors interactive min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 sci-fi-accent" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cursor Particles Effect - Moved after hero section */}
      <CursorParticles />
      
      {/* Gradient Blend between Hero and About sections */}
      <div className="section-gradient-blend relative w-full h-16 sm:h-20 lg:h-24"></div>
      
      {/* ABOUT */}
      <div className="relative z-10 mt-2">
        <Section
          id="about"
          title={<span className="sci-fi-text" style={{ fontFamily: 'Times New Roman, serif' }}>About Me</span>}
          description={<span className="sci-fi-muted" style={{ fontFamily: 'Poppins, sans-serif' }}>I'm a Computer Science Engineering student passionate about building functional, user‑centered applications across the stack.</span>}
        >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 leading-relaxed sci-fi-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <p>
              With a strong foundation in frontend and backend technologies, I enjoy crafting experiences that are performant and accessible.
            </p>
            <p>
              I'm constantly learning new tools and patterns across web and mobile, and I love exploring creative coding, games, and AI.
            </p>
          </div>
          <div className="sci-fi-card p-6">
            <h3 className="text-lg font-medium sci-fi-accent">Education</h3>
            <ul className="mt-3 space-y-2 text-sm sci-fi-muted" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <li>
                <span className="font-medium sci-fi-text">
                  B.Tech CSE — Maharishi University of Information Technology
                </span>{' '}
                • 2023–2027 · CGPA: 7.0/10
              </li>
              <li>Higher Secondary — Bal Mitra School Prayagraj • 2022–2023 · 77%</li>
            </ul>
            <h3 className="mt-6 text-lg font-medium sci-fi-accent">Interests</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Web Dev", "Mobile", "Game Dev"].map((i) => (
                <Chip key={i}>{i}</Chip>
              ))}
            </div>
          </div>
        </div>
        </Section>
      </div>

      {/* SKILLS */}
      <div className="relative z-10">
        <Section id="skills" title={<span className="sci-fi-text" style={{ fontFamily: 'Times New Roman, serif' }}>Skills & Expertise</span>} description={<span className="sci-fi-muted" style={{ fontFamily: 'Poppins, sans-serif' }}>Interactive showcase of my technical skills and proficiency levels across different domains.</span>}>
          <SkillsShowcase />
        </Section>
      </div>

      {/* EXPERIENCE */}
      <div className="relative z-10">
        <Section id="experience" title={<span className="sci-fi-text" style={{ fontFamily: 'Times New Roman, serif' }}>Experience & Education</span>} description={<span className="sci-fi-muted" style={{ fontFamily: 'Poppins, sans-serif' }}>My professional journey, education, and key achievements over the years.</span>}>
          <TimelineSection />
        </Section>
      </div>

      {/* PROJECTS */}
      <div className="relative z-10">
        <Section id="projects" title={<span className="sci-fi-text" style={{ fontFamily: 'Times New Roman, serif' }}>Featured Projects</span>} description={<span className="sci-fi-muted" style={{ fontFamily: 'Poppins, sans-serif' }}>Interactive showcase of my best work across web development, AI, and game development.</span>}>
          <ProjectsSection />
        </Section>
      </div>

      {/* CONTACT */}
      <div className="relative z-10">
        <Section
          id="contact"
          title={<span className="sci-fi-text" style={{ fontFamily: 'Times New Roman, serif' }}>Get In Touch</span>}
          description={<span className="sci-fi-muted" style={{ fontFamily: 'Poppins, sans-serif' }}>Ready to work together? Let's discuss your next project or just say hello!</span>}
        >
          <EnhancedContact />
          <footer className="mt-10 text-sm sci-fi-muted text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>© 2025 Aditya Srivastava. All rights reserved.</footer>
        </Section>
      </div>
    </main>
  )
})

export default Page
