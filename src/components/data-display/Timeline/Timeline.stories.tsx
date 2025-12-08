import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './Timeline';
import { Icon } from '@/components/utility/Icon';
import { Avatar } from '@/components/data-display/Avatar';
import { Badge } from '@/components/feedback/Badge';
import {
  BiCheck,
  BiCart,
  BiPackage,
  BiHome,
  BiGitCommit,
  BiCodeAlt,
  BiCircle,
  BiStar,
  BiError,
  BiInfoCircle,
  BiLinkExternal,
  BiRefresh,
} from 'react-icons/bi';

const meta: Meta<typeof Timeline> = {
  title: 'Experimental/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A timeline component for displaying chronological events. Uses compound component pattern with `Timeline.Item` and `Timeline.Status`. Supports positions (left, right, alternate), sizes (sm, md, lg), variants, icons, leading elements, status areas, loading states, and disabled items.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'alternate'],
      description: 'Position of timeline items',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of timeline dots',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

// Default - simple timeline
export const Default: Story = {
  render: () => (
    <Timeline>
      <Timeline.Item title="Project Started" timestamp="Jan 1, 2024" description="Initial project setup completed." />
      <Timeline.Item title="Development Phase" timestamp="Feb 15, 2024" description="Core features implemented." />
      <Timeline.Item title="Beta Release" timestamp="Mar 20, 2024" description="First beta released to users." />
      <Timeline.Item title="Production Launch" timestamp="Apr 1, 2024" description="Official launch." isLast />
    </Timeline>
  ),
};

// Positions - left, right, alternate
export const Positions: Story = {
  parameters: {
    docs: { description: { story: 'Timeline supports left (default), right, and alternate positioning.' } },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
      {(['left', 'right', 'alternate'] as const).map((pos) => (
        <div key={pos}>
          <p style={{ fontWeight: 600, marginBottom: '1rem', textTransform: 'capitalize' }}>{pos}</p>
          <Timeline position={pos}>
            <Timeline.Item title="Step 1" timestamp="9:00 AM" />
            <Timeline.Item title="Step 2" timestamp="10:00 AM" />
            <Timeline.Item title="Step 3" timestamp="11:00 AM" isLast />
          </Timeline>
        </div>
      ))}
    </div>
  ),
};

// Sizes - sm, md, lg
export const Sizes: Story = {
  parameters: {
    docs: { description: { story: 'Timeline dots come in three sizes: sm, md (default), and lg.' } },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <p style={{ fontWeight: 600, marginBottom: '1rem' }}>
            {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}
          </p>
          <Timeline size={size}>
            <Timeline.Item icon={<Icon icon={BiCheck} size="sm" />} variant="success" title="Complete" timestamp="Now" />
            <Timeline.Item icon={<Icon icon={BiStar} size="sm" />} variant="primary" title="Active" timestamp="Now" isLast />
          </Timeline>
        </div>
      ))}
    </div>
  ),
};

// Variants - all 6 dot/connector variants
export const Variants: Story = {
  parameters: {
    docs: {
      description: { story: 'Items support 6 variants: default, primary, success, warning, error, and info.' },
    },
  },
  render: () => {
    const data = [
      { variant: 'default', icon: BiCircle, title: 'Default', desc: 'Neutral state' },
      { variant: 'primary', icon: BiStar, title: 'Primary', desc: 'Active or highlighted' },
      { variant: 'success', icon: BiCheck, title: 'Success', desc: 'Completed actions' },
      { variant: 'warning', icon: BiError, title: 'Warning', desc: 'Needs attention' },
      { variant: 'error', icon: BiError, title: 'Error', desc: 'Failed or blocked' },
      { variant: 'info', icon: BiInfoCircle, title: 'Info', desc: 'Informational' },
    ] as const;

    return (
      <Timeline>
        {data.map(({ variant, icon, title, desc }, i) => (
          <Timeline.Item
            key={variant}
            variant={variant}
            icon={<Icon icon={icon} size="sm" />}
            title={title}
            description={desc}
            isLast={i === data.length - 1}
          />
        ))}
      </Timeline>
    );
  },
};

// Features - icons, leading (Avatar, Badge), status
export const Features: Story = {
  parameters: {
    docs: { description: { story: 'Demonstrates icons, leading elements (Avatar, Badge), and status areas.' } },
  },
  render: () => (
    <Timeline>
      <Timeline.Item
        icon={<Icon icon={BiGitCommit} size="sm" />}
        variant="primary"
        title="With Icon"
        timestamp="2h ago"
        description="Display icons inside the dot using the Icon component."
      />
      <Timeline.Item
        title="With Avatar"
        leading={
          <Avatar size="sm">
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
        }
        timestamp="5h ago"
        description="Add Avatar component before the title."
      />
      <Timeline.Item
        title="With Badge"
        leading={<Badge color="primary" size="small">New</Badge>}
        timestamp="1d ago"
        description="Add Badge component before the title."
      />
      <Timeline.Item
        title="With Status Area"
        timestamp="2d ago"
        description="Add interactive status below content."
        statusIcon={BiLinkExternal}
        statusTitle="View details"
        statusDescription="Click for more information"
        statusVariant="info"
        onStatusClick={() => alert('Details clicked!')}
        isLast
      />
    </Timeline>
  ),
};

