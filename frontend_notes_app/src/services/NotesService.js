/**
 * NotesService provides an API-like interface for notes CRUD.
 * It uses localStorage by default and can be switched to a backend via VITE_API_BASE.
 */
import { createNote, seedNotes } from '../types/note.js'

const STORAGE_KEY = 'notes_app_items_v1'

// PUBLIC_INTERFACE
export class NotesService {
  /**
   * Create a new NotesService
   * @param {{apiBase?: string}} options optional API base
   */
  constructor({ apiBase } = {}) {
    this.apiBase = (apiBase || import.meta.env.VITE_API_BASE || '').trim()
    this.hasApi = !!this.apiBase
  }

  /** Initialize storage; seed demo notes on first run. */
  async init() {
    const existing = this._readLocal()
    if (!existing || !Array.isArray(existing) || existing.length === 0) {
      this._writeLocal(seedNotes())
    }
    return true
  }

  // PUBLIC_INTERFACE
  async list(query = '') {
    /** List notes, optionally filtered by query (title/content) */
    // In future: if (this.hasApi) fetch(`${this.apiBase}/api/notes`)
    const items = this._readLocal()
    if (!query) return items.sort(sortByUpdated)
    const q = query.toLowerCase()
    return items
      .filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          (n.content || '').toLowerCase().includes(q)
      )
      .sort(sortByUpdated)
  }

  // PUBLIC_INTERFACE
  async get(id) {
    /** Get a note by id */
    const items = this._readLocal()
    return items.find((n) => n.id === id) || null
  }

  // PUBLIC_INTERFACE
  async create({ title = '', content = '' } = {}) {
    /** Create a new note */
    const note = createNote({ title, content })
    const items = this._readLocal()
    items.unshift(note)
    this._writeLocal(items)
    return note
  }

  // PUBLIC_INTERFACE
  async update(id, { title, content }) {
    /** Update an existing note */
    const items = this._readLocal()
    const idx = items.findIndex((n) => n.id === id)
    if (idx === -1) return null
    const updated = {
      ...items[idx],
      title: title ?? items[idx].title,
      content: content ?? items[idx].content,
      updatedAt: Date.now(),
    }
    items[idx] = updated
    this._writeLocal(items)
    return updated
  }

  // PUBLIC_INTERFACE
  async remove(id) {
    /** Delete a note by id */
    const items = this._readLocal()
    const next = items.filter((n) => n.id !== id)
    this._writeLocal(next)
    return true
  }

  _readLocal() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }
  _writeLocal(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore
    }
  }
}

function sortByUpdated(a, b) {
  return (b.updatedAt || 0) - (a.updatedAt || 0)
}
