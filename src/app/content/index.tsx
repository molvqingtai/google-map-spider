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
  matches: [
    '*://*.google.com/*',
    '*://*.google.com.hk/*',
    '*://*.google.mn/*',
    '*://*.google.co.kr/*',
    '*://*.google.co.jp/*',
    '*://*.google.com.vn/*',
    '*://*.google.la/*',
    '*://*.google.com.kh/*',
    '*://*.google.co.th/*',
    '*://*.google.com.my/*',
    '*://*.google.com.sg/*',
    '*://*.google.com.bn/*',
    '*://*.google.com.ph/*',
    '*://*.google.co.id/*',
    '*://*.google.tp/*',
    '*://*.google.kz/*',
    '*://*.google.kg/*',
    '*://*.google.com.tj/*',
    '*://*.google.co.uz/*',
    '*://*.google.tm/*',
    '*://*.google.com.af/*',
    '*://*.google.com.pk/*',
    '*://*.google.com.np/*',
    '*://*.google.co.in/*',
    '*://*.google.com.bd/*',
    '*://*.google.lk/*',
    '*://*.google.mv/*',
    '*://*.google.com.kw/*',
    '*://*.google.com.sa/*',
    '*://*.google.com.bh/*',
    '*://*.google.ae/*',
    '*://*.google.com.om/*',
    '*://*.google.jo/*',
    '*://*.google.co.il/*',
    '*://*.google.com.lb/*',
    '*://*.google.com.tr/*',
    '*://*.google.az/*',
    '*://*.google.am/*',
    '*://*.google.co.ls/*',
    '*://*.google.is/*',
    '*://*.google.dk/*',
    '*://*.google.no/*',
    '*://*.google.se/*',
    '*://*.google.fi/*',
    '*://*.google.ee/*',
    '*://*.google.lv/*',
    '*://*.google.lt/*',
    '*://*.google.ie/*',
    '*://*.google.co.uk/*',
    '*://*.google.gg/*',
    '*://*.google.je/*',
    '*://*.google.im/*',
    '*://*.google.fr/*',
    '*://*.google.nl/*',
    '*://*.google.be/*',
    '*://*.google.lu/*',
    '*://*.google.de/*',
    '*://*.google.at/*',
    '*://*.google.ch/*',
    '*://*.google.li/*',
    '*://*.google.pt/*',
    '*://*.google.es/*',
    '*://*.google.com.gi/*',
    '*://*.google.ad/*',
    '*://*.google.it/*',
    '*://*.google.com.mt/*',
    '*://*.google.sm/*',
    '*://*.google.gr/*',
    '*://*.google.ru/*',
    '*://*.google.com.by/*',
    '*://*.google.com.ua/*',
    '*://*.google.pl/*',
    '*://*.google.cz/*',
    '*://*.google.sk/*',
    '*://*.google.hu/*',
    '*://*.google.si/*',
    '*://*.google.hr/*',
    '*://*.google.ba/*',
    '*://*.google.me/*',
    '*://*.google.rs/*',
    '*://*.google.mk/*',
    '*://*.google.bg/*',
    '*://*.google.ro/*',
    '*://*.google.md/*',
    '*://*.google.com.au/*',
    '*://*.google.com.nf/*',
    '*://*.google.co.nz/*',
    '*://*.google.com.sb/*',
    '*://*.google.com.fj/*',
    '*://*.google.fm/*',
    '*://*.google.ki/*',
    '*://*.google.nr/*',
    '*://*.google.tk/*',
    '*://*.google.ws/*',
    '*://*.google.as/*',
    '*://*.google.to/*',
    '*://*.google.nu/*',
    '*://*.google.co.ck/*',
    '*://*.google.com.do/*',
    '*://*.google.tt/*',
    '*://*.google.com.co/*',
    '*://*.google.com.ec/*',
    '*://*.google.co.ve/*',
    '*://*.google.gy/*',
    '*://*.google.com.pe/*',
    '*://*.google.com.bo/*',
    '*://*.google.com.py/*',
    '*://*.google.com.br/*',
    '*://*.google.com.uy/*',
    '*://*.google.com.ar/*',
    '*://*.google.cl/*',
    '*://*.google.gl/*',
    '*://*.google.com/*',
    '*://*.google.com.mx/*',
    '*://*.google.com.gt/*',
    '*://*.google.com.bz/*',
    '*://*.google.com.sv/*',
    '*://*.google.hn/*',
    '*://*.google.com.ni/*',
    '*://*.google.co.cr/*',
    '*://*.google.com.pa/*',
    '*://*.google.bs/*',
    '*://*.google.com.cu/*',
    '*://*.google.com.jm/*',
    '*://*.google.ht/*',
    '*://*.google.com.eg/*',
    '*://*.google.com.ly/*',
    '*://*.google.dz/*',
    '*://*.google.co.ma/*',
    '*://*.google.sn/*',
    '*://*.google.gm/*',
    '*://*.google.ml/*',
    '*://*.google.bf/*',
    '*://*.google.com.sl/*',
    '*://*.google.ci/*',
    '*://*.google.com.gh/*',
    '*://*.google.tg/*',
    '*://*.google.bj/*',
    '*://*.google.ne/*',
    '*://*.google.com.ng/*',
    '*://*.google.sh/*',
    '*://*.google.cm/*',
    '*://*.google.td/*',
    '*://*.google.cf/*',
    '*://*.google.ga/*',
    '*://*.google.cg/*',
    '*://*.google.cd/*',
    '*://*.google.it.ao/*',
    '*://*.google.com.et/*',
    '*://*.google.dj/*',
    '*://*.google.co.ke/*',
    '*://*.google.co.ug/*',
    '*://*.google.co.tz/*',
    '*://*.google.rw/*',
    '*://*.google.bi/*',
    '*://*.google.mw/*',
    '*://*.google.co.mz/*',
    '*://*.google.mg/*',
    '*://*.google.sc/*',
    '*://*.google.mu/*',
    '*://*.google.co.zm/*',
    '*://*.google.co.zw/*',
    '*://*.google.co.bw/*',
    '*://*.google.com.na/*',
    '*://*.google.co.za/*',

    '*://*.example.com/*'
  ],
  cssInjectionMode: 'ui',
  runAt: 'document_end',
  async main(ctx) {
    injectScript('/injected.js')
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
