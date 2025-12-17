/**
 * @file BaseCardContainer.tsx
 * @description A foundational container component for building card-like UI elements.
 * 
 * BaseCardContainer provides the structural foundation for:
 * - Card components
 * - Modal panels
 * - Popover content
 * - Drawer panels
 * - Any container with header/content/footer pattern
 * 
 * @example
 * ```tsx
 * // Card composing from BaseCardContainer
 * <BaseCardContainer
 *   baseClasses={CARD_BASE_CLASSES}
 *   variantClasses={CARD_VARIANT_CLASSES}
 *   variant="elevated"
 *   containerStyles={CARD_CONTAINER_STYLES}
 * >
 *   <BaseCardContainer.Header paddingStyles={HEADER_PADDING}>
 *     <BaseCardContainer.Title>Title</BaseCardContainer.Title>
 *   </BaseCardContainer.Header>
 *   <BaseCardContainer.Content paddingStyles={CONTENT_PADDING}>
 *     Content here
 *   </BaseCardContainer.Content>
 * </BaseCardContainer>
 * ```
 */

import { forwardRef, memo, useMemo, type ElementType } from 'react';
import { cn } from '@/lib/cn';
import {
  DEFAULT_BASE_CLASSES,
  DEFAULT_HEADER_CLASSES,
  DEFAULT_HEADER_PADDING,
  DEFAULT_CONTENT_CLASSES,
  DEFAULT_CONTENT_PADDING,
  DEFAULT_FOOTER_CLASSES,
  DEFAULT_FOOTER_PADDING,
  DEFAULT_TITLE_CLASSES,
  DEFAULT_DESCRIPTION_CLASSES,
  DEFAULT_VARIANT_CLASSES,
  DEFAULT_COLOR_CLASSES,
  DEFAULT_INTERACTIVE_CLASSES,
  DEFAULT_CONTAINER_STYLES,
} from './BaseCardContainer.styles';
import type {
  BaseCardContainerProps,
  BaseCardHeaderProps,
  BaseCardContentProps,
  BaseCardFooterProps,
  BaseCardTitleProps,
  BaseCardDescriptionProps,
} from './BaseCardContainer.types';

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Header section of the card container
 */
export const BaseCardHeader = memo(
  forwardRef<HTMLDivElement, BaseCardHeaderProps>(
    ({ className, baseClasses, paddingStyles, style, children, ...props }, ref) => {
      const headerClasses = useMemo(
        () => cn(baseClasses ?? DEFAULT_HEADER_CLASSES, className),
        [baseClasses, className]
      );

      const mergedStyles = useMemo(
        () => ({ ...(paddingStyles ?? DEFAULT_HEADER_PADDING), ...style }),
        [paddingStyles, style]
      );

      return (
        <div ref={ref} className={headerClasses} style={mergedStyles} {...props}>
          {children}
        </div>
      );
    }
  )
);
BaseCardHeader.displayName = 'BaseCardContainer.Header';

/**
 * Main content section of the card container
 */
export const BaseCardContent = memo(
  forwardRef<HTMLDivElement, BaseCardContentProps>(
    ({ className, baseClasses, paddingStyles, style, children, ...props }, ref) => {
      const contentClasses = useMemo(
        () => cn(baseClasses ?? DEFAULT_CONTENT_CLASSES, className),
        [baseClasses, className]
      );

      const mergedStyles = useMemo(
        () => ({ ...(paddingStyles ?? DEFAULT_CONTENT_PADDING), ...style }),
        [paddingStyles, style]
      );

      return (
        <div ref={ref} className={contentClasses} style={mergedStyles} {...props}>
          {children}
        </div>
      );
    }
  )
);
BaseCardContent.displayName = 'BaseCardContainer.Content';

/**
 * Footer section of the card container
 */
export const BaseCardFooter = memo(
  forwardRef<HTMLDivElement, BaseCardFooterProps>(
    ({ className, baseClasses, paddingStyles, style, children, ...props }, ref) => {
      const footerClasses = useMemo(
        () => cn(baseClasses ?? DEFAULT_FOOTER_CLASSES, className),
        [baseClasses, className]
      );

      const mergedStyles = useMemo(
        () => ({ ...(paddingStyles ?? DEFAULT_FOOTER_PADDING), ...style }),
        [paddingStyles, style]
      );

      return (
        <div ref={ref} className={footerClasses} style={mergedStyles} {...props}>
          {children}
        </div>
      );
    }
  )
);
BaseCardFooter.displayName = 'BaseCardContainer.Footer';

/**
 * Title element for the card container
 */
