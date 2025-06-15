
export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
  hasMoved?: boolean; // Para roque e movimento inicial do peão
}

export interface Position {
  row: number;
  col: number;
}

export type Board = (ChessPiece | null)[][];

export interface Move {
  from: Position;
  to: Position;
  piece: ChessPiece;
  capturedPiece?: ChessPiece;
  isEnPassant?: boolean;
  isCastle?: boolean;
  isPromotion?: boolean;
  promotionPiece?: PieceType;
}

export interface GameState {
  board: Board;
  currentPlayer: PieceColor;
  selectedSquare: Position | null;
  possibleMoves: Position[];
  gameStatus: 'playing' | 'check' | 'checkmate' | 'stalemate' | 'draw';
  moveHistory: Move[];
  enPassantTarget: Position | null; // Para captura en passant
  canCastleKingside: { white: boolean; black: boolean };
  canCastleQueenside: { white: boolean; black: boolean };
  halfMoveClock: number; // Para regra dos 50 movimentos
  fullMoveNumber: number;
}
