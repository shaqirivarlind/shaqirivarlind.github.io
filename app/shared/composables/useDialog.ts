import { reactive } from 'vue'
import { Dialog } from '~/shared/constants'
import type { DialogOptions, DialogState, ConfirmOptions, InfoOptions, UseDialogReturn } from '~/shared/types'
export { Dialog }

/** Provides an imperative Promise-based API for confirm and info dialogs. */

const dialogState = reactive<DialogState>({
  open: false,
  options: null,
  resolve: null,
})

function respondToDialog(value: boolean): void {
  dialogState.resolve?.(value)
  dialogState.open = false
  setTimeout(() => { dialogState.options = null }, 250)
}

export function useDialog(): UseDialogReturn {
  function show(options: ConfirmOptions): Promise<boolean>
  function show(options: InfoOptions): Promise<void>
  function show(options: DialogOptions): Promise<boolean | void> {
    return new Promise((resolve) => {
      dialogState.options = options
      dialogState.open = true
      dialogState.resolve = resolve as (value: boolean) => void
    })
  }

  return { show, Dialog, _state: dialogState, _respond: respondToDialog } as UseDialogReturn
}
