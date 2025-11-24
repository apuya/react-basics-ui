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
  ICON_SIZE_STYLES,
  LEADING_ICON_CONTAINER_CLASSES,
  SHORTCUT_BADGE_CLASSES,
  SIZE_STYLES,
  TRAILING_CONTAINER_CLASSES,
} from './SearchBar.styles';

export type SearchBarSize = 'small' | 'default' | 'large';

export interface SearchBarProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type'> {
  size?: SearchBarSize;
  isLoading?: boolean;
  showClearButton?: boolean;
  showSearchButton?: boolean;
  showShortcut?: boolean;
  shortcutText?: string;
  leadingIcon?: ReactNode;
  onClear?: () => void;
  onSearch?: (value: string) => void;
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
      () => cn(BASE_CLASSES, SIZE_STYLES[size], className),
      [size, className]
    );

    const iconClasses = useMemo(() => ICON_SIZE_STYLES[size], [size]);

    const inputStyle = useMemo(() => {
      const iconSizeVar = `var(--component-searchbar-icon-size-${size})`;
      const baseLeftPadding = `calc(var(--component-searchbar-padding-inline) * 2 + ${iconSizeVar})`;
      
      let rightPadding = 'var(--component-searchbar-padding-inline)';
      
      // Calculate right padding based on visible elements
      if (showSearchButton) {
        // Approximate button widths: small ~60px, default ~70px, large ~80px
        const buttonWidth = size === 'small' ? '60px' : size === 'large' ? '80px' : '70px';
        rightPadding = `calc(var(--component-searchbar-padding-inline) + ${buttonWidth})`;
      } else {
        const elementCount = [
          isLoading,
          showClearButton && hasValue,
          showShortcut && !hasValue && !isLoading
        ].filter(Boolean).length;
        
        if (elementCount > 0) {
          const spacing = 'var(--component-searchbar-padding-inline)';
          rightPadding = `calc(${spacing} + (${iconSizeVar} + ${spacing}) * ${elementCount})`;
        }
      }

      return {
        height: `var(--component-searchbar-height-${size})`,
        paddingLeft: baseLeftPadding,
        paddingRight: rightPadding,
      };
    }, [size, isLoading, showClearButton, showSearchButton, showShortcut, hasValue]);

    const spinnerSize = useMemo(() => SPINNER_SIZE_MAP[size], [size]);
    const buttonSize = useMemo(() => BUTTON_SIZE_MAP[size], [size]);

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
      <div className={cn('w-full', wrapperClassName)}>
        <div className="relative">
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

            {/* Search Button */}
            {showSearchButton && (
              <Button
                type="button"
                onClick={handleSearchClick}
                disabled={disabled || !hasValue}
                size={buttonSize}
                variant="secondary"
                aria-label="Search"
              >
                Search
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  })
);

SearchBar.displayName = 'SearchBar';
