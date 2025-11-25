import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import { BiCheck, BiX, BiStar, BiUser } from 'react-icons/bi';

const meta = {
  title: 'Basic/Data Display/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'subtle'],
      description: 'Visual style variant',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
      description: 'Color scheme',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tag size',
    },
    removable: {
      control: 'boolean',
      description: 'Show remove button',
    },
    onRemove: {
      action: 'removed',
      description: 'Called when remove button is clicked',
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Tag',
    variant: 'subtle',
    color: 'default',
    size: 'md',
  },
};

export const AllVariants: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Solid</h3>
        <div className="flex flex-wrap gap-2">
          <Tag variant="solid" color="default">Default</Tag>
          <Tag variant="solid" color="primary">Primary</Tag>
          <Tag variant="solid" color="success">Success</Tag>
          <Tag variant="solid" color="warning">Warning</Tag>
          <Tag variant="solid" color="error">Error</Tag>
          <Tag variant="solid" color="info">Info</Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Outline</h3>
        <div className="flex flex-wrap gap-2">
          <Tag variant="outline" color="default">Default</Tag>
          <Tag variant="outline" color="primary">Primary</Tag>
          <Tag variant="outline" color="success">Success</Tag>
          <Tag variant="outline" color="warning">Warning</Tag>
          <Tag variant="outline" color="error">Error</Tag>
          <Tag variant="outline" color="info">Info</Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Subtle</h3>
        <div className="flex flex-wrap gap-2">
          <Tag variant="subtle" color="default">Default</Tag>
          <Tag variant="subtle" color="primary">Primary</Tag>
          <Tag variant="subtle" color="success">Success</Tag>
          <Tag variant="subtle" color="warning">Warning</Tag>
          <Tag variant="subtle" color="error">Error</Tag>
          <Tag variant="subtle" color="info">Info</Tag>
        </div>
      </div>
    </div>
  ),
};

export const AllColors: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-6">
      {(['solid', 'outline', 'subtle'] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold capitalize">{variant}</h3>
          <div className="flex flex-wrap gap-2">
            {(['default', 'primary', 'success', 'warning', 'error', 'info'] as const).map((color) => (
              <Tag key={color} variant={variant} color={color}>
                {color}
              </Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Tag size="sm" color="primary">Small</Tag>
        <Tag size="md" color="primary">Medium</Tag>
        <Tag size="lg" color="primary">Large</Tag>
      </div>
      <div className="flex items-center gap-2">
        <Tag size="sm" variant="outline" color="success">Small</Tag>
        <Tag size="md" variant="outline" color="success">Medium</Tag>
        <Tag size="lg" variant="outline" color="success">Large</Tag>
      </div>
      <div className="flex items-center gap-2">
        <Tag size="sm" variant="solid" color="error">Small</Tag>
        <Tag size="md" variant="solid" color="error">Medium</Tag>
        <Tag size="lg" variant="solid" color="error">Large</Tag>
      </div>
    </div>
  ),
};

export const Removable: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Tag removable color="primary" onRemove={() => console.log('Removed')}>
          Removable Tag
        </Tag>
        <Tag removable color="success" onRemove={() => console.log('Removed')}>
          <BiCheck className="w-3 h-3" />
          With Icon
        </Tag>
        <Tag removable variant="outline" color="warning" onRemove={() => console.log('Removed')}>
          Outline
        </Tag>
        <Tag removable variant="solid" color="error" onRemove={() => console.log('Removed')}>
          Solid
        </Tag>
      </div>
      <div className="flex flex-wrap gap-2">
        <Tag removable size="sm" color="info" onRemove={() => console.log('Removed')}>
          Small
        </Tag>
        <Tag removable size="md" color="info" onRemove={() => console.log('Removed')}>
          Medium
        </Tag>
        <Tag removable size="lg" color="info" onRemove={() => console.log('Removed')}>
          Large
        </Tag>
      </div>
    </div>
  ),
};

export const FilterChips: Story = {
  args: {},
  render: () => {
    const filters = [
      { label: 'React', color: 'primary' as const },
      { label: 'TypeScript', color: 'primary' as const },
      { label: 'In Stock', color: 'success' as const },
      { label: 'On Sale', color: 'warning' as const },
      { label: 'New', color: 'info' as const },
    ];

    return (
      <div className="max-w-xl">
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Tag
                key={filter.label}
                removable
                color={filter.color}
                onRemove={() => console.log(`Removed ${filter.label}`)}
              >
                {filter.label}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const TagList: Story = {
  args: {},
  render: () => (
    <div className="max-w-2xl flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Product Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Tag color="default">Electronics</Tag>
          <Tag color="default">Computers</Tag>
          <Tag color="default">Laptops</Tag>
          <Tag color="primary">Best Seller</Tag>
          <Tag color="success">In Stock</Tag>
          <Tag color="warning">Limited</Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Skills</h3>
        <div className="flex flex-wrap gap-2">
          <Tag variant="outline" color="primary">React</Tag>
          <Tag variant="outline" color="primary">TypeScript</Tag>
          <Tag variant="outline" color="primary">Node.js</Tag>
          <Tag variant="outline" color="default">CSS</Tag>
          <Tag variant="outline" color="default">HTML</Tag>
          <Tag variant="outline" color="success">Git</Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Project Labels</h3>
        <div className="flex flex-wrap gap-2">
          <Tag variant="solid" color="error" size="sm">Bug</Tag>
          <Tag variant="solid" color="success" size="sm">Feature</Tag>
          <Tag variant="solid" color="warning" size="sm">Enhancement</Tag>
          <Tag variant="solid" color="info" size="sm">Documentation</Tag>
          <Tag variant="solid" color="default" size="sm">Question</Tag>
        </div>
      </div>
    </div>
  ),
};

export const StatusTags: Story = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Order Status</h3>
        <div className="flex flex-wrap gap-2">
          <Tag variant="subtle" color="default">
            Pending
          </Tag>
          <Tag variant="subtle" color="info">
            Processing
          </Tag>
          <Tag variant="subtle" color="warning">
            Shipped
          </Tag>
          <Tag variant="subtle" color="success">
            <BiCheck className="w-4 h-4" />
            Delivered
          </Tag>
          <Tag variant="subtle" color="error">
            <BiX className="w-4 h-4" />
            Cancelled
          </Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">User Roles</h3>
        <div className="flex flex-wrap gap-2">
          <Tag variant="solid" color="error" size="sm">
            <BiStar className="w-3 h-3" />
            Admin
          </Tag>
          <Tag variant="solid" color="primary" size="sm">
            <BiUser className="w-3 h-3" />
            Moderator
          </Tag>
          <Tag variant="outline" color="default" size="sm">
            <BiUser className="w-3 h-3" />
            User
          </Tag>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Priority Levels</h3>
        <div className="flex flex-wrap gap-2">
          <Tag variant="solid" color="error">High Priority</Tag>
          <Tag variant="outline" color="warning">Medium Priority</Tag>
          <Tag variant="subtle" color="default">Low Priority</Tag>
        </div>
      </div>
    </div>
  ),
};
