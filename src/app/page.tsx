import { getSiteContent } from "@/lib/server-content";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Credentials } from "@/components/sections/Credentials";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Projects } from "@/components/sections/Projects";
import { News } from "@/components/sections/News";
import { WhyUs } from "@/components/sections/WhyUs";
import { CtaBand } from "@/components/sections/CtaBand";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const content = getSiteContent();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar content={content.nav} wordmark={content.footer.wordmark} />
      <main id="main-content" className="flex-grow">
        <Hero content={content.hero} />
        <Credentials content={content.credentials} />
        <Services content={content.services} />
        <Stats content={content.stats} />
        <Projects content={content.projects} />
        <News content={content.news} />
        <WhyUs content={content.whyUs} />
        <CtaBand content={content.ctaBand} />
        <Contact content={content.contact} careers={content.careers} />
      </main>
      <Footer content={content.footer} contactInfo={content.contact.info} />
    </div>
  );
}
