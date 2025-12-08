import { forwardRef, memo, useState, useMemo, useRef, useEffect, useId } from 'react';
import { Portal } from '@/components/utility/Portal';
import { cn } from '@/lib/cn';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import {
  TOOLTIP_CLASSES,
  WRAPPER_CLASSES,
  VISIBLE_CLASS,
  calculatePosition,
} from './Tooltip.styles';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Content to display in the tooltip */
  content: React.ReactNode;
  /** Position of the tooltip relative to the trigger */
  position?: TooltipPosition;
  /** The trigger element */
  children: React.ReactNode;
  /** Additional class names for the tooltip */
  className?: string;
  /** Offset from the trigger element in pixels */
  offset?: number;
  /** Custom ID for the tooltip (auto-generated if not provided) */
  id?: string;
}

const TOOLTIP_OFFSET = 8;

/**
 * Tooltip component that displays contextual information on hover or focus.
 * Renders in a portal for proper z-index handling.
 *
 * @example
 * ```tsx
 * <Tooltip content="Helpful information">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * ```
 */
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
          position: 'fixed' as const,
          top: coords?.top ?? 0,
          left: coords?.left ?? 0,
          padding: 'var(--component-tooltip-padding-block) var(--component-tooltip-padding-inline)',
        }),
        [coords]
      );

      const show = () => setIsVisible(true);
      const hide = () => setIsVisible(false);

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
