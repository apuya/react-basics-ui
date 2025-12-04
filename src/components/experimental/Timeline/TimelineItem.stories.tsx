import type { Meta, StoryObj } from '@storybook/react';
import { TimelineItem } from './TimelineItem';
import { Icon } from '@/components/basic/utility/Icon';
import { Avatar } from '@/components/basic/data-display/Avatar';
import { Badge } from '@/components/basic/feedback/Badge';
import { BiCheck, BiGitCommit, BiLinkExternal } from 'react-icons/bi';

const meta: Meta<typeof TimelineItem> = {
  title: 'Experimental/Timeline/TimelineItem',
  component: TimelineItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Individual timeline item component. Typically used within `<Timeline>` but can be used standalone for single-item displays. See Timeline stories for comprehensive examples.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    timestamp: { control: 'text' },
    description: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
    },
    isLast: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  decorators: [(Story) => <div style={{ maxWidth: 500 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof TimelineItem>;

// Default standalone item
export const Default: Story = {
  args: {
    title: 'Timeline Item',
    timestamp: '2 hours ago',
    description: 'A standalone timeline item with default styling.',
    isLast: true,
  },
};

// With all features using proper components
export const WithFeatures: Story = {
  parameters: {
    docs: { description: { story: 'Demonstrates Icon, Avatar, and status area using library components.' } },
  },
  args: {
    icon: <Icon icon={BiGitCommit} size="sm" />,
    variant: 'success',
    title: 'Feature Complete',
    timestamp: '1 hour ago',
    description: 'All features demonstrated using library components.',
    leading: (
      <Avatar size="sm">
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
    ),
    statusIcon: BiLinkExternal,
    statusTitle: 'View details',
    statusDescription: 'Click for more information',
    statusVariant: 'success',
    onStatusClick: () => alert('Status clicked!'),
    isLast: true,
  },
};

// With Badge as leading
export const WithBadge: Story = {
  parameters: {
    docs: { description: { story: 'Using Badge component as leading element.' } },
  },
  args: {
    icon: <Icon icon={BiCheck} size="sm" />,
    variant: 'success',
    title: 'Task Completed',
    timestamp: '30 min ago',
    description: 'Badge component used as leading element.',
    leading: <Badge color="success" size="small">Done</Badge>,
    isLast: true,
  },
};

// With children
export const WithChildren: Story = {
  parameters: {
    docs: { description: { story: 'Pass children to render additional content below the description.' } },
  },
  args: {
    icon: <Icon icon={BiGitCommit} size="sm" />,
    variant: 'primary',
    title: 'Commit Details',
    timestamp: '2 hours ago',
    description: 'Additional content rendered as children.',
    isLast: true,
  },
  render: (args: typeof WithChildren.args) => (
    <TimelineItem {...args}>
      <div
        style={{
          marginTop: '0.5rem',
          padding: '0.75rem',
          backgroundColor: 'var(--semantic-surface-alt)',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
        }}
      >
        <p><strong>Commit:</strong> abc123def</p>
        <p><strong>Author:</strong> developer@example.com</p>
        <p><strong>Files:</strong> 5 changed</p>
      </div>
    </TimelineItem>
  ),
};

// Loading state
export const Loading: Story = {
  args: { loading: true, isLast: true },
  parameters: {
    docs: { description: { story: 'Skeleton loading state while data is being fetched.' } },
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    icon: <Icon icon={BiCheck} size="sm" />,
    title: 'Disabled Item',
    timestamp: 'Pending',
    description: 'This item is disabled and non-interactive.',
    statusTitle: 'Cannot interact',
    statusVariant: 'default',
    disabled: true,
    isLast: true,
  },
  parameters: {
    docs: { description: { story: 'Disabled items are visually dimmed and non-interactive.' } },
  },
};
