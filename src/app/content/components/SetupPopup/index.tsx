import { useEffect } from 'react'
import { useRemeshDomain, useRemeshQuery, useRemeshSend } from 'remesh-react'
import { AnimationPresence } from '../AnimationPresence'
import { LoginForm } from '../LoginForm'
import { RegisterForm } from '../RegisterForm'
import { PasswordForm } from '../PasswordForm'
import { ProfileInfo } from '../ProfileInfo'
import { SetupPopupDomain } from './domain'
import { Tabs, TabsContent } from '@/components/ui/Tabs'
import { extensionMessenger } from '@/messaging'

export const SetupPopup = () => {
  const send = useRemeshSend()
  const setupPopupDomain = useRemeshDomain(SetupPopupDomain())
  const setupPopupState = useRemeshQuery(setupPopupDomain.query.StateQuery())

  useEffect(() => {
    const removeListener = extensionMessenger.onMessage('setup-popup-toggle', () => {
      send(setupPopupDomain.command.ToggleCommand())
    })

    return () => {
      removeListener()
    }
  })

  return (
    <AnimationPresence present={setupPopupState.open}>
      <div className="fixed right-10 top-3 z-infinity flex w-96 rounded-xl bg-white p-4 shadow shadow-slate-400 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
        <Tabs value={setupPopupState.activeTab.name} className="w-full">
          <TabsContent tabIndex={-1} value="profile">
            <ProfileInfo></ProfileInfo>
          </TabsContent>
          <TabsContent tabIndex={-1} value="login">
            <LoginForm></LoginForm>
          </TabsContent>
          <TabsContent tabIndex={-1} value="register">
            <RegisterForm></RegisterForm>
          </TabsContent>
          <TabsContent tabIndex={-1} value="password">
            <PasswordForm></PasswordForm>
          </TabsContent>
        </Tabs>
      </div>
    </AnimationPresence>
  )
}

SetupPopup.displayName = 'SetupPopup'
