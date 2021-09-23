export const DEFAULT_TIME_KEY = "00:00";
export const PICKER_RADIUS = 150;
export const HOURS_RADIUS = 80;
export const MINUTES_RADIUS = 122;
export const VALUE_SIZE = 40;

export type Position = { left: number; top: number };

export const HOURS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
] as const;

export const HOURS_POSITIONS: Position[] = HOURS.map((hour) => {
  const angle = (Math.PI / 6) * hour;

  const leftShift = Math.sin(angle) * HOURS_RADIUS;
  const topShift = Math.cos(angle) * HOURS_RADIUS;

  const left = PICKER_RADIUS + leftShift - VALUE_SIZE / 2;
  const top = PICKER_RADIUS - topShift - VALUE_SIZE / 2;

  return { left, top };
});

export const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as const;

export const MINUTES_POSITIONS: Position[] = MINUTES.map((minute) => {
  const angle = (Math.PI / 30) * minute;

  const leftShift = Math.sin(angle) * MINUTES_RADIUS;
  const topShift = Math.cos(angle) * MINUTES_RADIUS;

  const left = PICKER_RADIUS + leftShift - VALUE_SIZE / 2;
  const top = PICKER_RADIUS - topShift - VALUE_SIZE / 2;

  return { left, top };
});
