import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Gamepad2, 
  Sparkles, 
  Star, 
  Trophy, 
  Heart, 
  Zap,
  RotateCcw,
  Play,
  Pause
} from "lucide-react";

interface GameState {
  score: number;
  level: number;
  health: number;
  selectedProducts: string[];
  currentProblem: SkinProblem;
  gamePhase: 'menu' | 'playing' | 'results' | 'levelComplete';
  timeLeft: number;
  streak: number;
  hints: number;
  perfectRounds: number;
}

interface SkinProblem {
  id: string;
  name: string;
  description: string;
  correctProducts: string[];
  wrongProducts: string[];
  severity: number;
  avatar: string;
}

const skinProblems: SkinProblem[] = [
  {
    id: "acne",
    name: "Trądzik młodzieńczy", 
    description: "18-letnia Ania ma problemy z zaskórnikami na czole i brodzie oraz bolesnymi krostkami na policzkach. Skóra jest tłusta w strefie T.",
    correctProducts: ["Żel salicylowy", "Serum z niacynamidem", "Krem antybakteryjny", "Żel oczyszczający z CeraVe", "Toner z BHA Paula's Choice"],
    wrongProducts: ["Bogaty krem nawilżający", "Olej arganowy", "Scrub z dużymi cząsteczkami", "Pasta z sodą oczyszczoną", "Cytryna na twarz"],
    severity: 3,
    avatar: "👧"
  },
  {
    id: "dryness",
    name: "Skóra sucha i szorowa",
    description: "Marta, 35 lat, skarży się na napięcie skóry, łuszczenie się i czerwone plamy. Skóra reaguje uczuleniem na wiele produktów.",
    correctProducts: ["Kremowa emulsja", "Serum z kwasem hialuronowym", "Olej pielęgnacyjny", "Krem z ceramidami CeraVe", "Mleczko oczyszczające Avène"],
    wrongProducts: ["Żel oczyszczający", "Toner z alkoholem", "Peeling kwasowy", "Ocet jabłkowy bezpośrednio", "Tonik ścierający"],
    severity: 2,
    avatar: "👩"
  },
  {
    id: "aging",
    name: "Pierwsze oznaki starzenia", 
    description: "Karolina, 42 lata, zauważa drobne zmarszczki wokół oczu, utratę elastyczności i nierównomierny koloryt skóry.",
    correctProducts: ["Krem z retinolem", "Serum z witaminą C", "Krem SPF 50", "Serum z peptydami Paula's Choice", "Krem z kolagenem Olay"],
    wrongProducts: ["Mydło antybakteryjne", "Tonik ścierający", "Krem bez składników aktywnych", "Pasta do zębów na pryszcze", "Scrub z dużymi cząsteczkami"],
    severity: 4,
    avatar: "👩‍🦳"
  },
  {
    id: "rosacea",
    name: "Rumień różowaty",
    description: "Beata ma stałe zaczerwienienia na policzkach i nosie, widoczne naczynia krwionośne i uczucie palenia skóry.",
    correctProducts: ["Krem uspokajający Avène", "Serum z niacynamidem", "Krem mineralny SPF 50+", "Żel micellarny La Roche-Posay", "Krem na naczynka"],
    wrongProducts: ["Peeling kwasowy", "Toner z alkoholem", "Scrub z dużymi cząsteczkami", "Serum z retinolem The Ordinary", "Żel antybakteryjny Vichy"],
    severity: 3,
    avatar: "👩‍🦰"
  },
  {
    id: "hyperpigmentation",
    name: "Przebarwienia posłoneczne",
    description: "Magda ma ciemne plamy po ekspozycji słonecznej i blizny potrądzikowe, które chce rozjaśnić.",
    correctProducts: ["Serum z witaminą C", "Serum z arbutyną", "Krem SPF 50", "Serum z kwasem azelainowym", "Krem na przebarwienia"],
    wrongProducts: ["Cytryna na twarz", "Pasta z sodą oczyszczoną", "Ocet jabłkowy bezpośrednio", "Scrub z dużymi cząsteczkami", "Mydło antybakteryjne"],
    severity: 4,
    avatar: "👩‍💼"
  },
  {
    id: "sensitive",
    name: "Skóra wrażliwa i reaktywna",
    description: "Ola ma bardzo wrażliwą skórę, która reaguje na większość kosmetyków zaczerwienieniem i swędzeniem.",
    correctProducts: ["Mleczko oczyszczające Avène", "Krem uspokajający Avène", "Woda micelarna Bioderma", "Krem z ceramidami", "Toner bezkwasowy"],
    wrongProducts: ["Peeling kwasowy", "Serum z retinolem", "Toner z alkoholem", "Żel antybakteryjny", "Pasta z sodą oczyszczoną"],
    severity: 2,
    avatar: "🧚‍♀️"
  }
];

