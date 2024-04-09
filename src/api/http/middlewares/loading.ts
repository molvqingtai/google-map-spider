import { type Middleware } from 'resreq'

/** Loading 提示 */
const loading: Middleware = (next) => async (req) => {
  const showLoading = req.meta.showLoading as boolean
  const loadingMessage = req.meta.loadingMessage

  try {
    return await next(req)
  } finally {
    // toastInstance && toastInstance.close()
  }
}

export default loading
