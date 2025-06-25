// components/ui/drawer.tsx
'use client'

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Button
} from '@heroui/react'
import { useState } from 'react'

interface CustomDrawerProps {
  triggerLabel?: string
  title?: string
  buttonLabel?: string
  children: React.ReactNode | ((props: { close: () => void }) => React.ReactNode)
  footer?: React.ReactNode | ((props: { close: () => void }) => React.ReactNode)
  placement?: 'left' | 'right' | 'top' | 'bottom'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'
  classNames?: Partial<Record<'base' | 'header' | 'body' | 'footer', string>>
  isDismissable?: boolean
  isKeyboardDismissDisabled?: boolean
  backdrop?: 'transparent' | 'opaque' | 'blur'
}

export default function CustomDrawer({
  triggerLabel = 'Open Drawer',
  title = 'Drawer Title',
  children,
  footer,
  placement = 'right',
  size = 'md',
  classNames = {},
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  backdrop = 'opaque',
  buttonLabel = "Button"
}: CustomDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const close = () => setIsOpen(false)

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>{triggerLabel}</Button>

      <Drawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement={placement}
        size={size}
        backdrop={backdrop}
        isDismissable={isDismissable}
        isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      >
        <DrawerContent className={classNames.base}>
          <DrawerHeader className={classNames.header}>
            <span>{title}</span>
            <Button
              variant="ghost"
              size="sm"
              onPress={() => setIsOpen(false)}
            >
              {buttonLabel}
            </Button>
          </DrawerHeader>

          <DrawerBody className={classNames.body}>
            {typeof children === 'function' ? children({ close }) : children}
          </DrawerBody>

          {footer && (
            <DrawerFooter className={classNames.footer}>
              {typeof footer === 'function' ? footer({ close }) : footer}
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
