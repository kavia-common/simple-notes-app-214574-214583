import Blits from '@lightningjs/blits'
import UIInput from './ui/Input.js'
import UIButton from './ui/Button.js'
import UIIcon from './ui/Icon.js'
import { theme } from '../styles/theme.js'
const $shader = (...args) => Blits.$shader ? Blits.$shader(...args) : (type, conf) => ({ type, conf })

// PUBLIC_INTERFACE
export default Blits.Component('NotesList', {
  props: {
    items: { type: Array, default: () => [] },
    selectedId: { type: String, default: '' },
    query: { type: String, default: '' },
  },
  components: { UIInput, UIButton, UIIcon },
  template: `
    <Element w="600" h="100%" :color="$t.colors.background">
      <Element x="16" y="16" w="568" h="56">
        <UIInput ref="search" :w="468" placeholder="Search notes..." :value="$query" @change="$onSearch" />
        <Element x="484" y="0">
          <UIButton ref="addBtn" label="New" :w="84" :h="48" variant="amber" @enter="$onAdd">
            <UIIcon name="plus" />
          </UIButton>
        </Element>
      </Element>
      <Element y="88" x="8" w="584" :h="100%-96">
        <Slot name="list">
          <Element>
            <Text x="12" y="12" size="22" :color="$t.colors.textMuted" content="No notes found." />
          </Element>
        </Slot>
      </Element>
    </Element>
  `,
  state() {
    return {
      t: theme,
    }
  },
  hooks: {
    ready() {
      this._renderList()
    },
    change() {
      this._renderList()
    },
  },
  methods: {
    _renderList() {
      const container = this.$slot('list')
      container.children = []
      if (!this.items || this.items.length === 0) {
        container.child({
          type: 'Element',
          w: 560,
          h: 80,
          children: [
            {
              type: 'Text',
              x: 12,
              y: 12,
              size: 22,
              color: this.t.colors.textMuted,
              content: this.query ? 'No notes match your search.' : 'No notes yet. Create a new one.',
            },
          ],
        })
        return
      }
      this.items.forEach((n, i) => {
        const isSel = n.id === this.selectedId
        container.child({
          type: 'Element',
          w: 560,
          h: 72,
          y: i * 76,
          color: isSel ? '#2563EB22' : '#00000000',
          effects: [$shader('radius', { radius: 10 })],
          children: [
            { type: 'Text', x: 16, y: 14, size: 26, color: this.t.colors.text, content: n.title || 'Untitled' },
            {
              type: 'Text',
              x: 16,
              y: 44,
              size: 18,
              color: this.t.colors.textMuted,
              content: new Date(n.updatedAt).toLocaleString(),
            },
          ],
          on: {
            enter: () => this.$emit('select', n.id),
            pointerdown: () => this.$emit('select', n.id),
          },
        })
      })
    },
    $onSearch(val) {
      this.$emit('search', val)
    },
    $onAdd() {
      this.$emit('add')
    },
  },
})
