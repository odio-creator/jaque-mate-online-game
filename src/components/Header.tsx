
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown, BookOpen, Play } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-black/90 backdrop-blur-sm border-b border-amber-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <Crown className="h-8 w-8 text-amber-500 group-hover:text-amber-400 transition-colors" />
            <span className="text-2xl font-bold text-white group-hover:text-amber-100 transition-colors">
              ChessMaster
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={location.pathname === "/" ? "default" : "ghost"}
                className="text-white hover:text-amber-100 hover:bg-amber-500/20"
              >
                <Crown className="w-4 h-4 mr-2" />
                Início
              </Button>
            </Link>
            
            <Link to="/rules">
              <Button 
                variant={location.pathname === "/rules" ? "default" : "ghost"}
                className="text-white hover:text-amber-100 hover:bg-amber-500/20"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Regras
              </Button>
            </Link>
            
            <Link to="/game">
              <Button 
                variant={location.pathname === "/game" ? "default" : "ghost"}
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
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
