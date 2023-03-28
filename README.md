# Tic-Tac-Toe

This Tic-Tac-Toe project was created by ChatGPT as a collaborative effort with the user. It is a simple yet interactive game that allows a human player to play against an AI opponent. The game features adjustable difficulty and visual effects when the game ends.

## How We Made It

The project was built using React and follows a step-by-step process to create a fully functional Tic-Tac-Toe game.

### 1. Basic Setup and Board Rendering

We started by creating a new React app and setting up the necessary components and state variables to render the game board.

### 2. Human Player Interaction

Next, we added event handling for the human player to make their move on the board by clicking a cell.

### 3. AI Opponent

To make the game more challenging, we implemented an AI opponent using the minimax algorithm, which plays optimally and makes it impossible to beat the computer. The best outcome a human player can achieve against the AI is a draw.

### 4. Adjustable Difficulty

To make the game more enjoyable for players of all skill levels, we added a difficulty slider that allows users to adjust the difficulty of the game. The slider controls the probability of the computer making a random move instead of the optimal one. The lower the slider value, the easier the game will be, as the computer will make more random moves.

### 5. Game End Visual Effects

Finally, we added visual effects to indicate the end of the game. When the human player wins, a full-screen confetti effect is displayed, and when the human player loses, the screen blinks red.

## How to Run the Project

1. Clone the repository:
```
git clone https://github.com/kmcrawford/tic-tac-toe.git
```
2. Change into the project directory:
```
cd tic-tac-toe
```
3. Install the dependencies:
```
npm install
```
4. Start the development server:
```
npm start
``` 

The app will open in your default web browser at `http://localhost:3000`.

## Contributions

This project was a joint effort between ChatGPT and the user. We appreciate any contributions, bug reports, or feature suggestions. Feel free to open an issue or create a pull request to improve the game!
