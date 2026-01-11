import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import FeaturedProjects from "@/components/FeaturedProjects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <Skills />
      <FeaturedProjects />
      <Contact />
    </main>
  );
}
