import React from 'react';

export default function Toggle({ label, value, color = '#ef4444' }) {
  const on = Boolean(value);
  return (
    <div className="flex flex-col items-center w-20">
      <div
        className="w-10 h-6 rounded-full flex items-center px-1"
        style={{ backgroundColor: on ? color : '#4b5563' }}
      >
        <div
          className="w-4 h-4 bg-gray-100 rounded-full transition-transform"
          style={{ transform: on ? 'translateX(1rem)' : 'translateX(0)' }}
        />
      </div>
      <span className="mt-2 text-xs text-gray-200 text-center">
        {label}
        <br />
        {on ? 'On' : 'Off'}
      </span>
    </div>
  );
}
