import { cn } from '@/lib/cn';
import { forwardRef, memo } from 'react';
import {
  BASE_CLASSES,
  LABEL_CLASSES,
  LABEL_WRAPPER_CLASSES,
  ORIENTATION_STYLES,
  SPACING_STYLES_HORIZONTAL,
  SPACING_STYLES_VERTICAL,
  VARIANT_STYLES,
} from './Divider.styles';
import type { DividerProps } from './Divider.types';

// =============================================================================
// Divider Component
// =============================================================================

export const Divider = memo(
  forwardRef<HTMLHRElement, DividerProps>(function Divider(
    {
      orientation = 'horizontal',
      variant = 'solid',
      spacing = 'md',
      label,
      labelPosition = 'center',
      className,
      ...rest
    },
    ref
  ) {
    const spacingClass =
      orientation === 'horizontal'
        ? SPACING_STYLES_HORIZONTAL[spacing]
        : SPACING_STYLES_VERTICAL[spacing];

    // If there's a label, render as a wrapper div with divider segments
    if (label && orientation === 'horizontal') {
      const justifyContent =
        labelPosition === 'left'
          ? 'flex-start'
          : labelPosition === 'right'
          ? 'flex-end'
          : 'center';

      return (
        <div
          className={cn(LABEL_WRAPPER_CLASSES, spacingClass, className)}
          role="separator"
          style={{ justifyContent }}
          data-orientation={orientation}
          data-variant={variant}
          data-spacing={spacing}
        >
          {labelPosition !== 'left' && (
            <hr
              className={cn(
                BASE_CLASSES,
                ORIENTATION_STYLES[orientation],
                variant === 'solid' ? VARIANT_STYLES.solid : '',
                variant !== 'solid' ? 'flex-shrink flex-grow' : 'flex-1'
              )}
              style={
                variant !== 'solid'
                  ? { borderTopStyle: variant, borderTopColor: 'var(--component-divider-color)' }
                  : undefined
              }
            />
          )}
          <span className={LABEL_CLASSES}>{label}</span>
          {labelPosition !== 'right' && (
            <hr
              className={cn(
                BASE_CLASSES,
                ORIENTATION_STYLES[orientation],
                variant === 'solid' ? VARIANT_STYLES.solid : '',
                variant !== 'solid' ? 'flex-shrink flex-grow' : 'flex-1'
              )}
              style={
                variant !== 'solid'
                  ? { borderTopStyle: variant, borderTopColor: 'var(--component-divider-color)' }
                  : undefined
              }
            />
          )}
        </div>
      );
    }

    // Standard divider without label
    const dividerClasses = cn(
      BASE_CLASSES,
      ORIENTATION_STYLES[orientation],
      variant === 'solid' ? VARIANT_STYLES.solid : '',
      spacingClass,
      className
    );

    return (
      <hr
        ref={ref}
        className={dividerClasses}
        role="separator"
        aria-orientation={orientation}
        data-orientation={orientation}
        data-variant={variant}
        data-spacing={spacing}
        style={
          variant !== 'solid'
            ? {
                [orientation === 'horizontal' ? 'borderTopStyle' : 'borderLeftStyle']: variant,
                [orientation === 'horizontal' ? 'borderTopColor' : 'borderLeftColor']:
                  'var(--component-divider-color)',
              }
            : undefined
        }
        {...rest}
      />
    );
  })
);

Divider.displayName = 'Divider';
