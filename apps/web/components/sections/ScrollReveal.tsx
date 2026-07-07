'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

// Words wrapped in *asterisks* render in serif italic (Instrument Serif)
// Everything else renders in sans-serif (DM Sans)
type Token = { text: string; emphasis: boolean }

function tokenize(input: string): Token[] {
  const tokens: Token[] = []
  const regex = /\*([^*]+)\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: input.slice(lastIndex, match.index), emphasis: false })
    }
    tokens.push({ text: match[1], emphasis: true })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < input.length) {
    tokens.push({ text: input.slice(lastIndex), emphasis: false })
  }
  return tokens
}

// Flatten tokens into individual words preserving emphasis
type WordToken = { word: string; emphasis: boolean }

function tokenizeWords(input: string): WordToken[] {
  const tokens = tokenize(input)
  const words: WordToken[] = []
  for (const t of tokens) {
    for (const w of t.text.split(/\s+/).filter(Boolean)) {
      words.push({ word: w, emphasis: t.emphasis })
    }
  }
  return words
}

const PARAGRAPHS = [
  'Non siamo quelli dei template. Siamo quelli che si siedono al tuo *tavolo,* capiscono dove vuoi arrivare e costruiscono il percorso per portarti lì.',
  'Digital Eco nasce per dare alle imprese italiane una comunicazione che *funziona* davvero. Fatta bene, pensata meglio, misurata *sempre.*',
]

function ScrollParagraph({
  text,
  scrollYProgress,
  startAt,
  endAt,
}: {
  text: string
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  startAt: number
  endAt: number
}) {
  const words = tokenizeWords(text)
  const range = endAt - startAt

  return (
    <p style={{
      fontSize: 'clamp(1.5rem, 1rem + 2.8vw, 3rem)',
      fontWeight: 400,
      lineHeight: 1.35,
      letterSpacing: '-0.015em',
      margin: 0,
    }}>
      {words.map((w, i) => {
        const wordStart = startAt + (i / words.length) * range
        const wordEnd = startAt + ((i + 1) / words.length) * range
        return (
          <WordSpan key={i} token={w} scrollYProgress={scrollYProgress} start={wordStart} end={wordEnd} />
        )
      })}
    </p>
  )
}

function WordSpan({
  token,
  scrollYProgress,
  start,
  end,
}: {
  token: WordToken
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  start: number
  end: number
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1])
  const color = useTransform(
    scrollYProgress,
    [start, end],
    token.emphasis ? ['#FFFFFF', '#0A8F5C'] : ['#FFFFFF', '#FFFFFF']
  )

  return (
    <>
      <motion.span
        style={{
          color: token.emphasis ? color : undefined,
          opacity,
          display: 'inline',
          willChange: 'opacity, color',
          fontFamily: token.emphasis ? 'var(--font-display)' : 'var(--font-body)',
          fontStyle: token.emphasis ? 'italic' : 'normal',
          fontWeight: token.emphasis ? 400 : 300,
        }}
      >
        {token.word}
      </motion.span>
      {' '}
    </>
  )
}

export default function ScrollReveal() {
  const containerRef = useRef<HTMLElement>(null)
  const rm = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const bodyStyle = {
    fontSize: 'clamp(1.5rem, 1rem + 2.8vw, 3rem)',
    fontFamily: 'var(--font-body)',
    fontWeight: 300,
    lineHeight: 1.35,
    letterSpacing: '-0.015em',
    margin: 0,
  } as const

  return (
    <section
      ref={containerRef}
      aria-labelledby="approach-title"
      style={{
        background: '#0F1410',
        color: '#FFFFFF',
        minHeight: '200vh',
        position: 'relative',
      }}
    >
      <h2 id="approach-title" className="sr-only">Il nostro approccio alla comunicazione digitale</h2>
      <div style={{
        position: 'sticky',
        top: 0,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(48px, 8vw, 120px) clamp(32px, 6vw, 100px)',
      }}>
        <div style={{
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(28px, 4vw, 48px)',
          textAlign: 'center',
        }}>
          {rm ? (
            PARAGRAPHS.map((raw, i) => {
              const tokens = tokenize(raw)
              return (
                <p key={i} style={bodyStyle}>
                  {tokens.map((t, j) => (
                    <span key={j} style={{
                      fontFamily: t.emphasis ? 'var(--font-display)' : 'var(--font-body)',
                      fontStyle: t.emphasis ? 'italic' : 'normal',
                      fontWeight: t.emphasis ? 400 : 300,
                      color: t.emphasis ? 'var(--color-accent)' : undefined,
                    }}>
                      {t.text}
                    </span>
                  ))}
                </p>
              )
            })
          ) : (
            PARAGRAPHS.map((text, i) => (
              <ScrollParagraph
                key={i}
                text={text}
                scrollYProgress={scrollYProgress}
                startAt={0.1 + i * 0.35}
                endAt={0.1 + (i + 1) * 0.35}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
