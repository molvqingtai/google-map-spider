import { Remesh } from 'remesh'

export interface DataPanelState {
  open: boolean
}

export const DataPanelDomain = Remesh.domain({
  name: 'DataPanelDomain',
  impl: (domain) => {
    const State = domain.state<DataPanelState>({
      name: 'DataPanel.State',
      default: {
        open: false
      }
    })

    const StateQuery = domain.query({
      name: 'DataPanel.StateQuery',
      impl: ({ get }) => {
        return get(State())
      }
    })

    const OpenEvent = domain.event<boolean>({
      name: 'DataPanel.OpenEvent'
    })

    const OpenCommand = domain.command({
      name: 'DataPanel.OpenCommand',
      impl: ({ get }) => {
        const state = get(StateQuery())
        if (state.open) return []
        const newState: DataPanelState = { ...state, open: true }
        return [State().new(newState), OpenEvent(newState.open), ToggleEvent(newState.open)]
      }
    })

    const CloseEvent = domain.event<boolean>({
      name: 'DataPanel.CloseEvent'
    })

    const CloseCommand = domain.command({
      name: 'DataPanel.CloseCommand',
      impl: ({ get }) => {
        const state = get(StateQuery())
        if (!state.open) return []
        const newState: DataPanelState = { ...state, open: false }
        return [State().new(newState), CloseEvent(newState.open), ToggleEvent(newState.open)]
      }
    })

    const ToggleEvent = domain.event<boolean>({
      name: 'DataPanel.ToggleEvent'
    })

    const ToggleCommand = domain.command({
      name: 'DataPanel.ToggleCommand',
      impl: ({ get }) => {
        const state = get(StateQuery())
        const newState: DataPanelState = { ...state, open: !state.open }
        return [newState.open ? OpenCommand() : CloseCommand()]
      }
    })

    return {
      query: {
        StateQuery
      },
      command: {
        OpenCommand,
        CloseCommand,
        ToggleCommand
      },
      event: {
        OpenEvent,
        CloseEvent,
        ToggleEvent
      }
    }
  }
})
