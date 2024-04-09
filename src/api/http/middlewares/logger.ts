import { type Middleware } from 'resreq'

/** 日志中间件 */
const logger: Middleware = (next) => async (req) => {
  try {
    console.log('request:', req)
    const res = await next(req)
    console.log('response:', res)
    return res
  } catch (error) {
    console.log('error:', error)
    throw error
  }
}

export default logger
