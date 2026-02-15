import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { CalendarDays, House, Paintbrush } from "lucide-react";

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const [activeNav, setActiveNav] = useState("home");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "home", label: t("nav.home"), icon: House },
    { id: "services", label: t("nav.services"), icon: Paintbrush },
    { id: "appointment", label: t("nav.appointment"), icon: CalendarDays },
  ];

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    scrollToSection(id);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <button
          type="button"
          onClick={() => handleNavClick("home")}
          className="flex items-center"
          aria-label="Yusuf Nail Art logo"
        >
          <img
            src="/icon/logo-removebg.png"
            alt="Yusuf Nail Art"
            className="h-14 w-[240px] shrink-0 object-cover object-left sm:h-16 sm:w-[300px] md:h-20 md:w-[450px]"
            loading="eager"
          />
        </button>

        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 rounded-[20px] border border-border/70 bg-card/70 p-1 backdrop-blur-xl shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`group flex h-[44px] items-center justify-center gap-2 overflow-hidden rounded-[16px] border px-2.5 transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] ${
                    isActive
                      ? "w-[126px] border-primary/40 bg-primary text-primary-foreground"
                      : "w-[46px] border-transparent bg-background/75 text-foreground/70 hover:w-[126px] hover:border-primary/20 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span
                    className={`overflow-hidden whitespace-nowrap text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? "max-w-[84px] opacity-100 text-primary-foreground"
                        : "max-w-0 opacity-0 text-primary/85 group-hover:max-w-[84px] group-hover:opacity-100 group-hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 border-l border-border/70 pl-3">
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
      </div>
    </nav>
  );
};

export default Navigation;
