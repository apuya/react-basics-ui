import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/typography/Text';
import { cn } from '@/lib/cn';
import { DESCRIPTION_WITH_ICON_CLASSES } from './ConfirmDialog.styles';

export interface ConfirmDialogContentProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

export const ConfirmDialogContent = forwardRef<HTMLDivElement, ConfirmDialogContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box ref={ref} className={cn(DESCRIPTION_WITH_ICON_CLASSES, className)} {...props}>
        {typeof children === 'string' ? (
          <Text as="p" size="body" color="secondary">
            {children}
          </Text>
        ) : (
          children
        )}
      </Box>
    );
  }
);

ConfirmDialogContent.displayName = 'ConfirmDialog.Content';
