
import { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, PuzzleData } from '../types';
import { generatePuzzle } from '../services/geminiService';

const LEVEL_DURATION = 30; // 30 seconds per level

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START_SCREEN);
  const [level, setLevel] = useState(1);
  const [puzzle, setPuzzle] = useState<PuzzleData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(LEVEL_DURATION);

  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const loadPuzzle = useCallback(async (currentLevel: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const puzzleData = await generatePuzzle(currentLevel);
      setPuzzle(puzzleData);
    } catch (err) {
      setError('Failed to generate a puzzle. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startGame = useCallback(() => {
    setLevel(1);
    setGameState(GameState.PLAYING);
    loadPuzzle(1);
  }, [loadPuzzle]);
  
  const goToNextLevel = useCallback(() => {
      const nextLevel = level + 1;
      setLevel(nextLevel);
      setGameState(GameState.PLAYING);
      loadPuzzle(nextLevel);
  }, [level, loadPuzzle]);

  const retryLevel = useCallback(() => {
    setGameState(GameState.PLAYING);
    loadPuzzle(level);
  }, [level, loadPuzzle]);

  const submitAnswer = (answer: string): boolean => {
    if (puzzle && answer.toLowerCase() === puzzle.answer.toLowerCase()) {
      clearTimer();
      setGameState(GameState.LEVEL_WON_ANIMATION);
      setTimeout(() => setGameState(GameState.LEVEL_WON), 4000); // Wait for animation
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (gameState === GameState.PLAYING && puzzle) {
      setTimeLeft(LEVEL_DURATION);
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearTimer();
            setGameState(GameState.LEVEL_LOST_ANIMATION);
            setTimeout(() => setGameState(GameState.LEVEL_LOST), 3000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
        clearTimer();
    }
    
    return () => clearTimer();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, puzzle]);

  return {
    gameState,
    level,
    puzzle,
    isLoading,
    error,
    timeLeft,
    startGame,
    submitAnswer,
    goToNextLevel,
    retryLevel,
  };
};
