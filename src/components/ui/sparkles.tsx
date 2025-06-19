"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import { loadFull } from "tsparticles"
import type { Container, Engine } from "tsparticles-engine"
import Particles from "react-tsparticles"

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
  background = "#0d47a1",
  minSize = 1,
  maxSize = 3,
  particleDensity = 120,
  particleColor = "#FFF",
}) => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    if (init) {
      return
    }

    setInit(true)
  }, [init])

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // particles loaded
  }, [])

  return (
    <Particles
      className={className}
      id={id}
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: background,
          },
        },
        fullScreen: {
          enable: false,
          zIndex: 1,
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: particleColor,
          },
          links: {
            color: particleColor,
            distance: 150,
            enable: false,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: particleDensity,
          },
          opacity: {
            value: 0.5,
            random: {
              enable: true,
              minimumValue: 0.1,
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0,
              sync: false,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: minSize, max: maxSize },
            random: {
              enable: true,
              minimumValue: 1,
            },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0,
              sync: false,
            },
          },
        },
        detectRetina: true,
      }}
    />
  )
}