const allProducts = [
  // Oczyszczanie
  "Żel salicylowy", "Żel oczyszczający z CeraVe", "Pianka oczyszczająca Eucerin", 
  "Olejek do demakijażu Clinique", "Mleczko oczyszczające Avène", "Żel micellarny La Roche-Posay",
  "Balsam oczyszczający The Ordinary", "Woda micelarna Bioderma", "Żel antybakteryjny Vichy",
  
  // Serum i esencje  
  "Serum z niacynamidem", "Serum z witaminą C", "Serum z kwasem hialuronowym",
  "Serum z retinolem The Ordinary", "Serum z peptydami Paula's Choice", "Esencja z ceramidami",
  "Serum z bakuchiolem", "Serum z kwasem azelainowym", "Serum z arbutyną",
  
  // Kremy nawilżające
  "Kremowa emulsja", "Bogaty krem nawilżający", "Krem z ceramidami CeraVe",
  "Krem regeneracyjny Eucerin", "Krem uspokajający Avène", "Żel-krem Neutrogena",
  "Krem z kolagenem Olay", "Krem z kwasem hialuronowym", "Krem z aloesem",
  
  // Ochrona przeciwsłoneczna
  "Krem SPF 50", "Fluid SPF 30 La Roche-Posay", "Krem mineralny SPF 50+",
  "Spray ochronny SPF 30", "Krem koloryzujący SPF 25", "Żel SPF dla skóry tłustej",
  
  // Oleje i balsamy
  "Olej arganowy", "Olej pielęgnacyjny", "Olej różany", "Olej jojoba",
  "Balsam z masłem shea", "Olej marula The Ordinary", "Olej z dzikiej róży",
  
  // Peelingi i tonery
  "Peeling kwasowy", "Toner z BHA Paula's Choice", "Peeling enzymatyczny",
  "Toner z kwasem glikolowym", "Peeling z kwasem migdałowym", "Toner bezkwasowy",
  
  // Produkty specjalistyczne
  "Krem z retinolem", "Krem antybakteryjny", "Krem na trądzik", 
  "Żel na blizny", "Krem na przebarwienia", "Serum na rozstępy",
  "Krem na naczynka", "Żel na sińce", "Krem na łuszczycę",
  
  // Produkty nieprawidłowe/szkodliwe
  "Scrub z dużymi cząsteczkami", "Toner z alkoholem", "Mydło antybakteryjne",
  "Tonik ścierający", "Krem bez składników aktywnych", "Pasta z sodą oczyszczoną",
  "Ocet jabłkowy bezpośrednio", "Cytryna na twarz", "Pasta do zębów na pryszcze"
];

