import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRemeshDomain, useRemeshQuery, useRemeshSend } from 'remesh-react'
import {
  type Output,
  object,
  string,
  minLength,
  maxLength,
  toTrimmed,
  union,
  literal,
  notLength,
  number,
  regex,
  length
} from 'valibot'
import { type ActiveTab, SetupPopupDomain } from '../SetupPopup/domain'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import UserInfoDomain from '@/domain/UserInfo'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form'

export const PhoneLogin = () => {
  const send = useRemeshSend()
  const setupPopupDomain = useRemeshDomain(SetupPopupDomain())

  const handleSetTabActive = (activeTab: ActiveTab) => {
    send(setupPopupDomain.command.SetTabActiveCommand(activeTab))
  }

  const userInfoDomain = useRemeshDomain(UserInfoDomain())
  const userInfo = useRemeshQuery(userInfoDomain.query.UserInfoQuery())

  const formSchema = object({
    phone: string([toTrimmed(), notLength(0, '请输入手机号')]),
    code: string([toTrimmed(), notLength(0, '请输入验证码'), length(4, '验证码只能是 4 位数字')])
  })

  const form = useForm({
    resolver: valibotResolver(formSchema),
    defaultValues: {
      phone: '',
      code: ''
    }
  })

  const handleSubmit = () => {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>短信验证码登录</CardTitle>
            <CardDescription>请输入您的手机号，获取短信验证码登录</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>手机号</FormLabel>
                  <FormControl>
                    <div className="flex gap-x-2">
                      <Select value="86">
                        <SelectTrigger className="w-[114px] shrink-0">
                          <SelectValue placeholder="选择地区" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="86">中国(+86)</SelectItem>
                          <SelectItem value="852">香港(+852)</SelectItem>
                          <SelectItem value="853">澳门(+853)</SelectItem>
                          <SelectItem value="886">台湾(+886)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input type="tel" {...field} placeholder="请输入手机号" />
                    </div>
                  </FormControl>
                  <FormMessage className="ml-[120px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>验证码</FormLabel>
                  <FormControl>
                    <div className="flex gap-x-2">
                      <Input type="number" {...field} placeholder="请输入验证码" />
                      <Button className="shrink-0">获取验证码</Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-y-4 pb-0">
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              登 录
            </Button>
            <div className="flex w-full justify-between">
              <Button
                onClick={() => handleSetTabActive({ name: 'register' })}
                variant="link"
                className="text-muted-foreground "
              >
                注册账号
              </Button>
              <Button
                onClick={() => handleSetTabActive({ name: 'password', type: 'forgot' })}
                variant="link"
                className="text-muted-foreground"
              >
                忘记密码？
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

PhoneLogin.displayName = 'PhoneLogin'
