import type { SpinnerSize, SpinnerColor } from './Spinner';

export const BASE_CLASSES =
  'inline-block rounded-full animate-spin';

export const SIZE_STYLES: Record<SpinnerSize, string> = {
  xs: 'size-3',
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
  xl: 'size-12',
};

export const BORDER_WIDTH_STYLES: Record<SpinnerSize, string> = {
  xs: 'border',
  sm: 'border-2',
  md: 'border-2',
  lg: 'border-[3px]',
  xl: 'border-4',
};

export const COLOR_STYLES: Record<SpinnerColor, string> = {
  default: 'border-gray-200 border-t-blue-600',
  inverse: 'border-white/30 border-t-white',
  inherit: 'border-current/30 border-t-current',
};
