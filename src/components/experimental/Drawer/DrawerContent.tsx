import { createSubComponent } from '@/lib/createSubComponent';
import { CONTENT_CLASSES } from './Drawer.styles';
import type { ComponentPropsWithoutRef } from 'react';

export interface DrawerContentProps extends ComponentPropsWithoutRef<'div'> {}

export const DrawerContent = createSubComponent('Drawer.Content', {
  baseClasses: CONTENT_CLASSES,
  paddingInlineVar: '--component-modal-content-padding-inline',
  paddingBlockVar: '--component-modal-content-padding-block',
  gapVar: '--component-modal-gap',
});
