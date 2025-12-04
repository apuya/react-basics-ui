import type { Meta, StoryObj } from '@storybook/react';
import { TimelineStatus } from './TimelineStatus';
import { Icon } from '@/components/basic/utility/Icon';
import { Stack } from '@/components/basic/layout/Stack';
import { BiCheck, BiError, BiInfoCircle, BiLinkExternal, BiRefresh, BiEdit, BiTrash } from 'react-icons/bi';

const meta: Meta<typeof TimelineStatus> = {
  title: 'Experimental/Timeline/TimelineStatus',
  component: TimelineStatus,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A status area sub-component for Timeline items. Displays actionable information with icons, titles, and descriptions. Typically used via TimelineItem props but can be used standalone.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof TimelineStatus>;

// Default
export const Default: Story = {
  args: {
    icon: BiLinkExternal,
    title: 'View details',
    description: 'Click to see more information',
    variant: 'default',
    onClick: () => alert('Clicked!'),
  },
};

// All variants
export const Variants: Story = {
  parameters: {
    docs: { description: { story: 'All 5 variants: default, info, success, warning, and error.' } },
  },
  render: () => (
    <Stack gap="sm" className="w-80">
      {[
        { variant: 'default' as const, icon: BiLinkExternal, title: 'Default' },
        { variant: 'info' as const, icon: BiInfoCircle, title: 'Info' },
        { variant: 'success' as const, icon: BiCheck, title: 'Success' },
        { variant: 'warning' as const, icon: BiError, title: 'Warning' },
        { variant: 'error' as const, icon: BiError, title: 'Error' },
      ].map(({ variant, icon, title }) => (
        <TimelineStatus
          key={variant}
          icon={icon}
          title={`${title} action`}
          description={`${title} status description`}
          variant={variant}
          onClick={() => alert(`${variant} clicked`)}
        />
      ))}
    </Stack>
  ),
};

// Sizes
export const Sizes: Story = {
  parameters: {
    docs: { description: { story: 'Three sizes: sm, md (default), and lg.' } },
  },
  render: () => (
    <Stack gap="sm" className="w-80">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <TimelineStatus
          key={size}
          icon={BiCheck}
          title={`${size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'} size`}
          description="Size affects text and icon"
          variant="success"
          size={size}
          onClick={() => {}}
        />
      ))}
    </Stack>
  ),
};

// Interactive states
export const Interactive: Story = {
  parameters: {
    docs: { description: { story: 'Status can be interactive (onClick/href) or display-only.' } },
  },
  render: () => (
    <Stack gap="sm" className="w-80">
      <TimelineStatus
        icon={BiLinkExternal}
        title="With onClick"
        description="Triggers an action"
        variant="info"
        onClick={() => alert('Clicked!')}
      />
      <TimelineStatus
        icon={BiLinkExternal}
        title="With href"
        description="Navigates to a URL"
        variant="info"
        href="/destination"
      />
      <TimelineStatus
        icon={BiInfoCircle}
        title="Display only"
        description="No interaction"
        variant="default"
      />
    </Stack>
  ),
};

// Disabled
export const Disabled: Story = {
  parameters: {
    docs: { description: { story: 'Disabled status areas are visually muted.' } },
  },
  render: () => (
    <Stack gap="sm" className="w-80">
      <TimelineStatus
        icon={BiEdit}
        title="Edit disabled"
        description="Cannot edit at this time"
        variant="default"
        onClick={() => {}}
        disabled
      />
      <TimelineStatus
        icon={BiTrash}
        title="Delete disabled"
        description="Item cannot be deleted"
        variant="error"
        onClick={() => {}}
        disabled
      />
    </Stack>
  ),
};

// Custom icon element using Icon component
export const CustomIcon: Story = {
  parameters: {
    docs: { description: { story: 'Use iconElement with Icon component for custom styling.' } },
  },
  render: () => (
    <Stack gap="sm" className="w-80">
      <TimelineStatus
        iconElement={<Icon icon={BiRefresh} size="sm" className="animate-spin" />}
        title="Processing..."
        description="Please wait"
        variant="info"
      />
    </Stack>
  ),
};
