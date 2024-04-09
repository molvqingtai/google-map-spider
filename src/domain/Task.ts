import { Remesh } from 'remesh'
import Timer from '@resreq/timer'

import { fromEventPattern, map, merge } from 'rxjs'
import { format } from 'date-fns'
import { SetupPopupDomain } from '../app/content/components/SetupPopup/domain'
import { ToastModule } from './modules/Toast'
import runTask from './modules/runTask'
import UserInfoDomain from './UserInfo'
import jsonToExcel from '@/utils/jsonToExcel'

export type TaskStatus = 'started' | 'stopped' | 'paused'

export interface TaskConfig {
  delay: number
  limit: number
}

export interface TaskData {
  /** Logo */
  logo: string
  /** 名称 */
  name: string
  /** 评分 */
  rating: number
  /** 评论数 */
  commentCount: number
  /** 分类 */
  category: string
  /** 简介 */
  description: string
  /** 地址 */
  address: string
  /** 详细地址 */
  fullAddress: string
  /** 营业时间 */
  openTime: string
  /** 网址 */
  website: string
  /** 电话 */
  phone: string
  /** plusCode */
  plusCode: string
  /** 坐标 */
  coordinates: string
  /** googleId */
  googleId: string
  /** placeId */
  placeId: string
}

export class TaskError extends Error {
  type: 'warning' | 'error'
  constructor(message: string, type: 'warning' | 'error') {
    super(message)
    this.name = 'TaskError'
    this.type = type
  }
}

