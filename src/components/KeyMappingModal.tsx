import React, { useState } from 'react';
import { X, Keyboard } from 'lucide-react';
import { GamepadConfig } from '../types';

interface KeyMappingModalProps {
  onClose: () => void;
}

export function KeyMappingModal({ onClose }: KeyMappingModalProps) {
  const [config, setConfig] = useState<GamepadConfig>({
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    a: 'KeyZ',
    b: 'KeyX',
    start: 'Enter',
    select: 'ShiftRight'
  });

  const [recordingKey, setRecordingKey] = useState<keyof GamepadConfig | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (recordingKey) {
      e.preventDefault();
      setConfig(prev => ({ ...prev, [recordingKey]: e.code }));
      setRecordingKey(null);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      autoFocus
    >
      <div className="bg-gray-900 border-2 border-gray-700 rounded-xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-950">
          <div className="flex items-center gap-2">
            <Keyboard size={20} className="text-gray-400" />
            <h2 className="text-xl font-bold font-sans tracking-wide">Key Mapping</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-1">
          <p className="text-xs text-gray-500 mb-4 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
            Click a button to map a new key, then press the key on your physical keyboard.
          </p>
          
          {(Object.entries(config) as [keyof GamepadConfig, string][]).map(([keyName, currentMap]) => (
            <div key={keyName} className="flex justify-between items-center bg-gray-800 py-3 px-4 rounded-lg mb-2 border border-gray-700/50">
              <span className="font-bold text-gray-300 uppercase tracking-widest">{keyName}</span>
              <button 
                onClick={() => setRecordingKey(keyName)}
                className={`px-4 py-1.5 rounded-md text-sm font-mono transition-all border ${
                  recordingKey === keyName 
                    ? 'bg-blue-600/20 border-blue-500 text-blue-400 animate-pulse' 
                    : 'bg-gray-900 border-gray-600 text-gray-300 hover:border-gray-400'
                }`}
              >
                {recordingKey === keyName ? 'PRESS KEY...' : currentMap}
              </button>
            </div>
          ))}
          
          <div className="mt-4 pt-4 border-t border-gray-800 flex justify-end">
            <button 
              onClick={() => setConfig({up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', a: 'KeyZ', b: 'KeyX', start: 'Enter', select: 'ShiftRight'})}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Reset Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
