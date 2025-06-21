"use client"

import * as React from "react"
import { Alert as HeroAlert } from "@heroui/alert"
import type { AlertProps as HeroAlertProps } from "@heroui/alert"

/**
 * A reusable HeroUI Alert wrapper for consistent usage.
 */
export interface AlertProps extends HeroAlertProps { }

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <HeroAlert ref={ref} {...props} />
})
Alert.displayName = "Alert"

export { Alert }
