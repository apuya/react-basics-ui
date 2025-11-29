import { forwardRef, memo } from 'react';
import { Heading, type HeadingLevel, type HeadingProps } from '@/components/basic/typography/Heading';

export interface AccordionTitleProps extends Omit<HeadingProps, 'as' | 'level'> {
  /** Heading level for semantic HTML. @default 'h6' */
  level?: HeadingLevel;
}

/**
 * AccordionTitle - Optional semantic heading component for accordion content.
 * Uses the Heading component to provide consistent typography and semantic HTML.
 * 
 * @example
 * ```tsx
 * <Accordion.Content>
 *   <Accordion.Title level="h5">Section Title</Accordion.Title>
 *   <p>Content goes here...</p>
 * </Accordion.Content>
 * ```
 */
export const AccordionTitle = memo(
  forwardRef<HTMLHeadingElement, AccordionTitleProps>(
    ({ level = 'h6', ...props }, ref) => {
      return <Heading ref={ref} as={level} level={level} {...props} />;
    }
  )
);

AccordionTitle.displayName = 'Accordion.Title';
