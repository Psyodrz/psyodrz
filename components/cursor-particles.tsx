"use client"

import { useCallback, useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadAll } from "@tsparticles/all"
import type { Container, Engine } from "@tsparticles/engine"

interface CursorParticlesProps {
  className?: string
}

export function CursorParticles({ className = "" }: CursorParticlesProps) {
  const [init, setInit] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)

  useEffect(() => {
    if (isInitializing || init) return
    
    setIsInitializing(true)
    initParticlesEngine(async (engine) => {
      await loadAll(engine)
    }).then(() => {
      setInit(true)
      setIsInitializing(false)
    }).catch((error) => {
      console.error("Failed to initialize particles:", error)
      setIsInitializing(false)
    })
  }, [init, isInitializing])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    if (container) {
      console.log("Particles loaded successfully:", container.particles.count)
    }
  }, [])

  if (init) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        <Particles
          id="cursor-particles"
          className="w-full h-full"
          particlesLoaded={particlesLoaded}
                 options={{
                   background: {
                     color: {
                       value: "rgba(0,0,0,0)",
                     },
                   },
                   fpsLimit: 20,
                   interactivity: {
                     events: {
                       onHover: {
                         enable: true,
                         mode: "connect",
                       },
                       onClick: {
                         enable: false,
                       },
                       resize: {
                         enable: true,
                       },
                     },
                     modes: {
                       connect: {
                         distance: 150,
                         links: {
                           opacity: 0.3,
                           color: "#5227FF",
                           width: 1,
                         },
                         radius: 150,
                       },
                     },
                   },
                   particles: {
                     color: {
                       value: "#5227FF",
                     },
                     links: {
                       color: "#5227FF",
                       distance: 150,
                       enable: true,
                       opacity: 0.3,
                       width: 1,
                     },
                     move: {
                       direction: "none",
                       enable: true,
                       outModes: {
                         default: "bounce",
                       },
                       random: false,
                       speed: 0.5,
                       straight: false,
                     },
                     number: {
                       density: {
                         enable: true,
                       },
                       value: 20,
                     },
                     opacity: {
                       value: 0.5,
                     },
                     shape: {
                       type: "circle",
                     },
                     size: {
                       value: { min: 1, max: 2 },
                     },
                   },
                   detectRetina: false,
                 }}
      />
    </div>
  )
  }

  return <></>
}
