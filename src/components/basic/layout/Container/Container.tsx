import { cn } from '@/lib/cn';
import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { BASE_CLASSES, PADDING_STYLES, SIZE_STYLES } from './Container.styles';

export type ContainerSize = keyof typeof SIZE_STYLES;
export type ContainerPadding = keyof typeof PADDING_STYLES;

export interface ContainerProps extends ComponentPropsWithoutRef<'div'> {
  /** Maximum width of the container */
  size?: ContainerSize;
  /** Horizontal padding of the container */
  padding?: ContainerPadding;
  /** Whether to center the container */
  centered?: boolean;
  /** Children elements */
  children?: React.ReactNode;
}

/**
 * A responsive container component that centers content and constrains width.
 * Provides consistent padding and max-width across different breakpoints.
 *
 * @example
 * ```tsx
 * // Default container
 * <Container>
 *   <h1>Page content</h1>
 * </Container>
 *
 * // Small container for narrow content
 * <Container size="sm">
 *   <form>...</form>
 * </Container>
 *
 * // Prose container for readable text
 * <Container size="prose">
 *   <article>Long form content...</article>
 * </Container>
 * ```
 */
export const Container = memo(
  forwardRef<HTMLDivElement, ContainerProps>(function Container(
    {
      size = 'xl',
      padding = 'md',
      centered = true,
      className,
      children,
      ...props
    },
    ref
  ) {
    const classes = useMemo(
      () =>
        cn(
          centered && BASE_CLASSES,
          !centered && 'w-full',
          SIZE_STYLES[size],
          PADDING_STYLES[padding],
          className
        ),
      [size, padding, centered, className]
    );

    return (
      <div
        ref={ref}
        className={classes}
        data-size={size}
        data-padding={padding}
        data-centered={centered || undefined}
        {...props}
      >
        {children}
      </div>
    );
  })
);

Container.displayName = 'Container';
