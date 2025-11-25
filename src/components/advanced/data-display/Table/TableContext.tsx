import { createContext, useContext } from 'react';

export type TableSize = 'sm' | 'md' | 'lg';
export type TableVariant = 'default' | 'striped' | 'bordered';

export interface TableContextValue {
  size: TableSize;
  variant: TableVariant;
}

export const TableContext = createContext<TableContextValue | undefined>(undefined);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('Table sub-components must be used within a Table component');
  }
  return context;
};
