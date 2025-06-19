"use client"

import * as React from "react"
import { Button as NextUIButton, type ButtonProps as NextUIButtonProps } from "@nextui-org/react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends NextUIButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "default", ...props }, ref) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "destructive":
        return "bg-red-500 text-white hover:bg-red-600"
      case "outline":
        return "border border-white/20 bg-transparent text-white hover:bg-white/10"
      case "secondary":
        return "bg-white/10 text-white hover:bg-white/20"
      case "ghost":
        return "bg-transparent text-white hover:bg-white/10"
      case "link":
        return "bg-transparent text-white underline-offset-4 hover:underline"
      default:
        return "bg-white text-black hover:bg-neutral-200"
    }
  }

  return (
    <NextUIButton
      ref={ref}
      className={cn("font-normal transition-all duration-200", getVariantStyles(), className)}
      radius="lg"
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
