import { cn } from '@/lib/cn';
import {
  forwardRef,
  memo,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type DragEvent,
  type ReactNode,
} from 'react';
import {
  BASE_CLASSES,
  DROPZONE_CLASSES,
  DROPZONE_DRAG_ACTIVE_CLASSES,
  DROPZONE_ERROR_CLASSES,
  FILE_ITEM_CLASSES,
  FILE_LIST_CLASSES,
  FILE_NAME_CLASSES,
  FILE_REMOVE_BUTTON_CLASSES,
  FILE_SIZE_CLASSES,
  HELPER_CLASSES,
  HELPER_ERROR_CLASSES,
  LABEL_CLASSES,
  LABEL_ERROR_CLASSES,
  SIZE_STYLES,
  UPLOAD_ICON_CLASSES,
  UPLOAD_TEXT_CLASSES,
} from './FileInput.styles';

export type FileInputSize = keyof typeof SIZE_STYLES;

export interface FileInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type' | 'onError'> {
  /** The size variant of the file input */
  size?: FileInputSize;
  /** Whether the input has an error state */
  error?: boolean;
  /** Label text */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Callback when files are selected */
  onFilesChange?: (files: File[]) => void;
  /** Callback when validation fails */
  onError?: (error: string) => void;
  /** Show file list */
  showFileList?: boolean;
  /** Custom icon for upload area */
  uploadIcon?: ReactNode;
  /** Custom text for upload area */
  uploadText?: string;
  /** Container class name */
  wrapperClassName?: string;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const FileItem = memo(
  ({ file, onRemove }: { file: File; onRemove: () => void }) => (
    <div className={FILE_ITEM_CLASSES}>
      <div className="flex-1 min-w-0">
        <p className={FILE_NAME_CLASSES}>{file.name}</p>
        <p className={FILE_SIZE_CLASSES}>{formatFileSize(file.size)}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className={FILE_REMOVE_BUTTON_CLASSES}
        aria-label={`Remove ${file.name}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
    </div>
  )
);
FileItem.displayName = 'FileItem';

export const FileInput = memo(
  forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
    {
      size = 'default',
      error = false,
      label,
      helperText,
      maxSize,
      maxFiles,
      onFilesChange,
      onError,
      showFileList = true,
      uploadIcon,
      uploadText = 'Click to upload or drag and drop',
      className,
      wrapperClassName,
      id,
      disabled,
      accept,
      multiple,
      onChange,
      ...rest
    },
    ref
  ) {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragActive, setIsDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const generatedId = useId();
    const inputId = id || generatedId;

    const validateFiles = useCallback(
      (fileList: FileList | null): File[] | null => {
        if (!fileList || fileList.length === 0) return null;

        const fileArray = Array.from(fileList);

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
      [maxFiles, maxSize, onError]
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

    const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragActive(true);
      }
    }, [disabled]);

    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
    }, []);

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleDrop = useCallback(
      (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
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
      },
      [files, onFilesChange]
    );

    const dropzoneClasses = useMemo(
      () =>
        cn(
          DROPZONE_CLASSES,
          SIZE_STYLES[size],
          isDragActive && DROPZONE_DRAG_ACTIVE_CLASSES,
          error && DROPZONE_ERROR_CLASSES,
          disabled && 'opacity-[var(--semantic-opacity-disabled)] cursor-not-allowed',
          className
        ),
      [size, isDragActive, error, disabled, className]
    );

    const defaultUploadIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={UPLOAD_ICON_CLASSES}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
        />
      </svg>
    );

    return (
      <div className={cn('w-full', wrapperClassName)}>
        {label && (
          <label htmlFor={inputId} className={error ? LABEL_ERROR_CLASSES : LABEL_CLASSES}>
            {label}
          </label>
        )}

        <div
          className={dropzoneClasses}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          <input
            ref={(node) => {
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              inputRef.current = node;
            }}
            id={inputId}
            type="file"
            className={BASE_CLASSES}
            onChange={handleChange}
            disabled={disabled}
            accept={accept}
            multiple={multiple}
            {...rest}
          />

          {uploadIcon || defaultUploadIcon}

          <div className={UPLOAD_TEXT_CLASSES}>
            <p className="font-medium">{uploadText}</p>
            {(accept || maxSize) && (
              <p className="text-sm">
                {accept && <span>{accept}</span>}
                {accept && maxSize && <span> · </span>}
                {maxSize && <span>Max {formatFileSize(maxSize)}</span>}
              </p>
            )}
          </div>
        </div>

        {showFileList && files.length > 0 && (
          <div className={FILE_LIST_CLASSES}>
            {files.map((file, index) => (
              <FileItem key={`${file.name}-${index}`} file={file} onRemove={() => handleRemoveFile(index)} />
            ))}
          </div>
        )}

        {helperText && (
          <p className={error ? HELPER_ERROR_CLASSES : HELPER_CLASSES}>{helperText}</p>
        )}
      </div>
    );
  })
);

FileInput.displayName = 'FileInput';
