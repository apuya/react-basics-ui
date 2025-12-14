import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';
import { Stack } from '@/components/layout/Stack';
import { Flex } from '@/components/layout/Flex';
import { Text } from '@/components/typography/Text';
import { Heading } from '@/components/typography/Heading';
import { Divider } from '@/components/layout/Divider';

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Switch component for toggling between two states (on/off). Commonly used for settings, preferences, and binary choices.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'default', 'large'] },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// ============================================================================
// Basic Examples
// ============================================================================

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing="sm">
      <Switch size="small" label="Small" defaultChecked />
      <Switch size="default" label="Default" defaultChecked />
      <Switch size="large" label="Large" defaultChecked />
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack spacing="sm">
      <Switch label="Off (default)" />
      <Switch label="On" defaultChecked />
      <Switch label="Disabled Off" disabled />
      <Switch label="Disabled On" disabled defaultChecked />
    </Stack>
  ),
};

// ============================================================================
// Layout Patterns
// ============================================================================

export const SettingsPanel: Story = {
  render: () => (
    <Stack spacing="lg" className="w-80">
      <Stack spacing="sm">
        <Heading level="h4">Notifications</Heading>
        <Switch label="Email notifications" defaultChecked />
        <Switch label="Push notifications" defaultChecked />
        <Switch label="SMS notifications" />
      </Stack>
      <Divider />
      <Stack spacing="sm">
        <Heading level="h4">Privacy</Heading>
        <Switch label="Public profile" defaultChecked />
        <Switch label="Show online status" />
        <Switch label="Two-factor authentication" disabled defaultChecked />
      </Stack>
    </Stack>
  ),
};

export const SettingsWithDescriptions: Story = {
  render: () => (
    <Stack spacing="lg" className="w-80">
      {[
        { title: 'Email notifications', desc: 'Receive emails about activity', on: true },
        { title: 'Security alerts', desc: 'Get notified about unusual activity', on: true },
        { title: 'Marketing updates', desc: 'Receive news about products', on: false },
      ].map(({ title, desc, on }) => (
        <Flex key={title} align="start" justify="between" className="gap-3">
          <Stack spacing="none">
            <Text size="small" weight="medium">{title}</Text>
            <Text size="caption" color="secondary">{desc}</Text>
          </Stack>
          <Switch defaultChecked={on} aria-label={title} />
        </Flex>
      ))}
    </Stack>
  ),
};

// ============================================================================
// Interactive Examples
// ============================================================================

export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [isEnabled, setIsEnabled] = useState(false);

      return (
        <Stack spacing="sm">
          <Switch
            label="Enable feature"
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
          />
          <Text size="small" color="secondary">
            Status: <strong>{isEnabled ? 'Enabled' : 'Disabled'}</strong>
          </Text>
        </Stack>
      );
    };

    return <ControlledExample />;
  },
};

export const WithCallback: Story = {
  render: () => {
    const CallbackExample = () => {
      const [lastChanged, setLastChanged] = useState<string>('Never');

      return (
        <Stack spacing="sm">
          <Switch
            label="Track changes"
            onCheckedChange={(checked) => {
              setLastChanged(new Date().toLocaleTimeString());
            }}
          />
          <Text size="small" color="secondary">
            Last changed: {lastChanged}
          </Text>
        </Stack>
      );
    };

    return <CallbackExample />;
  },
};
