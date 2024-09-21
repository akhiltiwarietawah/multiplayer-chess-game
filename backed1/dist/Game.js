"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const message_1 = require("./message");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: 'white'
            }
        }));
        this.player2.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: 'black'
            }
        }));
    }
    makeMove(socket, move) {
        console.log(move);
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
        }
        catch (e) {
            console.log(e);
            return;
        }
        console.log("move success");
        if (this.board.isGameOver()) {
            // send game over message
            this.player1.send(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white'
                }
            }));
            this.player2.send(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white'
                }
            }));
            return;
        }
        const opponent = socket === this.player1 ? this.player2 : this.player1;
        opponent.send(JSON.stringify({
            type: message_1.MOVE,
            payload: { move }
        }));
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
exports.Game = Game;
