import { defineCustomEventMessaging } from '@webext-core/messaging/page'

export interface WebsiteMessengerSchema {
  'search-api-response': (data: string) => void
}

export const websiteMessenger = defineCustomEventMessaging<WebsiteMessengerSchema>({
  namespace: btoa(__NAME__)
})
