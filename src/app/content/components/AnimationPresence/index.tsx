import { RemoveScroll } from 'react-remove-scroll'
import { FocusScope } from '@radix-ui/react-focus-scope'
import { DismissableLayer, type DismissableLayerProps } from '@radix-ui/react-dismissable-layer'
import { Presence, type PresenceProps } from '@radix-ui/react-presence'
import { Slot } from '@radix-ui/react-slot'
import { type FC, forwardRef } from 'react'

export type AnimationPresenceProps = PresenceProps & DismissableLayerProps

export const AnimationPresence = forwardRef<HTMLElement, AnimationPresenceProps>(
  ({ present, children, ...props }, ref) => {
    return (
      <Presence present={present}>
        <RemoveScroll as={Slot}>
          <FocusScope asChild trapped={false} loop={false}>
            <DismissableLayer asChild {...props}>
              <Slot ref={ref} data-state={present ? 'open' : 'closed'}>
                {children}
              </Slot>
            </DismissableLayer>
          </FocusScope>
        </RemoveScroll>
      </Presence>
    )
  }
)

AnimationPresence.displayName = 'AnimationPresence'
