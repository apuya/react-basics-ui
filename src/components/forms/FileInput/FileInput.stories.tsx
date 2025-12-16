import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FileInput } from './FileInput';
import { FileItem } from './FileItem';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';

// Helper to create mock File objects
const createMockFile = (name: string, size: number, type: string): File => {
  const blob = new Blob([new ArrayBuffer(size)], { type });
  return new File([blob], name, { type, lastModified: Date.now() });
};

const meta = {
  title: 'Forms/FileInput',
  component: FileInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
FileInput provides drag-and-drop file uploads with validation and preview.

## Features
- **Drag & Drop** — Drop files directly onto the upload zone
- **File Validation** — Restrict by type, size, and count
- **File Preview** — Show uploaded files with remove buttons
- **Error Handling** — Real-time validation feedback
- **Responsive** — Adapts to container width using container queries

## File Validation
| Prop | Purpose |
|------|---------|
| \`accept\` | File type restrictions (e.g., \`"image/*"\`, \`".pdf,.doc"\`) |
| \`maxSize\` | Maximum file size in bytes |
| \`maxFiles\` | Maximum number of files (requires \`multiple\`) |

## Callbacks
- \`onFilesChange\` — Triggered when files are selected/removed
- \`onError\` — Triggered when validation fails

## Sub-Component
**FileItem** — Individual file display component (used internally, can be used standalone).

## Example
\`\`\`tsx
<FileInput
  label="Upload Resume"
  accept=".pdf,.doc,.docx"
  maxSize={10 * 1024 * 1024}
  helperText="PDF or Word document (max 10MB)"
  onFilesChange={(files) => console.log(files)}
  onError={(error) => alert(error)}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the file input.',
    },
    helperText: {
      control: 'text',
      description: 'Helper or error text below the input.',
    },
    uploadText: {
      control: 'text',
      description: 'Text displayed in the upload dropzone.',
      table: { defaultValue: { summary: 'Click to upload or drag and drop' } },
    },
    accept: {
      control: 'text',
      description: 'Accepted file types. Examples: `"image/*"`, `".pdf"`, `".pdf,.doc,.docx"`',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection.',
      table: { defaultValue: { summary: 'false' } },
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes.',
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files (requires `multiple`).',
    },
    showFileList: {
      control: 'boolean',
      description: 'Show list of selected files.',
      table: { defaultValue: { summary: 'true' } },
    },
    error: {
      control: 'boolean',
      description: 'Error state styling.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable file uploads.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  decorators: [(Story) => <Box style={{ width: '400px' }}><Story /></Box>],
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// Playground (for argTypes controls)
// =============================================================================

export const Playground: Story = {
  args: {
    label: 'Upload File',
    helperText: 'Drag and drop or click to browse',
    showFileList: true,
    error: false,
    disabled: false,
    multiple: false,
  },
};

// =============================================================================
// Use Cases
// =============================================================================

/**
 * Basic file upload with default settings.
 */
export const BasicUpload: Story = {
  render: () => (
    <FileInput
      label="Upload Document"
      helperText="Select a file to upload"
      showFileList
    />
  ),
};

/**
 * Profile picture upload restricted to images with size limit.
 */
export const ProfilePicture: Story = {
  render: function Render() {
    const [error, setError] = useState('');

    return (
      <FileInput
        label="Profile Picture"
        accept="image/*"
        maxSize={5 * 1024 * 1024}
        helperText={error || 'JPG, PNG, or GIF (max 5MB)'}
        error={!!error}
        showFileList
        onFilesChange={() => setError('')}
        onError={(err) => {
          setError(err);
          setTimeout(() => setError(''), 3000);
        }}
      />
    );
  },
};

/**
 * Resume upload accepting only PDF and Word documents.
 */
export const ResumeUpload: Story = {
  render: function Render() {
    const [error, setError] = useState('');
    const [hasFile, setHasFile] = useState(false);

    return (
      <Stack spacing="md">
        <FileInput
          label="Resume"
          accept=".pdf,.doc,.docx"
          maxSize={10 * 1024 * 1024}
          helperText={error || 'PDF or Word document (max 10MB)'}
          error={!!error}
          required
          showFileList
          onFilesChange={(files) => {
            setHasFile(files.length > 0);
            setError('');
          }}
          onError={(err) => {
            setError(err);
            setTimeout(() => setError(''), 3000);
          }}
        />
        {hasFile && (
          <Box className="p-2 rounded bg-[color:var(--semantic-surface-sunken)]">
            <span className="text-sm text-[color:var(--semantic-success-text)]">✓ Ready to submit</span>
          </Box>
        )}
      </Stack>
    );
  },
};

/**
 * Multiple file upload for project attachments with count limit.
 */
export const MultipleFiles: Story = {
  render: function Render() {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState('');

    return (
      <Stack spacing="md">
        <FileInput
          label="Project Attachments"
          multiple
          maxFiles={10}
          maxSize={50 * 1024 * 1024}
          helperText={
            error ||
            `Upload up to 10 files (max 50MB each). ${files.length} of 10 selected.`
          }
          error={!!error}
          showFileList
          onFilesChange={(newFiles) => {
            setFiles(newFiles);
            setError('');
          }}
          onError={(err) => {
            setError(err);
            setTimeout(() => setError(''), 5000);
          }}
        />
        {files.length > 0 && (
          <Box className="p-3 rounded bg-[color:var(--semantic-surface-sunken)]">
            <span className="text-sm font-medium">
              Total: {(files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024).toFixed(2)} MB
            </span>
          </Box>
        )}
      </Stack>
    );
  },
};

/**
 * Gallery upload for multiple images with preview.
 */
export const ImageGallery: Story = {
  render: function Render() {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState('');

    return (
      <FileInput
        label="Gallery Images"
        accept="image/*"
        multiple
        maxFiles={20}
        maxSize={10 * 1024 * 1024}
        helperText={error || `Upload images (max 20, 10MB each). ${files.length} selected.`}
        error={!!error}
        showFileList
        onFilesChange={(newFiles) => {
          setFiles(newFiles);
          setError('');
        }}
        onError={(err) => {
          setError(err);
          setTimeout(() => setError(''), 5000);
        }}
      />
    );
  },
};

/**
 * CSV data import accepting only CSV files.
 */
export const CSVImport: Story = {
  render: function Render() {
    const [error, setError] = useState('');
    const [file, setFile] = useState<File | null>(null);

    return (
      <Stack spacing="md">
        <FileInput
          label="Import Data"
          accept=".csv"
          maxSize={25 * 1024 * 1024}
          helperText={error || 'CSV file only (max 25MB)'}
          error={!!error}
          showFileList
          onFilesChange={(files) => {
            setFile(files[0] || null);
            setError('');
          }}
          onError={(err) => {
            setError(err);
            setTimeout(() => setError(''), 3000);
          }}
        />
        {file && (
          <Box className="p-2 rounded bg-[color:var(--semantic-info-bg)]">
            <span className="text-sm">Ready to import {file.name}</span>
          </Box>
        )}
      </Stack>
    );
  },
};

// =============================================================================
// Interactive Examples
// =============================================================================

/**
 * Real-time size validation demonstrating error feedback.
 */
export const SizeValidation: Story = {
  render: function Render() {
    const [error, setError] = useState('');
    const maxSizeMB = 2;

    return (
      <FileInput
        label="Upload File"
        maxSize={maxSizeMB * 1024 * 1024}
        helperText={error || `Maximum file size: ${maxSizeMB}MB`}
        error={!!error}
        showFileList
        onFilesChange={() => setError('')}
        onError={(err) => {
          setError(err);
          setTimeout(() => setError(''), 4000);
        }}
      />
    );
  },
};

/**
 * File count validation with dynamic feedback.
 */
export const CountValidation: Story = {
  render: function Render() {
    const [error, setError] = useState('');
    const [fileCount, setFileCount] = useState(0);
    const maxFiles = 3;

    return (
      <FileInput
        label="Upload Documents"
        multiple
        maxFiles={maxFiles}
        helperText={error || `Maximum ${maxFiles} files (${fileCount} selected)`}
        error={!!error}
        showFileList
        onFilesChange={(files) => {
          setFileCount(files.length);
          setError('');
        }}
        onError={(err) => {
          setError(err);
          setTimeout(() => setError(''), 4000);
        }}
      />
    );
  },
};

/**
 * Combined validation: type, size, and count restrictions.
 */
export const CombinedValidation: Story = {
  render: function Render() {
    const [error, setError] = useState('');

    return (
      <FileInput
        label="Upload Images"
        accept="image/jpeg,image/png"
        multiple
        maxFiles={5}
        maxSize={3 * 1024 * 1024}
        helperText={error || 'JPG or PNG only, max 5 files, 3MB each'}
        error={!!error}
        showFileList
        onFilesChange={() => setError('')}
        onError={(err) => {
          setError(err);
          setTimeout(() => setError(''), 5000);
        }}
      />
    );
  },
};

// =============================================================================
// States Overview
// =============================================================================

/**
 * All FileInput states for visual comparison.
 */
export const AllStates: Story = {
  decorators: [(Story) => <Box style={{ width: '500px' }}><Story /></Box>],
  render: () => (
    <Stack spacing="lg">
      <Box>
        <h4 className="text-sm font-medium mb-2">Default</h4>
        <FileInput label="Upload File" showFileList />
      </Box>

      <Box>
        <h4 className="text-sm font-medium mb-2">With Helper Text</h4>
        <FileInput
          label="Upload Document"
          helperText="PDF, DOC, or DOCX accepted"
          showFileList
        />
      </Box>

      <Box>
        <h4 className="text-sm font-medium mb-2">Error State</h4>
        <FileInput
          label="Upload File"
          error
          helperText="File type not supported"
          showFileList
        />
      </Box>

      <Box>
        <h4 className="text-sm font-medium mb-2">Disabled</h4>
        <FileInput
          label="Upload File"
          disabled
          helperText="File upload is currently disabled"
          showFileList
        />
      </Box>
    </Stack>
  ),
};

// =============================================================================
// Sub-Component: FileItem
// =============================================================================

/**
 * FileItem displays individual uploaded files. Used internally by FileInput,
 * but can be used standalone for custom file list implementations.
 */
export const FileItemComponent: Story = {
  render: () => (
    <Stack spacing="lg">
      <Box>
        <h4 className="text-sm font-medium mb-2">FileItem States</h4>
        <Stack spacing="sm" style={{ width: '350px' }}>
          <FileItem
            file={createMockFile('document.pdf', 1024 * 512, 'application/pdf')}
            state="default"
            onRemove={() => console.log('Remove')}
          />
          <FileItem
            file={createMockFile('uploading-video.mp4', 1024 * 1024 * 50, 'video/mp4')}
            state="uploading"
            onRemove={() => console.log('Cancel')}
          />
          <FileItem
            file={createMockFile(
              'very-long-filename-that-will-be-truncated.jpg',
              1024 * 1024 * 2,
              'image/jpeg'
            )}
            state="default"
            onRemove={() => console.log('Remove')}
          />
        </Stack>
      </Box>

      <Box>
        <h4 className="text-sm font-medium mb-2">Different File Types</h4>
        <Stack spacing="sm" style={{ width: '350px' }}>
          <FileItem
            file={createMockFile('presentation.pptx', 1024 * 1024 * 5, 'application/vnd.ms-powerpoint')}
            onRemove={() => {}}
          />
          <FileItem
            file={createMockFile('photo.jpg', 1024 * 1024 * 3, 'image/jpeg')}
            onRemove={() => {}}
          />
          <FileItem
            file={createMockFile('archive.zip', 1024 * 1024 * 25, 'application/zip')}
            onRemove={() => {}}
          />
          <FileItem
            file={createMockFile('data.csv', 1024 * 128, 'text/csv')}
            onRemove={() => {}}
          />
        </Stack>
      </Box>
    </Stack>
  ),
};

// =============================================================================
// Responsive Behavior
// =============================================================================

/**
 * FileInput adapts to container width using container queries.
 */
export const ResponsiveSizing: Story = {
  parameters: {
    layout: 'padded',
  },
  decorators: [(Story) => <div style={{ width: '100%' }}><Story /></div>],
  render: () => (
    <Stack spacing="xl">
      <Box>
        <h4 className="text-sm font-medium mb-2">Narrow (200px) - Compact</h4>
        <Box style={{ width: '200px' }}>
          <FileInput label="Upload" showFileList />
        </Box>
      </Box>

      <Box>
        <h4 className="text-sm font-medium mb-2">Medium (350px) - Standard</h4>
        <Box style={{ width: '350px' }}>
          <FileInput label="Upload File" helperText="Medium width" showFileList />
        </Box>
      </Box>

      <Box>
        <h4 className="text-sm font-medium mb-2">Wide (600px) - Spacious</h4>
        <Box style={{ width: '600px' }}>
          <FileInput
            label="Upload Documents"
            helperText="Drag and drop or click to browse"
            showFileList
          />
        </Box>
      </Box>
    </Stack>
  ),
};
