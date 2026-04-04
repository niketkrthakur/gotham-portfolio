import { useState } from "react";
import EntryScreen from "@/components/EntryScreen";
import BatCursor from "@/components/BatCursor";
import FogEffect from "@/components/FogEffect";
import RainEffect from "@/components/RainEffect";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OriginSection from "@/components/OriginSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <BatCursor />
      <EntryScreen isVisible={!entered} onEnter={() => setEntered(true)} />

      {entered && (
        <>
          <FogEffect />
          <RainEffect />
          <Navbar />
          <main className="relative z-10">
            <HeroSection />
            <OriginSection />
            <SkillsSection />
            <ProjectsSection />
            <ResumeSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Index;
