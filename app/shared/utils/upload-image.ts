import type { UploadImageKind } from '~/shared/types'

export type UploadImageResult = { path: string }

export async function uploadImage(params: {
  file: File
  kind: UploadImageKind
}): Promise<UploadImageResult> {
  const form = new FormData()
  form.set('kind', params.kind)
  form.set('file', params.file)

  return await $fetch<UploadImageResult>('/api/upload-image', {
    method: 'POST',
    body: form,
  })
}

