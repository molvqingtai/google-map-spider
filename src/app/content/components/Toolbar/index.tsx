import { PlayIcon, PauseIcon, ChevronsUpDownIcon, ChevronsDownUpIcon } from 'lucide-react'

import { useRemeshDomain, useRemeshQuery, useRemeshSend } from 'remesh-react'
import { DataPanelDomain } from '../DataPanel/domain'
import UserInfoDomain from '../../../../domain/UserInfo'
import { Badge } from '@/components/ui/Badge'
import { cn, throttle } from '@/utils'
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
    started: '已开始',
    paused: '已暂停'
  }

  const handleDataPanelToggle = () => {
    send(dataTableDomain.command.ToggleCommand())
  }

  return (
    <div className="fixed inset-x-1 top-3 z-infinity mx-auto flex w-fit gap-x-5 rounded-full bg-white px-6 py-3 shadow shadow-slate-400">
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
          taskStatus === 'started' && 'bg-green-50 text-green-500',
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
  )
}

Toolbar.displayName = 'Toolbar'
