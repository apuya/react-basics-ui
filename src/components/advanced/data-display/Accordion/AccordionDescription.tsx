import { forwardRef, memo, useRef } from 'react';
import { Text, type TextProps, type TextSize, type TextColor } from '@/components/basic/typography/Text';
import { useMergedRefs } from '@/hooks/useMergedRefs';

export interface AccordionDescriptionProps extends Omit<TextProps, 'as'> {
  /** Text size variant. @default 'small' */
  size?: TextSize;
  /** Text color variant. @default 'secondary' */
  color?: TextColor;
}

/**
 * AccordionDescription - Optional semantic description component for accordion content.
 * Uses the Text component to provide consistent typography with sensible defaults.
 * 
 * @example
 * ```tsx
 * <Accordion.Content>
 *   <Accordion.Title>Main Title</Accordion.Title>
 *   <Accordion.Description>
 *     Supporting description text that provides additional context.
 *   </Accordion.Description>
 * </Accordion.Content>
 * ```
 */
export const AccordionDescription = memo(
  forwardRef<HTMLElement, AccordionDescriptionProps>(
    ({ size = 'small', color = 'secondary', ...props }, forwardedRef) => {
      const descRef = useRef<HTMLElement>(null!);
      const mergedRef = useMergedRefs(forwardedRef, descRef);
      return <Text ref={mergedRef} as="p" size={size} color={color} {...props} />;
    }
  )
);

AccordionDescription.displayName = 'Accordion.Description';
