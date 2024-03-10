import { useState, type FC, type MouseEvent } from 'react'
import { PlayIcon, PauseIcon, ChevronsUpDownIcon, ChevronsDownUpIcon } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utils'

export interface ToolBarProps {
  count?: number
  isRunning?: boolean
  isOpen?: boolean
  onStart?: (e: MouseEvent<HTMLButtonElement>) => void
  onStop?: (e: MouseEvent<HTMLButtonElement>) => void
  onOpen?: (e: MouseEvent<HTMLButtonElement>) => void
  onClose?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const Toolbar: FC<ToolBarProps> = ({ count, onStart, onStop, onOpen, onClose, isRunning, isOpen }) => {
  const handleStart = (e: MouseEvent<HTMLButtonElement>) => {
    onStart?.(e)
  }

  const handleStop = (e: MouseEvent<HTMLButtonElement>) => {
    onStop?.(e)
  }

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    onOpen?.(e)
  }
  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    onClose?.(e)
  }

  return (
    <div className="z-10 flex gap-x-5 rounded-full bg-white px-6 py-3 shadow shadow-slate-400">
      <Button size="icon" className="shrink-0" variant="outline" onClick={isRunning ? handleStop : handleStart}>
        {isRunning ? <PauseIcon className="size-4"></PauseIcon> : <PlayIcon className="size-4"></PlayIcon>}
      </Button>
      <Badge
        variant="secondary"
        className={cn('min-w-32 justify-center text-slate-600', isRunning && 'bg-green-50 text-green-500')}
      >
        {count ? `已抓取 ${count} 条数据` : `未开始`}
      </Badge>
      <Button size="icon" className="shrink-0" variant="outline" onClick={isOpen ? handleClose : handleOpen}>
        {isOpen ? (
          <ChevronsDownUpIcon className="size-4"></ChevronsDownUpIcon>
        ) : (
          <ChevronsUpDownIcon className="size-4"></ChevronsUpDownIcon>
        )}
      </Button>
    </div>
  )
}

Toolbar.displayName = 'Toolbar'
