import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Sparkles, Zap, Shield } from "lucide-react";
import heroImage from "@/assets/hero-skincare.jpg";

const features = [
  {
    icon: Camera,
    title: "Analiza AI Zdjęć",
    description: "Profesjonalna analiza problemów skórnych w sekundach"
  },
  {
    icon: Sparkles,
    title: "Spersonalizowane Porady",
    description: "Rekomendacje dostosowane do Twoich potrzeb"
  },
  {
    icon: Zap,
    title: "Natychmiastowe Wyniki",
    description: "Błyskawiczna identyfikacja i rozwiązania"
  },
  {
    icon: Shield,
    title: "100% Prywatne",
    description: "Twoje zdjęcia są bezpieczne i poufne"
  }
];

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pattern-bg relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      
      <div className="container px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="gradient-text">Twoja Skóra</span>
                <br />
                <span className="text-foreground">Zasługuje na</span>
                <br />
                <span className="gradient-text">Perfekcję</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Odkryj przyszłość pielęgnacji skóry z naszą zaawansowaną analizą AI. 
                Zdiagnozuj problemy, otrzymaj spersonalizowane porady i śledź swoje postępy.
              </p>
              
              <div className="text-sm text-muted-foreground border-l-2 border-primary/50 pl-4 italic">
                ⚠️ Uwaga: Ta aplikacja nie zastępuje konsultacji z dermatologiem. 
                W przypadku poważnych problemów skórnych skonsultuj się z lekarzem.
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="btn-glow-primary text-lg px-8 py-6"
                onClick={() => document.querySelector('#analyze')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Camera className="w-5 h-5 mr-2" />
                Analizuj Swoje Zdjęcie
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-glow-secondary text-lg px-8 py-6"
                onClick={() => document.querySelector('#encyclopedia')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Poznaj Swoją Skórę
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Profesjonalna pielęgnacja skóry" 
                className="rounded-3xl w-full h-[600px] object-cover shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 rounded-3xl"></div>
              
              {/* Floating cards */}
              <div className="absolute -top-4 -left-4">
                <Card className="card-glow p-4 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">99.7% Dokładność</div>
                      <div className="text-xs text-muted-foreground">Analiza AI</div>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="absolute -bottom-4 -right-4" style={{ animationDelay: "1s" }}>
                <Card className="card-glow p-4 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">100% Prywatne</div>
                      <div className="text-xs text-muted-foreground">Bezpieczne dane</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20" style={{ animationDelay: "0.6s" }}>
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="card-glow p-6 text-center animate-fade-in"
              style={{ animationDelay: `${0.8 + index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};