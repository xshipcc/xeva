'use client'
import { useEffect, useRef } from 'react'

const lineCount = 3

export type AudioPulseProps = {
  volume: number
}

export default function AudioPulse({ volume }: AudioPulseProps) {
  const lines = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    let timeout: number | null = null
    const update = () => {
      lines.current.forEach((line, i) => (line.style.height = `${Math.min(24, 4 + volume * (i === 1 ? 400 : 60))}px`))
      timeout = window.setTimeout(update, 100)
    }

    update()

    return () => clearTimeout((timeout as number)!)
  }, [volume])

  return (
    <div className="group flex h-1 w-6 items-center justify-evenly transition-all duration-500 active:opacity-100">
      {Array(lineCount)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="min-h-1 w-1 rounded-full bg-white transition-all duration-100 group-hover:animate-[hover_1.4s_ease-in-out_infinite_alternate]"
            ref={(el) => {
              if (el) lines.current[i] = el
            }}
            style={{ animationDelay: `${i * 133}ms` }}
          />
        ))}
    </div>
  )
}
