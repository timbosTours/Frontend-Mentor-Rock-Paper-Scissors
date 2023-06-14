'use client'

import { useState, useEffect } from "react"

// Array of game choices
const choices = ["rock", "paper", "scissors"];

export default function Game() {
// State variables
  const [score, setScore] = useState(0);
 // Player's score
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);  // Player's choice
  const [computerChoice, setComputerChoice] = useState<string | null>(null);  // Computer's choice
  const [result, setResult] = useState<string | null>(null);  // Result of the game
    const [gameStarted, setGameStarted] = useState(false);  // Whether the game has started
    

  // This effect runs only once after initial render (like componentDidMount)
    useEffect(() => {
        const localScore = localStorage.getItem('score');
        if (localScore) { // Check if score is stored in localStorage
        setScore(Number(localScore)); // Update score state with value from localStorage
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('score', String(score));
    }, [score]);

  // Effect hook runs when player makes a choice
    useEffect(() => {
        if (playerChoice) {
        const timer = setTimeout(() => {
            const newComputerChoice = choices[Math.floor(Math.random() * choices.length)];  // Random computer choice
            setComputerChoice(newComputerChoice);  // Set computer's choice
            calculateResult(newComputerChoice);  // Calculate result
        }, 2000);
        // Cleanup function to clear timer
        return () => clearTimeout(timer);
        }
    }, [playerChoice]);

    // Function to calculate the result of the game
    const calculateResult = (newComputerChoice: string) => {
        if (
        (playerChoice === "rock" && newComputerChoice === "scissors") ||
        (playerChoice === "paper" && newComputerChoice === "rock") ||
        (playerChoice === "scissors" && newComputerChoice === "paper")
        ) {
        setScore((prevScore) => prevScore + 1);  // Player wins, increment score
        setResult("You win");
        } else if (playerChoice === newComputerChoice) {
        setResult("It's a draw");  // Draw
        } else {
        setScore((prevScore) => (prevScore > 0 ? prevScore - 1 : 0));  // Player loses, decrement score
        setResult("You lose");
        }
    };

    // Function to start the game
    const playGame = (choice: string) => {
        setPlayerChoice(choice);  // Set player's choice
        setGameStarted(true);  // Start the game
        setComputerChoice(null);  // Reset computer's choice
        setResult(null);  // Reset result
    };

    // Function to reset the game
    const resetGame = () => {
        setGameStarted(false);  // Stop the game
        setPlayerChoice(null);  // Reset player's choice
        setComputerChoice(null);  // Reset computer's choice
        setResult(null);  // Reset result
    };

return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl">Rock Paper Scissors</h1>
        <p className="text-2xl">Score: {score}</p>
        {gameStarted && <p className="text-2xl mt-6">You picked: {playerChoice}</p>}
        {gameStarted && <p className="text-2xl mt-6">The House Picked: {computerChoice || '...'}</p>}
        {computerChoice && <p className="text-2xl mt-6">{result}</p>}
        {!gameStarted && (
            <div className="flex mt-6">
            {choices.map((choice, index) => (
                <button
                key={index}
                className="mx-2 p-2 border-2 border-gray-300 rounded-md"
                onClick={() => playGame(choice)}
                >
                {choice}
                </button>
            ))}
            </div>
        )}
        {computerChoice && (
            <button
            className="mt-6 p-2 border-2 border-gray-300 rounded-md"
            onClick={resetGame}
            >
            Play Again
            </button>
        )}
        </div>
    );
}