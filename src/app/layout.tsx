import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextUIProvider } from "@nextui-org/react"
import "./globals.css"
import { AuthProvider } from "@/components/context/AuthContext"
import ReactQueryProvider from "./ReactQueryProvider"
import ToastProvider from "./ToastProvider"
import { HeroUIProvider } from "@heroui/react";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pizzify - Premium Pizza Experience",
  description: "Artisanal pizza crafted with premium ingredients",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <HeroUIProvider>
          <NextUIProvider>
            <AuthProvider>
              <ReactQueryProvider>
                <ToastProvider>
                  {children}
                </ToastProvider>
              </ReactQueryProvider>
            </AuthProvider>
          </NextUIProvider>
        </HeroUIProvider>
      </body>
    </html>
  )
}
