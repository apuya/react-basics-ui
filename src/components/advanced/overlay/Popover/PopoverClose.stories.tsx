import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../../forms/Button';
import { BiX, BiCheck, BiArrowLeft } from 'react-icons/bi';

const meta: Meta<typeof Popover.Close> = {
  title: 'Overlay/Popover/Close',
  component: Popover.Close,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A close button that dismisses the popover. Supports custom content and positioning.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover.Close>;

export const Default: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Open</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Close />
        <Popover.Title>Closeable Popover</Popover.Title>
        <Popover.Description>Click the X to close.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default close button with X icon.',
      },
    },
  },
};

export const CustomIcon: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Open</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Close>
          <BiArrowLeft className="w-4 h-4" />
        </Popover.Close>
        <Popover.Title>Back Arrow Close</Popover.Title>
        <Popover.Description>Custom icon for the close button.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Close button with a custom icon.',
      },
    },
  },
};

export const TextButton: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Open</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Notification</Popover.Title>
        <Popover.Description>You have a new message.</Popover.Description>
        <div className="mt-4 flex justify-end">
          <Popover.Close className="text-sm text-blue-600 hover:text-blue-800">
            Dismiss
          </Popover.Close>
        </div>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Text-based close button at the bottom.',
      },
    },
  },
};

export const WithConfirmation: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Open</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Confirm Action</Popover.Title>
        <Popover.Description>Are you sure you want to proceed?</Popover.Description>
        <div className="mt-4 flex gap-2 justify-end">
          <Popover.Close className="px-3 py-1 text-sm rounded hover:bg-gray-100">
            Cancel
          </Popover.Close>
          <Popover.Close className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
            <span className="flex items-center gap-1">
              <BiCheck className="w-4 h-4" />
              Confirm
            </span>
          </Popover.Close>
        </div>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple close buttons for cancel/confirm actions.',
      },
    },
  },
};

export const TopRightPosition: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Open</Button>
      </Popover.Trigger>
      <Popover.Content className="relative">
        <Popover.Close className="absolute top-2 right-2" />
        <Popover.Title className="pr-8">Settings</Popover.Title>
        <Popover.Description>Configure your preferences here.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Close button positioned in the top-right corner.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Popover defaultOpen>
      <Popover.Trigger>
        <Button>Open</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Close className="bg-red-100 hover:bg-red-200 rounded-full p-1">
          <BiX className="w-4 h-4 text-red-600" />
        </Popover.Close>
        <Popover.Title>Custom Close Style</Popover.Title>
        <Popover.Description>Close button with custom background and colors.</Popover.Description>
      </Popover.Content>
    </Popover>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Close button with custom styling via className.',
      },
    },
  },
};
