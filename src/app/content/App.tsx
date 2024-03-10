import { useRef, useState } from 'react'
import { Toolbar } from './components/Toolbar'
import { DataPanel } from './components/DataPanel'
import { DataTable, type Shop } from './components/DataTable'
import { MaskLayer } from './components/MaskLayer'
import { Toaster } from '@/components/ui/Toaster'
import { asyncLoopTimer, asyncQuerySelector, sleep } from '@/utils'
import { useToast } from '@/components/ui/use-toast'

export default function App() {
  const { toast } = useToast()
  const [shopList, setShopList] = useState<Shop[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isRunningRef = useRef(isRunning)

  const runShopTask = async (delay = 100) => {
    let shopItemRef: Element | undefined | null

    // 搜索面板
    const searchPanel = await asyncQuerySelector('div[jstcache="3"][jsan]', {
      timeout: 100
    })
    if (!searchPanel) {
      throw new Error('请打开搜索面板')
    }
    // 结果标识
    const resultTitle = await asyncQuerySelector('h1.fontTitleLarge', {
      root: searchPanel,
      timeout: 100
    })
    // 获取搜索结果，出现“结果”两字则认为是搜索了商家或场所
    if (!resultTitle) {
      throw new Error('请搜索商家或场所')
    }
    // 列表面板
    const listPanel = await asyncQuerySelector('div[aria-label][role="feed"][tabindex="-1"]', {
      root: searchPanel,
      timeout: 100
    })
    if (!listPanel) {
      throw new Error('未找到结果面板')
    }

    const shopItem = await asyncQuerySelector(
      // 选择子级有店铺链接的 item
      'div:has(div>a[aria-label][href^="https://www.google.com/maps/place"][jsaction][jslog])',
      {
        root: listPanel,
        timeout: 100
      }
    )

    if (!shopItem) {
      throw new Error('未找搜索到店铺')
    }

    shopItemRef = shopItem

    return async () => {
      if (!isRunningRef.current) {
        return false
      }
      console.time(`task`)
      shopItemRef!.scrollIntoView()

      // 店铺链接
      const shopLink = await asyncQuerySelector<HTMLAnchorElement>(
        'a[aria-label][href^="https://www.google.com/maps/place"][jsaction][jslog]',
        {
          root: shopItemRef!,
          timeout: 100
        }
      )
      if (!shopLink) {
        throw new Error('未找到店铺链接')
      }
      shopLink.click()
      await sleep(delay)

      // 店铺弹出卡片
      const shopCard = await asyncQuerySelector('div[jstcache="4"][jsan]', {
        timeout: 100
      })
      if (!shopCard) {
        throw new Error('未找到店铺卡片')
      }

      /** 店铺信息 start */

      // 封面节点
      const logoNode = await asyncQuerySelector<HTMLImageElement>('img[decoding="async"][src]', {
        root: shopCard,
        timeout: 3000
      })
      if (!logoNode) {
        throw new Error('未找到封面节点')
      }

      // 头部卡片
      const shopHeader = await asyncQuerySelector('div[style="padding-bottom: 4px;"]', {
        root: shopCard,
        timeout: 100
      })

      if (!shopHeader) {
        throw new Error('未找到店铺头部')
      }

      // 标题节点
      const titleNode = await asyncQuerySelector('div>h1[style]', {
        root: shopHeader,
        timeout: 100
      })
      if (!titleNode) {
        throw new Error('未找到标题文本节点')
      }
      const ratingNode = await asyncQuerySelector('div[jslog*=mutable]>span:nth-of-type(1)>span[aria-hidden="true"]', {
        root: shopHeader,
        timeout: 100
      })
      if (!ratingNode) {
        // throw new Error('未找到评分节点')
        console.log(titleNode.textContent, '：未找到评分节点')
      }
      // 评论节点
      const commentNode = await asyncQuerySelector('div[jslog*=mutable]>span:nth-of-type(2) span[aria-label]', {
        root: shopHeader,
        timeout: 100
      })
      if (!commentNode) {
        // throw new Error('未找到评论节点')
        console.log(titleNode.textContent, '：未找到评论节点')
      }

      // 分类节点
      const categoryNode = await asyncQuerySelector('button[jsaction^=pane]', {
        root: shopHeader,
        timeout: 100
      })
      if (!categoryNode) {
        // throw new Error('未找到分类节点')
        console.log(titleNode.textContent, '：未找到分类节点')
      }

      // 店铺表格
      const shopTable = await asyncQuerySelector('div[style=""][aria-label][role="region"]', {
        root: shopCard,
        timeout: 100
      })

      if (!shopTable) {
        throw new Error('未找到店铺表格')
      }

      // 地址节点
      const addressNode = await asyncQuerySelector(
        'div>button[data-item-id="address"]>div>div:nth-of-type(2)>div:nth-of-type(1)',
        {
          root: shopTable,
          timeout: 100
        }
      )
      if (!addressNode) {
        console.log(titleNode.textContent, '：未找到地址节点')

        // throw new Error('未找到地址节点')
      }
      // 营业时间
      const openTimeNode = await asyncQuerySelector(
        'div>div[data-hide-tooltip-on-mouse-move][aria-expanded][role="button"][tabindex="0"] span[style="font-weight: 400;"]',
        {
          root: shopTable,
          timeout: 100
        }
      )
      if (!openTimeNode) {
        console.log(titleNode.textContent, '：未找到营业时间节点')
        // throw new Error('未找到营业时间节点')
      }
      // 网址
      const websiteNode = await asyncQuerySelector(
        'div>a[data-item-id="authority"]>div>div:nth-of-type(2)>div:nth-of-type(1)',
        {
          root: shopTable,
          timeout: 100
        }
      )
      if (!websiteNode) {
        console.log(titleNode.textContent, '：未找到网址节点')
        // throw new Error('未找到网址节点')
      }

      // 电话
      const phoneNode = await asyncQuerySelector(
        'div>button[data-item-id^="phone:tel"]>div>div:nth-of-type(2)>div:nth-of-type(1)',
        {
          root: shopTable,
          timeout: 100
        }
      )
      if (!phoneNode) {
        console.log(titleNode.textContent, '：未找到电话节点')
        // throw new Error('未找到电话节点')
      }
      // Plus Code
      const plusCodeNode = await asyncQuerySelector(
        'div>button[data-item-id="oloc"]>div>div:nth-of-type(2)>div:nth-of-type(1)',
        {
          root: shopTable,
          timeout: 100
        }
      )
      if (!plusCodeNode) {
        console.log(titleNode.textContent, '：未找到 Plus Code 节点')
        // throw new Error('未找到 Plus Code 节点')
      }
      /** 店铺信息 end */

      setShopList((prev) => {
        return [
          ...prev,
          {
            id: Date.now().toString(),
            logo: logoNode.src,
            name: titleNode.textContent!,
            rating: ratingNode?.textContent ?? '',
            commentCount: commentNode?.textContent ?? '',
            category: categoryNode?.textContent ?? '',
            description: '',
            address: addressNode?.textContent ?? '',
            fullAddress: '',
            openTime: openTimeNode?.textContent ?? '',
            website: websiteNode?.textContent ?? '',
            phone: phoneNode?.textContent ?? '',
            plusCode: plusCodeNode?.textContent ?? '',
            coordinates: '',
            googleId: '',
            placeId: ''
          }
        ]
      })

      const nextShopItemRef = shopItemRef?.nextElementSibling?.nextElementSibling
      if (nextShopItemRef) {
        const isSafeShopItemRef = nextShopItemRef.querySelector(
          'div>a[aria-label][href^="https://www.google.com/maps/place"][jsaction][jslog]'
        )

        shopItemRef = isSafeShopItemRef ? nextShopItemRef : null
      } else {
        shopItemRef = null
      }

      console.timeEnd('task')
      return shopItemRef ? false : shopList
    }
  }

  const handleStart = async () => {
    try {
      // toast({ title: '开始抓取' })
      setIsRunning(true)
      isRunningRef.current = true
      await asyncLoopTimer(await runShopTask(1000))
    } catch (error: SafeAny) {
      setIsRunning(false)
      isRunningRef.current = false
      console.log('---', error.message)
      toast({ title: error.message })
    }
  }

  const handleStop = () => {
    toast({ title: '已暂停抓取' })
    setIsRunning(false)
    isRunningRef.current = false
  }
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className="fixed left-2/4 z-top flex -translate-x-2/4 flex-col items-center p-3">
        <Toolbar
          isOpen={isOpen}
          isRunning={isRunning}
          count={shopList.length}
          onStart={handleStart}
          onStop={handleStop}
          onOpen={handleOpen}
          onClose={handleClose}
        ></Toolbar>
        {isOpen && (
          <DataPanel>
            <DataTable data={shopList}></DataTable>
          </DataPanel>
        )}
      </div>
      {isRunning && <MaskLayer></MaskLayer>}
      <Toaster></Toaster>
    </>
  )
}
