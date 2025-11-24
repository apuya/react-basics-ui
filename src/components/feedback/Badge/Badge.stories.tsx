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
          'A badge component for displaying labels, counts, or status indicators. Supports 29 color variants, multiple sizes, optional icons, and dismissible functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary', 'secondary', 'neutral', 'success', 'warning', 'error', 'info',
        'blue', 'cyan', 'emerald', 'fuchsia', 'gold', 'green', 'indigo', 'lime',
        'navy', 'amber', 'orange', 'pink', 'purple', 'red', 'rose', 'sand',
        'sky', 'slate', 'teal', 'violet', 'yellow', 'zinc',
      ],
      description: 'Color variant of the badge',
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Size of the badge',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the badge can be dismissed',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the badge is disabled',
    },
    visible: {
      control: 'boolean',
      description: 'Controlled visibility state',
    },
    defaultVisible: {
      control: 'boolean',
      description: 'Initial visibility for uncontrolled mode',
    },
    children: {
      control: 'text',
      description: 'Content of the badge',
    },
    leadingIcon: {
      description: 'Icon displayed before the content',
    },
    trailingIcon: {
      description: 'Icon displayed after the content',
    },
    onDismiss: {
      description: 'Callback when dismissible badge is clicked',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base Examples
export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 max-w-3xl">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="cyan">Cyan</Badge>
      <Badge variant="emerald">Emerald</Badge>
      <Badge variant="fuchsia">Fuchsia</Badge>
      <Badge variant="gold">Gold</Badge>
      <Badge variant="green">Green</Badge>
      <Badge variant="indigo">Indigo</Badge>
      <Badge variant="lime">Lime</Badge>
      <Badge variant="navy">Navy</Badge>
      <Badge variant="amber">Amber</Badge>
      <Badge variant="orange">Orange</Badge>
      <Badge variant="pink">Pink</Badge>
      <Badge variant="purple">Purple</Badge>
      <Badge variant="red">Red</Badge>
      <Badge variant="rose">Rose</Badge>
      <Badge variant="sand">Sand</Badge>
      <Badge variant="sky">Sky</Badge>
      <Badge variant="slate">Slate</Badge>
      <Badge variant="teal">Teal</Badge>
      <Badge variant="violet">Violet</Badge>
      <Badge variant="yellow">Yellow</Badge>
      <Badge variant="zinc">Zinc</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All 29 available badge color variants.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="small" variant="primary">Small</Badge>
      <Badge size="default" variant="primary">Default</Badge>
      <Badge size="large" variant="primary">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available badge sizes.',
      },
    },
  },
};

// Icon Examples
export const WithLeadingIcon: Story = {
  args: {
    variant: 'success',
    leadingIcon: <BiCheckCircle />,
    children: 'Verified',
  },
};

export const WithTrailingIcon: Story = {
  args: {
    variant: 'primary',
    children: 'Premium',
    trailingIcon: <BiStar />,
  },
};

export const WithBothIcons: Story = {
  args: {
    variant: 'success',
    leadingIcon: <BiCheckCircle />,
    children: 'Verified User',
    trailingIcon: <BiStar />,
  },
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Badge variant="success" leadingIcon={<BiCheckCircle />} />
      <Badge variant="error" leadingIcon={<BiX />} />
      <Badge variant="info" leadingIcon={<BiInfoCircle />} />
      <Badge variant="warning" leadingIcon={<BiErrorCircle />} />
      <Badge variant="primary" leadingIcon={<BiStar />} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only badges without text content.',
      },
    },
  },
};

// Dismissible Examples
export const Dismissible: Story = {
  args: {
    variant: 'primary',
    dismissible: true,
    children: 'Removable Tag',
    onDismiss: () => console.log('Badge dismissed'),
  },
};

export const DismissibleVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary" dismissible onDismiss={() => console.log('dismissed')}>Primary</Badge>
      <Badge variant="success" dismissible onDismiss={() => console.log('dismissed')}>Success</Badge>
      <Badge variant="warning" dismissible onDismiss={() => console.log('dismissed')}>Warning</Badge>
      <Badge variant="error" dismissible onDismiss={() => console.log('dismissed')}>Error</Badge>
      <Badge variant="info" dismissible onDismiss={() => console.log('dismissed')}>Info</Badge>
      <Badge variant="neutral" dismissible onDismiss={() => console.log('dismissed')}>Neutral</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dismissible badge variants with close functionality.',
      },
    },
  },
};

export const DismissibleSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 items-start">
      <Badge variant="primary" dismissible size="small" onDismiss={() => console.log('dismissed')}>
        Small
      </Badge>
      <Badge variant="primary" dismissible size="default" onDismiss={() => console.log('dismissed')}>
        Default
      </Badge>
      <Badge variant="primary" dismissible size="large" onDismiss={() => console.log('dismissed')}>
        Large
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dismissible badges in all sizes.',
      },
    },
  },
};

// Use Case Examples
export const CountBadge: Story = {
  args: {
    variant: 'error',
    children: '99+',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge displaying a count for notifications.',
      },
    },
  },
};

export const StatusBadge: Story = {
  args: {
    variant: 'success',
    leadingIcon: <BiCheckCircle />,
    children: 'Active',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge indicating status with icon and text.',
      },
    },
  },
};

export const NotificationBadge: Story = {
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
      <Badge
        variant="error"
        size="small"
        className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1"
      >
        5
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Notification badge positioned on a bell icon.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    dismissible: true,
    disabled: true,
    children: 'Disabled Badge',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled badge that cannot be dismissed.',
      },
    },
  },
};

export const UncontrolledDismiss: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary" dismissible>Auto-hide 1</Badge>
      <Badge variant="success" dismissible>Auto-hide 2</Badge>
      <Badge variant="warning" dismissible>Auto-hide 3</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Uncontrolled dismissible badges that auto-hide when clicked (no onDismiss callback).',
      },
    },
  },
};
