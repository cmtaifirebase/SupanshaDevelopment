import React from 'react';

interface ProgressBarProps {
  progress: number; // percentage from 0-100
  colorClass?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, colorClass = 'bg-primary' }) => {
  // Ensure progress is between 0 and 100
  const safeProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className="relative h-2 rounded-full bg-gray-200 overflow-hidden">
      <div 
        className={`absolute h-full rounded-full transition-all duration-500 ease-out ${colorClass}`} 
        style={{ width: `${safeProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
