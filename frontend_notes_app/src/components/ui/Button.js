import Blits from '@lightningjs/blits'
import { theme, cardEffects, shadowEffect } from '../../styles/theme.js'

// PUBLIC_INTERFACE
export default Blits.Component('UIButton', {
  props: {
    label: { type: String, default: 'Button' },
    variant: { type: String, default: 'primary' }, // primary, ghost, danger, amber
    w: { type: Number, default: 200 },
    h: { type: Number, default: 56 },
  },
  template: `
    <Element :w="$w" :h="$h" :color="$bgColor" :effects="$effects" :alpha.transition="$alphaVal">
      <Text ref="txt" x="20" mount="{y:0.5}" y="50%" size="28" :color="$txtColor" :content="$label" />
      <Element
        ref="hover"
        :w="$w" :h="$h" :alpha.transition="$hoverAlpha"
        color="{left: '#ffffff11', right:'#ffffff00'}"
        :effects="[]"
      />
    </Element>
  `,
  state() {
    return {
      alphaVal: 1,
      hoverAlpha: 0,
    }
  },
  computed: {
    bgColor() {
      switch (this.variant) {
        case 'ghost':
          return { a: 0 }
        case 'danger':
          return theme.colors.error
        case 'amber':
          return theme.colors.secondary
        default:
          return theme.colors.primary
      }
    },
    txtColor() {
      return this.variant === 'ghost' ? theme.colors.text : '#ffffff'
    },
    effects() {
      return this.variant === 'ghost'
        ? cardEffects({ radius: 'md' })
        : [...cardEffects({ radius: 'md' }), ...shadowEffect('sm')]
    },
  },
  input: {
    focus() {
      this.hoverAlpha = 0.15
    },
    unfocus() {
      this.hoverAlpha = 0
    },
    pointerover() {
      this.hoverAlpha = 0.15
    },
    pointerout() {
      this.hoverAlpha = 0
    },
  },
})
