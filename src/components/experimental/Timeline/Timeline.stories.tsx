import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from './Timeline';
import { Icon } from '@/components/basic/utility/Icon';
import { Avatar } from '@/components/basic/data-display/Avatar';
import { Badge } from '@/components/basic/feedback/Badge';
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
          'Timeline displays chronological events with customizable dots, connectors, and content. **Compound component pattern**: use `Timeline`, `Timeline.Item`, and `Timeline.Status`. Supports left/right/alternate positioning, 3 sizes, 6 variants, icons, loading/disabled states, and interactive status areas with proper link/button semantics.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'alternate'],
      description: 'Position of timeline items relative to connector line',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of timeline dots and icons',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

// Default - simple timeline with all positions
export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Basic timeline with left (default), right, and alternate positioning.' } },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
      {(['left', 'right', 'alternate'] as const).map((pos) => (
        <div key={pos}>
          <p style={{ fontWeight: 600, marginBottom: '1rem', textTransform: 'capitalize' }}>{pos}</p>
          <Timeline position={pos}>
            <Timeline.Item title="Project Started" timestamp="Jan 1" description="Initial setup completed." />
            <Timeline.Item title="Development" timestamp="Feb 15" description="Core features done." />
            <Timeline.Item title="Production" timestamp="Apr 1" isLast />
          </Timeline>
        </div>
      ))}
    </div>
  ),
};

// Sizes & Variants - combined demonstration
export const SizesAndVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Timeline supports 3 sizes (sm, md, lg) and 6 variants (default, primary, success, warning, error, info). Variants affect dot and connector colors.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <p style={{ fontWeight: 600, marginBottom: '1rem' }}>
            {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}
          </p>
          <Timeline size={size}>
            <Timeline.Item variant="default" title="Default" timestamp="Now" />
            <Timeline.Item icon={<Icon icon={BiStar} size="sm" />} variant="primary" title="Primary" timestamp="1h" />
            <Timeline.Item icon={<Icon icon={BiCheck} size="sm" />} variant="success" title="Success" timestamp="2h" />
            <Timeline.Item icon={<Icon icon={BiError} size="sm" />} variant="warning" title="Warning" timestamp="3h" />
            <Timeline.Item icon={<Icon icon={BiError} size="sm" />} variant="error" title="Error" timestamp="4h" />
            <Timeline.Item icon={<Icon icon={BiInfoCircle} size="sm" />} variant="info" title="Info" timestamp="5h" isLast />
          </Timeline>
        </div>
      ))}
    </div>
  ),
};

// Features - icons, leading elements, status areas, states
export const Features: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates icons, leading elements (Avatar, Badge), interactive status areas, loading skeletons, and disabled items. Shows `Timeline.Item` and `Timeline.Status` usage.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div>
        <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Icons, Leading & Status</p>
        <Timeline>
          <Timeline.Item
            icon={<Icon icon={BiGitCommit} size="sm" />}
            variant="primary"
            title="With Icon"
            timestamp="2h ago"
            description="Icons display inside the dot."
          />
          <Timeline.Item
            title="With Avatar"
            leading={
              <Avatar size="sm">
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
            }
            timestamp="5h ago"
            description="Leading element before title."
          />
          <Timeline.Item
            title="With Badge"
            leading={<Badge color="primary" size="small">New</Badge>}
            timestamp="1d ago"
            description="Badge as leading element."
          />
          <Timeline.Item
            variant="info"
            title="With Status"
            timestamp="2d ago"
            description="Interactive status area below."
            statusIcon={BiLinkExternal}
            statusTitle="View details"
            statusDescription="Click for more"
            statusVariant="info"
            onStatusClick={() => alert('Details!')}
            isLast
          />
        </Timeline>
      </div>

      <div>
        <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Loading & Disabled</p>
        <Timeline>
          <Timeline.Item loading />
          <Timeline.Item loading />
          <Timeline.Item icon={<Icon icon={BiCheck} size="sm" />} variant="success" title="Completed" timestamp="Done" />
          <Timeline.Item title="Disabled Task" timestamp="Pending" description="Waiting approval." disabled />
          <Timeline.Item variant="primary" title="Active" timestamp="Now" isLast />
        </Timeline>
      </div>
    </div>
  ),
};

