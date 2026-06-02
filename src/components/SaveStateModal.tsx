import React from 'react';
import { SaveState } from '../types';
import { X, Save, Upload, Trash2 } from 'lucide-react';

interface SaveStateModalProps {
  onClose: () => void;
}

export function SaveStateModal({ onClose }: SaveStateModalProps) {
  const slots = [1, 2, 3, 4, 5];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border-2 border-gray-700 rounded-xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-950">
          <h2 className="text-xl font-bold font-sans tracking-wide">Save States</h2>
          <button onClick={onClose} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-3">
          {slots.map(slot => (
            <div key={slot} className="bg-gray-800 rounded-lg p-3 border border-gray-700 flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span className="font-bold text-gray-300">SLOT {slot}</span>
                <span>{slot === 1 ? '10/24/2023, 4:20 PM' : 'Empty'}</span>
              </div>
              
              <div className="flex gap-2 mt-2">
                <button className="flex-1 bg-green-900/50 hover:bg-green-800 text-green-400 py-2 rounded-md font-semibold text-sm flex items-center justify-center gap-2 transition-colors border border-green-800/50">
                  <Upload size={16} /> LOAD
                </button>
                <button className="flex-1 bg-blue-900/50 hover:bg-blue-800 text-blue-400 py-2 rounded-md font-semibold text-sm flex items-center justify-center gap-2 transition-colors border border-blue-800/50">
                  <Save size={16} /> SAVE
                </button>
                {slot === 1 && (
                  <button className="aspect-square bg-red-900/50 hover:bg-red-800 text-red-500 rounded-md flex items-center justify-center transition-colors border border-red-800/50 p-2">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
