import {
  forwardRef,
  memo,
  useMemo,
  useRef,
  useCallback,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
} from 'react';
import { cn } from '@/lib/cn';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useTabsContext } from './Tabs';
import {
  TAB_LIST_BASE_CLASSES,
  TAB_LIST_ORIENTATION_STYLES,
} from './Tabs.styles';

/**
 * Props for the TabList component.
 */
export interface TabListProps extends ComponentPropsWithoutRef<'div'> {}

/**
 * Container for Tab buttons with keyboard navigation support.
 *
 * Implements ARIA tablist pattern with full keyboard navigation:
 * - Arrow keys (Left/Right for horizontal, Up/Down for vertical)
 * - Home/End keys to navigate to first/last tab
 * - Automatic focus management
 *
 * @example
 * ```tsx
 * <Tabs.List>
 *   <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
 *   <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
 * </Tabs.List>
 * ```
 */
export const TabList = memo(
  forwardRef<HTMLDivElement, TabListProps>(
    ({ className, children, onKeyDown, ...props }, ref) => {
      const { orientation, activeTab, setActiveTab, tabsOrderRef } = useTabsContext();
      const listRef = useRef<HTMLDivElement>(null);
      const mergedRef = useMergedRefs(ref, listRef);

      const tabListClasses = useMemo(
        () =>
          cn(
            TAB_LIST_BASE_CLASSES,
            TAB_LIST_ORIENTATION_STYLES[orientation as keyof typeof TAB_LIST_ORIENTATION_STYLES],
            className
          ),
        [orientation, className]
      );

      // Keyboard navigation handler using React onKeyDown
      const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLDivElement>) => {
          const tabsOrder = tabsOrderRef.current;
          const currentIndex = tabsOrder.indexOf(activeTab);

          // Call user's onKeyDown handler if provided
          onKeyDown?.(e);

          if (currentIndex === -1) return;

          const isHorizontal = orientation === 'horizontal';
          const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
          const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

          let newIndex: number | null = null;

          switch (e.key) {
            case nextKey:
              e.preventDefault();
              newIndex = (currentIndex + 1) % tabsOrder.length;
              break;
            case prevKey:
              e.preventDefault();
              newIndex = (currentIndex - 1 + tabsOrder.length) % tabsOrder.length;
              break;
            case 'Home':
              e.preventDefault();
              newIndex = 0;
              break;
            case 'End':
              e.preventDefault();
              newIndex = tabsOrder.length - 1;
              break;
          }

          if (newIndex !== null) {
            const newTabValue = tabsOrder[newIndex];
            setActiveTab(newTabValue);

            // Focus the newly selected tab button
            const tabButton = listRef.current?.querySelector(
              `[data-tab-value="${newTabValue}"]`
            ) as HTMLElement | null;
            tabButton?.focus();
          }
        },
        [activeTab, setActiveTab, tabsOrderRef, orientation, onKeyDown]
      );

      return (
        <div
          ref={mergedRef}
          role="tablist"
          aria-orientation={orientation}
          className={tabListClasses}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);

TabList.displayName = 'Tabs.List';
