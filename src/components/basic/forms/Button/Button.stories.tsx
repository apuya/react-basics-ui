import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { ButtonGroup } from './ButtonGroup';
import { BiCheck, BiX, BiPlus, BiSearch, BiDownload, BiMenu, BiHeart } from 'react-icons/bi';
import { Flex } from '../../layout/Flex';

const meta: Meta<typeof Button> = {
  title: 'Forms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button component for user actions and form submissions. Supports multiple variants, sizes, loading states, and visual slots. Polymorphic - can render as any element type.',
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
    loading: {
      control: 'boolean',
      description: 'Loading state - shows spinner and announces to screen readers',
    },
    block: {
      control: 'boolean',
      description: 'Full width button',
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
      <Button variant="primary" loading>Primary</Button>
      <Button variant="secondary" loading>Secondary</Button>
      <Button variant="tertiary" loading>Tertiary</Button>
      <Button variant="destructive" loading>Destructive</Button>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading state shows spinner, uses `aria-disabled` (keeps focus), and announces to screen readers.',
      },
    },
  },
};

export const LoadingWithAnnouncement: Story = {
  render: () => (
    <Flex wrap gap="sm">
      <Button loading loadingAnnouncement="Saving your changes...">Save</Button>
      <Button loading loadingAnnouncement="Submitting form...">Submit</Button>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom loading announcements for screen readers. Default is "Loading".',
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

export const WithVisuals: Story = {
  render: () => (
    <Flex wrap gap="sm">
      <Button leadingVisual={<BiPlus />}>Add Item</Button>
      <Button trailingVisual={<BiDownload />}>Download</Button>
      <Button leadingVisual={<BiCheck />} trailingVisual={<BiX />}>Both</Button>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with leading, trailing, or both visual elements (icons, badges, etc.).',
      },
    },
  },
};

export const IconButtonSizes: Story = {
  render: () => (
    <Flex align="center" gap="sm">
      <IconButton size="small" icon={<BiSearch />} aria-label="Search" />
      <IconButton size="default" icon={<BiSearch />} aria-label="Search" />
      <IconButton size="large" icon={<BiSearch />} aria-label="Search" />
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'IconButton in all sizes. Requires aria-label for accessibility.',
      },
    },
  },
};

export const IconButtonShapes: Story = {
  render: () => (
    <Flex align="center" gap="sm">
      <IconButton icon={<BiMenu />} aria-label="Menu" shape="square" />
      <IconButton icon={<BiHeart />} aria-label="Favorite" shape="circle" />
      <IconButton icon={<BiX />} aria-label="Close" shape="circle" variant="ghost" />
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'IconButton supports square (default) and circle shapes.',
      },
    },
  },
};

export const IconButtonVariants: Story = {
  render: () => (
    <Flex wrap gap="sm">
      <IconButton variant="primary" icon={<BiCheck />} aria-label="Confirm" />
      <IconButton variant="secondary" icon={<BiPlus />} aria-label="Add" />
      <IconButton variant="tertiary" icon={<BiSearch />} aria-label="Search" />
      <IconButton variant="ghost" icon={<BiMenu />} aria-label="Menu" />
      <IconButton variant="destructive" icon={<BiX />} aria-label="Delete" />
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'IconButton supports all button variants.',
      },
    },
  },
};

export const ButtonGroupStory: Story = {
  name: 'ButtonGroup',
  render: () => (
    <Flex direction="column" gap="md">
      <ButtonGroup>
        <Button variant="secondary">Left</Button>
        <Button variant="secondary">Center</Button>
        <Button variant="secondary">Right</Button>
      </ButtonGroup>
      <ButtonGroup attached>
        <Button variant="secondary">Left</Button>
        <Button variant="secondary">Center</Button>
        <Button variant="secondary">Right</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical">
        <Button variant="secondary">Top</Button>
        <Button variant="secondary">Middle</Button>
        <Button variant="secondary">Bottom</Button>
      </ButtonGroup>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ButtonGroup for grouping related actions. Supports attached mode and vertical orientation.',
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

export const VariantsWithVisuals: Story = {
  render: () => (
    <Flex wrap gap="sm">
      <Button variant="primary" leadingVisual={<BiCheck />}>Confirm</Button>
      <Button variant="secondary" leadingVisual={<BiPlus />}>Add</Button>
      <Button variant="tertiary" leadingVisual={<BiSearch />}>Search</Button>
      <Button variant="ghost" leadingVisual={<BiDownload />}>Download</Button>
      <Button variant="destructive" leadingVisual={<BiX />}>Delete</Button>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All variants with leading visuals to verify icon color consistency.',
      },
    },
  },
};

export const BlockButton: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Flex direction="column" gap="sm">
        <Button block>Full Width Primary</Button>
        <Button block variant="secondary">Full Width Secondary</Button>
        <Button block variant="tertiary" leadingVisual={<BiDownload />}>Download File</Button>
      </Flex>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Block buttons take full width of their container.',
      },
    },
  },
};

export const LoadingWithVisuals: Story = {
  render: () => (
    <Flex wrap gap="sm">
      <Button loading leadingVisual={<BiCheck />}>Saving...</Button>
      <Button loading trailingVisual={<BiDownload />}>Downloading...</Button>
      <Button loading>Loading...</Button>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading replaces the leading visual with spinner. If only trailing visual, spinner replaces it. If no visuals, spinner overlays content.',
      },
    },
  },
};
