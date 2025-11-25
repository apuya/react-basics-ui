import { createTitleSubComponent } from '@/lib/createSubComponent';
import { TITLE_CLASSES } from './Modal.styles';
import type { ComponentPropsWithoutRef } from 'react';

export interface ModalTitleProps extends ComponentPropsWithoutRef<'h2'> {}

export const ModalTitle = createTitleSubComponent('Modal.Title', {
  baseClasses: TITLE_CLASSES,
});
