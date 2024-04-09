const firstCall = (() => {
  let called = false
  let dependency: any = null
  return (dep?: any) => {
    if (dep !== undefined && dependency !== dep) {
      dependency = dep
      called = false // Reset called status if dependency changes
    }

    if (!called) {
      called = true
      return true
    } else {
      return false
    }
  }
})()

export default firstCall
