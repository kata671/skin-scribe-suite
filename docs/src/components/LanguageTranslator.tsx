import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages, Globe } from "lucide-react";

const languages = [
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
];

export const LanguageTranslator = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("pl");
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    // Tutaj będzie implementacja tłumaczenia
    console.log("Zmiana języka na:", langCode);
    setIsOpen(false);
  };

  const currentLang = languages.find(lang => lang.code === selectedLanguage);

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="glass-effect rounded-xl p-2">
        {!isOpen ? (
          <Button
            onClick={() => setIsOpen(true)}
            className="btn-glow-accent flex items-center gap-2 rounded-xl"
            size="sm"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{currentLang?.flag} {currentLang?.name}</span>
            <span className="sm:hidden">{currentLang?.flag}</span>
          </Button>
        ) : (
          <div className="space-y-2 min-w-[180px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Languages className="w-4 h-4" />
                <span>Wybierz język</span>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
              >
                ✕
              </Button>
            </div>
            <div className="grid gap-1">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  variant={selectedLanguage === lang.code ? "default" : "ghost"}
                  className={`justify-start gap-2 h-8 ${
                    selectedLanguage === lang.code 
                      ? "btn-glow-primary" 
                      : "hover:bg-muted/50"
                  }`}
                  size="sm"
                >
                  <span>{lang.flag}</span>
                  <span className="text-xs">{lang.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};