import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  FileText, 
  Users,
  Heart,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Youtube
} from "lucide-react";

const footerLinks = {
  platform: [
    { label: "Analiza Zdjęć", href: "#analyze" },
    { label: "Encyklopedia", href: "#encyclopedia" },
    { label: "Gry & Quizy", href: "#games" },
    { label: "Blog", href: "#blog" },
    { label: "Kalendarz", href: "#calendar" }
  ],
  legal: [
    { label: "Regulamin", href: "/terms" },
    { label: "Polityka Prywatności", href: "/privacy" },
    { label: "Zgody RODO", href: "/gdpr" },
    { label: "Zastrzeżenia Medyczne", href: "/medical-disclaimer" },
    { label: "Cookies", href: "/cookies" }
  ],
  help: [
    { label: "Centrum Pomocy", href: "/help" },
    { label: "FAQ", href: "/faq" },
    { label: "Kontakt", href: "/contact" },
    { label: "Zgłoś Problem", href: "/report" },
    { label: "Webinary", href: "/webinars" }
  ],
  community: [
    { label: "Forum", href: "#blog" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Partnerzy", href: "/partners" },
    { label: "Program Afiliacyjny", href: "/affiliate" },
    { label: "Dla Specjalistów", href: "/professionals" }
  ]
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" }
];

export const Footer = () => {
  return (
    <footer className="relative mt-20">
      {/* Main Footer */}
      <div className="pattern-bg py-16">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            {/* Top Section */}
            <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8 mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-1 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary animate-pulse-glow" />
                  <span className="font-bold text-lg gradient-text">SkinCare Pro</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Profesjonalna platforma do analizy problemów skórnych z wykorzystaniem 
                  sztucznej inteligencji. Twoje zdrowie skóry w najlepszych rękach.
                </p>
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <Button
                      key={social.label}
                      size="sm"
                      variant="outline"
                      className="w-9 h-9 p-0 hover:bg-primary/10 hover:border-primary/30"
                      onClick={() => window.open(social.href, '_blank')}
                    >
                      <social.icon className="w-4 h-4" />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Links Sections */}
              <div className="space-y-4">
                <h4 className="font-semibold text-primary">Platforma</h4>
                <div className="space-y-2">
                  {footerLinks.platform.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-primary">Prawne</h4>
                <div className="space-y-2">
                  {footerLinks.legal.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-primary">Pomoc</h4>
                <div className="space-y-2">
                  {footerLinks.help.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-primary">Społeczność</h4>
                <div className="space-y-2">
                  {footerLinks.community.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => {
                        if (link.href.startsWith('#')) {
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.location.href = link.href;
                        }
                      }}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="my-8 bg-border/50" />

            {/* Contact & Newsletter */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="card-glow p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Kontakt
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>pomoc@skincarepro.pl</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>+48 800 123 456 (infolinia)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>ul. Kosmetyczna 12, 00-001 Warszawa</span>
                  </div>
                </div>
              </Card>

              <Card className="card-glow p-6">
                <h4 className="font-semibold mb-4">Newsletter</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Otrzymuj najnowsze porady, produkty i promocje wprost na swoją skrzynkę.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Twój adres email"
                    className="flex-1 px-3 py-2 text-sm bg-input border border-border rounded-md"
                  />
                  <Button className="btn-glow-primary">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </div>

            <Separator className="my-8 bg-border/50" />

            {/* Medical Disclaimer */}
            <Card className="border-amber-500/30 bg-amber-500/5 p-6 mb-8">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                <div className="space-y-2">
                  <h4 className="font-semibold text-amber-700 dark:text-amber-400">
                    Ważne Zastrzeżenia Medyczne
                  </h4>
                  <div className="text-sm text-amber-600 dark:text-amber-300 leading-relaxed space-y-2">
                    <p>
                      <strong>SkinCare Pro</strong> to platforma edukacyjno-informacyjna wykorzystująca sztuczną inteligencję 
                      do analizy zdjęć skóry. Nasze narzędzia <strong>NIE ZASTĘPUJĄ</strong> profesjonalnej diagnozy 
                      i konsultacji z wykwalifikowanym lekarzem dermatologiem.
                    </p>
                    <p>
                      <strong>ZAWSZE skonsultuj się z lekarzem</strong> w przypadku: nowych pieprzyków, zmian w istniejących 
                      znamionach, długotrwałych problemów skórnych, stanów zapalnych, ran niegojących się powyżej 2 tygodni, 
                      reakcji alergicznych lub jakichkolwiek niepokojących objawów.
                    </p>
                    <p>
                      Rekomendacje produktów mają charakter informacyjny i nie gwarantują skuteczności. 
                      Zawsze przeprowadź test alergiczny przed użyciem nowych kosmetyków. 
                      Nie podejmuj decyzji o leczeniu wyłącznie na podstawie analiz AI.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <div className="flex flex-wrap items-center gap-4">
                <span>© 2024 SkinCare Pro. Wszelkie prawa zastrzeżone.</span>
                <span>•</span>
                <span>Wersja 2.1.0</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  <span>Dostępne w 6 językach</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span>Stworzone z</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>w Polsce</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};