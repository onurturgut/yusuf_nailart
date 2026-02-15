import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Paintbrush, Gem, Hand, Palette } from "lucide-react";

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Hand,
      titleKey: "services.prostheticNails.title",
      descriptionKey: "services.prostheticNails.description",
      gradient: "from-nail-lavender to-nail-pink",
      image: "/our_services/protez_t%C4%B1rnak.webp",
    },
    {
      icon: Gem,
      titleKey: "services.gelNails.title",
      descriptionKey: "services.gelNails.description",
      gradient: "from-nail-pink to-nail-rose",
      image: "/our_services/jel%20t%C4%B1rnak.jpg",
    },
    {
      icon: Paintbrush,
      titleKey: "services.manicurePedicure.title",
      descriptionKey: "services.manicurePedicure.description",
      gradient: "from-nail-peach to-nail-cream",
      image: "/our_services/manik%C3%BCr.jpg",
    },
    {
      icon: Palette,
      titleKey: "services.nailArt.title",
      descriptionKey: "services.nailArt.description",
      gradient: "from-nail-rose to-nail-lavender",
      image: "/our_services/kal%C4%B1c%C4%B1_oje1.png",
    },
  ];

  return (
    <section id="services" className="py-20 bg-muted/30 lg:h-full">
      <div className="container mx-auto px-4 lg:flex lg:h-full lg:flex-col">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {t("services.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:flex-1 lg:auto-rows-fr">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group h-full overflow-hidden border-none transition-all duration-300 hover:shadow-xl"
            >
              <div className={`h-2 bg-gradient-to-r ${service.gradient}`} />
              {service.image ? (
                <div className="relative h-52 w-full overflow-hidden md:h-56 group/image">
                  <img
                    src={service.image}
                    alt={t(service.titleKey)}
                    className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover/image:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                  <h3 className="absolute bottom-3 left-3 text-xl font-serif font-semibold text-white drop-shadow-sm">
                    {t(service.titleKey)}
                  </h3>
                </div>
              ) : null}
              {!service.image ? (
                <CardHeader className="text-center pt-8">
                  <div className="mx-auto mb-4 p-4 bg-nail-pink/30 rounded-full w-fit group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-serif">
                    {t(service.titleKey)}
                  </CardTitle>
                </CardHeader>
              ) : null}
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
