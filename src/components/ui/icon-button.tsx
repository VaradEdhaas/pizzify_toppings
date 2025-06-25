// components/ui/icon-button.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg"
  variant?: "ghost" | "solid" | "destructive"
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = "sm", variant = "ghost", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    }[size]

    const variantClasses = {
      ghost: "hover:bg-muted/40",
      solid: "bg-muted text-white hover:bg-muted/60",
      destructive: "bg-red-600 text-white hover:bg-red-700",
    }[variant]

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md transition-colors",
          sizeClasses,
          variantClasses,
          className
        )}
        {...props}
      />
    )
  }
)

IconButton.displayName = "IconButton"
