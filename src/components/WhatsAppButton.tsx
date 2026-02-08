import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WhatsAppButton = () => {
  const { t } = useLanguage();
  const phoneNumber = "905335994736";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>{t("whatsapp.tooltip")}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default WhatsAppButton;
