import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import { BaseInputField } from '../BaseInputField';
import {
  ERROR_CLASSES,
  VARIANT_STYLES,
} from './SearchBar.styles';

export type SearchBarSize = 'small' | 'default' | 'large';
export type SearchBarVariant = 'outline' | 'filled' | 'ghost';

export interface SearchBarProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
  /** Size variant of the search bar */
  size?: SearchBarSize;
  /** Visual style variant */
  variant?: SearchBarVariant;
  /** Whether the search bar has an error */
  error?: boolean;
  /** Icon displayed at the start of the search bar */
  leadingIcon?: ReactNode;
  /** Icon or element displayed at the end of the search bar */
  trailingIcon?: ReactNode;
  /** Callback when search is triggered (Enter key) */
  onSearch?: (value: string) => void;
  /** Additional className for the wrapper element */
  wrapperClassName?: string;
}

export const SearchBar = memo(
  forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
    {
      size = 'default',
      variant = 'outline',
      error = false,
      leadingIcon,
      trailingIcon,
      onSearch,
      className,
      wrapperClassName,
      value,
      onChange,
      onKeyDown,
      disabled,
      placeholder = 'Search...',
      ...rest
    },
    ref
  ) {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSearch && value) {
        e.preventDefault();
        onSearch(String(value));
      }
      onKeyDown?.(e);
    };

    return (
      <BaseInputField
        ref={ref}
        type="search"
        size={size}
        variant="searchbar"
        error={error}
        disabled={disabled}
        leadingIcon={leadingIcon}
        trailingIcon={trailingIcon}
        className={cn(VARIANT_STYLES[variant], error && ERROR_CLASSES, className)}
        wrapperClassName={wrapperClassName}
        cssPrefix="searchbar"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        role="searchbox"
        aria-label="Search"
        {...rest}
      />
    );
  })
);

SearchBar.displayName = 'SearchBar';
