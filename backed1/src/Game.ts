
import { Chess } from 'chess.js';
import { WebSocket } from 'ws';
import { GAME_OVER, INIT_GAME, MOVE } from './message';


export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess;
    private startTime: Date;
    private moveCount = 0;



    constructor(player1: { id: string; socket: WebSocket }, 
    player2: {  id: string; socket: WebSocket }) {

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

    makeMove(socket: WebSocket, move: {
        from: string,
        to: string
    }) {
        console.log(move)
        // validate the move using zod
        if (this.board.turn() === 'w' && socket !== this.player1) {
            return;
        }
    
        if (this.board.turn() === 'b' && socket !== this.player2) {
            return;
        }
        // if (this.moveCount % 2 === 0 && socket !== this.player1) {
        //     return;
        // }

        // if (this.moveCount % 2 === 1 && socket !== this.player2) {
        //     return;
        // }

        console.log("did not early return");

        try {
            this.board.move(move);
            
        } catch (e) {
            console.log(e);
            return;
        }

        console.log("move success");
        //db.moves.push(moves)

        if (this.board.isGameOver()) {

            //zwait send game over message
            this.player1.emit(
                JSON.stringify({
                    type: GAME_OVER,
                    payload: {
                        winner: this.board.turn() === 'w' ? 'black' : 'white'
                    }
                })
            )

            this.player2.emit(
                JSON.stringify({
                    type: GAME_OVER,
                    payload: {
                        winner: this.board.turn() === 'w' ? 'black' : 'white'
                    }
                })
            )
            return;
        }
        const opponent = socket === this.player1 ? this.player2 : this.player1;
        opponent.send(
        JSON.stringify({
            type: MOVE,
            payload: { move }
        })
        );

        // if (this.board.moves().length % 2 === 0) {
        //     this.player2.send(
        //         JSON.stringify({
        //             type: MOVE,
        //             payload: {
        //                 move
        //             }
        //         })
        //     )
        // } else {
        //     this.player1.send(
        //         JSON.stringify({
        //             type: MOVE,
        //             payload: {
        //                 move
        //             }
        //         })
        //     )
        // }
        this.moveCount++;
    }
}