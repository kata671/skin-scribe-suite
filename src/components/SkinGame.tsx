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
  gamePhase: 'menu' | 'playing' | 'results';
  timeLeft: number;
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
    description: "Nasza pacjentka ma problemy z zaskórnikami i stanami zapalnymi w strefie T.",
    correctProducts: ["Żel salicylowy", "Serum z niacynamidem", "Krem antybakteryjny"],
    wrongProducts: ["Bogaty krem nawilżający", "Olej arganowy", "Scrub z dużymi cząsteczkami"],
    severity: 3,
    avatar: "👧"
  },
  {
    id: "dryness",
    name: "Skóra sucha i szorowa",
    description: "Skóra jest napięta, łuszczy się i potrzebuje intensywnego nawilżenia.",
    correctProducts: ["Kremowa emulsja", "Serum z kwasem hialuronowym", "Olej pielęgnacyjny"],
    wrongProducts: ["Żel oczyszczający", "Toner z alkoholem", "Peeling kwasowy"],
    severity: 2,
    avatar: "👩"
  },
  {
    id: "aging",
    name: "Pierwsze oznaki starzenia", 
    description: "Pojawiają się drobne zmarszczki i skóra traci elastyczność.",
    correctProducts: ["Krem z retinolem", "Serum z witaminą C", "Krem SPF 50"],
    wrongProducts: ["Mydło antybakteryjne", "Tonik ścierający", "Krem bez składników aktywnych"],
    severity: 4,
    avatar: "👩‍🦳"
  }
];

const allProducts = [
  "Żel salicylowy", "Serum z niacynamidem", "Krem antybakteryjny",
  "Kremowa emulsja", "Serum z kwasem hialuronowym", "Olej pielęgnacyjny", 
  "Krem z retinolem", "Serum z witaminą C", "Krem SPF 50",
  "Bogaty krem nawilżający", "Olej arganowy", "Scrub z dużymi cząsteczkami",
  "Żel oczyszczający", "Toner z alkoholem", "Peeling kwasowy",
  "Mydło antybakteryjne", "Tonik ścierający", "Krem bez składników aktywnych"
];

export const SkinGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    level: 1,
    health: 100,
    selectedProducts: [],
    currentProblem: skinProblems[0],
    gamePhase: 'menu',
    timeLeft: 60
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
      timeLeft: 60
    });
    setIsPlaying(true);
  };

  const selectProduct = (product: string) => {
    if (gameState.selectedProducts.includes(product)) return;
    
    const newSelected = [...gameState.selectedProducts, product];
    const isCorrect = gameState.currentProblem.correctProducts.includes(product);
    
    let newScore = gameState.score;
    let newHealth = gameState.health;
    
    if (isCorrect) {
      newScore += 10 * gameState.level;
    } else {
      newHealth -= 15;
    }
    
    setGameState(prev => ({
      ...prev,
      selectedProducts: newSelected,
      score: newScore,
      health: newHealth
    }));

    // Sprawdź czy wszystkie poprawne produkty zostały wybrane
    if (gameState.currentProblem.correctProducts.every(p => 
        newSelected.includes(p) || gameState.selectedProducts.includes(p)
    )) {
      nextLevel();
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