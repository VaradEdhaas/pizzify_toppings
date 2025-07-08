"use client";

import * as React from "react"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import apiService from "@/helper/apiService";
import { toast } from "react-toastify";
import { Button } from "@heroui/react";
import { ModeToggle } from "../theme-toggle";

const navItems = [
  { name: "Menu", link: "/menu" },
  { name: "About", link: "/#about" },
  { name: "Reviews", link: "/#reviews" },
  { name: "Contact", link: "/#contact" },
];

export function ElegantNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [hasUser, setHasUser] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    setHasUser(!!storedUser);
  }, []);

  const handleLogout = async () => {
    try {
      await apiService.logoutUser();
      router.push("/login");
      toast.success("Logged out successfully. See you next time!")
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed.");
    } finally {
      setProfileMenuOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-8xl mx-auto px-4 py-2 flex items-center justify-between">
          <Link href="/" className="text-2xl font-extralight text-white tracking-[0.1em] hover:text-neutral-300 transition-colors duration-300">
            Pizzify
          </Link>

          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="text-neutral-400 hover:text-white transition-colors duration-300 font-light text-sm tracking-wide relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4 relative">
            <ModeToggle />
            <Button
              isIconOnly
              variant="light"
              className="rounded-full w-10 h-10 bg-white/10 text-white hover:bg-white/20"
              onPress={() => setProfileMenuOpen(!profileMenuOpen)}
            >
              <User className="h-5 w-5" />
            </Button>

            <AnimatePresence>
              {profileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-black/80 border border-white/10 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden"
                >
                  <Button
                    as={Link}
                    href="/profile"
                    fullWidth
                    variant="light"
                    className="justify-start text-white hover:bg-white/5"
                    onPress={() => setProfileMenuOpen(false)}
                  >
                    Profile
                  </Button>
                  <Button
                    as={Link}
                    href="/orders"
                    fullWidth
                    variant="light"
                    className="justify-start text-white hover:bg-white/5"
                    onPress={() => setProfileMenuOpen(false)}
                  >
                    Orders
                  </Button>
                  {hasUser ? (
                    <Button
                      fullWidth
                      variant="light"
                      className="justify-start text-white hover:bg-white/5"
                      onPress={handleLogout}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      as={Link}
                      href="/login"
                      fullWidth
                      variant="light"
                      className="justify-start text-white hover:bg-white/5"
                      onPress={() => setProfileMenuOpen(false)}
                    >
                      Login
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button
            isIconOnly
            variant="light"
            className="md:hidden text-white"
            onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 z-40 md:hidden"
          >
            <div className="px-8 py-8 space-y-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="block text-xl font-light text-neutral-400 hover:text-white transition-colors duration-300 tracking-wide"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div>
                <ModeToggle />
              </div>
              <div className="pt-6 border-t border-white/10 space-y-4">
                <Button
                  as={Link}
                  href="/profile"
                  variant="light"
                  className="w-full justify-start text-white text-xl font-light hover:bg-white/5"
                  onPress={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Button>
                <Button
                  as={Link}
                  href="/orders"
                  variant="light"
                  className="w-full justify-start text-white text-xl font-light hover:bg-white/5"
                  onPress={() => setMobileMenuOpen(false)}
                >
                  Orders
                </Button>
                {hasUser ? (
                  <Button
                    variant="light"
                    className="w-full justify-start text-white text-xl font-light hover:bg-white/5"
                    onPress={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    href="/login"
                    variant="light"
                    className="w-full justify-start text-white text-xl font-light hover:bg-white/5"
                    onPress={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
