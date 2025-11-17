
import React from 'react';

export const FlyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2c-1.1 0-2 .9-2 2v2.28c-.6.35-1.13.8-1.55 1.32L6.17 6.17c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41L7.2 10H5c-1.1 0-2 .9-2 2s.9 2 2 2h2.2l-2.65 2.65c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0L10 16.8V19c0 1.1.9 2 2 2s2-.9 2-2v-2.2l2.65 2.65c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41L14.8 14H17c1.1 0 2-.9 2-2s-.9-2-2-2h-2.2l2.65-2.65c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0L14 7.2V4c0-1.1-.9-2-2-2z"/>
  </svg>
);

export const GoodsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{stopColor: 'currentColor', stopOpacity: 0.7}} />
                <stop offset="70%" style={{stopColor: 'currentColor', stopOpacity: 0.2}} />
                <stop offset="100%" style={{stopColor: 'currentColor', stopOpacity: 0}} />
            </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="12" fill="url(#glow)" />
        <circle cx="12" cy="12" r="7" fill="currentColor" />
    </svg>
);


interface VenusFlytrapProps extends React.SVGProps<SVGSVGElement> {
  isOpen: boolean;
}

export const VenusFlytrapIcon: React.FC<VenusFlytrapProps> = ({ isOpen, ...props }) => (
  <div className="relative w-48 h-48" {...props}>
    {/* Stem */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-24 bg-green-700 rounded-t-full" />
    
    {/* Treasure */}
    <div className={`absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-300 rounded-full transition-opacity duration-500 ${isOpen ? 'opacity-100 animate-pulse' : 'opacity-0'}`} style={{ boxShadow: '0 0 20px 10px rgba(253, 224, 71, 0.7)' }} />

    {/* Upper Jaw */}
    <div className={`absolute top-0 left-0 w-full h-1/2 origin-bottom transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-[-45deg]' : 'rotate-0'}`}>
      <div className="w-full h-full bg-green-600 rounded-t-full border-b-4 border-green-800" />
      {/* Teeth */}
      <div className="absolute top-full left-0 w-full flex justify-around">
        {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-4 bg-lime-300 transform -translate-y-1/2" />)}
      </div>
    </div>
    {/* Lower Jaw */}
    <div className={`absolute bottom-0 left-0 w-full h-1/2 origin-top transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-[45deg]' : 'rotate-0'}`}>
      <div className="w-full h-full bg-green-500 rounded-b-full border-t-4 border-green-700" />
       {/* Teeth */}
       <div className="absolute bottom-full left-0 w-full flex justify-around">
        {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-4 bg-lime-300 transform translate-y-1/2" />)}
      </div>
    </div>
  </div>
);

export const StartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const NextLevelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const RetryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 9a9 9 0 0114.65-5.24M20 15a9 9 0 01-14.65 5.24" />
  </svg>
);