import type { Meta, StoryObj } from '@storybook/react';
import { BiCheckCircle, BiStar, BiHeart, BiTrendingUp, BiX, BiInfoCircle, BiErrorCircle } from 'react-icons/bi';
import { Badge } from './Badge';

const meta = {
  title: 'Feedback/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A badge component for displaying labels, counts, or status indicators. Supports 30 color variants, multiple sizes, optional icons, and dismissible functionality for enhanced visual communication and interaction.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'neutral',
        'success',
        'warning',
        'error',
        'info',
        'blue',
        'cyan',
        'emerald',
        'fuchsia',
        'gold',
        'green',
        'indigo',
        'lime',
        'navy',
        'amber',
        'orange',
        'pink',
        'purple',
        'red',
        'rose',
        'sand',
        'sky',
        'slate',
        'teal',
        'violet',
        'yellow',
        'zinc',
        'primary-dismissible',
        'secondary-dismissible',
        'neutral-dismissible',
        'success-dismissible',
        'warning-dismissible',
        'error-dismissible',
        'info-dismissible',
        'blue-dismissible',
        'cyan-dismissible',
        'emerald-dismissible',
        'fuchsia-dismissible',
        'gold-dismissible',
        'green-dismissible',
        'indigo-dismissible',
        'lime-dismissible',
        'navy-dismissible',
        'amber-dismissible',
        'orange-dismissible',
        'pink-dismissible',
        'purple-dismissible',
        'red-dismissible',
        'rose-dismissible',
        'sand-dismissible',
        'sky-dismissible',
        'slate-dismissible',
        'teal-dismissible',
        'violet-dismissible',
        'yellow-dismissible',
        'zinc-dismissible',
      ],
      description: 'Color variant of the badge',
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Size of the badge',
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
      description: 'Callback for dismissible badges when close icon is clicked',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default badge with neutral variant and default size.',
      },
    },
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary badge for main actions or primary information.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary badge for supporting information.',
      },
    },
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    children: 'Neutral',
  },
  parameters: {
    docs: {
      description: {
        story: 'Neutral badge with subtle gray styling.',
      },
    },
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
  parameters: {
    docs: {
      description: {
        story: 'Success badge for positive states or completed actions.',
      },
    },
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning badge for caution or attention-required states.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error',
  },
  parameters: {
    docs: {
      description: {
        story: 'Error badge for error states or critical information.',
      },
    },
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
  parameters: {
    docs: {
      description: {
        story: 'Info badge for informational messages or tips.',
      },
    },
  },
};

export const Purple: Story = {
  args: {
    variant: 'purple',
    children: 'Purple',
  },
  parameters: {
    docs: {
      description: {
        story: 'Purple badge for creative or premium content.',
      },
    },
  },
};

export const Pink: Story = {
  args: {
    variant: 'pink',
    children: 'Pink',
  },
  parameters: {
    docs: {
      description: {
        story: 'Pink badge for highlighting or special categories.',
      },
    },
  },
};

export const Indigo: Story = {
  args: {
    variant: 'indigo',
    children: 'Indigo',
  },
  parameters: {
    docs: {
      description: {
        story: 'Indigo badge for technology or innovation-related content.',
      },
    },
  },
};

export const Teal: Story = {
  args: {
    variant: 'teal',
    children: 'Teal',
  },
  parameters: {
    docs: {
      description: {
        story: 'Teal badge for fresh or modern content.',
      },
    },
  },
};

export const Cyan: Story = {
  args: {
    variant: 'cyan',
    children: 'Cyan',
  },
  parameters: {
    docs: {
      description: {
        story: 'Cyan badge for notifications or updates.',
      },
    },
  },
};

export const Orange: Story = {
  args: {
    variant: 'orange',
    children: 'Orange',
  },
  parameters: {
    docs: {
      description: {
        story: 'Orange badge for energetic or active states.',
      },
    },
  },
};

export const Lime: Story = {
  args: {
    variant: 'lime',
    children: 'Lime',
  },
  parameters: {
    docs: {
      description: {
        story: 'Lime badge for growth or eco-friendly content.',
      },
    },
  },
};

export const Emerald: Story = {
  args: {
    variant: 'emerald',
    children: 'Emerald',
  },
  parameters: {
    docs: {
      description: {
        story: 'Emerald badge for verified or approved content.',
      },
    },
  },
};

export const Amber: Story = {
  args: {
    variant: 'amber',
    children: 'Amber',
  },
  parameters: {
    docs: {
      description: {
        story: 'Amber badge for pending or in-progress states.',
      },
    },
  },
};

export const Rose: Story = {
  args: {
    variant: 'rose',
    children: 'Rose',
  },
  parameters: {
    docs: {
      description: {
        story: 'Rose badge for romantic or featured content.',
      },
    },
  },
};

export const Blue: Story = {
  args: {
    variant: 'blue',
    children: 'Blue',
  },
  parameters: {
    docs: {
      description: {
        story: 'Blue badge for informational or trust-related content.',
      },
    },
  },
};

export const Fuchsia: Story = {
  args: {
    variant: 'fuchsia',
    children: 'Fuchsia',
  },
  parameters: {
    docs: {
      description: {
        story: 'Fuchsia badge for vibrant or creative content.',
      },
    },
  },
};

export const Gold: Story = {
  args: {
    variant: 'gold',
    children: 'Gold',
  },
  parameters: {
    docs: {
      description: {
        story: 'Gold badge for premium or exclusive content.',
      },
    },
  },
};

export const Green: Story = {
  args: {
    variant: 'green',
    children: 'Green',
  },
  parameters: {
    docs: {
      description: {
        story: 'Green badge for positive or active states.',
      },
    },
  },
};

export const Navy: Story = {
  args: {
    variant: 'navy',
    children: 'Navy',
  },
  parameters: {
    docs: {
      description: {
        story: 'Navy badge for professional or corporate content.',
      },
    },
  },
};

export const Red: Story = {
  args: {
    variant: 'red',
    children: 'Red',
  },
  parameters: {
    docs: {
      description: {
        story: 'Red badge for urgent or critical states.',
      },
    },
  },
};

export const Sand: Story = {
  args: {
    variant: 'sand',
    children: 'Sand',
  },
  parameters: {
    docs: {
      description: {
        story: 'Sand badge for neutral or earthy content.',
      },
    },
  },
};

export const Sky: Story = {
  args: {
    variant: 'sky',
    children: 'Sky',
  },
  parameters: {
    docs: {
      description: {
        story: 'Sky badge for light or airy content.',
      },
    },
  },
};

export const Slate: Story = {
  args: {
    variant: 'slate',
    children: 'Slate',
  },
  parameters: {
    docs: {
      description: {
        story: 'Slate badge for muted or subdued content.',
      },
    },
  },
};

export const Violet: Story = {
  args: {
    variant: 'violet',
    children: 'Violet',
  },
  parameters: {
    docs: {
      description: {
        story: 'Violet badge for elegant or sophisticated content.',
      },
    },
  },
};

export const Yellow: Story = {
  args: {
    variant: 'yellow',
    children: 'Yellow',
  },
  parameters: {
    docs: {
      description: {
        story: 'Yellow badge for attention or highlighted content.',
      },
    },
  },
};

export const Zinc: Story = {
  args: {
    variant: 'zinc',
    children: 'Zinc',
  },
  parameters: {
    docs: {
      description: {
        story: 'Zinc badge for modern or industrial content.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small badge, ideal for compact spaces or inline use.',
      },
    },
  },
};

export const DefaultSize: Story = {
  args: {
    size: 'default',
    children: 'Default',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default-sized badge, suitable for most use cases.',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large badge for prominent display or emphasis.',
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'success',
    leadingIcon: <BiCheckCircle />,
    children: 'Verified',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with a leading icon for enhanced visual communication.',
      },
    },
  },
};

