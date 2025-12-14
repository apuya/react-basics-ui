import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FileInput } from './FileInput';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/typography/Text';
import { Box } from '@/components/layout/Box';

const meta: Meta<typeof FileInput> = {
  title: 'Forms/FileInput',
  component: FileInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'FileInput component with drag-and-drop support, file validation, and preview. Supports single or multiple file uploads with size and type restrictions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean', description: 'Error state' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    label: { control: 'text', description: 'Label text' },
    helperText: { control: 'text', description: 'Helper or error text' },
    uploadText: { control: 'text', description: 'Text displayed in upload area' },
    accept: { control: 'text', description: 'Accepted file types (e.g., "image/*", ".pdf,.doc")' },
    multiple: { control: 'boolean', description: 'Allow multiple file uploads' },
    showFileList: { control: 'boolean', description: 'Show list of selected files' },
    maxSize: { control: 'number', description: 'Maximum file size in bytes' },
    maxFiles: { control: 'number', description: 'Maximum number of files allowed' },
  },
  decorators: [(Story) => <Box style={{ width: '400px' }}><Story /></Box>],
};

export default meta;
type Story = StoryObj<typeof FileInput>;

// =============================================================================
// BASIC
// =============================================================================

export const Default: Story = {
  args: {
    showFileList: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Upload Document',
    showFileList: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Profile Picture',
    helperText: 'Upload a profile picture (JPG, PNG, or GIF)',
    accept: 'image/*',
    showFileList: true,
  },
};

// =============================================================================
// VARIANTS
// =============================================================================

export const AllConfigurations: Story = {
  decorators: [(Story) => <Box style={{ width: '500px' }}><Story /></Box>],
  render: () => (
    <Stack spacing="lg">
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Basic</Text>
        <FileInput showFileList />
      </Stack>
      <Stack spacing="xs">
        <Text size="caption" color="secondary">With Label</Text>
        <FileInput label="Upload Document" showFileList />
      </Stack>
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Images Only</Text>
        <FileInput 
          label="Profile Picture" 
          accept="image/*" 
          helperText="JPG, PNG, GIF accepted" 
          showFileList 
        />
      </Stack>
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Multiple Files</Text>
        <FileInput 
          label="Documents" 
          multiple 
          helperText="Select multiple files" 
          showFileList 
        />
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// STATES
// =============================================================================

export const States: Story = {
  decorators: [(Story) => <Box style={{ width: '500px' }}><Story /></Box>],
  render: () => (
    <Stack spacing="lg">
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Default</Text>
        <FileInput label="Upload File" showFileList />
      </Stack>
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Error</Text>
        <FileInput 
          label="Upload Document" 
          error 
          helperText="File type not supported" 
          showFileList 
        />
      </Stack>
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Disabled</Text>
        <FileInput 
          label="Upload File" 
          disabled 
          helperText="File upload is currently disabled" 
          showFileList 
        />
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// FILE TYPE RESTRICTIONS
// =============================================================================

export const FileTypeRestrictions: Story = {
  decorators: [(Story) => <Box style={{ width: '500px' }}><Story /></Box>],
  render: () => (
    <Stack spacing="lg">
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Images Only</Text>
        <FileInput 
          label="Upload Image" 
          accept="image/*" 
          helperText="Only image files (JPG, PNG, GIF, etc.)" 
          showFileList 
        />
      </Stack>
      <Stack spacing="xs">
        <Text size="caption" color="secondary">PDF Only</Text>
        <FileInput 
          label="Upload PDF" 
          accept=".pdf" 
          helperText="Only PDF files accepted" 
          showFileList 
        />
      </Stack>
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Documents</Text>
        <FileInput 
          label="Upload Documents" 
          accept=".pdf,.doc,.docx,.txt" 
          helperText="PDF, DOC, DOCX, TXT accepted" 
          showFileList 
        />
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// VALIDATION
// =============================================================================

export const WithMaxSize: Story = {
  render: function Render() {
    const [error, setError] = useState('');
    return (
      <FileInput
        label="Upload File"
        maxSize={5 * 1024 * 1024}
        helperText={error || 'Maximum file size: 5MB'}
        error={!!error}
        showFileList
        onError={(err) => {
          setError(err);
          setTimeout(() => setError(''), 3000);
        }}
      />
    );
  },
};

export const WithMaxFiles: Story = {
  render: function Render() {
    const [error, setError] = useState('');
    return (
      <FileInput
        label="Upload Documents"
        multiple
        maxFiles={3}
        helperText={error || 'Maximum 3 files allowed'}
        error={!!error}
        showFileList
        onError={(err) => {
          setError(err);
          setTimeout(() => setError(''), 3000);
        }}
      />
    );
  },
};

// =============================================================================
// INTERACTIVE
// =============================================================================

export const Controlled: Story = {
  decorators: [(Story) => <Box style={{ width: '500px' }}><Story /></Box>],
  render: function Render() {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <Stack spacing="md">
        <FileInput
          label="Upload Files"
          multiple
          showFileList
          onFilesChange={setFiles}
          helperText={`${files.length} file${files.length !== 1 ? 's' : ''} selected`}
        />
        {files.length > 0 && (
          <Box className="p-3 rounded-md bg-[color:var(--semantic-surface-sunken)]">
            <Text size="small" weight="medium" className="mb-2">Selected Files:</Text>
            <Stack spacing="xs">
              {files.map((file, index) => (
                <Text key={index} size="caption" color="secondary">
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </Text>
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    );
  },
};

export const CompleteExample: Story = {
  decorators: [(Story) => <Box style={{ width: '500px' }}><Story /></Box>],
  render: function Render() {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState('');

    return (
      <FileInput
        label="Upload Images"
        accept="image/*"
        multiple
        maxFiles={5}
        maxSize={2 * 1024 * 1024}
        helperText={error || `Upload up to 5 images (max 2MB each). ${files.length} file${files.length !== 1 ? 's' : ''} selected.`}
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

// =============================================================================
// RESPONSIVE
// =============================================================================

export const ResponsiveSizes: Story = {
  parameters: {
    layout: 'padded',
  },
  decorators: [(Story) => <div style={{ width: '100%' }}><Story /></div>],
  render: () => (
    <Stack spacing="xl">
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Narrow (200px)</Text>
        <Box style={{ width: '200px' }}>
          <FileInput label="Upload" showFileList />
        </Box>
      </Stack>
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Medium (350px)</Text>
        <Box style={{ width: '350px' }}>
          <FileInput label="Upload File" showFileList />
        </Box>
      </Stack>
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Wide (500px)</Text>
        <Box style={{ width: '500px' }}>
          <FileInput 
            label="Upload Documents" 
            helperText="Drag and drop or click to browse" 
            showFileList 
          />
        </Box>
      </Stack>
    </Stack>
  ),
};
