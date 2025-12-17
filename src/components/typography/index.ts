// Base primitive - export component and types with "Base" prefix to avoid conflicts
export { 
  BaseText, 
  type BaseTextProps,
  type TextVariant as BaseTextVariant,
  type TextSize as BaseTextSize,
  type TextWeight as BaseTextWeight,
  type TextColor as BaseTextColor,
  type TextLineHeight as BaseTextLineHeight,
  type TextAlign as BaseTextAlign,
  type TextFontFamily as BaseTextFontFamily,
} from './BaseText';

// Public components
export * from './Heading';
export * from './Label';
export * from './Text';
export * from './TextList';
