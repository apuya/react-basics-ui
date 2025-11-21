import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Forms/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// Default
export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

// Without Label
export const WithoutLabel: Story = {
  args: {},
};

// Checked
export const Checked: Story = {
  args: {
    label: 'Dark mode',
    defaultChecked: true,
  },
};

// Disabled Off
export const DisabledOff: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

// Disabled On
export const DisabledOn: Story = {
  args: {
    label: 'Disabled enabled',
    disabled: true,
    defaultChecked: true,
  },
};

// Settings Example
export const SettingsExample: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div className="flex items-center justify-between">
        <span className="text-sm">Dark mode</span>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Notifications</span>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Auto-save</span>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Analytics</span>
        <Switch disabled />
      </div>
    </div>
  ),
};

// Notification Settings
export const NotificationSettings: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <h3 className="text-sm font-semibold">Notification Preferences</h3>
      <div className="space-y-3">
        <Switch label="Email notifications" defaultChecked />
        <Switch label="Push notifications" defaultChecked />
        <Switch label="SMS notifications" />
        <Switch label="Marketing emails" />
      </div>
    </div>
  ),
};

// Privacy Settings
export const PrivacySettings: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <h3 className="text-sm font-semibold">Privacy Settings</h3>
      <div className="space-y-3">
        <Switch label="Public profile" defaultChecked />
        <Switch label="Show online status" defaultChecked />
        <Switch label="Allow search engines to index" />
        <Switch label="Two-factor authentication" disabled defaultChecked />
      </div>
    </div>
  ),
};

// All States
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
      <Switch label="Disabled Off" disabled />
      <Switch label="Disabled On" disabled defaultChecked />
    </div>
  ),
};

// Compact List
export const CompactList: Story = {
  render: () => (
    <div className="divide-y w-64">
      <div className="flex items-center justify-between py-3">
        <span className="text-sm">WiFi</span>
        <Switch defaultChecked />
      </div>
      <div className="flex items-center justify-between py-3">
        <span className="text-sm">Bluetooth</span>
        <Switch />
      </div>
      <div className="flex items-center justify-between py-3">
        <span className="text-sm">Airplane mode</span>
        <Switch />
      </div>
      <div className="flex items-center justify-between py-3">
        <span className="text-sm">Mobile data</span>
        <Switch defaultChecked />
      </div>
    </div>
  ),
};

// With Descriptions
export const WithDescriptions: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Email notifications</p>
          <p className="text-xs text-gray-500">Receive emails about your account activity</p>
        </div>
        <Switch defaultChecked />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Security alerts</p>
          <p className="text-xs text-gray-500">Get notified about unusual account activity</p>
        </div>
        <Switch defaultChecked />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Marketing updates</p>
          <p className="text-xs text-gray-500">Receive news about products and features</p>
        </div>
        <Switch />
      </div>
    </div>
  ),
};
