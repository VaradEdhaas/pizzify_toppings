"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        solid: "bg-primary text-primary-foreground hover:bg-primary/90",
        soft: "bg-muted text-foreground hover:bg-muted/70",
        outline: "border border-border hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        surface: "bg-background hover:bg-muted/40",
        classic: "bg-gray-100 hover:bg-gray-200 text-foreground",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        "1": "h-8 px-2 text-xs",
        "2": "h-9 px-3 text-sm",
        "3": "h-10 px-4 text-base",
        "4": "h-11 px-6 text-lg",
      },
      radius: {
        none: "rounded-none",
        small: "rounded-sm",
        medium: "rounded-md",
        large: "rounded-lg",
        full: "rounded-full",
      },
      colorVariant: {
        indigo: "text-indigo-600",
        cyan: "text-cyan-600",
        orange: "text-orange-600",
        crimson: "text-red-600",
        gray: "text-gray-700",
      },
      highContrast: {
        true: "contrast-150",
        false: "",
      },
      loading: {
        true: "pointer-events-none opacity-70",
        false: "",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "2",
      radius: "medium",
      loading: false,
      highContrast: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  startContent?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      radius,
      colorVariant,
      loading = false,
      highContrast = false,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, radius, colorVariant, highContrast, loading }),
          className
        )}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {!loading && props.startContent && (
          <span className="mr-2">{props.startContent}</span>
        )}
        {children}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
