import { defineUnlistedScript } from 'wxt/sandbox'
import { BatchInterceptor } from '@mswjs/interceptors'
import { XMLHttpRequestInterceptor } from '@mswjs/interceptors/XMLHttpRequest'
import { websiteMessenger } from '@/messaging/websiteMessenger'

export default defineUnlistedScript({
  main() {
    const interceptor = new BatchInterceptor({
      name: 'search-interceptor',
      interceptors: [new XMLHttpRequestInterceptor()]
    })

    window.CSS.registerProperty({
      name: '--shimmer-angle',
      syntax: '<angle>',
      inherits: false,
      initialValue: '0deg'
    })

    interceptor.apply()

    interceptor.on('response', async ({ response, request }) => {
      const url = new URL(request.url)

      if (url.pathname === '/search') {
        const data = await response.text()
        websiteMessenger.sendMessage('search-api-response', data)
      }
    })
  }
})
