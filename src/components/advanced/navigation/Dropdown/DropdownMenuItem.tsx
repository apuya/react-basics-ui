import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/basic/forms/Button';
import { SearchBar } from '@/components/basic/forms/SearchBar';
import { Text } from '@/components/basic/typography/Text';
import { 
  DESCRIPTION_TEXT_STYLE,
  DIVIDER_CLASSES, 
  HEADER_TEXT_STYLE,
  MENU_ITEM_GAP_STYLE, 
  MENU_ITEM_PADDING_STYLE, 
  SEARCH_CONTAINER_PADDING_STYLE,
} from './Dropdown.styles';

/**
 * Variant types for structural menu elements.
 */
export type DropdownMenuItemVariant = 'divider' | 'header' | 'search' | 'footer';

/**
 * Props for the DropdownMenuItem component.
 */
export interface DropdownMenuItemProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /** The type of menu item to render */
  variant?: DropdownMenuItemVariant;
  /** Label text for header/footer variants */
  label?: string;
  /** Description text for header variant */
  description?: string;
  /** Callback when search value changes (search variant) */
  onSearch?: (value: string) => void;
  /** Callback when footer action button is clicked (footer variant) */
  onFooterAction?: () => void;
  /** Label for the footer action button */
  footerActionLabel?: string;
  /** Placeholder text for search input */
  searchPlaceholder?: string;
}

/**
 * Structural menu elements for organizing dropdown content.
 * 
 * Provides four variants:
 * - `divider`: Visual separator between menu sections
 * - `header`: Section header with optional description
 * - `search`: Embedded search input for filtering
 * - `footer`: Footer with label and action button
 * 
 * @example
 * ```tsx
 * // Header
 * <Dropdown.MenuItem variant="header" label="Actions" description="Common tasks" />
 * 
 * // Divider
 * <Dropdown.MenuItem variant="divider" />
 * 
 * // Search
 * <Dropdown.MenuItem variant="search" onSearch={handleSearch} />
 * 
 * // Footer
 * <Dropdown.MenuItem 
 *   variant="footer" 
 *   label="3 items" 
 *   footerActionLabel="Clear"
 *   onFooterAction={handleClear}
 * />
 * ```
 */

export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  (
      {
        variant = 'divider',
        label,
        description,
        onSearch,
        onFooterAction,
        footerActionLabel = 'Action',
        searchPlaceholder = 'Search...',
        className,
        ...props
      },
      ref
    ) => {
      // Divider variant
      if (variant === 'divider') {
        return (
          <div
            ref={ref}
            role="separator"
            className={cn(DIVIDER_CLASSES, className)}
            style={MENU_ITEM_GAP_STYLE}
            {...props}
          />
        );
      }

      // Header variant
      if (variant === 'header') {
        return (
          <div
            ref={ref}
            className={cn('flex flex-col', className)}
            style={{ ...MENU_ITEM_PADDING_STYLE, gap: 'var(--component-dropdown-item-gap)' }}
            {...props}
          >
            {label && (
              <div
                className="overflow-hidden text-ellipsis whitespace-nowrap"
                style={HEADER_TEXT_STYLE}
              >
                {label}
              </div>
            )}
            {description && (
              <div
                className="overflow-hidden text-ellipsis whitespace-nowrap"
                style={DESCRIPTION_TEXT_STYLE}
              >
                {description}
              </div>
            )}
          </div>
        );
      }

      // Search variant
      if (variant === 'search') {
        return (
          <div
            ref={ref}
            className={className}
            style={SEARCH_CONTAINER_PADDING_STYLE}
            {...props}
          >
            <SearchBar
              size="small"
              placeholder={searchPlaceholder}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch?.(e.target.value)}
              showShortcut={false}
              className="w-full"
            />
          </div>
        );
      }

      // Footer variant
      if (variant === 'footer') {
        return (
          <div
            ref={ref}
            className={cn('flex items-center justify-between', className)}
            style={MENU_ITEM_PADDING_STYLE}
            {...props}
          >
            <Text size="small" color="secondary">
              {label}
            </Text>
            <Button
              size="small"
              variant="tabs"
              onClick={onFooterAction}
            >
              {footerActionLabel}
            </Button>
          </div>
        );
      }

      return null;
    }
);

DropdownMenuItem.displayName = 'Dropdown.MenuItem';
