import Blits from '@lightningjs/blits'
import NotesHome from './pages/NotesHome.js'

export default Blits.Application({
  template: `
    <Element>
      <RouterView />
    </Element>
  `,
  routes: [
    { path: '/', component: NotesHome },
    { path: '*', redirect: '/' },
  ],
  hooks: {
    ready() {
      // If something goes wrong, at least log to console to help diagnose
      try {
        // no-op; route will render NotesHome
      } catch (e) {
        // Display a minimal fallback text to avoid a blank screen
        this.$root.child({ type: 'Text', x: 20, y: 20, size: 28, color: '#EF4444', content: 'App init error' })
        // eslint-disable-next-line no-console
        console.error('App ready error', e)
      }
    },
  },
})
