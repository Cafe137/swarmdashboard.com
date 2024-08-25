import { CafeReactFsName } from './CafeReactFsName'
import { VirtualDirectory } from './CafeReactType'

interface Props {
    directory: VirtualDirectory
    enterDirectory: (name: string) => void
    backgroundColor?: string
}

export function CafeReactFsDirectory({ directory, enterDirectory, backgroundColor }: Props) {
    return (
        <div
            style={{
                width: '80px',
                height: '80px',
                position: 'relative',
                background: backgroundColor,
                borderRadius: '2px',
                cursor: 'pointer'
            }}
            onClick={() => enterDirectory(directory.name)}
        >
            <img
                src="data:image/svg+xml,%3Csvg%20clip-rule%3D%22evenodd%22%20fill-rule%3D%22evenodd%22%20height%3D%22512%22%20stroke-linejoin%3D%22round%22%20stroke-miterlimit%3D%222%22%20viewBox%3D%220%200%20138%20134%22%20width%3D%22512%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m71.969%2030.208-3.986-7.971c-2.666-5.332-8.111-8.695-14.066-8.695h-32.98c-8.683%200-15.729%207.039-15.729%2015.729v74.792c0%204.173%201.657%208.172%204.609%2011.124%202.947%202.947%206.946%204.605%2011.12%204.605h95.63c8.684%200%2015.725-7.039%2015.725-15.729v-58.125c0-8.691-7.041-15.73-15.725-15.73zm-7.877%207.538c.882%201.764%202.685%202.879%204.658%202.879h47.817c2.932%200%205.308%202.378%205.308%205.313v58.125c0%202.934-2.376%205.312-5.308%205.312h-95.63c-1.409%200-2.759-.559-3.754-1.554-.998-.997-1.558-2.348-1.558-3.758v-74.792c0-2.935%202.38-5.313%205.312-5.313h32.98c2.011%200%203.849%201.137%204.75%202.938%202.404%204.808%205.425%2010.85%205.425%2010.85z%22%2F%3E%3C%2Fsvg%3E"
                alt="Folder"
                style={{ width: '40px', height: '40px', position: 'absolute', left: '20px', top: '15px' }}
            />
            <CafeReactFsName name={directory.name} />
        </div>
    )
}
