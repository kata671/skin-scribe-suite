import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { 
  Calendar, 
  TrendingUp, 
  Clock, 
  Target, 
  Award, 
  Zap,
  Camera,
  Sparkles,
  ArrowUp,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface ProgressData {
  week: number;
  score: number;
  improvements: string[];
  photoCount: number;
}

interface CalendarEvent {
  date: Date;
  title: string;
  type: 'routine' | 'appointment' | 'reminder' | 'milestone';
  completed?: boolean;
}

const progressData: ProgressData[] = [
  { week: 1, score: 45, improvements: ["Redukcja zaczerwienienia"], photoCount: 3 },
  { week: 2, score: 52, improvements: ["Mniej zaskórników", "Lepsza tekstura"], photoCount: 2 },
  { week: 3, score: 68, improvements: ["Wyrównany ton skóry", "Zmniejszenie porów"], photoCount: 4 },
  { week: 4, score: 75, improvements: ["Widoczne rozjaśnienie", "Głębokie nawilżenie"], photoCount: 2 },
];

const calendarEvents: CalendarEvent[] = [
  { date: new Date(2024, 9, 20), title: "Poranna rutyna", type: "routine", completed: true },
  { date: new Date(2024, 9, 20), title: "Wieczorna pielęgnacja", type: "routine", completed: false },
  { date: new Date(2024, 9, 22), title: "Wizyta u dermatologa", type: "appointment" },
  { date: new Date(2024, 9, 25), title: "Zmiana produktów", type: "reminder" },
  { date: new Date(2024, 9, 28), title: "Zdjęcie kontrolne", type: "milestone" },
];

const achievements = [
  { 
    id: "first-photo", 
    title: "Pierwszy Krok", 
    description: "Przesłałeś pierwsze zdjęcie do analizy",
    icon: "📸", 
    unlocked: true 
  },
  { 
    id: "week-streak", 
    title: "Tydzień Konsekwencji", 
    description: "7 dni regularnej pielęgnacji",
    icon: "🔥", 
    unlocked: true 
  },
  { 
    id: "improvement", 
    title: "Widoczna Poprawa", 
    description: "Pierwszy widoczny progres w analizie",
    icon: "✨", 
    unlocked: true 
  },
  { 
    id: "expert", 
    title: "Ekspert Pielęgnacji", 
    description: "Ukończ 50 dni rutyny",
    icon: "👑", 
    unlocked: false 
  },
];

export const ProgressAndCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState<'progress' | 'calendar' | 'capsule'>('progress');

  const currentScore = progressData[progressData.length - 1]?.score || 0;
  const previousScore = progressData[progressData.length - 2]?.score || 0;
  const scoreChange = currentScore - previousScore;

  const dayEvents = calendarEvents.filter(event => 
    selectedDate && 
    event.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <section id="progress" className="py-20 pattern-bg">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Twój Progres</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Śledź swoje postępy, planuj rutynę pielęgnacyjną i odkrywaj 
            pozytywne zmiany w swojej skórze dzień po dniu.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="card-glow p-2">
            <div className="grid grid-cols-3">
              <Button
                onClick={() => setActiveTab('progress')}
                className={activeTab === 'progress' ? 'btn-glow-primary' : ''}
                variant={activeTab === 'progress' ? 'default' : 'ghost'}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Progres
              </Button>
              <Button
                onClick={() => setActiveTab('calendar')}
                className={activeTab === 'calendar' ? 'btn-glow-primary' : ''}
                variant={activeTab === 'calendar' ? 'default' : 'ghost'}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Kalendarz
              </Button>
              <Button
                onClick={() => setActiveTab('capsule')}
                className={activeTab === 'capsule' ? 'btn-glow-primary' : ''}
                variant={activeTab === 'capsule' ? 'default' : 'ghost'}
              >
                <Clock className="w-4 h-4 mr-2" />
                Kapsuła Czasu
              </Button>
            </div>
          </Card>
        </div>

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Current Score */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="card-glow p-6 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold gradient-text">{currentScore}/100</div>
                    <div className="text-sm text-muted-foreground">Ogólny Stan Skóry</div>
                    {scoreChange > 0 && (
                      <div className="flex items-center justify-center gap-1 text-green-400 text-sm mt-2">
                        <ArrowUp className="w-3 h-3" />
                        <span>+{scoreChange} punktów</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="card-glow p-6 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary">
                      {progressData.reduce((sum, week) => sum + week.photoCount, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Przesłanych Zdjęć</div>
                  </div>
                </div>
              </Card>

              <Card className="card-glow p-6 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-glow rounded-full flex items-center justify-center mx-auto">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent">
                      {achievements.filter(a => a.unlocked).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Zdobytych Osiągnięć</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Progress Chart */}
            <Card className="card-glow p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Wykres Postępów (4 tygodnie)
              </h3>
              <div className="space-y-6">
                {progressData.map((week, index) => (
                  <div key={week.week} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Tydzień {week.week}</span>
                      <span className="text-sm text-muted-foreground">{week.score}/100</span>
                    </div>
                    <Progress value={week.score} className="h-3" />
                    <div className="flex flex-wrap gap-2">
                      {week.improvements.map((improvement, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          ✓ {improvement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card className="card-glow p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Osiągnięcia
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-lg border transition-all ${
                      achievement.unlocked 
                        ? 'bg-primary/5 border-primary/20 shadow-glow' 
                        : 'bg-muted/5 border-muted/20 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {achievement.unlocked && (
                          <Badge className="bg-green-500/20 text-green-400 text-xs mt-2">
                            Odblokowane!
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="card-glow p-6">
                <h3 className="text-xl font-semibold mb-4">Kalendarz Pielęgnacji</h3>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </Card>

              <div className="space-y-6">
                <Card className="card-glow p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Wydarzenia na {selectedDate?.toLocaleDateString('pl-PL')}
                  </h3>
                  <div className="space-y-3">
                    {dayEvents.length > 0 ? (
                      dayEvents.map((event, index) => (
                        <div 
                          key={index}
                          className={`p-3 rounded-lg border flex items-center justify-between ${
                            event.type === 'routine' ? 'bg-primary/5 border-primary/20' :
                            event.type === 'appointment' ? 'bg-secondary/5 border-secondary/20' :
                            event.type === 'reminder' ? 'bg-accent/5 border-accent/20' :
                            'bg-muted/5 border-muted/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span className="font-medium">{event.title}</span>
                          </div>
                          {event.completed !== undefined && (
                            <div>
                              {event.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-amber-400" />
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        Brak wydarzeń na ten dzień
                      </p>
                    )}
                  </div>
                </Card>

                <Card className="card-glow p-6">
                  <h3 className="text-lg font-semibold mb-4">Dodaj nowe wydarzenie</h3>
                  <div className="space-y-3">
                    <Button className="btn-glow-primary w-full justify-start">
                      <Zap className="w-4 h-4 mr-2" />
                      Dodaj rutynę pielęgnacyjną
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Zaplanuj wizytę u dermatologa
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Camera className="w-4 h-4 mr-2" />
                      Przypomnienie o zdjęciu kontrolnym
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Time Capsule Tab */}
        {activeTab === 'capsule' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <Card className="card-glow p-8 text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Kapsuła Czasu Skóry</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Porównaj swoje zdjęcia z przeszłości i zobacz niesamowity postęp! 
                    Nasza technologia AI automatycznie analizuje zmiany i tworzy 
                    inspirujące zestawienia przed/po.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-2xl">📅</div>
                    <div className="font-semibold">Automatyczne</div>
                    <div className="text-sm text-muted-foreground">Porównania co tydzień</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl">📊</div>
                    <div className="font-semibold">Analiza AI</div>
                    <div className="text-sm text-muted-foreground">Szczegółowe metryki poprawy</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl">🏆</div>
                    <div className="font-semibold">Motywacja</div>
                    <div className="text-sm text-muted-foreground">Zobacz swoje sukcesy</div>
                  </div>
                </div>

                <Button className="btn-glow-primary text-lg px-8 py-6" size="lg">
                  <Camera className="w-5 h-5 mr-2" />
                  Utwórz Pierwszą Kapsułę
                </Button>
              </div>
            </Card>

            {/* Sample Time Capsule */}
            <Card className="card-glow p-6">
              <h3 className="text-xl font-semibold mb-6 text-center">
                Przykład: Transformacja w 4 tygodnie
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <Badge className="bg-muted/20 text-muted-foreground mb-3">
                      Tydzień 1 - Start
                    </Badge>
                    <div className="w-full h-48 bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg flex items-center justify-center">
                      <Camera className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="text-sm font-medium">Wynik: 45/100</div>
                      <div className="text-xs text-muted-foreground">
                        Problemy: Trądzik, pory, zaczerwienienia
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <Badge className="bg-primary/20 text-primary mb-3">
                      Tydzień 4 - Po kuracji
                    </Badge>
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center border border-primary/30">
                      <Sparkles className="w-12 h-12 text-primary" />
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="text-sm font-medium">Wynik: 75/100</div>
                      <div className="text-xs text-primary">
                        Poprawa: +30 punktów! 🎉
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};