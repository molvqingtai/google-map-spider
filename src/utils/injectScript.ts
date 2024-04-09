import { type PublicPath, browser } from 'wxt/browser'
import createElement from './createElement'

const injectScript = (path: PublicPath) => {
  const src = browser.runtime.getURL(path)
  const script = createElement<HTMLScriptElement>(`<script src="${src}"></script>`)
  script.async = false
  script.defer = false
  document.documentElement.appendChild(script)
  document.documentElement.removeChild(script)
  return script
}

export default injectScript
