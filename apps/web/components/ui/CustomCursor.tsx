'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

const LERP = 0.12
const SIZE_DEFAULT = 20
const SIZE_TEXT = 140
const SIZE_POINTER = 48
const SIZE_PROJECT = 150

type CursorMode = 'default' | 'text' | 'pointer' | 'project'

/* Colore del cursore su fondo chiaro / scuro */
const INK_LIGHT_BG = '26, 26, 46' // --color-text
const INK_DARK_BG = '255, 255, 255'
const LUMA_THRESHOLD = 0.6
const BG_SAMPLE_MS = 80

/**
 * Trova il primo elemento opaco sotto il puntatore e dice se il suo
 * sfondo è chiaro. Gli elementi con pointer-events:none (il cursore
 * stesso) sono già esclusi da elementsFromPoint.
 *
 * Su foto e gradienti la luminosità non è leggibile dal CSS: in quel
 * caso si ferma e resta sul cursore bianco, che è la resa voluta sopra
 * le immagini del sito (tutte scure o mediotonali).
 */
function isLightBackgroundAt(x: number, y: number): boolean {
  const stack = document.elementsFromPoint(x, y)

  for (const el of stack) {
    const tag = el.tagName
    if (tag === 'IMG' || tag === 'VIDEO' || tag === 'CANVAS' || tag === 'SVG') return false

    const style = getComputedStyle(el)
    if (style.backgroundImage !== 'none') return false

    const match = style.backgroundColor.match(/rgba?\(([^)]+)\)/)
    if (!match) continue

    const parts = match[1].split(',').map((n) => parseFloat(n))
    const alpha = parts.length > 3 ? parts[3] : 1
    if (alpha < 0.5) continue // trasparente: guarda sotto

    const [r, g, b] = parts
    const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    return luma > LUMA_THRESHOLD
  }

  return false
}

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
  const onLightBg = useRef(false)
  const lastSample = useRef(0)

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

      // Su fondo chiaro il cursore diventa scuro, altrimenti resta bianco
      const ink = onLightBg.current ? INK_LIGHT_BG : INK_DARK_BG

      // Glass effect for text mode, solid fill for project
      const useGlass = isText
      const glassValue = 'blur(3px) contrast(1.1) saturate(1.3)'
      el.style.backdropFilter = useGlass ? glassValue : 'none'
      el.style.setProperty('-webkit-backdrop-filter', useGlass ? glassValue : 'none')
      el.style.background = isProject
        ? `rgb(${ink})`
        : isPointer
          ? `rgba(${ink}, 0.08)`
          : 'transparent'
      el.style.borderColor = isText
        ? `rgba(${ink}, 0.15)`
        : isProject
          ? `rgb(${ink})`
          : isPointer
            ? `rgba(${ink}, 0.3)`
            : `rgba(${ink}, 0.5)`
    }

    if (dot) {
      const hidesDot = mode.current === 'text' || mode.current === 'project'
      dot.style.transform = `translate(${target.current.x - 3}px, ${target.current.y - 3}px)`
      dot.style.opacity = hidesDot ? '0' : '0.8'
      dot.style.backgroundColor = `rgba(${onLightBg.current ? INK_LIGHT_BG : INK_DARK_BG}, 0.8)`
    }

    if (label) {
      label.style.opacity = mode.current === 'project' ? '1' : '0'
      label.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      // La label sta dentro il cerchio pieno: va sempre in controtono
      label.style.color = onLightBg.current ? '#FFFFFF' : '#060D09'
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

      // Campiona la luminosità dello sfondo, non a ogni frame
      const now = performance.now()
      if (now - lastSample.current > BG_SAMPLE_MS) {
        lastSample.current = now
        onLightBg.current = isLightBackgroundAt(e.clientX, e.clientY)
      }

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
            color: '#060D09',
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
