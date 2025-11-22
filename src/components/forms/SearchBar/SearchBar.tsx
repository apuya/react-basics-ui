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
  SHORTCUT_BADGE_CLASSES,
  SIZE_STYLES,
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

// Map SearchBar sizes to Icon sizes
const ICON_SIZE_MAP: Record<SearchBarSize, 'sm' | 'md' | 'lg'> = {
  small: 'sm',
  default: 'md',
  large: 'md',
};

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

    const inputStyle = useMemo(() => {
      const baseLeftPadding = 'calc(var(--component-searchbar-padding-inline) * 2 + var(--component-searchbar-icon-size-default))';
      
      let rightPadding = 'var(--component-searchbar-padding-inline)';
      
      // Calculate right padding based on visible elements
      if (showSearchButton) {
        rightPadding = size === 'small' 
          ? 'calc(var(--component-searchbar-padding-inline) + 60px)'
          : size === 'large'
          ? 'calc(var(--component-searchbar-padding-inline) + 80px)'
          : 'calc(var(--component-searchbar-padding-inline) + 70px)';
      } else {
        const elementCount = [
          isLoading,
          showClearButton && hasValue,
          showShortcut && !hasValue && !isLoading
        ].filter(Boolean).length;
        
        if (elementCount > 0) {
          const spacing = 'var(--component-searchbar-padding-inline)';
          const iconSize = size === 'small' ? '20px' : size === 'large' ? '28px' : '24px';
          rightPadding = `calc(${spacing} + (${iconSize} + ${spacing}) * ${elementCount})`;
        }
      }

      return {
        height: `var(--component-searchbar-height-${size})`,
        paddingLeft: baseLeftPadding,
        paddingRight: rightPadding,
      };
    }, [size, isLoading, showClearButton, showSearchButton, showShortcut, hasValue]);

    const iconSize = useMemo(() => ICON_SIZE_MAP[size], [size]);
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
          <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{
              left: 'var(--component-searchbar-padding-inline)',
              color: 'var(--component-searchbar-text-placeholder)',
            }}
          >
            {leadingIcon || <Icon icon={BiSearch} size={iconSize} color="inherit" />}
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
          <div
            className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2"
            style={{ right: 'var(--component-searchbar-padding-inline)' }}
          >
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
                <Icon icon={BiX} size={iconSize} color="inherit" />
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
