"use client"

import * as React from "react"
import {
  Card as NextUICard,
  CardBody as NextUICardBody,
  CardHeader as NextUICardHeader,
  CardFooter as NextUICardFooter,
  type CardProps as NextUICardProps,
  type CardBodyProps as NextUICardBodyProps,
  type CardHeaderProps as NextUICardHeaderProps,
  type CardFooterProps as NextUICardFooterProps,
} from "@nextui-org/react"
import { cn } from "@/lib/utils"

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

interface CardHeaderProps extends NextUICardHeaderProps {
  className?: string
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <NextUICardHeader ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-light leading-none tracking-tight text-white", className)} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-neutral-400 font-light", className)} {...props} />
  ),
)
CardDescription.displayName = "CardDescription"

interface CardContentProps extends NextUICardBodyProps {
  className?: string
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <NextUICardBody ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

interface CardFooterProps extends NextUICardFooterProps {
  className?: string
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => (
  <NextUICardFooter ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
