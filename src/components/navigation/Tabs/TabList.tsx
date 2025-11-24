import { forwardRef, memo, useMemo, useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
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
  forwardRef<HTMLDivElement, TabListProps>(({ className, children, ...props }, ref) => {
    const { orientation, activeTab, setActiveTab, tabsOrderRef } = useTabsContext();
    const listRef = useRef<HTMLDivElement>(null);

    const tabListClasses = useMemo(
      () =>
        cn(
          TAB_LIST_BASE_CLASSES,
          TAB_LIST_ORIENTATION_STYLES[orientation],
          className
        ),
      [orientation, className]
    );

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!listRef.current?.contains(document.activeElement)) return;

        const tabsOrder = tabsOrderRef.current;
        const currentIndex = tabsOrder.indexOf(activeTab);
        if (currentIndex === -1) return;

        const isHorizontal = orientation === 'horizontal';
        const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
        const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

        switch (e.key) {
          case nextKey:
            e.preventDefault();
            setActiveTab(tabsOrder[(currentIndex + 1) % tabsOrder.length]);
            break;
          case prevKey:
            e.preventDefault();
            setActiveTab(tabsOrder[(currentIndex - 1 + tabsOrder.length) % tabsOrder.length]);
            break;
          case 'Home':
            e.preventDefault();
            setActiveTab(tabsOrder[0]);
            break;
          case 'End':
            e.preventDefault();
            setActiveTab(tabsOrder[tabsOrder.length - 1]);
            break;
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [activeTab, setActiveTab, tabsOrderRef, orientation]);

    return (
      <div
        ref={(node) => {
          if (node) listRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        role="tablist"
        aria-orientation={orientation}
        className={tabListClasses}
        {...props}
      >
        {children}
      </div>
    );
  })
);

TabList.displayName = 'Tabs.List';
