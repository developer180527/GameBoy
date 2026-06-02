import React, { useRef, useEffect, useState } from 'react';

interface JoystickProps {
  label: string;
  onChange: (angle: number | null, strength: number) => void;
  color?: string;
}

export function Joystick({ label, onChange, color = "bg-gray-800" }: JoystickProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const maxDistance = 40; // Max radius for movement

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    setActive(true);
    updatePosition(e);
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!active) return;
    updatePosition(e);
  };

  const handleEnd = () => {
    setActive(false);
    setPosition({ x: 0, y: 0 });
    onChange(null, 0);
  };

  const updatePosition = (e: React.TouchEvent | React.MouseEvent | TouchEvent | MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    let dx = clientX - centerX;
    let dy = clientY - centerY;

    const distance = Math.min(Math.sqrt(dx * dx + dy * dy), maxDistance);
    const angle = Math.atan2(dy, dx);

    const boundedX = Math.cos(angle) * distance;
    const boundedY = Math.sin(angle) * distance;

    setPosition({ x: boundedX, y: boundedY });
    
    // Normalize strength 0 to 1
    onChange(angle, distance / maxDistance);
  };

  useEffect(() => {
    const handleGlobalMove = (e: TouchEvent | MouseEvent) => active && updatePosition(e);
    const handleGlobalEnd = () => active && handleEnd();

    if (active) {
      window.addEventListener('touchmove', handleGlobalMove, { passive: false });
      window.addEventListener('touchend', handleGlobalEnd);
      window.addEventListener('mousemove', handleGlobalMove);
      window.addEventListener('mouseup', handleGlobalEnd);
    }

    return () => {
      window.removeEventListener('touchmove', handleGlobalMove);
      window.removeEventListener('touchend', handleGlobalEnd);
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalEnd);
    };
  }, [active]);

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={containerRef}
        className="w-24 h-24 rounded-full bg-[#1e1e24] flex items-center justify-center shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)] relative touch-none select-none"
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        <div 
          ref={knobRef}
          className="w-16 h-16 rounded-full bg-[#3d3d46] border-2 border-[#4d4d56] shadow-xl absolute transition-transform duration-75"
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#5d5d66] to-[#2d2d34]"></div>
        </div>
      </div>
    </div>
  );
}
