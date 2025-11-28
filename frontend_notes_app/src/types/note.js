/**
 * Note type definition used across the app.
 * @typedef {Object} Note
 * @property {string} id - Unique identifier (uuid-like)
 * @property {string} title - Note title
 * @property {string} content - Note markdown/plain content
 * @property {number} updatedAt - Epoch ms of last update
 */

// PUBLIC_INTERFACE
export function createNote({ title = '', content = '' } = {}) {
  /** Create a new Note with generated id and timestamp */
  const id = cryptoRandomId()
  const now = Date.now()
  return { id, title, content, updatedAt: now }
}

// PUBLIC_INTERFACE
export function cryptoRandomId() {
  /** Generate a short random id using crypto if available */
  try {
    const bytes = crypto.getRandomValues(new Uint8Array(8))
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  } catch {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
  }
}

// PUBLIC_INTERFACE
export function seedNotes() {
  /** Provide demo notes on first run */
  const now = Date.now()
  return [
    {
      id: cryptoRandomId(),
      title: 'Welcome to Notes',
      content:
        'This is your first note. Edit the title and content on the right. Press Ctrl/Cmd+S to save.',
      updatedAt: now,
    },
    {
      id: cryptoRandomId(),
      title: 'Shortcuts',
      content:
        '- Ctrl/Cmd+N: New note\n- Ctrl/Cmd+S: Save note\n\nUse the search box to filter notes.',
      updatedAt: now - 1000 * 60 * 15,
    },
  ]
}
