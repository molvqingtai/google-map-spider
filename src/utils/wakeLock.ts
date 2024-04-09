let wakeLock: WakeLockSentinel | null = null

const relock = () => {
  if (document.visibilityState === 'visible') {
    lock()
  }
}

export const lock = async () => {
  try {
    if (wakeLock === null) {
      wakeLock = await navigator.wakeLock.request('screen')
      wakeLock.addEventListener('release', () => {
        wakeLock = null
        console.log(1)
      })
      document.addEventListener('visibilitychange', relock)
    }
  } catch (error: SafeAny) {
    console.info('Could not acquire wake lock:', error.message)
  }
}

export const unlock = async () => {
  try {
    if (wakeLock !== null) {
      await wakeLock.release()
      wakeLock = null
      document.removeEventListener('visibilitychange', relock)
    }
  } catch (error: SafeAny) {
    console.info('Could not release wake lock:', error.message)
  }
}
