
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown, BookOpen, Play } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-purple-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <Crown className="h-8 w-8 text-purple-500 group-hover:text-purple-400 transition-colors" />
            <span className="text-2xl font-bold text-slate-100 group-hover:text-purple-100 transition-colors">
              ChessMaster
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={location.pathname === "/" ? "default" : "ghost"}
                className="text-slate-100 hover:text-purple-100 hover:bg-purple-600/20"
              >
                <Crown className="w-4 h-4 mr-2" />
                Início
              </Button>
            </Link>
            
            <Link to="/rules">
              <Button 
                variant={location.pathname === "/rules" ? "default" : "ghost"}
                className="text-slate-100 hover:text-purple-100 hover:bg-purple-600/20"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Regras
              </Button>
            </Link>
            
            <Link to="/game">
              <Button 
                variant={location.pathname === "/game" ? "default" : "ghost"}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg"
              >
                <Play className="w-4 h-4 mr-2" />
                Jogar
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