const TaskDomain = Remesh.domain({
  name: 'TaskDomain',
  impl: (domain) => {
    const timer = new Timer(runTask, {
      delay: 1000,
      immediate: true,
      includeAsyncTime: true
    })

    const Toast = ToastModule(domain)
    const userInfoDomain = domain.getDomain(UserInfoDomain())
    const setupPopupDomain = domain.getDomain(SetupPopupDomain())

    const TaskStatus = domain.state<TaskStatus>({
      name: 'Task.StatusState',
      default: 'stopped'
    })

    const TaskConfig = domain.state<TaskConfig>({
      name: 'Task.ConfigState',
      default: {
        delay: 0,
        limit: 100
      }
    })

    const TaskData = domain.state<TaskData[]>({
      name: 'Task.DataState',
      default: []
    })

    const DataQuery = domain.query({
      name: 'Task.DataQuery',
      impl: ({ get }) => {
        return get(TaskData())
      }
    })

    const StatusQuery = domain.query({
      name: 'Task.StatusQuery',
      impl: ({ get }) => {
        return get(TaskStatus())
      }
    })

    const ConfigQuery = domain.query({
      name: 'Task.ConfigQuery',
      impl: ({ get }) => {
        return get(TaskConfig())
      }
    })

    const StartEvent = domain.event({
      name: 'Task.StartEvent'
    })

    const StartCommand = domain.command({
      name: 'Task.StartCommand',
      impl: (
        { get },
        options: {
          type: 'warning' | 'error' | 'info' | 'success'
          message: string
        } = { type: 'success', message: '任务已开始' }
      ) => {
        const status = get(StatusQuery())
        if (status === 'started') {
          return []
        }
        const isLogin = get(userInfoDomain.query.IsLoginQuery())
        if (!isLogin) {
          return [ToastCommand({ type: 'warning', message: '请先登录' }), setupPopupDomain.command.OpenCommand()]
        }
        return [ToastCommand(options), TaskStatus().new('started'), StartEvent()]
      }
    })

    const StopEvent = domain.event({
      name: 'Task.StopEvent'
    })

    const StopCommand = domain.command({
      name: 'Task.StopCommand',
      impl: (
        { get },
        options: {
          type: 'warning' | 'error' | 'info' | 'success'
          message: string
        } = { type: 'warning', message: '任务已结束' }
      ) => {
        const status = get(StatusQuery())
        if (status === 'stopped') {
          return []
        }
        return [ToastCommand(options), TaskStatus().new('stopped'), StopEvent()]
      }
    })

    const PauseEvent = domain.event({
      name: 'Task.PauseEvent'
    })

    const PauseCommand = domain.command({
      name: 'Task.PauseCommand',
      impl: (
        { get },
        options: {
          type: 'warning' | 'error' | 'info' | 'success'
          message: string
        } = { type: 'warning', message: '任务已暂停' }
      ) => {
        const status = get(StatusQuery())
        if (status === 'paused') {
          return []
        }
        return [ToastCommand(options), TaskStatus().new('paused'), PauseEvent()]
      }
    })

    const ConfigUpdateEvent = domain.event<Partial<TaskConfig>>({
      name: 'Task.ConfigUpdateEvent'
    })

    const UpdateConfigCommand = domain.command({
      name: 'Task.UpdateConfigCommand',
      impl: ({ get }, config: Partial<TaskConfig>) => {
        const newConfig = { config, ...get(ConfigQuery()) }
        return [TaskConfig().new(newConfig), ConfigUpdateEvent(newConfig)]
      }
    })

    const DataUpdateEvent = domain.event<TaskData[]>({
      name: 'Task.DataUpdateEvent'
    })

    const UpdateDataCommand = domain.command({
      name: 'Task.UpdateDataCommand',
      impl: ({ get }, data: TaskData[]) => {
        return [TaskData().new(data), DataUpdateEvent(data)]
      }
    })

    const ClearDataCommand = domain.command({
      name: 'Task.ClearDataCommand',
      impl: ({ get }) => {
        const data = get(DataQuery())
        if (data.length) {
          return [ToastCommand({ type: 'success', message: '已清空数据' }), UpdateDataCommand([])]
        } else {
          return [ToastCommand({ type: 'warning', message: '没有可以清空的数据' })]
        }
      }
    })

    const ToastCommand = domain.command({
      name: 'Task.ToastCommand',
      impl: (
        { get },
        options: {
          type: 'warning' | 'error' | 'info' | 'success'
          message: string
        }
      ) => {
        switch (options.type) {
          case 'warning':
            return Toast.command.WarningCommand(options.message)
          case 'error':
            return Toast.command.ErrorCommand(options.message)
          case 'info':
            return Toast.command.InfoCommand(options.message)
          case 'success':
            return Toast.command.SuccessCommand(options.message)
        }
      }
    })

    const ExportEvent = domain.event({
      name: 'Task.ExportEvent'
    })

    const ExportCommand = domain.command({
      name: 'Task.ExportCommand',
      impl: ({ get }) => {
        const data = get(DataQuery())
        if (data.length) {
          try {
            jsonToExcel(
              [
                {
                  name: `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
                  body: data
                }
              ],
              `导出数据-${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
            )
            return [ToastCommand({ type: 'success', message: '导出成功！' })]
          } catch (error: SafeAny) {
            return [ToastCommand({ type: 'error', message: `导出失败：${error.message}` })]
          }
        } else {
          return [ToastCommand({ type: 'warning', message: '没有可以导出的数据' })]
        }
      }
    })
    ExportCommand.before(() => {
      return [ToastCommand({ type: 'info', message: '数据导出中，请稍候...' }), ExportEvent()]
    })

    domain.effect({
      name: 'TimerEffect',
      impl: ({ fromEvent, get }) => {
        const startEvent$ = fromEvent(StartEvent).pipe(
          map(() => {
            timer.start()
            return null
          })
        )

        const stopEvent$ = fromEvent(StopEvent).pipe(
          map(() => {
            timer.stop()
            return null
          })
        )

        const pauseEvent$ = fromEvent(PauseEvent).pipe(
          map(() => {
            timer.pause()
            return null
          })
        )

        const timerStopEvent$ = fromEventPattern((handler) => timer.on('stop', handler)).pipe(
          map(() =>
            StopCommand({
              type: 'success',
              message: '任务已完成'
            })
          )
        )
        const timerErrorEvent$ = fromEventPattern<TaskError>((handler) => timer.on('error', handler)).pipe(
          map((error) => {
            return StopCommand(error)
          })
        )

        const timerTickEvent$ = fromEventPattern<TaskData[]>((handler) => timer.on('tick', handler)).pipe(
          map((data) => {
            return UpdateDataCommand([...get(DataQuery()), ...data])
          })
        )

        return merge(startEvent$, stopEvent$, pauseEvent$, timerErrorEvent$, timerTickEvent$, timerStopEvent$)
      }
    })

    return {
      query: {
        DataQuery,
        StatusQuery,
        ConfigQuery
      },
      event: {
        StartEvent,
        StopEvent,
        PauseEvent,
        ExportEvent,
        DataUpdateEvent,
        ConfigUpdateEvent
      },
      command: {
        StartCommand,
        StopCommand,
        PauseCommand,
        ExportCommand,
        ClearDataCommand,
        UpdateConfigCommand
      }
    }
  }
})

export default TaskDomain
