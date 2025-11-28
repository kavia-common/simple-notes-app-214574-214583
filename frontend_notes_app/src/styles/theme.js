import Blits from '@lightningjs/blits'
const $shader = (...args) => Blits.$shader ? Blits.$shader(...args) : (type, conf) => ({ type, conf })

export const theme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    textMuted: '#6B7280',
    border: '#E5E7EB',
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 18,
  },
  shadow: {
    sm: { x: 0, y: 2, blur: 6, spread: 0, color: '#00000022' },
    md: { x: 0, y: 8, blur: 24, spread: 0, color: '#0000001a' },
  },
  spacing: (n = 1) => n * 8,
}

// PUBLIC_INTERFACE
export function cardEffects({ radius = 'md' } = {}) {
  /** Apply a rounded-corner effect for surfaces. */
  return [$shader('radius', { radius: theme.radius[radius] })]
}

// PUBLIC_INTERFACE
export function shadowEffect(level = 'sm') {
  /** A subtle drop shadow effect definition */
  const s = theme.shadow[level]
  return [$shader('drop-shadow', s)]
}

// PUBLIC_INTERFACE
export function gradientBg(alpha = 0.1) {
  /** Returns a soft gradient color object for Element color attr */
  return {
    left: `#2563EB${Math.round(alpha * 255).toString(16).padStart(2, '0')}`,
    right: '#f9fafb',
  }
}
