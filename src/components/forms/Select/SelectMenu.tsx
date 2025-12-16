import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { List } from '@/components/overlays/List';

export interface SelectMenuProps extends ComponentPropsWithoutRef<'div'> {}

export const SelectMenu = memo(
  forwardRef<HTMLDivElement, SelectMenuProps>(
    ({ className, children, ...props }, forwardedRef) => {
      return (
        <List.Container ref={forwardedRef} className={className} {...props}>
          {children}
        </List.Container>
      );
    }
  )
);

SelectMenu.displayName = 'Select.Menu';
