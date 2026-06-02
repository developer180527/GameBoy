import React from 'react';
import { Joystick } from './Joystick';
import { GameButton } from './Buttons';

interface ControlsProps {
  onPressA: () => void;
  onPressB: () => void;
  onJoyStick: (angle: number | null, strength: number) => void;
}

export function Controls({ onPressA, onPressB, onJoyStick }: ControlsProps) {
  return (
    <div className="w-full flex-1 flex flex-col justify-between pt-8">
      {/* Joysticks Area */}
      <div className="flex justify-between w-full px-4 mb-4">
        <Joystick label="L-STICK" onChange={onJoyStick} />
        <Joystick label="R-STICK" onChange={() => {}} />
      </div>

      {/* Primary Buttons */}
      <div className="flex justify-center flex-1 items-center space-x-12 pb-8">
        <div className="pt-8">
          <GameButton label="B" action="Back" color="bg-[#d946ef]" borderColor="border-[#a21caf]" onClick={onPressB} />
        </div>
        <div className="pb-8">
          <GameButton label="A" action="Select" color="bg-[#3b82f6]" borderColor="border-[#1d4ed8]" onClick={onPressA} />
        </div>
      </div>
    </div>
  );
}
