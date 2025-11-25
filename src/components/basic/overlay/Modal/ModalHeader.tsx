import { createSubComponent } from '@/lib/createSubComponent';
import { HEADER_CLASSES } from './Modal.styles';
import type { ComponentPropsWithoutRef } from 'react';

export interface ModalHeaderProps extends ComponentPropsWithoutRef<'div'> {}

export const ModalHeader = createSubComponent('Modal.Header', {
  baseClasses: HEADER_CLASSES,
  paddingInlineVar: '--component-modal-header-padding-inline',
  paddingBlockVar: '--component-modal-header-padding-block',
  gapVar: '--component-modal-gap',
});