export const BaseCardTitle = memo(
  forwardRef<HTMLHeadingElement, BaseCardTitleProps>(
    ({ as = 'h2', className, baseClasses, textStyles, style, children, ...props }, ref) => {
      const Component = as as ElementType;

      const titleClasses = useMemo(
        () => cn(baseClasses ?? DEFAULT_TITLE_CLASSES, className),
        [baseClasses, className]
      );

      const mergedStyles = useMemo(
        () => ({ ...textStyles, ...style }),
        [textStyles, style]
      );

      return (
        <Component ref={ref} className={titleClasses} style={mergedStyles} {...props}>
          {children}
        </Component>
      );
    }
  )
);
BaseCardTitle.displayName = 'BaseCardContainer.Title';

/**
 * Description element for the card container (subtitle/helper text)
 */
export const BaseCardDescription = memo(
  forwardRef<HTMLParagraphElement, BaseCardDescriptionProps>(
    ({ className, baseClasses, textStyles, style, children, ...props }, ref) => {
      const descriptionClasses = useMemo(
        () => cn(baseClasses ?? DEFAULT_DESCRIPTION_CLASSES, className),
        [baseClasses, className]
      );

      const mergedStyles = useMemo(
        () => ({ ...textStyles, ...style }),
        [textStyles, style]
      );

      return (
        <p ref={ref} className={descriptionClasses} style={mergedStyles} {...props}>
          {children}
        </p>
      );
    }
  )
);
BaseCardDescription.displayName = 'BaseCardContainer.Description';

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Base card container component.
 * Provides consistent structure for card-like components.
 */
const BaseCardContainerRoot = memo(
  forwardRef<HTMLDivElement, BaseCardContainerProps>(
    (
      {
        variant = 'default',
        colorVariant = 'neutral',
        className,
        style,
        children,
        baseClasses,
        variantClasses,
        colorClasses,
        containerStyles,
        interactive = false,
        interactiveClasses,
        dataAttributes,
        ...props
      },
      ref
    ) => {
      // Resolve variant class
      const variantClass = useMemo(() => {
        const classes = variantClasses ?? DEFAULT_VARIANT_CLASSES;
        return classes[variant] ?? '';
      }, [variantClasses, variant]);

      // Resolve color class
      const colorClass = useMemo(() => {
        const classes = colorClasses ?? DEFAULT_COLOR_CLASSES;
        return classes[colorVariant] ?? '';
      }, [colorClasses, colorVariant]);

      // Resolve interactive class
      const activeInteractiveClasses = useMemo(() => {
        if (!interactive) return '';
        return interactiveClasses ?? DEFAULT_INTERACTIVE_CLASSES;
      }, [interactive, interactiveClasses]);

      // Combine all classes
      const containerClasses = useMemo(
        () =>
          cn(
            baseClasses ?? DEFAULT_BASE_CLASSES,
            variantClass,
            colorClass,
            activeInteractiveClasses,
            className
          ),
        [baseClasses, variantClass, colorClass, activeInteractiveClasses, className]
      );

      // Merge styles - use default container styles for gap
      const mergedStyles = useMemo(
        () => ({ ...DEFAULT_CONTAINER_STYLES, ...containerStyles, ...style }),
        [containerStyles, style]
      );

      // Build data attributes
      const dataProps = useMemo(() => {
        const attrs: Record<string, string | undefined> = {
          'data-variant': variant,
          'data-color': colorVariant !== 'neutral' ? colorVariant : undefined,
          ...dataAttributes,
        };
        return attrs;
      }, [variant, colorVariant, dataAttributes]);

      return (
        <div
          ref={ref}
          className={containerClasses}
          style={mergedStyles}
          {...dataProps}
          {...props}
        >
          {children}
        </div>
      );
    }
  )
);
BaseCardContainerRoot.displayName = 'BaseCardContainer';

// ============================================================================
// COMPOUND COMPONENT
// ============================================================================

/**
 * BaseCardContainer with sub-components attached.
 * 
 * @example
 * ```tsx
 * <BaseCardContainer baseClasses={classes} containerStyles={styles}>
 *   <BaseCardContainer.Header>Header</BaseCardContainer.Header>
 *   <BaseCardContainer.Content>Content</BaseCardContainer.Content>
 *   <BaseCardContainer.Footer>Footer</BaseCardContainer.Footer>
 * </BaseCardContainer>
 * ```
 */
export const BaseCardContainer = Object.assign(BaseCardContainerRoot, {
  Header: BaseCardHeader,
  Content: BaseCardContent,
  Footer: BaseCardFooter,
  Title: BaseCardTitle,
  Description: BaseCardDescription,
});

export type {
  BaseCardContainerProps,
  BaseCardHeaderProps,
  BaseCardContentProps,
  BaseCardFooterProps,
  BaseCardTitleProps,
  BaseCardDescriptionProps,
};
