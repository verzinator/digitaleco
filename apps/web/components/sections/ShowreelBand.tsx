'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
// Quanto parte rimpicciolito il riquadro prima di aprirsi con lo scroll.
const START_SCALE = 0.88

/**
 * Lo stesso showreel dell'intro, qui in una fascia a scorrimento: entra
 * leggermente più piccolo e si apre mentre sale. Il video gira per intero e
 * riparte da solo in loop, senza tagli né pause. Il trattamento grafico —
 * velatura verde, vignettatura e desaturazione — è quello dello splash in
 * apertura.
 */
export default function ShowreelBand() {
  const rm = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoSrc, setVideoSrc] = useState('')

  // Su telefono va il montaggio verticale, sul desktop quello orizzontale con
  // il testo. La scelta resta agganciata alla query: se lo schermo cambia —
  // rotazione, finestra ridimensionata — il video passa all'altro file, e solo
  // quando serve davvero, così una riproduzione in corso non riparte da capo.
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px), (orientation: portrait)')
    const apply = (verticale: boolean) => {
      setVideoSrc(verticale ? '/showreel/showreel-mobile.mp4' : '/showreel/showreel-desktop-text.mp4')
    }

    apply(query.matches)
    const onChange = (event: MediaQueryListEvent) => apply(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  // Il video non si ferma mai: se l'autoplay viene rifiutato — succede quando
  // la scheda nasce in secondo piano — si riprova appena la fascia entra nello
  // schermo, ma la riproduzione non viene mai messa in pausa.
  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoSrc || rm) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video.paused) {
          void video.play().catch(() => {})
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [videoSrc, rm])

  // Il riquadro si apre mentre entra: da quando il bordo alto tocca il fondo
  // dello schermo fino a quando è a metà viewport.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  const smoothProgress = useSpring(scrollYProgress, { damping: 40, stiffness: 90, mass: 0.6 })
  const scale = useTransform(smoothProgress, [0, 1], [START_SCALE, 1])

  return (
    <section
      ref={sectionRef}
      aria-label="Showreel Digital Eco"
      className="showreel-section"
      style={{
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* La forma del riquadro segue la stessa condizione con cui si sceglie il
          file: orizzontale col montaggio desktop, verticale con quello mobile,
          che è 608x1080. Sta nel CSS e non nello stato perché così è già giusta
          al primo disegno, senza un salto di forma dopo il caricamento.
          Da telefono il riquadro non tiene la proporzione ma l'altezza dello
          schermo: riempie quasi tutta la pagina, e i pochi pixel ai lati
          servono solo a far vedere gli angoli arrotondati. */}
      <style>{`
        .showreel-section {
          padding-block: clamp(48px, 7vw, 96px);
          padding-inline: clamp(24px, 5vw, 80px);
        }
        .showreel-frame {
          aspect-ratio: 16 / 9;
        }
        @media (max-width: 767px), (orientation: portrait) {
          .showreel-section {
            padding-block: clamp(32px, 8vw, 64px);
            padding-inline: 12px;
          }
          .showreel-frame {
            aspect-ratio: auto;
            height: 90svh;
          }
        }
      `}</style>

      <motion.div
        initial={rm ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="showreel-frame"
        style={{
          position: 'relative',
          maxWidth: '1440px',
          margin: '0 auto',
          borderRadius: '40px',
          overflow: 'hidden',
          border: '1px solid rgba(240, 245, 242, 0.08)',
          background: '#030806',
          scale: rm ? 1 : scale,
          transformOrigin: 'center',
          willChange: 'transform',
        }}
      >
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay={!rm}
            muted
            loop
            playsInline
            preload="metadata"
            controls={!!rm}
            disablePictureInPicture
            disableRemotePlayback
            tabIndex={-1}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              objectFit: 'cover',
              transform: 'scale(1.015)',
              filter: 'saturate(0.96)',
            }}
          />
        )}

        {/* Stessa velatura dello splash: tinta verde, vignettatura, bordi in ombra */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: [
              'linear-gradient(rgba(5, 67, 43, 0.3), rgba(4, 48, 31, 0.38))',
              'radial-gradient(circle at center, transparent 42%, rgba(0, 0, 0, 0.3) 72%, rgba(0, 0, 0, 0.78) 100%)',
              'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), transparent 22%, transparent 72%, rgba(0, 0, 0, 0.48))',
            ].join(', '),
            boxShadow: 'inset 0 0 clamp(70px, 12vw, 220px) clamp(20px, 5vw, 90px) rgba(0, 0, 0, 0.48)',
            pointerEvents: 'none',
          }}
        />
      </motion.div>
    </section>
  )
}
