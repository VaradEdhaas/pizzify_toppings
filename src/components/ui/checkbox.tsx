"use client"

import * as React from "react"
import { Checkbox as NextUICheckbox, type CheckboxProps as NextUICheckboxProps } from "@nextui-org/react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends NextUICheckboxProps {
  className?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...props }, ref) => (
  <NextUICheckbox
    ref={ref}
    className={cn("", className)}
    classNames={{
      base: "inline-flex w-full max-w-full bg-transparent hover:bg-transparent items-start",
      label: "text-sm text-neutral-400 leading-relaxed font-light ml-3",
      wrapper: "before:border-white/30 after:bg-white after:text-black rounded-lg",
    }}
    {...props}
  />
))
Checkbox.displayName = "Checkbox"

export { Checkbox }
