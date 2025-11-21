import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { DIVIDER_CLASSES } from './Dropdown.styles';

export interface DropdownDividerProps extends ComponentPropsWithoutRef<'div'> {}

export const DropdownDivider = memo(
  forwardRef<HTMLDivElement, DropdownDividerProps>(({ className, ...props }, ref) => {
    const dividerStyle = useMemo(
      () => ({ marginBlock: 'var(--component-dropdown-gap)' }),
      []
    );

    return (
      <div
        ref={ref}
        role="separator"
        className={cn(DIVIDER_CLASSES, className)}
        style={dividerStyle}
        {...props}
      />
    );
  })
);

DropdownDivider.displayName = 'Dropdown.Divider';
