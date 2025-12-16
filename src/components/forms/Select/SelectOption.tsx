import { forwardRef, memo, type ComponentPropsWithoutRef } from 'react';
import { List } from '@/components/overlays/List';

export interface SelectOptionProps extends Omit<ComponentPropsWithoutRef<'button'>, 'value'> {
  value: string;
  disabled?: boolean;
}

export const SelectOption = memo(
  forwardRef<HTMLButtonElement, SelectOptionProps>(
    ({ value, disabled = false, className, children, ...props }, ref) => {
      return (
        <List.Item
          ref={ref}
          value={value}
          disabled={disabled}
          className={className}
          {...props}
        >
          {children}
        </List.Item>
      );
    }
  )
);

SelectOption.displayName = 'Select.Option';
