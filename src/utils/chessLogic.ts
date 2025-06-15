
import { Board, ChessPiece, Position, PieceType, PieceColor, GameState, Move } from '@/types/chess';

export const createInitialBoard = (): Board => {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Peças brancas
  const whiteBackRow: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  whiteBackRow.forEach((type, col) => {
    board[7][col] = { type, color: 'white', hasMoved: false };
  });
  for (let col = 0; col < 8; col++) {
    board[6][col] = { type: 'pawn', color: 'white', hasMoved: false };
  }
  
  // Peças pretas
  const blackBackRow: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
  blackBackRow.forEach((type, col) => {
    board[0][col] = { type, color: 'black', hasMoved: false };
  });
  for (let col = 0; col < 8; col++) {
    board[1][col] = { type: 'pawn', color: 'black', hasMoved: false };
  }
  
  return board;
};

export const createInitialGameState = (): GameState => ({
  board: createInitialBoard(),
  currentPlayer: 'white',
  selectedSquare: null,
  possibleMoves: [],
  gameStatus: 'playing',
  moveHistory: [],
  enPassantTarget: null,
  canCastleKingside: { white: true, black: true },
  canCastleQueenside: { white: true, black: true },
  halfMoveClock: 0,
  fullMoveNumber: 1,
});

export const isValidPosition = (pos: Position): boolean => {
  return pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8;
};

export const findKing = (board: Board, color: PieceColor): Position | null => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.type === 'king' && piece.color === color) {
        return { row, col };
      }
    }
  }
  return null;
};

export const isSquareAttacked = (board: Board, position: Position, byColor: PieceColor): boolean => {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === byColor) {
        const moves = getPossibleMovesForPiece(board, { row, col }, piece, null, false);
        if (moves.some(move => move.row === position.row && move.col === position.col)) {
          return true;
        }
      }
    }
  }
  return false;
};

export const isInCheck = (board: Board, color: PieceColor): boolean => {
  const kingPos = findKing(board, color);
  if (!kingPos) return false;
  
  const opponentColor = color === 'white' ? 'black' : 'white';
  return isSquareAttacked(board, kingPos, opponentColor);
};

export const makeMove = (board: Board, move: Move): Board => {
  const newBoard = board.map(row => [...row]);
  
  // Movimento básico
  newBoard[move.to.row][move.to.col] = { ...move.piece, hasMoved: true };
  newBoard[move.from.row][move.from.col] = null;
  
  // En passant
  if (move.isEnPassant) {
    const captureRow = move.piece.color === 'white' ? move.to.row + 1 : move.to.row - 1;
    newBoard[captureRow][move.to.col] = null;
  }
  
  // Roque
  if (move.isCastle) {
    const row = move.piece.color === 'white' ? 7 : 0;
    if (move.to.col === 6) { // Roque pequeno
      newBoard[row][5] = newBoard[row][7];
      newBoard[row][7] = null;
      if (newBoard[row][5]) newBoard[row][5].hasMoved = true;
    } else if (move.to.col === 2) { // Roque grande
      newBoard[row][3] = newBoard[row][0];
      newBoard[row][0] = null;
      if (newBoard[row][3]) newBoard[row][3].hasMoved = true;
    }
  }
  
  // Promoção
  if (move.isPromotion && move.promotionPiece) {
    newBoard[move.to.row][move.to.col] = {
      type: move.promotionPiece,
      color: move.piece.color,
      hasMoved: true
    };
  }
  
  return newBoard;
};

export const wouldBeInCheck = (board: Board, move: Move, color: PieceColor): boolean => {
  const newBoard = makeMove(board, move);
  return isInCheck(newBoard, color);
};

