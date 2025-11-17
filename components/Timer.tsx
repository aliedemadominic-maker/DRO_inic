
import React from 'react';

interface TimerProps {
  timeLeft: number;
}

export const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  const isUrgent = timeLeft <= 10;
  const progress = (timeLeft / 30) * 100;

  return (
    <div className="flex items-center gap-2 text-xl font-bold">
        <div className="w-32 h-6 bg-gray-700 rounded-full overflow-hidden border-2 border-gray-600">
            <div
                className={`h-full rounded-full transition-all duration-500 ${isUrgent ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${progress}%`}}
            ></div>
        </div>
        <span className={`w-12 text-center tabular-nums ${isUrgent ? 'text-red-400 animate-pulse' : 'text-green-300'}`}>
            {timeLeft}s
        </span>
    </div>
  );
};
