import { createContext, ReactChild, ReactElement, useEffect, useState } from 'react'
import { PREVIEW_DIMENSIONS } from '../constants'
import { getMetadata } from '../utils/file'
import { resize } from '../utils/image'

export type UploadOrigin = { origin: 'UPLOAD' | 'FEED'; uuid?: string }

export const defaultUploadOrigin: UploadOrigin = { origin: 'UPLOAD' }

interface ContextInterface {
  files: FilePath[]
  setFiles: (files: FilePath[]) => void
  uploadOrigin: UploadOrigin
  setUploadOrigin: (uploadOrigin: UploadOrigin) => void
  metadata?: Metadata
  previewUri?: string
  previewBlob?: Blob
}

const initialValues: ContextInterface = {
  files: [],
  setFiles: () => {},
  uploadOrigin: defaultUploadOrigin,
  setUploadOrigin: () => {},
}

export const Context = createContext<ContextInterface>(initialValues)
export const Consumer = Context.Consumer

interface Props {
  children: ReactChild
}

export function Provider({ children }: Props): ReactElement {
  const [files, setFiles] = useState<FilePath[]>(initialValues.files)
  const [uploadOrigin, setUploadOrigin] = useState<UploadOrigin>(initialValues.uploadOrigin)
  const [metadata, setMetadata] = useState<Metadata | undefined>(undefined)
  const [previewUri, setPreviewUri] = useState<string | undefined>(undefined)
  const [previewBlob, setPreviewBlob] = useState<Blob | undefined>(undefined)

  useEffect(() => {
    setMetadata(getMetadata(files))

    if (previewUri) {
      URL.revokeObjectURL(previewUri) // Clear the preview from memory
      setPreviewUri(undefined)
      setPreviewBlob(undefined)
    }

    if (files.length !== 1 || !files[0].type.startsWith('image')) return

    resize(files[0], PREVIEW_DIMENSIONS.maxWidth, PREVIEW_DIMENSIONS.maxHeight).then(blob => {
      setPreviewUri(URL.createObjectURL(blob)) // NOTE: Until it is cleared with URL.revokeObjectURL, the file stays allocated in memory
      setPreviewBlob(blob)
    })

    return () => {
      if (previewUri) {
        URL.revokeObjectURL(previewUri)
      }
    }
  }, [files])

  return (
    <Context.Provider value={{ files, setFiles, uploadOrigin, setUploadOrigin, metadata, previewUri, previewBlob }}>
      {children}
    </Context.Provider>
  )
}
