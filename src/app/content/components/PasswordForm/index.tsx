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
  length,
  email
} from 'valibot'
import { useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { type ActiveTab, SetupPopupDomain } from '../SetupPopup/domain'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import forgotPasswordSvg from '@/assets/images/forgot-password.svg'
import UserInfoDomain from '@/domain/UserInfo'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form'

export const PasswordForm = () => {
  const send = useRemeshSend()
  const setupPopupDomain = useRemeshDomain(SetupPopupDomain())

  const handleSetTabActive = (activeTab: ActiveTab) => {
    send(setupPopupDomain.command.SetTabActiveCommand(activeTab))
  }

  const userInfoDomain = useRemeshDomain(UserInfoDomain())
  const userInfo = useRemeshQuery(userInfoDomain.query.UserInfoQuery())
  const setupPopupState = useRemeshQuery(setupPopupDomain.query.StateQuery())

  const formSchema = object({
    email: string([toTrimmed(), notLength(0, '请输入邮箱'), email('邮箱格式不正正确')])
  })

  const form = useForm({
    resolver: valibotResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  const handleSubmit = () => {}
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} autoComplete="off">
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>{setupPopupState.activeTab.type === 'forgot' ? '忘记密码了吗?' : '修改密码'}</CardTitle>
            <CardDescription>
              请输入与您的帐户关联的电子邮件地址，我们将通过电子邮件向您发送链接，重置您的密码
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-center space-y-1">
              <img className="w-44" src={forgotPasswordSvg} />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>账户邮箱</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} placeholder="请输入账户关联邮箱" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-y-4 pb-0">
            <Button className="w-full">发送请求</Button>
            {setupPopupState.activeTab.type === 'forgot' ? (
              <div className="flex w-full justify-end">
                <Button
                  onClick={() => handleSetTabActive({ name: 'login' })}
                  variant="link"
                  className="text-muted-foreground"
                >
                  已知道密码？去登录
                </Button>
              </div>
            ) : (
              <div className="flex w-full justify-between">
                <Button
                  onClick={() => handleSetTabActive({ name: 'profile' })}
                  variant="link"
                  className="text-muted-foreground"
                >
                  返回
                </Button>
                <Button
                  onClick={() => handleSetTabActive({ name: 'login' })}
                  variant="link"
                  className="text-muted-foreground"
                >
                  已修改密码？去登录
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

PasswordForm.displayName = 'PasswordForm'
