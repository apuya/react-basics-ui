export { useClickOutside } from './useClickOutside';
export { useClickOutsideWithExclusions } from './useClickOutsideWithExclusions';
export { useEscapeKey } from './useEscapeKey';
export { useBodyScrollLock } from './useBodyScrollLock';
export { useFocusTrap } from './useFocusTrap';
export { useMergedRefs } from './useMergedRefs';
export { useMenuKeyboardNavigation } from './useMenuKeyboardNavigation';
export { useControlledState } from './useControlledState';
export { useDisclosureState } from './useDisclosureState';
export { useDisclosureKeyboardNav } from './useDisclosureKeyboardNav';
export { useResponsivePosition } from './useResponsivePosition';

// Re-export useTheme from theme component for convenience
export { useTheme } from '@/components/basic/theme';

export type { DisclosureMode, UseDisclosureStateOptions, UseDisclosureStateReturn } from './useDisclosureState';
export type { Orientation, UseDisclosureKeyboardNavOptions, UseDisclosureKeyboardNavReturn } from './useDisclosureKeyboardNav';
export type { ThemeContextValue, Theme, ResolvedTheme } from '@/components/basic/theme';
export type { ResponsivePositionOptions, ResponsivePositionResult } from './useResponsivePosition';
