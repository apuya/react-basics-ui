import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { BiCheck, BiX, BiPlus, BiSearch, BiDownload } from 'react-icons/bi';
import { Flex } from '../../layout/Flex';

const meta: Meta<typeof Button> = {
  title: 'Forms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button component for user actions and form submissions. Supports multiple variants, sizes, loading states, and icons. Polymorphic - can render as any element type.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'destructive', 'tabs'],
      description: 'Visual style variant',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Button size',
      table: { defaultValue: { summary: 'default' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <Flex wrap gap="sm">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="tabs">Tabs</Button>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button variants for different contexts and emphasis levels.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <Flex align="center" gap="sm">
      <Button size="small">Small</Button>
      <Button size="default">Default</Button>
      <Button size="large">Large</Button>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button sizes.',
      },
    },
  },
};

export const Loading: Story = {
  render: () => (
    <Flex wrap gap="sm">
      <Button variant="primary" isLoading>Primary</Button>
      <Button variant="secondary" isLoading>Secondary</Button>
      <Button variant="tertiary" isLoading>Tertiary</Button>
      <Button variant="destructive" isLoading>Destructive</Button>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading state shows spinner and disables interaction.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <Flex wrap gap="sm">
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="tertiary" disabled>Tertiary</Button>
      <Button variant="destructive" disabled>Destructive</Button>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled state for unavailable actions.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <Flex wrap gap="sm">
      <Button leadingIcon={<BiPlus />}>Add Item</Button>
      <Button trailingIcon={<BiDownload />}>Download</Button>
      <Button leadingIcon={<BiCheck />} trailingIcon={<BiX />}>Both Icons</Button>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with leading, trailing, or both icons.',
      },
    },
  },
};

export const IconOnly: Story = {
  render: () => (
    <Flex align="center" gap="sm">
      <Button size="small" leadingIcon={<BiSearch />} aria-label="Search" />
      <Button size="default" leadingIcon={<BiSearch />} aria-label="Search" />
      <Button size="large" leadingIcon={<BiSearch />} aria-label="Search" />
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons. Always include aria-label for accessibility.',
      },
    },
  },
};

export const ButtonGroup: Story = {
  render: () => (
    <Flex gap="sm">
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save Changes</Button>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common pattern of primary and secondary button pairing.',
      },
    },
  },
};

export const AsLink: Story = {
  render: () => (
    <Button as="a" href="#" onClick={(e) => e.preventDefault()}>
      Navigate to Page
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button rendered as anchor element using polymorphic `as` prop.',
      },
    },
  },
};

export const VariantsWithIcons: Story = {
  render: () => (
    <Flex wrap gap="sm">
      <Button variant="primary" leadingIcon={<BiCheck />}>Confirm</Button>
      <Button variant="secondary" leadingIcon={<BiPlus />}>Add</Button>
      <Button variant="tertiary" leadingIcon={<BiSearch />}>Search</Button>
      <Button variant="ghost" leadingIcon={<BiDownload />}>Download</Button>
      <Button variant="destructive" leadingIcon={<BiX />}>Delete</Button>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All variants with icons to verify icon color consistency.',
      },
    },
  },
};
