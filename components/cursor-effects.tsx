"use client"

import { useEffect, useRef } from 'react'

interface RippleEffect {
  id: number
  x: number
  y: number
  timestamp: number
}

export function CursorEffects() {
  const rippleContainerRef = useRef<HTMLDivElement>(null)
  const rippleIdRef = useRef(0)

  useEffect(() => {
    const createRipple = (x: number, y: number) => {
      if (!rippleContainerRef.current) return

      const ripple = document.createElement('div')
      ripple.className = 'cursor-ripple'
      ripple.style.left = `${x - 20}px`
      ripple.style.top = `${y - 20}px`
      
      rippleContainerRef.current.appendChild(ripple)
      
      // Remove ripple after animation
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple)
        }
      }, 600)
    }

    const handleClick = (e: MouseEvent) => {
      createRipple(e.clientX, e.clientY)
    }

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      createRipple(touch.clientX, touch.clientY)
    }

    // Add event listeners
    document.addEventListener('click', handleClick)
    document.addEventListener('touchstart', handleTouchStart, { passive: true })

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])

  return (
    <div
      ref={rippleContainerRef}
      className="fixed inset-0 pointer-events-none z-[9995]"
      style={{ contain: 'layout style paint' }}
    />
  )
}
