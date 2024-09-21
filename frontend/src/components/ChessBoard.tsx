import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard = ({
  chess,
  board,
  socket,
  setBoard,
  playerColor, // New prop for player color
}: {
  chess: any;
  setBoard: any;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
  playerColor: string; // Added player color
}) => {
  const [from, setFrom] = useState<null | Square>(null);

  const getReversedBoard = () => {
    return playerColor === "black" ? [...board].reverse() : board;
  };

  return (
    <div className="text-white-200">
      {getReversedBoard().map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;

              return (
                <div
                  onClick={() => {
                    if (!from) {
                      setFrom(squareRepresentation);
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from,
                              to: squareRepresentation,
                            },
                          },
                        })
                      );

                      setFrom(null);
                      chess.move({
                        from,
                        to: squareRepresentation,
                      });
                      setBoard(chess.board());
                    }
                  }}
                  key={j}
                  className={`w-16 h-16 ${(i + j) % 2 == 0 ? "bg-orange-500" : "bg-white"}`}
                >
                  <div className="w-full justify-center flex h-full">
                    <div className="h-full justify-center flex flex-col">
                      {square ? (
                        <img
                          className="w-10"
                          src={`./pieces/${square?.color === "b" ? square?.type : `${square?.type}w`}.png`}
                          alt={`${square?.color} ${square?.type}`} // Add alt attribute for accessibility
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
