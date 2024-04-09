import { PhoneRegister } from './PhoneRegister'
import { WechatRegister } from './WechatRegister'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'

export const RegisterForm = () => {
  return (
    <Tabs defaultValue="phone" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="phone">手机号注册</TabsTrigger>
        <TabsTrigger value="wechat">微信注册</TabsTrigger>
      </TabsList>
      <TabsContent tabIndex={-1} value="phone">
        <PhoneRegister></PhoneRegister>
      </TabsContent>
      <TabsContent tabIndex={-1} value="wechat">
        <WechatRegister></WechatRegister>
      </TabsContent>
    </Tabs>
  )
}

RegisterForm.displayName = 'RegisterForm'
