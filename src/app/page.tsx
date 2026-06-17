import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { QuoteBand } from "@/components/QuoteBand";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { Education } from "@/components/Education";
import { Volunteering } from "@/components/Volunteering";
import { Awards } from "@/components/Awards";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <QuoteBand index={0} />
        <Experience />
        <Projects />
        <QuoteBand index={1} />
        <Education />
        <Certifications />
        <Volunteering />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
