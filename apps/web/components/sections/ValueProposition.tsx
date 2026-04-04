'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Zap, Search, Smartphone, ShieldCheck, TrendingUp, Users } from 'lucide-react'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const points = [
  {
    icon: Zap,
    title: 'Veloce',
    description: 'Tempi di caricamento sotto 2 secondi. Performance ottimizzata per ogni dispositivo.',
  },
  {
    icon: Search,
    title: 'Trovabile',
    description: 'Ottimizzazione SEO on-page e tecnica per scalare i risultati di Google.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-first',
    description: "Progettato prima per smartphone, poi per desktop. Il 70% dei tuoi clienti naviga da mobile.",
  },
  {
    icon: ShieldCheck,
    title: 'Sicuro',
    description: 'HTTPS, backup automatici, protezione da attacchi. La sicurezza non è opzionale.',
  },
  {
    icon: TrendingUp,
    title: 'Convertente',
    description: 'UX e copy studiati per trasformare visitatori in clienti. Ogni elemento ha uno scopo.',
  },
  {
    icon: Users,
    title: 'Scalabile',
    description: 'Architettura che cresce con te. Da startup a enterprise, senza migrazioni costose.',
  },
]

/* ─── Card singola ──────────────────────────────────────── */
function PointCard({
  icon: Icon,
  title,
  description,
  index,
  noAnim = false,
}: {
  icon: React.ElementType
  title: string
  description: string
  index: number
  noAnim?: boolean
}) {
  const reduceMotion = useReducedMotion()
  const animate = !noAnim && !reduceMotion

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 24 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px -40px' }}
      transition={{ duration: 0.6, ease: EASE }}
      whileHover={animate ? { x: 8, boxShadow: 'var(--shadow-md)' } : {}}
      style={{
        display: 'flex',
        gap: 'var(--space-6)',
        alignItems: 'center',
        padding: 'var(--space-8)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        minHeight: '160px',
        height: '100%',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          flexShrink: 0,
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'oklch(from var(--color-primary) l c h / 0.08)',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        <Icon size={20} color="var(--color-primary)" strokeWidth={1.75} />
      </div>
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            fontWeight: 700,
            color: 'var(--color-text)',
            marginBottom: 'var(--space-1)',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Carousel mobile (drag + loop infinito + dots) ──────── */
const CARD_GAP = 16

function MobileCarousel() {
  const N = points.length
  // Triplico per loop infinito: [copy A | original | copy B]
  const all = [...points, ...points, ...points]

  // idx: posizione corrente nel set triplicato; parte dal set centrale (N)
  const [idx, setIdx] = useState(N)
  const idxRef = useRef(N)

  const [dragOffset, setDragOffset] = useState(0)
  const [animating, setAnimating] = useState(true)
  const [isDragging, setIsDragging] = useState(false)

  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerW, setContainerW] = useState(0)

  // Card larga quanto il viewport - 48px (24px peek per lato)
  const cardW = containerW > 0 ? containerW - 48 : 280
  const step  = cardW + CARD_GAP

  // Aggiorna idx sia nella ref (per handlers senza stale closure) sia nello state (per re-render)
  function setIndex(n: number) {
    idxRef.current = n
    setIdx(n)
  }

  // Misura larghezza container per centrare la card attiva
  useEffect(() => {
    if (!containerRef.current) return
    setContainerW(containerRef.current.offsetWidth)
    const ro = new ResizeObserver(([e]) => setContainerW(e.contentRect.width))
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  // Blocca lo scroll verticale della pagina mentre si trascina — deve essere passive:false
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const handler = (e: TouchEvent) => {
      if (isDraggingRef.current) e.preventDefault()
    }
    el.addEventListener('touchmove', handler, { passive: false })
    return () => el.removeEventListener('touchmove', handler)
  }, [])

  // Dopo la transizione: se siamo usciti dal set centrale, salto silenzioso all'equivalente
  function handleTransitionEnd() {
    const i = idxRef.current
    if (i < N) { setAnimating(false); setIndex(i + N) }
    else if (i >= N * 2) { setAnimating(false); setIndex(i - N) }
  }

  function onDragStart(x: number) {
    isDraggingRef.current = true
    setIsDragging(true)
    startXRef.current = x
    setAnimating(false)
  }

  function onDragMove(x: number) {
    if (!isDraggingRef.current) return
    setDragOffset(x - startXRef.current)
  }

  function onDragEnd(x: number) {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDragging(false)
    const diff = x - startXRef.current
    setDragOffset(0)
    setAnimating(true)
    if (Math.abs(diff) > 40) {
      setIndex(idxRef.current + (diff < 0 ? 1 : -1))
    }
  }

  // Centra la card corrente nella viewport del container
  const translateX = containerW / 2 - cardW / 2 - idx * step + dragOffset

  // Dot attivo (0…N-1)
  const dotIdx = ((idx - N) % N + N) % N

  return (
    <div>
      {/* Track */}
      <div
        ref={containerRef}
        style={{
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
          paddingBlock: '8px',
          touchAction: 'pan-y', // lascia lo scroll verticale, blocco touch-x via handler
        }}
        onMouseDown={e => onDragStart(e.clientX)}
        onMouseMove={e => onDragMove(e.clientX)}
        onMouseUp={e => onDragEnd(e.clientX)}
        onMouseLeave={e => { if (isDraggingRef.current) onDragEnd(e.clientX) }}
        onTouchStart={e => onDragStart(e.touches[0].clientX)}
        onTouchEnd={e => onDragEnd(e.changedTouches[0].clientX)}
      >
        <div
          style={{
            display: 'flex',
            gap: `${CARD_GAP}px`,
            transform: containerW > 0 ? `translateX(${translateX}px)` : undefined,
            transition: animating && !isDragging
              ? 'transform 380ms cubic-bezier(0.16,1,0.3,1)'
              : 'none',
            willChange: 'transform',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {all.map((item, i) => (
            <div key={i} style={{ width: `${cardW}px`, flexShrink: 0 }}>
              <PointCard {...item} index={i % N} noAnim />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div
        role="tablist"
        aria-label="Indicatore card"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginTop: 'var(--space-6)',
        }}
      >
        {points.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={dotIdx === i}
            aria-label={`Card ${i + 1}`}
            onClick={() => { setAnimating(true); setIndex(N + i) }}
            style={{
              width: dotIdx === i ? '22px' : '8px',
              height: '8px',
              borderRadius: '999px',
              background: dotIdx === i
                ? 'var(--color-primary)'
                : 'var(--color-text-faint)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
              transition: 'width 300ms cubic-bezier(0.16,1,0.3,1), background 300ms ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Testo introduttivo (riusato su mobile e desktop) ───── */
function IntroText({ id }: { id?: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
        Il nostro approccio
      </p>
      <h2
        id={id}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-3xl)',
          lineHeight: 1.1,
          color: 'var(--color-text)',
          marginBottom: 'var(--space-4)',
        }}
      >
        Un sito efficace deve fare tutto questo
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
          maxWidth: '480px',
        }}
      >
        Non costruiamo solo siti belli. Costruiamo strumenti che lavorano per te
        24 ore su 24, 7 giorni su 7 — attraendo, coinvolgendo e convertendo.
      </p>
    </motion.div>
  )
}

/* ─── Sezione principale ──────────────────────────────────── */
export default function ValueProposition() {
  return (
    <section
      aria-labelledby="value-title"
      style={{
        background: 'var(--color-surface-offset)',
        paddingBlock: 'var(--space-20)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Mobile / Tablet (< lg) ── */}
      <div className="lg:hidden">
        <div className="container" style={{ marginBottom: 'var(--space-10)' }}>
          <IntroText id="value-title" />
        </div>
        {/* nessun container — il carousel tocca i bordi del viewport */}
        <MobileCarousel />
      </div>

      {/* ── Desktop (≥ lg) ── */}
      <div className="container hidden lg:block">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr',
            gap: 'var(--space-12)',
            alignItems: 'start',
          }}
        >
          {/* Colonna sinistra: testo sticky */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <IntroText id="value-title-desktop" />
          </div>

          {/* Colonna destra: card verticali */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {points.map((point, i) => (
              <PointCard key={point.title} {...point} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
