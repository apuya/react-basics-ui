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
          'A loading spinner component that provides visual feedback during asynchronous operations. Supports multiple sizes and color variants with proper accessibility labels.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the spinner',
    },
    color: {
      control: 'select',
      options: ['default', 'inverse', 'inherit'],
      description: 'Color variant of the spinner',
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default spinner with medium size and default color.',
      },
    },
  },
};

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra small spinner, ideal for inline use within text or small buttons.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small spinner, suitable for compact UI elements.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large spinner, good for prominent loading states.',
      },
    },
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra large spinner, ideal for full-page loading overlays.',
      },
    },
  },
};

export const InverseColor: Story = {
  args: {
    color: 'inverse',
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner with inverse color, suitable for dark backgrounds.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-8 rounded">
        <Story />
      </div>
    ),
  ],
};

export const InheritColor: Story = {
  args: {
    color: 'inherit',
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner that inherits the current text color from its parent.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="text-blue-600">
        <Story />
      </div>
    ),
  ],
};

export const CustomLabel: Story = {
  args: {
    label: 'Processing your request...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Spinner with a custom accessibility label for screen readers.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available spinner sizes from extra small to extra large.',
      },
    },
  },
};

export const AllColors: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner color="default" />
        <span className="text-sm text-gray-600">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2 bg-gray-900 p-4 rounded">
        <Spinner color="inverse" />
        <span className="text-sm text-white">Inverse</span>
      </div>
      <div className="flex flex-col items-center gap-2 text-purple-600">
        <Spinner color="inherit" />
        <span className="text-sm">Inherit</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available color variants: default, inverse, and inherit.',
      },
    },
  },
};

export const InButton: Story = {
  render: () => (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
      <Spinner size="sm" color="inverse" />
      Loading...
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of spinner used within a button to indicate a loading state.',
      },
    },
  },
};

export const InCard: Story = {
  render: () => (
    <div className="w-64 p-8 border border-gray-200 rounded-lg shadow-sm">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-sm text-gray-600 text-center">Loading your content...</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of spinner used in a card component for content loading.',
      },
    },
  },
};

export const FullPageOverlay: Story = {
  render: () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 shadow-xl">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="xl" />
          <p className="text-gray-700 font-medium">Please wait...</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of spinner used in a full-page loading overlay.',
      },
    },
  },
};
