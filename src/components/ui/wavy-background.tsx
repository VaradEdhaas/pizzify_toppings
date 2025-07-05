"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { createNoise3D } from "simplex-noise";

interface WavyBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    colors?: string[];
    waveWidth?: number;
    backgroundFill?: string;
    blur?: number;
    speed?: "slow" | "fast";
    waveOpacity?: number;
}

export const WavyBackground: React.FC<WavyBackgroundProps> = ({
    children,
    className,
    containerClassName,
    colors,
    waveWidth,
    backgroundFill,
    blur = 10,
    speed = "fast",
    waveOpacity = 0.5,
    ...props
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const noise = createNoise3D();
    const [isSafari, setIsSafari] = useState(false);
    const animationIdRef = useRef<number>(0);

    let w = 0,
        h = 0,
        nt = 0;

    const getSpeed = () => {
        switch (speed) {
            case "slow":
                return 0.001;
            case "fast":
                return 0.002;
            default:
                return 0.001;
        }
    };

    const waveColors = colors ?? [
        "#38bdf8",
        "#818cf8",
        "#c084fc",
        "#e879f9",
        "#22d3ee",
    ];

    const drawWave = (
        ctx: CanvasRenderingContext2D,
        n: number,
        w: number,
        h: number
    ) => {
        nt += getSpeed();
        for (let i = 0; i < n; i++) {
            ctx.beginPath();
            ctx.lineWidth = waveWidth || 50;
            ctx.strokeStyle = waveColors[i % waveColors.length];
            for (let x = 0; x < w; x += 5) {
                const y = noise(x / 800, 0.3 * i, nt) * 100;
                ctx.lineTo(x, y + h * 0.5);
            }
            ctx.stroke();
            ctx.closePath();
        }
    };

    const render = (
        ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement
    ) => {
        ctx.fillStyle = backgroundFill || "black";
        ctx.globalAlpha = waveOpacity;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawWave(ctx, 5, canvas.width, canvas.height);
        animationIdRef.current = requestAnimationFrame(() =>
            render(ctx, canvas)
        );
    };

    const init = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        w = ctx.canvas.width = window.innerWidth;
        h = ctx.canvas.height = window.innerHeight;
        ctx.filter = `blur(${blur}px)`;
        nt = 0;

        render(ctx, canvas);

        window.onresize = () => {
            w = ctx.canvas.width = window.innerWidth;
            h = ctx.canvas.height = window.innerHeight;
            ctx.filter = `blur(${blur}px)`;
        };
    };

    useEffect(() => {
        init();
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, [blur, speed, waveOpacity]);

    useEffect(() => {
        setIsSafari(
            typeof window !== "undefined" &&
            navigator.userAgent.includes("Safari") &&
            !navigator.userAgent.includes("Chrome")
        );
    }, []);

    return (
        <div
            className={cn(
                "w-full flex flex-col items-center justify-center",
                containerClassName
            )}
        >
            <canvas
                className={cn(
                    "absolute inset-0 z-0",
                    isSafari && `blur-[${blur}px]`
                )}
                ref={canvasRef}
                id="canvas"
            />
            <div className={cn("relative z-10", className)} {...props}>
                {children}
            </div>
        </div>
    );
};
