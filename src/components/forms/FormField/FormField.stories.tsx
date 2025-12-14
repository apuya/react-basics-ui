import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FormField } from './FormField';
import { Input } from '@/components/forms/Input';
import { Select } from '@/components/forms/Select';
import { Textarea } from '@/components/forms/Textarea';

const meta: Meta<typeof FormField> = {
  title: 'Forms/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
FormField is a compound component for **single form controls** with label, helper text, and error messaging.

## When to Use
- Single input fields (text, email, password, select, textarea)
- Fields that need their own label and validation message
- Any form control that requires \`<label>\` semantics

## Sub-Components
| Component | Purpose |
|-----------|---------|
| \`FormField.Label\` | Accessible label with required indicator |
| \`FormField.HelperText\` | Guidance text (hidden when error) |
| \`FormField.ErrorMessage\` | Error text (shown when error) |

## Context Sharing
Props passed to FormField are automatically shared with sub-components:
- \`error\` → Label color, shows ErrorMessage instead of HelperText
- \`required\` → Shows asterisk (*) on Label
- \`disabled\` → Dims Label text

## vs FormGroup
Use **FormField** for single inputs. Use **FormGroup** (fieldset) for related inputs like radio/checkbox groups.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    error: {
      control: 'boolean',
      description: 'Enables error state. Shows ErrorMessage, hides HelperText.',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Shows required indicator (*) on Label.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Dims Label text color.',
      table: { defaultValue: { summary: 'false' } },
    },
    helperId: {
      control: 'text',
      description: 'Custom ID for helper/error text. Auto-generated if not provided.',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormField>;

// =============================================================================
// Playground (for argTypes controls)
// =============================================================================

export const Playground: Story = {
  args: {
    error: false,
    required: false,
    disabled: false,
  },
  render: (args) => (
    <FormField {...args}>
      <FormField.Label htmlFor="playground">Email Address</FormField.Label>
      <Input
        id="playground"
        type="email"
        placeholder="you@example.com"
        error={args.error}
        disabled={args.disabled}
      />
      <FormField.HelperText>We'll never share your email</FormField.HelperText>
      <FormField.ErrorMessage>Please enter a valid email</FormField.ErrorMessage>
    </FormField>
  ),
};

// =============================================================================
// Use Cases
// =============================================================================

/**
 * Standard text input with helper text providing guidance.
 */
export const TextInput: Story = {
  render: () => (
    <FormField>
      <FormField.Label htmlFor="username">Username</FormField.Label>
      <Input id="username" placeholder="Enter username" />
      <FormField.HelperText>3-20 characters, letters and numbers only</FormField.HelperText>
    </FormField>
  ),
};

/**
 * Email field with required indicator and validation.
 */
export const RequiredField: Story = {
  render: () => (
    <FormField required>
      <FormField.Label htmlFor="email">Email</FormField.Label>
      <Input id="email" type="email" placeholder="you@example.com" />
      <FormField.HelperText>Required for account recovery</FormField.HelperText>
    </FormField>
  ),
};

/**
 * Password field with validation error.
 */
export const WithError: Story = {
  render: () => (
    <FormField error required>
      <FormField.Label htmlFor="password">Password</FormField.Label>
      <Input id="password" type="password" error />
      <FormField.ErrorMessage>Password must be at least 8 characters</FormField.ErrorMessage>
    </FormField>
  ),
};

/**
 * Disabled field with dimmed label.
 */
export const Disabled: Story = {
  render: () => (
    <FormField disabled>
      <FormField.Label htmlFor="readonly">Account ID</FormField.Label>
      <Input id="readonly" value="USR-12345" disabled />
      <FormField.HelperText>Contact support to change this</FormField.HelperText>
    </FormField>
  ),
};

/**
 * Select dropdown for choosing from predefined options.
 */
export const WithSelect: Story = {
  render: () => (
    <FormField required>
      <FormField.Label htmlFor="country">Country</FormField.Label>
      <Select id="country">
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
      </Select>
      <FormField.HelperText>Used for shipping calculations</FormField.HelperText>
    </FormField>
  ),
};

/**
 * Textarea for multi-line content with character guidance.
 */
export const WithTextarea: Story = {
  render: () => (
    <FormField>
      <FormField.Label htmlFor="bio">Bio</FormField.Label>
      <Textarea id="bio" placeholder="Tell us about yourself..." rows={4} />
      <FormField.HelperText>Maximum 500 characters</FormField.HelperText>
    </FormField>
  ),
};

// =============================================================================
// Interactive Examples
// =============================================================================

/**
 * Real-time email validation demonstrating dynamic error/helper text switching.
 */
export const LiveValidation: Story = {
  render: function LiveValidationExample() {
    const [value, setValue] = useState('');
    const [touched, setTouched] = useState(false);

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const showError = touched && value.length > 0 && !isValid;

    return (
      <FormField error={showError} required>
        <FormField.Label htmlFor="live-email">Email</FormField.Label>
        <Input
          id="live-email"
          type="email"
          value={value}
          error={showError}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="you@example.com"
        />
        <FormField.HelperText>We'll send a confirmation email</FormField.HelperText>
        <FormField.ErrorMessage>Please enter a valid email address</FormField.ErrorMessage>
      </FormField>
    );
  },
};

/**
 * Form section with multiple fields demonstrating consistent spacing.
 */
export const MultipleFields: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <FormField required>
        <FormField.Label htmlFor="first-name">First Name</FormField.Label>
        <Input id="first-name" placeholder="John" />
      </FormField>
      <FormField required>
        <FormField.Label htmlFor="last-name">Last Name</FormField.Label>
        <Input id="last-name" placeholder="Doe" />
      </FormField>
      <FormField>
        <FormField.Label htmlFor="phone">Phone (optional)</FormField.Label>
        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
        <FormField.HelperText>For delivery updates only</FormField.HelperText>
      </FormField>
    </>
  ),
};

// =============================================================================
// States Overview
// =============================================================================

/**
 * All FormField states for visual comparison.
 */
export const AllStates: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <FormField>
        <FormField.Label htmlFor="s-default">Default</FormField.Label>
        <Input id="s-default" placeholder="Default state" />
        <FormField.HelperText>Helper text</FormField.HelperText>
      </FormField>

      <FormField required>
        <FormField.Label htmlFor="s-required">Required</FormField.Label>
        <Input id="s-required" placeholder="Required field" />
        <FormField.HelperText>This field is required</FormField.HelperText>
      </FormField>

      <FormField error>
        <FormField.Label htmlFor="s-error">Error</FormField.Label>
        <Input id="s-error" error placeholder="Invalid input" />
        <FormField.ErrorMessage>Validation error message</FormField.ErrorMessage>
      </FormField>

      <FormField error required>
        <FormField.Label htmlFor="s-both">Required + Error</FormField.Label>
        <Input id="s-both" error placeholder="Required with error" />
        <FormField.ErrorMessage>This required field has an error</FormField.ErrorMessage>
      </FormField>

      <FormField disabled>
        <FormField.Label htmlFor="s-disabled">Disabled</FormField.Label>
        <Input id="s-disabled" disabled value="Locked value" />
        <FormField.HelperText>This field is disabled</FormField.HelperText>
      </FormField>
    </>
  ),
};
