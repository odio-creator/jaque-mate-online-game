import { ChessPiece as ChessPieceType } from '@/types/chess';

interface ChessPieceProps {
  piece: ChessPieceType | null;
  onClick: () => void;
  isSelected: boolean;
  isPossibleMove: boolean;
}

// SVG icons for chess pieces (using modern, beautiful designs)
const pieceSvgs: Record<string, string> = {
  'white-king': `
    <svg viewBox="0 0 45 45" class="w-12 h-12">
      <g fill="#ffffff" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 22.5,11.63 L 22.5,6" stroke-linejoin="miter"/>
        <path d="M 20,8 L 25,8" stroke-linejoin="miter"/>
        <path d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25" stroke-linecap="butt" stroke-linejoin="miter"/>
        <path d="M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37" stroke-linecap="butt"/>
        <path d="M 12.5,30 C 18,27 27,27 32.5,30" fill="none"/>
        <path d="M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5" fill="none"/>
        <path d="M 12.5,37 C 18,34 27,34 32.5,37" fill="none"/>
      </g>
    </svg>
  `,
  'white-queen': `
    <svg viewBox="0 0 45 45" class="w-12 h-12">
      <g fill="#ffffff" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 Z" stroke-linecap="butt"/>
        <path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 Z" stroke-linecap="butt"/>
        <path d="M 11.5,30 C 15,29 30,29 33.5,30" fill="none"/>
        <path d="M 12,33.5 C 18,32.5 27,32.5 33,33.5" fill="none"/>
        <circle cx="6" cy="12" r="2"/>
        <circle cx="14" cy="9" r="2"/>
        <circle cx="22.5" cy="8" r="2"/>
        <circle cx="31" cy="9" r="2"/>
        <circle cx="39" cy="12" r="2"/>
      </g>
    </svg>
  `,
  'white-rook': `
    <svg viewBox="0 0 45 45" class="w-12 h-12">
      <g fill="#ffffff" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 Z " stroke-linecap="butt"/>
        <path d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 Z " stroke-linecap="butt"/>
        <path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 Z " stroke-linecap="butt"/>
        <path d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 Z " stroke-linecap="butt" stroke-linejoin="miter"/>
        <path d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 Z " stroke-linecap="butt"/>
        <path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 Z " stroke-linecap="butt"/>
        <path d="M 12,35.5 L 33,35.5 L 33,35.5" fill="none" stroke-width="1"/>
        <path d="M 13,31.5 L 32,31.5" fill="none" stroke-width="1"/>
        <path d="M 14,29.5 L 31,29.5" fill="none" stroke-width="1"/>
        <path d="M 14,16.5 L 31,16.5" fill="none" stroke-width="1"/>
        <path d="M 11,14 L 34,14" fill="none" stroke-width="1"/>
      </g>
    </svg>
  `,
  'white-bishop': `
    <svg viewBox="0 0 45 45" class="w-12 h-12">
      <g fill="#ffffff" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <g fill="none" stroke="#000000" stroke-linecap="butt">
          <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 Z"/>
          <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 Z"/>
          <path d="M 25 8 A 2.5 2.5 0 1 1 20,8 A 2.5 2.5 0 1 1 25 8 Z"/>
        </g>
        <path d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18" stroke="#000000" stroke-linejoin="miter"/>
      </g>
    </svg>
  `,
  'white-knight': `
    <svg viewBox="0 0 45 45" class="w-12 h-12">
      <g fill="#ffffff" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" style="fill:#ffffff; stroke:#000000;"/>
        <path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10" style="fill:#ffffff; stroke:#000000;"/>
        <path d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 Z" style="fill:#000000; stroke:#000000;"/>
        <path d="M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 Z" style="fill:#000000; stroke:#000000;" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"/>
      </g>
    </svg>
  `,
  'white-pawn': `
    <svg viewBox="0 0 45 45" class="w-12 h-12">
      <g fill="#ffffff" stroke="#000000" stroke-width="1.5" stroke-linecap="round">
        <path d="M 22.5,9 C 19.89,9 18,6.59 18,6.59 C 18,6.59 13.5,7.4 13.5,16.5 C 13.5,24.5 16,27.5 18.5,29.5 L 25.5,29.5 C 28,27.5 30.5,24.5 30.5,16.5 C 30.5,7.4 26,6.59 26,6.59 C 26,6.59 24.11,9 22.5,9 Z" stroke-linecap="butt"/>
        <path d="M 22.5,11.5 A 2.5 2.5 0 1 1 20,11.5 A 2.5 2.5 0 1 1 22.5 11.5 Z"/>
        <path d="M 20,8 L 25,8"/>
        <path d="M 20,28 C 20,28 20,28 20,28 L 16,33.5 C 16,33.5 18,34.5 22.5,34.5 C 27,34.5 29,33.5 29,33.5 L 25,28 C 25,28 25,28 25,28 Z" stroke-linecap="butt"/>
        <path d="M 18.5,29.5 L 25.5,29.5" fill="none"/>
      </g>
    </svg>
  `,
  'black-king': `
    <svg viewBox="0 0 45 45" class="w-12 h-12">
      <g fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 22.5,11.63 L 22.5,6" stroke-linejoin="miter"/>
        <path d="M 20,8 L 25,8" stroke-linejoin="miter"/>
        <path d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25" stroke-linecap="butt" stroke-linejoin="miter"/>
        <path d="M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37" stroke-linecap="butt"/>
        <path d="M 12.5,30 C 18,27 27,27 32.5,30 M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5 M 12.5,37 C 18,34 27,34 32.5,37"/>
      </g>
    </svg>
  `,
  'black-queen': `
    <svg viewBox="0 0 45 45" class="w-12 h-12">
      <g fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <g stroke="#000000">
          <circle cx="6" cy="12" r="2.75"/>
          <circle cx="14" cy="9" r="2.75"/>
          <circle cx="22.5" cy="8" r="2.75"/>
          <circle cx="31" cy="9" r="2.75"/>
          <circle cx="39" cy="12" r="2.75"/>
        </g>
        <path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 Z" stroke-linecap="butt"/>
        <path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 Z" stroke-linecap="butt"/>
        <path d="M 11,38.5 A 35,35 1 0 0 34,38.5" fill="none" stroke-linecap="butt"/>
        <path d="M 11,29 A 35,35 1 0 1 34,29" fill="none" stroke-linecap="butt"/>
        <path d="M 12.5,31.5 L 32.5,31.5" fill="none"/>
        <path d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5" fill="none" stroke-linecap="butt"/>
        <path d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5" fill="none" stroke-linecap="butt"/>
      </g>
    </svg>
  `,
  'black-rook': `
    <svg viewBox="0 0 45 45" class="w-12 h-12">
      <g fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 Z " stroke-linecap="butt"/>
        <path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 Z " stroke-linecap="butt"/>
        <path d="M 11,14 L 34,14" fill="none"/>
        <path d="M 12,35.5 L 33,35.5" fill="none"/>
        <path d="M 13,31.5 L 32,31.5" fill="none"/>
        <path d="M 12,14 L 12,9 L 16,9 L 16,11 L 21,11 L 21,9 L 24,9 L 24,11 L 29,11 L 29,9 L 33,9 L 33,14"/>
        <path d="M 12,32 L 12,14"/>
        <path d="M 33,32 L 33,14"/>
      </g>
    </svg>
  `,
  'black-bishop': `
    <svg viewBox="0 0 45 45" class="w-12 h-12">
      <g fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <g fill="none" stroke="#000000" stroke-linecap="butt">
          <path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 Z"/>
          <path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 Z"/>
          <path d="M 25 8 A 2.5 2.5 0 1 1 20,8 A 2.5 2.5 0 1 1 25 8 Z"/>
        </g>
        <path d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18" stroke-linejoin="miter"/>
      </g>
    </svg>
  `,
  'black-knight': `
    <svg viewBox="0 0 45 45" class="w-12 h-12">
      <g fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"/>
        <path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"/>
        <path d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 Z" fill="#000000" stroke="#000000"/>
        <path d="M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 Z" fill="#000000" stroke="#000000" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"/>
        <path d="M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 Z " fill="#000000" stroke="none"/>
      </g>
    </svg>
  `,
  'black-pawn': `
    <svg viewBox="0 0 45 45" class="w-12 h-12">
      <g fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round">
        <path d="M 22.5,9 C 19.89,9 18,6.59 18,6.59 C 18,6.59 13.5,7.4 13.5,16.5 C 13.5,24.5 16,27.5 18.5,29.5 L 25.5,29.5 C 28,27.5 30.5,24.5 30.5,16.5 C 30.5,7.4 26,6.59 26,6.59 C 26,6.59 24.11,9 22.5,9 Z" stroke-linecap="butt"/>
        <path d="M 22.5,11.5 A 2.5 2.5 0 1 1 20,11.5 A 2.5 2.5 0 1 1 22.5 11.5 Z"/>
        <path d="M 20,8 L 25,8"/>
        <path d="M 20,28 C 20,28 20,28 20,28 L 16,33.5 C 16,33.5 18,34.5 22.5,34.5 C 27,34.5 29,33.5 29,33.5 L 25,28 C 25,28 25,28 25,28 Z" stroke-linecap="butt"/>
        <path d="M 18.5,29.5 L 25.5,29.5" fill="none"/>
      </g>
    </svg>
  `,
};

