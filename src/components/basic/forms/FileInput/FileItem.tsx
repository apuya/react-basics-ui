import { memo, useMemo } from 'react';
import { BiTrash } from 'react-icons/bi';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/basic/utility/Icon/Icon';
import { Text } from '@/components/basic/typography/Text/Text';
import {
  FILE_ITEM_CLASSES,
  FILE_ITEM_STATE_CLASSES,
  FILE_REMOVE_BUTTON_CLASSES,
} from './FileInput.styles';

export type FileItemState = keyof typeof FILE_ITEM_STATE_CLASSES;

export interface FileItemProps {
  /** The file to display */
  file: File;
  /** Callback when the remove button is clicked */
  onRemove: () => void;
  /** The state of the file item */
  state?: FileItemState;
  /** Additional class name */
  className?: string;
}

/**
 * Formats file size in bytes to human-readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * FileItem displays a single uploaded file with its name, size, and a remove button.
 */
export const FileItem = memo(function FileItem({ 
  file, 
  onRemove, 
  state = 'default',
  className 
}: FileItemProps) {
  const paddingStyle = useMemo(
    () => ({
      paddingInline: 'var(--component-input-padding-inline)',
      paddingBlock: 'var(--component-input-padding-inline)',
    }),
    []
  );

  return (
    <div 
      className={cn(
        FILE_ITEM_CLASSES, 
        FILE_ITEM_STATE_CLASSES[state], 
        className
      )}
      style={paddingStyle}
    >
      <div className="flex-1 min-w-0">
        <Text 
          as="p" 
          size="body" 
          weight="medium" 
          color="primary" 
          truncate
        >
          {file.name}
        </Text>
        <Text 
          as="p" 
          size="small" 
          color="secondary"
        >
          {formatFileSize(file.size)}
        </Text>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className={FILE_REMOVE_BUTTON_CLASSES}
        aria-label={`Remove ${file.name}`}
      >
        <Icon icon={BiTrash} size="sm" color="inherit" />
      </button>
    </div>
  );
});
