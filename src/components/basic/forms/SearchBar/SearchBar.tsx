import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  useMemo,
  useCallback,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import {
  BASE_CLASSES,
  ERROR_CLASSES,
  ICON_SIZE_STYLES,
  ICON_WRAPPER_BASE_CLASSES,
  LEADING_ICON_STYLE,
  SIZE_STYLES,
  TRAILING_ICON_STYLE,
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

    const inputClasses = useMemo(
      () => cn(
        BASE_CLASSES,
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        error && ERROR_CLASSES,
        className
      ),
      [size, variant, error, className]
    );

    const inputStyle = useMemo(
      () => {
        const hasTrailing = trailingIcon;
        return {
          height: `var(--component-searchbar-height-${size})`,
          paddingLeft: leadingIcon
            ? `calc(var(--component-searchbar-padding-inline) * 2 + var(--component-searchbar-icon-size-${size}))`
            : 'var(--component-searchbar-padding-inline)',
          paddingRight: hasTrailing
            ? `calc(var(--component-searchbar-padding-inline) * 2 + var(--component-searchbar-icon-size-${size}))`
            : 'var(--component-searchbar-padding-inline)',
        };
      },
      [size, leadingIcon, trailingIcon]
    );

    const iconWrapperClasses = cn(ICON_WRAPPER_BASE_CLASSES, ICON_SIZE_STYLES[size]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearch && value) {
          e.preventDefault();
          onSearch(value as string);
        }
        onKeyDown?.(e);
      },
      [onSearch, onKeyDown, value]
    );

    return (
      <div
        className={cn('relative w-full', wrapperClassName)}
        data-size={size}
        data-variant={variant}
        data-error={error || undefined}
        data-disabled={disabled || undefined}
      >
        {leadingIcon && (
          <span
            className={iconWrapperClasses}
            style={LEADING_ICON_STYLE}
            aria-hidden="true"
          >
            {leadingIcon}
          </span>
        )}

        <input
          ref={ref}
          type="search"
          disabled={disabled}
          className={inputClasses}
          style={inputStyle}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          role="searchbox"
          aria-label="Search"
          aria-invalid={error || undefined}
          {...rest}
        />

        {trailingIcon && (
          <span
            className={iconWrapperClasses}
            style={TRAILING_ICON_STYLE}
            aria-hidden="true"
          >
            {trailingIcon}
          </span>
        )}
      </div>
    );
  })
);

SearchBar.displayName = 'SearchBar';
