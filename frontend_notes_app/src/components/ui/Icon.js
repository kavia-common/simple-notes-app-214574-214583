import Blits from '@lightningjs/blits'
import { theme } from '../../styles/theme.js'

// PUBLIC_INTERFACE
export default Blits.Component('UIIcon', {
  props: {
    name: { type: String, default: 'plus' }, // plus, search, trash, save, note
    size: { type: Number, default: 24 },
    color: { type: String, default: theme.colors.text },
  },
  template: `
    <Element :w="$size" :h="$size" :color="{a:0}">
      <Text :content="$glyph" :color="$color" :size="$size" />
    </Element>
  `,
  computed: {
    glyph() {
      switch (this.name) {
        case 'plus':
          return '+'
        case 'search':
          return '⌕'
        case 'trash':
          return '🗑'
        case 'save':
          return '💾'
        case 'note':
          return '📝'
        default:
          return '⬤'
      }
    },
  },
})
