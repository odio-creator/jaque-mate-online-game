
import { useState } from 'react';
import { Board, Position, GameState } from '@/types/chess';
import { createInitialBoard, getPossibleMoves, isValidMove } from '@/utils/chessLogic';
import ChessPiece from './ChessPiece';

const ChessBoard = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createInitialBoard(),
    currentPlayer: 'white',
    selectedSquare: null,
    possibleMoves: [],
    gameStatus: 'playing'
  });

  const handleSquareClick = (row: number, col: number) => {
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
      if (isValidMove(gameState.board, gameState.selectedSquare, clickedPos)) {
        const newBoard = gameState.board.map(row => [...row]);
        const movingPiece = newBoard[gameState.selectedSquare.row][gameState.selectedSquare.col];
        
        // Fazer o movimento
        newBoard[clickedPos.row][clickedPos.col] = movingPiece;
        newBoard[gameState.selectedSquare.row][gameState.selectedSquare.col] = null;

        setGameState(prev => ({
          ...prev,
          board: newBoard,
          currentPlayer: prev.currentPlayer === 'white' ? 'black' : 'white',
          selectedSquare: null,
          possibleMoves: []
        }));
        return;
      }
    }

    // Se clicou em uma peça do jogador atual
    if (piece && piece.color === gameState.currentPlayer) {
      const possibleMoves = getPossibleMoves(gameState.board, clickedPos);
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

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-white text-xl font-semibold">
        Vez do jogador: <span className="text-amber-500">{gameState.currentPlayer === 'white' ? 'Branco' : 'Preto'}</span>
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
        <button
          className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-4 py-2 rounded"
          onClick={() => setGameState({
            board: createInitialBoard(),
            currentPlayer: 'white',
            selectedSquare: null,
            possibleMoves: [],
            gameStatus: 'playing'
          })}
        >
          Reiniciar Jogo
        </button>
      </div>
    </div>
  );
};

export default ChessBoard;
