import { useRef, useEffect, useState, memo, type ReactNode } from 'react'
import { Download } from 'lucide-react'
import Button from '@/components/Button'
import { convertSvgToImage } from '@/utils/common'

type Props = {
  children: ReactNode
  code?: string
}

async function loadMermaid(node: HTMLElement) {
  const { default: mermaid } = await import('mermaid')
  mermaid
    .run({
      nodes: [node],
      suppressErrors: true,
    })
    .catch((e) => {
      console.error('[Mermaid]: ', e.message)
    })
}

function Mermaid({ children, code }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (children && ref.current) {
      loadMermaid(ref.current)
    }
  }, [children])

  return (
    <div className="relative">
      <div className="absolute right-2 top-2 flex gap-1">
        <Button
          className="h-6 w-6 opacity-80"
          variant="outline"
          title="Download"
          size="icon"
          onClick={() => convertSvgToImage(ref.current?.childNodes[0])}
        >
          <Download />
        </Button>
      </div>
      <div
        className="flex cursor-pointer items-center justify-center overflow-auto bg-gray-200/50 dark:bg-[rgb(15,23,42)]"
        ref={ref}
      >
        {children}
      </div>
    </div>
  )
}

export default memo(Mermaid)
