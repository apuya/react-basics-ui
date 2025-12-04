import { forwardRef, memo, useRef } from 'react';
import { Heading, type HeadingLevel, type HeadingProps } from '@/components/basic/typography/Heading';
import { useMergedRefs } from '@/hooks/useMergedRefs';

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
    ({ level = 'h6', ...props }, forwardedRef) => {
      const titleRef = useRef<HTMLHeadingElement>(null!);
      const mergedRef = useMergedRefs(forwardedRef, titleRef);
      return <Heading ref={mergedRef} as={level} level={level} {...props} />;
    }
  )
);

AccordionTitle.displayName = 'Accordion.Title';
