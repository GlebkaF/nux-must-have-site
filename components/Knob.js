import React from 'react';

const RADIUS = 45;

export default function Knob({ label, value, color = '#ef4444' }) {
  const angle = (value / 100) * 270 - 135;
  return (
    <div className="flex flex-col items-center w-20">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            stroke={color}
            strokeWidth="10"
            fill="none"
          />
        </svg>
        <div
          className="absolute left-1/2 top-1/2 w-1 h-6 bg-gray-100 origin-bottom"
          style={{ transform: `translate(-50%, -100%) rotate(${angle}deg)` }}
        />
      </div>
      <span className="mt-2 text-xs text-gray-200 text-center">
        {label}
        <br />
        {value}
      </span>
    </div>
  );
}
