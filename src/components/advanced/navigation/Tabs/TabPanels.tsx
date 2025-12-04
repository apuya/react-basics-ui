import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { useTabsContext } from './Tabs';
import { TAB_PANELS_ORIENTATION_STYLES } from './Tabs.styles';

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
export const TabPanels = memo(
  forwardRef<HTMLDivElement, TabPanelsProps>(({ className, children, ...props }, ref) => {
    const { orientation } = useTabsContext();

    const panelsClasses = useMemo(
      () => cn(TAB_PANELS_ORIENTATION_STYLES[orientation], className),
      [orientation, className]
    );

    return (
      <div ref={ref} className={panelsClasses} {...props}>
        {children}
      </div>
    );
  })
);

TabPanels.displayName = 'Tabs.Panels';
