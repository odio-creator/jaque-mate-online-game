
import { ChessPiece as ChessPieceType } from '@/types/chess';

interface ChessPieceProps {
  piece: ChessPieceType | null;
  onClick: () => void;
  isSelected: boolean;
  isPossibleMove: boolean;
}

const pieceSymbols: Record<string, string> = {
  'white-king': '♔',
  'white-queen': '♕',
  'white-rook': '♖',
  'white-bishop': '♗',
  'white-knight': '♘',
  'white-pawn': '♙',
  'black-king': '♚',
  'black-queen': '♛',
  'black-rook': '♜',
  'black-bishop': '♝',
  'black-knight': '♞',
  'black-pawn': '♟',
};

const ChessPiece = ({ piece, onClick, isSelected, isPossibleMove }: ChessPieceProps) => {
  const getPieceSymbol = () => {
    if (!piece) return '';
    return pieceSymbols[`${piece.color}-${piece.type}`] || '';
  };

  return (
    <div
      className={`
        w-16 h-16 flex items-center justify-center text-5xl cursor-pointer
        relative transition-all duration-300 ease-in-out
        ${piece ? 'hover:scale-125 hover:z-10' : ''}
        ${isSelected ? 'bg-amber-400/60 ring-4 ring-amber-500 shadow-lg shadow-amber-500/30' : ''}
        ${isPossibleMove ? 'bg-green-400/40 ring-3 ring-green-500 shadow-md shadow-green-500/30' : ''}
        ${piece ? 'hover:shadow-xl hover:shadow-black/30' : ''}
      `}
      onClick={onClick}
    >
      {piece && (
        <div 
          className={`
            text-gray-900
            drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]
            filter contrast-125 brightness-110
            transition-all duration-200
            ${isSelected ? 'animate-pulse' : ''}
          `}
          style={{
            textShadow: '2px 2px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 2px 2px 4px rgba(255,255,255,0.3)'
          }}
        >
          {getPieceSymbol()}
        </div>
      )}
      
      {isPossibleMove && !piece && (
        <div className="w-6 h-6 bg-green-500 rounded-full opacity-60 animate-pulse" />
      )}
    </div>
  );
};

export default ChessPiece;
