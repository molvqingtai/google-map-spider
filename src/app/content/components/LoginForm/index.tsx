import { AccountLogin } from './AccountLogin'
import { PhoneLogin } from './PhoneLogin'
import { WechatLogin } from './WechatLogin'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'

export const LoginForm = () => {
  return (
    <Tabs defaultValue="phone" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">账号登录</TabsTrigger>
        <TabsTrigger value="phone">验证码登录</TabsTrigger>
        <TabsTrigger value="wechat">微信登录</TabsTrigger>
      </TabsList>
      <TabsContent tabIndex={-1} value="account">
        <AccountLogin></AccountLogin>
      </TabsContent>
      <TabsContent tabIndex={-1} value="phone">
        <PhoneLogin></PhoneLogin>
      </TabsContent>
      <TabsContent tabIndex={-1} value="wechat">
        <WechatLogin></WechatLogin>
      </TabsContent>
    </Tabs>
  )
}

LoginForm.displayName = 'LoginForm'
