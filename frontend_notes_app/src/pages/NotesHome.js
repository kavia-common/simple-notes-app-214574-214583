import Blits from '@lightningjs/blits'
import NotesList from '../components/NotesList.js'
import NoteEditor from '../components/NoteEditor.js'
import UIPanel from '../components/ui/Panel.js'
import { theme } from '../styles/theme.js'
import { notesStore } from '../state/notesStore.js'

export default Blits.Component('NotesHome', {
  plugins: [notesStore],
  components: { NotesList, NoteEditor, UIPanel },
  template: `
    <Element w="1920" h="1080" :color="$bg">
      <Element w="1920" h="1080" color="{a:0}">
        <Element x="24" y="16" w="1872" h="60" color="{a:0}">
          <Text size="36" :color="$t.colors.text" content="Ocean Notes" />
          <Text x="300" y="6" size="22" :color="$t.colors.textMuted" content="A simple two-pane notes app" />
        </Element>
        <Element x="24" y="84" w="560" h="972">
          <UIPanel :w="560" :h="972">
            <NotesList
              :items="$notesStore.items"
              :selectedId="$notesStore.selectedId"
              :query="$notesStore.query"
              @search="$onSearch"
              @select="$onSelect"
              @add="$onAdd"
            />
          </UIPanel>
        </Element>
        <Element x="600" y="84" w="1296" h="972">
          <UIPanel :w="1296" :h="972">
            <Element x="0" y="0" w="1296" h="972" color="{a:0}">
              <Slot name="detail">
                <Element>
                  <Text x="24" y="24" size="26" :color="$t.colors.textMuted" content="Select a note from the left or create a new one." />
                </Element>
              </Slot>
            </Element>
          </UIPanel>
        </Element>
      </Element>
    </Element>
  `,
  state() {
    return {
      t: theme,
      bg: theme.colors.background,
    }
  },
  hooks: {
    async ready() {
      await this.$notesStore.init()
      this._renderDetail()
    },
    change() {
      this._renderDetail()
    },
    focus() {
      // focus left side search by default
      // no-op: components manage own focus on pointer interaction
    },
  },
  methods: {
    async $onSearch(val) {
      await this.$notesStore.setQuery(val)
      this._renderDetail()
    },
    $onSelect(id) {
      this.$notesStore.select(id)
      this._renderDetail()
    },
    async $onAdd() {
      await this.$notesStore.createNote()
      this._renderDetail()
    },
    async _onSave(id, data) {
      await this.$notesStore.saveNote(id, data)
      this._renderDetail()
    },
    async _onDelete(id) {
      await this.$notesStore.deleteNote(id)
      this._renderDetail()
    },
    _renderDetail() {
      const slot = this.$slot('detail')
      slot.children = []
      const note = this.$notesStore.items.find((n) => n.id === this.$notesStore.selectedId)
      if (!note) {
        slot.child({
          type: 'Element',
          children: [
            {
              type: 'Text',
              x: 24,
              y: 24,
              size: 26,
              color: this.t.colors.textMuted,
              content: this.$notesStore.items.length
                ? 'Select a note from the left.'
                : 'No notes yet. Click New to create one.',
            },
          ],
        })
        return
      }
      slot.child({
        type: 'NoteEditor',
        note,
        on: {
          save: (id, data) => this._onSave(id, data),
          delete: (id) => this._onDelete(id),
        },
      })
    },
  },
  input: {
    key(e) {
      // Keyboard shortcuts: Ctrl/Cmd+N, Ctrl/Cmd+S
      const cmd = e.metaKey || e.ctrlKey
      if (!cmd) return
      if (e.key.toLowerCase() === 'n') {
        this.$onAdd()
      } else if (e.key.toLowerCase() === 's') {
        const note = this.$notesStore.items.find((n) => n.id === this.$notesStore.selectedId)
        if (note) {
          // Save with current editor state by reusing rendered component state if available is complex;
          // here we trigger save with current stored note (no-op if unchanged). Edits in editor emit change on save.
          this._onSave(note.id, { title: note.title, content: note.content })
        }
      }
    },
  },
})
