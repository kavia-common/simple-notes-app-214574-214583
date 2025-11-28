import Blits from '@lightningjs/blits'
import { NotesService } from '../services/NotesService.js'

// PUBLIC_INTERFACE
export const notesStore = Blits.Plugin('notesStore', {
  state() {
    return {
      items: [],
      selectedId: '',
      query: '',
      loading: false,
      error: '',
    }
  },
  methods: {
    async init() {
      this.service = new NotesService({})
      await this.service.init()
      await this.refresh()
      const first = this.items[0]
      if (first) this.selectedId = first.id
    },
    async refresh() {
      this.loading = true
      try {
        this.items = await this.service.list(this.query)
        this.error = ''
      } catch {
        this.error = 'Failed to load notes'
      } finally {
        this.loading = false
      }
    },
    async setQuery(q) {
      this.query = q
      await this.refresh()
    },
    async createNote() {
      const n = await this.service.create({ title: 'Untitled', content: '' })
      await this.refresh()
      this.selectedId = n.id
      return n
    },
    async saveNote(id, data) {
      const n = await this.service.update(id, data)
      await this.refresh()
      this.selectedId = id
      return n
    },
    async deleteNote(id) {
      await this.service.remove(id)
      await this.refresh()
      const first = this.items[0]
      this.selectedId = first ? first.id : ''
    },
    select(id) {
      this.selectedId = id
    },
  },
})
