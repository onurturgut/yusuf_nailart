import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
import { CalendarIcon, ChevronDown, Clock } from "lucide-react";
import { format } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const AppointmentSection = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [addons, setAddons] = useState<string[]>([]);
  const [isAddonsOpen, setIsAddonsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  ];

  const services = [
    { value: "prosthetic", label: language === "tr" ? "Protez Tırnak ve Bakımı" : "Prosthetic Nails and Care" },
    { value: "gel", label: language === "tr" ? "Jel Tırnak" : "Gel Nails" },
    { value: "manicure-pedicure", label: language === "tr" ? "Manikür ve Pedikür" : "Manicure and Pedicure" },
    { value: "nail-art", label: language === "tr" ? "Kalıcı Oje" : "Permanent Gel Polish" },
  ];

  const addonOptions = [
    { value: "french", label: language === "tr" ? "French" : "French" },
    { value: "cat-eye", label: language === "tr" ? "Kedi Gözü" : "Cat Eye" },
    { value: "chrome-powder", label: language === "tr" ? "Chrome Tozu" : "Chrome Powder" },
    { value: "pearl-powder", label: language === "tr" ? "İnci Tozu" : "Pearl Powder" },
    { value: "nail-art-addon", label: language === "tr" ? "Nail Art" : "Nail Art" },
  ];

  const toggleAddon = (value: string, checked: boolean) => {
    setAddons((prev) => {
      if (checked) {
        return prev.includes(value) ? prev : [...prev, value];
      }
      return prev.filter((item) => item !== value);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !date || !time || !service) {
      toast({
        title: t("appointment.error"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedAddonLabels = addonOptions
        .filter((option) => addons.includes(option.value))
        .map((option) => option.label);

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          appointment_date: format(date, "yyyy-MM-dd"),
          appointment_time: time,
          service_type: service,
          addons: selectedAddonLabels,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.detail || body?.error || "Appointment request failed");
      }

      toast({
        title: t("appointment.success"),
        description: t("appointment.successDescription"),
      });

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setDate(undefined);
      setTime("");
      setService("");
      setAddons([]);
      setIsAddonsOpen(false);
    } catch (error) {
      console.error("Appointment error:", error);
      toast({
        title: t("appointment.error"),
        description: error instanceof Error ? error.message : undefined,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="appointment" className="py-20 relative overflow-hidden lg:h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-nail-lavender/20 via-background to-nail-pink/20" />

      <div className="container mx-auto px-4 relative z-10 lg:flex lg:h-full lg:flex-col">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {t("appointment.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("appointment.subtitle")}
          </p>
        </div>

        <Card className="mx-auto h-full w-full max-w-xl border-none bg-card/80 shadow-xl backdrop-blur lg:flex lg:flex-1 lg:flex-col">
          <CardHeader>
            <CardTitle className="text-center font-serif text-2xl text-primary">
              {t("appointment.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="lg:flex-1">
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
                <Label htmlFor="email">{t("appointment.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("appointment.email")}
                  required
                  maxLength={120}
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

              <Collapsible
                open={isAddonsOpen}
                onOpenChange={setIsAddonsOpen}
                className="space-y-3"
              >
                <CollapsibleTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between text-left font-normal"
                  >
                    <span>{t("appointment.addons")}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isAddonsOpen && "rotate-180",
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-2 rounded-lg border border-border/70 bg-muted/20 p-3">
                  {addonOptions.map((option) => {
                    const isChecked = addons.includes(option.value);
                    const checkboxId = `addon-${option.value}`;

                    return (
                      <label
                        key={option.value}
                        htmlFor={checkboxId}
                        className="flex cursor-pointer items-center justify-between rounded-md px-1 py-1.5 hover:bg-muted/40"
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={checkboxId}
                            checked={isChecked}
                            onCheckedChange={(checked) => toggleAddon(option.value, checked === true)}
                          />
                          <span className="text-sm text-foreground">{option.label}</span>
                        </div>
                        <span className="text-sm font-semibold text-emerald-600">+100 TL</span>
                      </label>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>

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
