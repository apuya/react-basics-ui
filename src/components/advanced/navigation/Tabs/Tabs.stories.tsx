import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { BiHome, BiChat, BiCog } from 'react-icons/bi';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tabs organize content into multiple sections and allow users to navigate between them. Supports sizes (sm, md, lg) and horizontal/vertical orientations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default selected tab value (uncontrolled mode)',
    },
    value: {
      control: 'text',
      description: 'The selected tab value (controlled mode)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tab labels',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation of the tabs',
    },
    onChange: {
      action: 'onChange',
      description: 'Callback when the selected tab changes',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic tabs with default styling. Uses uncontrolled mode with defaultValue.',
      },
    },
  },
  render: () => (
    <Tabs defaultValue="tab1">
      <Tabs.List>
        <Tabs.Tab value="tab1">Account</Tabs.Tab>
        <Tabs.Tab value="tab2">Password</Tabs.Tab>
        <Tabs.Tab value="tab3">Team</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="tab1">
          <div className="py-4">
            <h3 className="text-lg font-medium mb-2">Account Settings</h3>
            <p className="text-sm text-gray-600">
              Manage your account settings and preferences here.
            </p>
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="tab2">
          <div className="py-4">
            <h3 className="text-lg font-medium mb-2">Password Settings</h3>
            <p className="text-sm text-gray-600">
              Change your password and update security settings.
            </p>
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="tab3">
          <div className="py-4">
            <h3 className="text-lg font-medium mb-2">Team Settings</h3>
            <p className="text-sm text-gray-600">
              Manage your team members and permissions.
            </p>
          </div>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Vertical orientation for sidebar-style navigation. Tabs stack vertically with content to the side.',
      },
    },
  },
  render: () => (
    <Tabs defaultValue="dashboard" orientation="vertical">
      <Tabs.List>
        <Tabs.Tab value="dashboard">Dashboard</Tabs.Tab>
        <Tabs.Tab value="projects">Projects</Tabs.Tab>
        <Tabs.Tab value="tasks">Tasks</Tabs.Tab>
        <Tabs.Tab value="calendar">Calendar</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="dashboard">
          <div className="p-4">
            <h3 className="font-semibold mb-2">Dashboard</h3>
            <p>Your main dashboard overview.</p>
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="projects">
          <div className="p-4">
            <h3 className="font-semibold mb-2">Projects</h3>
            <p>View and manage your projects.</p>
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="tasks">
          <div className="p-4">
            <h3 className="font-semibold mb-2">Tasks</h3>
            <p>Track and complete your tasks.</p>
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="calendar">
          <div className="p-4">
            <h3 className="font-semibold mb-2">Calendar</h3>
            <p>View your schedule and events.</p>
          </div>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tabs with leading icons for enhanced visual recognition.',
      },
    },
  },
  render: () => (
    <Tabs defaultValue="home">
      <Tabs.List>
        <Tabs.Tab value="home" leadingIcon={<BiHome />}>
          Home
        </Tabs.Tab>
        <Tabs.Tab value="messages" leadingIcon={<BiChat />}>
          Messages
        </Tabs.Tab>
        <Tabs.Tab value="settings" leadingIcon={<BiCog />}>
          Settings
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="home"><div className="py-4">Home content</div></Tabs.Panel>
        <Tabs.Panel value="messages"><div className="py-4">Messages content</div></Tabs.Panel>
        <Tabs.Panel value="settings"><div className="py-4">Settings content</div></Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates disabled tab states. Disabled tabs cannot be selected.',
      },
    },
  },
  render: () => (
    <Tabs defaultValue="active">
      <Tabs.List>
        <Tabs.Tab value="active">Active Tab</Tabs.Tab>
        <Tabs.Tab value="disabled" disabled>
          Disabled Tab
        </Tabs.Tab>
        <Tabs.Tab value="another">Another Tab</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="active"><div className="py-4">This tab is active</div></Tabs.Panel>
        <Tabs.Panel value="disabled"><div className="py-4">This tab is disabled</div></Tabs.Panel>
        <Tabs.Panel value="another"><div className="py-4">Another active tab</div></Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all tab sizes: small, medium (default), and large.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm font-medium mb-2">Small</p>
        <Tabs defaultValue="tab1" size="sm">
          <Tabs.List>
            <Tabs.Tab value="tab1">Account</Tabs.Tab>
            <Tabs.Tab value="tab2">Password</Tabs.Tab>
            <Tabs.Tab value="tab3">Team</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Medium (default)</p>
        <Tabs defaultValue="tab1" size="md">
          <Tabs.List>
            <Tabs.Tab value="tab1">Account</Tabs.Tab>
            <Tabs.Tab value="tab2">Password</Tabs.Tab>
            <Tabs.Tab value="tab3">Team</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Large</p>
        <Tabs defaultValue="tab1" size="lg">
          <Tabs.List>
            <Tabs.Tab value="tab1">Account</Tabs.Tab>
            <Tabs.Tab value="tab2">Password</Tabs.Tab>
            <Tabs.Tab value="tab3">Team</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
    </div>
  ),
};
