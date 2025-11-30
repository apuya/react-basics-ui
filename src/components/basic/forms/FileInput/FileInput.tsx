import { cn } from '@/lib/cn';
import { useMergedRefs } from '@/hooks/useMergedRefs';
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
import { BiCloudUpload } from 'react-icons/bi';
import { Icon } from '@/components/basic/utility/Icon/Icon';
import { Text } from '@/components/basic/typography/Text/Text';
import { FileItem, formatFileSize } from './FileItem';
import {
  BASE_CLASSES,
  CONTAINER_CLASSES,
  DROPZONE_CLASSES,
  DROPZONE_DRAG_ACTIVE_CLASSES,
  DROPZONE_ERROR_CLASSES,
  FILE_LIST_CLASSES,
  HELPER_CLASSES,
  HELPER_ERROR_CLASSES,
  LABEL_CLASSES,
  LABEL_ERROR_CLASSES,
  RESPONSIVE_HELPER_TEXT_CLASSES,
  RESPONSIVE_ICON_CLASSES,
  RESPONSIVE_TEXT_CLASSES,
  UPLOAD_ICON_CLASSES,
  UPLOAD_TEXT_CLASSES,
} from './FileInput.styles';

export interface FileInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size' | 'type' | 'onError'> {
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

export const FileInput = memo(
  forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
    {
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
    const dragCounterRef = useRef(0);
    const generatedId = useId();
    const inputId = id || generatedId;

    // Helper to check if a file matches the accept pattern
    const isFileTypeAccepted = useCallback(
      (file: File): boolean => {
        if (!accept) return true;
        
        const acceptedTypes = accept.split(',').map((t) => t.trim().toLowerCase());
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
      [accept]
    );

    const validateFiles = useCallback(
      (fileList: FileList | null): File[] | null => {
        if (!fileList || fileList.length === 0) return null;

        const fileArray = Array.from(fileList);

        // Check file types against accept prop
        if (accept) {
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
      [maxFiles, maxSize, onError, accept, isFileTypeAccepted]
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
      dragCounterRef.current++;
      if (!disabled && dragCounterRef.current === 1) {
        setIsDragActive(true);
      }
    }, [disabled]);

    const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current--;
      if (dragCounterRef.current === 0) {
        setIsDragActive(false);
      }
    }, []);

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

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

    const dropzoneClasses = useMemo(
      () =>
        cn(
          DROPZONE_CLASSES,
          isDragActive && DROPZONE_DRAG_ACTIVE_CLASSES,
          error && DROPZONE_ERROR_CLASSES,
          disabled && 'opacity-[var(--component-fileinput-disabled-opacity)] cursor-not-allowed',
          className
        ),
      [isDragActive, error, disabled, className]
    );

    const paddingStyle = useMemo(
      () => ({
        paddingInline: 'var(--component-input-padding-inline)',
        paddingBlock: 'var(--component-input-padding-inline)',
      }),
      []
    );

    const defaultUploadIcon = useMemo(
      () => (
        <Icon 
          icon={BiCloudUpload} 
          size="xl"
          color="inherit"
          className={cn(UPLOAD_ICON_CLASSES, RESPONSIVE_ICON_CLASSES)}
          aria-hidden
        />
      ),
      []
    );

    return (
      <div className={cn(CONTAINER_CLASSES, wrapperClassName)}>
        {label && (
          <Text 
            as="label" 
            htmlFor={inputId} 
            size="body" 
            weight="medium"
            className={error ? LABEL_ERROR_CLASSES : LABEL_CLASSES}
          >
            {label}
          </Text>
        )}

        <div
          className={dropzoneClasses}
          style={paddingStyle}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
        >
          <input
            ref={useMergedRefs(ref, inputRef)}
            id={inputId}
            type="file"
            className={BASE_CLASSES}
            onChange={handleChange}
            disabled={disabled}
            accept={accept}
            multiple={multiple}
            aria-invalid={error || undefined}
            {...rest}
          />

          {uploadIcon || defaultUploadIcon}

          <div className={UPLOAD_TEXT_CLASSES}>
            <Text 
              as="p" 
              size="body" 
              weight="medium"
              className={RESPONSIVE_TEXT_CLASSES}
            >
              {uploadText}
            </Text>
            {(accept || maxSize) && (
              <Text 
                as="p" 
                size="small" 
                color="secondary"
                className={RESPONSIVE_HELPER_TEXT_CLASSES}
              >
                {accept && <span>{accept}</span>}
                {accept && maxSize && <span> · </span>}
                {maxSize && <span>Max {formatFileSize(maxSize)}</span>}
              </Text>
            )}
          </div>
        </div>

        {showFileList && files.length > 0 && (
          <div className={FILE_LIST_CLASSES}>
            {files.map((file, index) => (
              <FileItem key={`${file.name}-${file.lastModified}-${file.size}`} file={file} onRemove={() => handleRemoveFile(index)} />
            ))}
          </div>
        )}

        {helperText && (
          <Text 
            as="p" 
            size="small"
            className={error ? HELPER_ERROR_CLASSES : HELPER_CLASSES}
          >
            {helperText}
          </Text>
        )}
      </div>
    );
  })
);

FileInput.displayName = 'FileInput';
