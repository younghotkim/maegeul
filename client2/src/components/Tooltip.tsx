// src/components/Tooltip.tsx
import React from 'react';

interface TooltipProps {
  message: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 hidden group-hover:flex bg-scampi-500 text-white text-sm font-[DM Sans] font-thin rounded px-2 py-1 h-[100px] w-full items-center">
        {message}
      </div>
    </div>
  );
};

export default Tooltip;
