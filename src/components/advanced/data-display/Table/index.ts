/**
 * @file index.ts
 * @description Public API exports for the Table component family.
 *
 * Exports:
 * - Table: Compound component with HeaderContainer, Body, Row, HeaderCell, Cell, Footer, ActionBar
 * - Type definitions for all props interfaces
 */

export { Table } from './Table';
export type { TableProps, TableSize, TableVariant } from './Table';
export type { TableHeaderContainerProps } from './TableHeaderContainer';
export type { TableBodyProps } from './TableBody';
export type { TableRowContainerProps } from './TableRowContainer';
export type { TableHeaderCellProps, TableHeaderCellVariant, TableHeaderCellAlign, TableHeaderCellScope } from './TableHeaderCell';
export type { TableCellProps, TableCellVariant } from './TableCell';
export type { TableFooterProps, TableFooterVariant } from './TableFooter';
export type { TableActionBarProps, TableActionBarVariant, TableActionBarAlign, TableActionBarActionButton } from './TableActionBar';
