import Blits from '@lightningjs/blits'
import UIInput from './ui/Input.js'
import UITextArea from './ui/TextArea.js'
import UIButton from './ui/Button.js'
import UIIcon from './ui/Icon.js'
import { theme } from '../styles/theme.js'

// PUBLIC_INTERFACE
export default Blits.Component('NoteEditor', {
  props: {
    note: { type: Object, default: null },
  },
  components: { UIInput, UITextArea, UIButton, UIIcon },
  template: `
    <Element w="100%" h="100%" color="{a:0}">
      <Element x="24" y="24" :alpha.transition="$alphaVal">
        <Text size="28" :color="$t.colors.textMuted" content="Details" />
      </Element>
      <Element x="24" y="64" w="1200" h="56">
        <UIInput ref="title" :w="900" placeholder="Title" :value="$title" @change="$onTitle" />
        <Element x="920" y="0">
          <UIButton variant="primary" :w="130" :h="48" label="Save" @enter="$onSave" />
        </Element>
        <Element x="1060" y="0">
          <UIButton variant="danger" :w="130" :h="48" label="Delete" @enter="$onDelete" />
        </Element>
      </Element>
      <Element x="24" y="132" w="1200" h="840">
        <UITextArea ref="content" :w="1200" :h="840" :value="$content" placeholder="Write your note..." @change="$onContent" />
      </Element>
      <Element x="24" y="1000" :alpha.transition="$hintAlpha">
        <Text size="20" :color="$t.colors.textMuted" content="Shortcuts: Ctrl/Cmd+N - New, Ctrl/Cmd+S - Save" />
      </Element>
    </Element>
  `,
  state() {
    return {
      t: theme,
      internal: this.note,
      title: this.note ? this.note.title : '',
      content: this.note ? this.note.content : '',
      alphaVal: 0,
      hintAlpha: 0.8,
    }
  },
  hooks: {
    ready() {
      this.alphaVal = 1
    },
    change() {
      // update on prop changes
      this.internal = this.note
      this.title = this.note ? this.note.title : ''
      this.content = this.note ? this.note.content : ''
    },
  },
  methods: {
    $onTitle(v) {
      this.title = v
    },
    $onContent(v) {
      this.content = v
    },
    $onSave() {
      if (!this.internal) return
      this.$emit('save', this.internal.id, { title: this.title, content: this.content })
    },
    $onDelete() {
      if (!this.internal) return
      this.$emit('delete', this.internal.id)
    },
  },
})
