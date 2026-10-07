/**
 * iOS concede l'autoplay solo a un video gia' muto quando entra nel documento,
 * e guarda l'attributo `muted`, non la proprieta'. React scrive l'attributo
 * nell'HTML generato dal server, ma non quando l'elemento nasce lato client —
 * sorgente scelta dopo il mount, arrivo da un link interno — e allora iOS
 * blocca la riproduzione e mostra il pulsante di avvio. Va forzato a mano.
 */
export function forceMuted(video: HTMLVideoElement | null) {
  if (!video) return
  video.muted = true
  video.defaultMuted = true
  if (!video.hasAttribute('muted')) video.setAttribute('muted', '')
}
