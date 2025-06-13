"use client"
import { Chip, type ChipProps } from "@nextui-org/react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends Omit<ChipProps, "variant"> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return "bg-white/10 text-white border-white/20"
      case "destructive":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "outline":
        return "bg-transparent text-white border-white/30"
      default:
        return "bg-white text-black"
    }
  }

  return (
    <Chip
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-light transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        getVariantStyles(),
        className,
      )}
      size="sm"
      {...props}
    />
  )
}

export { Badge }
