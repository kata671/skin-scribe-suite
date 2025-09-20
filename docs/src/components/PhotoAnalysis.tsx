import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, 
  Upload, 
  FileImage, 
  Loader2, 
  CheckCircle, 
  AlertTriangle,
  Sparkles
} from "lucide-react";

const analysisSteps = [
  "Przesyłanie zdjęcia...",
  "Analiza AI w toku...", 
  "Identyfikacja problemów...",
  "Generowanie rekomendacji...",
  "Finalizacja raportu..."
];

const mockResults = [
  {
    problem: "Trądzik (Acne vulgaris)",
    severity: "Średni",
    confidence: 94,
    description: "Zauważalne zaskórniki i białogłowy w strefie T oraz na polickach. Typowy obraz trądzika młodzieńczego.",
    recommendations: [
      "CeraVe Foaming Facial Cleanser - delikatny żel oczyszczający",
      "The Ordinary Niacinamide 10% + Zinc 1% - serum regulujące sebum",
      "La Roche-Posay Effaclar Duo(+) - krem przeciwtrądzikowy",
      "Avène Thermal Spring Water - woda termalna uspokajająca"
    ]
  },
  {
    problem: "Przebarwienia potrądzikowe (PIH)", 
    severity: "Łagodny",
    confidence: 87,
    description: "Brązowe plamki pozostałe po zagojonych wykwitach trądzikowych, głównie na policzkach.",
    recommendations: [
      "The Ordinary Alpha Arbutin 2% + HA - serum rozjaśniające",
      "Paula's Choice Clinical 0.3% Retinol - retinol na przebarwienia", 
      "Kiehl's Clearly Corrective Dark Spot Solution - korektor przebarwień",
      "SVR Sun Secure Blur SPF50+ - krem z wysoką ochroną UV"
    ]
  }
];

export const PhotoAnalysis = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        startAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentStep(0);
    setProgress(0);
    setShowResults(false);

    // Symulacja analizy AI
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setShowResults(true);
          }, 500);
          return 100;
        }
        setCurrentStep(Math.floor(newProgress / 20));
        return newProgress;
      });
    }, 800);
  };

  return (
    <section id="analyze" className="py-20 pattern-bg">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Analiza Zdjęć AI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Prześlij zdjęcie swojej skóry, włosów lub paznokci, a nasza zaawansowana sztuczna inteligencja 
            przeprowadzi szczegółową analizę i zaproponuje najlepsze rozwiązania.
          </p>
          
          <div className="text-sm text-muted-foreground border border-amber-500/30 bg-amber-500/5 rounded-lg p-4 max-w-2xl mx-auto">
            <AlertTriangle className="w-5 h-5 text-amber-500 inline mr-2" />
            <strong>Ważne:</strong> Ta analiza nie zastępuje diagnozy lekarskiej. 
            W przypadku poważnych problemów skórnych koniecznie skonsultuj się z dermatologiem.
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Upload Section */}
          {!uploadedImage && (
            <Card className="card-glow p-8">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Camera className="w-10 h-10 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Prześlij Swoje Zdjęcie</h3>
                  <p className="text-muted-foreground">
                    Wybierz wyraźne zdjęcie w dobrej jakości. Wspieramy problemy skóry twarzy, 
                    skóry głowy, włosów i paznokci.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-glow-primary"
                    size="lg"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Wybierz Zdjęcie
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="btn-glow-secondary"
                    size="lg"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Zrób Zdjęcie
                  </Button>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                <div className="text-xs text-muted-foreground">
                  Obsługujemy: JPG, PNG, WEBP • Max 10MB • Twoje zdjęcia są prywatne i bezpieczne
                </div>
              </div>
            </Card>
          )}

          {/* Analysis in Progress */}
          {uploadedImage && isAnalyzing && (
            <div className="space-y-6">
              <Card className="card-glow p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-lg overflow-hidden">
                    <img src={uploadedImage} alt="Przesłane zdjęcie" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Analizujemy Twoje zdjęcie</h3>
                    <p className="text-muted-foreground text-sm">
                      {analysisSteps[currentStep]}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Postęp analizy</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Proszę czekać, analiza może potrwać do 30 sekund...</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Results */}
          {uploadedImage && showResults && (
            <div className="space-y-6">
              <Card className="card-glow p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-lg overflow-hidden">
                    <img src={uploadedImage} alt="Przesłane zdjęcie" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <h3 className="text-xl font-semibold">Analiza Zakończona</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Wykryliśmy {mockResults.length} problem(y) wymagające uwagi
                    </p>
                  </div>
                  <Button 
                    onClick={() => {
                      setUploadedImage(null);
                      setShowResults(false);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Nowa Analiza
                  </Button>
                </div>
              </Card>

              {/* Results Cards */}
              <div className="space-y-6">
                {mockResults.map((result, index) => (
                  <Card key={index} className="card-glow p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-xl font-semibold text-primary mb-2">
                            {result.problem}
                          </h4>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full">
                              {result.severity}
                            </span>
                            <span className="text-muted-foreground">
                              Pewność: {result.confidence}%
                            </span>
                          </div>
                        </div>
                        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {result.description}
                      </p>
                      
                      <div>
                        <h5 className="font-semibold mb-3 text-lg">🏆 Rekomendowane Produkty:</h5>
                        <div className="grid gap-3">
                          {result.recommendations.map((rec, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span className="text-sm">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="card-glow p-6 text-center">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Chcesz pełną analizę?</h4>
                  <p className="text-muted-foreground">
                    Zarejestruj się, aby otrzymać szczegółowy raport PDF, śledzić postępy 
                    i otrzymywać spersonalizowane powiadomienia.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button className="btn-glow-primary">
                      Pobierz Pełny Raport PDF
                    </Button>
                    <Button variant="outline" className="btn-glow-secondary">
                      Zapisz w Kalendarzu
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};