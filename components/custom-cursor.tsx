"use client"

import { useEffect, useState, useRef, useCallback } from 'react'

interface CursorState {
  x: number
  y: number
  isHovering: boolean
  isClicking: boolean
  isVisible: boolean
  velocity: { x: number; y: number }
  trail: Array<{ x: number; y: number; opacity: number }>
}

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
    isVisible: false,
    velocity: { x: 0, y: 0 },
    trail: []
  })
  
  const lastPosition = useRef({ x: 0, y: 0 })
  const animationFrame = useRef<number>()
  const trailRef = useRef<Array<{ x: number; y: number; opacity: number }>>([])
  const isMobile = useRef(false)

  // Check if device supports hover (desktop)
  const isHoverSupported = useCallback(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches
  }, [])

  // Update cursor position with smooth interpolation
  const updatePosition = useCallback((clientX: number, clientY: number) => {
    const now = Date.now()
    const deltaTime = now - (lastPosition.current as any).timestamp || 16
    const deltaX = clientX - lastPosition.current.x
    const deltaY = clientY - lastPosition.current.y
    
    const velocity = {
      x: deltaX / deltaTime * 16, // Normalize to 60fps
      y: deltaY / deltaTime * 16
    }

    // Add to trail
    trailRef.current.unshift({ x: clientX, y: clientY, opacity: 1 })
    if (trailRef.current.length > 8) {
      trailRef.current.pop()
    }

    // Update trail opacity
    trailRef.current.forEach((point, index) => {
      point.opacity = Math.max(0, 1 - (index * 0.15))
    })

    lastPosition.current = { x: clientX, y: clientY, timestamp: now }

    setCursorState(prev => ({
      ...prev,
      x: clientX,
      y: clientY,
      velocity,
      trail: [...trailRef.current],
      isVisible: true
    }))
  }, [])

  // Mouse events
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isHoverSupported()) return
    updatePosition(e.clientX, e.clientY)
  }, [updatePosition, isHoverSupported])

  const handleMouseDown = useCallback(() => {
    if (!isHoverSupported()) return
    setCursorState(prev => ({ ...prev, isClicking: true }))
  }, [isHoverSupported])

  const handleMouseUp = useCallback(() => {
    if (!isHoverSupported()) return
    setCursorState(prev => ({ ...prev, isClicking: false }))
  }, [isHoverSupported])

  const handleMouseLeave = useCallback(() => {
    if (!isHoverSupported()) return
    setCursorState(prev => ({ ...prev, isVisible: false }))
  }, [isHoverSupported])

  // Touch events for mobile
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (isHoverSupported()) return
    isMobile.current = true
    const touch = e.touches[0]
    updatePosition(touch.clientX, touch.clientY)
    setCursorState(prev => ({ ...prev, isClicking: true, isVisible: true }))
  }, [updatePosition, isHoverSupported])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isHoverSupported()) return
    e.preventDefault()
    const touch = e.touches[0]
    updatePosition(touch.clientX, touch.clientY)
  }, [updatePosition, isHoverSupported])

  const handleTouchEnd = useCallback(() => {
    if (isHoverSupported()) return
    setCursorState(prev => ({ ...prev, isClicking: false, isVisible: false }))
    trailRef.current = []
  }, [isHoverSupported])

  // Hover detection
  const handleElementHover = useCallback((isHover: boolean) => {
    setCursorState(prev => ({ ...prev, isHovering: isHover }))
  }, [])

  useEffect(() => {
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('touchstart', handleTouchStart, { passive: false })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'button, a, input, textarea, select, [role="button"], [tabindex], .hover-target, .interactive'
    )
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => handleElementHover(true))
      el.addEventListener('mouseleave', () => handleElementHover(false))
    })

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', () => handleElementHover(true))
        el.removeEventListener('mouseleave', () => handleElementHover(false))
      })
    }
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleTouchStart, handleTouchMove, handleTouchEnd, handleElementHover])

  // Don't render on mobile devices that don't support hover
  // Only check after component has mounted to avoid SSR issues
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted || (!isHoverSupported() && !isMobile.current)) {
    return null
  }

  return (
    <>
      {/* Main cursor */}
      <div
        className={`custom-cursor ${cursorState.isHovering ? 'hover' : ''} ${cursorState.isClicking ? 'clicking' : ''} ${!cursorState.isVisible ? 'hidden' : ''}`}
        style={{
          left: cursorState.x - 10,
          top: cursorState.y - 10,
          transform: `scale(${cursorState.isClicking ? 0.8 : 1})`,
        }}
      />
      
      {/* Cursor trail */}
      {cursorState.trail.map((point, index) => (
        <div
          key={index}
          className="cursor-trail"
          style={{
            left: point.x - 5,
            top: point.y - 5,
            opacity: point.opacity,
            transform: `scale(${1 - index * 0.1})`,
          }}
        />
      ))}
      
      {/* Velocity-based particles */}
      {Math.abs(cursorState.velocity.x) > 2 || Math.abs(cursorState.velocity.y) > 2 ? (
        <div
          className="velocity-particle"
          style={{
            left: cursorState.x - 2,
            top: cursorState.y - 2,
            transform: `translate(${-cursorState.velocity.x * 2}px, ${-cursorState.velocity.y * 2}px)`,
          }}
        />
      ) : null}
    </>
  )
}
