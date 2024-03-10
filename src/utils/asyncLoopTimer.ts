const asyncLoopTimer = async <
  T,
  F extends () => T | Promise<T>,
  R = F extends () => Promise<T> ? T : F extends () => T ? T : never
>(
  func: F,
  timeout = Infinity
): Promise<R> => {
  return await new Promise<R>((resolve, reject) => {
    let requestID: number
    const startTime = performance.now()

    const timer = async (nowTime: number) => {
      try {
        cancelAnimationFrame(requestID)
        const data = await func()
        if (data || nowTime - startTime > timeout) {
          resolve(data as R)
        } else {
          requestID = requestAnimationFrame(timer)
        }
      } catch (error) {
        reject(error)
      }
    }

    requestID = requestAnimationFrame(timer)
  })
}

export default asyncLoopTimer
