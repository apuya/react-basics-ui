import { cn } from '@/lib/cn';
import { useMergedRefs } from '@/hooks/useMergedRefs';
import {
  forwardRef,
  memo,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { BiCloudUpload } from 'react-icons/bi';
import { Icon } from '@/components/utility/Icon/Icon';
import { Label } from '@/components/typography/Label';
import { Text } from '@/components/typography/Text/Text';
import { FileItem, formatFileSize } from './FileItem';
import { useFileInput } from './useFileInput';
import {
  BASE_CLASSES,
  CONTAINER_CLASSES,
  DROPZONE_CLASSES,
  DROPZONE_DRAG_ACTIVE_CLASSES,
  DROPZONE_ERROR_CLASSES,
  FILE_LIST_CLASSES,
  RESPONSIVE_ICON_CLASSES,
  RESPONSIVE_TEXT_CLASSES,
  RESPONSIVE_HELPER_TEXT_CLASSES,
  UPLOAD_TEXT_CLASSES,
  PADDING_STYLE,
} from './FileInput.styles';

// Static upload icon - defined outside component to avoid recreation
const DEFAULT_UPLOAD_ICON = (
  <Icon 
    icon={BiCloudUpload} 
    size="xl"
    color="inherit"
    className={RESPONSIVE_ICON_CLASSES}
    aria-hidden
  />
);

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
    const generatedId = useId();
    const inputId = id || generatedId;

    // Use custom hook for all file management logic
    const {
      files,
      isDragActive,
      inputRef,
      handleChange,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      handleClick,
      handleRemoveFile,
      handleKeyDown,
    } = useFileInput({
      accept,
      maxSize,
      maxFiles,
      disabled,
      onFilesChange,
      onError,
      onChange,
    });

    const dropzoneClasses = cn(
      DROPZONE_CLASSES,
      isDragActive && DROPZONE_DRAG_ACTIVE_CLASSES,
      error && DROPZONE_ERROR_CLASSES,
      disabled && 'opacity-[var(--component-fileinput-disabled-opacity)] cursor-not-allowed',
      className
    );

    return (
      <div className={cn(CONTAINER_CLASSES, wrapperClassName)}>
        {label && (
          <Label 
            htmlFor={inputId} 
            size="body" 
            weight="medium"
            color={error ? 'error' : 'primary'}
            className="block mb-[length:var(--component-input-gap-compact)]"
          >
            {label}
          </Label>
        )}

        <div
          className={dropzoneClasses}
          style={PADDING_STYLE}
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

          {uploadIcon || DEFAULT_UPLOAD_ICON}

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
              <FileItem 
                key={`${file.name}-${file.lastModified}-${file.size}`} 
                file={file} 
                onRemove={() => handleRemoveFile(index)} 
              />
            ))}
          </div>
        )}

        {helperText && (
          <Text 
            as="p" 
            size="small"
            color={error ? 'error' : 'secondary'}
            className="mt-[length:var(--component-input-gap-compact)]"
          >
            {helperText}
          </Text>
        )}
      </div>
    );
  })
);

FileInput.displayName = 'FileInput';
