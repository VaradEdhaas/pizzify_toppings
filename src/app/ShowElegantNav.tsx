"use client";

import { useAuth } from "@/components/context/AuthContext";
import { ElegantNav } from "@/components/ui/elegant-nav";

export default function AppClientWrapper({ children }: { children: React.ReactNode }) {
    const { currentUser } = useAuth();
    const role = currentUser?.user?.role;

    return (
        <>
            {role !== "admin" && <ElegantNav />}
            {children}
        </>
    );
}
