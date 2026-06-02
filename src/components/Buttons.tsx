import React, { useState } from 'react';

interface GameButtonProps {
  label: string;
  action?: string;
  color?: string;
  borderColor?: string;
  onClick?: () => void;
}

export function GameButton({ label, action, color = "bg-[#3b82f6]", borderColor = "border-[#1d4ed8]", onClick }: GameButtonProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <button
        onMouseDown={() => { setPressed(true); onClick?.(); }}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        onTouchStart={() => { setPressed(true); onClick?.(); }}
        onTouchEnd={() => setPressed(false)}
        className={`w-16 h-16 rounded-full ${color} border-b-4 ${pressed ? 'border-b-0 translate-y-1' : borderColor} shadow-lg transition-all flex items-center justify-center text-white font-bold text-2xl outline-none select-none touch-none`}
      >
        {label}
      </button>
      {action && <span className="mt-3 text-[10px] text-slate-500 uppercase tracking-widest font-bold">{action}</span>}
    </div>
  );
}

export function PillButton({ label, onClick }: GameButtonProps) {
    const [pressed, setPressed] = useState(false);
    return (
        <div className="flex flex-col items-center">
            <button
                onMouseDown={() => { setPressed(true); onClick?.(); }}
                onMouseUp={() => setPressed(false)}
                onMouseLeave={() => setPressed(false)}
                onTouchStart={() => { setPressed(true); onClick?.(); }}
                onTouchEnd={() => setPressed(false)}
                className={`w-12 h-3 bg-[#1e1e24] rounded-full rotate-[-25deg] shadow-inner select-none touch-none transition-transform ${pressed ? 'scale-95' : ''}`}
            />
            <span className="text-[10px] mt-4 text-slate-500 uppercase tracking-widest font-bold">{label}</span>
        </div>
    )
}
