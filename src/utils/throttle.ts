type ThrottledFunction<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void

const throttle = <T extends (...args: any[]) => void>(func: T, timeFrame: number): ThrottledFunction<T> => {
  let lastTime = 0

  return function (...args: Parameters<T>) {
    const now = new Date()

    if (now.getTime() - lastTime >= timeFrame) {
      func(...args)
      lastTime = now.getTime()
    }
  }
}

export default throttle
