import { type Middleware } from 'resreq'

const setToken: Middleware = (next) => async (req) => {
  req.headers.set('Access-Token', '')
  return await next(req)
}
export default setToken