// Fallback Unicode symbols if SVG fails to load
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
  const getPieceSvg = () => {
    if (!piece) return '';
    return pieceSvgs[`${piece.color}-${piece.type}`] || '';
  };

  const getPieceSymbol = () => {
    if (!piece) return '';
    return pieceSymbols[`${piece.color}-${piece.type}`] || '';
  };

  const isWhitePiece = piece?.color === 'white';

  return (
    <div
      className={`
        w-16 h-16 flex items-center justify-center cursor-pointer
        relative transition-all duration-500 ease-out transform-gpu
        rounded-xl overflow-hidden
        ${piece ? 'hover:scale-110 hover:rotate-2 hover:z-20' : ''}
        ${isSelected ? 
          'bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 ring-4 ring-yellow-400 shadow-2xl shadow-yellow-500/60 animate-pulse scale-105' : 
          ''
        }
        ${isPossibleMove ? 
          'bg-gradient-to-br from-emerald-300 via-green-400 to-teal-500 ring-3 ring-emerald-400 shadow-xl shadow-emerald-500/50' : 
          ''
        }
        ${piece && !isSelected && !isPossibleMove ? 
          'hover:bg-gradient-to-br hover:from-slate-100 hover:via-slate-200 hover:to-slate-300 hover:shadow-2xl hover:shadow-slate-500/40' : 
          ''
        }
      `}
      onClick={onClick}
    >
      {piece && (
        <div className="relative flex items-center justify-center">
          {/* Aura/Glow effect behind the piece */}
          <div 
            className={`
              absolute inset-0 flex items-center justify-center
              ${isWhitePiece ? 
                'drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]' : 
                'drop-shadow-[0_0_12px_rgba(147,51,234,0.8)]'
              }
              scale-125 opacity-60 blur-sm
            `}
          >
            <div dangerouslySetInnerHTML={{ __html: getPieceSvg() }} />
          </div>
          
          {/* Main piece SVG with enhanced styling */}
          <div 
            className={`
              relative z-10 flex items-center justify-center
              transition-all duration-300 ease-out
              ${isWhitePiece ? 
                'drop-shadow-[0_0_8px_rgba(59,130,246,0.9)]' : 
                'drop-shadow-[0_0_8px_rgba(147,51,234,0.9)]'
              }
              ${isSelected ? 'animate-bounce scale-110' : ''}
              hover:scale-110 filter contrast-125 brightness-110
            `}
            style={{
              filter: isWhitePiece ? 
                'drop-shadow(0 0 8px rgba(59, 130, 246, 0.9)) drop-shadow(0 0 16px rgba(59, 130, 246, 0.6))' :
                'drop-shadow(0 0 8px rgba(147, 51, 234, 0.9)) drop-shadow(0 0 16px rgba(147, 51, 234, 0.6))'
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: getPieceSvg() }} />
          </div>

          {/* Fallback symbol if SVG fails */}
          <div 
            className={`
              absolute inset-0 flex items-center justify-center
              text-4xl font-bold select-none
              ${isWhitePiece ? 'text-blue-600' : 'text-purple-900'}
              ${getPieceSvg() ? 'opacity-0' : 'opacity-100'}
            `}
          >
            {getPieceSymbol()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChessPiece;
