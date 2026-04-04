import type { ReactNode, CSSProperties } from 'react'

interface CardProps {
  children: ReactNode
  padding?: 'sm' | 'md' | 'lg'
  hoverable?: boolean
  style?: CSSProperties
  className?: string
}

const paddingMap = {
  sm: 'var(--space-4)',
  md: 'var(--space-6)',
  lg: 'var(--space-8)',
}

export default function Card({
  children,
  padding = 'md',
  hoverable = false,
  style,
  className,
}: CardProps) {
  return (
    <div
      className={[hoverable ? 'card' : '', className ?? ''].join(' ').trim()}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        padding: paddingMap[padding],
        ...style,
      }}
    >
      {children}
    </div>
  )
}
