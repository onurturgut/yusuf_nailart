import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToAppointment = () => {
    const element = document.getElementById("appointment");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-nail-pink/20 via-background to-nail-lavender/20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-nail-rose/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-nail-peach/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-nail-pink/50 rounded-full">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-4">
          {t("hero.title")}
        </h1>

        <p className="text-xl md:text-2xl text-primary font-medium mb-4">
          {t("hero.subtitle")}
        </p>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          {t("hero.description")}
        </p>

        <Button
          size="lg"
          onClick={scrollToAppointment}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          {t("hero.cta")}
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
