import { Preloader } from "@/components/ui/preloader";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SiteHeader } from "@/features/landing/components/site-header";
import { Hero } from "@/features/landing/components/hero";
import { About } from "@/features/landing/components/about";
import { Services } from "@/features/landing/components/services";
import { Approach } from "@/features/landing/components/approach";
import { FeaturedProject } from "@/features/landing/components/featured-project";
import { Portfolio } from "@/features/landing/components/portfolio";
import { Contact } from "@/features/landing/components/contact";
import { SiteFooter } from "@/features/landing/components/site-footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Approach />
        <FeaturedProject />
        <Portfolio />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
