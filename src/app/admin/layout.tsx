"use client";

import apiService from "@/helper/apiService";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { label: "Dashboard", path: "/admin" },
  { label: "Users", path: "/admin/user" },
  { label: "Products", path: "/admin/products" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await apiService.logoutUser();
    toast.success("Logged out");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col justify-between border-r border-white/20 bg-black/40">
        <div>
          <div className="px-6 py-4 font-bold text-xl border-b border-white/20">Pizzify Admin</div>
          <nav className="mt-4 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => router.push(item.path)}
                className={`w-full text-left px-6 py-3 transition ${pathname === item.path ? "bg-white/10" : "hover:bg-white/5"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          <Button
            variant="flat"
            color="primary"
            className="w-full"
            onPress={handleLogout}
            startContent={<LogOut size={18} />}
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
