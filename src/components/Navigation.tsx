import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold text-primary">
            Yusuf Nail Art
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("home")}
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            {t("nav.home")}
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            {t("nav.services")}
          </button>
          <button
            onClick={() => scrollToSection("appointment")}
            className="text-foreground/80 hover:text-primary transition-colors"
          >
            {t("nav.appointment")}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={language === "tr" ? "default" : "outline"}
            size="sm"
            onClick={() => setLanguage("tr")}
            className="text-xs"
          >
            TR
          </Button>
          <Button
            variant={language === "en" ? "default" : "outline"}
            size="sm"
            onClick={() => setLanguage("en")}
            className="text-xs"
          >
            EN
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
