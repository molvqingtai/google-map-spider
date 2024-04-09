import Http from '@/api/http'

const api = new Http()

export interface AccountLoginRequest {
  account: string
  password: string
}

export interface LoginResponse {
  code: number
  data: {
    accessToken: string
  }
}

export const AccountLogin = async (data: AccountLoginRequest) => {
  // return await api.post<LoginResponse>('/user/login', {
  //   body: data
  // })
  return await new Promise<LoginResponse>((resolve) => {
    setTimeout(
      () =>
        resolve({
          code: 200,
          data: {
            accessToken: '234234324234234'
          }
        }),
      1000
    )
  })
}

export interface PhoneLoginRequest {
  phone: string
  code: string
}

export const phoneLogin = async (data: PhoneLoginRequest) => {
  return await api.post<LoginResponse>('/user/phone/login', {
    body: data
  })
}