// Subcomponent Usage - Timeline.Item and Timeline.Status
export const SubcomponentUsage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Direct usage of `Timeline.Item` and `Timeline.Status` subcomponents. Status can be interactive (button with onClick, anchor with href) or static (div). Using href renders a proper anchor tag for better accessibility and SPA routing support.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div>
        <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Timeline.Item Props</p>
        <Timeline>
          <Timeline.Item
            icon={<Icon icon={BiCheck} size="sm" />}
            variant="success"
            title="Step completed"
            timestamp="2 hours ago"
            description="All tasks finished successfully."
          />
          <Timeline.Item dot={<Badge color="warning" size="small">!</Badge>} title="Custom dot" timestamp="1 hour ago" />
          <Timeline.Item title="Minimal item" isLast />
        </Timeline>
      </div>

      <div>
        <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Timeline.Status Variants</p>
        <Timeline size="sm">
          <Timeline.Item title="Default status" timestamp="Now">
            <Timeline.Status title="Default" description="Non-interactive status" />
          </Timeline.Item>
          <Timeline.Item title="Info status" timestamp="1h">
            <Timeline.Status icon={BiInfoCircle} title="Information" variant="info" onClick={() => alert('Info!')} />
          </Timeline.Item>
          <Timeline.Item title="Link status" timestamp="2h">
            <Timeline.Status icon={BiLinkExternal} title="View docs" description="Opens in same tab" variant="primary" href="#docs" />
          </Timeline.Item>
          <Timeline.Item title="Success status" timestamp="3h">
            <Timeline.Status icon={BiCheck} title="Complete" description="All done" variant="success" />
          </Timeline.Item>
          <Timeline.Item title="Error status" timestamp="4h">
            <Timeline.Status icon={BiError} title="Failed" variant="error" onClick={() => alert('Error details')} isLast />
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  ),
};

// Interactive Status - href vs onClick
export const InteractiveStatus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive status areas can use `onClick` (renders button) or `href` (renders anchor tag). Using `href` provides better SPA routing support, allows right-click \"Open in new tab\", and improves SEO. Both support keyboard navigation and focus management.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div>
        <p style={{ fontWeight: 600, marginBottom: '1rem' }}>With onClick (Button)</p>
        <Timeline>
          <Timeline.Item
            variant="info"
            title="View Details"
            timestamp="Now"
            description="Click handler triggers alert"
            statusIcon={BiInfoCircle}
            statusTitle="Show details"
            statusDescription="Rendered as button"
            statusVariant="info"
            onStatusClick={() => alert('Button clicked!')}
          />
          <Timeline.Item
            variant="success"
            title="Complete Task"
            timestamp="5m ago"
            description="Interactive button with success variant"
            statusIcon={BiCheck}
            statusTitle="Mark complete"
            statusVariant="success"
            onStatusClick={() => alert('Task completed!')}
            isLast
          />
        </Timeline>
      </div>

      <div>
        <p style={{ fontWeight: 600, marginBottom: '1rem' }}>With href (Anchor)</p>
        <Timeline>
          <Timeline.Item
            variant="primary"
            title="Documentation"
            timestamp="Now"
            description="Link to external resource"
            statusIcon={BiLinkExternal}
            statusTitle="View docs"
            statusDescription="Rendered as anchor tag"
            statusVariant="primary"
            statusHref="https://example.com/docs"
          />
          <Timeline.Item
            variant="info"
            title="Report"
            timestamp="10m ago"
            description="Navigate to report page"
            statusIcon={BiLinkExternal}
            statusTitle="Open report"
            statusVariant="info"
            statusHref="#report"
            isLast
          />
        </Timeline>
      </div>
    </div>
  ),
};

