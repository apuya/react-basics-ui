import { forwardRef, type ReactNode } from 'react';

export interface VisuallyHiddenProps {
  children: ReactNode;
  as?: 'span' | 'div';
}

export const VisuallyHidden = forwardRef<HTMLElement, VisuallyHiddenProps>(
  function VisuallyHidden({ children, as: Component = 'span' }, ref) {
    return (
      <Component
        ref={ref as React.Ref<HTMLSpanElement & HTMLDivElement>}
        className="absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0"
        style={{ clip: 'rect(0, 0, 0, 0)', margin: '-1px' }}
      >
        {children}
      </Component>
    );
  }
);

VisuallyHidden.displayName = 'VisuallyHidden';
