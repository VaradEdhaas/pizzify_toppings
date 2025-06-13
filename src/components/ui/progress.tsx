"use client"

import * as React from "react"
import { Progress as NextUIProgress, type ProgressProps as NextUIProgressProps } from "@nextui-org/react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends NextUIProgressProps {
  className?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(({ className, ...props }, ref) => (
  <NextUIProgress
    ref={ref}
    className={cn("w-full", className)}
    classNames={{
      base: "max-w-full",
      track: "bg-white/[0.1] rounded-full",
      indicator: "bg-white rounded-full",
    }}
    {...props}
  />
))
Progress.displayName = "Progress"

export { Progress }
