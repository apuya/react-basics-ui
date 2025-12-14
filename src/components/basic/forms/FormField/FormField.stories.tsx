import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FormField } from './FormField';
import { Input } from '../Input';
import { Select } from '../Select';
import { Textarea } from '../Textarea';

const meta: Meta<typeof FormField> = {
  title: 'Forms/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
FormField is a compound component that provides consistent layout and state management for form controls.

## Features
- **Automatic State Sharing**: Error, disabled, and required states are shared via context
- **Compound Components**: FormField.Label, FormField.HelperText, FormField.ErrorMessage
- **Accessibility**: Auto-generated IDs for aria-describedby linking
- **Flexible**: Use with any form control component

## Usage
\`\`\`tsx
<FormField error required>
  <FormField.Label htmlFor="email">Email</FormField.Label>
  <Input id="email" aria-describedby={helperId} />
  <FormField.ErrorMessage>Email is required</FormField.ErrorMessage>
</FormField>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
      description: 'Error state (shared with sub-components)',
    },
    required: {
      control: 'boolean',
      description: 'Required state (shared with sub-components)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state (shared with sub-components)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

// =============================================================================
// Basic Usage
// =============================================================================

export const Basic: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <FormField>
        <FormField.Label htmlFor="email">Email</FormField.Label>
        <Input id="email" placeholder="Enter your email" />
        <FormField.HelperText>We'll never share your email</FormField.HelperText>
      </FormField>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <FormField required>
        <FormField.Label htmlFor="username">Username</FormField.Label>
        <Input id="username" placeholder="Enter username" />
        <FormField.HelperText>Username must be unique</FormField.HelperText>
      </FormField>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <FormField error>
        <FormField.Label htmlFor="email-error">Email</FormField.Label>
        <Input id="email-error" error placeholder="Enter your email" />
        <FormField.ErrorMessage>Please enter a valid email address</FormField.ErrorMessage>
      </FormField>
    </div>
  ),
};

export const RequiredWithError: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <FormField error required>
        <FormField.Label htmlFor="password">Password</FormField.Label>
        <Input id="password" type="password" error />
        <FormField.ErrorMessage>Password is required</FormField.ErrorMessage>
      </FormField>
    </div>
  ),
};

// =============================================================================
// With Different Controls
// =============================================================================

export const WithSelect: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <FormField>
        <FormField.Label htmlFor="country">Country</FormField.Label>
        <Select id="country">
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
        </Select>
        <FormField.HelperText>Select your country of residence</FormField.HelperText>
      </FormField>
    </div>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <div style={{ width: '320px' }}>
      <FormField required>
        <FormField.Label htmlFor="bio">Bio</FormField.Label>
        <Textarea id="bio" placeholder="Tell us about yourself" rows={4} />
        <FormField.HelperText>Maximum 500 characters</FormField.HelperText>
      </FormField>
    </div>
  ),
};

// =============================================================================
// Interactive Example
// =============================================================================

export const InteractiveValidation: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    const validateEmail = (value: string) => {
      const isValid = value.includes('@') && value.includes('.');
      setError(!isValid && value.length > 0);
    };

    return (
      <div style={{ width: '320px' }}>
        <FormField error={error} required>
          <FormField.Label htmlFor="email-interactive">Email</FormField.Label>
          <Input
            id="email-interactive"
            type="email"
            value={email}
            error={error}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            placeholder="Enter your email"
          />
          {error ? (
            <FormField.ErrorMessage>Please enter a valid email address</FormField.ErrorMessage>
          ) : (
            <FormField.HelperText>We'll never share your email</FormField.HelperText>
          )}
        </FormField>
      </div>
    );
  },
};

// =============================================================================
// All States Overview
// =============================================================================

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '320px' }}>
      <FormField>
        <FormField.Label htmlFor="state-default">Default</FormField.Label>
        <Input id="state-default" placeholder="Default state" />
      </FormField>

      <FormField>
        <FormField.Label htmlFor="state-helper">With Helper</FormField.Label>
        <Input id="state-helper" placeholder="With helper text" />
        <FormField.HelperText>Helper text here</FormField.HelperText>
      </FormField>

      <FormField required>
        <FormField.Label htmlFor="state-required">Required</FormField.Label>
        <Input id="state-required" placeholder="Required field" />
        <FormField.HelperText>This field is required</FormField.HelperText>
      </FormField>

      <FormField error>
        <FormField.Label htmlFor="state-error">Error</FormField.Label>
        <Input id="state-error" error placeholder="Error state" />
        <FormField.ErrorMessage>This field has an error</FormField.ErrorMessage>
      </FormField>

      <FormField disabled>
        <FormField.Label htmlFor="state-disabled">Disabled</FormField.Label>
        <Input id="state-disabled" disabled placeholder="Disabled state" />
        <FormField.HelperText>This field is disabled</FormField.HelperText>
      </FormField>
    </div>
  ),
};
