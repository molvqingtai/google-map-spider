import { CircleAlertIcon, CircleCheckIcon, CircleXIcon } from 'lucide-react'
import { useRemeshDomain, useRemeshSend } from 'remesh-react'

import { SetupPopupDomain, type ActiveTab } from '../SetupPopup/domain'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'

import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import UserInfoDomain from '@/domain/UserInfo'

export const ProfileInfo = () => {
  const send = useRemeshSend()
  const setupPopupDomain = useRemeshDomain(SetupPopupDomain())
  const userInfoDomain = useRemeshDomain(UserInfoDomain())

  const handleSetTabActive = (activeTab: ActiveTab) => {
    send(setupPopupDomain.command.SetTabActiveCommand(activeTab))
  }

  const handleLogout = () => {
    send(userInfoDomain.command.LogoutCommand())
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="py-2">
        <CardTitle>
          <span>example@gmail.com</span>
          {/* <Badge className="ml-2 text-orange-200">PRO</Badge> */}
          <Badge className="ml-2 bg-slate-400 text-slate-100">FREE</Badge>
        </CardTitle>
        {/* <CardDescription>您是尊贵的专业版用户，享有专属特权</CardDescription> */}
        <CardDescription>您是免费用户，升级专业版享更多专属特权</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="my-1 flex items-center gap-x-2 pt-4">
          <div className="font-semibold">账户信息</div>
        </div>
        <div className="my-1 flex items-center gap-x-2 text-sm text-slate-600">账户类型：免费</div>
        <div className="my-1 flex items-center gap-x-2 text-sm text-slate-600">到期时间：2024-12-25</div>
        <div className="my-1 flex items-center gap-x-2 text-sm text-slate-600">剩余额度：999 条</div>
        <div className="my-1 flex items-center gap-x-2 pt-4">
          <div className="font-semibold">享有特权</div>
        </div>
        <div className="my-1 flex items-center gap-x-2">
          <CircleCheckIcon className=" text-green-500"></CircleCheckIcon>
          <div className="text-sm text-slate-600">可提取数据条数：9999</div>
        </div>
        <div className="my-1 flex items-center gap-x-2">
          <CircleAlertIcon className="text-yellow-500"></CircleAlertIcon>
          <span className="text-sm text-slate-600">可导出文件类型：仅限 XLSX</span>
        </div>
        <div className="my-1 flex items-center gap-x-2">
          <CircleXIcon className="text-red-500"></CircleXIcon>
          <span className="text-sm text-slate-600">提取电子邮箱：仅限专业版</span>
        </div>
        <div className="my-1 flex items-center gap-x-2">
          <CircleXIcon className="text-red-500"></CircleXIcon>
          <span className="text-sm text-slate-600">提取关联社交媒体：仅限专业版</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-4 pb-0">
        <div className="flex w-full justify-center">
          <Button className="text-orange-200">升级为专业版 PRO</Button>
        </div>
        <div className="flex w-full justify-between">
          <Button onClick={handleLogout} variant="link" className="text-muted-foreground">
            退出登录
          </Button>
          <Button
            onClick={() => handleSetTabActive({ name: 'password', type: 'change' })}
            variant="link"
            className="text-muted-foreground"
          >
            修改密码
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

ProfileInfo.displayName = 'ProfileInfo'
