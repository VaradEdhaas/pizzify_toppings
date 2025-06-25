"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative min-h-screen w-full text-white px-6 py-16 overflow-hidden bg-black">
      {/* White Dot Grid on Black Background */}
      {mounted && (
        <>
          <div
            className={cn(
              "absolute inset-0 z-0",
              "[background-size:20px_20px]",
              "[background-image:radial-gradient(white_1px,transparent_1px)]"
            )}
          />
          <div className="pointer-events-none absolute inset-0 z-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </>
      )}

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition duration-300 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm tracking-wide">Back to Home</span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight bg-gradient-to-r from-white to-white/30 bg-clip-text text-transparent">
          {title}
        </h1>

        <article className="prose prose-invert prose-sm md:prose-base lg:prose-lg max-w-none text-white/80">
          {children}
        </article>
      </div>
    </main>
  );
}
