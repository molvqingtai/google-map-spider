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
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import UserInfoDomain from '@/domain/UserInfo'

export const WechatLogin = () => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <CardTitle>微信扫码登录</CardTitle>
        <CardDescription>请使用微信扫码关注公众号，即可安全登录</CardDescription>
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
    </Card>
  )
}

WechatLogin.displayName = 'WechatLogin'
