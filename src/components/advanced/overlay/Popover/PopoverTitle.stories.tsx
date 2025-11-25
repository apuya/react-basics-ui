import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../../forms/Button';
import { BiInfoCircle, BiStar, BiShield } from 'react-icons/bi';

const meta: Meta<typeof Popover.Title> = {
  title: 'Overlay/Popover/Title',
  component: Popover.Title,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The title heading for the popover content. Provides a clear label for the popover purpose.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover.Title>;

export const Default: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Open</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Default Title</Popover.Title>
        <Popover.Description>Supporting description text.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default title styling.',
      },
    },
  },
};

export const WithIcon: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Info</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title className="flex items-center gap-2">
          <BiInfoCircle className="w-4 h-4 text-blue-500" />
          Information
        </Popover.Title>
        <Popover.Description>Important information about this feature.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Title with a leading icon for visual context.',
      },
    },
  },
};

export const Premium: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Premium</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title className="flex items-center gap-2">
          <BiStar className="w-4 h-4 text-yellow-500" />
          Premium Feature
        </Popover.Title>
        <Popover.Description>Upgrade to access this feature.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Title indicating a premium feature.',
      },
    },
  },
};

export const Security: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Security</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title className="flex items-center gap-2">
          <BiShield className="w-4 h-4 text-green-500" />
          Security Settings
        </Popover.Title>
        <Popover.Description>Configure your security preferences.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Title for security-related popover.',
      },
    },
  },
};

export const LongTitle: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Long Title</Button>
      </Popover.Trigger>
      <Popover.Content className="w-64">
        <Popover.Title>Account Verification Required</Popover.Title>
        <Popover.Description>Please verify your email to continue.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Handling longer title text.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Custom</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title className="text-lg font-bold text-purple-600">
          Custom Styled Title
        </Popover.Title>
        <Popover.Description>With custom color and font styling.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Title with custom className styling.',
      },
    },
  },
};
