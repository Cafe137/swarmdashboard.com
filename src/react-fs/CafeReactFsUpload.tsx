import { useState } from 'react'
import { CafeReactFsLoading } from './CafeReactFsLoading'

interface Props {
    onUpload: () => Promise<void>
    backgroundColor: string
}

export function CafeReactFsUpload({ onUpload, backgroundColor }: Props) {
    const [uploading, setUploading] = useState(false)

    function proxyUpload() {
        setUploading(true)
        onUpload().finally(() => setUploading(false))
    }

    if (uploading) {
        return <CafeReactFsLoading backgroundColor={backgroundColor} />
    }

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
            onClick={proxyUpload}
        >
            <img
                src="data:image/svg+xml,%3Csvg%20clip-rule%3D%22evenodd%22%20fill-rule%3D%22evenodd%22%20height%3D%22512%22%20stroke-linejoin%3D%22round%22%20stroke-miterlimit%3D%222%22%20viewBox%3D%220%200%2033%2032%22%20width%3D%22512%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m1.424%2018.363v6.79c0%202.092%201.696%203.789%203.79%203.789h22.572c2.094%200%203.79-1.697%203.79-3.789v-6.79c0-.69-.56-1.25-1.25-1.25s-1.25.56-1.25%201.25v6.79c0%20.712-.578%201.289-1.29%201.289h-22.572c-.712%200-1.29-.577-1.29-1.289v-6.79c0-.69-.56-1.25-1.25-1.25s-1.25.56-1.25%201.25zm15.076-14.613h-.03c-.115.003-.226.021-.331.053l-.004.001c-.19.058-.369.162-.519.312l-6.372%206.372c-.488.488-.488%201.28%200%201.768s1.28.488%201.768%200l4.238-4.238v11.982c0%20.69.56%201.25%201.25%201.25s1.25-.56%201.25-1.25v-11.982l4.238%204.238c.488.488%201.28.488%201.768%200s.488-1.28%200-1.768l-6.372-6.372c-.15-.15-.329-.254-.519-.312l-.004-.001c-.105-.032-.216-.05-.331-.053h-.023z%22%2F%3E%3C%2Fsvg%3E"
                alt="Upload"
                style={{ width: '32px', height: '32px', position: 'absolute', left: '24px', top: '19px' }}
            />
            <p
                style={{
                    margin: 0,
                    fontFamily: 'sans-serif',
                    fontSize: '12px',
                    textAlign: 'center',
                    width: '80px',
                    position: 'absolute',
                    bottom: '5px',
                    left: 0
                }}
            >
                Upload
            </p>
        </div>
    )
}
