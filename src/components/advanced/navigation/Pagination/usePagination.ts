import { useMemo } from 'react';

export interface UsePaginationOptions {
  /** Total number of pages */
  totalPages: number;
  /** Current active page */
  currentPage: number;
  /** Number of siblings to show on each side of current page (default: 1) */
  siblingCount?: number;
  /** Whether to always show first and last page buttons (default: false) */
  showFirstLast?: boolean;
}

export type PaginationPageItem = {
  type: 'page';
  page: number;
  isActive: boolean;
};

export type PaginationEllipsisItem = {
  type: 'ellipsis';
  key: string;
};

export type PaginationItem = PaginationPageItem | PaginationEllipsisItem;

/**
 * Generates an array of pagination items including page numbers and ellipsis indicators.
 * 
 * @example
 * ```tsx
 * const { pages, canGoPrevious, canGoNext } = usePagination({
 *   totalPages: 20,
 *   currentPage: 10,
 *   siblingCount: 1,
 *   showFirstLast: true,
 * });
 * // pages: [
 * //   { type: 'page', page: 1, isActive: false },
 * //   { type: 'ellipsis', key: 'ellipsis-start' },
 * //   { type: 'page', page: 9, isActive: false },
 * //   { type: 'page', page: 10, isActive: true },
 * //   { type: 'page', page: 11, isActive: false },
 * //   { type: 'ellipsis', key: 'ellipsis-end' },
 * //   { type: 'page', page: 20, isActive: false },
 * // ]
 * ```
 */
export function usePagination({
  totalPages,
  currentPage,
  siblingCount = 1,
  showFirstLast = false,
}: UsePaginationOptions) {
  const pages = useMemo<PaginationItem[]>(() => {
    const validTotalPages = Math.max(1, totalPages);
    const validCurrentPage = Math.max(1, Math.min(currentPage, validTotalPages));
    
    // Calculate range of visible pages around current
    const leftSiblingIndex = Math.max(1, validCurrentPage - siblingCount);
    const rightSiblingIndex = Math.min(validTotalPages, validCurrentPage + siblingCount);

    // Determine if ellipsis should be shown
    const shouldShowLeftEllipsis = showFirstLast && leftSiblingIndex > 2;
    const shouldShowRightEllipsis = showFirstLast && rightSiblingIndex < validTotalPages - 1;

    const items: PaginationItem[] = [];

    // Add first page if showFirstLast is enabled
    if (showFirstLast && leftSiblingIndex > 1) {
      items.push({ type: 'page', page: 1, isActive: validCurrentPage === 1 });
    }

    // Add left ellipsis
    if (shouldShowLeftEllipsis) {
      items.push({ type: 'ellipsis', key: 'ellipsis-start' });
    }

    // Add sibling pages and current page
    for (let page = leftSiblingIndex; page <= rightSiblingIndex; page++) {
      // Skip first page if already added
      if (showFirstLast && page === 1 && leftSiblingIndex > 1) continue;
      // Skip last page if will be added later
      if (showFirstLast && page === validTotalPages && rightSiblingIndex < validTotalPages) continue;
      
      items.push({
        type: 'page',
        page,
        isActive: page === validCurrentPage,
      });
    }

    // Add right ellipsis
    if (shouldShowRightEllipsis) {
      items.push({ type: 'ellipsis', key: 'ellipsis-end' });
    }

    // Add last page if showFirstLast is enabled
    if (showFirstLast && rightSiblingIndex < validTotalPages) {
      items.push({ type: 'page', page: validTotalPages, isActive: validCurrentPage === validTotalPages });
    }

    return items;
  }, [totalPages, currentPage, siblingCount, showFirstLast]);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return {
    /** Array of page items and ellipsis indicators */
    pages,
    /** Whether previous navigation is available */
    canGoPrevious,
    /** Whether next navigation is available */
    canGoNext,
    /** Current page number (validated) */
    currentPage: Math.max(1, Math.min(currentPage, Math.max(1, totalPages))),
    /** Total pages (validated) */
    totalPages: Math.max(1, totalPages),
  };
}
