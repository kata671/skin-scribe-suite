import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Star, 
  Eye, 
  Zap,
  Shield,
  Heart,
  Sparkles
} from "lucide-react";

const skinConditions = [
  {
    id: "tradzik",
    name: "Trądzik (Acne)",
    severity: "Często występujący",
    category: "Problemy skórne",
    views: "2.3k",
    rating: 4.8,
    description: "Choroba skóry charakteryzująca się powstawaniem zaskórników, białogłowów i stanów zapalnych.",
    fullDescription: "Trądzik to jedna z najczęstszych chorób skóry, dotykająca głównie młodzież, ale mogąca występować również u dorosłych. Powstaje w wyniku nadmiernej produkcji sebum, zablokowania ujść gruczołów łojowych i namnażania bakterii Cutibacterium acnes.",
    symptoms: [
      "Zaskórniki (comedones otwarte)",
      "Białogłowy (comedones zamknięte)", 
      "Grudki zapalne",
      "Krosty ropne",
      "Blizny potrądzikowe"
    ],
    causes: [
      "Nadmierna produkcja sebum",
      "Zmiany hormonalne",
      "Bakterie Cutibacterium acnes",
      "Zablokowanie ujść gruczołów łojowych",
      "Predyspozycje genetyczne",
      "Stres i dieta"
    ],
    recommendations: [
      "CeraVe Foaming Facial Cleanser - delikatne oczyszczanie 2x dziennie",
      "The Ordinary Niacinamide 10% + Zinc 1% - regulacja sebum",
      "Paula's Choice SKIN PERFECTING 2% BHA - złuszczanie kwasami",
      "La Roche-Posay Effaclar Duo(+) - działanie przeciwbakteryjne",
      "Neutrogena Ultra Gentle Daily Cleanser - dla skóry wrażliwej"
    ]
  },
  {
    id: "rozstepy",
    name: "Rozstępy (Striae)",
    severity: "Kosmetyczny",
    category: "Defekty skórne", 
    views: "1.8k",
    rating: 4.5,
    description: "Liniowe blizny atroficzne powstające w wyniku nadmiernego rozciągnięcia skóry.",
    fullDescription: "Rozstępy to bardzo częsty problem kosmetyczny dotykający zarówno kobiety, jak i mężczyzn. Powstają gdy skóra jest nadmiernie rozciągana w krótkim czasie, co prowadzi do uszkodzenia włókien kolagenu i elastyny.",
    symptoms: [
      "Czerwonawe lub fioletowe linie (świeże)",
      "Białe lub srebrzyste blizny (stare)",
      "Zagłębienia w skórze",
      "Różna szerokość linii",
      "Lokalizacja: brzuch, biodra, piersi, pośladki"
    ],
    causes: [
      "Ciąża i szybki wzrost brzucha",
      "Gwałtowny przyrost lub utrata masy ciała",
      "Dojrzewanie i wzrost w okresie pokwitania",
      "Intensywny trening siłowy",
      "Stosowanie kortykosteroidów",
      "Predyspozycje genetyczne"
    ],
    recommendations: [
      "Bio-Oil Skincare Oil - olej na rozstępy i blizny",
      "Palmer's Cocoa Butter Formula - masło kakaowe",
      "Mustela Stretch Marks Prevention Cream - krem przeciw rozstępom",
      "The Ordinary \"Buffet\" + Copper Peptides - regeneracja skóry",
      "Weleda Stretch Mark Massage Oil - naturalny olej do masażu"
    ]
  },
  {
    id: "luszczpca",
    name: "Łuszczyca (Psoriasis)",
    severity: "Przewlekła choroba",
    category: "Choroby autoimmuniczne",
    views: "1.2k", 
    rating: 4.9,
    description: "Przewlekła choroba autoimmunologiczna charakteryzująca się nadmierną proliferacją keratynocytów.",
    fullDescription: "Łuszczyca to przewlekła, nawracająca choroba skóry o podłożu autoimmunologicznym. Charakteryzuje się przyspieszoną proliferacją keratynocytów i zaburzeniami keratynizacji, co prowadzi do powstania charakterystycznych zmian skórnych.",
    symptoms: [
      "Czerwone, uniesione plamy pokryte srebrzystymi łuskami",
      "Świąd i pieczenie skóry", 
      "Pękanie i krwawienie skóry",
      "Zmiany na paznokciach (dołeczki, zgrubienia)",
      "Sztywność i ból stawów (łuszczyca stawowa)"
    ],
    causes: [
      "Predyspozycje genetyczne",
      "Zaburzenia układu immunologicznego",
      "Stres psychiczny",
      "Infekcje (paciorkowcowe)",
      "Urazy skóry",
      "Niektóre leki",
      "Palenie tytoniu i alkohol"
    ],
    recommendations: [
      "CeraVe Psoriasis Moisturizing Cream - nawilżenie i złuszczanie",
      "La Roche-Posay Lipikar Baume AP+M - regeneracja bariery skórnej",
      "Eucerin UreaRepair PLUS 10% Urea - intensywne nawilżenie",
      "Avène XeraCalm A.D Lipid-Replenishing Cleansing Oil - delikatne oczyszczanie",
      "Sebamed Clear Face Care Gel - łagodny żel dla skóry problemowej"
    ]
  },
  {
    id: "sinie-oczami",
    name: "Sinie pod oczami",
    severity: "Kosmetyczny",
    category: "Problemy okolic oczu",
    views: "3.1k",
    rating: 4.6,
    description: "Ciemne zabarwienie skóry pod oczami spowodowane różnymi czynnikami.",
    fullDescription: "Sinie pod oczami to częsty problem kosmetyczny wynikający z przezierania naczyń krwionośnych przez cienką skórę okolic oczu. Może być spowodowany czynnikami genetycznymi, stylem życia lub procesami starzenia.",
    symptoms: [
      "Ciemne zabarwienie pod oczami",
      "Opuchlizna powiek",
      "Cienka, delikatna skóra",
      "Widoczne naczynia krwionośne",
      "Zmęczony wygląd"
    ],
    causes: [
      "Predyspozycje genetyczne",
      "Niewystarczająca ilość snu",
      "Stres i zmęczenie",
      "Alergies i nietolerancje pokarmowe",
      "Nadmierna ekspozycja na słońce",
      "Proces starzenia się skóry",
      "Odwodnienie organizmu"
    ],
    recommendations: [
      "The Ordinary Caffeine Solution 5% + EGCG - krem z kofeiną",
      "Kiehl's Creamy Eye Treatment with Avocado - odżywczy krem pod oczy",
      "Olay Eyes Ultimate Eye Cream - kompleksowa pielęgnacja",
      "CeraVe Eye Repair Cream - regenerujący krem pod oczy",
      "No7 Protect & Perfect Intense Advanced Eye Cream - przeciwzmarszczkowo"
    ]
  }
];

