// src/app/admin/ClientAdminLayout.client.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LogOut, TrendingUp, User, Archive } from "lucide-react";
import { toast } from "react-toastify";
import apiService from "@/helper/apiService";
import { Button } from "@heroui/react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { SparklesCore } from "@/components/ui/sparkles";

const sidebarItems = [
    { key: "/admin/dashboard", label: "Dashboard", icon: <TrendingUp className="mr-2 w-4 h-4" /> },
    { key: "/admin/user", label: "Users", icon: <User className="mr-2 w-4 h-4" /> },
    { key: "/admin/products", label: "Products", icon: <Archive className="mr-2 w-4 h-4" /> },
];

const floatingShapes = [
    { key: "shape1", x: 100, y: 200, rotate: 0, duration: 6, delay: 0 },
    { key: "shape2", x: 300, y: 150, rotate: 45, duration: 8, delay: 1 },
    { key: "shape3", x: 500, y: 250, rotate: 90, duration: 7, delay: 0.5 },
];

export default function ClientAdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(pathname);

    useEffect(() => {
        setActiveTab(pathname);
    }, [pathname]);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        router.push(value);
    };

    const handleLogout = async () => {
        await apiService.logoutUser();
        toast.success("Logged out");
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-black relative overflow-hidden text-white">
            {/* Background Effects */}
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
            <Spotlight className="top-10 left-full h-[80vh] w-[50vw]" fill="purple" />
            <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />

            <BackgroundBeamsWithCollision>
                {/* Sparkles Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <SparklesCore
                        id="tsparticlesfullpage"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={80}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                </div>

                {/* Floating Geometric Shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {floatingShapes.map((shape) => (
                        <motion.div
                            key={shape.key}
                            className="absolute w-32 h-32 border border-white/[0.03] rounded-2xl"
                            initial={{ x: shape.x, y: shape.y, rotate: shape.rotate }}
                            animate={{
                                y: [shape.y, shape.y - 100, shape.y],
                                rotate: [shape.rotate, shape.rotate + 360],
                                opacity: [0.1, 0.3, 0.1],
                            }}
                            transition={{
                                duration: shape.duration,
                                repeat: Infinity,
                                delay: shape.delay,
                            }}
                        />
                    ))}
                </div>

                {/* Main Layout */}
                <div className="min-h-screen flex flex-col relative z-10">
                    {/* Top Navigation Tabs */}
                    <header className="w-full py-4 border-b border-white/10 flex justify-between items-center px-6">
                        <Tabs value={activeTab} onValueChange={handleTabChange}>
                            <TabsList className="flex space-x-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl p-1">
                                {sidebarItems.map(({ key, label, icon }) => (
                                    <TabsTrigger
                                        key={key}
                                        value={key}
                                        className="flex items-center px-4 py-2 rounded-xl text-white/60 hover:text-white data-[state=active]:bg-white data-[state=active]:text-black"
                                    >
                                        {icon}
                                        {label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>

                        <Button
                            color="danger"
                            variant="flat"
                            onPress={handleLogout}
                            startContent={<LogOut className="w-4 h-4" />}
                        >
                            Logout
                        </Button>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </BackgroundBeamsWithCollision>
        </div>
    );
}
