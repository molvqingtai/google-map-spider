import { cn } from '@/utils'

export const LogPanel = () => {
  return (
    <div
      className={cn(
        'bg-white z-infinity fixed mx-auto inset-x-1 top-24 rounded-xl w-[60vw] h-[80vh] shadow shadow-slate-400 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
      )}
    ></div>
  )
}
