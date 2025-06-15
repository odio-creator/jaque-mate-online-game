
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Rules = () => {
  const pieces = [
    {
      name: "Rei",
      symbol: "♔",
      movement: "Uma casa em qualquer direção",
      special: "Não pode se colocar em xeque"
    },
    {
      name: "Rainha",
      symbol: "♕",
      movement: "Qualquer número de casas na horizontal, vertical ou diagonal",
      special: "Peça mais poderosa do tabuleiro"
    },
    {
      name: "Torre",
      symbol: "♖",
      movement: "Qualquer número de casas na horizontal ou vertical",
      special: "Participa do roque"
    },
    {
      name: "Bispo",
      symbol: "♗",
      movement: "Qualquer número de casas na diagonal",
      special: "Cada jogador tem um bispo de casas claras e outro de casas escuras"
    },
    {
      name: "Cavalo",
      symbol: "♘",
      movement: "Em forma de 'L': 2 casas em uma direção e 1 na perpendicular",
      special: "Única peça que pode 'pular' sobre outras"
    },
    {
      name: "Peão",
      symbol: "♙",
      movement: "Uma casa para frente (duas no primeiro movimento)",
      special: "Captura na diagonal; pode promover ao chegar na última fileira"
    }
  ];

  const basicRules = [
    "O objetivo é dar xeque-mate no rei adversário",
    "As peças brancas sempre começam primeiro",
    "Cada jogador move uma peça por vez",
    "Uma peça não pode ocupar a mesma casa de uma peça aliada",
    "Quando uma peça move para uma casa ocupada pelo adversário, a peça adversária é capturada",
    "O rei não pode se mover para uma casa onde ficaria em xeque",
    "Se o rei está em xeque, o jogador deve sair do xeque no próximo movimento"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="text-amber-500 hover:text-amber-400 hover:bg-amber-500/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <Crown className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Regras do Xadrez</h1>
          <p className="text-gray-300 text-lg">
            Aprenda as regras fundamentais do jogo mais nobre do mundo
          </p>
        </div>

        {/* Objetivo do Jogo */}
        <Card className="bg-slate-800/50 border-amber-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-500 flex items-center">
              <Crown className="w-6 h-6 mr-2" />
              Objetivo do Jogo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-lg leading-relaxed">
              O objetivo principal do xadrez é dar <strong className="text-white">xeque-mate</strong> no rei adversário. 
              Isso significa colocar o rei em uma posição onde ele está sob ataque (em xeque) e não há movimento 
              legal que possa salvá-lo da captura no próximo lance.
            </p>
          </CardContent>
        </Card>

        {/* Regras Básicas */}
        <Card className="bg-slate-800/50 border-amber-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-500 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" />
              Regras Básicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {basicRules.map((rule, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Movimento das Peças */}
        <Card className="bg-slate-800/50 border-amber-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-500">
              Movimento das Peças
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {pieces.map((piece, index) => (
                <div key={index} className="bg-slate-700/30 p-4 rounded-lg border border-amber-500/10">
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">{piece.symbol}</span>
                    <h3 className="text-xl font-semibold text-white">{piece.name}</h3>
                  </div>
                  <p className="text-gray-300 mb-2">
                    <strong>Movimento:</strong> {piece.movement}
                  </p>
                  {piece.special && (
                    <p className="text-amber-200 text-sm">
                      <strong>Especial:</strong> {piece.special}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Movimentos Especiais */}
        <Card className="bg-slate-800/50 border-amber-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-500">
              Movimentos Especiais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Roque</h3>
              <p className="text-gray-300">
                Movimento especial que envolve o rei e uma torre. O rei move duas casas em direção à torre, 
                e a torre move para a casa que o rei atravessou. Só é possível se nenhuma das peças se moveu 
                anteriormente e não há peças entre elas.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">En Passant</h3>
              <p className="text-gray-300">
                Captura especial de peão. Se um peão adversário mover duas casas e ficar ao lado do seu peão, 
                você pode capturá-lo como se ele tivesse movido apenas uma casa.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Promoção</h3>
              <p className="text-gray-300">
                Quando um peão alcança a última fileira do tabuleiro, deve ser promovido a qualquer peça 
                (exceto rei), geralmente uma rainha.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Fim do Jogo */}
        <Card className="bg-slate-800/50 border-amber-500/20 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-500">
              Como o Jogo Termina
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Xeque-mate</h3>
                <p className="text-gray-300">O rei está em xeque e não há movimento legal para escapar.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Empate (Pat)</h3>
                <p className="text-gray-300">O jogador não tem movimentos legais, mas o rei não está em xeque.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Acordo Mútuo</h3>
                <p className="text-gray-300">Ambos os jogadores concordam em empatar.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Repetição</h3>
                <p className="text-gray-300">A mesma posição ocorre três vezes ou 50 movimentos sem captura ou movimento de peão.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Pronto para aplicar seu conhecimento?
          </h2>
          <p className="text-gray-300 mb-6">
            Agora que você conhece as regras, que tal começar a jogar?
          </p>
          <Button 
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8 py-4 rounded-lg transform hover:scale-105 transition-all duration-200"
          >
            <Crown className="w-5 h-5 mr-2" />
            Começar a Jogar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Rules;
