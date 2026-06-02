export type RomFile = {
  id: string;
  name: string;
  size: string;
  date: string;
};

export type SaveState = {
  id: string;
  slot: number;
  date: string;
  romId: string;
  image?: string;
};

export type GamepadConfig = {
  up: string;
  down: string;
  left: string;
  right: string;
  a: string;
  b: string;
  start: string;
  select: string;
};
