import React from 'react';

interface LiveProjectButtonProps {
  className?: string; 
  url: string;
}

const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ className = '', url }) => {
  return (
    <button
    onClick={() => window.open(url, '_blank')}
      id="live-project-button"
      className={`rounded-full font-medium uppercase tracking-widest cursor-pointer
        border-2 border-[#D7E2EA] text-[#D7E2EA]
        px-8 py-3 sm:px-10 sm:py-3.5
        text-sm sm:text-base
        transition-all duration-300 hover:bg-[#D7E2EA]/10 active:scale-95
        ${className}`}
    >
      Live Project
    </button>
  );
};

export default LiveProjectButton;
