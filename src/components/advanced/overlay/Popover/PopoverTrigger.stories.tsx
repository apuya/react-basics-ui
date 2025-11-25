import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../../forms/Button';
import { BiCog, BiUser, BiDotsVerticalRounded } from 'react-icons/bi';

const meta: Meta<typeof Popover.Trigger> = {
  title: 'Overlay/Popover/Trigger',
  component: Popover.Trigger,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The trigger element that opens the popover when clicked. Supports custom elements and accessibility attributes.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Popover>
        <Story />
        <Popover.Content>
          <Popover.Title>Popover Content</Popover.Title>
          <Popover.Description>This is example content.</Popover.Description>
        </Popover.Content>
      </Popover>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Popover.Trigger>;

export const Default: Story = {
  render: () => (
    <Popover.Trigger>
      <Button>Open Popover</Button>
    </Popover.Trigger>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default trigger using a Button component.',
      },
    },
  },
};

export const WithIcon: Story = {
  render: () => (
    <Popover.Trigger>
      <Button variant="tertiary">
        <BiCog className="w-5 h-5" />
        Settings
      </Button>
    </Popover.Trigger>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Trigger with an icon for visual context.',
      },
    },
  },
};

export const IconOnly: Story = {
  render: () => (
    <Popover.Trigger aria-label="Open menu">
      <Button variant="tertiary" size="small">
        <BiDotsVerticalRounded className="w-5 h-5" />
      </Button>
    </Popover.Trigger>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only trigger with aria-label for accessibility.',
      },
    },
  },
};

export const UserAvatar: Story = {
  render: () => (
    <Popover.Trigger aria-label="User menu">
      <Button variant="tertiary" size="small">
        <BiUser className="w-5 h-5" />
      </Button>
    </Popover.Trigger>
  ),
  parameters: {
    docs: {
      description: {
        story: 'User avatar trigger for profile menus.',
      },
    },
  },
};

export const TextTrigger: Story = {
  render: () => (
    <Popover.Trigger className="text-blue-600 underline cursor-pointer">
      Learn more
    </Popover.Trigger>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Simple text trigger styled as a link.',
      },
    },
  },
};

export const PrimaryButton: Story = {
  render: () => (
    <Popover.Trigger>
      <Button variant="primary">Get Started</Button>
    </Popover.Trigger>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Primary button variant as trigger.',
      },
    },
  },
};