// Data Attributes for CSS Targeting
export const DataAttributes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Timeline components expose data attributes for CSS targeting and debugging: `data-position`, `data-size`, `data-variant`, `data-has-icon`, `data-interactive`, `data-disabled`, `data-loading`, `data-last`. Check DevTools to see attributes on each element.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div>
        <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Item States</p>
        <Timeline>
          <Timeline.Item
            icon={<Icon icon={BiCheck} size="sm" />}
            variant="success"
            title="With Icon"
            timestamp="Now"
            description="has data-has-icon attribute"
          />
          <Timeline.Item
            title="Disabled Item"
            timestamp="1h ago"
            description="has data-disabled attribute"
            disabled
          />
          <Timeline.Item
            title="Loading Item"
            timestamp="2h ago"
            description="has data-loading attribute"
            loading
          />
          <Timeline.Item
            variant="primary"
            title="Last Item"
            timestamp="3h ago"
            description="has data-last attribute"
            isLast
          />
        </Timeline>
      </div>

      <div>
        <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Status Interactive</p>
        <Timeline>
          <Timeline.Item title="Non-interactive" timestamp="Now">
            <Timeline.Status title="Static status" description="No data-interactive" />
          </Timeline.Item>
          <Timeline.Item title="With onClick" timestamp="1h">
            <Timeline.Status
              title="Button status"
              description="has data-interactive"
              variant="info"
              onClick={() => alert('Clicked!')}
            />
          </Timeline.Item>
          <Timeline.Item title="With href" timestamp="2h">
            <Timeline.Status
              title="Link status"
              description="has data-interactive"
              variant="primary"
              href="#link"
            />
          </Timeline.Item>
          <Timeline.Item title="Disabled status" timestamp="3h">
            <Timeline.Status
              title="Disabled"
              description="has data-disabled"
              variant="warning"
              disabled
              isLast
            />
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  ),
};

// Real-world Example: Order Tracking
export const OrderTracking: Story = {
  parameters: {
    docs: { description: { story: 'E-commerce order tracking with icons, variants, and interactive status areas.' } },
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
        statusHref="#tracking"
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

// Real-world Example: Build Pipeline & Order Fulfillment
export const RealWorldExamples: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Two real-world examples: CI/CD build pipeline (left) and warehouse order fulfillment with avatars (right).',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div>
        <p style={{ fontWeight: 600, marginBottom: '1rem' }}>CI/CD Build Pipeline</p>
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
      </div>

      <div>
        <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Warehouse Order Fulfillment</p>
        <Timeline size="sm">
          <Timeline.Item
            icon={<Icon icon={BiHome} size="sm" />}
            variant="default"
            title="Delivery"
            timestamp="Est: Dec 2"
            disabled
          />
          <Timeline.Item icon={<Icon icon={BiCircle} size="sm" />} variant="default" title="In Transit" disabled />
          <Timeline.Item
            icon={<Icon icon={BiPackage} size="sm" />}
            variant="primary"
            title="Packing"
            leading={
              <Avatar size="sm">
                <Avatar.Fallback>MG</Avatar.Fallback>
              </Avatar>
            }
            timestamp="12:00 PM"
            description="Packing at station P-04"
            statusIcon={BiRefresh}
            statusTitle="Packing status"
            statusDescription="Box: Medium • 2.4 lbs"
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
            timestamp="11:45 AM"
            description="3 items verified"
          />
          <Timeline.Item
            icon={<Icon icon={BiCheck} size="sm" />}
            variant="success"
            title="Order Received"
            leading={<Badge color="success" size="small">Paid</Badge>}
            timestamp="9:15 AM"
            description="Order #ORD-78543 - $247.50"
            isLast
          />
        </Timeline>
      </div>
    </div>
  ),
};
