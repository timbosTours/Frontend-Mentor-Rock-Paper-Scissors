'use client'

import { useState, useEffect } from "react"
import RockImage from "./RockImage";
import PaperImage from "./PaperImage";
import ScissorImage from "./ScissorImage";

// Define types for game choices
type GameChoice = "rock" | "paper" | "scissors"; 

// Array of game choices
const choices: GameChoice[] = ["rock", "paper", "scissors"];

export default function Game() {
// State variables
    const [score, setScore] = useState(0);
 // Player's score
  const [playerChoice, setPlayerChoice] = useState<GameChoice | null>(null);  // Player's choice
  const [computerChoice, setComputerChoice] = useState<GameChoice | null>(null);  // Computer's choice
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

    // function to display player choices/house choice images
    const getChoiceImage = (choice: string | null) => {
        if (choice === "rock") {
            return <RockImage/>;
        } else if (choice === "paper") {
            return <PaperImage/>;
        } else if (choice === "scissors") {
            return <ScissorImage/>;
        }
        return "";
        };

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
    const playGame = (choice: GameChoice) => {
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
    <div className="flex flex-col items-center justify-center py-2 ">
        <div className="border-2 rounded-md text-left h-24 w-56 mt-4 px-1 flex space-x-10">
        <h1 className="py-7 ml-4 text-white uppercase leading-3 font-semibold">Rock <br /> Paper <br /> Scissors</h1>
            <p className="mt-3 py-4 bg-white h-16 w-16 rounded-md">Score <br /> {score}</p>
        </div>
        {gameStarted && (
        <p className="text-2xl mt-6">
            You Picked: {getChoiceImage(playerChoice)} 
        </p>
        )}
        {gameStarted && (
        <p className="text-2xl mt-6">
            The House Picked: {getChoiceImage(computerChoice)}
        </p>
        )}
        {computerChoice && <p className="text-2xl mt-6">{result}</p>}
        {!gameStarted && (
            <div className="flex mt-6">
            {!gameStarted && (
            <div className="flex mt-6">
            <button onClick={() => playGame("rock")}><RockImage/></button>
            <button onClick={() => playGame("paper")}><PaperImage/></button>
            <button onClick={() => playGame("scissors")}><ScissorImage/></button>
        </div>
)}

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