export const getPossibleMovesForPiece = (
  board: Board, 
  from: Position, 
  piece: ChessPiece, 
  enPassantTarget: Position | null,
  checkForCheck: boolean = true
): Position[] => {
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
          
          // En passant
          if (enPassantTarget && 
              capturePos.row === enPassantTarget.row && 
              capturePos.col === enPassantTarget.col) {
            moves.push(capturePos);
          }
        }
      });
      break;
      
    case 'rook':
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
      
    case 'bishop':
      const bishopDirections = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
      bishopDirections.forEach(([rowDir, colDir]) => {
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
      
    case 'queen':
      const queenDirections = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
      queenDirections.forEach(([rowDir, colDir]) => {
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
      
    case 'king':
      const kingDirections = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
      kingDirections.forEach(([rowDir, colDir]) => {
        const newPos = { row: from.row + rowDir, col: from.col + colDir };
        if (isValidPosition(newPos)) {
          const targetPiece = board[newPos.row][newPos.col];
          if (!targetPiece || targetPiece.color !== piece.color) {
            moves.push(newPos);
          }
        }
      });
      break;
      
    case 'knight':
      const knightMoves = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
      ];
      knightMoves.forEach(([rowOffset, colOffset]) => {
        const newPos = { row: from.row + rowOffset, col: from.col + colOffset };
        if (isValidPosition(newPos)) {
          const targetPiece = board[newPos.row][newPos.col];
          if (!targetPiece || targetPiece.color !== piece.color) {
            moves.push(newPos);
          }
        }
      });
      break;
  }
  
  // Filtrar movimentos que deixariam o rei em xeque
  if (checkForCheck) {
    return moves.filter(to => {
      const move: Move = {
        from,
        to,
        piece,
        capturedPiece: board[to.row][to.col] || undefined,
        isEnPassant: piece.type === 'pawn' && enPassantTarget && 
                     to.row === enPassantTarget.row && to.col === enPassantTarget.col,
      };
      return !wouldBeInCheck(board, move, piece.color);
    });
  }
  
  return moves;
};

export const getCastlingMoves = (
  board: Board, 
  color: PieceColor, 
  canCastleKingside: boolean, 
  canCastleQueenside: boolean
): Position[] => {
  const moves: Position[] = [];
  const row = color === 'white' ? 7 : 0;
  const king = board[row][4];
  
  if (!king || king.type !== 'king' || king.hasMoved) return moves;
  if (isInCheck(board, color)) return moves;
  
  // Roque pequeno
  if (canCastleKingside) {
    const rook = board[row][7];
    if (rook && rook.type === 'rook' && !rook.hasMoved &&
        !board[row][5] && !board[row][6] &&
        !isSquareAttacked(board, { row, col: 5 }, color === 'white' ? 'black' : 'white') &&
        !isSquareAttacked(board, { row, col: 6 }, color === 'white' ? 'black' : 'white')) {
      moves.push({ row, col: 6 });
    }
  }
  
  // Roque grande
  if (canCastleQueenside) {
    const rook = board[row][0];
    if (rook && rook.type === 'rook' && !rook.hasMoved &&
        !board[row][1] && !board[row][2] && !board[row][3] &&
        !isSquareAttacked(board, { row, col: 2 }, color === 'white' ? 'black' : 'white') &&
        !isSquareAttacked(board, { row, col: 3 }, color === 'white' ? 'black' : 'white')) {
      moves.push({ row, col: 2 });
    }
  }
  
  return moves;
};

export const getPossibleMoves = (
  board: Board, 
  from: Position, 
  enPassantTarget: Position | null,
  canCastleKingside: { white: boolean; black: boolean },
  canCastleQueenside: { white: boolean; black: boolean }
): Position[] => {
  const piece = board[from.row][from.col];
  if (!piece) return [];
  
  let moves = getPossibleMovesForPiece(board, from, piece, enPassantTarget);
  
  // Adicionar movimentos de roque para o rei
  if (piece.type === 'king') {
    const castlingMoves = getCastlingMoves(
      board, 
      piece.color,
      canCastleKingside[piece.color],
      canCastleQueenside[piece.color]
    );
    moves = [...moves, ...castlingMoves];
  }
  
  return moves;
};

export const getAllPossibleMoves = (board: Board, color: PieceColor, gameState: GameState): Move[] => {
  const moves: Move[] = [];
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color === color) {
        const from = { row, col };
        const possibleMoves = getPossibleMoves(
          board, 
          from, 
          gameState.enPassantTarget,
          gameState.canCastleKingside,
          gameState.canCastleQueenside
        );
        
        possibleMoves.forEach(to => {
          const capturedPiece = board[to.row][to.col];
          const isEnPassant = piece.type === 'pawn' && 
                              gameState.enPassantTarget &&
                              to.row === gameState.enPassantTarget.row && 
                              to.col === gameState.enPassantTarget.col;
          const isCastle = piece.type === 'king' && Math.abs(to.col - from.col) === 2;
          const isPromotion = piece.type === 'pawn' && 
                             (to.row === 0 || to.row === 7);
          
          moves.push({
            from,
            to,
            piece,
            capturedPiece: capturedPiece || undefined,
            isEnPassant,
            isCastle,
            isPromotion,
            promotionPiece: isPromotion ? 'queen' : undefined, // Default para dama
          });
        });
      }
    }
  }
  
  return moves;
};

export const isCheckmate = (board: Board, color: PieceColor, gameState: GameState): boolean => {
  if (!isInCheck(board, color)) return false;
  const possibleMoves = getAllPossibleMoves(board, color, gameState);
  return possibleMoves.length === 0;
};

export const isStalemate = (board: Board, color: PieceColor, gameState: GameState): boolean => {
  if (isInCheck(board, color)) return false;
  const possibleMoves = getAllPossibleMoves(board, color, gameState);
  return possibleMoves.length === 0;
};

export const isDraw = (gameState: GameState): boolean => {
  // Regra dos 50 movimentos
  if (gameState.halfMoveClock >= 100) return true;
  
  // Material insuficiente (implementação básica)
  const pieces = gameState.board.flat().filter(p => p !== null);
  if (pieces.length <= 3) {
    const whiteKing = pieces.find(p => p!.color === 'white' && p!.type === 'king');
    const blackKing = pieces.find(p => p!.color === 'black' && p!.type === 'king');
    const otherPiece = pieces.find(p => p!.type !== 'king');
    
    if (whiteKing && blackKing && (!otherPiece || 
        otherPiece.type === 'bishop' || otherPiece.type === 'knight')) {
      return true;
    }
  }
  
  // Repetição de posições (implementação simplificada)
  // Em uma implementação completa, você compararia as posições do tabuleiro
  
  return false;
};

export const updateGameStatus = (gameState: GameState): GameState['gameStatus'] => {
  const currentColor = gameState.currentPlayer;
  
  if (isCheckmate(gameState.board, currentColor, gameState)) {
    return 'checkmate';
  }
  
  if (isStalemate(gameState.board, currentColor, gameState)) {
    return 'stalemate';
  }
  
  if (isDraw(gameState)) {
    return 'draw';
  }
  
  if (isInCheck(gameState.board, currentColor)) {
    return 'check';
  }
  
  return 'playing';
};

export const isValidMove = (
  board: Board, 
  from: Position, 
  to: Position, 
  gameState: GameState
): boolean => {
  const possibleMoves = getPossibleMoves(
    board, 
    from, 
    gameState.enPassantTarget,
    gameState.canCastleKingside,
    gameState.canCastleQueenside
  );
  return possibleMoves.some(move => move.row === to.row && move.col === to.col);
};
