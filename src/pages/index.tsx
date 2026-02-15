import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AppointmentSection from "@/components/AppointmentSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch">
        <ServicesSection />
        <AppointmentSection />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
