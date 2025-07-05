"use client";

import { useAuth } from "@/components/context/AuthContext";
import { ElegantNav } from "@/components/ui/elegant-nav";
import { usePathname } from "next/navigation";

export default function AppClientWrapper({ children }: { children: React.ReactNode }) {
    const { currentUser } = useAuth();
    const pathname = usePathname();

    const hideNavPaths = ["/login", "/signup", "/admin/products", "/admin/user", "/admin/dashboard"];
    const shouldHideNav = hideNavPaths.includes(pathname);

    const role = currentUser?.user?.role;

    return (
        <>
            {!shouldHideNav && role !== "admin" && <ElegantNav />}
            {children}
        </>
    );
}
