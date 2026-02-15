import { useEffect, useState } from "react";
import { Bodoni_Moda } from "next/font/google";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

const heroTitleFont = Bodoni_Moda({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["600", "700"],
  display: "swap",
});

const HeroSection = () => {
  const { t } = useLanguage();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const heroImages = [
    "/images/nail_art8.jpeg",
    "/images/jel%20t%C4%B1rnak.jpg",
    "/images/manik%C3%BCr.jpg",
    "/images/protez_t%C4%B1rnak.webp",
    "/images/kal%C4%B1c%C4%B1_oje1.png",
  ];

  const scrollToAppointment = () => {
    const element = document.getElementById("appointment");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const onSelect = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };

    onSelect();
    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const autoplay = window.setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0);
      }
    }, 3200);

    return () => {
      window.clearInterval(autoplay);
    };
  }, [carouselApi]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-nail-pink/20 via-background to-nail-lavender/20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-nail-rose/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-nail-peach/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 text-left relative z-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <h1
              className={`${heroTitleFont.className} text-6xl md:text-8xl font-semibold italic tracking-[0.01em] text-foreground mb-4`}
            >
              <span className="inline-block -skew-x-6">{t("hero.title")}</span>
            </h1>

            <p className="text-xl md:text-2xl text-primary font-medium mb-4">
              {t("hero.subtitle")}
            </p>

            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              {t("hero.description")}
            </p>

            <div className="flex flex-col items-start gap-4 max-w-3xl">
              <div className="space-y-3 text-base text-muted-foreground">
                <p>{t("common.bookingIntroFirst")}</p>
                <p>{t("common.bookingIntroSecond")}</p>
              </div>
              <Button
                size="lg"
                onClick={scrollToAppointment}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                {t("hero.cta")}
              </Button>
            </div>
          </div>

          <div className="w-full lg:max-w-[640px] lg:justify-self-end">
            <div className="rounded-3xl border border-white/30 bg-white/40 p-3 shadow-2xl backdrop-blur-sm">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent className="-ml-0">
                  {heroImages.map((imagePath, index) => (
                    <CarouselItem key={imagePath} className="pl-0">
                      <div className="flex h-[360px] items-center justify-center overflow-hidden rounded-2xl bg-nail-pink/10 md:h-[460px] lg:h-[520px]">
                        <img
                          src={imagePath}
                          alt={`Yusuf Nail Art tasarim ${index + 1}`}
                          className="h-full w-full object-cover object-center"
                          style={{
                            WebkitMaskImage:
                              "radial-gradient(ellipse 120% 90% at center, black 62%, transparent 100%)",
                            maskImage:
                              "radial-gradient(ellipse 120% 90% at center, black 62%, transparent 100%)",
                          }}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={`hero-dot-${index}`}
                  type="button"
                  aria-label={`Slide ${index + 1}`}
                  onClick={() => carouselApi?.scrollTo(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeIndex === index ? "w-7 bg-primary" : "w-2.5 bg-primary/35"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
