import { PlayIcon, PauseIcon, ChevronsUpDownIcon, ChevronsDownUpIcon } from 'lucide-react'

import { useRemeshDomain, useRemeshQuery, useRemeshSend } from 'remesh-react'
import { DataPanelDomain } from '../DataPanel/domain'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utils'
import { Toggle } from '@/components/ui/Toggle'
import TaskDomain from '@/domain/Task'

export const Toolbar = () => {
  const send = useRemeshSend()
  const taskDomain = useRemeshDomain(TaskDomain())
  const dataTableDomain = useRemeshDomain(DataPanelDomain())
  const taskStatus = useRemeshQuery(taskDomain.query.StatusQuery())

  const dataTableState = useRemeshQuery(dataTableDomain.query.StateQuery())

  const handleRun = () => {
    if (taskStatus === 'stopped') {
      send(taskDomain.command.StartCommand())
    }
    if (taskStatus === 'started') {
      send(taskDomain.command.PauseCommand())
    }
    if (taskStatus === 'paused') {
      send(taskDomain.command.StartCommand())
    }
  }

  const statusTextMap = {
    stopped: '未开始',
    started: '进行中',
    paused: '已暂停'
  }

  const handleDataPanelToggle = () => {
    send(dataTableDomain.command.ToggleCommand())
  }

  return (
    <div
      className={cn(
        'fixed inset-x-1 top-3 z-infinity mx-auto flex w-fit  p-1 shadow shadow-slate-400 rounded-full bg-slate-100',
        (taskStatus === 'started' || taskStatus === 'paused') &&
          'animate-[shimmer_2s_linear_infinite] bg-[conic-gradient(from_var(--shimmer-angle),theme(colors.slate.100)_0%,theme(colors.yellow.400)_10%,theme(colors.slate.100)_20%)]',
        taskStatus === 'started' && 'running ',
        taskStatus === 'paused' && 'paused'
      )}
    >
      <div className="flex gap-x-4 rounded-full bg-white px-5 py-2">
        <Toggle variant="outline" pressed={taskStatus === 'started'} onPressedChange={handleRun}>
          {taskStatus === 'started' ? (
            <PauseIcon className="size-4"></PauseIcon>
          ) : (
            <PlayIcon className="size-4"></PlayIcon>
          )}
        </Toggle>

        <Badge
          variant="secondary"
          className={cn(
            'min-w-32 justify-center text-slate-600',
            taskStatus === 'started' && 'bg-yellow-50 text-yellow-500',
            taskStatus === 'paused' && 'bg-yellow-50 text-yellow-500'
          )}
        >
          {statusTextMap[taskStatus]}
        </Badge>
        <Toggle variant="outline" pressed={dataTableState.open} onPressedChange={handleDataPanelToggle}>
          {dataTableState.open ? (
            <ChevronsDownUpIcon className="size-4"></ChevronsDownUpIcon>
          ) : (
            <ChevronsUpDownIcon className="size-4"></ChevronsUpDownIcon>
          )}
        </Toggle>
      </div>
    </div>
  )
}

Toolbar.displayName = 'Toolbar'
