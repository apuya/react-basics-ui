import { forwardRef, useCallback, type ComponentPropsWithoutRef } from 'react';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useDropdownContext } from './Dropdown';

/**
 * Props for the DropdownTrigger component.
 */
export interface DropdownTriggerProps extends ComponentPropsWithoutRef<'button'> {}

/**
 * Trigger button that toggles the dropdown menu visibility.
 * 
 * Automatically manages ARIA attributes for accessibility and focus states.
 * The trigger can contain any content, typically a Button component.
 * 
 * @example
 * ```tsx
 * <Dropdown.Trigger>
 *   <Button>Open menu</Button>
 * </Dropdown.Trigger>
 * ```
 */

export const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  ({ children, onClick, ...props }, ref) => {
    const { isOpen, setIsOpen, triggerRef, menuId } = useDropdownContext();
    
    // Merge external ref with internal context ref
    const mergedRef = useMergedRefs(ref, triggerRef);

    /**
     * Toggle dropdown visibility and call optional onClick handler.
     */
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpen(!isOpen);
        onClick?.(e);
      },
      [isOpen, setIsOpen, onClick]
    );

    return (
      <button
        ref={mergedRef}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId || undefined}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DropdownTrigger.displayName = 'Dropdown.Trigger';