// States - loading and disabled
export const States: Story = {
  parameters: {
    docs: { description: { story: 'Timeline items support loading (skeleton) and disabled states.' } },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div>
        <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Loading</p>
        <Timeline>
          <Timeline.Item loading />
          <Timeline.Item loading />
          <Timeline.Item loading isLast />
        </Timeline>
      </div>
      <div>
        <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Disabled</p>
        <Timeline>
          <Timeline.Item icon={<Icon icon={BiCheck} size="sm" />} variant="success" title="Completed" timestamp="Done" />
          <Timeline.Item title="Pending Task" timestamp="Pending" description="Waiting for approval." disabled />
          <Timeline.Item variant="primary" title="Active" timestamp="Now" isLast />
        </Timeline>
      </div>
    </div>
  ),
};

// Real-world: Order Tracking
export const OrderTracking: Story = {
  parameters: {
    docs: { description: { story: 'Real-world example: E-commerce order tracking.' } },
  },
  render: () => (
    <Timeline>
      <Timeline.Item
        icon={<Icon icon={BiHome} size="sm" />}
        variant="default"
        title="Expected Delivery"
        timestamp="March 5, 2024"
        description="Estimated 9 AM - 5 PM"
      />
      <Timeline.Item
        icon={<Icon icon={BiPackage} size="sm" />}
        variant="primary"
        title="In Transit"
        timestamp="March 2, 2024"
        description="Package on the way."
        statusIcon={BiLinkExternal}
        statusTitle="Track package"
        statusVariant="info"
        onStatusClick={() => alert('Opening tracking...')}
      />
      <Timeline.Item
        icon={<Icon icon={BiCheck} size="sm" />}
        variant="success"
        title="Payment Confirmed"
        timestamp="March 1, 2024"
        description="Visa ending in 4242"
        statusIcon={BiLinkExternal}
        statusTitle="View receipt"
        statusVariant="success"
        onStatusClick={() => alert('Opening receipt...')}
      />
      <Timeline.Item
        icon={<Icon icon={BiCart} size="sm" />}
        variant="success"
        title="Order Placed"
        timestamp="March 1, 2024"
        description="Order #12345 - $129.99"
        isLast
      />
    </Timeline>
  ),
};

// Real-world: CI/CD Pipeline
export const BuildPipeline: Story = {
  parameters: {
    docs: { description: { story: 'Real-world example: CI/CD build pipeline.' } },
  },
  render: () => (
    <Timeline size="sm">
      <Timeline.Item
        icon={<Icon icon={BiCodeAlt} size="sm" />}
        variant="primary"
        title="Build"
        timestamp="Running..."
        description="Building production bundle..."
        statusIcon={BiRefresh}
        statusTitle="Cancel build"
        statusDescription="45% complete"
        statusVariant="warning"
        onStatusClick={() => alert('Cancelling...')}
      />
      <Timeline.Item
        icon={<Icon icon={BiCheck} size="sm" />}
        variant="success"
        title="Test"
        timestamp="02:15"
        description="156 tests passed"
        statusIcon={BiLinkExternal}
        statusTitle="View results"
        statusVariant="success"
        onStatusClick={() => alert('Opening results...')}
      />
      <Timeline.Item
        icon={<Icon icon={BiCheck} size="sm" />}
        variant="success"
        title="Install"
        timestamp="00:42"
        description="847 packages installed"
      />
      <Timeline.Item icon={<Icon icon={BiCheck} size="sm" />} variant="success" title="Checkout" timestamp="00:01" isLast />
    </Timeline>
  ),
};

// Real-world: Order Fulfilment with Avatars
export const OrderFulfilment: Story = {
  parameters: {
    docs: { description: { story: 'Real-world example: Warehouse order fulfilment with assigned workers.' } },
  },
  render: () => (
    <Timeline>
      <Timeline.Item
        icon={<Icon icon={BiHome} size="sm" />}
        variant="default"
        title="Delivery"
        timestamp="Est: Dec 2, 2024"
        description="Standard shipping (3-5 days)"
        disabled
      />
      <Timeline.Item
        icon={<Icon icon={BiCircle} size="sm" />}
        variant="default"
        title="In Transit"
        timestamp="Pending"
        disabled
      />
      <Timeline.Item
        icon={<Icon icon={BiPackage} size="sm" />}
        variant="primary"
        title="Packing"
        leading={
          <Avatar size="sm">
            <Avatar.Fallback>MG</Avatar.Fallback>
          </Avatar>
        }
        timestamp="Nov 28 - 12:00 PM"
        description="Packing at station P-04."
        statusIcon={BiRefresh}
        statusTitle="Packing status"
        statusDescription="Box: Medium • Weight: 2.4 lbs"
        statusVariant="info"
      />
      <Timeline.Item
        icon={<Icon icon={BiCheck} size="sm" />}
        variant="success"
        title="Items Picked"
        leading={
          <Avatar size="sm">
            <Avatar.Fallback>MG</Avatar.Fallback>
          </Avatar>
        }
        timestamp="Nov 28 - 11:45 AM"
        description="3 items verified."
        statusIcon={BiCheck}
        statusTitle="Pick complete"
        statusVariant="success"
      />
      <Timeline.Item
        icon={<Icon icon={BiCheck} size="sm" />}
        variant="success"
        title="Payment Processed"
        timestamp="Nov 28 - 9:16 AM"
        description="Payment captured."
      />
      <Timeline.Item
        icon={<Icon icon={BiCheck} size="sm" />}
        variant="success"
        title="Order Received"
        leading={<Badge color="success" size="small">Paid</Badge>}
        timestamp="Nov 28 - 9:15 AM"
        description="Order #ORD-2024-78543 - $247.50"
        statusIcon={BiLinkExternal}
        statusTitle="View order"
        statusVariant="success"
        onStatusClick={() => alert('Opening order...')}
        isLast
      />
    </Timeline>
  ),
};
