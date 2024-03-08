import { defineContentScript } from 'wxt/sandbox'
import { createShadowRootUi } from 'wxt/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/assets/styles/tailwind.css'
import { createElement } from '@/utils/index.ts'

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: __NAME__,
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        const app = createElement(`<div id="app"></div>`)
        container.append(app)
        const root = ReactDOM.createRoot(app)
        root.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>
        )
        return root
      },
      onRemove: (root) => root?.unmount()
    })
    ui.mount()
  }
})
