"use client";

import { AuthProvider } from "@/components/context/AuthContext";
import ToastProvider from "./ToastProvider";
import RazorpayScriptLoader from "@/components/RazorpayScriptLoader";
import AppClientWrapper from "./ShowElegantNav";
import { ReactNode } from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "@/components/theme-provider";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <AuthProvider>
        <ReactQueryProvider>
          <ToastProvider>
            <RazorpayScriptLoader />
            <AppClientWrapper>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </AppClientWrapper>
          </ToastProvider>
        </ReactQueryProvider>
      </AuthProvider>
    </HeroUIProvider>
  );
}
