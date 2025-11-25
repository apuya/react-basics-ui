import type { Meta, StoryObj } from '@storybook/react';
import { TimelineItem } from './Timeline';
import { BiCheck } from 'react-icons/bi';

const meta: Meta<typeof TimelineItem> = {
  title: 'Experimental/Timeline/TimelineItem',
  component: TimelineItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Individual timeline item component. Should be used within a Timeline component.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
      description: 'Visual variant of the timeline dot',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimelineItem>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <TimelineItem
        title="Event Title"
        timestamp="2 hours ago"
        description="This is a timeline item with title, timestamp, and description."
        isLast
      />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <TimelineItem
        icon={<BiCheck />}
        variant="success"
        title="Task Completed"
        timestamp="10 minutes ago"
        description="The task was completed successfully."
        isLast
      />
    </div>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <TimelineItem
        variant="primary"
        title="Custom Content"
        timestamp="1 day ago"
        isLast
      >
        <div style={{ marginTop: '0.5rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.5rem' }}>
          <p style={{ fontSize: '0.875rem' }}>You can add any custom content here.</p>
        </div>
      </TimelineItem>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TimelineItem variant="default" title="Default" timestamp="Now" isLast />
      <TimelineItem variant="primary" title="Primary" timestamp="Now" isLast />
      <TimelineItem variant="success" title="Success" timestamp="Now" isLast />
      <TimelineItem variant="warning" title="Warning" timestamp="Now" isLast />
      <TimelineItem variant="error" title="Error" timestamp="Now" isLast />
      <TimelineItem variant="info" title="Info" timestamp="Now" isLast />
    </div>
  ),
};
