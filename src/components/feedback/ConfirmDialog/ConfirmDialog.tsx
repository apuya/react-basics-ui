import React from 'react';

export interface ConfirmDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether dialog is open */
  open?: boolean;
  /** Dialog title */
  title?: string;
  /** Dialog description */
  description?: string;
  /** Confirm button text */
  confirmText?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Callback when confirmed */
  onConfirm?: () => void;
  /** Callback when cancelled */
  onCancel?: () => void;
  /** Whether action is destructive */
  destructive?: boolean;
  children?: React.ReactNode;
}

export const ConfirmDialog = React.forwardRef<HTMLDivElement, ConfirmDialogProps>(
  (
    {
      open,
      title,
      description,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      onConfirm,
      onCancel,
      destructive,
      className,
      children,
      ...props
    },
    ref
  ) => {
    if (!open) return null;

    return (
      <div ref={ref} role="alertdialog" className={className} {...props}>
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
        {children}
        <div>
          <button type="button" onClick={onCancel}>
            {cancelText}
          </button>
          <button type="button" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    );
  }
);

ConfirmDialog.displayName = 'ConfirmDialog';
