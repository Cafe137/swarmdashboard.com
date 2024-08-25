import { CafeReactFsDirectory } from './CafeReactFsDirectory'
import { CafeReactFsFile } from './CafeReactFsFile'
import { FsItem, isVirtualDirectory, isVirtualFile } from './CafeReactType'

interface Props {
    path: string
    item: FsItem
    download: (path: string) => Promise<void>
    enterDirectory: (name: string) => void
    backgroundColor: string
}

export function CafeReactFsItem({ path, item, download, enterDirectory, backgroundColor }: Props) {
    if (isVirtualFile(item)) {
        return <CafeReactFsFile path={path} file={item} download={download} backgroundColor={backgroundColor} />
    }
    if (isVirtualDirectory(item)) {
        return (
            <CafeReactFsDirectory directory={item} enterDirectory={enterDirectory} backgroundColor={backgroundColor} />
        )
    }
    return null
}
