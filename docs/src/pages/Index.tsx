import { Navigation } from "@/components/Navigation";
import { LanguageTranslator } from "@/components/LanguageTranslator";
import { HeroSection } from "@/components/HeroSection";
import { PhotoAnalysis } from "@/components/PhotoAnalysis";
import { SkinEncyclopedia } from "@/components/SkinEncyclopedia";
import { SkinGame } from "@/components/SkinGame";
import { BlogAndForum } from "@/components/BlogAndForum";
import { ProgressAndCalendar } from "@/components/ProgressAndCalendar";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <LanguageTranslator />
      <HeroSection />
      <PhotoAnalysis />
      <SkinEncyclopedia />
      <ProgressAndCalendar />
      <SkinGame />
      <BlogAndForum />
      <Footer />
    </div>
  );
};

export default Index;
