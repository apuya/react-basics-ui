import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { TAB_PANELS_BASE_CLASSES } from './Tabs.styles';

/**
 * Props for the TabPanels component.
 */
export interface TabPanelsProps extends ComponentPropsWithoutRef<'div'> {}

/**
 * Container for all TabPanel components.
 *
 * Provides consistent spacing and layout for tab content panels.
 * Only the active panel will be rendered at any given time.
 *
 * @example
 * ```tsx
 * <Tabs.Panels>
 *   <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
 *   <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
 * </Tabs.Panels>
 * ```
 */
export const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(TAB_PANELS_BASE_CLASSES, className)} {...props}>
        {children}
      </div>
    );
  }
);

TabPanels.displayName = 'Tabs.Panels';
