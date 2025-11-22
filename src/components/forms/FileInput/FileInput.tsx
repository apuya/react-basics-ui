import React from 'react';

export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Accepted file types */
  accept?: string;
  /** Allow multiple files */
  multiple?: boolean;
  /** Callback when files are selected */
  onFilesChange?: (files: FileList | null) => void;
}

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, onFilesChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilesChange?.(e.target.files);
      onChange?.(e);
    };

    return (
      <input
        type="file"
        ref={ref}
        className={className}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

FileInput.displayName = 'FileInput';
