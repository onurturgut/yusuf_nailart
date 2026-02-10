import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AppointmentSection = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [addons, setAddons] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  ];

  const services = [
    { value: "gel", label: language === "tr" ? "Jel Tırnak" : "Gel Nails" },
    { value: "prosthetic", label: language === "tr" ? "Protez Tırnak" : "Prosthetic Nails" },
    { value: "manicure-pedicure", label: language === "tr" ? "Manikür & Pedikür" : "Manicure & Pedicure" },
    { value: "nail-art", label: language === "tr" ? "Tırnak Sanatı" : "Nail Art" },
  ];
  const addonOptions = [
    { value: "french", label: language === "tr" ? "Frenc" : "French" },
    { value: "cat-eye", label: language === "tr" ? "Kedi gözü" : "Cat eye" },
    { value: "chrome-dust", label: language === "tr" ? "Chrome tuzu" : "Chrome dust" },
    { value: "pearl-dust", label: language === "tr" ? "İnci tozu" : "Pearl dust" },
    { value: "nail-art-addon", label: language === "tr" ? "Nail art" : "Nail art" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !phone.trim() ||
      !date ||
      !time ||
      !service
    ) {
      toast({
        title: t("appointment.error"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedAddonLabels = addons
        .map((value) => addonOptions.find((addon) => addon.value === value)?.label)
        .filter(Boolean)
        .join(", ");
      const selectedServiceLabel = services.find((s) => s.value === service)?.label ?? service;
      const serviceWithAddons = selectedAddonLabels
        ? `${selectedServiceLabel} + ${selectedAddonLabels}`
        : selectedServiceLabel;

      const { error } = await supabase.from("appointments").insert({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        appointment_date: format(date, "yyyy-MM-dd"),
        appointment_time: time,
        service_type: serviceWithAddons,
      });

      if (error) throw error;

      toast({
        title: t("appointment.success"),
        description: t("appointment.successDescription"),
      });

      // Reset form
      setFirstName("");
      setLastName("");
      setPhone("");
      setDate(undefined);
      setTime("");
      setService("");
      setAddons([]);
    } catch (error) {
      console.error("Appointment error:", error);
      toast({
        title: t("appointment.error"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="appointment" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-nail-lavender/20 via-background to-nail-pink/20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {t("appointment.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("appointment.subtitle")}
          </p>
        </div>

        <Card className="max-w-xl mx-auto border-none shadow-xl bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center font-serif text-2xl text-primary">
              {t("appointment.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("appointment.firstName")}</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={t("appointment.firstName")}
                    required
                    maxLength={50}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("appointment.lastName")}</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={t("appointment.lastName")}
                    required
                    maxLength={50}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t("appointment.phone")}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("appointment.phone")}
                  required
                  maxLength={30}
                />
              </div>

              <div className="space-y-2">
                <Label>{t("appointment.service")}</Label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("appointment.selectService")} />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t("appointment.date")}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date
                          ? format(date, "PPP", { locale: language === "tr" ? tr : enUS })
                          : t("appointment.selectDate")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        locale={language === "tr" ? tr : enUS}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>{t("appointment.time")}</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger>
                      <Clock className="mr-2 h-4 w-4" />
                      <SelectValue placeholder={t("appointment.selectTime")} />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>{t("appointment.addons")}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {t("appointment.addons")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="start">
                    <ScrollArea className="h-48">
                      <div className="p-3 space-y-2">
                        {addonOptions.map((addon) => {
                          const checked = addons.includes(addon.value);
                          return (
                            <label
                              key={addon.value}
                              className="flex items-center gap-3 rounded-md border border-border bg-background/60 px-3 py-2"
                            >
                              <Checkbox
                                checked={checked}
                                onCheckedChange={(value) => {
                                  const next = value
                                    ? [...addons, addon.value]
                                    : addons.filter((item) => item !== addon.value);
                                  setAddons(next);
                                }}
                              />
                              <span className="text-sm text-foreground">{addon.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "..." : t("appointment.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AppointmentSection;



