import { forwardRef, memo, useMemo, type ReactNode, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { useTabsContext } from './Tabs';
import { TAB_PANEL_BASE_CLASSES } from './Tabs.styles';

export interface TabPanelProps extends ComponentPropsWithoutRef<'div'> {
  value: string;
  children: ReactNode;
}

export const TabPanel = memo(
  forwardRef<HTMLDivElement, TabPanelProps>(({ value, children, className, ...props }, ref) => {
    const { activeTab } = useTabsContext();
    const isActive = activeTab === value;

    const tabPanelClasses = useMemo(
      () => cn(TAB_PANEL_BASE_CLASSES, className),
      [className]
    );

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        tabIndex={0}
        className={tabPanelClasses}
        {...props}
      >
        {children}
      </div>
    );
  })
);

TabPanel.displayName = 'Tabs.Panel';
