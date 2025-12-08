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
