import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { Stack } from '../../layout/Stack';
import { Flex } from '../../layout/Flex';
import { Text } from '../../typography/Text';
import { Heading } from '../../typography/Heading';
import { Divider } from '../../layout/Divider';

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

