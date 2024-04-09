import { browser } from 'wxt/browser'
import { defineBackground } from 'wxt/sandbox'
import { extensionMessenger } from '@/messaging'

export default defineBackground(() => {
  browser.action.onClicked.addListener(async () => {
    const [tab] = await browser.tabs.query({ active: true, lastFocusedWindow: true })
    extensionMessenger.sendMessage('setup-popup-toggle', undefined, tab.id)
  })
})
