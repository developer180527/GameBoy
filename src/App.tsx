import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Screen } from './components/Screen';
import { Controls } from './components/Controls';
import { RomFile } from './types';

const mockRoms: RomFile[] = [
  { id: '1', name: 'ZELDA_AWAKENING.GB', size: '1.0MB', date: '1993-06-06' },
  { id: '2', name: 'POKEMON_RED.GB', size: '1.0MB', date: '1996-02-27' },
  { id: '3', name: 'TETRIS.GB', size: '32KB', date: '1989-06-14' },
  { id: '4', name: 'SUPER_MARIO.GB', size: '64KB', date: '1989-04-21' },
  { id: '5', name: 'KIRBY_DREAM_LAND.GB', size: '32KB', date: '1992-04-27' }
];

export default function App() {
  const [activeRom, setActiveRom] = useState<RomFile | null>(null);
  const [booting, setBooting] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const joyPadCooldown = useRef(false);

  useEffect(() => {
    const handleContext = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContext);
    return () => document.removeEventListener('contextmenu', handleContext);
  }, []);

  useEffect(() => {
    if (!activeRom) {
      setBooting(true);
      const timer = setTimeout(() => setBooting(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [activeRom]);

  const handleA = useCallback(() => {
    if (booting) return;
    if (!activeRom) {
      setActiveRom(mockRoms[selectedIdx]);
    }
  }, [booting, activeRom, selectedIdx]);

  const handleB = useCallback(() => {
    if (activeRom) {
      setActiveRom(null);
    }
  }, [activeRom]);

  const handleJoystick = useCallback((angle: number | null, strength: number) => {
    if (booting || activeRom || angle === null || strength < 0.5) {
      return;
    }
    if (joyPadCooldown.current) return;

    // Check up/down direction (angle is in radians, 0 is right, Math.PI is left)
    const normalizedAngle = angle >= 0 ? angle : angle + 2 * Math.PI;
    
    // Up is ~4.71, Down is ~1.57
    const isUp = normalizedAngle > 4.0 && normalizedAngle < 5.4;
    const isDown = normalizedAngle > 0.8 && normalizedAngle < 2.3;

    if (isDown) {
      setSelectedIdx(prev => Math.min(prev + 1, mockRoms.length - 1));
      joyPadCooldown.current = true;
      setTimeout(() => { joyPadCooldown.current = false; }, 200);
    } else if (isUp) {
      setSelectedIdx(prev => Math.max(prev - 1, 0));
      joyPadCooldown.current = true;
      setTimeout(() => { joyPadCooldown.current = false; }, 200);
    }
  }, [booting, activeRom]);

  return (
    <div className="h-full w-full bg-[#1a1a1e] flex flex-col items-center justify-center font-sans overflow-hidden text-slate-200 touch-none">
      
      {/* Emulator Shell */}
      <div className="w-full h-full lg:w-[400px] lg:h-[720px] bg-[#2d2d34] lg:rounded-[48px] border-x-4 border-b-8 border-t-2 border-[#1e1e24] shadow-2xl flex flex-col items-center p-6 relative">
        
        {/* Top Bezel / Brand Area */}
        <div className="w-full flex justify-between items-center mb-6 px-4 z-20">
          <div className="flex space-x-2 items-center">
            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
            <span className="text-[10px] tracking-widest uppercase font-bold text-slate-500">Power</span>
          </div>
          <div className="flex text-xs font-black tracking-tighter text-slate-400 gap-4 items-center">
            <span>NEXUS <span className="text-blue-500">EMU</span></span>
          </div>
        </div>

        {/* Screen Module */}
        <div className="w-full shrink-0 z-10 w-full aspect-square bg-[#0f0f12] rounded-xl border-4 border-[#1e1e24] p-1 shadow-inner relative overflow-hidden">
          <Screen 
             activeRom={activeRom} 
             booting={booting}
             selectedIdx={selectedIdx}
             mockRoms={mockRoms}
          />
        </div>

        {/* Controls Module */}
        <Controls 
          onPressA={handleA} 
          onPressB={handleB} 
          onJoyStick={handleJoystick} 
        />

        {/* Speaker Grille */}
        <div className="absolute bottom-8 right-12 w-16 h-16 flex flex-col justify-between items-end opacity-20 pointer-events-none hidden lg:flex">
          <div className="w-12 h-1 bg-black rounded-full"></div>
          <div className="w-12 h-1 bg-black rounded-full"></div>
          <div className="w-12 h-1 bg-black rounded-full"></div>
          <div className="w-12 h-1 bg-black rounded-full"></div>
          <div className="w-12 h-1 bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
