"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Menu, X, ChevronDown } from "lucide-react"

export function NavbarFloating() {
  const [elevated, setElevated] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const onScroll = () => {
      setElevated(window.scrollY > 8)
      
      // Update active section based on scroll position
      const sections = ['about', 'skills', 'projects', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      setActiveSection(currentSection || '')
    }
    
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navItems = [
    { href: "#about", label: "About", id: "about" },
    { href: "#skills", label: "Skills", id: "skills" },
    { href: "#experience", label: "Experience", id: "experience" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#contact", label: "Contact", id: "contact" },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out",
          "glassmorphic-nav backdrop-blur-xl bg-card/20 border border-border/30",
          "rounded-2xl shadow-2xl hover:shadow-[0_20px_40px_rgba(82,39,255,0.15)]",
          elevated ? "scale-105 shadow-[0_8px_30px_rgba(0,0,0,0.45)]" : "scale-100",
          "w-[95%] max-w-4xl mx-auto"
        )}
        role="navigation"
        aria-label="Primary"
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-200 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group"
          >
            <div className="relative">
              <span
                aria-hidden
                className="inline-block h-3 w-3 rounded-full bg-gradient-to-r from-primary to-secondary group-hover:scale-110 transition-transform duration-200"
              />
              <span className="absolute inset-0 h-3 w-3 rounded-full bg-primary/30 animate-ping" />
            </div>
            <span className="text-sm font-bold tracking-wide sci-fi-text group-hover:text-primary transition-colors duration-200">
              Adi.Dev
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink 
                key={item.id}
                href={item.href} 
                label={item.label}
                isActive={activeSection === item.id}
              />
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="#contact" 
              className="px-4 py-2 text-sm font-medium rounded-xl border border-border/50 bg-transparent text-foreground/80 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Contact
            </Link>
            <a 
              href="/Resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-lg hover:shadow-primary/25"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-card/20 border border-border/30 hover:bg-primary/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden transition-all duration-300 ease-out overflow-hidden",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="px-4 pb-4 pt-2 border-t border-border/20">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <MobileNavLink 
                  key={item.id}
                  href={item.href} 
                  label={item.label}
                  isActive={activeSection === item.id}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}
              <div className="flex gap-2 pt-2">
                <Link 
                  href="#contact" 
                  className="flex-1 px-4 py-2 text-sm font-medium rounded-xl border border-border/50 bg-transparent text-foreground/80 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all duration-200 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link 
                  href="/Resume.pdf" 
                  className="flex-1 px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resume
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        isActive 
          ? "text-primary bg-primary/10" 
          : "text-foreground/70 hover:text-primary hover:bg-primary/5"
      )}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
      )}
    </Link>
  )
}

function MobileNavLink({ href, label, isActive, onClick }: { 
  href: string; 
  label: string; 
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        isActive 
          ? "text-primary bg-primary/10 border-l-2 border-primary" 
          : "text-foreground/70 hover:text-primary hover:bg-primary/5"
      )}
    >
      {label}
    </Link>
  )
}
