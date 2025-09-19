import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  BookOpen, 
  Calendar, 
  GamepadIcon, 
  TrendingUp, 
  MessageSquare,
  Sparkles,
  Menu,
  X
} from "lucide-react";

interface NavItem {
  icon: any;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: Camera, label: "Analiza Zdjęć", href: "#analyze" },
  { icon: BookOpen, label: "Encyklopedia Skóry", href: "#encyclopedia" },
  { icon: Calendar, label: "Kalendarz Pielęgnacji", href: "#calendar" },
  { icon: TrendingUp, label: "Twój Progres", href: "#progress" },
  { icon: GamepadIcon, label: "Gry & Quizy", href: "#games" },
  { icon: MessageSquare, label: "Blog & Forum", href: "#blog" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-6 left-1/2 transform -translate-x-1/2 z-40">
        <div className="glass-effect rounded-2xl px-6 py-3">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary animate-pulse-glow" />
              <span className="font-bold text-lg gradient-text">SkinCare Pro</span>
            </div>
            
            <div className="h-6 w-px bg-border"></div>
            
            <div className="flex items-center gap-4">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  className="text-xs hover:bg-muted/50 transition-all duration-300 hover:text-primary"
                  onClick={() => document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="fixed top-4 left-4 z-50">
          <div className="glass-effect rounded-xl p-3">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary animate-pulse-glow" />
              <span className="font-bold gradient-text">SkinCare Pro</span>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 btn-glow-primary"
          size="sm"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <div className="fixed top-16 left-4 right-4 glass-effect rounded-2xl p-6">
              <div className="grid gap-3">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className="justify-start gap-3 h-12 text-left hover:bg-muted/50"
                    onClick={() => {
                      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                      setIsOpen(false);
                    }}
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                    <span>{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};