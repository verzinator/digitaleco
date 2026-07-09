'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'

/* Typographic fragments — base sans (body), key words in serif (display) */
const headline: { text: string; font: 'display' | 'body' }[] = [
  { text: 'Siamo ', font: 'body' },
  { text: 'Digital Eco. ', font: 'display' },
  { text: 'Agenzia di ', font: 'body' },
  { text: 'comunicazione, ', font: 'display' },
  { text: 'web design ', font: 'display' },
  { text: 'e ', font: 'body' },
  { text: 'advertising ', font: 'display' },
  { text: 'digitale a ', font: 'body' },
  { text: 'Venezia. ', font: 'display' },
  { text: 'Trasformiamo ', font: 'body' },
  { text: 'brand locali ', font: 'display' },
  { text: 'in presenze digitali che competono con i ', font: 'body' },
  { text: 'grandi.', font: 'display' },
]

// Split into words preserving font info
const words: { text: string; font: 'display' | 'body'; isSpace: boolean }[] = []
headline.forEach((fragment) => {
  const parts = fragment.text.split(/(\s+)/)
  parts.filter(Boolean).forEach((part) => {
    words.push({ text: part, font: fragment.font, isSpace: part.trim() === '' })
  })
})
const realWords = words.filter((w) => !w.isSpace)
const totalWords = realWords.length

const MIN_OPACITY = 0.12

function ScrollWord({
  text,
  font,
  wordIndex,
  scrollProgress,
}: {
  text: string
  font: 'display' | 'body'
  wordIndex: number
  scrollProgress: ReturnType<typeof useSpring>
}) {
  const isSerif = font === 'display'
  // Each word has its own reveal window within the scroll range
  // Spread words across 0.0 → 0.9 of scroll progress
  const wordStart = (wordIndex / totalWords) * 0.7
  const wordEnd = wordStart + 0.25

  const opacity = useTransform(
    scrollProgress,
    [wordStart, wordEnd],
    [MIN_OPACITY, 1]
  )

  return (
    <motion.span
      style={{
        fontFamily: isSerif ? 'var(--font-display)' : 'var(--font-body)',
        fontStyle: isSerif ? 'italic' : 'normal',
        fontWeight: isSerif ? 400 : 300,
        opacity,
      }}
    >
      {text}
    </motion.span>
  )
}

export default function Hero() {
  const rm = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // start revealing when section top hits bottom of viewport
    // finish when section bottom hits top of viewport
    offset: ['start end', 'end 0.3'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 100,
    mass: 0.5,
  })

  let wordIdx = 0

  return (
    <section
      aria-label="Chi siamo"
      style={{
        background: 'transparent',
        paddingBlock: 'clamp(64px, 8vw, 120px) clamp(120px, 16vw, 240px)',
        paddingInline: 'clamp(24px, 5vw, 80px)',
      }}
    >
      <div
        ref={sectionRef}
        style={{ position: 'relative', zIndex: 2, maxWidth: '960px', margin: '0 auto', textAlign: 'left' }}
      >
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw + 1rem, 68px)',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#F0F5F2',
            margin: 0,
            fontWeight: 400,
          }}
        >
          <span className="sr-only">
            {headline.map((f) => f.text).join('')}
          </span>
          <span aria-hidden="true">
            {words.map((item, i) => {
              if (item.isSpace) return <span key={i}>{item.text}</span>
              const currentIdx = wordIdx++
              if (rm) {
                const isSerif = item.font === 'display'
                return (
                  <span
                    key={i}
                    style={{
                      fontFamily: isSerif ? 'var(--font-display)' : 'var(--font-body)',
                      fontStyle: isSerif ? 'italic' : 'normal',
                      fontWeight: isSerif ? 400 : 300,
                    }}
                  >
                    {item.text}
                  </span>
                )
              }
              return (
                <ScrollWord
                  key={i}
                  text={item.text}
                  font={item.font}
                  wordIndex={currentIdx}
                  scrollProgress={smoothProgress}
                />
              )
            })}
          </span>
        </h2>
      </div>
    </section>
  )
}
