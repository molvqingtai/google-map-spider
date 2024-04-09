import { useRemeshDomain, useRemeshSend } from 'remesh-react'
import { type ActiveTab, SetupPopupDomain } from '../SetupPopup/domain'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'

export const WechatRegister = () => {
  const send = useRemeshSend()
  const setupPopupDomain = useRemeshDomain(SetupPopupDomain())

  const handleSetTabActive = (activeTab: ActiveTab) => {
    send(setupPopupDomain.command.SetTabActiveCommand(activeTab))
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>微信注册</CardTitle>
        <CardDescription>请使用微信扫码关注公众号，即可安全注册</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-center">
          <img className="aspect-square w-44 bg-muted" src="" alt="" />
        </div>
        <div className="flex items-center justify-center space-y-1">
          <div className="mt-1 h-9 py-2 text-sm text-muted-foreground">扫码遇到问题？</div>
          <Button variant="link" className="px-1 font-normal text-blue-400">
            点我刷新
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-y-4 pb-0">
        <div className="flex w-full justify-end">
          <Button
            onClick={() => handleSetTabActive({ name: 'login' })}
            variant="link"
            className="text-muted-foreground"
          >
            已有账号？去登录
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

WechatRegister.displayName = 'WechatRegister'
