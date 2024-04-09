import { type FC } from 'react'
import { useRemeshDomain, useRemeshQuery } from 'remesh-react'

import { AnimationPresence } from '../AnimationPresence'

import { cn } from '@/utils'
import TaskDomain from '@/domain/Task'

export const MaskLayer: FC = () => {
  const taskDomain = useRemeshDomain(TaskDomain())
  const taskStatus = useRemeshQuery(taskDomain.query.StatusQuery())

  return (
    <AnimationPresence present={taskStatus === 'started'}>
      <div
        data-state={taskStatus === 'started' ? 'open' : 'closed'}
        className={cn(
          'fixed inset-0 z-infinity cursor-not-allowed bg-black opacity-10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
        )}
      ></div>
    </AnimationPresence>
  )
}

MaskLayer.displayName = 'MaskLayer'
