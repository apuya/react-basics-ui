import { forwardRef, memo, useState, useMemo, useCallback } from 'react';
import { cn } from '@/lib/cn';
import {
  TOOLTIP_CLASSES,
  POSITION_STYLES,
  WRAPPER_CLASSES,
  VISIBLE_CLASS,
} from './Tooltip.styles';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  position?: TooltipPosition;
  children: React.ReactNode;
  className?: string;
}

export const Tooltip = memo(
  forwardRef<HTMLDivElement, TooltipProps>(
    ({ content, position = 'top', children, className }, ref) => {
      const [isVisible, setIsVisible] = useState(false);

      const tooltipClasses = useMemo(
        () => cn(
          TOOLTIP_CLASSES,
          POSITION_STYLES[position],
          isVisible && VISIBLE_CLASS,
          className
        ),
        [position, isVisible, className]
      );

      const handleMouseEnter = useCallback(() => setIsVisible(true), []);
      const handleMouseLeave = useCallback(() => setIsVisible(false), []);
      const handleFocus = useCallback(() => setIsVisible(true), []);
      const handleBlur = useCallback(() => setIsVisible(false), []);

      return (
        <div
          ref={ref}
          className={WRAPPER_CLASSES}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {children}
          <div
            role="tooltip"
            className={tooltipClasses}
          >
            {content}
          </div>
        </div>
      );
    }
  )
);

Tooltip.displayName = 'Tooltip';