export const WithStarIcon: Story = {
  args: {
    variant: 'amber',
    leadingIcon: <BiStar />,
    children: 'Featured',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with a star icon to indicate featured content.',
      },
    },
  },
};

export const WithHeartIcon: Story = {
  args: {
    variant: 'rose',
    leadingIcon: <BiHeart />,
    children: 'Favorite',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with a heart icon for favorite or liked items.',
      },
    },
  },
};

export const WithTrendingIcon: Story = {
  args: {
    variant: 'cyan',
    leadingIcon: <BiTrendingUp />,
    children: 'Trending',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with a trending icon for popular content.',
      },
    },
  },
};

export const CountBadge: Story = {
  args: {
    variant: 'error',
    children: '99+',
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge displaying a count, commonly used for notifications.',
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
        story: 'Comparison of all 30 available badge color variants.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="small" variant="primary">
        Small
      </Badge>
      <Badge size="default" variant="primary">
        Default
      </Badge>
      <Badge size="large" variant="primary">
        Large
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available badge sizes.',
      },
    },
  },
};

export const CategoryTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="purple">Design</Badge>
      <Badge variant="indigo">Technology</Badge>
      <Badge variant="teal">Business</Badge>
      <Badge variant="emerald">Environment</Badge>
      <Badge variant="orange">Marketing</Badge>
      <Badge variant="rose">Lifestyle</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of badges used as category tags.',
      },
    },
  },
};

