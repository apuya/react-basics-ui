import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { TAB_PANELS_BASE_CLASSES } from './Tabs.styles';

export interface TabPanelsProps extends ComponentPropsWithoutRef<'div'> {}

export const TabPanels = memo(
  forwardRef<HTMLDivElement, TabPanelsProps>(({ className, children, ...props }, ref) => {
    const tabPanelsClasses = useMemo(
      () => cn(TAB_PANELS_BASE_CLASSES, className),
      [className]
    );

    return (
      <div ref={ref} className={tabPanelsClasses} {...props}>
        {children}
      </div>
    );
  })
);

TabPanels.displayName = 'Tabs.Panels';
