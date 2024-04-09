import { Remesh } from 'remesh'
import { AsyncModule } from 'remesh/modules/async'
import { ToastModule } from './modules/Toast'
import { BrowserSyncStorageExtern } from '@/domain/externs/Storage'
import StorageEffect from '@/domain/modules/StorageEffect'
import { AccountLogin, type AccountLoginRequest } from '@/api'

export interface UserInfo {
  accessToken?: string
  phone?: string
  email?: string
}

export const STORAGE_KEY = 'USER_INFO' as const

const UserInfoDomain = Remesh.domain({
  name: 'UserInfoDomain',
  impl: (domain) => {
    const Toast = ToastModule(domain)
    const storageEffect = new StorageEffect({
      domain,
      extern: BrowserSyncStorageExtern,
      key: STORAGE_KEY
    })

    const AccountLoginAsyncModule = AsyncModule(domain, {
      name: 'AccountLoginAsyncModule',
      async load(context, arg: AccountLoginRequest) {
        return await AccountLogin(arg)
      },
      onSuccess({ get }, { data }) {
        return [UpdateUserInfoCommand(data), Toast.command.SuccessCommand('登录成功')]
      },
      onFailed() {
        return [Toast.command.ErrorCommand('登录失败')]
      }
    })

    const UserInfoState = domain.state<UserInfo>({
      name: 'UserInfo.UserInfoState',
      default: {}
    })

    const IsLoginQuery = domain.query({
      name: 'UserInfo.IsLoginQuery',
      impl: ({ get }) => {
        return !!get(UserInfoState()).accessToken
      }
    })

    const UserInfoQuery = domain.query({
      name: 'UserInfo.UserInfoQuery',
      impl: ({ get }) => {
        return get(UserInfoState())
      }
    })

    const UpdateUserInfoCommand = domain.command({
      name: 'UserInfo.UpdateUserInfoCommand',
      impl: (_, userInfo: UserInfo) => {
        return [UserInfoState().new(userInfo), UpdateUserInfoEvent(userInfo), SyncToStorageEvent(userInfo)]
      }
    })

    const UpdateUserInfoEvent = domain.event<UserInfo>({
      name: 'UserInfo.UpdateUserInfoEvent'
    })

    const SyncToStorageEvent = domain.event<UserInfo>({
      name: 'UserInfo.SyncToStorageEvent'
    })

    const SyncToStateEvent = domain.event<UserInfo>({
      name: 'UserInfo.SyncToStateEvent'
    })

    const SyncToStateCommand = domain.command({
      name: 'UserInfo.SyncToStateCommand',
      impl: (_, userInfo: UserInfo) => {
        return [UserInfoState().new(userInfo), UpdateUserInfoEvent(userInfo), SyncToStateEvent(userInfo)]
      }
    })

    const LoginEvent = domain.event<AccountLoginRequest>({
      name: 'LoginForm.LoginEvent'
    })

    const LoginCommand = domain.command({
      name: 'LoginForm.LoginCommand',
      impl: ({ get }, data: AccountLoginRequest) => {
        return [AccountLoginAsyncModule.command.LoadCommand(data), LoginEvent(data)]
      }
    })

    const LogoutEvent = domain.event({
      name: 'LoginForm.LogoutEvent'
    })

    const LogoutCommand = domain.command({
      name: 'LoginForm.LogoutCommand',
      impl: () => {
        return [UpdateUserInfoCommand({}), LogoutEvent(), Toast.command.InfoCommand('已退出登录')]
      }
    })

    storageEffect
      .set(SyncToStorageEvent)
      .get<UserInfo>((value) => SyncToStateCommand(value ?? {}))
      .watch<UserInfo>((value) => SyncToStateCommand(value ?? {}))

    return {
      query: {
        UserInfoQuery,
        IsLoginQuery,
        AsyncDataQuery: AccountLoginAsyncModule.query.AsyncDataQuery
      },
      command: {
        UpdateUserInfoCommand,
        LoginCommand,
        LogoutCommand
      },
      event: {
        LoginEvent,
        LogoutEvent,
        SyncToStateEvent,
        SyncToStorageEvent,
        UpdateUserInfoEvent
      }
    }
  }
})

export default UserInfoDomain
