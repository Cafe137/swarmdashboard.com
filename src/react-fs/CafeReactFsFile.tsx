import { Strings } from 'cafe-utility'
import { CafeReactFsName } from './CafeReactFsName'
import { VirtualFile } from './CafeReactType'

interface Props {
  path: string
  file: VirtualFile
  download: (path: string) => Promise<void>
  backgroundColor: string
}

export function CafeReactFsFile({ path, file, download, backgroundColor }: Props) {
  return (
    <div
      onClick={() => download(Strings.joinUrl(path, file.name))}
      style={{
        width: '80px',
        height: '80px',
        position: 'relative',
        background: backgroundColor,
        borderRadius: '2px',
        cursor: 'pointer',
      }}
    >
      <img
        src="data:image/svg+xml,%3Csvg%20clip-rule%3D%22evenodd%22%20fill-rule%3D%22evenodd%22%20height%3D%22512%22%20stroke-linejoin%3D%22round%22%20stroke-miterlimit%3D%222%22%20viewBox%3D%220%200%2033%2032%22%20width%3D%22512%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m29.102%207.91c-.045-.084-.1-.165-.167-.239l-.02-.023-.021-.021-.01-.011s-7-7-7-7l-.023-.022-.024-.022-.008-.007c-.074-.067-.155-.122-.239-.167-.176-.095-.377-.148-.59-.148h-16c-.69%200-1.25.56-1.25%201.25v29c0%20.69.56%201.25%201.25%201.25h23c.69%200%201.25-.56%201.25-1.25v-22c0-.213-.053-.414-.148-.59zm-9.352.59c0%20.69.56%201.25%201.25%201.25h5.75v19.5h-20.5v-26.5h13.5zm2.5-1.25h2.732l-2.732-2.732z%22%2F%3E%3C%2Fsvg%3E"
        alt="File"
        style={{ width: '32px', height: '32px', position: 'absolute', left: '24px', top: '19px' }}
      />

      <CafeReactFsName name={file.name} />
    </div>
  )
}
