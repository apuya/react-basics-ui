import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Box } from '@/components/layout/Box';
import { Heading } from '@/components/typography/Heading';
import { cn } from '@/lib/cn';
import { TITLE_WRAPPER_CLASSES } from './ConfirmDialog.styles';

export interface ConfirmDialogTitleProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  children: ReactNode;
}

export const ConfirmDialogTitle = forwardRef<HTMLDivElement, ConfirmDialogTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box ref={ref} className={cn(TITLE_WRAPPER_CLASSES, className)} {...props}>
        <Heading as="h2" level="h4">
          {children}
        </Heading>
      </Box>
    );
  }
);

ConfirmDialogTitle.displayName = 'ConfirmDialog.Title';
