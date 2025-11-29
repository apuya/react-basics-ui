import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A loading spinner component that provides visual feedback during asynchronous operations. Supports multiple sizes and color variants with proper accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the spinner',
      table: { defaultValue: { summary: 'md' } },
    },
    color: {
      control: 'select',
      options: ['default', 'inverse', 'inherit'],
      description: 'Color variant of the spinner',
      table: { defaultValue: { summary: 'default' } },
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
      table: { defaultValue: { summary: 'Loading...' } },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xs" />
        <span className="text-xs text-gray-500">xs</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-xs text-gray-500">sm</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-xs text-gray-500">md</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-xs text-gray-500">lg</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xl" />
        <span className="text-xs text-gray-500">xl</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available spinner sizes.',
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2 p-4">
        <Spinner color="default" />
        <span className="text-xs text-gray-500">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2 bg-gray-900 p-4 rounded-lg">
        <Spinner color="inverse" />
        <span className="text-xs text-white">Inverse</span>
      </div>
      <div className="flex flex-col items-center gap-2 text-purple-600 p-4">
        <Spinner color="inherit" />
        <span className="text-xs">Inherit</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Color variants: default for light backgrounds, inverse for dark backgrounds, inherit for custom colors.',
      },
    },
  },
};

export const InButton: Story = {
  render: () => (
    <div className="flex gap-4">
      <button
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60"
        disabled
      >
        <Spinner size="sm" color="inverse" />
        Saving...
      </button>
      <button
        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-60"
        disabled
      >
        <Spinner size="sm" color="default" />
        Loading...
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner used within buttons to indicate loading state.',
      },
    },
  },
};

export const InlineWithText: Story = {
  render: () => (
    <p className="text-gray-700 flex items-center gap-2">
      <Spinner size="xs" /> Loading your data...
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Extra small spinner used inline with text.',
      },
    },
  },
};

export const ContentLoading: Story = {
  render: () => (
    <div className="w-72 p-6 border border-gray-200 rounded-lg shadow-sm">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-gray-600">Loading content...</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner used for content area loading state.',
      },
    },
  },
};

export const FullPageOverlay: Story = {
  render: () => (
    <div className="relative w-[400px] h-[300px] bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 shadow-xl">
          <div className="flex flex-col items-center gap-3">
            <Spinner size="xl" />
            <p className="text-gray-700 font-medium">Please wait...</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full-page loading overlay pattern (shown in a container for demo).',
      },
    },
  },
};
