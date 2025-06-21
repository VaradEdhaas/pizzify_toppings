"use client";

import { useState, ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // <- import router
import apiService from "@/helper/apiService";
import { toast } from "react-toastify";

const sidebarItems = [
    { label: "Dashboard" },
    { label: "Users" },
    { label: "Orders" },
    { label: "Products" },
    { label: "Logout" },
];

export default function AdminDashboard({ children }: { children?: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string>("Dashboard");
    const router = useRouter();

    const handleMenuClick = async (label: string) => {
        if (label === "Logout") {
            try {
                await apiService.logoutUser();
                await toast.success("Logged out successfully. See you next time!")
                router.push("/login");

            } catch (error) {
                console.error("Error during logout:", error);
            }
        } else {
            setSelectedItem(label);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
        backdrop-blur-md bg-black/40 border-r border-white/20 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between h-16 px-6 border-b border-white/20">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="lg:hidden text-white"
                        onPress={() => setSidebarOpen(false)}
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="mt-8 space-y-1">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleMenuClick(item.label)}
                            className={`block w-full text-left px-6 py-3 transition-colors ${selectedItem === item.label ? "bg-white/10" : "hover:bg-white/5"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top header */}
                <header className="flex items-center h-16 border-b border-white/20 px-4 lg:hidden">
                    <Button variant="ghost" size="sm" onPress={() => setSidebarOpen(true)}>
                        <Menu className="h-5 w-5" />
                    </Button>
                    <h2 className="ml-2 text-lg font-medium">{selectedItem}</h2>
                </header>

                {/* Body content */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
