import type { TooltipPosition } from './Tooltip';

export const TOOLTIP_CLASSES =
  'absolute z-[var(--component-tooltip-z-index)] px-[var(--component-tooltip-padding-x)] py-[var(--component-tooltip-padding-y)] bg-[var(--component-tooltip-background)] text-[var(--component-tooltip-text)] text-[length:var(--component-tooltip-font-size)] font-[var(--component-tooltip-font-weight)] leading-[var(--component-tooltip-line-height)] rounded-[var(--component-tooltip-border-radius)] shadow-[var(--component-tooltip-shadow)] whitespace-nowrap pointer-events-none opacity-0 transition-opacity duration-200';

export const POSITION_STYLES: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export const WRAPPER_CLASSES = 'relative inline-block';

export const VISIBLE_CLASS = 'opacity-100';
