// app/providers.tsx

import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from "@heroui/toast";
import { ReactNode } from "react";

type ProvidersProps = {
    children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
    return (
        <HeroUIProvider>
            <ToastProvider toastProps={{
                radius: "sm",
                variant: "flat",
            }} />
            {children}
        </HeroUIProvider>
    );
}
