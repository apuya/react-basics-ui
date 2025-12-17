import { useCallback, useMemo, useRef, useState, type DragEvent } from 'react';
import { formatFileSize } from './FileItem';

// Static handlers with no dependencies - defined outside to avoid recreation
const handleDragLeave = (e: DragEvent<HTMLDivElement>, dragCounterRef: React.MutableRefObject<number>, setIsDragActive: React.Dispatch<React.SetStateAction<boolean>>) => {
  e.preventDefault();
  e.stopPropagation();
  dragCounterRef.current--;
  if (dragCounterRef.current === 0) {
    setIsDragActive(false);
  }
};

const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

export interface UseFileInputProps {
  /** Accept attribute value */
  accept?: string;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Callback when files are selected */
  onFilesChange?: (files: File[]) => void;
  /** Callback when validation fails */
  onError?: (error: string) => void;
  /** Original onChange handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UseFileInputReturn {
  files: File[];
  isDragActive: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragEnter: (e: DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
  handleClick: () => void;
  handleRemoveFile: (index: number) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

/**
 * Custom hook to manage file input state and validation
 */
export function useFileInput({
  accept,
  maxSize,
  maxFiles,
  disabled,
  onFilesChange,
  onError,
  onChange,
}: UseFileInputProps): UseFileInputReturn {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  // Memoize parsed accepted types to avoid re-parsing on every validation
  const acceptedTypes = useMemo(
    () => accept ? accept.split(',').map((t) => t.trim().toLowerCase()) : null,
    [accept]
  );

  // Helper to check if a file matches the accept pattern
  const isFileTypeAccepted = useCallback(
    (file: File): boolean => {
      if (!acceptedTypes) return true;

      const fileName = file.name.toLowerCase();
      const mimeType = file.type.toLowerCase();

      return acceptedTypes.some((acceptedType) => {
        // Handle extension (e.g., ".pdf")
        if (acceptedType.startsWith('.')) {
          return fileName.endsWith(acceptedType);
        }
        // Handle wildcard MIME types (e.g., "image/*")
        if (acceptedType.endsWith('/*')) {
          const baseType = acceptedType.slice(0, -2);
          return mimeType.startsWith(baseType + '/');
        }
        // Handle exact MIME type match
        return mimeType === acceptedType;
      });
    },
    [acceptedTypes]
  );

  const validateFiles = useCallback(
    (fileList: FileList | null): File[] | null => {
      if (!fileList || fileList.length === 0) return null;

      const fileArray = Array.from(fileList);

      // Check file types against accept prop
      if (acceptedTypes) {
        const invalidFile = fileArray.find((file) => !isFileTypeAccepted(file));
        if (invalidFile) {
          onError?.(`File type not accepted: ${invalidFile.name}`);
          return null;
        }
      }

      // Check max files
      if (maxFiles && fileArray.length > maxFiles) {
        onError?.(`Maximum ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`);
        return null;
      }

      // Check file sizes
      if (maxSize) {
        const oversizedFile = fileArray.find((file) => file.size > maxSize);
        if (oversizedFile) {
          onError?.(`File ${oversizedFile.name} exceeds maximum size of ${formatFileSize(maxSize)}`);
          return null;
        }
      }

      return fileArray;
    },
    [maxFiles, maxSize, onError, acceptedTypes, isFileTypeAccepted]
  );

  const handleFileChange = useCallback(
    (fileList: FileList | null) => {
      const validFiles = validateFiles(fileList);
      if (validFiles) {
        setFiles(validFiles);
        onFilesChange?.(validFiles);
      }
    },
    [validateFiles, onFilesChange]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileChange(e.target.files);
      onChange?.(e);
    },
    [handleFileChange, onChange]
  );

  const handleDragEnter = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current++;
      if (!disabled && dragCounterRef.current === 1) {
        setIsDragActive(true);
      }
    },
    [disabled]
  );

  const handleDragLeaveWrapper = useCallback(
    (e: DragEvent<HTMLDivElement>) => handleDragLeave(e, dragCounterRef, setIsDragActive),
    []
  );

  const handleDragOverWrapper = useCallback(
    (e: DragEvent<HTMLDivElement>) => handleDragOver(e),
    []
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current = 0;
      setIsDragActive(false);

      if (disabled) return;

      const droppedFiles = e.dataTransfer.files;
      handleFileChange(droppedFiles);
    },
    [disabled, handleFileChange]
  );

  const handleClick = useCallback(() => {
    if (!disabled) {
      inputRef.current?.click();
    }
  }, [disabled]);

  const handleRemoveFile = useCallback(
    (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      setFiles(newFiles);
      onFilesChange?.(newFiles);
      // Reset input value so the same file can be re-selected
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [files, onFilesChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  return {
    files,
    isDragActive,
    inputRef,
    handleChange,
    handleDragEnter,
    handleDragLeave: handleDragLeaveWrapper,
    handleDragOver: handleDragOverWrapper,
    handleDrop,
    handleClick,
    handleRemoveFile,
    handleKeyDown,
  };
}
