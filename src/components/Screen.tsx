import React from 'react';
import { RomFile } from '../types';

interface ScreenProps {
  activeRom: RomFile | null;
  booting: boolean;
  selectedIdx: number;
  mockRoms: RomFile[];
}

export function Screen({ activeRom, booting, selectedIdx, mockRoms }: ScreenProps) {
  return (
    <div className="w-full h-full bg-[#8bac0f] flex flex-col font-mono text-[#0f380f] p-4 relative">
      {booting && !activeRom ? (
        <div className="flex-1 flex flex-col items-center justify-center animate-pulse">
          <h1 className="text-3xl font-bold tracking-widest uppercase text-[#0f380f]">NEXUS<span className="text-xl">®</span></h1>
        </div>
      ) : activeRom ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-center text-sm animate-pulse font-bold uppercase">
            PLAYING:<br/><br/>
            {activeRom.name}
          </span>
        </div>
      ) : (
        <div className="flex-1 flex flex-col pt-2">
          <div className="border-b-2 border-[#0f380f] pb-2 mb-4 flex justify-between items-end">
            <h2 className="text-xl font-bold uppercase leading-none">ROM Explorer</h2>
            <span className="text-[10px]">v1.2.0</span>
          </div>
          
          <div className="flex-1 space-y-1 overflow-y-auto pr-2 pb-6">
            {mockRoms.map((rom, idx) => (
              <div 
                key={rom.id}
                className={`flex items-center space-x-2 px-2 py-1 transition-colors ${selectedIdx === idx ? 'bg-[#0f380f] text-[#8bac0f]' : ''}`}
              >
                <span className={selectedIdx === idx ? 'opacity-100' : 'opacity-0'}>{'>'}</span>
                <span className="truncate text-sm">{rom.name}</span>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] border-t border-[#0f380f] pt-1 font-bold">
             <span>DIR: /LOCAL/ROMS/</span>
             <span>96% BAT</span>
          </div>
        </div>
      )}
      
      {/* Scanlines Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px] mix-blend-overlay"></div>
    </div>
  );
}
