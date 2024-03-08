import { defineContentScript } from 'wxt/sandbox'
import { createShadowRootUi } from 'wxt/client'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/assets/styles/tailwind.css'

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    console.log('[example] Hello from content script')

    const ui = await createShadowRootUi(ctx, {
      name: __NAME__,
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        const app = document.createElement('div')
        container.append(app)
        const root = ReactDOM.createRoot(app)
        root.render(<App />)
        return root
      },
      onRemove: (root) => root?.unmount()
    })

    console.log('[example] Mounting UI...')
    ui.mount()
    console.log('[example] Done!')
  }
})
