// screens/Game.tsx
import { ChessBoard } from "../components/ChessBoard";
import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { useSocket } from "../components/hooks/useSocket";
import { Button } from "../components/Bottons";
import { Modal } from "../components/modal";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState<string | null>(null); // Track the winner

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          setStarted(true);
          setBoard(chess.board());
          break;
        case MOVE:
          const move = message.payload.move;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move made");
          break;
        case GAME_OVER:
          const gameWinner = message.payload.winner;
          setWinner(gameWinner === "white" ? "White" : "Black");
          setIsGameOver(true); // Trigger the game over modal
          break;
      }
    };
  }, [socket]);

  const handleCloseModal = () => {
    setIsGameOver(false); // Close the modal when clicking the close button
    setStarted(false); // Reset game state
    setChess(new Chess()); // Reset the board
    setBoard(chess.board());
  };

  if (!socket) return <div>Connecting...</div>;

  return (
    <div className="justify-center flex">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4 w-full flex  justify-center">
            <ChessBoard chess={chess} setBoard={setBoard} socket={socket} board={board} />
          </div>
          <div className="col-span-2  bg-slate-900 w-full flex justify-center">
            <div className="flex flex-col  items-center pt-8">
              {!started && (
                <Button
                  onClick={() => {
                    socket.send(
                      JSON.stringify({
                        type: INIT_GAME,
                      })
                    );
                  }}
                >
                  Play
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Show modal when game is over */}
      <Modal isOpen={isGameOver} onClose={handleCloseModal} winner={winner || "Unknown"} />
    </div>
  );
};
