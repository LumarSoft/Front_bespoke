import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Estudio from "@/components/estudio";
import Metodo from "@/components/metodo";
import Proyectos from "@/components/proyectos";
import Contacto from "@/components/contacto";
import Footer from "@/components/footer";

/**
 * Los 4 ejes acordados con el cliente:
 *   Estudio · Método · Proyectos · Contacto
 * (Proyectos se abre a /proyectos/residencial y /proyectos/comercial.)
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Estudio />
        <Metodo />
        <Proyectos />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
