"use client"

import { useEffect, useState } from 'react'

export function MobileOptimizer() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLowEnd, setIsLowEnd] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = width <= 768 || /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      
      // Check for low-end device indicators
      const isLowEndDevice = 
        navigator.hardwareConcurrency <= 2 || // Low CPU cores
        (navigator as any).deviceMemory <= 2 || // Low RAM (if available)
        /android.*[0-4]\.[0-9]|iphone.*os [0-9]_[0-3]/i.test(userAgent) // Old OS versions

      setIsMobile(isMobileDevice)
      setIsLowEnd(isLowEndDevice)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  useEffect(() => {
    if (isMobile || isLowEnd) {
      // Disable heavy animations for mobile/low-end devices
      document.documentElement.style.setProperty('--animation-duration', '0.2s')
      document.documentElement.style.setProperty('--transition-duration', '0.2s')
      
      // Reduce motion for better performance
      if (isLowEnd) {
        document.documentElement.style.setProperty('--animation-duration', '0.1s')
        document.documentElement.style.setProperty('--transition-duration', '0.1s')
      }
    } else {
      // Restore normal animations for desktop
      document.documentElement.style.setProperty('--animation-duration', '0.3s')
      document.documentElement.style.setProperty('--transition-duration', '0.3s')
    }
  }, [isMobile, isLowEnd])

  // Add performance monitoring
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'measure' && entry.duration > 100) {
            console.warn(`Slow operation detected: ${entry.name} took ${entry.duration}ms`)
          }
        }
      })
      
      observer.observe({ entryTypes: ['measure'] })
      
      return () => observer.disconnect()
    }
  }, [])

  return null // This component doesn't render anything
}
