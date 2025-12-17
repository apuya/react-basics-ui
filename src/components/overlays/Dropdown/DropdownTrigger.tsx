import { forwardRef, useCallback, cloneElement, isValidElement, type ReactElement } from 'react';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import { useDropdownContext } from './Dropdown';

/**
 * Props for the DropdownTrigger component.
 */
export interface DropdownTriggerProps {
  children: ReactElement;
}

/**
 * Trigger that toggles the dropdown menu visibility.
 * 
 * Enhances the child element with ARIA attributes and click handlers.
 * Does not wrap - passes props directly to the child.
 * 
 * @example
 * ```tsx
 * <Dropdown.Trigger>
 *   <Button>Open menu</Button>
 * </Dropdown.Trigger>
 * ```
 */

export const DropdownTrigger = forwardRef<HTMLElement, DropdownTriggerProps>(
  ({ children }, ref) => {
    const { isOpen, setIsOpen, triggerRef, menuId } = useDropdownContext();
    
    // Merge external ref with internal context ref and child's ref
    const childRef = (children as any).ref;
    const mergedRef = useMergedRefs(ref, triggerRef, childRef);

    /**
     * Toggle dropdown visibility and call optional onClick handler.
     */
    const childOnClick = (children.props as any).onClick;
    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        setIsOpen(!isOpen);
        childOnClick?.(e);
      },
      [isOpen, setIsOpen, childOnClick]
    );

    if (!isValidElement(children)) {
      throw new Error('Dropdown.Trigger: children must be a valid React element');
    }

    return cloneElement(children, {
      ref: mergedRef,
      'aria-expanded': isOpen,
      'aria-haspopup': 'true',
      'aria-controls': menuId || undefined,
      onClick: handleClick,
    } as any);
  }
);

DropdownTrigger.displayName = 'Dropdown.Trigger';
