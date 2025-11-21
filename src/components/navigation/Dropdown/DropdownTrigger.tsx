import { forwardRef, memo, useCallback, type ComponentPropsWithoutRef } from 'react';
import { useDropdownContext } from './Dropdown';

export interface DropdownTriggerProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

export const DropdownTrigger = memo(
  forwardRef<HTMLButtonElement, DropdownTriggerProps>(
    ({ asChild, children, onClick, ...props }, ref) => {
      const { isOpen, setIsOpen } = useDropdownContext();

      const handleClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
          setIsOpen(!isOpen);
          onClick?.(e);
        },
        [isOpen, setIsOpen, onClick]
      );

      return (
        <button
          ref={ref}
          type="button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleClick}
          {...props}
        >
          {children}
        </button>
      );
    }
  )
);

DropdownTrigger.displayName = 'Dropdown.Trigger';
