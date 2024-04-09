import { Remesh } from 'remesh'
import { map, merge, tap } from 'rxjs'
import UserInfoDomain from '@/domain/UserInfo'

export interface ActiveTab {
  name: 'profile' | 'login' | 'register' | 'password'
  type?: 'change' | 'forgot'
}

export interface SetupPopupState {
  open: boolean
  activeTab: ActiveTab
}

export const SetupPopupDomain = Remesh.domain({
  name: 'SetupPopupDomain',
  impl: (domain) => {
    const userInfoDomain = domain.getDomain(UserInfoDomain())

    const State = domain.state<SetupPopupState>({
      name: 'SetupPopup.State',
      default: {
        open: false,
        activeTab: { name: 'login' }
      }
    })

    const StateQuery = domain.query({
      name: 'SetupPopup.StateQuery',
      impl: ({ get }) => {
        return get(State())
      }
    })

    const OpenEvent = domain.event<boolean>({
      name: 'SetupPopup.OpenEvent'
    })

    const OpenCommand = domain.command({
      name: 'SetupPopup.OpenCommand',
      impl: ({ get }) => {
        const state = get(StateQuery())
        if (state.open) return []
        const newState: SetupPopupState = { ...state, open: true }
        return [State().new(newState), OpenEvent(newState.open), ToggleEvent(newState.open)]
      }
    })

    const CloseEvent = domain.event<boolean>({
      name: 'SetupPopup.CloseEvent'
    })

    const CloseCommand = domain.command({
      name: 'SetupPopup.CloseCommand',
      impl: ({ get }) => {
        const state = get(StateQuery())
        if (!state.open) return []
        const newState: SetupPopupState = { ...state, open: false }
        return [State().new(newState), CloseEvent(newState.open), ToggleEvent(newState.open)]
      }
    })

    const ToggleEvent = domain.event<boolean>({
      name: 'SetupPopup.ToggleEvent'
    })

    const ToggleCommand = domain.command({
      name: 'SetupPopup.ToggleCommand',
      impl: ({ get }) => {
        const state = get(StateQuery())
        const newState: SetupPopupState = { ...state, open: !state.open }
        return [newState.open ? OpenCommand() : CloseCommand()]
      }
    })

    const SetTabActiveEvent = domain.event<ActiveTab>({
      name: 'SetupPopup.SetTabActiveEvent'
    })

    const SetTabActiveCommand = domain.command({
      name: 'SetupPopup.SetTabActiveCommand',
      impl: ({ get }, activeTab: ActiveTab) => {
        const state = get(StateQuery())
        const newState: SetupPopupState = { ...state, activeTab }
        return [State().new(newState), SetTabActiveEvent(activeTab)]
      }
    })

    domain.effect({
      name: 'NameEffect',
      impl: ({ get, fromEvent }) => {
        const updateUserInfoEvent$ = fromEvent(userInfoDomain.event.UpdateUserInfoEvent)
        return merge(updateUserInfoEvent$).pipe(
          map((userInfo) => {
            const name = userInfo.accessToken ? 'profile' : 'login'
            return SetTabActiveCommand({ name })
          })
        )
      }
    })

    return {
      query: {
        StateQuery
      },
      command: {
        OpenCommand,
        CloseCommand,
        ToggleCommand,
        SetTabActiveCommand
      },
      event: {
        OpenEvent,
        CloseEvent,
        ToggleEvent
      }
    }
  }
})
