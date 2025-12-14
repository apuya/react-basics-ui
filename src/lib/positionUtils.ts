export type PositionSide = 'top' | 'bottom' | 'left' | 'right';
export type PositionAlign = 'start' | 'center' | 'end';

/**
 * Shared positioning styles for overlay components (Tooltip, Popover)
 * Consolidates duplicate positioning logic
 */
export const POSITION_STYLES: Record<PositionSide, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

/**
 * Get position classes for an overlay element
 * @param side - Which side of the trigger to position on
 * @returns Tailwind classes for positioning
 */
export function getPositionClasses(side: PositionSide): string {
  return POSITION_STYLES[side];
}
