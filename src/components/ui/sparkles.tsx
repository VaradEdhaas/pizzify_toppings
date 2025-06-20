"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface SparklesCoreProps {
  id: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  particleColor?: string
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  id,
  className,
  background = "transparent",
  minSize = 1,
  maxSize = 3,
  particleDensity = 120,
  particleColor = "#FFF",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      twinkle: number
    }> = []

    // Create particles
    for (let i = 0; i < particleDensity; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * (maxSize - minSize) + minSize,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.twinkle += 0.02

        // Wrap around screen
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        // Calculate twinkling opacity
        const twinkleOpacity = particle.opacity * (0.5 + 0.5 * Math.sin(particle.twinkle))

        // Draw particle
        ctx.fillStyle = `${particleColor}${Math.floor(twinkleOpacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Add subtle glow effect
        if (particle.size > 2) {
          ctx.fillStyle = `${particleColor}${Math.floor(twinkleOpacity * 0.3 * 255)
            .toString(16)
            .padStart(2, "0")}`
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [minSize, maxSize, particleDensity, particleColor])

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{
        background: background,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  )
}
