import Blits from '@lightningjs/blits'
import { theme } from '../../styles/theme.js'

const $shader = (...args) => (Blits.$shader ? Blits.$shader(...args) : (type, conf) => ({ type, conf }))

// PUBLIC_INTERFACE
export default Blits.Component('UITextArea', {
  props: {
    value: { type: String, default: '' },
    w: { type: Number, default: 900 },
    h: { type: Number, default: 600 },
    placeholder: { type: String, default: 'Write your note...' },
  },
  template: `
    <Element :w="$w" :h="$h" :color="$t.colors.surface" :effects="$radiusEffects">
      <Text ref="content" x="16" y="16" :maxwidth="$w - 32" :maxheight="$h - 32" size="26" lineheight="36" :color="$txtColor" :content="$display" />
    </Element>
  `,
  state() {
    return {
      t: theme,
      internal: this.value,
      focused: false,
    }
  },
  computed: {
    display() {
      return this.internal || this.placeholder
    },
    txtColor() {
      return this.internal ? this.t.colors.text : this.t.colors.textMuted
    },
    radiusEffects() {
      return [$shader('radius', { radius: 10 })]
    },
  },
  hooks: {
    ready() {
      // nothing
    },
  },
  input: {
    focus() {
      this.focused = true
    },
    unfocus() {
      this.focused = false
    },
    key(e) {
      if (!this.focused) return
      if (e.key === 'Backspace') {
        this.internal = this.internal.slice(0, -1)
      } else if (e.key === 'Enter') {
        this.internal += '\n'
      } else if (e.key.length === 1) {
        this.internal += e.key
      }
      this.$emit('change', this.internal)
    },
  },
})
