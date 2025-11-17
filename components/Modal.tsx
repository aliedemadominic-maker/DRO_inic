
import React from 'react';
import { NextLevelIcon, RetryIcon } from './icons';

interface ModalProps {
  title: string;
  message: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, message, buttonText, onButtonClick }) => {
  const isRetry = buttonText.toLowerCase().includes('retry');
  
  return (
    <div className="w-full max-w-md p-8 bg-gray-900 bg-opacity-80 rounded-2xl shadow-2xl border-4 border-lime-400/60 backdrop-blur-lg text-center transform transition-all animate-fade-in-up">
      <h2 className="text-4xl font-bold text-green-300 mb-4" style={{ fontFamily: "'Creepster', cursive" }}>{title}</h2>
      <p className="text-lg text-green-100 mb-8">{message}</p>
      <button
        onClick={onButtonClick}
        className="w-full px-6 py-4 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
      >
        {isRetry ? <RetryIcon /> : <NextLevelIcon />}
        {buttonText}
      </button>

      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Modal;
