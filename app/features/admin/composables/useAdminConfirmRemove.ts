import { Dialog } from '~/shared/constants'

type RemoveKind = 'position' | 'project' | 'client'

const KIND_LABEL: Record<RemoveKind, string> = {
  position: 'position',
  project: 'project',
  client: 'client',
}

/** Reuses shared confirm dialog for removing nested form blocks (positions, projects, clients). */
export function useAdminConfirmRemove() {
  async function confirmRemove(kind: RemoveKind, shortDetails: string): Promise<boolean> {
    const { show } = useDialog()
    const detail = shortDetails.trim() || '(unnamed)'
    return show({
      type:         Dialog.CONFIRM,
      title:        `Are you sure you want to remove this ${KIND_LABEL[kind]}?`,
      message:      `${detail}. Unsaved data in this block will be lost.`,
      confirmLabel: 'Remove',
    })
  }

  return { confirmRemove }
}
