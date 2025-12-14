import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import type { IconType } from 'react-icons';
import { Icon } from '@/components/utility/Icon';
import { cn } from '@/lib/cn';
import { useConfirmDialogContext, VARIANT_CONFIG } from './ConfirmDialog';
import { ICON_CLASSES, VARIANT_ICON_CLASSES } from './ConfirmDialog.styles';

export interface ConfirmDialogIconProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children'> {
  /** Custom icon component to override variant default */
  icon?: IconType;
}

export const ConfirmDialogIcon = forwardRef<HTMLSpanElement, ConfirmDialogIconProps>(
  ({ icon, className, ...props }, ref) => {
    const { variant } = useConfirmDialogContext();
    const VariantIcon = icon ?? VARIANT_CONFIG[variant].icon;

    return (
      <span ref={ref} {...props}>
        <Icon
          icon={VariantIcon}
          size="lg"
          aria-hidden
          className={cn(ICON_CLASSES, VARIANT_ICON_CLASSES[variant], className)}
        />
      </span>
    );
  }
);

ConfirmDialogIcon.displayName = 'ConfirmDialog.Icon';
