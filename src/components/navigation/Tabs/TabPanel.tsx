import { forwardRef, memo, type ReactNode, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { useTabsContext } from './Tabs';
import { TAB_PANEL_BASE_CLASSES } from './Tabs.styles';

/**
 * Props for the TabPanel component.
 */
export interface TabPanelProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Unique identifier for the panel. Must match the corresponding Tab value.
   */
  value: string;
  /**
   * Content to display when this panel is active.
   */
  children: ReactNode;
}

/**
 * Content panel that displays when its corresponding tab is active.
 *
 * Only renders when the panel's value matches the active tab.
 * Automatically manages ARIA attributes for accessibility.
 *
 * @example
 * ```tsx
 * <Tabs.Panel value="account">
 *   <h2>Account Settings</h2>
 *   <p>Manage your account preferences.</p>
 * </Tabs.Panel>
 * ```
 */
export const TabPanel = memo(
  forwardRef<HTMLDivElement, TabPanelProps>(({ value, children, className, ...props }, ref) => {
    const { activeTab } = useTabsContext();
    const isActive = activeTab === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        className={cn(TAB_PANEL_BASE_CLASSES, className)}
        {...props}
      >
        {children}
      </div>
    );
  })
);

TabPanel.displayName = 'Tabs.Panel';
