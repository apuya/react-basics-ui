import React from 'react';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tag variant */
  variant?: 'solid' | 'outline' | 'subtle';
  /** Tag color */
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  /** Tag size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether tag is removable */
  removable?: boolean;
  /** Callback when remove is clicked */
  onRemove?: () => void;
  children?: React.ReactNode;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ variant = 'subtle', color = 'default', size = 'md', removable, onRemove, className, children, ...props }, ref) => {
    return (
      <span ref={ref} className={className} {...props}>
        {children}
        {removable && (
          <button type="button" onClick={onRemove} aria-label="Remove">
            ×
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';
