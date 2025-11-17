
import React from 'react';
import { GameState } from '../types';
import { FlyIcon, GoodsIcon, VenusFlytrapIcon } from './icons';

interface GameSceneProps {
  gameState: GameState;
  level: number;
}

const GameScene: React.FC<GameSceneProps> = ({ gameState, level }) => {
  const isTrapOpen = gameState === GameState.LEVEL_WON_ANIMATION;
  const fliesAttacking = gameState === GameState.PLAYING || gameState === GameState.LEVEL_LOST_ANIMATION;
  const fliesTrapped = gameState === GameState.LEVEL_WON_ANIMATION;
  const goodsLost = gameState === GameState.LEVEL_LOST_ANIMATION;

  const flyCount = Math.min(2 + level, 7); // Increase flies with level, max 7
  const goodsCount = Math.floor((level - 1) / 2) + 1;
  const baseFlyDuration = 25; // seconds for level 1

  return (
    <div className="relative w-full max-w-4xl h-96 rounded-lg bg-green-900 bg-opacity-50 shadow-2xl overflow-hidden border-4 border-lime-500/50 p-4 mb-4">
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-green-800 to-transparent"></div>

      {/* The "Goods" to protect */}
      <div className="absolute bottom-4 left-4 flex gap-2">
         {Array.from({ length: goodsCount }).map((_, i) => (
            <div key={i} className={`transition-all duration-1000 ${goodsLost ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <GoodsIcon className="w-16 h-16 text-yellow-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.7)]" />
            </div>
        ))}
      </div>


      {/* Venus Flytrap */}
      <div className="absolute bottom-4 right-4">
        <VenusFlytrapIcon isOpen={isTrapOpen} className="w-48 h-48" />
      </div>

      {/* Flies */}
      {Array.from({ length: flyCount }).map((_, i) => {
        const duration = (baseFlyDuration * Math.pow(0.9, level - 1)) + Math.random() * 5;
        const delay = Math.random() * 5;
        const top = 10 + Math.random() * 60; // Random vertical position
        
        let transformStyle = 'translateX(0)';
        if (fliesAttacking) {
          transformStyle = `translateX(-${window.innerWidth * 0.8}px)`;
        } else if (fliesTrapped) {
          transformStyle = `translateX(-${window.innerWidth * 0.55}px) translateY(${window.innerHeight * 0.15}px) scale(0)`;
        }

        return (
          <div
            key={i}
            className="absolute"
            style={{
              top: `${top}%`,
              right: '-50px',
              transition: `transform ${duration}s linear, opacity 1s linear`,
              transitionDelay: `${delay}s, ${fliesTrapped ? (duration * 0.8) : 0}s`,
              transform: transformStyle,
              opacity: fliesTrapped ? 0 : 1
            }}
          >
            <FlyIcon className="w-8 h-8 text-gray-200 animate-pulse" />
          </div>
        );
      })}
    </div>
  );
};

export default GameScene;