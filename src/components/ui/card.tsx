"use client"

import * as React from "react"
import {
  Card as NextUICard,
  CardBody as NextUICardBody,
  CardHeader as NextUICardHeader,
  CardFooter as NextUICardFooter,
  type CardProps as NextUICardProps,
} from "@nextui-org/react"
import { cn } from "@/lib/utils"

// Card wrapper
interface CardProps extends NextUICardProps {
  className?: string
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <NextUICard
    ref={ref}
    className={cn("bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl", className)}
    {...props}
  />
))
Card.displayName = "Card"

// CardHeader wrapper
const CardHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof NextUICardHeader>>(
  ({ className, ...props }, ref) => (
    <NextUICardHeader ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

// CardTitle pure heading
const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-light leading-none tracking-tight text-white", className)} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

// CardDescription pure paragraph
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-neutral-400 font-light", className)} {...props} />
  )
)
CardDescription.displayName = "CardDescription"

// CardContent wrapper
const CardContent = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof NextUICardBody>>(
  ({ className, ...props }, ref) => (
    <NextUICardBody ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

// CardFooter wrapper
const CardFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof NextUICardFooter>>(
  ({ className, ...props }, ref) => (
    <NextUICardFooter ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
