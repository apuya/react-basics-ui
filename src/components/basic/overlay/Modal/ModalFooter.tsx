import { createSubComponent } from '@/lib/createSubComponent';
import { FOOTER_CLASSES } from './Modal.styles';
import type { ComponentPropsWithoutRef } from 'react';

export interface ModalFooterProps extends ComponentPropsWithoutRef<'div'> {}

export const ModalFooter = createSubComponent('Modal.Footer', {
  baseClasses: FOOTER_CLASSES,
  paddingInlineVar: '--component-modal-footer-padding-inline',
  paddingBlockVar: '--component-modal-footer-padding-block',
  gapVar: '--component-modal-gap',
});
