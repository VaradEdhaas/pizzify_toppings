"use client"

import * as React from "react"
import { Button as NextUIButton, ButtonProps as NextUIButtonProps } from "@nextui-org/react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends Omit<NextUIButtonProps, "variant"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    // Map your variants to NextUI variants
    const nextUiVariant: NextUIButtonProps["variant"] = (() => {
      switch (variant) {
        case "outline":
        case "secondary":
        case "link":
          return "light"
        case "ghost":
          return "ghost"
        case "destructive":
          return "solid"
        default:
          return "solid"
      }
    })();

    return (
      <NextUIButton
        ref={ref}
        className={cn(
          "font-normal transition-all duration-200",
          className
        )}
        variant={nextUiVariant}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