const categories = [
  "Wszystkie",
  "Problemy skórne", 
  "Defekty skórne",
  "Choroby autoimmuniczne",
  "Problemy okolic oczu",
  "Przebarwienia",
  "Włosy i skóra głowy",
  "Paznokcie"
];

export const SkinEncyclopedia = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
  const [selectedCondition, setSelectedCondition] = useState<typeof skinConditions[0] | null>(null);

  const filteredConditions = skinConditions.filter(condition => {
    const matchesSearch = condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         condition.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Wszystkie" || condition.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (selectedCondition) {
    return (
      <section id="encyclopedia" className="py-20 pattern-bg">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <Button 
              onClick={() => setSelectedCondition(null)}
              variant="outline"
              className="mb-6 btn-glow-secondary"
            >
              ← Powrót do encyklopedii
            </Button>
            
            <Card className="card-glow p-8">
              <div className="space-y-8">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-4">
                    <h1 className="text-4xl font-bold gradient-text">
                      {selectedCondition.name}
                    </h1>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-primary/20 text-primary">
                        {selectedCondition.severity}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{selectedCondition.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Eye className="w-4 h-4" />
                        <span>{selectedCondition.views} wyświetleń</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {selectedCondition.fullDescription}
                  </p>
                </div>

                {/* Symptoms */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-primary" />
                    Objawy i Charakterystyka
                  </h3>
                  <div className="grid gap-3">
                    {selectedCondition.symptoms.map((symptom, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Causes */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Search className="w-6 h-6 text-secondary" />
                    Przyczyny i Czynniki Ryzyka
                  </h3>
                  <div className="grid gap-3">
                    {selectedCondition.causes.map((cause, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span>{cause}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-accent" />
                    🏆 Najlepsze Produkty (Ranking 2024)
                  </h3>
                  <div className="space-y-4">
                    {selectedCondition.recommendations.map((rec, index) => (
                      <Card key={index} className="p-4 bg-gradient-to-r from-accent/5 to-transparent border-accent/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-sm">
                              {index + 1}
                            </div>
                            <span className="font-medium">{rec}</span>
                          </div>
                          <Button size="sm" variant="outline" className="btn-glow-accent">
                            Zobacz ceny
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Legal Disclaimer */}
                <div className="border border-amber-500/30 bg-amber-500/5 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                    <div className="space-y-2">
                      <h4 className="font-semibold text-amber-700 dark:text-amber-400">
                        Ważne informacje prawne
                      </h4>
                      <p className="text-sm text-amber-600 dark:text-amber-300 leading-relaxed">
                        Przedstawione informacje mają charakter edukacyjny i nie stanowią porady medycznej. 
                        Nie zastępują konsultacji z lekarzem dermatologiem. W przypadku poważnych problemów 
                        skórnych, zmian budzących niepokój lub braku poprawy po zastosowaniu zalecanych 
                        produktów, koniecznie skonsultuj się z wykwalifikowanym specjalistą. Zawsze 
                        przeprowadź test alergiczny przed użyciem nowych produktów.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="encyclopedia" className="py-20 pattern-bg">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Encyklopedia Skóry</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Poznaj wszystkie problemy skórne od A do Z. Szczegółowe opisy, przyczyny, 
            objawy i najlepsze produkty według aktualnych rankingów dermatologicznych.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="card-glow p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Szukaj problemów skórnych, objawów, przyczyn..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    className={selectedCategory === category ? "btn-glow-primary" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Conditions Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConditions.map((condition) => (
              <Card 
                key={condition.id} 
                className="card-glow p-6 cursor-pointer transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedCondition(condition)}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-primary">
                        {condition.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {condition.category}
                      </Badge>
                    </div>
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {condition.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span>{condition.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="w-3 h-3" />
                        <span>{condition.views}</span>
                      </div>
                    </div>
                    <Badge className={`text-xs ${
                      condition.severity.includes('Przewlekła') ? 'bg-destructive/20 text-destructive' :
                      condition.severity.includes('Często') ? 'bg-primary/20 text-primary' :
                      'bg-secondary/20 text-secondary'
                    }`}>
                      {condition.severity}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredConditions.length === 0 && (
            <Card className="card-glow p-8 text-center">
              <div className="space-y-4">
                <Search className="w-12 h-12 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-semibold">Nie znaleziono wyników</h3>
                <p className="text-muted-foreground">
                  Spróbuj użyć innych słów kluczowych lub wybierz inną kategorię.
                </p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Wszystkie");
                  }}
                  className="btn-glow-primary"
                >
                  Wyczyść filtry
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};