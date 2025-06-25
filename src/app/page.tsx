"use client";

import { useAuth } from "@/components/context/AuthContext";
import { useEffect, useState } from "react";
import { ElegantHero } from "@/components/elegant-hero";
import { RefinedFeatures } from "@/components/refined-features";
import { SophisticatedMenu } from "@/components/sophisticated-menu";
import { MinimalTestimonials } from "@/components/minimal-testimonials";
import { ElegantCTA } from "@/components/elegant-cta";
import { SophisticatedFooter } from "@/components/sophisticated-footer";
import AdminLayout from "./admin/layout";
import Userpage from "./admin/user/page";
import Productpage from "./admin/products/page";
import Dashboardpage from "./admin/dashboard/page";

export default function HomePage() {
  const { currentUser } = useAuth();
  const role = currentUser?.user?.role;

  const [selectedPage, setSelectedPage] = useState("Dashboard");

  if (role === "admin") {
    const getPageComponent = () => {
      switch (selectedPage) {
        case "Dashboard":
          return <Dashboardpage />;
        case "Users":
          return <Userpage />;
        case "Products":
          return <Productpage />;
        default:
          return <Dashboardpage />;
      }
    };

    return (
      <AdminLayout selected={selectedPage} onSelect={setSelectedPage}>
        {getPageComponent()}
      </AdminLayout>
    );
  }

  // For non-admin users
  return (
    <main className="min-h-screen bg-black">
      <ElegantHero />
      <div id="about"><RefinedFeatures /></div>
      <SophisticatedMenu />
      <div id="reviews"><MinimalTestimonials /></div>
      <ElegantCTA />
      <div id="contact"><SophisticatedFooter /></div>
    </main>
  );
}
