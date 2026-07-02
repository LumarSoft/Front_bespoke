import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Philosophy from "@/components/philosophy";
import Services from "@/components/services";
import ProjectShowcase from "@/components/project-showcase";
import Stats from "@/components/stats";
import Studio from "@/components/studio";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Philosophy />
        <Services />
        <ProjectShowcase />
        <Stats />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
