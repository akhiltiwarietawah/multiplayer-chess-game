import { Chess } from 'chess.js';
import { WebSocket } from 'ws';
import { GAME_OVER, INIT_GAME, MOVE } from './message';

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess;
    private startTime: Date;
    private moveCount = 0;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: 'white'
            }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: 'black'
            }
        }));
    }

    makeMove(socket: WebSocket, move: { from: string, to: string }) {
        console.log(move);

        // Validate the move based on the current turn
        if ((this.board.turn() === 'w' && socket !== this.player1) || (this.board.turn() === 'b' && socket !== this.player2)) {
            console.log("It's not your turn.");
            return;
        }

        try {
            // Try to make the move
            this.board.move(move);
        } catch (e) {
            console.log("Invalid move:", e);
            return;
        }

        console.log("Move success");

        if (this.board.isGameOver()) {
            // Send game over message to both players
            const winner = this.board.turn() === 'w' ? 'black' : 'white';
            this.player1.send(JSON.stringify({ type: GAME_OVER, payload: { winner } }));
            this.player2.send(JSON.stringify({ type: GAME_OVER, payload: { winner } }));
            return;
        }

        // Send the move to the opponent
        const opponent = socket === this.player1 ? this.player2 : this.player1;
        opponent.send(JSON.stringify({ type: MOVE, payload: { move } }));

        this.moveCount++;
    }
}
