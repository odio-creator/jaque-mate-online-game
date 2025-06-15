
import { useState } from 'react';
import { Position, GameState, Move } from '@/types/chess';
import { 
  createInitialGameState, 
  getPossibleMoves, 
  isValidMove, 
  makeMove,
  updateGameStatus,
  isInCheck
} from '@/utils/chessLogic';
import ChessPiece from './ChessPiece';
import { Button } from './ui/button';

const ChessBoard = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());

  const getGameStatusMessage = () => {
    const currentPlayerName = gameState.currentPlayer === 'white' ? 'Brancas' : 'Pretas';
    const opponentName = gameState.currentPlayer === 'white' ? 'Pretas' : 'Brancas';
    
    switch (gameState.gameStatus) {
      case 'check':
        return `${currentPlayerName} em xeque!`;
      case 'checkmate':
        return `Xeque-mate! ${opponentName} vencem!`;
      case 'stalemate':
        return 'Empate por afogamento!';
      case 'draw':
        return 'Empate!';
      default:
        return `Vez das ${currentPlayerName}`;
    }
  };

  const handleSquareClick = (row: number, col: number) => {
    if (gameState.gameStatus === 'checkmate' || gameState.gameStatus === 'stalemate' || gameState.gameStatus === 'draw') {
      return;
    }

    const clickedPos: Position = { row, col };
    const piece = gameState.board[row][col];

    // Se já há uma peça selecionada
    if (gameState.selectedSquare) {
      // Se clicou na mesma peça, desselecionar
      if (gameState.selectedSquare.row === row && gameState.selectedSquare.col === col) {
        setGameState(prev => ({
          ...prev,
          selectedSquare: null,
          possibleMoves: []
        }));
        return;
      }

      // Se é um movimento válido
      if (isValidMove(gameState.board, gameState.selectedSquare, clickedPos, gameState)) {
        const movingPiece = gameState.board[gameState.selectedSquare.row][gameState.selectedSquare.col];
        if (!movingPiece) return;

        const capturedPiece = gameState.board[clickedPos.row][clickedPos.col];
        const isEnPassant = movingPiece.type === 'pawn' && 
                           gameState.enPassantTarget &&
                           clickedPos.row === gameState.enPassantTarget.row && 
                           clickedPos.col === gameState.enPassantTarget.col;
        const isCastle = movingPiece.type === 'king' && Math.abs(clickedPos.col - gameState.selectedSquare.col) === 2;
        const isPromotion = movingPiece.type === 'pawn' && (clickedPos.row === 0 || clickedPos.row === 7);

        const move: Move = {
          from: gameState.selectedSquare,
          to: clickedPos,
          piece: movingPiece,
          capturedPiece: capturedPiece || undefined,
          isEnPassant,
          isCastle,
          isPromotion,
          promotionPiece: isPromotion ? 'queen' : undefined,
        };

        // Fazer o movimento
        const newBoard = makeMove(gameState.board, move);
        
        // Determinar novo alvo en passant
        let newEnPassantTarget: Position | null = null;
        if (movingPiece.type === 'pawn' && Math.abs(clickedPos.row - gameState.selectedSquare.row) === 2) {
          newEnPassantTarget = {
            row: (clickedPos.row + gameState.selectedSquare.row) / 2,
            col: clickedPos.col
          };
        }

        // Atualizar direitos de roque
        const newCanCastleKingside = { ...gameState.canCastleKingside };
        const newCanCastleQueenside = { ...gameState.canCastleQueenside };

        if (movingPiece.type === 'king') {
          newCanCastleKingside[movingPiece.color] = false;
          newCanCastleQueenside[movingPiece.color] = false;
        } else if (movingPiece.type === 'rook') {
          if (gameState.selectedSquare.col === 0) {
            newCanCastleQueenside[movingPiece.color] = false;
          } else if (gameState.selectedSquare.col === 7) {
            newCanCastleKingside[movingPiece.color] = false;
          }
        }

        // Se uma torre foi capturada, atualizar direitos de roque
        if (capturedPiece && capturedPiece.type === 'rook') {
          if (clickedPos.col === 0) {
            newCanCastleQueenside[capturedPiece.color] = false;
          } else if (clickedPos.col === 7) {
            newCanCastleKingside[capturedPiece.color] = false;
          }
        }

        const newGameState: GameState = {
          ...gameState,
          board: newBoard,
          currentPlayer: gameState.currentPlayer === 'white' ? 'black' : 'white',
          selectedSquare: null,
          possibleMoves: [],
          moveHistory: [...gameState.moveHistory, move],
          enPassantTarget: newEnPassantTarget,
          canCastleKingside: newCanCastleKingside,
          canCastleQueenside: newCanCastleQueenside,
          halfMoveClock: (capturedPiece || movingPiece.type === 'pawn') ? 0 : gameState.halfMoveClock + 1,
          fullMoveNumber: gameState.currentPlayer === 'black' ? gameState.fullMoveNumber + 1 : gameState.fullMoveNumber,
          gameStatus: 'playing'
        };

        // Atualizar status do jogo
        newGameState.gameStatus = updateGameStatus(newGameState);

        setGameState(newGameState);
        return;
      }
    }

    // Se clicou em uma peça do jogador atual
    if (piece && piece.color === gameState.currentPlayer) {
      const possibleMoves = getPossibleMoves(
        gameState.board, 
        clickedPos, 
        gameState.enPassantTarget,
        gameState.canCastleKingside,
        gameState.canCastleQueenside
      );
      setGameState(prev => ({
        ...prev,
        selectedSquare: clickedPos,
        possibleMoves
      }));
    }
  };

  const isSquareSelected = (row: number, col: number): boolean => {
    return gameState.selectedSquare?.row === row && gameState.selectedSquare?.col === col;
  };

  const isPossibleMove = (row: number, col: number): boolean => {
    return gameState.possibleMoves.some(move => move.row === row && move.col === col);
  };

  const resetGame = () => {
    setGameState(createInitialGameState());
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-white text-xl font-semibold text-center">
        {getGameStatusMessage()}
        {isInCheck(gameState.board, gameState.currentPlayer) && gameState.gameStatus === 'check' && (
          <div className="text-red-400 text-sm mt-1">Rei em perigo!</div>
        )}
      </div>
      
      <div className="grid grid-cols-8 border-2 border-amber-500 bg-amber-100">
        {gameState.board.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                ${(rowIndex + colIndex) % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'}
                ${isSquareSelected(rowIndex, colIndex) ? 'ring-2 ring-amber-500' : ''}
                ${isPossibleMove(rowIndex, colIndex) ? 'ring-2 ring-green-500' : ''}
              `}
            >
              <ChessPiece
                piece={piece}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
                isSelected={isSquareSelected(rowIndex, colIndex)}
                isPossibleMove={isPossibleMove(rowIndex, colIndex)}
              />
            </div>
          ))
        )}
      </div>
      
      <div className="flex space-x-4">
        <Button
          className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 py-2 rounded"
          onClick={resetGame}
        >
          Novo Jogo
        </Button>
      </div>
      
      {gameState.moveHistory.length > 0 && (
        <div className="text-white text-sm">
          <div className="mb-2 font-semibold">Histórico de Movimentos:</div>
          <div className="max-h-32 overflow-y-auto bg-black/20 p-2 rounded">
            {gameState.moveHistory.slice(-10).map((move, index) => (
              <div key={index} className="text-xs">
                {move.piece.color === 'white' ? '♔' : '♛'} 
                {String.fromCharCode(65 + move.from.col)}{8 - move.from.row} → 
                {String.fromCharCode(65 + move.to.col)}{8 - move.to.row}
                {move.capturedPiece && ' ×'}
                {move.isCastle && ' O-O'}
                {move.isEnPassant && ' e.p.'}
                {move.isPromotion && ' =♕'}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChessBoard;
