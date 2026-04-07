import { reactive } from 'vue'
import type { DialogComponentOptions, DialogState, UseDialogReturn } from '~/shared/types'

const dialogState = reactive<DialogState>({
  open: false,
  options: null,
  resolve: null,
})

function finishDialog(value: unknown): void {
  dialogState.resolve?.(value)
  dialogState.open = false
  setTimeout(() => {
    dialogState.options = null
  }, 250)
}

export function useDialog(): UseDialogReturn {
  function showComponent<TResult = unknown>(
    options: DialogComponentOptions<TResult>,
  ): Promise<TResult | undefined> {
    return new Promise((resolve) => {
      dialogState.options = options
      dialogState.open = true
      dialogState.resolve = resolve as (value: unknown) => void
    }) as Promise<TResult | undefined>
  }

  return { showComponent, _state: dialogState, _finish: finishDialog } as UseDialogReturn
}
