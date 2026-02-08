import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground">
          Â© {currentYear} Yusuf Nail Art. {t("footer.rights")}
        </p>
        <div className="mt-2">
          <Link href="/panel" className="text-xs text-muted-foreground hover:text-primary">
            {t("footer.admin")}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
