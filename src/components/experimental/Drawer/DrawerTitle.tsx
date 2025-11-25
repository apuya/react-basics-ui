import { createTitleSubComponent } from '@/lib/createSubComponent';
import { TITLE_CLASSES } from './Drawer.styles';
import type { ComponentPropsWithoutRef } from 'react';

export interface DrawerTitleProps extends ComponentPropsWithoutRef<'h2'> {}

export const DrawerTitle = createTitleSubComponent('Drawer.Title', {
  baseClasses: TITLE_CLASSES,
});
