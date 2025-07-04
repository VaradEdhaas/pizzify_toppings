"use client";

import { ReactNode, useEffect, useState } from "react";
import { Spotlight } from "../ui/spotlight";
import { SparklesCore } from "../ui/sparkles";
import { BackgroundBeamsWithCollision } from "../ui/background-beams-with-collision";
import { motion } from "framer-motion";

interface DynamicBackgroundWrapperProps {
    children: ReactNode;
    spotlights?: {
        className: string;
        fill: string;
    }[];
    enableSparkles?: boolean;
    enableFloatingShapes?: boolean;
}

export const DynamicBackgroundWrapper = ({
    children,
    spotlights = [
        { className: "-top-40 left-0 md:left-60 md:-top-20", fill: "white" },
        { className: "top-10 left-full h-[80vh] w-[50vw]", fill: "purple" },
        { className: "top-28 left-80 h-[80vh] w-[50vw]", fill: "blue" },
    ],
    enableSparkles = true,
    enableFloatingShapes = true,
}: DynamicBackgroundWrapperProps) => {
    const [floatingShapes, setFloatingShapes] = useState<
        { key: string; x: number; y: number; rotate: number; duration: number; delay: number }[]
    >([]);

    useEffect(() => {
        if (typeof window !== "undefined" && enableFloatingShapes) {
            const shapes = Array.from({ length: 8 }, (_, i) => ({
                key: `floating-shape-${i}`,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                rotate: Math.random() * 360,
                duration: Math.random() * 20 + 15,
                delay: Math.random() * 5,
            }));
            setFloatingShapes(shapes);
        }
    }, [enableFloatingShapes]);

    return (
        <div className="relative min-h-screen bg-black overflow-hidden">
            {/* Spotlights */}
            {spotlights.map((s, i) => (
                <Spotlight key={i} className={s.className} fill={s.fill} />
            ))}

            <BackgroundBeamsWithCollision>
                {/* Sparkles */}
                {enableSparkles && (
                    <div className="absolute inset-0">
                        <SparklesCore
                            id="tsparticles-dynamic"
                            background="transparent"
                            minSize={0.6}
                            maxSize={1.4}
                            particleDensity={80}
                            className="w-full h-full"
                            particleColor="#FFFFFF"
                        />
                    </div>
                )}

                {/* Floating shapes */}
                {enableFloatingShapes && (
                    <div className="absolute inset-0 overflow-hidden">
                        {floatingShapes.map((shape) => (
                            <motion.div
                                key={shape.key}
                                className="absolute w-32 h-32 border border-white/[0.03] rounded-2xl"
                                initial={{ x: shape.x, y: shape.y, rotate: shape.rotate }}
                                animate={{
                                    y: [shape.y, shape.y - 100],
                                    rotate: [shape.rotate, shape.rotate + 360],
                                    opacity: [0.1, 0.3, 0.1],
                                }}
                                transition={{
                                    duration: shape.duration,
                                    repeat: Infinity,
                                    delay: shape.delay,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Page content */}
                {children}
            </BackgroundBeamsWithCollision>
        </div>
    );
};
