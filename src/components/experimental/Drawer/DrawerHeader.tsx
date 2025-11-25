import { createSubComponent } from '@/lib/createSubComponent';
import { HEADER_CLASSES } from './Drawer.styles';
import type { ComponentPropsWithoutRef } from 'react';

export interface DrawerHeaderProps extends ComponentPropsWithoutRef<'div'> {}

export const DrawerHeader = createSubComponent('Drawer.Header', {
  baseClasses: HEADER_CLASSES,
  paddingInlineVar: '--component-modal-header-padding-inline',
  paddingBlockVar: '--component-modal-header-padding-block',
  gapVar: '--component-modal-gap',
});
