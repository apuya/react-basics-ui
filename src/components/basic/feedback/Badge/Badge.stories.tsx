import type { Meta, StoryObj } from '@storybook/react';
import { BiCheckCircle, BiStar, BiX, BiInfoCircle, BiErrorCircle } from 'react-icons/bi';
import { Badge } from './Badge';

const meta = {
  title: 'Feedback/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Badge component for displaying labels, counts, or status indicators. Supports 29 colors, 4 style variants, multiple sizes, icons, and dismissible functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'primary', 'secondary', 'neutral', 'success', 'warning', 'error', 'info',
        'blue', 'cyan', 'emerald', 'fuchsia', 'gold', 'green', 'indigo', 'lime',
        'navy', 'amber', 'orange', 'pink', 'purple', 'red', 'rose', 'sand',
        'sky', 'slate', 'teal', 'violet', 'yellow', 'zinc',
      ],
      description: 'Color of the badge',
      table: { defaultValue: { summary: 'primary' } },
    },
    styleVariant: {
      control: 'select',
      options: ['subtle', 'solid', 'outline', 'subtle-outline'],
      description: 'Visual style variant',
      table: { defaultValue: { summary: 'subtle' } },
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Size of the badge',
      table: { defaultValue: { summary: 'default' } },
    },
    dismissible: {
      control: 'boolean',
      description: 'Show dismiss button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;
type StoryWithRender = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const StyleVariants: StoryWithRender = {
  render: () => (
    <div className="space-y-4">
      <div>
        <span className="text-sm text-gray-500 mb-2 block">Subtle</span>
        <div className="flex flex-wrap gap-2">
          <Badge styleVariant="subtle" color="primary">Primary</Badge>
          <Badge styleVariant="subtle" color="success">Success</Badge>
          <Badge styleVariant="subtle" color="warning">Warning</Badge>
          <Badge styleVariant="subtle" color="error">Error</Badge>
          <Badge styleVariant="subtle" color="info">Info</Badge>
        </div>
      </div>
      <div>
        <span className="text-sm text-gray-500 mb-2 block">Solid</span>
        <div className="flex flex-wrap gap-2">
          <Badge styleVariant="solid" color="primary">Primary</Badge>
          <Badge styleVariant="solid" color="success">Success</Badge>
          <Badge styleVariant="solid" color="warning">Warning</Badge>
          <Badge styleVariant="solid" color="error">Error</Badge>
          <Badge styleVariant="solid" color="info">Info</Badge>
        </div>
      </div>
      <div>
        <span className="text-sm text-gray-500 mb-2 block">Outline</span>
        <div className="flex flex-wrap gap-2">
          <Badge styleVariant="outline" color="primary">Primary</Badge>
          <Badge styleVariant="outline" color="success">Success</Badge>
          <Badge styleVariant="outline" color="warning">Warning</Badge>
          <Badge styleVariant="outline" color="error">Error</Badge>
          <Badge styleVariant="outline" color="info">Info</Badge>
        </div>
      </div>
      <div>
        <span className="text-sm text-gray-500 mb-2 block">Subtle Outline</span>
        <div className="flex flex-wrap gap-2">
          <Badge styleVariant="subtle-outline" color="primary">Primary</Badge>
          <Badge styleVariant="subtle-outline" color="success">Success</Badge>
          <Badge styleVariant="subtle-outline" color="warning">Warning</Badge>
          <Badge styleVariant="subtle-outline" color="error">Error</Badge>
          <Badge styleVariant="subtle-outline" color="info">Info</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Four style variants with semantic colors.',
      },
    },
  },
};

export const AllColors: StoryWithRender = {
  render: () => (
    <div className="flex flex-wrap gap-2 max-w-xl">
      {[
        'primary', 'secondary', 'neutral', 'success', 'warning', 'error', 'info',
        'blue', 'cyan', 'emerald', 'fuchsia', 'gold', 'green', 'indigo', 'lime',
        'navy', 'amber', 'orange', 'pink', 'purple', 'red', 'rose', 'sand',
        'sky', 'slate', 'teal', 'violet', 'yellow', 'zinc',
      ].map((color) => (
        <Badge key={color} color={color as any}>
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All 29 available badge colors.',
      },
    },
  },
};

export const Sizes: StoryWithRender = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="small" color="primary">Small</Badge>
      <Badge size="default" color="primary">Default</Badge>
      <Badge size="large" color="primary">Large</Badge>
    </div>
  ),
};

export const WithIcons: StoryWithRender = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge color="success" leadingIcon={<BiCheckCircle />}>Verified</Badge>
        <Badge color="primary" trailingIcon={<BiStar />}>Premium</Badge>
        <Badge color="info" leadingIcon={<BiInfoCircle />}>Info</Badge>
        <Badge color="error" leadingIcon={<BiErrorCircle />}>Error</Badge>
      </div>
      <div className="flex gap-2">
        <span className="text-sm text-gray-500">Icon only:</span>
        <Badge color="success" leadingIcon={<BiCheckCircle />} />
        <Badge color="error" leadingIcon={<BiX />} />
        <Badge color="primary" leadingIcon={<BiStar />} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with leading icons, trailing icons, or icon-only.',
      },
    },
  },
};

export const Dismissible: StoryWithRender = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge styleVariant="subtle" color="primary" dismissible>Subtle</Badge>
        <Badge styleVariant="solid" color="primary" dismissible>Solid</Badge>
        <Badge styleVariant="outline" color="primary" dismissible>Outline</Badge>
      </div>
      <div className="flex items-center gap-4">
        <Badge size="small" color="success" dismissible>Small</Badge>
        <Badge size="default" color="success" dismissible>Default</Badge>
        <Badge size="large" color="success" dismissible>Large</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dismissible badges with close button.',
      },
    },
  },
};

export const StatusIndicators: StoryWithRender = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="success" leadingIcon={<BiCheckCircle />}>Active</Badge>
      <Badge color="warning" leadingIcon={<BiInfoCircle />}>Pending</Badge>
      <Badge color="error" leadingIcon={<BiX />}>Inactive</Badge>
      <Badge color="info" leadingIcon={<BiInfoCircle />}>Draft</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common status indicator patterns.',
      },
    },
  },
};

export const CountBadge: StoryWithRender = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge color="error" size="small">3</Badge>
      <Badge color="error">12</Badge>
      <Badge color="error" size="large">99+</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Notification count badges.',
      },
    },
  },
};

export const NotificationIcon: StoryWithRender = {
  render: () => (
    <div className="relative inline-block">
      <button className="p-2 text-gray-600 hover:text-gray-900">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      </button>
      <Badge color="error" size="small" className="absolute -top-1 -right-1 min-w-5 h-5 px-1">
        5
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge positioned as notification indicator.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    color: 'primary',
    dismissible: true,
    disabled: true,
    children: 'Disabled Badge',
  },
};
