import Navbar from "@/sections/Navbar";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Priorities from "@/sections/Priorities";
import Vision from "@/sections/Vision";
import Endorsements from "@/sections/Endorsements";
import News from "@/sections/News";
import Events from "@/sections/Events";
import Donate from "@/sections/Donate";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <About />
        <Priorities />
        <Vision />
        <Endorsements />
        <News />
        <Events />
        <Donate />
      </main>
      <Footer />
    </>
  );
}
