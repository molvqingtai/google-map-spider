declare type SafeAny = any

declare interface ApiResponse<T = any> {
  /**  错误消息 */
  error?: {
    /** 状态码 */
    code: number
    /**  错误消息 */
    msg: string
  }
  /** 接口响应内容 */
  data: T
  /** 是否成功 */
  status: boolean
  /** 开放平台响应 **/
  success: boolean
}
