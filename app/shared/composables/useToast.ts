import { reactive } from 'vue'

type ToastState = {
  open: boolean
  message: string
  color?: string
  timeout: number
}

const state = reactive<ToastState>({
  open: false,
  message: '',
  color: undefined,
  timeout: 2500,
})

export function useToast() {
  function show(message: string, opts?: { color?: string; timeout?: number }) {
    state.message = message
    state.color = opts?.color
    state.timeout = opts?.timeout ?? 2500
    state.open = true
  }

  function info(message: string, opts?: { timeout?: number }) {
    show(message, { color: 'info', timeout: opts?.timeout })
  }

  function success(message: string, opts?: { timeout?: number }) {
    show(message, { color: 'success', timeout: opts?.timeout })
  }

  function error(message: string, opts?: { timeout?: number }) {
    show(message, { color: 'error', timeout: opts?.timeout ?? 4500 })
  }

  function hide() {
    state.open = false
  }

  return { show, info, success, error, hide, _state: state }
}

