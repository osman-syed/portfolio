import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import AIWork from "@/components/sections/AIWork";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <AIWork />
      <Projects />
      <Stack />
      <Timeline />
      <Contact />
    </main>
  );
}
