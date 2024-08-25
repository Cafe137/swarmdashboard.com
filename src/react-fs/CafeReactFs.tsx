import { useEffect, useState } from 'react'
import { CafeReactFsItem } from './CafeReactFsItem'
import { CafeReactFsLoading } from './CafeReactFsLoading'
import { CafeReactFsPath } from './CafeReactFsPath'
import { CafeReactFsUpload } from './CafeReactFsUpload'
import { FsItem } from './CafeReactType'

const DEFAULT_BACKGROUND_COLOR = '#f0f0f0'

interface Props {
    download: (path: string) => Promise<void>
    list: (path: string) => Promise<FsItem[]>
    onUpload: (path: string) => Promise<void>
    reloader: number
    backgroundColor?: string
    rootAlias?: string
}

export function CafeReactFs({ download, list, onUpload, reloader, backgroundColor, rootAlias }: Props) {
    const [path, setPath] = useState('/')
    const [items, setItems] = useState<FsItem[]>([])
    const [loading, setLoading] = useState(false)

    function setItemsSorted(items: FsItem[]) {
        // directories first, all alphabetically
        const sortedItems = items.slice().sort((a, b) => {
            if (a.$type === b.$type) {
                return a.name.localeCompare(b.name)
            }
            return a.$type === 'directory' ? -1 : 1
        })
        setItems(sortedItems)
    }

    useEffect(() => {
        setLoading(true)
        list(path)
            .then(setItemsSorted)
            .finally(() => setLoading(false))
    }, [reloader])

    const pathParts = ['/', ...path.split('/').filter(x => x)]

    function jumpToDirectory(fullPath: string) {
        setPath(fullPath)
        setLoading(true)
        list(fullPath)
            .then(setItemsSorted)
            .finally(() => setLoading(false))
    }

    function enterDirectory(name: string) {
        const newPath = path.endsWith('/') ? `${path}${name}` : `${path}/${name}`
        setPath(newPath)
        setLoading(true)
        list(newPath)
            .then(setItemsSorted)
            .finally(() => setLoading(false))
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <CafeReactFsPath
                pathParts={pathParts}
                jumpToDirectory={jumpToDirectory}
                backgroundColor={backgroundColor ?? DEFAULT_BACKGROUND_COLOR}
                rootAlias={rootAlias}
            />
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '4px' }}>
                {loading && <CafeReactFsLoading backgroundColor={backgroundColor ?? DEFAULT_BACKGROUND_COLOR} />}
                {!loading &&
                    items.map(item => (
                        <CafeReactFsItem
                            key={item.id}
                            path={path}
                            item={item}
                            enterDirectory={enterDirectory}
                            download={download}
                            backgroundColor={backgroundColor ?? DEFAULT_BACKGROUND_COLOR}
                        />
                    ))}
                {!loading && (
                    <CafeReactFsUpload
                        onUpload={() => onUpload(path)}
                        backgroundColor={backgroundColor ?? DEFAULT_BACKGROUND_COLOR}
                    />
                )}
            </div>
        </div>
    )
}
