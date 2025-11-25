export const BASE_CLASSES = 'relative w-full overflow-hidden';

export const COMMON_RATIOS = {
  square: 1, // 1:1
  video: 16 / 9, // 16:9
  widescreen: 21 / 9, // 21:9
  portrait: 3 / 4, // 3:4
  landscape: 4 / 3, // 4:3
  golden: 1.618, // Golden ratio
  ultrawide: 32 / 9, // 32:9
} as const;

export type CommonRatioName = keyof typeof COMMON_RATIOS;
