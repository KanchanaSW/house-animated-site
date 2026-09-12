import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import HeroFallback from "@/components/HeroFallback";
import Footer from "@/components/Footer";

const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

const ExplodedComponents = dynamic(
  () => import("@/components/ExplodedComponents"),
);

const Specs = dynamic(() => import("@/components/Specs"));

const CTA = dynamic(() => import("@/components/CTA"));

export default function HomePage() {
  return (
    <main id="top" className="w-full max-w-full overflow-x-hidden">
      <Nav />
      <Hero />
      <ExplodedComponents />
      <Specs />
      <CTA />
      <Footer />
    </main>
  );
}
