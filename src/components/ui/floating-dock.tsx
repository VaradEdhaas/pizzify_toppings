"use client"

import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { useRef } from "react"

export const FloatingDock = ({
  items,
  className,
}: {
  items: { title: string; icon: string; href: string }[]
  className?: string
}) => {
  return (
    <div
      className={cn(
        "mx-auto flex h-16 items-end gap-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/20 px-4 pb-3",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer key={item.title} {...item} />
      ))}
    </div>
  )
}

function IconContainer({
  title,
  icon,
  href,
}: {
  title: string
  icon: string
  href: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const distance = useMotionValue(0)
  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40])

  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20])

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseMove={(e) => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            distance.set(e.clientX - centerX)
          }
        }}
        onMouseLeave={() => distance.set(0)}
        className="aspect-square rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center relative group hover:bg-white/20 transition-colors duration-300"
      >
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center text-2xl"
        >
          {icon}
        </motion.div>
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-xl text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {title}
        </div>
      </motion.div>
    </Link>
  )
}
