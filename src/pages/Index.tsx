
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Zap, Users, Trophy, Play, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <Crown className="h-20 w-20 text-amber-500 mx-auto mb-6 animate-pulse" />
            <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
              ChessMaster
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Domine a arte real do xadrez. Jogue, aprenda e conquiste seu lugar entre os mestres do tabuleiro.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8 py-4 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-amber-500/25"
            >
              <Play className="w-5 h-5 mr-2" />
              Começar a Jogar
            </Button>
            
            <Link to="/rules">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-amber-500 text-amber-500 hover:bg-amber-500/10 font-semibold text-lg px-8 py-4 rounded-lg transform hover:scale-105 transition-all duration-200"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Aprender Regras
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Por que escolher o ChessMaster?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-amber-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <Zap className="h-12 w-12 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-3">Jogo Rápido</h3>
                <p className="text-gray-300">
                  Interface intuitiva e responsiva para partidas fluidas e emocionantes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-amber-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-3">Multiplayer</h3>
                <p className="text-gray-300">
                  Desafie amigos ou jogadores de todo o mundo em partidas online.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-amber-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <Trophy className="h-12 w-12 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white mb-3">Ranking</h3>
                <p className="text-gray-300">
                  Sistema de pontuação e classificação para acompanhar seu progresso.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Pronto para se tornar um mestre?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Junte-se a milhares de jogadores e descubra por que o xadrez é conhecido como o jogo dos reis.
          </p>
          <Button 
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-12 py-4 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-amber-500/25"
          >
            <Crown className="w-5 h-5 mr-2" />
            Iniciar Jornada
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 py-8 px-4 border-t border-amber-500/20">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2024 ChessMaster. Desenvolvido para amantes do xadrez.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
