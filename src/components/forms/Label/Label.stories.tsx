import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { Input } from '../Input/Input';
import { Checkbox } from '../Checkbox/Checkbox';
import { Stack } from '../../layout/Stack';
import { Heading } from '../../typography/Heading';

const meta: Meta<typeof Label> = {
  title: 'Forms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Label component for form inputs, providing accessible labels with customizable sizing, weight, colors, and required indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'default', 'large'] },
    weight: { control: 'select', options: ['normal', 'medium', 'semibold'] },
    color: { control: 'select', options: ['default', 'secondary', 'error', 'disabled'] },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

// ============================================================================
// Basic Examples
// ============================================================================

export const Default: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'email',
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing="md">
      <Label size="small">Small Label</Label>
      <Label size="default">Default Label</Label>
      <Label size="large">Large Label</Label>
    </Stack>
  ),
};

export const Weights: Story = {
  render: () => (
    <Stack spacing="md">
      <Label weight="normal">Normal Weight</Label>
      <Label weight="medium">Medium Weight</Label>
      <Label weight="semibold">Semibold Weight</Label>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack spacing="md">
      <Label>Default</Label>
      <Label required>Required</Label>
      <Label color="secondary">Secondary</Label>
      <Label color="error">Error</Label>
      <Label disabled>Disabled</Label>
    </Stack>
  ),
};

// ============================================================================
// With Form Controls
// ============================================================================

export const WithInput: Story = {
  render: () => (
    <Stack spacing="lg" className="w-80">
      <Stack spacing="sm">
        <Label htmlFor="username" required>Username</Label>
        <Input id="username" placeholder="Enter your username" />
      </Stack>
      <Stack spacing="sm">
        <Label htmlFor="email-error" color="error" required>Email Address</Label>
        <Input id="email-error" error defaultValue="invalid-email" />
      </Stack>
    </Stack>
  ),
};

export const FormSection: Story = {
  render: () => (
    <Stack spacing="lg" className="w-96">
      <Stack spacing="md">
        <Label size="large" weight="semibold">Personal Information</Label>
        <Stack spacing="sm">
          <Label htmlFor="first-name" required>First Name</Label>
          <Input id="first-name" />
        </Stack>
        <Stack spacing="sm">
          <Label htmlFor="last-name" required>Last Name</Label>
          <Input id="last-name" />
        </Stack>
      </Stack>
      <Stack spacing="md">
        <Label size="large" weight="semibold">Preferences</Label>
        <Stack spacing="xs">
          <Checkbox id="email-notif" label="Email notifications" />
          <Checkbox id="push-notif" label="Push notifications" defaultChecked />
        </Stack>
      </Stack>
    </Stack>
  ),
};
