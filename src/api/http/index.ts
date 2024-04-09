import Resreq, { type Options } from 'resreq'

export default class Http extends Resreq {
  constructor(options?: Options) {
    super({
      baseURL: 'https://api.example.com',
      responseType: 'json',
      throwHttpError: true,
      ...options
    })
  }
}
