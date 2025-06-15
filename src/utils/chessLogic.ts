
import { Board, ChessPiece, Position, PieceType, PieceColor } from '@/types/chess';

export const createInitialBoard = (): Board => {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Peças brancas
  const whiteBackRow: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  whiteBackRow.forEach((type, col) => {
    board[7][col] = { type, color: 'white' };
  });
  for (let col = 0; col < 8; col++) {
    board[6][col] = { type: 'pawn', color: 'white' };
  }
  
  // Peças pretas
  const blackBackRow: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  blackBackRow.forEach((type, col) => {
    board[0][col] = { type, color: 'black' };
  });
  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: 'pawn', color: 'black' };
  }
  
  return board;
};

export const isValidPosition = (pos: Position): boolean => {
  return pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8;
};

export const getPossibleMoves = (board: Board, from: Position): Position[] => {
  const piece = board[from.row][from.col];
  if (!piece) return [];
  
  const moves: Position[] = [];
  
  switch (piece.type) {
    case 'pawn':
      const direction = piece.color === 'white' ? -1 : 1;
      const startRow = piece.color === 'white' ? 6 : 1;
      
      // Movimento para frente
      const oneStep = { row: from.row + direction, col: from.col };
      if (isValidPosition(oneStep) && !board[oneStep.row][oneStep.col]) {
        moves.push(oneStep);
        
        // Dois passos no primeiro movimento
        if (from.row === startRow) {
          const twoSteps = { row: from.row + 2 * direction, col: from.col };
          if (isValidPosition(twoSteps) && !board[twoSteps.row][twoSteps.col]) {
            moves.push(twoSteps);
          }
        }
      }
      
      // Capturas diagonais
      [-1, 1].forEach(colOffset => {
        const capturePos = { row: from.row + direction, col: from.col + colOffset };
        if (isValidPosition(capturePos)) {
          const targetPiece = board[capturePos.row][capturePos.col];
          if (targetPiece && targetPiece.color !== piece.color) {
            moves.push(capturePos);
          }
        }
      });
      break;
      
    case 'rook':
      // Movimentos horizontais e verticais
      const rookDirections = [[0, 1], [0, -1], [1, 0], [-1, 0]];
      rookDirections.forEach(([rowDir, colDir]) => {
        for (let i = 1; i < 8; i++) {
          const newPos = { row: from.row + i * rowDir, col: from.col + i * colDir };
          if (!isValidPosition(newPos)) break;
          
          const targetPiece = board[newPos.row][newPos.col];
          if (!targetPiece) {
            moves.push(newPos);
          } else {
            if (targetPiece.color !== piece.color) {
              moves.push(newPos);
            }
            break;
          }
        }
      });
      break;
      
    // Adicione mais lógica para outras peças conforme necessário
    default:
      // Implementação básica para outras peças
      break;
  }
  
  return moves;
};

export const isValidMove = (board: Board, from: Position, to: Position): boolean => {
  const possibleMoves = getPossibleMoves(board, from);
  return possibleMoves.some(move => move.row === to.row && move.col === to.col);
};
