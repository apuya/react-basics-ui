/**
 * @file BaseCardContainer/index.ts
 * @description Public exports for BaseCardContainer component.
 */

export {
  BaseCardContainer,
  BaseCardHeader,
  BaseCardContent,
  BaseCardFooter,
  BaseCardTitle,
  BaseCardDescription,
} from './BaseCardContainer';

export type {
  BaseCardContainerProps,
  BaseCardHeaderProps,
  BaseCardContentProps,
  BaseCardFooterProps,
  BaseCardTitleProps,
  BaseCardDescriptionProps,
  BaseCardVariant,
  BaseCardColorVariant,
} from './BaseCardContainer.types';

export {
  DEFAULT_BASE_CLASSES,
  DEFAULT_HEADER_CLASSES,
  DEFAULT_CONTENT_CLASSES,
  DEFAULT_FOOTER_CLASSES,
  DEFAULT_TITLE_CLASSES,
  DEFAULT_DESCRIPTION_CLASSES,
  DEFAULT_VARIANT_CLASSES,
  DEFAULT_COLOR_CLASSES,
  DEFAULT_INTERACTIVE_CLASSES,
} from './BaseCardContainer.styles';
