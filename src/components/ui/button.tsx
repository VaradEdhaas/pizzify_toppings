"use client";

import * as React from "react";
import {
  Button as HeroUIButton,
  type ButtonProps as HeroUIButtonProps,
} from "@heroui/react";

export interface ButtonProps extends HeroUIButtonProps { }

/**
 * A reusable HeroUI Button component wrapper for consistent usage.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    return <HeroUIButton ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
