import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Philosophy from "@/components/philosophy";
import Valores from "@/components/valores";
import Services from "@/components/services";
import ProjectShowcase from "@/components/project-showcase";
import Stats from "@/components/stats";
import Studio from "@/components/studio";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

// Secciones de Marcelo, insertadas al final antes del footer
import MarceObra from "@/components/sections/Obra";
import MarceProceso from "@/components/sections/Proceso";
import MarceHero from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Philosophy />
        <Valores />
        <Services />
        <ProjectShowcase />
        <Stats />
        <Studio />
        <Contact />
        <MarceObra />
        <MarceProceso />
        <MarceHero />
      </main>
      <Footer />
    </>
  );
}
