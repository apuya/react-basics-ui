import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
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

interface PaginationContextValue {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  siblingCount: number;
  showFirstLast: boolean;
  size: PaginationSize;
}

const PaginationContext = createContext<PaginationContextValue | undefined>(undefined);

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('Pagination sub-components must be used within a Pagination component');
  }
  return context;
};

const PaginationRoot = ({
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
}: PaginationProps) => {
  const [internalPage, setInternalPage] = useState(defaultPage);
  const isControlled = page !== undefined;
  const currentPage = isControlled ? page : internalPage;

  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage < 1 || newPage > totalPages) return;
      if (!isControlled) {
        setInternalPage(newPage);
      }
      onChange?.(newPage);
    },
    [totalPages, isControlled, onChange]
  );

  const contextValue = useMemo(
    () => ({
      currentPage,
      totalPages,
      goToPage,
      siblingCount,
      showFirstLast,
      size,
    }),
    [currentPage, totalPages, goToPage, siblingCount, showFirstLast, size]
  );

  const paginationClasses = useMemo(
    () => cn('flex items-center justify-center', className),
    [className]
  );

  return (
    <PaginationContext.Provider value={contextValue}>
      <nav role="navigation" aria-label="Pagination" className={paginationClasses} {...props}>
        {children}
      </nav>
    </PaginationContext.Provider>
  );
};

export const Pagination = Object.assign(PaginationRoot, {
  List: PaginationList,
  Item: PaginationItem,
  Ellipsis: PaginationEllipsis,
  Previous: PaginationPrevious,
  Next: PaginationNext,
});
