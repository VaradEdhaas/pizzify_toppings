"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType
    containerClassName?: string
    className?: string
    duration?: number
    clockwise?: boolean
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false)

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setHovered(true)
  }

  const variants = {
    initial: {
      x: "-50%",
      y: "-50%",
    },
    visible: {
      x: "-50%",
      y: "-50%",
      transition: {
        duration,
      },
    },
  }

  return (
    <Tag
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
        containerClassName,
      )}
      {...props}
    >
      <div className={cn("w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]", className)}>
        {children}
      </div>

      <motion.div
        className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial="initial"
        animate={hovered ? "visible" : "initial"}
        variants={variants}
      >
        <motion.div
          style={{
            background: `conic-gradient(from 0deg at 50% 50%, #E2CBFF 0deg, #393BB2 120deg, #E2CBFF 360deg)`,
          }}
          className="absolute inset-0 z-0 rounded-[inherit]"
          animate={{
            rotate: clockwise ? 360 : -360,
          }}
          transition={{
            duration,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </motion.div>

      <div className="bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]" />
    </Tag>
  )
}
