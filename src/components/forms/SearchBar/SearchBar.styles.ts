/**
 * SearchBar-specific variant styles
 * Base input styles are handled by BaseInputField
 */

export const VARIANT_STYLES = {
  outline:
    'bg-[color:var(--component-searchbar-bg-default)] text-[color:var(--component-searchbar-text-default)] border-[color:var(--component-searchbar-border-default)] hover:border-[color:var(--component-searchbar-border-hover)] focus:border-[color:var(--component-searchbar-border-focus)]',
  filled:
    'bg-[color:var(--component-searchbar-filled-bg)] text-[color:var(--component-searchbar-text-default)] border-[color:var(--component-searchbar-filled-border)] hover:bg-[color:var(--component-searchbar-filled-bg-hover)] focus:border-[color:var(--component-searchbar-filled-border-focus)]',
  ghost:
    'bg-[color:var(--component-searchbar-ghost-bg)] text-[color:var(--component-searchbar-text-default)] border-[color:var(--component-searchbar-ghost-border)] hover:bg-[color:var(--component-searchbar-ghost-bg-hover)] hover:border-[color:var(--component-searchbar-ghost-border-hover)] focus:border-[color:var(--component-searchbar-ghost-border-focus)]',
} as const;

export const ERROR_CLASSES = 'border-[color:var(--component-searchbar-border-error)]';
