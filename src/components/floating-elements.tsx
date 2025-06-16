"use client"

import { useEffect, useRef } from "react"

export function FloatingElements() {
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

    const elements: Array<{
      x: number
      y: number
      size: number
      vx: number
      vy: number
      opacity: number
      rotation: number
      rotationSpeed: number
    }> = []

    // Create floating elements
    for (let i = 0; i < 8; i++) {
      elements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 40 + 20,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.03 + 0.01,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      elements.forEach((element) => {
        // Update position
        element.x += element.vx
        element.y += element.vy
        element.rotation += element.rotationSpeed

        // Wrap around screen
        if (element.x > canvas.width + element.size) element.x = -element.size
        if (element.x < -element.size) element.x = canvas.width + element.size
        if (element.y > canvas.height + element.size) element.y = -element.size
        if (element.y < -element.size) element.y = canvas.height + element.size

        // Draw element
        ctx.save()
        ctx.translate(element.x, element.y)
        ctx.rotate(element.rotation)

        // Draw a subtle square
        ctx.strokeStyle = `rgba(255, 255, 255, ${element.opacity})`
        ctx.fillStyle = `rgba(255, 255, 255, ${element.opacity * 0.1})`
        ctx.lineWidth = 1

        ctx.strokeRect(-element.size / 2, -element.size / 2, element.size, element.size)
        ctx.fillRect(-element.size / 2, -element.size / 2, element.size, element.size)

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
