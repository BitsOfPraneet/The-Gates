import React from 'react';

const SpookyLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 text-primary animate-spin">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
            {/* Pumpkin SVG */}
            <path d="M50 10 C60 10, 65 15, 65 25 C65 35, 70 40, 70 50 C70 70, 60 80, 50 80 C40 80, 30 70, 30 50 C30 40, 35 35, 35 25 C35 15, 40 10, 50 10 Z" />
            {/* Pumpkin stem */}
            <rect x="48" y="5" width="4" height="8" rx="2" />
            {/* Spooky face */}
            <circle cx="42" cy="45" r="3" fill="hsl(var(--background))" />
            <circle cx="58" cy="45" r="3" fill="hsl(var(--background))" />
            <path d="M45 60 Q50 65, 55 60" stroke="hsl(var(--background))" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <p className="text-sm text-muted-foreground font-creepster">Summoning...</p>
        </div>
      </div>
    </div>
  );
};

export default SpookyLoader;