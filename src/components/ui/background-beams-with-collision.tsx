"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export const BackgroundBeamsWithCollision = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [beams, setBeams] = useState<
    Array<{
      id: number
      x: number
      y: number
      angle: number
      speed: number
      length: number
      color: string
    }>
  >([])

  useEffect(() => {
    const createBeam = () => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 2 + 1,
      length: Math.random() * 200 + 100,
      color: ["#3B82F6", "#8B5CF6", "#EF4444", "#10B981", "#F59E0B"][Math.floor(Math.random() * 5)],
    })

    const initialBeams = Array.from({ length: 8 }, createBeam)
    setBeams(initialBeams)

    const interval = setInterval(() => {
      setBeams((prev) =>
        prev
          .map((beam) => ({
            ...beam,
            x: beam.x + Math.cos(beam.angle) * beam.speed,
            y: beam.y + Math.sin(beam.angle) * beam.speed,
          }))
          .filter(
            (beam) =>
              beam.x > -beam.length &&
              beam.x < window.innerWidth + beam.length &&
              beam.y > -beam.length &&
              beam.y < window.innerHeight + beam.length,
          )
          .concat(Array.from({ length: Math.max(0, 8 - prev.length) }, createBeam)),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* Animated Beams */}
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute pointer-events-none"
          style={{
            left: beam.x,
            top: beam.y,
            width: beam.length,
            height: 2,
            background: `linear-gradient(90deg, ${beam.color}00, ${beam.color}80, ${beam.color}00)`,
            transform: `rotate(${beam.angle}rad)`,
            transformOrigin: "left center",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {children}
    </div>
  )
}
