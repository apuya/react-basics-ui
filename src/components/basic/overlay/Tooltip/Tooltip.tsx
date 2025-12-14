/**
 * Tooltip - Displays contextual information on hover or focus.
 * Renders in a portal for proper z-index handling and positioning.
 */
import { forwardRef, memo, useState, useMemo, useRef, useEffect, useId, useCallback } from 'react';
import { Portal } from '@/components/basic/utility/Portal';
import { cn } from '@/lib/cn';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import {
  TOOLTIP_CLASSES,
  WRAPPER_CLASSES,
  VISIBLE_CLASS,
  TOOLTIP_OFFSET,
  TOOLTIP_POSITION_STYLE,
  TOOLTIP_PADDING_STYLE,
  calculatePosition,
} from './Tooltip.styles';
import type { TooltipProps } from './Tooltip.types';

export const Tooltip = memo(
  forwardRef<HTMLDivElement, TooltipProps>(
    ({ content, position = 'top', children, className, offset = TOOLTIP_OFFSET, id: customId }, ref) => {
      const [isVisible, setIsVisible] = useState(false);
      const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
      const triggerRef = useRef<HTMLDivElement>(null);
      const tooltipRef = useRef<HTMLDivElement>(null);
      const mergedRef = useMergedRefs(ref, triggerRef);

      // Generate unique ID for accessibility
      const generatedId = useId();
      const tooltipId = customId ?? `tooltip-${generatedId}`;

      // Dismiss on Escape key
      useEscapeKey(() => setIsVisible(false), isVisible);

      // Calculate tooltip position - RAF ensures Portal has mounted
      useEffect(() => {
        if (!isVisible || !triggerRef.current) {
          setCoords(null);
          return;
        }

        const rafId = requestAnimationFrame(() => {
          if (!triggerRef.current || !tooltipRef.current) return;
          setCoords(
            calculatePosition(
              triggerRef.current.getBoundingClientRect(),
              tooltipRef.current.getBoundingClientRect(),
              position,
              offset
            )
          );
        });

        return () => cancelAnimationFrame(rafId);
      }, [isVisible, position, offset]);

      const isPositioned = coords !== null;

      const tooltipClasses = useMemo(
        () => cn(TOOLTIP_CLASSES, isPositioned && VISIBLE_CLASS, className),
        [isPositioned, className]
      );

      const tooltipStyle = useMemo(
        () => ({
          ...TOOLTIP_POSITION_STYLE,
          ...TOOLTIP_PADDING_STYLE,
          top: coords?.top ?? 0,
          left: coords?.left ?? 0,
        }),
        [coords]
      );

      const show = useCallback(() => setIsVisible(true), []);
      const hide = useCallback(() => setIsVisible(false), []);

      return (
        <>
          <div
            ref={mergedRef}
            className={WRAPPER_CLASSES}
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
            aria-describedby={isVisible ? tooltipId : undefined}
          >
            {children}
          </div>
          {isVisible && (
            <Portal containerId="tooltip-root">
              <div
                id={tooltipId}
                ref={tooltipRef}
                role="tooltip"
                className={tooltipClasses}
                style={tooltipStyle}
                data-position={position}
              >
                {content}
              </div>
            </Portal>
          )}
        </>
      );
    }
  )
);

Tooltip.displayName = 'Tooltip';
