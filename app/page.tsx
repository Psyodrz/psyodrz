"use client"

import type React from "react"

import { Mail, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Hero3D from "@/components/hero-3d"
import LiquidEther from '@/components/LiquidEther'
import ProjectsSection from '@/components/ProjectsSection'
import { TimelineSection } from '@/components/timeline-section'
import { SkillsShowcase } from '@/components/skills-showcase'
import { EnhancedContact } from '@/components/enhanced-contact'
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
    <section id={id} className="mx-auto max-w-6xl px-4 py-12 sm:py-16 md:py-20 lg:py-24">
      <header className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-balance hollow-font-primary">{title}</h2>
        {description ? <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">{description}</p> : null}
      </header>
      {children}
    </section>
  )
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border/80 bg-card/60 px-3 py-1 text-sm text-muted-foreground">
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
    <article className={`group rounded-xl border bg-card p-5 transition-colors hover:border-primary/40 ${className}`}>
      <h3 className="text-xl font-medium hollow-font-accent">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{blurb}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
      <div className="mt-5 flex gap-3">
        {code ? (
          <a
            href={code}
            className="glow inline-flex items-center rounded-md bg-secondary/40 px-3 py-1.5 text-sm hover:bg-secondary/60"
            target="_blank"
            rel="noreferrer"
          >
            Code
          </a>
        ) : null}
        {demo ? (
          <a
            href={demo}
            className="glow inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:opacity-90"
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

export default function Page() {
  const responsiveResolution = useResponsiveResolution();

  return (
    <main className="min-h-dvh">
      {/* HERO - Liquid Ether background with content overlay */}
      <section className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden">
        <LiquidEther
          colors={[ '#5227FF', '#FF9FFC', '#B19EEF', '#3a2e6e', '#2a2250' ]}
          mouseForce={15}
          cursorSize={80}
          isViscous={false}
          viscous={25}
          iterationsViscous={24}
          iterationsPoisson={24}
          resolution={responsiveResolution}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.8}
          takeoverDuration={0.2}
          autoResumeDelay={2000}
          autoRampDuration={0.4}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        />
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
          <div className="hero-content text-center max-w-4xl mx-auto">
            <h1 className="hero-title text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
              <span className="block hollow-font-animated">Aditya Srivastava</span>
              <span className="hero-subtitle block text-base sm:text-lg md:text-xl lg:text-2xl font-normal mt-2 hollow-font-secondary">
                Computer Science Engineer
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 sci-fi-muted leading-relaxed max-w-2xl mx-auto">
              Building functional, user‑centered applications across the stack
            </p>
            <div className="hero-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
              <Button 
                size="lg" 
                className="glow bg-[#5227FF] text-white hover:bg-[#5227FF]/90 px-6 sm:px-8 py-2 sm:py-3 w-full sm:w-auto"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="glow border-[#5227FF] text-[#5227FF] hover:bg-[#5227FF]/10 px-6 sm:px-8 py-2 sm:py-3 w-full sm:w-auto"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </Button>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center gap-4 sm:gap-6">
              <a 
                href="mailto:Adisrivastav23@gmail.com" 
                className="glow p-2 sm:p-3 rounded-full bg-card/60 hover:bg-card/80 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 sci-fi-accent" />
              </a>
              <a 
                href="https://github.com/psyodrz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glow p-2 sm:p-3 rounded-full bg-card/60 hover:bg-card/80 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5 sci-fi-accent" />
              </a>
              <a 
                href="https://linkedin.com/in/adisrivastav23" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glow p-2 sm:p-3 rounded-full bg-card/60 hover:bg-card/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 sci-fi-accent" />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* ABOUT */}
      <Section
        id="about"
        title={<span className="sci-fi-text">About Me</span>}
        description={<span className="sci-fi-muted">I'm a Computer Science Engineering student passionate about building functional, user‑centered applications across the stack.</span>}
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 leading-relaxed sci-fi-text">
            <p>
              With a strong foundation in frontend and backend technologies, I enjoy crafting experiences that are performant and accessible.
            </p>
            <p>
              I’m constantly learning new tools and patterns across web and mobile, and I love exploring creative coding, games, and AI.
            </p>
          </div>
          <div className="sci-fi-card p-6">
            <h3 className="text-lg font-medium sci-fi-accent">Education</h3>
            <ul className="mt-3 space-y-2 text-sm sci-fi-muted">
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

      {/* SKILLS */}
      <Section id="skills" title={<span className="sci-fi-text">Skills & Expertise</span>} description={<span className="sci-fi-muted">Interactive showcase of my technical skills and proficiency levels across different domains.</span>}>
        <SkillsShowcase />
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" title={<span className="sci-fi-text">Experience & Education</span>} description={<span className="sci-fi-muted">My professional journey, education, and key achievements over the years.</span>}>
        <TimelineSection />
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title={<span className="sci-fi-text">Featured Projects</span>} description={<span className="sci-fi-muted">Interactive showcase of my best work across web development, AI, and game development.</span>}>
        <ProjectsSection />
      </Section>

      {/* CONTACT */}
      <Section
        id="contact"
        title={<span className="sci-fi-text">Get In Touch</span>}
        description={<span className="sci-fi-muted">Ready to work together? Let's discuss your next project or just say hello!</span>}
      >
        <EnhancedContact />
        <footer className="mt-10 text-sm sci-fi-muted text-center">© 2025 Aditya Srivastava. All rights reserved.</footer>
      </Section>
    </main>
  )
}
