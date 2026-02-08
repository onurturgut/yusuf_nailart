import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Paintbrush, Gem, Hand, Palette } from "lucide-react";

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Gem,
      titleKey: "services.gelNails.title",
      descriptionKey: "services.gelNails.description",
      gradient: "from-nail-pink to-nail-rose",
    },
    {
      icon: Hand,
      titleKey: "services.prostheticNails.title",
      descriptionKey: "services.prostheticNails.description",
      gradient: "from-nail-lavender to-nail-pink",
    },
    {
      icon: Paintbrush,
      titleKey: "services.manicurePedicure.title",
      descriptionKey: "services.manicurePedicure.description",
      gradient: "from-nail-peach to-nail-cream",
    },
    {
      icon: Palette,
      titleKey: "services.nailArt.title",
      descriptionKey: "services.nailArt.description",
      gradient: "from-nail-rose to-nail-lavender",
    },
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {t("services.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-none overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${service.gradient}`} />
              <CardHeader className="text-center pt-8">
                <div className="mx-auto mb-4 p-4 bg-nail-pink/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-serif">
                  {t(service.titleKey)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  {t(service.descriptionKey)}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
