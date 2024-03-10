import { type FC, type ReactNode } from 'react'
import { cn } from '@/utils'

export interface DataPanelProps {
  className?: string
  children?: ReactNode
}

export const DataPanel: FC<DataPanelProps> = ({ className, children }) => {
  return (
    <div className={cn('bg-white rounded-xl w-[60vw] h-[80vh] mt-4 relative shadow shadow-slate-400', className)}>
      {children}
    </div>
  )
}

DataPanel.displayName = 'DataPanel'
