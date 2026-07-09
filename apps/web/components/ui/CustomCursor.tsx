'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

const LERP = 0.12
const SIZE_DEFAULT = 20
const SIZE_TEXT = 140
const SIZE_POINTER = 48
const SIZE_PROJECT = 150

type CursorMode = 'default' | 'text' | 'pointer' | 'project'

export default function CustomCursor() {
  const [isClient, setIsClient] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const target = useRef({ x: -100, y: -100 })
  const currentSize = useRef(SIZE_DEFAULT)
  const targetSize = useRef(SIZE_DEFAULT)
  const mode = useRef<CursorMode>('default')
  const rafRef = useRef(0)

  const animate = useCallback(() => {
    pos.current.x += (target.current.x - pos.current.x) * LERP
    pos.current.y += (target.current.y - pos.current.y) * LERP
    currentSize.current += (targetSize.current - currentSize.current) * 0.1

    const el = cursorRef.current
    const dot = dotRef.current
    const label = labelRef.current
    if (el) {
      const s = currentSize.current
      el.style.transform = `translate(${pos.current.x - s / 2}px, ${pos.current.y - s / 2}px)`
      el.style.width = `${s}px`
      el.style.height = `${s}px`

      const isText = mode.current === 'text'
      const isPointer = mode.current === 'pointer'
      const isProject = mode.current === 'project'

      // Glass effect for text and project modes
      const useGlass = isText || isProject
      const glassValue = isProject
        ? 'blur(6px) contrast(1.05) saturate(1.2)'
        : 'blur(3px) contrast(1.1) saturate(1.3)'
      el.style.backdropFilter = useGlass ? glassValue : 'none'
      el.style.setProperty('-webkit-backdrop-filter', useGlass ? glassValue : 'none')
      el.style.background = isProject
        ? 'rgba(255, 255, 255, 0.5)'
        : isPointer
          ? 'rgba(255, 255, 255, 0.08)'
          : 'transparent'
      el.style.borderColor = isText
        ? 'rgba(255, 255, 255, 0.15)'
        : isProject
          ? 'rgba(255, 255, 255, 0.2)'
          : isPointer
            ? 'rgba(255, 255, 255, 0.3)'
            : 'rgba(255, 255, 255, 0.5)'
    }

    if (dot) {
      const hidesDot = mode.current === 'text' || mode.current === 'project'
      dot.style.transform = `translate(${target.current.x - 3}px, ${target.current.y - 3}px)`
      dot.style.opacity = hidesDot ? '0' : '0.8'
    }

    if (label) {
      label.style.opacity = mode.current === 'project' ? '1' : '0'
      label.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    setIsClient(true)

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true)
      target.current = { x: e.clientX, y: e.clientY }

      const el = e.target as HTMLElement

      // Check for project image (data attribute)
      const isProjectEl = el.closest('[data-cursor="project"]') !== null

      // Check if over interactive element
      const isInteractive =
        ['button', 'a', 'input', 'select', 'textarea'].includes(el.tagName.toLowerCase()) ||
        el.closest('button') !== null ||
        el.closest('a') !== null

      // Check if over text content
      const isTextEl =
        ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'LI', 'BLOCKQUOTE', 'LABEL', 'EM', 'STRONG'].includes(el.tagName) &&
        !isInteractive && !isProjectEl

      if (isProjectEl) {
        mode.current = 'project'
        targetSize.current = SIZE_PROJECT
      } else if (isInteractive) {
        mode.current = 'pointer'
        targetSize.current = SIZE_POINTER
      } else if (isTextEl) {
        mode.current = 'text'
        targetSize.current = SIZE_TEXT
      } else {
        mode.current = 'default'
        targetSize.current = SIZE_DEFAULT
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(rafRef.current)
    }
  }, [animate, isVisible])

  if (!isClient) return null

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
        }}
      >
        {/* Glass circle */}
        <div
          ref={cursorRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: SIZE_DEFAULT,
            height: SIZE_DEFAULT,
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            background: 'transparent',
            willChange: 'transform, width, height, backdrop-filter',
            transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
          }}
        />

        {/* "Scopri" label — visible only in project mode */}
        <span
          ref={labelRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            color: 'rgba(255, 255, 255, 0.9)',
            opacity: 0,
            transition: 'opacity 0.2s ease',
            whiteSpace: 'nowrap',
            willChange: 'transform',
          }}
        >
          Scopri progetto
        </span>

        {/* Center dot */}
        <div
          ref={dotRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            willChange: 'transform',
            transition: 'opacity 0.2s ease',
          }}
        />
      </div>
    </>
  )
}
