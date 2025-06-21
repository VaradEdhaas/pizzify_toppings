"use client"

import * as React from "react"
import { Chip, type ChipProps } from "@heroui/react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, ...props }, ref) => {
    return (
      <Chip
        ref={ref}
        className={cn("text-xs font-medium", className)}
        {...props}
      />
    )
  }
)

Badge.displayName = "Badge"

export { Badge }
