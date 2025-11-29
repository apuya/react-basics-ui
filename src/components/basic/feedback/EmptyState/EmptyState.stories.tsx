import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { BiBox, BiSearchAlt, BiFolder, BiCart, BiCloudUpload } from 'react-icons/bi';
import { Button } from '../../forms/Button';

const meta = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'EmptyState component for displaying placeholder content when there is no data. Supports icons, titles, descriptions, and action buttons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
    icon: {
      control: false,
      description: 'Icon element to display',
    },
    action: {
      control: false,
      description: 'Action element (button, link)',
    },
    iconSize: {
      control: 'number',
      description: 'Icon size in pixels',
      table: { defaultValue: { summary: '48' } },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;
type StoryWithRender = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: <BiBox />,
    title: 'No items found',
    description: 'Get started by creating your first item.',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const WithAction: Story = {
  args: {
    icon: <BiFolder />,
    title: 'No projects yet',
    description: "You haven't created any projects. Start by creating your first project.",
    action: <Button variant="primary">Create Project</Button>,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const SearchNoResults: Story = {
  args: {
    icon: <BiSearchAlt />,
    title: 'No results found',
    description: 'Try adjusting your search terms or filters.',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Empty state for search with no matching results.',
      },
    },
  },
};

export const EmptyCart: Story = {
  args: {
    icon: <BiCart />,
    title: 'Your cart is empty',
    description: 'Add items to your cart to get started.',
    action: <Button variant="primary">Start Shopping</Button>,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const MultipleActions: Story = {
  args: {
    icon: <BiCloudUpload />,
    title: 'No documents',
    description: 'Upload your first document to get started.',
    action: (
      <div className="flex gap-2">
        <Button variant="primary">Upload Document</Button>
        <Button variant="secondary">Learn More</Button>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Empty state with multiple action buttons.',
      },
    },
  },
};

export const IconSizes: StoryWithRender = {
  render: () => (
    <div className="flex gap-8">
      <div className="w-64">
        <span className="text-sm text-gray-500 mb-2 block">Small (32px)</span>
        <EmptyState icon={<BiBox />} iconSize={32} title="Small Icon" description="Compact empty state." />
      </div>
      <div className="w-64">
        <span className="text-sm text-gray-500 mb-2 block">Default (48px)</span>
        <EmptyState icon={<BiBox />} title="Default Icon" description="Standard empty state." />
      </div>
      <div className="w-64">
        <span className="text-sm text-gray-500 mb-2 block">Large (80px)</span>
        <EmptyState icon={<BiBox />} iconSize={80} title="Large Icon" description="Prominent empty state." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different icon sizes for various contexts.',
      },
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    title: 'No data available',
    description: 'There is currently no data to display.',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const TitleOnly: Story = {
  args: {
    icon: <BiBox />,
    title: 'Nothing here yet',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const InContainer: StoryWithRender = {
  render: () => (
    <div className="border border-gray-200 rounded-lg p-4 min-h-80 flex items-center justify-center w-full max-w-lg">
      <EmptyState icon={<BiBox />} title="No messages" description="You don't have any messages yet." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty state centered within a container.',
      },
    },
  },
};
