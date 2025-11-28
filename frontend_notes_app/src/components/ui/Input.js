import Blits from '@lightningjs/blits'
import { theme } from '../../styles/theme.js'

// PUBLIC_INTERFACE
export default Blits.Component('UIInput', {
  props: {
    placeholder: { type: String, default: 'Search...' },
    value: { type: String, default: '' },
    w: { type: Number, default: 400 },
  },
  template: `
    <Element :w="$w" h="48" :color="theme.colors.surface" :effects="[$shader('radius',{radius:10})]">
      <Element ref="border" x="0" y="0" :w="$w" h="48" color="#00000000" :effects="[]" />
      <Text ref="txt" x="16" mount="{y:0.5}" y="50%" size="24" :color="$displayColor" :content="$displayText" />
    </Element>
  `,
  state() {
    return {
      internal: this.value,
      focused: false,
    }
  },
  computed: {
    displayText() {
      return this.internal || this.placeholder
    },
    displayColor() {
      return this.internal ? theme.colors.text : theme.colors.textMuted
    },
  },
  hooks: {
    ready() {
      this._updateBorder()
    },
  },
  methods: {
    _updateBorder() {
      const col = this.focused ? theme.colors.primary : theme.colors.border
      this.$select('border').color = col
    },
  },
  input: {
    focus() {
      this.focused = true
      this._updateBorder()
    },
    unfocus() {
      this.focused = false
      this._updateBorder()
    },
    // Capture text input
    key(e) {
      if (!this.focused) return
      if (e.key === 'Backspace') {
        this.internal = this.internal.slice(0, -1)
      } else if (e.key === 'Enter') {
        // noop
      } else if (e.key.length === 1) {
        this.internal += e.key
      }
      this.$emit('change', this.internal)
    },
  },
})
