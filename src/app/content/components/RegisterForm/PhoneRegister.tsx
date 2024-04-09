import { useRemeshDomain, useRemeshQuery, useRemeshSend } from 'remesh-react'
import { notLength, object, string, toTrimmed, length, minLength, maxLength, regex } from 'valibot'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { type ActiveTab, SetupPopupDomain } from '../SetupPopup/domain'
import UserInfoDomain from '@/domain/UserInfo'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export const PhoneRegister = () => {
  const send = useRemeshSend()
  const setupPopupDomain = useRemeshDomain(SetupPopupDomain())

  const handleSetTabActive = (activeTab: ActiveTab) => {
    send(setupPopupDomain.command.SetTabActiveCommand(activeTab))
  }

  const userInfoDomain = useRemeshDomain(UserInfoDomain())
  const userInfo = useRemeshQuery(userInfoDomain.query.UserInfoQuery())

  const formSchema = object({
    phone: string([toTrimmed(), notLength(0, '请输入手机号')]),
    code: string([toTrimmed(), notLength(0, '请输入验证码'), length(4, '验证码只能是 4 位数字')]),
    password: string([
      toTrimmed(),
      notLength(0, '请输入密码'),
      minLength(6, '密码长度最少 6 个字符'),
      maxLength(20, '密码长度最多 20 个字符'),
      regex(/^[A-Za-z0-9!@#$%^&*()-+=[\]{};:'"|,.<>/?~]*$/, '密码只能包含英文、数字和字符')
    ]),
    rePassword: string([
      toTrimmed(),
      notLength(0, '请再次输入密码'),
      minLength(6, '密码长度最少 6 个字符'),
      maxLength(20, '密码长度最多 20 个字符'),
      regex(/^[A-Za-z0-9!@#$%^&*()-+=[\]{};:'"|,.<>/?~]*$/, '密码只能包含英文、数字和字符')
    ])
  })

  const form = useForm({
    resolver: valibotResolver(formSchema),
    defaultValues: {
      phone: '',
      code: '',
      password: '',
      rePassword: ''
    }
  })

  const handleSubmit = () => {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>手机号注册</CardTitle>
            <CardDescription>请输入您的手机号和密码，即可安全注册</CardDescription>
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
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>密码</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="请输入密码" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>确认密码</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="请再次输入密码" />
                  </FormControl>
                  <FormMessage />
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
            <Button className="w-full">注 册</Button>
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
      </form>
    </Form>
  )
}

PhoneRegister.displayName = 'PhoneRegister'
