"use client"

import * as React from "react"
import { Input as HeroInput, type InputProps as HeroInputProps } from "@heroui/react"
import { cn } from "@/lib/utils"

export interface InputProps extends HeroInputProps {
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <HeroInput
        ref={ref}
        type={type}
        className={cn("w-full", className)}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
