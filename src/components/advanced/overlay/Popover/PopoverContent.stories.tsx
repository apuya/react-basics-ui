import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../../forms/Button';
import { Text } from '../../typography/Text';

const meta: Meta<typeof Popover.Content> = {
  title: 'Overlay/Popover/Content',
  component: Popover.Content,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The content container that appears when the popover is open. Supports different positions and alignments.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover.Content>;

export const Default: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Open Popover</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Default Content</Popover.Title>
        <Popover.Description>
          This is the default popover content with standard styling.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default content container with title and description.',
      },
    },
  },
};

export const TopPosition: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Top</Button>
      </Popover.Trigger>
      <Popover.Content side="top">
        <Popover.Title>Top Position</Popover.Title>
        <Popover.Description>Content appears above the trigger.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content positioned above the trigger element.',
      },
    },
  },
};

export const LeftPosition: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Left</Button>
      </Popover.Trigger>
      <Popover.Content side="left">
        <Popover.Title>Left Position</Popover.Title>
        <Popover.Description>Content appears to the left.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content positioned to the left of the trigger.',
      },
    },
  },
};

export const RightPosition: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Right</Button>
      </Popover.Trigger>
      <Popover.Content side="right">
        <Popover.Title>Right Position</Popover.Title>
        <Popover.Description>Content appears to the right.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content positioned to the right of the trigger.',
      },
    },
  },
};

export const AlignStart: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Align Start</Button>
      </Popover.Trigger>
      <Popover.Content align="start">
        <Popover.Title>Start Alignment</Popover.Title>
        <Popover.Description>Content aligned to the start of the trigger.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content aligned to the start (left) edge of the trigger.',
      },
    },
  },
};

export const AlignEnd: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Align End</Button>
      </Popover.Trigger>
      <Popover.Content align="end">
        <Popover.Title>End Alignment</Popover.Title>
        <Popover.Description>Content aligned to the end of the trigger.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content aligned to the end (right) edge of the trigger.',
      },
    },
  },
};

export const WithCustomContent: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Custom Content</Button>
      </Popover.Trigger>
      <Popover.Content className="w-80">
        <Popover.Title>Notifications</Popover.Title>
        <div className="mt-3 space-y-2">
          <Text size="small">You have 3 new messages</Text>
          <Text size="small">Meeting in 15 minutes</Text>
          <Text size="small">Task completed successfully</Text>
        </div>
        <div className="mt-4 flex justify-end">
          <Button size="small" variant="tertiary">View All</Button>
        </div>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content with custom layout including lists and actions.',
      },
    },
  },
};

export const WithCloseButton: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>With Close</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Close />
        <Popover.Title>Closeable Popover</Popover.Title>
        <Popover.Description>
          Click the X button or press Escape to close.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Content with an explicit close button.',
      },
    },
  },
};
