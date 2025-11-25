import { forwardRef, memo, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cn } from './cn';

export interface SubComponentStyleConfig {
  baseClasses: string;
  paddingInlineVar: string;
  paddingBlockVar: string;
  gapVar: string;
}

/**
 * Factory function to create sub-components (Header, Content, Footer, Title)
 * Eliminates duplicate sub-component code across Modal, Drawer, Card, etc.
 * 
 * @param displayName - Component display name
 * @param styleConfig - Style configuration with CSS classes and CSS variable names
 * @returns Memoized forwardRef component
 * 
 * @example
 * ```tsx
 * export const ModalHeader = createSubComponent('ModalHeader', {
 *   baseClasses: HEADER_CLASSES,
 *   paddingInlineVar: '--component-modal-header-padding-inline',
 *   paddingBlockVar: '--component-modal-header-padding-block',
 *   gapVar: '--component-modal-gap',
 * });
 * ```
 */
export function createSubComponent<T extends HTMLElement = HTMLDivElement>(
  displayName: string,
  styleConfig: SubComponentStyleConfig
) {
  const Component = memo(
    forwardRef<T, ComponentPropsWithoutRef<'div'>>(
      ({ className, children, style, ...props }, ref) => {
        const inlineStyle = useMemo(
          () => ({
            paddingInline: `var(${styleConfig.paddingInlineVar})`,
            paddingBlock: `var(${styleConfig.paddingBlockVar})`,
            gap: `var(${styleConfig.gapVar})`,
            ...style,
          }),
          [style]
        );

        return (
          <div
            ref={ref as any}
            className={cn(styleConfig.baseClasses, className)}
            style={inlineStyle}
            {...props}
          >
            {children}
          </div>
        );
      }
    )
  );

  Component.displayName = displayName;
  return Component;
}

/**
 * Configuration for title sub-components (simplified version without padding/gap)
 */
export interface TitleSubComponentStyleConfig {
  baseClasses: string;
}

/**
 * Factory function to create title sub-components
 * 
 * @param displayName - Component display name
 * @param styleConfig - Style configuration with CSS classes
 * @returns Memoized forwardRef component
 */
export function createTitleSubComponent<T extends HTMLHeadingElement = HTMLHeadingElement>(
  displayName: string,
  styleConfig: TitleSubComponentStyleConfig
) {
  const Component = memo(
    forwardRef<T, ComponentPropsWithoutRef<'h2'>>(
      ({ className, children, ...props }, ref) => {
        return (
          <h2
            ref={ref as any}
            id={`${displayName.toLowerCase()}-title`}
            className={cn(styleConfig.baseClasses, className)}
            {...props}
          >
            {children}
          </h2>
        );
      }
    )
  );

  Component.displayName = displayName;
  return Component;
}
