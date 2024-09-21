# Chess Game

This is a real-time chess game implemented using React for the frontend and WebSockets for real-time communication between players. The game follows standard chess rules and allows two players to play against each other.

## Features

- Real-time multiplayer functionality using WebSockets
- Player authentication with color assignment (white and black)
- Validated moves based on chess rules
- Game over detection with winner announcement
- Responsive design with a user-friendly interface

## Technologies Used

- **Frontend**: React, Tailwind CSS, chess.js
- **Backend**: Node.js, WebSocket

## Installation

### Frontend

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd chess-game-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

### Backend

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd chess-game-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the WebSocket server:
   ```bash
   npm start
   ```

## Usage

1. Open the frontend in your browser .
2. Click "Play" to start a new game.
3. Make your moves by clicking on the chess pieces and the target squares.
4. The game will display the winner once it ends.

## Code Explanation

### Frontend

- **src/screens/Game.tsx**: Main game logic, including handling WebSocket connections and managing the game state.
- **src/components/ChessBoard.tsx**: Renders the chessboard and handles player interactions for moving pieces.
- **src/components/Modal.tsx**: Displays game-over messages and player information.

### Backend

- **Game.ts**: Contains the game logic, including player management and move validation using chess.js.
- **GameManager.ts**: Manages user connections and game instances.
- **index.ts**: Sets up the WebSocket server and handles incoming connections.
- **message.ts**: Defines message types used in the communication between frontend and backend.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

## Acknowledgments

- chess.js for the chess game logic.
- React for building the user interface.
- Tailwind CSS for styling.

## Contact

For questions or feedback, please contact Akhil Tiwari at akhiltiwari.in@gmail.com.


