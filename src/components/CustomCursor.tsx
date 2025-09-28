"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  lifespan: number;
  opacity: number;
  targetX: number;
  targetY: number;
}

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const magneticButtonRef = useRef<HTMLElement | null>(null);
  const magneticStrength = 0.5; // Adjust this for different magnetic pull strength
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const emitIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Add magnetic class to buttons
    document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
      btn.classList.add('btn-magnetic');
    });
  }, []);

  const createParticle = (x: number, y: number, direction: { x: number, y: number }): Particle => {
    const id = particleIdRef.current++;
    const isDarkTheme = theme === "dark";
    
    // Generate random particle properties
    const size = Math.random() * 4 + 2;
    const lifespan = Math.random() * 800 + 400;
    
    // Colorful particles
    const colors = isDarkTheme 
      ? ["#4a88e8", "#8b5cf6", "#0ea5e9", "#6366f1"] 
      : ["#3b82f6", "#6366f1", "#0ea5e9", "#8b5cf6"];
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Create random movement offset
    const randomOffsetX = (Math.random() - 0.5) * 40;
    const randomOffsetY = (Math.random() - 0.5) * 40;
    
    // Use direction of cursor movement to influence particle direction
    const directionMagnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2);
    const velocityMultiplier = Math.min(directionMagnitude * 0.5, 20);
    
    const targetX = x + (direction.x * velocityMultiplier) + randomOffsetX;
    const targetY = y + (direction.y * velocityMultiplier) + randomOffsetY;
    
    const particle: Particle = {
      id,
      x,
      y,
      size,
      color,
      lifespan,
      opacity: 0.8,
      targetX,
      targetY
    };
    
    // Schedule particle removal
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, lifespan);
    
    return particle;
  };

  useEffect(() => {
    const mouseMove = (e: globalThis.MouseEvent) => {
      // Calculate cursor movement direction and velocity
      const currentPos = { x: e.clientX, y: e.clientY };
      const direction = {
        x: currentPos.x - lastPositionRef.current.x,
        y: currentPos.y - lastPositionRef.current.y
      };
      
      // Update last position for next calculation
      lastPositionRef.current = currentPos;
      
      // Basic mouse position tracking
      setMousePosition(currentPos);
      setIsVisible(true);
      
      // Emit particles based on cursor movement (only when moving significantly)
      const movementMagnitude = Math.sqrt(direction.x ** 2 + direction.y ** 2);
      if (movementMagnitude > 5) {
        const newParticles: Particle[] = [];
        // Emit 1-3 particles depending on movement speed
        const particleCount = Math.min(Math.floor(movementMagnitude / 10) + 1, 3);
        
        for (let i = 0; i < particleCount; i++) {
          newParticles.push(createParticle(e.clientX, e.clientY, direction));
        }
        
        setParticles(prev => [...prev, ...newParticles].slice(-50)); // Limit total particles to 50
      }
      
      // Magnetic effect
      if (magneticButtonRef.current) {
        const btn = magneticButtonRef.current;
        const rect = btn.getBoundingClientRect();
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;
        
        // Calculate distance from button center
        const distX = e.clientX - btnX;
        const distY = e.clientY - btnY;
        
        // Apply magnetic pull - move the button slightly towards cursor
        btn.style.transform = `translate(${distX * magneticStrength}px, ${distY * magneticStrength}px)`;
      }
    };

    const mouseDown = () => {
      setIsClicking(true);
      
      // Emit burst of particles on click
      const burstParticles: Particle[] = [];
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI * 2 / 10) * i;
        burstParticles.push(
          createParticle(
            mousePosition.x, 
            mousePosition.y, 
            { x: Math.cos(angle) * 10, y: Math.sin(angle) * 10 }
          )
        );
      }
      setParticles(prev => [...prev, ...burstParticles].slice(-50));
    };
    
    const mouseUp = () => setIsClicking(false);
    const mouseLeave = () => setIsVisible(false);
    const mouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("mouseleave", mouseLeave);
    window.addEventListener("mouseenter", mouseEnter);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
      window.removeEventListener("mouseleave", mouseLeave);
      window.removeEventListener("mouseenter", mouseEnter);
      
      if (emitIntervalRef.current) {
        clearInterval(emitIntervalRef.current);
      }
    };
  }, [theme, mousePosition]);

  // Add hover effect for links
  useEffect(() => {
    const handleLinkHover = (e: Event) => {
      document.body.classList.add("link-hovered");
      
      const target = e.currentTarget as HTMLElement;
      if (target.classList.contains('btn-magnetic')) {
        setIsHoveringButton(true);
        magneticButtonRef.current = target;
        
        const hoverParticles: Particle[] = [];
        for (let i = 0; i < 5; i++) {
          hoverParticles.push(
            createParticle(
              mousePosition.x, 
              mousePosition.y, 
              { x: (Math.random() - 0.5) * 20, y: (Math.random() - 0.5) * 20 }
            )
          );
        }
        setParticles(prev => [...prev, ...hoverParticles].slice(-50));
      }
    };

    const handleLinkLeave = () => {
      document.body.classList.remove("link-hovered");
      setIsHoveringButton(false);
      
      if (magneticButtonRef.current) {
        magneticButtonRef.current.style.transform = '';
        magneticButtonRef.current = null;
      }
    };

    const links = document.querySelectorAll("a, button, [role='button']");
    
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHover);
      link.addEventListener("mouseleave", handleLinkLeave);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHover);
        link.removeEventListener("mouseleave", handleLinkLeave);
      });
    };
  }, [mounted, mousePosition, theme]);

  if (!mounted) return null;

  // Hide the cursor on mobile/touch devices
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    return null;
  }

  const isDarkTheme = theme === "dark";
  
  const cursorColor = isDarkTheme 
    ? "rgba(74, 136, 232, 0.8)" // Blue for dark theme
    : "rgba(99, 102, 241, 0.8)"; // Indigo for light theme
  
  const ringColor = isDarkTheme
    ? "rgba(139, 92, 246, 0.5)" // Purple for dark theme
    : "rgba(59, 130, 246, 0.5)"; // Blue for light theme

  return (
    <>
      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed top-0 left-0 pointer-events-none z-40 hidden md:block"
          style={{
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            backgroundColor: particle.color,
            opacity: particle.opacity,
            position: "fixed",
            x: particle.x,
            y: particle.y,
          }}
          animate={{
            x: particle.targetX,
            y: particle.targetY,
            opacity: 0,
            scale: 0
          }}
          transition={{
            duration: particle.lifespan / 1000,
            ease: "easeOut"
          }}
        />
      ))}
    
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block"
        style={{
          width: isClicking ? 24 : 12,
          height: isClicking ? 24 : 12,
          borderRadius: "50%",
          backgroundColor: cursorColor,
          position: "fixed",
          mixBlendMode: "difference",
        }}
        animate={{
          x: mousePosition.x - (isClicking ? 12 : 6),
          y: mousePosition.y - (isClicking ? 12 : 6),
          scale: isClicking ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      
      {/* Cursor ring / halo effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40 hidden md:block"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `2px solid ${ringColor}`,
          position: "fixed",
        }}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isClicking ? 1.5 : (isHoveringButton ? 2.5 : document.body.classList.contains("link-hovered") ? 2 : 1),
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.8,
        }}
      />
      
      {/* Cursor action visual indicators */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-30 hidden md:block"
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            border: `2px solid ${cursorColor}`,
            position: "fixed",
          }}
          initial={{ opacity: 1, scale: 0.2, x: mousePosition.x - 25, y: mousePosition.y - 25 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Add global style for custom cursor */}
      <style jsx global>{`
        * {
          cursor: none;
        }
        
        /* Keep native cursor on text selection and inputs */
        input, textarea, [contenteditable], select {
          cursor: text !important;
        }
        
        /* Show cursor on interactive elements */
        a, button, [role="button"], label, [tabindex]:not([tabindex="-1"]) {
          cursor: pointer !important;
        }
        
        /* Custom cursor animation for hover state */
        @media (min-width: 768px) {
          .link-hovered ~ * {
            cursor: pointer !important;
          }
        }
        
        /* Show default cursor on mobile */
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor; 