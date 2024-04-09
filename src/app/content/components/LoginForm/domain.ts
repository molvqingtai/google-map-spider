import { Remesh } from 'remesh'

import { AsyncModule } from 'remesh/modules/async'

import { AccountLogin, type LoginResponse, type AccountLoginRequest } from '@/api'
import { ToastModule } from '@/domain/modules/Toast'

export const LoginFormDomain = Remesh.domain({
  name: 'LoginFormDomain',
  impl: (domain) => {
    const Toast = ToastModule(domain)

    const SendAsyncModule = AsyncModule<AccountLoginRequest, LoginResponse>(domain, {
      name: 'PhoneLoginAsyncModule',
      async load(context, arg) {
        return await AccountLogin(arg)
      },
      onSuccess() {
        return [Toast.command.InfoCommand('送验证码已发送，请注意查收')]
      },
      onFailed() {
        return [Toast.command.ErrorCommand('验证码发送失败')]
      }
    })

    const sendEvent = domain.event<string>({
      name: 'LoginForm.sendEvent'
    })

    const sendCommand = domain.command({
      name: 'LoginForm.sendCommand',
      impl: ({ get }, code: string) => {
        // PhoneLoginAsyncModule.command.LoadCommand(code)
        return [sendEvent(code)]
      }
    })

    return {
      command: {
        sendCommand
      },
      event: {
        sendEvent
      }
    }
  }
})
