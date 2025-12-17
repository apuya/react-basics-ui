import type { TooltipPosition } from './Tooltip.types';

export const TOOLTIP_CLASSES =
  'z-[number:var(--component-tooltip-z-index)] bg-[color:var(--component-tooltip-bg)] text-[color:var(--component-tooltip-text)] text-[length:var(--component-tooltip-font-size)] font-[number:var(--component-tooltip-font-weight)] leading-[var(--semantic-line-height-normal)] rounded-[length:var(--component-tooltip-radius)] border border-[color:var(--component-tooltip-border)] shadow-[shadow:var(--component-tooltip-shadow)] whitespace-nowrap pointer-events-none opacity-0 transition-opacity duration-200';

export const WRAPPER_CLASSES = 'relative inline-block';

export const VISIBLE_CLASS = 'opacity-100';

export const TOOLTIP_OFFSET = 8;

export const TOOLTIP_POSITION_STYLE = { position: 'fixed' as const };

export const TOOLTIP_PADDING_STYLE = {
  padding: 'var(--component-tooltip-padding-block) var(--component-tooltip-padding-inline)',
} as const;

/** Calculate tooltip position based on trigger and tooltip dimensions */
export const calculatePosition = (
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  position: TooltipPosition,
  offset: number
): { top: number; left: number } => {
  const centerX = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
  const centerY = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;

  switch (position) {
    case 'top':
      return { top: triggerRect.top - tooltipRect.height - offset, left: centerX };
    case 'bottom':
      return { top: triggerRect.bottom + offset, left: centerX };
    case 'left':
      return { top: centerY, left: triggerRect.left - tooltipRect.width - offset };
    case 'right':
      return { top: centerY, left: triggerRect.right + offset };
  }
};
