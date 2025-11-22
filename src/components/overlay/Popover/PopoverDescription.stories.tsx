import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../../forms/Button';

const meta: Meta<typeof Popover.Description> = {
  title: 'Overlay/Popover/Description',
  component: Popover.Description,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The description text for the popover content. Provides additional context and details.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover.Description>;

export const Default: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Open</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Feature Info</Popover.Title>
        <Popover.Description>
          This is a helpful description providing additional context.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default description styling.',
      },
    },
  },
};

export const LongContent: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Details</Button>
      </Popover.Trigger>
      <Popover.Content className="w-80">
        <Popover.Title>Detailed Information</Popover.Title>
        <Popover.Description>
          This is a longer description that spans multiple lines. It provides comprehensive
          information about the feature or action. The content automatically wraps and
          maintains proper spacing within the popover container.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multi-line description with longer content.',
      },
    },
  },
};

export const WithLink: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Help</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Need Help?</Popover.Title>
        <Popover.Description>
          Check our{' '}
          <a href="#" className="text-blue-600 underline hover:text-blue-800">
            documentation
          </a>{' '}
          for more details.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Description containing an inline link.',
      },
    },
  },
};

export const WithList: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Features</Button>
      </Popover.Trigger>
      <Popover.Content className="w-64">
        <Popover.Title>Included Features</Popover.Title>
        <Popover.Description>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Unlimited storage</li>
            <li>Priority support</li>
            <li>Advanced analytics</li>
          </ul>
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Description with a bulleted list.',
      },
    },
  },
};

export const Warning: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button variant="destructive">Delete</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Confirm Deletion</Popover.Title>
        <Popover.Description className="text-red-600">
          This action cannot be undone. All data will be permanently removed.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Warning description with custom color.',
      },
    },
  },
};

export const MultipleDescriptions: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Info</Button>
      </Popover.Trigger>
      <Popover.Content className="w-72">
        <Popover.Title>Account Status</Popover.Title>
        <Popover.Description>
          Your account is currently active and in good standing.
        </Popover.Description>
        <Popover.Description className="text-xs text-gray-500">
          Last updated: 5 minutes ago
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple description elements for hierarchical information.',
      },
    },
  },
};
