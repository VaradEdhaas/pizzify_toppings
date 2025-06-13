"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "destructive" | "success" | "warning"
  }
>(({ className, variant = "default", ...props }, ref) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "destructive":
        return "bg-red-500/10 border-red-500/20 text-red-400"
      case "success":
        return "bg-green-500/10 border-green-500/20 text-green-400"
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
      default:
        return "bg-white/[0.05] border-white/[0.1] text-white"
    }
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={cn("relative w-full rounded-2xl border p-4", getVariantStyles(), className)}
      {...props}
    />
  )
})
Alert.displayName = "Alert"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm font-light [&_p]:leading-relaxed", className)} {...props} />
  ),
)
AlertDescription.displayName = "AlertDescription"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-normal leading-none tracking-tight", className)} {...props} />
  ),
)
AlertTitle.displayName = "AlertTitle"

export { Alert, AlertTitle, AlertDescription }
