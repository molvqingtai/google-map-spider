import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRemeshDomain, useRemeshQuery, useRemeshSend } from 'remesh-react'
import { type Output, object, string, minLength, maxLength, toTrimmed, regex, notLength } from 'valibot'
import { Loader2Icon } from 'lucide-react'
import { type ActiveTab, SetupPopupDomain } from '../SetupPopup/domain'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form'
import UserInfoDomain from '@/domain/UserInfo'

export const AccountLogin = () => {
  const send = useRemeshSend()
  const setupPopupDomain = useRemeshDomain(SetupPopupDomain())
  const userInfoDomain = useRemeshDomain(UserInfoDomain())

  const asyncData = useRemeshQuery(userInfoDomain.query.AsyncDataQuery())

  const handleSetTabActive = (activeTab: ActiveTab) => {
    send(setupPopupDomain.command.SetTabActiveCommand(activeTab))
  }

  const formSchema = object({
    account: string([toTrimmed(), notLength(0, '请输入邮箱或手机号')]),
    password: string([
      toTrimmed(),
      notLength(0, '请输入密码'),
      minLength(6, '密码长度最少 6 个字符'),
      maxLength(20, '密码长度最多 20 个字符'),
      regex(/^[A-Za-z0-9!@#$%^&*()-+=[\]{};:'"|,.<>/?~]*$/, '密码只能包含英文、数字和字符')
    ])
  })

  const form = useForm({
    resolver: valibotResolver(formSchema),
    defaultValues: {
      account: '',
      password: ''
    }
  })

  const handleSubmit = (userInfo: Output<typeof formSchema>) => {
    send(userInfoDomain.command.LoginCommand(userInfo))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>账号密码登录</CardTitle>
            <CardDescription>请输入您的账号密码，即可安全登录</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>邮箱/手机号</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} placeholder="请输入邮箱或手机号" />
                  </FormControl>
                  <FormMessage />
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
          </CardContent>
          <CardFooter className="flex flex-col gap-y-4 pb-0">
            <Button type="submit" disabled={asyncData.type === 'loading'} className="w-full">
              {asyncData.type === 'loading' && <Loader2Icon className="mr-2 size-4 animate-spin" />}登 录
            </Button>
            <div className="flex w-full justify-between">
              <Button
                onClick={() => handleSetTabActive({ name: 'register' })}
                variant="link"
                className="text-muted-foreground"
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

AccountLogin.displayName = 'AccountLogin'
