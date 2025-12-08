import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { PositionSide, PositionAlign } from '@/lib/positionUtils';

export type { PositionSide, PositionAlign };

export interface ResponsivePositionOptions {
  /** Preferred side to position on */
  preferredSide?: PositionSide;
  /** Preferred alignment */
  preferredAlign?: PositionAlign;
  /** Minimum space required from viewport edge (in pixels) */
  viewportPadding?: number;
  /** Whether to enable responsive positioning */
  enabled?: boolean;
  /** Whether the overlay is currently open (triggers recalculation) */
  isOpen?: boolean;
}

export interface ResponsivePositionResult {
  side: PositionSide;
  align: PositionAlign;
  /** Recalculate position (call when opening) */
  updatePosition: () => void;
}

/**
 * Calculates the optimal position for an overlay based on available viewport space.
 * This is a pure function used internally for synchronous calculation.
 */
function calculateOptimalPosition(
  triggerRect: DOMRect,
  contentWidth: number,
  contentHeight: number,
  viewportWidth: number,
  viewportHeight: number,
  preferredSide: PositionSide,
  preferredAlign: PositionAlign,
  viewportPadding: number
): { side: PositionSide; align: PositionAlign } {
  // Calculate available space on each side (from trigger edge to viewport edge)
  // Note: spaceAbove is not used since we don't flip top → bottom
  const spaceBelow = viewportHeight - triggerRect.bottom - viewportPadding;
  const spaceLeft = triggerRect.left - viewportPadding;
  const spaceRight = viewportWidth - triggerRect.right - viewportPadding;

  // Determine best side based on preferred side and available space
  let bestSide: PositionSide = preferredSide;

  // Note: We don't flip top → bottom as there's rarely a use case for it.
  // Only bottom → top, left → right, and right → left are supported.
  if (preferredSide === 'bottom') {
    if (spaceBelow < contentHeight) {
      bestSide = 'top';
    }
  } else if (preferredSide === 'left') {
    if (spaceLeft < contentWidth) {
      bestSide = 'right';
    }
  } else if (preferredSide === 'right') {
    if (spaceRight < contentWidth) {
      bestSide = 'left';
    }
  }

  // Determine best alignment based on available space
  let bestAlign: PositionAlign = preferredAlign;

  if (bestSide === 'top' || bestSide === 'bottom') {
    // For vertical sides, check horizontal alignment
    if (preferredAlign === 'start') {
      if (triggerRect.left + contentWidth > viewportWidth - viewportPadding) {
        bestAlign = 'end';
      }
    } else if (preferredAlign === 'end') {
      if (triggerRect.right - contentWidth < viewportPadding) {
        bestAlign = 'start';
      }
    } else if (preferredAlign === 'center') {
      const triggerCenter = triggerRect.left + triggerRect.width / 2;
      const halfContentWidth = contentWidth / 2;
      
      if (triggerCenter - halfContentWidth < viewportPadding) {
        bestAlign = 'start';
      } else if (triggerCenter + halfContentWidth > viewportWidth - viewportPadding) {
        bestAlign = 'end';
      }
    }
  } else {
    // For horizontal sides (left/right), check vertical alignment
    if (preferredAlign === 'start') {
      if (triggerRect.top + contentHeight > viewportHeight - viewportPadding) {
        bestAlign = 'end';
      }
    } else if (preferredAlign === 'end') {
      if (triggerRect.bottom - contentHeight < viewportPadding) {
        bestAlign = 'start';
      }
    } else if (preferredAlign === 'center') {
      const triggerCenter = triggerRect.top + triggerRect.height / 2;
      const halfContentHeight = contentHeight / 2;
      
      if (triggerCenter - halfContentHeight < viewportPadding) {
        bestAlign = 'start';
      } else if (triggerCenter + halfContentHeight > viewportHeight - viewportPadding) {
        bestAlign = 'end';
      }
    }
  }

  return { side: bestSide, align: bestAlign };
}

/**
 * Hook that calculates optimal positioning for an overlay element
 * based on available viewport space.
 * 
 * The position is calculated synchronously during render when the trigger
 * element is available, ensuring no flash of incorrect positioning.
 *
 * @param triggerRef - Reference to the trigger element
 * @param contentRef - Reference to the content/overlay element (for measurement, optional)
 * @param options - Configuration options
 * @returns Calculated side and align values
 */
export function useResponsivePosition(
  triggerRef: React.RefObject<HTMLElement | null>,
  contentRef: React.RefObject<HTMLElement | null>,
  options: ResponsivePositionOptions = {}
): ResponsivePositionResult {
  const {
    preferredSide = 'bottom',
    preferredAlign = 'center',
    viewportPadding = 8,
    enabled = true,
    isOpen = false,
  } = options;

  // Use refs to store the calculated values to avoid re-render loops
  const calculatedRef = useRef<{ side: PositionSide; align: PositionAlign }>({
    side: preferredSide,
    align: preferredAlign,
  });
  
  // State to force re-render when position changes
  const [, forceUpdate] = useState(0);

  // Calculate position synchronously if we have the trigger
  // This runs during render, so the first paint will have correct position
  if (enabled && isOpen && triggerRef.current) {
    const triggerRect = triggerRef.current.getBoundingClientRect();
    
    // Get content dimensions if available, otherwise use estimates
    let contentWidth = 220;
    let contentHeight = 150;
    
    if (contentRef.current) {
      const contentRect = contentRef.current.getBoundingClientRect();
      if (contentRect.width > 0 && contentRect.height > 0) {
        contentWidth = contentRect.width;
        contentHeight = contentRect.height;
      }
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const result = calculateOptimalPosition(
      triggerRect,
      contentWidth,
      contentHeight,
      viewportWidth,
      viewportHeight,
      preferredSide,
      preferredAlign,
      viewportPadding
    );

    calculatedRef.current = result;
  } else if (!isOpen) {
    // Reset to preferred values when closed
    calculatedRef.current = { side: preferredSide, align: preferredAlign };
  }

  // Manual update function for external calls (e.g., window resize)
  const updatePosition = useCallback(() => {
    if (!enabled || !triggerRef.current) {
      calculatedRef.current = { side: preferredSide, align: preferredAlign };
      forceUpdate(n => n + 1);
      return;
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    
    let contentWidth = 220;
    let contentHeight = 150;
    
    if (contentRef.current) {
      const contentRect = contentRef.current.getBoundingClientRect();
      if (contentRect.width > 0 && contentRect.height > 0) {
        contentWidth = contentRect.width;
        contentHeight = contentRect.height;
      }
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const result = calculateOptimalPosition(
      triggerRect,
      contentWidth,
      contentHeight,
      viewportWidth,
      viewportHeight,
      preferredSide,
      preferredAlign,
      viewportPadding
    );

    // Only update if values changed
    if (result.side !== calculatedRef.current.side || result.align !== calculatedRef.current.align) {
      calculatedRef.current = result;
      forceUpdate(n => n + 1);
    }
  }, [enabled, triggerRef, contentRef, preferredSide, preferredAlign, viewportPadding]);

  // Recalculate on window resize when open
  useLayoutEffect(() => {
    if (!enabled || !isOpen) return;

    const handleResize = () => updatePosition();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [enabled, isOpen, updatePosition]);

  return {
    side: calculatedRef.current.side,
    align: calculatedRef.current.align,
    updatePosition,
  };
}
