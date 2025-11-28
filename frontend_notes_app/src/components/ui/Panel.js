import Blits from '@lightningjs/blits'
import { cardEffects, shadowEffect } from '../../styles/theme.js'

// PUBLIC_INTERFACE
export default Blits.Component('UIPanel', {
  props: {
    w: { type: Number, default: 600 },
    h: { type: Number, default: 400 },
  },
  template: `
    <Element :w="$w" :h="$h" :color="theme.colors.surface" :effects="[...cardEffects({radius:'lg'}), ...shadowEffect('sm')]">
      <Slot />
    </Element>
  `,
})