export const SkinGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    health: 100,
    selectedProducts: [],
    currentProblem: skinProblems[0],
    gamePhase: 'menu',
    timeLeft: 60,
    streak: 0,
    hints: 3,
    perfectRounds: 0
  });

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && gameState.gamePhase === 'playing' && gameState.timeLeft > 0) {
      timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    } else if (gameState.timeLeft === 0) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [isPlaying, gameState.timeLeft, gameState.gamePhase]);

  const startGame = () => {
    setGameState({
      score: 0,
      level: 1,
      health: 100,
      selectedProducts: [],
      currentProblem: skinProblems[Math.floor(Math.random() * skinProblems.length)],
      gamePhase: 'playing',
      timeLeft: 60,
      streak: 0,
      hints: 3,
      perfectRounds: 0
    });
    setIsPlaying(true);
  };

  const useHint = () => {
    if (gameState.hints <= 0) return;
    
    const correctNotSelected = gameState.currentProblem.correctProducts.filter(
      product => !gameState.selectedProducts.includes(product)
    );
    
    if (correctNotSelected.length > 0) {
      const hintProduct = correctNotSelected[0];
      // Highlight the hint product temporarily
      setGameState(prev => ({
        ...prev,
        hints: prev.hints - 1
      }));
      
      // Show toast with hint
      console.log(`Podpowiedź: Spróbuj ${hintProduct}`);
    }
  };

  const selectProduct = (product: string) => {
    if (gameState.selectedProducts.includes(product)) return;
    
    const newSelected = [...gameState.selectedProducts, product];
    const isCorrect = gameState.currentProblem.correctProducts.includes(product);
    
    let newScore = gameState.score;
    let newHealth = gameState.health;
    let newStreak = gameState.streak;
    
    if (isCorrect) {
      const basePoints = 10 * gameState.level;
      const timeBonus = Math.floor(gameState.timeLeft / 10);
      const streakBonus = newStreak * 5;
      newScore += basePoints + timeBonus + streakBonus;
      newStreak += 1;
    } else {
      const damage = 15 + gameState.level * 2;
      newHealth -= damage;
      newStreak = 0;
    }
    
    setGameState(prev => ({
      ...prev,
      selectedProducts: newSelected,
      score: newScore,
      health: newHealth,
      streak: newStreak
    }));

    // Sprawdź czy wszystkie poprawne produkty zostały wybrane
    const correctProductsSelected = gameState.currentProblem.correctProducts.filter(p => 
      newSelected.includes(p)
    ).length;
    
    const requiredProducts = Math.min(3, gameState.currentProblem.correctProducts.length);
    
    if (correctProductsSelected >= requiredProducts) {
      const hasWrongProducts = newSelected.some(p => 
        gameState.currentProblem.wrongProducts.includes(p)
      );
      
      if (!hasWrongProducts) {
        // Perfect round bonus
        setGameState(prev => ({
          ...prev,
          score: prev.score + 50,
          perfectRounds: prev.perfectRounds + 1
        }));
      }
      
      setGameState(prev => ({
        ...prev,
        gamePhase: 'levelComplete'
      }));
      
      setTimeout(() => {
        nextLevel();
      }, 2000);
    }
    
    // Sprawdź czy zdrowie spadło do zera
    if (newHealth <= 0) {
      endGame();
    }
  };

  const nextLevel = () => {
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        level: prev.level + 1,
        selectedProducts: [],
        currentProblem: skinProblems[Math.floor(Math.random() * skinProblems.length)],
        timeLeft: Math.max(40, 60 - prev.level * 2) // Coraz mniej czasu
      }));
    }, 1500);
  };

  const endGame = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: 'results'
    }));
    setIsPlaying(false);
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: 'menu'
    }));
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameState.gamePhase === 'menu') {
    return (
      <section id="games" className="py-20 pattern-bg">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Gra: Salon Pielęgnacji</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Wciel się w rolę eksperta pielęgnacji skóry! Diagnozuj problemy i dobieraj 
              odpowiednie produkty dla swoich klientek.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="card-glow p-8 text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                  <Gamepad2 className="w-10 h-10 text-white" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Zasady Gry</h3>
                  <div className="text-left space-y-3 max-w-lg mx-auto text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">1</span>
                      <p>Każda klientka ma inny problem skórny do rozwiązania</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">2</span>
                      <p>Wybierz 3 odpowiednie produkty z dostępnej palety</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">3</span>
                      <p>Zły wybór odbiera zdrowie, dobry daje punkty</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">4</span>
                      <p>Im wyższy poziom, tym trudniejsze przypadki!</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-2">
                    <Star className="w-8 h-8 text-yellow-500 mx-auto" />
                    <div className="text-sm font-medium">Zdobywaj Punkty</div>
                  </div>
                  <div className="space-y-2">
                    <Trophy className="w-8 h-8 text-primary mx-auto" />
                    <div className="text-sm font-medium">Awansuj Poziomy</div>
                  </div>
                  <div className="space-y-2">
                    <Heart className="w-8 h-8 text-red-500 mx-auto" />
                    <div className="text-sm font-medium">Dbaj o Zdrowie</div>
                  </div>
                </div>

                <Button 
                  onClick={startGame}
                  className="btn-glow-primary text-lg px-8 py-6"
                  size="lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Rozpocznij Grę
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (gameState.gamePhase === 'results') {
    return (
      <section id="games" className="py-20 pattern-bg">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="card-glow p-8 text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold">Koniec Gry!</h3>
                  <p className="text-muted-foreground">
                    Gratulacje! Oto Twoje wyniki:
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">{gameState.score}</div>
                    <div className="text-sm text-muted-foreground">Punkty</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-secondary">{gameState.level}</div>
                    <div className="text-sm text-muted-foreground">Poziom</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-accent">{Math.max(0, gameState.health)}%</div>
                    <div className="text-sm text-muted-foreground">Zdrowie</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    gameState.score >= 100 ? 'bg-green-500/20 text-green-400' :
                    gameState.score >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {gameState.score >= 100 ? '🏆 Ekspert Pielęgnacji!' :
                     gameState.score >= 50 ? '🌟 Dobra robota!' :
                     '💪 Spróbuj ponownie!'}
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {gameState.score >= 100 ? 
                      'Jesteś prawdziwym mistrzem pielęgnacji skóry!' :
                     gameState.score >= 50 ?
                      'Niezły wynik! Jeszcze trochę nauki i będziesz ekspertem.' :
                      'Nie martw się, praktyka czyni mistrza. Spróbuj ponownie!'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={startGame}
                    className="btn-glow-primary"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Zagraj Ponownie
                  </Button>
                  <Button 
                    onClick={resetGame}
                    variant="outline"
                    className="btn-glow-secondary"
                  >
                    Powrót do Menu
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // Game Playing Phase
  return (
    <section id="games" className="py-20 pattern-bg">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Game HUD */}
          <Card className="card-glow p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold">{gameState.score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span className="font-bold">Poziom {gameState.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <div className="w-20">
                    <Progress value={gameState.health} className="h-2" />
                  </div>
                  <span className="text-sm">{gameState.health}%</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  <span className="font-mono font-bold">{formatTime(gameState.timeLeft)}</span>
                </div>
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  size="sm"
                  variant="outline"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </Card>

          {/* Current Problem */}
          <Card className="card-glow p-8">
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">{gameState.currentProblem.avatar}</div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold gradient-text">
                  {gameState.currentProblem.name}
                </h3>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  {gameState.currentProblem.description}
                </p>
              </div>
              
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm text-muted-foreground">Trudność:</span>
                {Array.from({length: 5}).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < gameState.currentProblem.severity 
                        ? 'text-yellow-500 fill-current' 
                        : 'text-muted-foreground/30'
                    }`} 
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* Product Selection */}
          <Card className="card-glow p-6">
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-center">
                Wybierz odpowiednie produkty pielęgnacyjne
              </h4>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {allProducts.map((product) => {
                  const isSelected = gameState.selectedProducts.includes(product);
                  const isCorrect = gameState.currentProblem.correctProducts.includes(product);
                  const isWrong = gameState.selectedProducts.includes(product) && 
                                !gameState.currentProblem.correctProducts.includes(product);
                  
                  return (
                    <Button
                      key={product}
                      onClick={() => selectProduct(product)}
                      disabled={isSelected}
                      className={`p-4 h-auto text-left justify-start relative ${
                        isSelected && isCorrect ? 'btn-glow-primary bg-green-500/20 border-green-500' :
                        isSelected && isWrong ? 'btn-glow-secondary bg-red-500/20 border-red-500' :
                        isSelected ? 'opacity-50' : 'btn-glow-accent'
                      }`}
                      variant={isSelected ? "default" : "outline"}
                    >
                      <span className="text-sm font-medium">{product}</span>
                      {isSelected && isCorrect && (
                        <Sparkles className="w-4 h-4 text-green-400 absolute top-2 right-2" />
                      )}
                      {isSelected && isWrong && (
                        <span className="text-red-400 absolute top-2 right-2">✕</span>
                      )}
                    </Button>
                  );
                })}
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                Wybrano: {gameState.selectedProducts.length} / 3 produkty
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};