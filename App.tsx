
import React from 'react';
import { GameState } from './types';
import { useGameLogic } from './hooks/useGameLogic';
import GameScene from './components/GameScene';
import PuzzlePanel from './components/PuzzlePanel';
import Modal from './components/Modal';
import { StartIcon } from './components/icons';

export default function App() {
  const {
    gameState,
    level,
    puzzle,
    error,
    isLoading,
    timeLeft,
    startGame,
    submitAnswer,
    goToNextLevel,
    retryLevel,
  } = useGameLogic();

  const renderContent = () => {
    switch (gameState) {
      case GameState.START_SCREEN:
        return (
          <div className="text-center">
            <h1 className="text-6xl font-bold text-green-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" style={{ fontFamily: "'Creepster', cursive" }}>
              Drosera Trap
            </h1>
            <p className="text-lg text-green-100 mt-4 mb-8">Protect the glowing nectar from the pesky flies!</p>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <StartIcon />
              Start Level {level}
            </button>
          </div>
        );
      
      case GameState.PLAYING:
      case GameState.LEVEL_WON_ANIMATION:
      case GameState.LEVEL_LOST_ANIMATION:
        return (
          <>
            <GameScene gameState={gameState} level={level} />
            <PuzzlePanel
              puzzle={puzzle}
              isLoading={isLoading}
              error={error}
              timeLeft={timeLeft}
              onSubmit={submitAnswer}
              level={level}
              gameState={gameState}
            />
          </>
        );

      case GameState.LEVEL_WON:
        return (
          <Modal
            title={`Level ${level} Cleared!`}
            message="Congratulations! You successfully deployed the trap and saved the nectar. Ready for the next challenge?"
            buttonText={`Go to Level ${level + 1}`}
            onButtonClick={goToNextLevel}
          />
        );

      case GameState.LEVEL_LOST:
        return (
          <Modal
            title="Oh No! Game Over"
            message="The flies got the nectar! Don't worry, you can try again."
            buttonText="Retry Level"
            onButtonClick={retryLevel}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="bg-gray-800 text-white min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative font-sans">
        <link href="https://fonts.googleapis.com/css2?family=Creepster&display=swap" rel="stylesheet" />
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?blur=5')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          {renderContent()}
        </div>
    </main>
  );
}