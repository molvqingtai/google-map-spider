import { Remesh } from 'remesh'

export interface Toast {
  success: (message: string) => any
  error: (message: string) => any
  info: (message: string) => any
  warning: (message: string) => any
}

export const ToastExtern = Remesh.extern<Toast>({
  default: {
    success: () => {
      throw new Error('"success" not implemented.')
    },
    error: () => {
      throw new Error('"error" not implemented.')
    },
    info: () => {
      throw new Error('"info" not implemented.')
    },
    warning: () => {
      throw new Error('"warning" not implemented.')
    }
  }
})
