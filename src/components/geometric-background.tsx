"use client"

import { useEffect, useRef } from "react"

export function GeometricBackground() {
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

    const shapes: Array<{
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      opacity: number
      type: "circle" | "square" | "triangle"
    }> = []

    // Create geometric shapes
    for (let i = 0; i < 15; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 60 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        opacity: Math.random() * 0.05 + 0.01,
        type: ["circle", "square", "triangle"][Math.floor(Math.random() * 3)] as "circle" | "square" | "triangle",
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      shapes.forEach((shape) => {
        shape.rotation += shape.rotationSpeed

        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.rotation)
        ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity})`
        ctx.lineWidth = 1
        ctx.fillStyle = `rgba(255, 255, 255, ${shape.opacity * 0.1})`

        switch (shape.type) {
          case "circle":
            ctx.beginPath()
            ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2)
            ctx.stroke()
            ctx.fill()
            break
          case "square":
            ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
            ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
            break
          case "triangle":
            ctx.beginPath()
            ctx.moveTo(0, -shape.size / 2)
            ctx.lineTo(-shape.size / 2, shape.size / 2)
            ctx.lineTo(shape.size / 2, shape.size / 2)
            ctx.closePath()
            ctx.stroke()
            ctx.fill()
            break
        }

        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
}
