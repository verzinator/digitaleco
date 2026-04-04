'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Spring configurations for smoothness
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const springX = useSpring(-100, springConfig)
  const springY = useSpring(-100, springConfig)

  const smallSpringConfig = { damping: 40, stiffness: 400, mass: 0.1 }
  const smallSpringX = useSpring(-100, smallSpringConfig)
  const smallSpringY = useSpring(-100, smallSpringConfig)

  useEffect(() => {
    setIsClient(true)
    
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      // Show cursor as soon as mouse moves
      if (!isVisible) setIsVisible(true)
      
      const { clientX, clientY } = e
      springX.set(clientX)
      springY.set(clientY)
      smallSpringX.set(clientX)
      smallSpringY.set(clientY)

      // Detect if hovering over interactive elements
      const target = e.target as HTMLElement
      const isInteractive = 
        window.getComputedStyle(target).cursor === 'pointer' ||
        ['button', 'a', 'input', 'select', 'textarea'].includes(target.tagName.toLowerCase()) ||
        target.closest('button') !== null ||
        target.closest('a') !== null

      setIsPointer(isInteractive)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [springX, springY, smallSpringX, smallSpringY, isVisible])

  // Don't render on server
  if (!isClient) return null
  
  // Also only hide cursor via CSS if visible/client
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 769px) {
          * { cursor: none !important; }
          a, button, [role="button"] { cursor: none !important; }
        }
      `}} />
      
      <div 
        style={{ 
          position: 'fixed', 
          inset: 0, 
          pointerEvents: 'none', 
          zIndex: 999999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease',
          mixBlendMode: 'difference'
        }}
      >
        {/* Outer Ring */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 32,
            height: 32,
            border: '1.2px solid #FFFFFF',
            borderRadius: '50%',
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isPointer ? 1.4 : 1,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        />

        {/* Inner Dot */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 5,
            height: 5,
            backgroundColor: '#FFFFFF',
            borderRadius: '50%',
            x: smallSpringX,
            y: smallSpringY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isPointer ? 0.3 : 1,
            opacity: isPointer ? 1 : 0.8
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
        />
      </div>
    </>
  )
}
