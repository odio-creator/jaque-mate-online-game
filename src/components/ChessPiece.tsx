
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
        w-16 h-16 flex items-center justify-center text-4xl cursor-pointer
        transition-all duration-200 hover:scale-110
        ${isSelected ? 'bg-amber-400/50 ring-2 ring-amber-500' : ''}
        ${isPossibleMove ? 'bg-green-400/30 ring-2 ring-green-500' : ''}
      `}
      onClick={onClick}
    >
      {getPieceSymbol()}
    </div>
  );
};

export default ChessPiece;
