import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <div className="px-2 md:px-0 space-y-4 md:space-y-8 w-full ">
      <Hero/>
      <Projects />
      <Footer />
    </div>
  );
}
