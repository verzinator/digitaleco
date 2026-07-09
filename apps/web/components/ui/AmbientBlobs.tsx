'use client'

const green = [
  'radial-gradient(circle, rgba(10, 143, 92, 0.4) 0%, rgba(10, 143, 92, 0.05) 50%, transparent 70%)',
  'radial-gradient(circle, rgba(46, 204, 113, 0.2) 0%, rgba(46, 204, 113, 0.03) 50%, transparent 70%)',
  'radial-gradient(circle, rgba(10, 92, 68, 0.25) 0%, transparent 60%)',
]

const grey = [
  'radial-gradient(circle, rgba(180, 180, 180, 0.12) 0%, rgba(160, 160, 160, 0.03) 50%, transparent 70%)',
  'radial-gradient(circle, rgba(200, 200, 200, 0.08) 0%, rgba(180, 180, 180, 0.02) 50%, transparent 70%)',
  'radial-gradient(circle, rgba(160, 160, 160, 0.1) 0%, transparent 60%)',
]

export default function AmbientBlobs({ variant = 'green' }: { variant?: 'green' | 'grey' }) {
  const colors = variant === 'grey' ? grey : green

  return (
    <>
      <style>{`
        @keyframes blob-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(5%, -8%) scale(1.05); }
          50% { transform: translate(-3%, 6%) scale(0.95); }
          75% { transform: translate(7%, 3%) scale(1.02); }
        }
        @keyframes blob-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-6%, 4%) scale(0.97); }
          50% { transform: translate(4%, -5%) scale(1.04); }
          75% { transform: translate(-2%, -7%) scale(1); }
        }
        @keyframes blob-drift-3 {
          0%, 100% { transform: translate(-50%, 0) scale(1); }
          25% { transform: translate(-45%, 5%) scale(1.06); }
          50% { transform: translate(-55%, -4%) scale(0.96); }
          75% { transform: translate(-48%, -6%) scale(1.03); }
        }
      `}</style>
      {/* Mouse-reactive gradient — reads --mx/--my from parent */}
      {variant === 'green' && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-20%',
            pointerEvents: 'none',
            willChange: 'background',
            background: `
              radial-gradient(
                ellipse 55% 55% at var(--mx, 50%) var(--my, 50%),
                rgba(10, 92, 68, 0.6) 0%,
                rgba(10, 92, 68, 0.15) 40%,
                transparent 70%
              )
            `,
          }}
        />
      )}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          width: '70vmax',
          height: '70vmax',
          top: '5%',
          right: '-10%',
          borderRadius: '50%',
          background: colors[0],
          animation: 'blob-drift-1 25s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: '60vmax',
          height: '60vmax',
          top: '25%',
          left: '-15%',
          borderRadius: '50%',
          background: colors[1],
          animation: 'blob-drift-2 30s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: '50vmax',
          height: '50vmax',
          top: '15%',
          left: '40%',
          borderRadius: '50%',
          background: colors[2],
          animation: 'blob-drift-3 20s ease-in-out infinite',
        }} />
      </div>
    </>
  )
}
