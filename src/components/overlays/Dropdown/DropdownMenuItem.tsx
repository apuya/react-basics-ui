import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/actions/Button';
import { SearchBar } from '@/components/forms/SearchBar';
import { Text } from '@/components/typography/Text';
import { Menu } from '@/components/overlays/Menu';
import { 
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
      // Divider variant - delegate to Menu.Divider
      if (variant === 'divider') {
        return <Menu.Divider ref={ref as any} className={className} {...props} />;
      }

      // Header variant - delegate to Menu.Label with description
      if (variant === 'header') {
        return (
          <div
            ref={ref}
            className={cn('flex flex-col', className)}
            style={{ ...MENU_ITEM_PADDING_STYLE, gap: 'var(--component-dropdown-item-gap)' }}
            {...props}
          >
            {label && (
              <Menu.Label>{label}</Menu.Label>
            )}
            {description && (
              <Text
                size="small"
                color="secondary"
                className="overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {description}
              </Text>
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
