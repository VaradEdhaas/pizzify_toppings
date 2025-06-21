"use client";

import { ElegantHero } from "@/components/elegant-hero"
import { RefinedFeatures } from "@/components/refined-features"
import { SophisticatedMenu } from "@/components/sophisticated-menu"
import { MinimalTestimonials } from "@/components/minimal-testimonials"
import { ElegantCTA } from "@/components/elegant-cta"
import { SophisticatedFooter } from "@/components/sophisticated-footer"
import { useAuth } from "@/components/context/AuthContext"
import dynamic from "next/dynamic";
const AdminDashboard = dynamic(() => import("../app/admin/AdminDashboard"), {
  ssr: false,
});

export default function HomePage() {

  const { currentUser } = useAuth();
  const role = currentUser?.user?.role;

  return role === "admin" ? (
    <AdminDashboard>
      <h1 className="text-2xl font-bold">Welcome to the admin dashboard</h1>
    </AdminDashboard>
  ) : (
    <main className="min-h-screen bg-black">
      <ElegantHero />
      <RefinedFeatures />
      <SophisticatedMenu />
      <MinimalTestimonials />
      <ElegantCTA />
      <SophisticatedFooter />
    </main>
  )
}