export const UserRoles: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">John Doe</span>
        <Badge variant="primary" size="small">
          Admin
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Jane Smith</span>
        <Badge variant="secondary" size="small">
          Editor
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Bob Johnson</span>
        <Badge variant="neutral" size="small">
          Viewer
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of badges used to display user roles.',
      },
    },
  },
};

export const ProductStatus: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
        <span className="text-sm">Product A</span>
        <Badge variant="success" leadingIcon={<BiCheckCircle />}>
          In Stock
        </Badge>
      </div>
      <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
        <span className="text-sm">Product B</span>
        <Badge variant="warning">Low Stock</Badge>
      </div>
      <div className="flex items-center justify-between p-3 border border-gray-200 rounded">
        <span className="text-sm">Product C</span>
        <Badge variant="error">Out of Stock</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of badges used to indicate product inventory status.',
      },
    },
  },
};

export const NotificationBadge: Story = {
  render: () => (
    <div className="relative inline-block">
      <button className="p-2 text-gray-600 hover:text-gray-900">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
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
        story: 'Example of a notification badge positioned on a bell icon.',
      },
    },
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

export const WithTrailingIcon: Story = {
  args: {
    variant: 'primary',
    children: 'Premium',
    trailingIcon: <BiStar />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with a trailing icon positioned after the text.',
      },
    },
  },
};

export const WithBothIcons: Story = {
  args: {
    variant: 'success',
    leadingIcon: <BiCheckCircle />,
    children: 'Verified User',
    trailingIcon: <BiStar />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with both leading and trailing icons.',
      },
    },
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'primary-dismissible',
    children: 'Removable Tag',
    onDismiss: () => console.log('Badge dismissed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dismissible badge with a close icon. Click to dismiss.',
      },
    },
  },
};

export const DismissibleVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary-dismissible" onDismiss={() => console.log('Primary dismissed')}>
        Primary
      </Badge>
      <Badge variant="success-dismissible" onDismiss={() => console.log('Success dismissed')}>
        Success
      </Badge>
      <Badge variant="warning-dismissible" onDismiss={() => console.log('Warning dismissed')}>
        Warning
      </Badge>
      <Badge variant="error-dismissible" onDismiss={() => console.log('Error dismissed')}>
        Error
      </Badge>
      <Badge variant="info-dismissible" onDismiss={() => console.log('Info dismissed')}>
        Info
      </Badge>
      <Badge variant="neutral-dismissible" onDismiss={() => console.log('Neutral dismissed')}>
        Neutral
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All dismissible badge variants with close functionality.',
      },
    },
  },
};

export const DismissibleWithIcon: Story = {
  args: {
    variant: 'success-dismissible',
    leadingIcon: <BiCheckCircle />,
    children: 'Completed Task',
    onDismiss: () => console.log('Task removed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dismissible badge with both a leading icon and close button.',
      },
    },
  },
};

export const TagsList: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 max-w-md">
      <Badge variant="blue-dismissible" onDismiss={() => console.log('React dismissed')}>
        React
      </Badge>
      <Badge variant="indigo-dismissible" onDismiss={() => console.log('TypeScript dismissed')}>
        TypeScript
      </Badge>
      <Badge variant="purple-dismissible" onDismiss={() => console.log('Tailwind dismissed')}>
        Tailwind CSS
      </Badge>
      <Badge variant="pink-dismissible" onDismiss={() => console.log('Storybook dismissed')}>
        Storybook
      </Badge>
      <Badge variant="green-dismissible" onDismiss={() => console.log('Vite dismissed')}>
        Vite
      </Badge>
      <Badge variant="orange-dismissible" onDismiss={() => console.log('Jest dismissed')}>
        Jest
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of dismissible tags for filters or categories.',
      },
    },
  },
};

export const DismissibleSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 items-start">
      <Badge 
        variant="primary-dismissible" 
        size="small" 
        onDismiss={() => console.log('Small dismissed')}
      >
        Small
      </Badge>
      <Badge 
        variant="primary-dismissible" 
        size="default" 
        onDismiss={() => console.log('Default dismissed')}
      >
        Default
      </Badge>
      <Badge 
        variant="primary-dismissible" 
        size="large" 
        onDismiss={() => console.log('Large dismissed')}
      >
        Large
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dismissible badges in all three sizes.',
      },
    },
  },
};
