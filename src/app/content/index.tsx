import { defineContentScript } from 'wxt/sandbox'
import { createShadowRootUi } from 'wxt/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RemeshRoot } from 'remesh-react'
import { Remesh } from 'remesh'
import { RemeshLogger } from 'remesh-logger'
import App from './App.tsx'

import { createElement, injectScript, wakeLock } from '@/utils'
import { ToastImpl } from '@/domain/impls/Toast.ts'
import { BrowserSyncStorageImpl, IndexDBStorageImpl } from '@/domain/impls/Storage'
import '@/assets/styles/tailwind.css'
import '@/assets/styles/sonner.css'

export default defineContentScript({
  matches: ['*://*.google.com/maps/*', '*://*.example.com/*'],
  cssInjectionMode: 'ui',
  runAt: 'document_end',
  async main(ctx) {
    injectScript('/injected.js')

    // websiteMessenger.onMessage('search-api-response', (data) => {
    //   console.log(data)
    //   parseSearchData(data.data)
    // })
    const store = Remesh.store({
      externs: [IndexDBStorageImpl, BrowserSyncStorageImpl, ToastImpl],
      inspectors: [RemeshLogger()]
    })
    const ui = await createShadowRootUi(ctx, {
      name: __NAME__,
      position: 'inline',
      anchor: 'body',
      mode: __DEV__ ? 'open' : 'closed',
      onMount: (container) => {
        wakeLock.lock()
        const app = createElement(`<div id="app"></div>`)
        container.append(app)
        const root = ReactDOM.createRoot(app)
        root.render(
          <React.StrictMode>
            <RemeshRoot store={store}>
              <App />
            </RemeshRoot>
          </React.StrictMode>
        )
        return root
      },
      onRemove: (root) => {
        wakeLock.unlock()
        root?.unmount()
      }
    })
    ui.mount()
  }
})
