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
    '*://*.google.com/maps/*',
    '*://*.google.com.hk/maps/*',
    '*://*.google.mn/maps/*',
    '*://*.google.co.kr/maps/*',
    '*://*.google.co.jp/maps/*',
    '*://*.google.com.vn/maps/*',
    '*://*.google.la/maps/*',
    '*://*.google.com.kh/maps/*',
    '*://*.google.co.th/maps/*',
    '*://*.google.com.my/maps/*',
    '*://*.google.com.sg/maps/*',
    '*://*.google.com.bn/maps/*',
    '*://*.google.com.ph/maps/*',
    '*://*.google.co.id/maps/*',
    '*://*.google.tp/maps/*',
    '*://*.google.kz/maps/*',
    '*://*.google.kg/maps/*',
    '*://*.google.com.tj/maps/*',
    '*://*.google.co.uz/maps/*',
    '*://*.google.tm/maps/*',
    '*://*.google.com.af/maps/*',
    '*://*.google.com.pk/maps/*',
    '*://*.google.com.np/maps/*',
    '*://*.google.co.in/maps/*',
    '*://*.google.com.bd/maps/*',
    '*://*.google.lk/maps/*',
    '*://*.google.mv/maps/*',
    '*://*.google.com.kw/maps/*',
    '*://*.google.com.sa/maps/*',
    '*://*.google.com.bh/maps/*',
    '*://*.google.ae/maps/*',
    '*://*.google.com.om/maps/*',
    '*://*.google.jo/maps/*',
    '*://*.google.co.il/maps/*',
    '*://*.google.com.lb/maps/*',
    '*://*.google.com.tr/maps/*',
    '*://*.google.az/maps/*',
    '*://*.google.am/maps/*',
    '*://*.google.co.ls/maps/*',
    '*://*.google.is/maps/*',
    '*://*.google.dk/maps/*',
    '*://*.google.no/maps/*',
    '*://*.google.se/maps/*',
    '*://*.google.fi/maps/*',
    '*://*.google.ee/maps/*',
    '*://*.google.lv/maps/*',
    '*://*.google.lt/maps/*',
    '*://*.google.ie/maps/*',
    '*://*.google.co.uk/maps/*',
    '*://*.google.gg/maps/*',
    '*://*.google.je/maps/*',
    '*://*.google.im/maps/*',
    '*://*.google.fr/maps/*',
    '*://*.google.nl/maps/*',
    '*://*.google.be/maps/*',
    '*://*.google.lu/maps/*',
    '*://*.google.de/maps/*',
    '*://*.google.at/maps/*',
    '*://*.google.ch/maps/*',
    '*://*.google.li/maps/*',
    '*://*.google.pt/maps/*',
    '*://*.google.es/maps/*',
    '*://*.google.com.gi/maps/*',
    '*://*.google.ad/maps/*',
    '*://*.google.it/maps/*',
    '*://*.google.com.mt/maps/*',
    '*://*.google.sm/maps/*',
    '*://*.google.gr/maps/*',
    '*://*.google.ru/maps/*',
    '*://*.google.com.by/maps/*',
    '*://*.google.com.ua/maps/*',
    '*://*.google.pl/maps/*',
    '*://*.google.cz/maps/*',
    '*://*.google.sk/maps/*',
    '*://*.google.hu/maps/*',
    '*://*.google.si/maps/*',
    '*://*.google.hr/maps/*',
    '*://*.google.ba/maps/*',
    '*://*.google.me/maps/*',
    '*://*.google.rs/maps/*',
    '*://*.google.mk/maps/*',
    '*://*.google.bg/maps/*',
    '*://*.google.ro/maps/*',
    '*://*.google.md/maps/*',
    '*://*.google.com.au/maps/*',
    '*://*.google.com.nf/maps/*',
    '*://*.google.co.nz/maps/*',
    '*://*.google.com.sb/maps/*',
    '*://*.google.com.fj/maps/*',
    '*://*.google.fm/maps/*',
    '*://*.google.ki/maps/*',
    '*://*.google.nr/maps/*',
    '*://*.google.tk/maps/*',
    '*://*.google.ws/maps/*',
    '*://*.google.as/maps/*',
    '*://*.google.to/maps/*',
    '*://*.google.nu/maps/*',
    '*://*.google.co.ck/maps/*',
    '*://*.google.com.do/maps/*',
    '*://*.google.tt/maps/*',
    '*://*.google.com.co/maps/*',
    '*://*.google.com.ec/maps/*',
    '*://*.google.co.ve/maps/*',
    '*://*.google.gy/maps/*',
    '*://*.google.com.pe/maps/*',
    '*://*.google.com.bo/maps/*',
    '*://*.google.com.py/maps/*',
    '*://*.google.com.br/maps/*',
    '*://*.google.com.uy/maps/*',
    '*://*.google.com.ar/maps/*',
    '*://*.google.cl/maps/*',
    '*://*.google.gl/maps/*',
    '*://*.google.com/maps/*',
    '*://*.google.com.mx/maps/*',
    '*://*.google.com.gt/maps/*',
    '*://*.google.com.bz/maps/*',
    '*://*.google.com.sv/maps/*',
    '*://*.google.hn/maps/*',
    '*://*.google.com.ni/maps/*',
    '*://*.google.co.cr/maps/*',
    '*://*.google.com.pa/maps/*',
    '*://*.google.bs/maps/*',
    '*://*.google.com.cu/maps/*',
    '*://*.google.com.jm/maps/*',
    '*://*.google.ht/maps/*',
    '*://*.google.com.eg/maps/*',
    '*://*.google.com.ly/maps/*',
    '*://*.google.dz/maps/*',
    '*://*.google.co.ma/maps/*',
    '*://*.google.sn/maps/*',
    '*://*.google.gm/maps/*',
    '*://*.google.ml/maps/*',
    '*://*.google.bf/maps/*',
    '*://*.google.com.sl/maps/*',
    '*://*.google.ci/maps/*',
    '*://*.google.com.gh/maps/*',
    '*://*.google.tg/maps/*',
    '*://*.google.bj/maps/*',
    '*://*.google.ne/maps/*',
    '*://*.google.com.ng/maps/*',
    '*://*.google.sh/maps/*',
    '*://*.google.cm/maps/*',
    '*://*.google.td/maps/*',
    '*://*.google.cf/maps/*',
    '*://*.google.ga/maps/*',
    '*://*.google.cg/maps/*',
    '*://*.google.cd/maps/*',
    '*://*.google.it.ao/maps/*',
    '*://*.google.com.et/maps/*',
    '*://*.google.dj/maps/*',
    '*://*.google.co.ke/maps/*',
    '*://*.google.co.ug/maps/*',
    '*://*.google.co.tz/maps/*',
    '*://*.google.rw/maps/*',
    '*://*.google.bi/maps/*',
    '*://*.google.mw/maps/*',
    '*://*.google.co.mz/maps/*',
    '*://*.google.mg/maps/*',
    '*://*.google.sc/maps/*',
    '*://*.google.mu/maps/*',
    '*://*.google.co.zm/maps/*',
    '*://*.google.co.zw/maps/*',
    '*://*.google.co.bw/maps/*',
    '*://*.google.com.na/maps/*',
    '*://*.google.co.za/maps/*',

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
