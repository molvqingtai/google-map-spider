import { defineExtensionMessaging } from '@webext-core/messaging'

interface ProtocolMap {
  'setup-popup-toggle': () => void
}

export const extensionMessenger = defineExtensionMessaging<ProtocolMap>()
