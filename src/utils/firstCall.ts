const firstCall = (() => {
  let called = false
  return () => {
    if (!called) {
      called = true
      return true
    } else {
      return false
    }
  }
})()

export default firstCall
