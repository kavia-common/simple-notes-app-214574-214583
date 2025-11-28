# Ocean Notes (LightningJS + Blits)

A simple two-pane notes application with create, view, edit, and delete functionality.

## Quick start

Install dependencies and start the dev server (Vite):
```sh
npm install
npm run dev
```
Open the preview (port 3000).

## Features
- Two-pane layout: notes list with search + editor/detail pane
- CRUD operations stored in localStorage with demo seed notes on first run
- NotesService abstraction prepared for backend: uses `${import.meta.env.VITE_API_BASE || ''}/api/notes` in future
- Ocean Professional theme (primary #2563EB, amber accents #F59E0B, error #EF4444)
- Smooth hover/focus transitions and rounded corners
- Keyboard shortcuts: Ctrl/Cmd+N (new), Ctrl/Cmd+S (save)

## Environment variables
No variables are required. If VITE_API_BASE is provided, it will be used later when backend endpoints exist. The app gracefully falls back to local storage right now.

## Project structure
- src/styles/theme.js - theme tokens and effects
- src/types/note.js - Note type and seed helpers
- src/services/NotesService.js - storage + future API gateway
- src/state/notesStore.js - reactive store plugin
- src/components/ui/* - UI primitives (Button, Input, TextArea, Icon, Panel)
- src/components/NotesList.js - list + search and add button
- src/components/NoteEditor.js - edit title/content, save/delete
- src/pages/NotesHome.js - main screen
- src/App.js - router setup

## Notes
- Data persists in localStorage under key notes_app_items_v1.
- When a backend is available, implement HTTP calls in NotesService (list, get, create, update, remove) using VITE_API_BASE and keep local fallback for offline.

### Resources

- [Blits documentation](https://lightningjs.io/v3-docs/blits/getting_started/intro.html)
- [Blits Example App](https://blits-demo.lightningjs.io/?source=true)
- [Blits Components](https://lightningjs.io/blits-components.html)
