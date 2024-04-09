import { findBySelector, queryBySelector } from 'testing-library-extra'
import userEvent from '@testing-library/user-event'
import { type RemoveListenerCallback } from '@webext-core/messaging'
import Timer from '@resreq/timer'
import { boolean } from 'valibot'

import { type TaskData, TaskError } from '../Task'
import { websiteMessenger } from '@/messaging/websiteMessenger'
import { firstCall } from '@/utils'

const parseSearchData = (data: string): TaskData[] => {
  const [res] = data.split('/*""*/')

  const resJson = JSON.parse(res)
  const list = JSON.parse(resJson.d.replace(")]}'", ''))
  const companyList: any[] = list[0][1].filter((item: any) => {
    return item.length >= 14
  })

  const outList = companyList.map<TaskData>((company) => {
    return {
      placeId: company[14]?.[227]?.[0]?.[4] || '',
      plusCode: '',
      coordinates: [company[14]?.[9]?.[2], company[14]?.[9]?.[3]].filter(boolean).toString(),
      googleId: company[14]?.[227]?.[0]?.[0] || '',
      logo: company[14]?.[37]?.[0]?.[0]?.[6]?.[0] || '',
      name: company[14]?.[11] || '',
      rating: company[14]?.[4]?.[7] || '',
      commentCount: company[14]?.[4]?.[8] || '',
      openTime: '', // 203
      description: '',
      website: decodeURIComponent(company[14]?.[7]?.[0] || '') || '',
      address: company[14]?.[39] || '',
      fullAddress: company[14]?.[18] || '',
      phone: company[14]?.[178]?.[0]?.[0] || '',
      category: [company[14]?.[13]].flat().filter(Boolean).join('>') || ''
    }
  })
  return outList
}

const triggerSearchApi = async (
  action: (resolve: (data: TaskData[]) => void, reject: (error: Error) => void) => any
) => {
  const data = await new Promise<TaskData[]>(async (resolve, reject) => {
    let removeListener: RemoveListenerCallback | undefined
    try {
      removeListener = websiteMessenger.onMessage('search-api-response', (response) => {
        try {
          const data = parseSearchData(response.data)
          resolve(data)
        } catch (error) {
          reject(error)
        } finally {
          removeListener?.()
        }
      })
      await action(
        (data: TaskData[]) => {
          removeListener?.()
          resolve(data)
        },
        (error: Error) => {
          removeListener?.()
          reject(error)
        }
      )
    } catch (error) {
      removeListener?.()
      reject(error)
    }
  })
  return data
}

const runTask = async (_: any, taskTimer: Timer) => {
  try {
    websiteMessenger.removeAllListeners()
    const isFirstCall = firstCall()
    if (isFirstCall) {
      const data = await triggerSearchApi(async () => {
        const searchInput = queryBySelector<HTMLInputElement>(document.body, '#searchboxinput')!
        if (!searchInput.value) {
          taskTimer.reset()
          throw new TaskError('请先搜索店铺', 'warning')
        }
        const searchButton = queryBySelector<HTMLButtonElement>(document.body, '#searchbox-searchbutton')!
        await userEvent.click(searchButton)
        try {
          await findBySelector<HTMLDivElement>(document.body, 'div[role="feed"][tabindex="-1"]', {
            timeout: 2000
          })
        } catch (error) {
          taskTimer.reset()
          throw new TaskError('未找到店铺列表', 'warning')
        }
      })

      return data
    } else {
      const scrollTimer = new Timer(
        (_, scrollTimer) => {
          const scrollList = queryBySelector<HTMLDivElement>(document.body, 'div[role="feed"][tabindex="-1"]')
          if (!scrollList) {
            taskTimer.reset()
            throw new TaskError('未找到店铺列表', 'warning')
          }
          const lastElement = scrollList.lastElementChild!
          lastElement.scrollIntoView()
          if (lastElement.getAttribute('style') === 'height: 64px; padding: 16px 67px;') {
            scrollTimer.stop()
            taskTimer.stop()
          }
        },
        {
          delay: 1000,
          limit: 5,
          includeAsyncTime: true,
          immediate: true
        }
      )

      const data = await triggerSearchApi((resolve, reject) => {
        scrollTimer.start()
        scrollTimer.on('stop', () => resolve([]))
        scrollTimer.on('error', reject)
      })
      scrollTimer.stop()
      return data
    }
  } catch (error) {
    if (error instanceof TaskError) {
      throw error
    }
    if (error instanceof Error) {
      throw new TaskError(`任务失败：${error.message}`, 'error')
    }
  }
}

export default runTask
