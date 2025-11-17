
import React, { useState, useEffect, useRef } from 'react';
import { PuzzleData, GameState } from '../types';
import { Timer } from './Timer';

interface PuzzlePanelProps {
  puzzle: PuzzleData | null;
  isLoading: boolean;
  error: string | null;
  timeLeft: number;
  onSubmit: (answer: string) => boolean;
  level: number;
  gameState: GameState;
}

const PuzzlePanel: React.FC<PuzzlePanelProps> = ({ puzzle, isLoading, error, timeLeft, onSubmit, level, gameState }) => {
  const [answer, setAnswer] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (gameState === GameState.PLAYING) {
      setAnswer('');
      inputRef.current?.focus();
    }
  }, [level, gameState]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    const isCorrect = onSubmit(answer.trim());
    if (!isCorrect) {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500); // Shake animation duration
      setAnswer('');
    }
  };

  const isInputDisabled = isLoading || gameState !== GameState.PLAYING;

  return (
    <div className="w-full max-w-4xl p-6 bg-gray-900 bg-opacity-70 rounded-lg shadow-lg border-2 border-lime-500/50 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-300">Level {level} Puzzle</h2>
        <Timer timeLeft={timeLeft} />
      </div>
      <div className="min-h-[80px] flex items-center justify-center">
        {isLoading && <p className="text-lg text-yellow-300 animate-pulse">Generating your challenge...</p>}
        {error && <p className="text-lg text-red-400">{error}</p>}
        {puzzle && !isLoading && <p className="text-xl text-center text-green-100 italic">"{puzzle.riddle}"</p>}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2">
        <input
          ref={inputRef}
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your one-word answer..."
          disabled={isInputDisabled}
          className={`flex-grow px-4 py-3 bg-gray-700 text-white border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 ${isWrong ? 'animate-shake border-red-500' : 'border-gray-600'}`}
          style={{ animation: isWrong ? 'shake 0.5s' : 'none' }}
        />
        <button
          type="submit"
          disabled={isInputDisabled}
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-md shadow-md hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          Open Trap
        </button>
      </form>
       <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default PuzzlePanel;
