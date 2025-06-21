"use client"

import * as React from "react"
import {
  Progress as HeroUIProgress,
  type ProgressProps as HeroUIProgressProps,
} from "@heroui/react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends HeroUIProgressProps {
  className?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, ...props }, ref) => (
    <HeroUIProgress
      ref={ref}
      className={cn("w-full", className)}
      {...props}
    />
  )
)

Progress.displayName = "Progress"

export { Progress }
