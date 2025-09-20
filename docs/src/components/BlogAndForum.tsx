import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  Clock, 
  Eye, 
  Send,
  Plus,
  TrendingUp,
  Heart,
  MessageCircle
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  avatar: string;
  date: string;
  views: number;
  likes: number;
  comments: number;
  category: string;
  tags: string[];
}

interface ForumTopic {
  id: string;
  title: string;
  author: string;
  avatar: string;
  date: string;
  replies: number;
  views: number;
  category: string;
  isHot: boolean;
  lastReply: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Jak skutecznie zwalczać trądzik w okresie jesienno-zimowym?",
    excerpt: "Odkryj najlepsze metody pielęgnacji skóry trądzikowej w chłodniejszych miesiącach. Poznaj produkty, które naprawdę działają i unikaj najczęstszych błędów...",
    author: "Dr Anna Kowalska",
    avatar: "👩‍⚕️", 
    date: "2 dni temu",
    views: 1234,
    likes: 89,
    comments: 23,
    category: "Dermatologia",
    tags: ["trądzik", "jesień", "pielęgnacja"]
  },
  {
    id: "2", 
    title: "Naturalne sposoby na rozstępy - co naprawdę działa?",
    excerpt: "Przegląd naturalnych metod redukcji rozstępów. Od olejków po masaże - sprawdź, które składniki mają potwierdzone działanie naukowe...",
    author: "Katarzyna Nowak",
    avatar: "🧴",
    date: "5 dni temu", 
    views: 987,
    likes: 67,
    comments: 18,
    category: "Naturalna pielęgnacja",
    tags: ["rozstępy", "naturalne", "oleje"]
  },
  {
    id: "3",
    title: "Łuszczyca - najnowsze odkrycia w leczeniu 2024", 
    excerpt: "Przełomowe badania nad łuszczycą i nowe możliwości terapeutyczne. Co nowego oferuje medycyna i jak wspierać leczenie w domu...",
    author: "Prof. Jan Wiśniewski",
    avatar: "👨‍🔬",
    date: "1 tydzień temu",
    views: 2156,
    likes: 134,
    comments: 45,
    category: "Badania naukowe", 
    tags: ["łuszczyca", "leczenie", "nauka"]
  }
];

const forumTopics: ForumTopic[] = [
  {
    id: "1",
    title: "Pomóżcie! Nic nie pomaga na moje przebarwienia",
    author: "Ania23", 
    avatar: "👱‍♀️",
    date: "15 min temu",
    replies: 8,
    views: 45,
    category: "Problemy skórne",
    isHot: true,
    lastReply: "2 min temu"
  },
  {
    id: "2",
    title: "Który serum z witaminą C polecacie?",
    author: "SkinLover88",
    avatar: "✨", 
    date: "2 godziny temu",
    replies: 23,
    views: 156,
    category: "Produkty",
    isHot: true,
    lastReply: "20 min temu"
  },
  {
    id: "3",
    title: "Moja transformacja skóry - zdjęcia przed i po",
    author: "Martyna_K",
    avatar: "💫",
    date: "4 godziny temu", 
    replies: 67,
    views: 892,
    category: "Sukcesy",
    isHot: false,
    lastReply: "1 godzina temu"
  }
];

export const BlogAndForum = () => {
  const [activeTab, setActiveTab] = useState<'blog' | 'forum'>('blog');
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  return (
    <section id="blog" className="py-20 pattern-bg">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Blog & Forum</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dziel się doświadczeniami, zadawaj pytania i ucz się od innych. 
            Nasza społeczność to najlepsze źródło sprawdzonych porad.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="card-glow p-2">
            <div className="flex">
              <Button
                onClick={() => setActiveTab('blog')}
                className={activeTab === 'blog' ? 'btn-glow-primary flex-1' : 'flex-1'}
                variant={activeTab === 'blog' ? 'default' : 'ghost'}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Blog Ekspercki
              </Button>
              <Button
                onClick={() => setActiveTab('forum')}
                className={activeTab === 'forum' ? 'btn-glow-primary flex-1' : 'flex-1'}
                variant={activeTab === 'forum' ? 'default' : 'ghost'}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Forum Społeczności
              </Button>
            </div>
          </Card>
        </div>

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Featured Post */}
            <Card className="card-glow p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{blogPosts[0].avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-primary/20 text-primary">Polecane</Badge>
                      <Badge variant="outline">{blogPosts[0].category}</Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 gradient-text">
                      {blogPosts[0].title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{blogPosts[0].author}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{blogPosts[0].date}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{blogPosts[0].views}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="btn-glow-secondary">
                          <Heart className="w-4 h-4 mr-1" />
                          {blogPosts[0].likes}
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {blogPosts[0].comments}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Other Posts */}
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts.slice(1).map((post) => (
                <Card key={post.id} className="card-glow p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{post.avatar}</div>
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">
                          {post.category}
                        </Badge>
                        <h4 className="font-semibold text-lg leading-tight">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Forum Tab */}
        {activeTab === 'forum' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* New Topic Form */}
            <Card className="card-glow p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  Rozpocznij nowy temat
                </h3>
                <div className="space-y-3">
                  <Input
                    placeholder="Tytuł tematu..."
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Opisz swój problem lub zadaj pytanie..."
                    className="min-h-[100px]"
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  />
                  <div className="flex justify-end">
                    <Button className="btn-glow-primary">
                      <Send className="w-4 h-4 mr-2" />
                      Opublikuj temat
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Hot Topics */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Gorące tematy
              </h3>
              <div className="space-y-3">
                {forumTopics.map((topic) => (
                  <Card key={topic.id} className="card-glow p-4 hover:scale-[1.01] transition-transform cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-2xl">{topic.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm truncate">{topic.title}</h4>
                            {topic.isHot && (
                              <Badge className="bg-red-500/20 text-red-400 text-xs">🔥 HOT</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{topic.author}</span>
                            <span>•</span>
                            <span>{topic.date}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {topic.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="text-center">
                          <div className="font-medium text-primary">{topic.replies}</div>
                          <div>odpowiedzi</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{topic.views}</div>
                          <div>wyświetleń</div>
                        </div>
                        <div className="text-right min-w-0">
                          <div className="text-xs">Ostatnia:</div>
                          <div className="text-xs truncate">{topic.lastReply}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Forum Stats */}
            <Card className="card-glow p-6">
              <h3 className="text-lg font-semibold mb-4">Statystyki Społeczności</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-primary">2,847</div>
                  <div className="text-xs text-muted-foreground">Członków</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-secondary">1,234</div>
                  <div className="text-xs text-muted-foreground">Tematów</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-accent">5,678</div>
                  <div className="text-xs text-muted-foreground">Postów</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-foreground">142</div>
                  <div className="text-xs text-muted-foreground">Online teraz</div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};
