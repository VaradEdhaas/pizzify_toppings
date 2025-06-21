"use client";

import * as React from "react";
import {
  Checkbox as HeroUICheckbox,
  type CheckboxProps as HeroUICheckboxProps,
} from "@heroui/react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends HeroUICheckboxProps {
  className?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <HeroUICheckbox ref={ref} className={cn(className)} {...props} />
  )
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
