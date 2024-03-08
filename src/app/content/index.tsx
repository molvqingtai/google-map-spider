import { defineContentScript } from 'wxt/sandbox'
import { createShadowRootUi } from 'wxt/client'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    console.log('[example] Hello from content script')

    const ui = await createShadowRootUi(ctx, {
      name: 'example-ui',
      position: 'inline',
      anchor: 'body',
      append: 'first',
      onMount: (container) => {
        const root = ReactDOM.createRoot(container)
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
