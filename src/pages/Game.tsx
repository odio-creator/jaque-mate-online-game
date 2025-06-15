
import Header from "@/components/Header";
import ChessBoard from "@/components/ChessBoard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Game = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:text-amber-100 hover:bg-amber-500/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Jogo de Xadrez
          </h1>
          <p className="text-gray-300 text-lg">
            Clique em uma peça para selecioná-la e depois clique no destino para mover
          </p>
        </div>
        
        <div className="flex justify-center">
          <ChessBoard />
        </div>
      </div>
    </div>
  );
};

export default Game;
