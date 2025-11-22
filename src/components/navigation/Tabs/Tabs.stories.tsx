import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tabs organize content into multiple sections and allow users to navigate between them. Supports multiple visual variants (default, line, enclosed, soft), sizes (sm, md, lg), and horizontal/vertical orientations.',
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
    variant: {
      control: 'select',
      options: ['default', 'line', 'enclosed', 'soft'],
      description: 'Visual style variant of the tabs',
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

export const LineVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Line variant with underline indicator. Clean, minimal style for content-heavy interfaces.',
      },
    },
  },
  render: () => (
    <Tabs defaultValue="overview" variant="line">
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
        <Tabs.Tab value="reports">Reports</Tabs.Tab>
        <Tabs.Tab value="notifications">Notifications</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="overview">Overview content</Tabs.Panel>
        <Tabs.Panel value="analytics">Analytics dashboard</Tabs.Panel>
        <Tabs.Panel value="reports">Reports and insights</Tabs.Panel>
        <Tabs.Panel value="notifications">Notification settings</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

export const EnclosedVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Enclosed variant with bordered tabs. Good for card-style layouts where tabs connect to content below.',
      },
    },
  },
  render: () => (
    <Tabs defaultValue="profile" variant="enclosed">
      <Tabs.List>
        <Tabs.Tab value="profile">Profile</Tabs.Tab>
        <Tabs.Tab value="billing">Billing</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="profile">
          <div className="p-4 border border-t-0 rounded-b-md">
            <h4 className="font-medium mb-2">Profile Information</h4>
            <p className="text-sm text-gray-600">Update your personal details.</p>
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="billing">
          <div className="p-4 border border-t-0 rounded-b-md">
            <h4 className="font-medium mb-2">Billing Information</h4>
            <p className="text-sm text-gray-600">Manage your subscription and invoices.</p>
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="settings">
          <div className="p-4 border border-t-0 rounded-b-md">
            <h4 className="font-medium mb-2">Application Settings</h4>
            <p className="text-sm text-gray-600">Configure your preferences.</p>
          </div>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

export const SoftVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Soft variant with subtle background highlights. Provides a gentle, modern appearance.',
      },
    },
  },
  render: () => (
    <Tabs defaultValue="general" variant="soft">
      <Tabs.List>
        <Tabs.Tab value="general">General</Tabs.Tab>
        <Tabs.Tab value="security">Security</Tabs.Tab>
        <Tabs.Tab value="integrations">Integrations</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="general">General settings panel</Tabs.Panel>
        <Tabs.Panel value="security">Security configurations</Tabs.Panel>
        <Tabs.Panel value="integrations">Third-party integrations</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

export const SmallSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small-sized tabs for compact UIs or secondary navigation.',
      },
    },
  },
  render: () => (
    <Tabs defaultValue="tab1" size="sm">
      <Tabs.List>
        <Tabs.Tab value="tab1">Tab One</Tabs.Tab>
        <Tabs.Tab value="tab2">Tab Two</Tabs.Tab>
        <Tabs.Tab value="tab3">Tab Three</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="tab1">Small tab content 1</Tabs.Panel>
        <Tabs.Panel value="tab2">Small tab content 2</Tabs.Panel>
        <Tabs.Panel value="tab3">Small tab content 3</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

export const LargeSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Large-sized tabs for prominent primary navigation.',
      },
    },
  },
  render: () => (
    <Tabs defaultValue="tab1" size="lg">
      <Tabs.List>
        <Tabs.Tab value="tab1">Tab One</Tabs.Tab>
        <Tabs.Tab value="tab2">Tab Two</Tabs.Tab>
        <Tabs.Tab value="tab3">Tab Three</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="tab1">Large tab content 1</Tabs.Panel>
        <Tabs.Panel value="tab2">Large tab content 2</Tabs.Panel>
        <Tabs.Panel value="tab3">Large tab content 3</Tabs.Panel>
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
        story: 'Tabs with icons for enhanced visual recognition. Pass icons via the icon prop.',
      },
    },
  },
  render: () => (
    <Tabs defaultValue="home">
      <Tabs.List>
        <Tabs.Tab value="home" icon={<span>🏠</span>}>
          Home
        </Tabs.Tab>
        <Tabs.Tab value="messages" icon={<span>💬</span>}>
          Messages
        </Tabs.Tab>
        <Tabs.Tab value="settings" icon={<span>⚙️</span>}>
          Settings
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="home">Home content</Tabs.Panel>
        <Tabs.Panel value="messages">Messages content</Tabs.Panel>
        <Tabs.Panel value="settings">Settings content</Tabs.Panel>
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
        <Tabs.Panel value="active">This tab is active</Tabs.Panel>
        <Tabs.Panel value="disabled">This tab is disabled</Tabs.Panel>
        <Tabs.Panel value="another">Another active tab</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all tab sizes (sm, md, lg) with the soft variant to demonstrate button-like appearance.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm font-medium mb-2">Small</p>
        <Tabs defaultValue="tab1" size="sm" variant="soft">
          <Tabs.List>
            <Tabs.Tab value="tab1">Account</Tabs.Tab>
            <Tabs.Tab value="tab2">Password</Tabs.Tab>
            <Tabs.Tab value="tab3">Team</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Medium (default)</p>
        <Tabs defaultValue="tab1" size="md" variant="soft">
          <Tabs.List>
            <Tabs.Tab value="tab1">Account</Tabs.Tab>
            <Tabs.Tab value="tab2">Password</Tabs.Tab>
            <Tabs.Tab value="tab3">Team</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">Large</p>
        <Tabs defaultValue="tab1" size="lg" variant="soft">
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
