import type { Meta, StoryObj } from '@storybook/react';
import { FileItem } from './FileItem';
import { Stack } from '../../layout/Stack';
import { Text } from '../../typography/Text';
import { Box } from '../../layout/Box';

const meta: Meta<typeof FileItem> = {
  title: 'Forms/FileInput/FileItem',
  component: FileItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'FileItem displays a single uploaded file with its name, size, and a remove button. Used internally by FileInput but can also be used standalone for custom file list implementations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    file: { description: 'The File object to display', control: false },
    state: {
      control: 'select',
      options: ['default', 'uploading'],
      description: 'The visual state of the file item',
    },
    onRemove: { description: 'Callback when the remove button is clicked', action: 'removed' },
  },
  decorators: [(Story) => <Box style={{ width: '320px' }}><Story /></Box>],
};

export default meta;
type Story = StoryObj<typeof FileItem>;

// Helper to create mock File objects with specified size
const createMockFile = (name: string, size: number, type: string): File => {
  const blob = new Blob([new ArrayBuffer(size)], { type });
  return new File([blob], name, { type });
};

// =============================================================================
// BASIC
// =============================================================================

export const Default: Story = {
  args: {
    file: createMockFile('document.pdf', 1024 * 512, 'application/pdf'),
    state: 'default',
  },
};

export const Uploading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'File is currently being uploaded.',
      },
    },
  },
  args: {
    file: createMockFile('video.mp4', 1024 * 1024 * 25, 'video/mp4'),
    state: 'uploading',
  },
};

export const LongFileName: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Long file names are truncated with ellipsis.',
      },
    },
  },
  args: {
    file: createMockFile(
      'this-is-a-very-long-filename-that-should-be-truncated-properly.pdf',
      1024 * 1024 * 2,
      'application/pdf'
    ),
    state: 'default',
  },
};

// =============================================================================
// STATES
// =============================================================================

export const AllStates: Story = {
  decorators: [(Story) => <Box style={{ width: '350px' }}><Story /></Box>],
  render: () => (
    <Stack spacing="md">
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Default</Text>
        <FileItem
          file={createMockFile('document.pdf', 1024 * 256, 'application/pdf')}
          state="default"
          onRemove={() => console.log('Remove default')}
        />
      </Stack>
      <Stack spacing="xs">
        <Text size="caption" color="secondary">Uploading</Text>
        <FileItem
          file={createMockFile('video.mp4', 1024 * 1024 * 50, 'video/mp4')}
          state="uploading"
          onRemove={() => console.log('Remove uploading')}
        />
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// INTERACTIVE
// =============================================================================

export const HoverState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'FileItem has a hover state that changes the background color. Hover over the item to see the effect.',
      },
    },
  },
  args: {
    file: createMockFile('hover-me.pdf', 1024 * 512, 'application/pdf'),
    state: 'default',
  },
};

// =============================================================================
// FILE TYPES
// =============================================================================

export const DifferentFileTypes: Story = {
  decorators: [(Story) => <Box style={{ width: '350px' }}><Story /></Box>],
  render: () => (
    <Stack spacing="sm">
      <FileItem
        file={createMockFile('document.pdf', 1024 * 256, 'application/pdf')}
        state="default"
        onRemove={() => {}}
      />
      <FileItem
        file={createMockFile('photo.jpg', 1024 * 1024 * 2, 'image/jpeg')}
        state="default"
        onRemove={() => {}}
      />
      <FileItem
        file={createMockFile('spreadsheet.xlsx', 1024 * 512, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')}
        state="default"
        onRemove={() => {}}
      />
      <FileItem
        file={createMockFile('archive.zip', 1024 * 1024 * 10, 'application/zip')}
        state="default"
        onRemove={() => {}}
      />
    </Stack>
  ),
};
