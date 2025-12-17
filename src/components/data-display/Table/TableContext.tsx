/**
 * @file TableContext.tsx
 * @description Context provider for sharing Table state with sub-components.
 *
 * Provides size and variant values to all nested table components,
 * enabling consistent styling and behavior across the table.
 */

import { createComponentContext } from '@/lib/createComponentContext';

export type TableSize = 'sm' | 'md' | 'lg';
export type TableVariant = 'default' | 'striped' | 'bordered';

export interface TableContextValue {
  size: TableSize;
  variant: TableVariant;
}

const { Context, useContext: useTableContextInternal } = createComponentContext<TableContextValue>('Table');

export const TableContext = Context;
export const useTableContext = useTableContextInternal;
