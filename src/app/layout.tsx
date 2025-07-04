import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/context/AuthContext"
import ReactQueryProvider from "./ReactQueryProvider"
import ToastProvider from "./ToastProvider"
import { HeroUIProvider } from "@heroui/react";
import GlobalSpinner from "@/components/GlobalSpinner"
import RazorpayScriptLoader from "@/components/RazorpayScriptLoader"
import AppClientWrapper from "./ShowElegantNav"

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
          <AuthProvider>
            <ReactQueryProvider>
              <ToastProvider>
                <GlobalSpinner />
                <RazorpayScriptLoader />
                <AppClientWrapper>
                  {children}
                </AppClientWrapper>
              </ToastProvider>
            </ReactQueryProvider>
          </AuthProvider>
        </HeroUIProvider>
      </body>
    </html>
  )
}
