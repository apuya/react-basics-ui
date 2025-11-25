import { createSubComponent } from '@/lib/createSubComponent';
import { CONTENT_CLASSES } from './Modal.styles';
import type { ComponentPropsWithoutRef } from 'react';

export interface ModalContentProps extends ComponentPropsWithoutRef<'div'> {}

export const ModalContent = createSubComponent('Modal.Content', {
  baseClasses: CONTENT_CLASSES,
  paddingInlineVar: '--component-modal-content-padding-inline',
  paddingBlockVar: '--component-modal-content-padding-block',
  gapVar: '--component-modal-gap',
});
