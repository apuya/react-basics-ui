import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { BiCheck, BiX, BiPlus, BiSearch, BiDownload } from 'react-icons/bi';

const meta: Meta<typeof Button> = {
  title: 'Forms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button component for user actions and form submissions. Supports multiple variants for different contexts, two sizes, loading states, and optional leading/trailing icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'destructive'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'default'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Variant Stories
export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Primary buttons are for main actions like form submissions or key CTAs. Use sparingly - typically one per section.',
      },
    },
  },
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Secondary buttons are for supporting actions that complement the primary action.',
      },
    },
  },
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tertiary buttons with a subtle border for less prominent actions.',
      },
    },
  },
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
};

export const Ghost: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Ghost buttons have no background and are used for the least prominent actions or in toolbars.',
      },
    },
  },
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Destructive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Destructive buttons indicate dangerous actions like deletion. Use to warn users before irreversible actions.',
      },
    },
  },
  args: {
    variant: 'destructive',
    children: 'Delete Item',
  },
};

// Size Stories
export const Small: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small buttons for compact UIs, toolbars, or inline actions where space is limited.',
      },
    },
  },
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default size for most use cases. Provides good touch targets and visual prominence.',
      },
    },
  },
  args: {
    size: 'default',
    children: 'Default Button',
  },
};

// State Stories
export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Loading state shows a spinner and disables interaction. Use during async operations.',
      },
    },
  },
  args: {
    isLoading: true,
    children: 'Saving...',
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled buttons cannot be clicked. Use when an action is not available due to form state or permissions.',
      },
    },
  },
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// Icon Stories
export const WithLeadingIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Leading icons reinforce the action meaning. Place before text for actions like "Add", "Download", etc.',
      },
    },
  },
  args: {
    leadingIcon: <BiPlus />,
    children: 'Add Item',
  },
};

export const WithTrailingIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Trailing icons indicate direction or secondary meaning. Use for "Next", "External link", etc.',
      },
    },
  },
  args: {
    trailingIcon: <BiDownload />,
    children: 'Download',
  },
};

export const IconOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons for compact spaces. Always include aria-label for accessibility.',
      },
    },
  },
  args: {
    leadingIcon: <BiSearch />,
    'aria-label': 'Search',
  },
};

// Comprehensive Stories
export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Overview of all button variants for visual comparison.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

export const AllVariantsDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All variants in disabled state showing consistent disabled styling.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="tertiary" disabled>Tertiary</Button>
      <Button variant="ghost" disabled>Ghost</Button>
      <Button variant="destructive" disabled>Destructive</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of button sizes for choosing the right size for your context.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="small">Small</Button>
      <Button size="default">Default</Button>
    </div>
  ),
};

export const LoadingVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Loading state across different variants showing consistent spinner behavior.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button variant="primary" isLoading>Primary</Button>
      <Button variant="secondary" isLoading>Secondary</Button>
      <Button variant="tertiary" isLoading>Tertiary</Button>
      <Button variant="ghost" isLoading>Ghost</Button>
      <Button variant="destructive" isLoading>Destructive</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Various icon configurations: leading, trailing, and both.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Button leadingIcon={<BiCheck />}>Confirm</Button>
      <Button trailingIcon={<BiX />}>Cancel</Button>
      <Button leadingIcon={<BiPlus />} trailingIcon={<BiDownload />}>Add & Download</Button>
    </div>
  ),
};

export const ButtonGroup: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common pattern of primary and secondary button pairing for form actions.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save Changes</Button>
    </div>
  ),
};
