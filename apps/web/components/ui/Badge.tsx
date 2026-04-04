import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'primary' | 'accent' | 'inverse'
}

const variantStyles = {
  default: {
    background: 'var(--color-surface-offset)',
    color: 'var(--color-text-muted)',
    border: '1px solid var(--color-border)',
  },
  primary: {
    background: 'oklch(from var(--color-primary) l c h / 0.08)',
    color: 'var(--color-primary)',
    border: '1px solid oklch(from var(--color-primary) l c h / 0.15)',
  },
  accent: {
    background: 'oklch(from var(--color-accent) l c h / 0.12)',
    color: 'var(--color-primary)',
    border: '1px solid oklch(from var(--color-accent) l c h / 0.20)',
  },
  inverse: {
    background: 'oklch(from #FFFFFF l c h / 0.15)',
    color: '#FFFFFF',
    border: '1px solid oklch(from #FFFFFF l c h / 0.25)',
  },
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px var(--space-3)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        letterSpacing: '0.04em',
        borderRadius: 'var(--radius-sm)',
        whiteSpace: 'nowrap',
        ...variantStyles[variant],
      }}
    >
      {children}
    </span>
  )
}
