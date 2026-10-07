'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 * Tiene ferma l'apertura di una pagina finche' la sua immagine principale non
 * e' pronta, cosi' la foto entra intera invece di disegnarsi mentre la pagina
 * e' gia' in vista. Se la rete e' lenta non si aspetta oltre `maxWait`.
 * Il ref copre l'immagine gia' in cache, per cui `load` e' passato prima che
 * React agganci l'handler.
 */
export function useImageReady(maxWait = 1500) {
  const [ready, setReady] = useState(false)

  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setReady(true)
  }, [])

  const onLoad = useCallback(() => setReady(true), [])

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), maxWait)
    return () => clearTimeout(timer)
  }, [maxWait])

  return { ready, ref, onLoad }
}
