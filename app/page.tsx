import Hero from "@/components/sections/Hero";
import Estudio from "@/components/sections/Estudio";
import Obra from "@/components/sections/Obra";
import Servicios from "@/components/sections/Servicios";
import Portfolio from "@/components/sections/Portfolio";
import Proceso from "@/components/sections/Proceso";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Estudio />
      <Obra />
      <Servicios />
      <Portfolio />
      <Proceso />
      <CTA />
      <Footer />
    </>
  );
}
