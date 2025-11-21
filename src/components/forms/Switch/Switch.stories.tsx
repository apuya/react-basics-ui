import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Switch component for toggling between two states (on/off). Commonly used for settings, preferences, and binary choices. Provides immediate feedback and clear visual indication of state.',
      },
    },
  },
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

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic switch with a label. Use for binary on/off settings.',
      },
    },
  },
  args: {
    label: 'Enable notifications',
  },
};

export const WithoutLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Switch without visible label. Ensure accessible name is provided via aria-label when used.',
      },
    },
  },
  args: {
    'aria-label': 'Toggle feature',
  },
};

export const Checked: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Switch in checked (on) state. Use defaultChecked for uncontrolled components.',
      },
    },
  },
  args: {
    label: 'Dark mode',
    defaultChecked: true,
  },
};

export const DisabledOff: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled switch in off state. Use when option is unavailable or locked.',
      },
    },
  },
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

export const DisabledOn: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled switch in on state showing a locked enabled setting.',
      },
    },
  },
  args: {
    label: 'Disabled enabled',
    disabled: true,
    defaultChecked: true,
  },
};

export const SettingsExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common settings panel layout with switches aligned to the right of labels.',
      },
    },
  },
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

export const NotificationSettings: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Notification preferences example showing grouped related switches.',
      },
    },
  },
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

export const PrivacySettings: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Privacy settings panel with mix of enabled, disabled, and locked options.',
      },
    },
  },
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

export const AllStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Overview of all switch states: off, on, disabled off, and disabled on.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
      <Switch label="Disabled Off" disabled />
      <Switch label="Disabled On" disabled defaultChecked />
    </div>
  ),
};

export const CompactList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Compact list layout with dividers, similar to mobile OS settings screens.',
      },
    },
  },
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

export const WithDescriptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Switches with descriptive text explaining what each option controls.',
      },
    },
  },
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

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Required switch for terms acceptance or mandatory settings. Consider using Checkbox for explicit agreement scenarios.',
      },
    },
  },
  args: {
    label: 'I agree to the terms and conditions *',
    required: true,
  },
};

