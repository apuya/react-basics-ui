import { createSubComponent } from '@/lib/createSubComponent';
import { FOOTER_CLASSES } from './Drawer.styles';
import type { ComponentPropsWithoutRef } from 'react';

export interface DrawerFooterProps extends ComponentPropsWithoutRef<'div'> {}

export const DrawerFooter = createSubComponent('Drawer.Footer', {
  baseClasses: FOOTER_CLASSES,
  paddingInlineVar: '--component-modal-footer-padding-inline',
  paddingBlockVar: '--component-modal-footer-padding-block',
  gapVar: '--component-modal-gap',
});
