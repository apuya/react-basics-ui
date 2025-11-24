import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  forwardRef,
  type ComponentPropsWithoutRef,
} from 'react';
import { cn } from '@/lib/cn';
import { PaginationList } from './PaginationList';
import { PaginationItem } from './PaginationItem';
import { PaginationEllipsis } from './PaginationEllipsis';
import { PaginationPrevious } from './PaginationPrevious';
import { PaginationNext } from './PaginationNext';

export type PaginationSize = 'sm' | 'md' | 'lg';

export interface PaginationProps extends Omit<ComponentPropsWithoutRef<'nav'>, 'onChange'> {
  totalPages: number;
  page?: number;
  defaultPage?: number;
  onChange?: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  size?: PaginationSize;
}

export interface PaginationContextValue {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  siblingCount: number;
  showFirstLast: boolean;
  size: PaginationSize;
}

const PaginationContext = createContext<PaginationContextValue | undefined>(undefined);

export const usePaginationContext = (componentName?: string) => {
  const context = useContext(PaginationContext);
  if (!context) {
    const name = componentName ? `<Pagination.${componentName}>` : 'Pagination sub-components';
    throw new Error(`${name} must be used within a <Pagination> component`);
  }
  return context;
};

/**
 * Root pagination component supporting controlled and uncontrolled modes.
 *
 * @example
 * ```tsx
 * // Uncontrolled
 * <Pagination totalPages={10} onChange={handlePageChange}>
 *   <Pagination.Previous />
 *   <Pagination.List>
 *     <Pagination.Item page={1} />
 *     <Pagination.Ellipsis />
 *     <Pagination.Item page={10} />
 *   </Pagination.List>
 *   <Pagination.Next />
 * </Pagination>
 *
 * // Controlled
 * <Pagination totalPages={10} page={currentPage} onChange={setCurrentPage}>
 *   ...
 * </Pagination>
 * ```
 *
 * @param totalPages - Total number of pages (minimum 1)
 * @param page - Controlled current page value
 * @param defaultPage - Initial page for uncontrolled mode (default: 1)
 * @param onChange - Callback when page changes
 * @param size - Button size variant: 'sm' | 'md' | 'lg'
 *
 * Keyboard navigation: Arrow keys (Left/Right), Home, End
 */
const PaginationRoot = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      totalPages,
      page,
      defaultPage = 1,
      onChange,
      siblingCount = 1,
      showFirstLast = false,
      size = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
  const [internalPage, setInternalPage] = useState(defaultPage);
  const isControlled = page !== undefined;
  const currentPage = isControlled ? page : internalPage;

  const validTotalPages = Math.max(1, totalPages);

  // Clamp current page when totalPages changes (uncontrolled mode only)
  useEffect(() => {
    if (!isControlled && currentPage > validTotalPages) {
      setInternalPage(Math.max(1, validTotalPages));
    }
  }, [validTotalPages, currentPage, isControlled]);

  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage < 1 || newPage > validTotalPages) return;
      if (!isControlled) {
        setInternalPage(newPage);
      }
      onChange?.(newPage);
    },
    [validTotalPages, isControlled, onChange]
  );

  const contextValue = useMemo(
    () => ({
      currentPage,
      totalPages: validTotalPages,
      goToPage,
      siblingCount,
      showFirstLast,
      size,
    }),
    [currentPage, validTotalPages, goToPage, siblingCount, showFirstLast, size]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPage(currentPage - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToPage(currentPage + 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToPage(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToPage(validTotalPages);
      }
    },
    [currentPage, goToPage, validTotalPages]
  );

  const paginationClasses = cn('flex items-center justify-center', className);

  return (
    <PaginationContext.Provider value={contextValue}>
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={paginationClasses}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </nav>
    </PaginationContext.Provider>
  );
  }
);

PaginationRoot.displayName = 'Pagination';

export const Pagination = Object.assign(PaginationRoot, {
  List: PaginationList,
  Item: PaginationItem,
  Ellipsis: PaginationEllipsis,
  Previous: PaginationPrevious,
  Next: PaginationNext,
});
