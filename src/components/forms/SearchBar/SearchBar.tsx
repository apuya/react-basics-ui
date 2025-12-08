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
import { BiSearch, BiX } from 'react-icons/bi';
import { Icon } from '@/components/utility/Icon';
import { Button } from '@/components/forms/Button';
import { Spinner } from '@/components/feedback/Spinner';
import {
  BASE_CLASSES,
  CLEAR_BUTTON_BASE_CLASSES,
  CLEAR_BUTTON_SIZE_STYLES,
  ERROR_CLASSES,
  ICON_SIZE_STYLES,
  LEADING_ICON_CONTAINER_CLASSES,
  SHORTCUT_BADGE_CLASSES,
  SIZE_STYLES,
  TRAILING_CONTAINER_CLASSES,
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
  /** Whether the search is in loading state */
  isLoading?: boolean;
  /** Whether to show the clear button when input has value */
  showClearButton?: boolean;
  /** Whether to show a search button */
  showSearchButton?: boolean;
  /** Whether to show keyboard shortcut badge */
  showShortcut?: boolean;
  /** Text to display in shortcut badge */
  shortcutText?: string;
  /** Custom leading icon (defaults to search icon) */
  leadingIcon?: ReactNode;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Callback when search is triggered (Enter or button click) */
  onSearch?: (value: string) => void;
  /** Additional className for the wrapper element */
  wrapperClassName?: string;
}

// Map SearchBar sizes to Spinner sizes
const SPINNER_SIZE_MAP: Record<SearchBarSize, 'xs' | 'sm' | 'md'> = {
  small: 'xs',
  default: 'sm',
  large: 'sm',
};

// Map SearchBar sizes to Button sizes
const BUTTON_SIZE_MAP: Record<SearchBarSize, 'small' | 'default' | 'large'> = {
  small: 'small',
  default: 'default',
  large: 'default',
};

export const SearchBar = memo(
  forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
    {
      size = 'default',
      variant = 'outline',
      error = false,
      isLoading = false,
      showClearButton = true,
      showSearchButton = false,
      showShortcut = false,
      shortcutText = '⌘K',
      leadingIcon,
      onClear,
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
    const hasValue = value !== undefined && value !== '';

    const inputClasses = useMemo(
      () =>
        cn(
          BASE_CLASSES,
          VARIANT_STYLES[variant],
          SIZE_STYLES[size],
          error && ERROR_CLASSES,
          className
        ),
      [size, variant, error, className]
    );

    const inputStyle = useMemo(() => {
      const iconSizeVar = `var(--component-searchbar-icon-size-${size})`;
      const baseLeftPadding = `calc(var(--component-searchbar-padding-inline) * 2 + ${iconSizeVar})`;
      
      let rightPadding = 'var(--component-searchbar-padding-inline)';
      
      // Calculate right padding based on visible trailing elements (not including search button which is outside)
      const elementCount = [
        isLoading,
        showClearButton && hasValue,
        showShortcut && !hasValue && !isLoading
      ].filter(Boolean).length;
      
      if (elementCount > 0) {
        const spacing = 'var(--component-searchbar-padding-inline)';
        rightPadding = `calc(${spacing} + (${iconSizeVar} + ${spacing}) * ${elementCount})`;
      }

      return {
        height: `var(--component-searchbar-height-${size})`,
        paddingLeft: baseLeftPadding,
        paddingRight: rightPadding,
      };
    }, [size, isLoading, showClearButton, showShortcut, hasValue]);

    // Simple lookups - no memoization needed
    const iconClasses = ICON_SIZE_STYLES[size];
    const spinnerSize = SPINNER_SIZE_MAP[size];
    const buttonSize = BUTTON_SIZE_MAP[size];

    const handleClear = useCallback(() => {
      onClear?.();
      if (onChange) {
        // Create a synthetic event for onChange
        const syntheticEvent = {
          target: { value: '' },
          currentTarget: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    }, [onClear, onChange]);

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

    const handleSearchClick = useCallback(() => {
      if (onSearch && value) {
        onSearch(value as string);
      }
    }, [onSearch, value]);

    return (
      <div className={cn('w-full', showSearchButton && 'flex gap-2', wrapperClassName)}>
        <div className="relative flex-1">
          {/* Leading Icon (Search Icon) */}
          <div className={LEADING_ICON_CONTAINER_CLASSES}>
            <div className={iconClasses}>
              {leadingIcon || <Icon icon={BiSearch} className="w-full h-full" color="inherit" />}
            </div>
          </div>

          {/* Input Field */}
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
            data-size={size}
            data-variant={variant}
            data-loading={isLoading || undefined}
            data-error={error || undefined}
            {...rest}
          />

          {/* Trailing Elements Container */}
          <div className={TRAILING_CONTAINER_CLASSES}>
            {/* Loading Spinner */}
            {isLoading && <Spinner size={spinnerSize} color="default" />}

            {/* Clear Button */}
            {!isLoading && showClearButton && hasValue && (
              <button
                type="button"
                onClick={handleClear}
                className={cn(CLEAR_BUTTON_BASE_CLASSES, CLEAR_BUTTON_SIZE_STYLES[size])}
                aria-label="Clear search"
                tabIndex={-1}
              >
                <div className={iconClasses}>
                  <Icon icon={BiX} className="w-full h-full" color="inherit" />
                </div>
              </button>
            )}

            {/* Shortcut Badge */}
            {!isLoading && showShortcut && !hasValue && (
              <span className={SHORTCUT_BADGE_CLASSES} aria-hidden="true">
                {shortcutText}
              </span>
            )}
          </div>
        </div>

        {/* Search Button - Outside the input container */}
        {showSearchButton && (
          <Button
            type="button"
            onClick={handleSearchClick}
            disabled={disabled || !hasValue}
            size={buttonSize}
            variant="primary"
            aria-label="Search"
          >
            Search
          </Button>
        )}
      </div>
    );
  })
);

SearchBar.displayName = 'SearchBar';
