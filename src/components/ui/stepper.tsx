import * as React from "react";
import { cn } from "@/lib/utils";

type StepStatus = "complete" | "current" | "upcoming";

interface StepperProps {
    current: number;
    size?: "sm" | "md" | "lg";
    children: React.ReactElement<StepProps>[];
    className?: string;
}

interface StepProps {
    children: React.ReactNode;
    className?: string;
    status?: StepStatus;
    size?: string;
    index?: number;
}

interface StepIndicatorProps {
    status?: StepStatus;
    className?: string;
}

interface StepTitleProps {
    children: React.ReactNode;
    className?: string;
}

interface StepDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

// Stepper wrapper
export function Stepper({ current, children, size = "md", className }: StepperProps) {
    const stepSize = {
        sm: "h-3 w-3 text-sm",
        md: "h-4 w-4 text-base",
        lg: "h-5 w-5 text-lg",
    };

    return (
        <div className={cn("flex flex-col sm:flex-row sm:items-center gap-6", className)}>
            {React.Children.map(children, (child, index) => {
                if (!React.isValidElement<StepProps>(child)) return null;

                const status: StepStatus =
                    index < current ? "complete" : index === current ? "current" : "upcoming";

                return React.cloneElement(child, {
                    index,
                    status,
                    size: stepSize[size],
                });
            })}
        </div>
    );
}

// Each step
export function Step({
    children,
    className,
}: StepProps) {
    return (
        <div className={cn("flex items-start gap-3 sm:items-center", className)}>
            {children}
        </div>
    );
}

// Step indicator (circle)
export function StepIndicator({
    status = "upcoming",
    className,
}: StepIndicatorProps) {
    const baseStyle =
        "flex items-center justify-center rounded-full border transition-all";

    const statusStyle = {
        complete: "bg-green-500 border-green-500 text-white",
        current: "bg-blue-500 border-blue-500 text-white animate-pulse",
        upcoming: "bg-transparent border-white/30 text-white/30",
    };

    return (
        <div className={cn(baseStyle, statusStyle[status], "h-5 w-5 text-xs", className)}>
            {status === "complete" ? "✓" : ""}
        </div>
    );
}

// Step title
export function StepTitle({ children, className }: StepTitleProps) {
    return (
        <div className={cn("text-white font-semibold text-sm sm:text-base", className)}>
            {children}
        </div>
    );
}

// Step description
export function StepDescription({ children, className }: StepDescriptionProps) {
    return (
        <div className={cn("text-white/50 text-xs sm:text-sm", className)}>
            {children}
        </div>
    );
}
