"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering theme-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="relative w-full space-y-4 md:space-y-8">
      {/* Background covering all content except footer */}
      <div
        className={`absolute inset-0 w-full bg-cover bg-center ${mounted
            ? isDark
              ? "bg-[url('/assets/bg-dark.svg')]"
              : "bg-[url('/assets/bg-light.svg')]"
            : "bg-[url('/assets/bg-light.svg')]" // Default to light theme during SSR
          }`}
      ></div>

      {/* Content sections */}
      {/* <div className="relative z-10 px-2 md:px-0">
        <Header />
        <Hero />
      </div>

      <div className="relative z-10 px-2 md:px-0 glass-element">
        <Projects />
      </div> */}

      {/* Footer without background */}
      {/* <div className="relative z-10">
        <Footer />
      </div> */}

      <div className="relative z-20">
        <Header />
        <main className="px-2 md:px-0">
          <Hero />
          <div className="glass-element px-2 md:px-0">
            <Projects />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
