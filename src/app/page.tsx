"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import { useTheme } from "next-themes";

export default function Home() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <div className="relative w-full space-y-4 md:space-y-8">
      {/* Background covering all content except footer */}
      <div className={`absolute inset-0 w-full ${isDark ? "bg-[url('/assets/bg-dark.svg')] bg-cover bg-center" : "bg-[url('/assets/bg-light.svg')] bg-cover bg-center"}`}></div>

      {/* Content sections */}
      <div className="relative z-10 px-2 md:px-0">
        <Header />
        <Hero />
      </div>

      <div className="relative z-10 px-2 md:px-0 glass-element">
        <Projects />
      </div>

      {/* Footer without background */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
