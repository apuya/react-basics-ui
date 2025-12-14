import { createTitleSubComponent } from '@/lib/createSubComponent';
import { TITLE_CLASSES } from './Modal.styles';

export const ModalTitle = createTitleSubComponent('Modal.Title', {
  baseClasses: TITLE_CLASSES,
});
