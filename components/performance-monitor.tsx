"use client"

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return

    // Monitor performance metrics
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
          console.log(`Performance: ${entry.name} took ${entry.duration}ms`)
        }
      }
    })

    observer.observe({ entryTypes: ['measure'] })

    // Monitor long tasks (only very long ones to reduce noise)
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 100) {
          console.warn(`Long task detected: ${Math.round(entry.duration)}ms`)
        }
      }
    })

    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] })
    } catch (error) {
      // PerformanceObserver might not be supported
    }

    return () => {
      try {
        observer.disconnect()
        longTaskObserver.disconnect()
      } catch (error) {
        // Ignore disconnect errors
      }
    }
  }, [])

  return null
}
