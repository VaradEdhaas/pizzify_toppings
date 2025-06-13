"use client"

import * as React from "react"
import { Input as NextUIInput, type InputProps as NextUIInputProps } from "@nextui-org/react"
import { cn } from "@/lib/utils"

export interface InputProps extends NextUIInputProps {
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <NextUIInput
      type={type}
      className={cn("w-full", className)}
      classNames={{
        base: "w-full",
        mainWrapper: "h-full",
        input: ["bg-transparent", "text-white", "placeholder:text-neutral-500", "text-base", "font-light"],
        inputWrapper: [
          "bg-white/[0.03]",
          "border-white/[0.1]",
          "hover:bg-white/[0.05]",
          "focus-within:!bg-white/[0.05]",
          "focus-within:!border-white/[0.2]",
          "!cursor-text",
          "h-12",
          "rounded-xl",
          "border",
        ],
        label: "text-neutral-300 text-sm font-light",
      }}
      variant="bordered"
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
