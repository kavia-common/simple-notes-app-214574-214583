import Blits from '@lightningjs/blits'
import { theme, cardEffects, shadowEffect } from '../../styles/theme.js'

// PUBLIC_INTERFACE
export default Blits.Component('UIPanel', {
  props: {
    w: { type: Number, default: 600 },
    h: { type: Number, default: 400 },
  },
  template: `
    <Element :w="$w" :h="$h" :color="$surface" :effects="$panelEffects">
      <Slot />
    </Element>
  `,
  state() {
    return {
      t: theme,
    }
  },
  computed: {
    surface() {
      return this.t.colors.surface
    },
    panelEffects() {
      // Precompute effects so template binds to a concrete array
      return [...cardEffects({ radius: 'lg' }), ...shadowEffect('sm')]
    },
  },
})
