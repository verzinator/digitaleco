'use client'

import { useCallback, useEffect, useState } from 'react'

const SESSION_KEY = 'digitaleco-showreel-seen-v6'
const EXIT_DURATION_MS = 900
const INTRO_END_SECONDS = 5.45

type Phase = 'checking' | 'playing' | 'exit' | 'done'

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>('checking')
  const [videoSrc, setVideoSrc] = useState('')
  const [sequenceStarted, setSequenceStarted] = useState(false)

  const finishIntro = useCallback(() => {
    setPhase((current) => {
      if (current === 'exit' || current === 'done') return current
      try {
        window.sessionStorage.setItem(SESSION_KEY, 'true')
      } catch {
        // The intro still works when storage is unavailable.
      }
      return 'exit'
    })
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let alreadySeen = false

    try {
      alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === 'true'
    } catch {
      // Continue with the intro when storage is unavailable.
    }

    if (reducedMotion || alreadySeen) {
      setPhase('done')
      return
    }

    const mobile = window.matchMedia('(max-width: 767px), (orientation: portrait)').matches
    setVideoSrc(mobile ? '/showreel/showreel-mobile.m4v' : '/showreel/showreel-desktop-text.m4v')

    const fallback = window.setTimeout(finishIntro, 10000)
    return () => window.clearTimeout(fallback)
  }, [finishIntro])

  useEffect(() => {
    if (phase === 'done') return
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    const preventScroll = (event: Event) => event.preventDefault()

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchmove', preventScroll)
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'exit') return
    const timeout = window.setTimeout(() => setPhase('done'), EXIT_DURATION_MS)
    return () => window.clearTimeout(timeout)
  }, [phase])

  if (phase === 'done') return null

  const exiting = phase === 'exit'

  return (
    <div
      className={`showreel-intro${sequenceStarted ? ' showreel-intro-sequence' : ''}${exiting ? ' showreel-intro-exit' : ''}`}
      aria-label="Showreel Digital Eco"
    >
      <style>{`
        .showreel-intro {
          position: fixed;
          inset: 0;
          z-index: 99999;
          overflow: hidden;
          overscroll-behavior: none;
          touch-action: none;
          background: #030806;
          opacity: 1;
          transform: translateY(0);
          will-change: transform;
          transition: transform ${EXIT_DURATION_MS}ms cubic-bezier(0.76, 0, 0.24, 1);
        }
        .showreel-intro::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(rgba(5, 67, 43, 0.3), rgba(4, 48, 31, 0.38)),
            radial-gradient(circle at center, transparent 42%, rgba(0, 0, 0, 0.3) 72%, rgba(0, 0, 0, 0.78) 100%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.2), transparent 22%, transparent 72%, rgba(0, 0, 0, 0.48));
          box-shadow: inset 0 0 clamp(70px, 12vw, 220px) clamp(20px, 5vw, 90px) rgba(0, 0, 0, 0.48);
          pointer-events: none;
        }
        .showreel-intro video {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          opacity: 0;
          transform: scale(1.015);
          filter: saturate(0.96);
          transition:
            opacity 450ms ease,
            transform ${EXIT_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1),
            filter ${EXIT_DURATION_MS}ms ease;
        }
        .showreel-intro video.is-ready { opacity: 1; }
        .showreel-intro-sequence video {
          transform: translateY(-4vh) scale(1.12);
          filter: saturate(0.9) brightness(0.76);
        }
        .showreel-intro-exit {
          transform: translateY(-100%);
          pointer-events: none;
        }
        .showreel-intro-exit video {
          transform: translateY(-4vh) scale(1.12);
          filter: saturate(0.9) brightness(0.76);
        }
        @media (prefers-reduced-motion: reduce) {
          .showreel-intro,
          .showreel-intro video {
            transition: none;
          }
        }
      `}</style>

      {videoSrc && (
        <video
          src={videoSrc}
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          onCanPlay={(event) => {
            event.currentTarget.classList.add('is-ready')
            setPhase((current) => current === 'checking' ? 'playing' : current)
            void event.currentTarget.play()
          }}
          onTimeUpdate={(event) => {
            if (event.currentTarget.currentTime >= 3) setSequenceStarted(true)
            if (event.currentTarget.currentTime >= INTRO_END_SECONDS) finishIntro()
          }}
          onEnded={finishIntro}
          onError={finishIntro}
        />
      )}
    </div>
  )
}
