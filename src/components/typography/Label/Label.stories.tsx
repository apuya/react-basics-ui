import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { Input } from '../../forms/Input/Input';
import { Stack } from '../../layout/Stack';

const meta: Meta<typeof Label> = {
  title: 'Typography/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['caption', 'small', 'body'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'disabled'],
    },
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

// =============================================================================
// Default - Playground
// =============================================================================

export const Default: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'email',
    size: 'small',
    weight: 'medium',
  },
};

// =============================================================================
// Variants
// =============================================================================

export const Sizes: Story = {
  render: () => (
    <Stack spacing="sm">
      <Label size="caption">Caption – Fine print labels</Label>
      <Label size="small">Small – Default form labels</Label>
      <Label size="body">Body – Section headers</Label>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack spacing="sm">
      <Label>Default – Standard label</Label>
      <Label required>Required – With indicator</Label>
      <Label color="secondary">Secondary – Subdued</Label>
      <Label color="error">Error – Validation failed</Label>
      <Label disabled>Disabled – Inactive field</Label>
    </Stack>
  ),
};

// =============================================================================
// Use Case: Registration Form
// =============================================================================

export const RegistrationForm: Story = {
  render: () => (
    <Stack spacing="lg" className="w-80">
      <Stack spacing="xs">
        <Label htmlFor="reg-email" required>Email Address</Label>
        <Input id="reg-email" type="email" placeholder="you@example.com" />
        <Label size="caption" color="secondary">We'll never share your email.</Label>
      </Stack>
      <Stack spacing="xs">
        <Label htmlFor="reg-password" required>Password</Label>
        <Input id="reg-password" type="password" placeholder="••••••••" />
        <Label size="caption" color="secondary">Must be at least 8 characters.</Label>
      </Stack>
      <Stack spacing="xs">
        <Label htmlFor="reg-username" color="error" required>Username</Label>
        <Input id="reg-username" error defaultValue="admin" />
        <Label size="caption" color="error">This username is already taken.</Label>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of Label component used in a registration form with helper text and validation states.',
      },
    },
  },
};

// =============================================================================
// With Form Controls
// =============================================================================

export const WithInput: Story = {
  render: () => (
    <Stack spacing="lg" className="w-80">
      <Stack spacing="xs">
        <Label htmlFor="username" required>Username</Label>
        <Input id="username" placeholder="Enter your username" />
      </Stack>
      <Stack spacing="xs">
        <Label htmlFor="email-error" color="error" required>Email Address</Label>
        <Input id="email-error" error defaultValue="invalid-email" />
      </Stack>
    </Stack>
  ),
};
