"use client";

import { AuthProvider } from "@/components/context/AuthContext";
import ToastProvider from "./ToastProvider";
import GlobalSpinner from "@/components/GlobalSpinner";
import RazorpayScriptLoader from "@/components/RazorpayScriptLoader";
import AppClientWrapper from "./ShowElegantNav";
import { ReactNode } from "react";
import ReactQueryProvider from "./ReactQueryProvider";
import { HeroUIProvider } from "@heroui/react";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <HeroUIProvider>
      <AuthProvider>
        <ReactQueryProvider>
          <ToastProvider>
            {/* <GlobalSpinner /> */}
            <RazorpayScriptLoader />
            <AppClientWrapper>
              {children}
            </AppClientWrapper>
          </ToastProvider>
        </ReactQueryProvider>
      </AuthProvider>
    </HeroUIProvider>
  );
}
