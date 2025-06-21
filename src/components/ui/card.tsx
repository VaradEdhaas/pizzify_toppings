"use client";

import {
  Card as HeroCard,
  CardHeader as HeroCardHeader,
  CardBody as HeroCardBody,
  CardFooter as HeroCardFooter,
} from "@heroui/react";
import { cn } from "@/lib/utils";
import * as React from "react";

// Card container
const Card = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof HeroCard>
>(({ className, ...props }, ref) => (
  <HeroCard
    ref={ref}
    className={cn("bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl", className)}
    {...props}
  />
));
Card.displayName = "Card";

// Card Header
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof HeroCardHeader>
>(({ className, ...props }, ref) => (
  <HeroCardHeader
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// Card Title
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-light leading-none tracking-tight text-white", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// Card Description
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-neutral-400 font-light", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// Card Body
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof HeroCardBody>
>(({ className, ...props }, ref) => (
  <HeroCardBody ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// Card Footer
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof HeroCardFooter>
>(({ className, ...props }, ref) => (
  <HeroCardFooter ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

// Exports
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
