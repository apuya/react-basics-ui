import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FileInput } from './FileInput';

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
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Size of the file input dropzone',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    helperText: {
      control: 'text',
      description: 'Helper or error text',
    },
    uploadText: {
      control: 'text',
      description: 'Text displayed in upload area',
    },
    accept: {
      control: 'text',
      description: 'Accepted file types (e.g., "image/*", ".pdf,.doc")',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file uploads',
    },
    showFileList: {
      control: 'boolean',
      description: 'Show list of selected files',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files allowed',
    },
  },
  decorators: [(Story) => <div style={{ width: '500px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic file input with drag-and-drop support. Users can click to browse or drag files onto the area.',
      },
    },
  },
  args: {
    showFileList: true,
  },
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'File input with a descriptive label for better form context and accessibility.',
      },
    },
  },
  args: {
    label: 'Upload Document',
    showFileList: true,
  },
};

export const WithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'File input with helper text to provide additional guidance about accepted file types or size limits.',
      },
    },
  },
  args: {
    label: 'Profile Picture',
    helperText: 'Upload a profile picture (JPG, PNG, or GIF)',
    accept: 'image/*',
    showFileList: true,
  },
};

export const CustomUploadText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'File input with customized upload instruction text.',
      },
    },
  },
  args: {
    label: 'Upload Files',
    uploadText: 'Drop your files here or click to browse',
    showFileList: true,
  },
};

export const MultipleFiles: Story = {
  parameters: {
    docs: {
      description: {
        story: 'File input that accepts multiple files at once.',
      },
    },
  },
  args: {
    label: 'Upload Documents',
    multiple: true,
    helperText: 'Select one or more files',
    showFileList: true,
  },
};

export const WithMaxSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'File input with maximum file size validation (5MB in this example).',
      },
    },
  },
  render: (args) => {
    const [error, setError] = useState('');
    return (
      <FileInput
        {...args}
        onError={(err) => {
          setError(err);
          setTimeout(() => setError(''), 3000);
        }}
        helperText={error || args.helperText}
        error={!!error}
      />
    );
  },
  args: {
    label: 'Upload File',
    maxSize: 5 * 1024 * 1024, // 5MB
    helperText: 'Maximum file size: 5MB',
    showFileList: true,
  },
};

export const WithMaxFiles: Story = {
  parameters: {
    docs: {
      description: {
        story: 'File input that limits the number of files that can be uploaded (max 3 in this example).',
      },
    },
  },
  render: (args) => {
    const [error, setError] = useState('');
    return (
      <FileInput
        {...args}
        onError={(err) => {
          setError(err);
          setTimeout(() => setError(''), 3000);
        }}
        helperText={error || args.helperText}
        error={!!error}
      />
    );
  },
  args: {
    label: 'Upload Documents',
    multiple: true,
    maxFiles: 3,
    helperText: 'Maximum 3 files allowed',
    showFileList: true,
  },
};

export const ImageOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'File input restricted to image files only.',
      },
    },
  },
  args: {
    label: 'Upload Image',
    accept: 'image/*',
    helperText: 'Only image files (JPG, PNG, GIF, etc.)',
    showFileList: true,
  },
};

export const PDFOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'File input restricted to PDF files only.',
      },
    },
  },
  args: {
    label: 'Upload PDF',
    accept: '.pdf',
    helperText: 'Only PDF files accepted',
    showFileList: true,
  },
};

export const SizeSmall: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small size file input for compact layouts.',
      },
    },
  },
  args: {
    size: 'small',
    label: 'Upload File',
    showFileList: true,
  },
};

export const SizeDefault: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default size file input, recommended for most use cases.',
      },
    },
  },
  args: {
    size: 'default',
    label: 'Upload File',
    showFileList: true,
  },
};

export const SizeLarge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Large size file input for prominent form fields or touch interfaces.',
      },
    },
  },
  args: {
    size: 'large',
    label: 'Upload File',
    showFileList: true,
  },
};

export const ErrorState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'File input in error state with error message.',
      },
    },
  },
  args: {
    label: 'Upload Document',
    error: true,
    helperText: 'File type not supported',
    showFileList: true,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled file input that cannot accept user interaction.',
      },
    },
  },
  args: {
    label: 'Upload File',
    disabled: true,
    helperText: 'File upload is currently disabled',
    showFileList: true,
  },
};

export const NoFileList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'File input without showing the list of selected files.',
      },
    },
  },
  args: {
    label: 'Upload File',
    showFileList: false,
  },
};

export const CompleteExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Complete example with all features: multiple files, size limit, file type restriction, and error handling.',
      },
    },
  },
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState('');

    return (
      <FileInput
        label="Upload Images"
        accept="image/*"
        multiple
        maxFiles={5}
        maxSize={2 * 1024 * 1024} // 2MB
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

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Controlled file input example with state management and file list.',
      },
    },
  },
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className="space-y-4">
        <FileInput
          label="Upload Files"
          multiple
          showFileList
          onFilesChange={setFiles}
          helperText={`${files.length} file${files.length !== 1 ? 's' : ''} selected`}
        />
        {files.length > 0 && (
          <div className="text-sm">
            <p className="font-medium">Selected Files:</p>
            <ul className="list-disc list-inside mt-2">
              {files.map((file, index) => (
                <li key={index}>
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};
