import { type Middleware } from 'resreq'

/**
 * 响应错误处理
 */
const error: Middleware = (next) => async (req) => {
  // const showError: boolean = req.meta.showError
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await next(req)
    const { status, success, error }: ApiResponse = await res.clone().json()
    if (status || success) {
      return res
    } else {
      throw new Error(error?.msg ?? '未知错误')
    }
  } catch (error) {
    // showError && Toast.error((error as any).message)
    throw error
  }
}

export default error
