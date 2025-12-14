import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FormGroup } from './FormGroup';
import { Radio } from '@/components/forms/Radio';
import { Checkbox } from '@/components/forms/Checkbox';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/forms/Input';

const meta: Meta<typeof FormGroup> = {
  title: 'Forms/FormGroup',
  component: FormGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
FormGroup is a compound component that wraps **related form controls** in a semantic \`<fieldset>\` element.

## When to Use
- Radio button groups (single selection)
- Checkbox groups (multiple selection)
- Any set of inputs that share a common label/question

## Sub-Components
| Component | Purpose |
|-----------|---------|
| \`FormGroup.Legend\` | Accessible group label (renders as \`<legend>\`) |
| \`FormGroup.Description\` | Additional context (always visible) |
| \`FormGroup.Options\` | **Container for inputs** — applies orientation layout |
| \`FormGroup.ErrorMessage\` | Validation error (shown when error) |

## Context Sharing
Props passed to FormGroup are automatically shared with sub-components:
- \`error\` → Shows ErrorMessage, sets \`aria-invalid\`
- \`required\` → Shows asterisk (*) on Legend, sets \`aria-required\`
- \`disabled\` → Dims Legend, disables all children
- \`orientation\` → Controls \`FormGroup.Options\` layout direction

## Usage
\`\`\`tsx
<FormGroup orientation="horizontal" required>
  <FormGroup.Legend>Size</FormGroup.Legend>
  <FormGroup.Options>
    <Radio name="size" label="S" />
    <Radio name="size" label="M" />
    <Radio name="size" label="L" />
  </FormGroup.Options>
</FormGroup>
\`\`\`

## vs FormField
Use **FormGroup** for related inputs (radio/checkbox groups). Use **FormField** for single inputs with their own label.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: 'Layout direction for child elements.',
      table: { defaultValue: { summary: 'vertical' } },
    },
    error: {
      control: 'boolean',
      description: 'Enables error state. Shows ErrorMessage.',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Shows required indicator (*) on Legend.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables fieldset and dims Legend.',
      table: { defaultValue: { summary: 'false' } },
    },
    errorId: {
      control: 'text',
      description: 'Custom ID for error message. Auto-generated if not provided.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormGroup>;

// =============================================================================
// Playground (for argTypes controls)
// =============================================================================

export const Playground: Story = {
  args: {
    orientation: 'vertical',
    error: false,
    required: false,
    disabled: false,
  },
  render: (args) => (
    <FormGroup {...args}>
      <FormGroup.Legend>Notification Preferences</FormGroup.Legend>
      <FormGroup.Description>Choose how you want to be notified</FormGroup.Description>
      <FormGroup.Options>
        <Checkbox label="Email" disabled={args.disabled} />
        <Checkbox label="SMS" disabled={args.disabled} />
        <Checkbox label="Push notifications" disabled={args.disabled} />
      </FormGroup.Options>
      <FormGroup.ErrorMessage>Please select at least one option</FormGroup.ErrorMessage>
    </FormGroup>
  ),
};

// =============================================================================
// Use Cases: Radio Groups
// =============================================================================

/**
 * Single-selection radio group for mutually exclusive options.
 */
export const RadioGroup: Story = {
  render: () => (
    <FormGroup>
      <FormGroup.Legend>Payment Method</FormGroup.Legend>
      <FormGroup.Options>
        <Radio name="payment" label="Credit Card" />
        <Radio name="payment" label="PayPal" />
        <Radio name="payment" label="Bank Transfer" />
      </FormGroup.Options>
    </FormGroup>
  ),
};

/**
 * Required radio group with validation.
 */
export const RequiredRadioGroup: Story = {
  render: () => (
    <FormGroup required error>
      <FormGroup.Legend>Subscription Plan</FormGroup.Legend>
      <FormGroup.Description>Select your preferred plan</FormGroup.Description>
      <FormGroup.Options>
        <Radio name="plan" label="Free - $0/month" />
        <Radio name="plan" label="Pro - $9/month" />
        <Radio name="plan" label="Enterprise - Contact us" />
      </FormGroup.Options>
      <FormGroup.ErrorMessage>Please select a plan to continue</FormGroup.ErrorMessage>
    </FormGroup>
  ),
};

/**
 * Horizontal radio group for compact layouts.
 */
export const HorizontalRadioGroup: Story = {
  render: () => (
    <FormGroup orientation="horizontal">
      <FormGroup.Legend>Size</FormGroup.Legend>
      <FormGroup.Options>
        <Radio name="size" label="S" />
        <Radio name="size" label="M" />
        <Radio name="size" label="L" />
        <Radio name="size" label="XL" />
      </FormGroup.Options>
    </FormGroup>
  ),
};

// =============================================================================
// Use Cases: Checkbox Groups
// =============================================================================

/**
 * Multi-selection checkbox group.
 */
export const CheckboxGroup: Story = {
  render: () => (
    <FormGroup>
      <FormGroup.Legend>Interests</FormGroup.Legend>
      <FormGroup.Description>Select all that apply</FormGroup.Description>
      <FormGroup.Options>
        <Checkbox label="Technology" />
        <Checkbox label="Design" />
        <Checkbox label="Business" />
        <Checkbox label="Marketing" />
      </FormGroup.Options>
    </FormGroup>
  ),
};

/**
 * Terms acceptance with required validation.
 */
export const TermsAcceptance: Story = {
  render: () => (
    <FormGroup required error>
      <FormGroup.Legend>Terms & Conditions</FormGroup.Legend>
      <FormGroup.Options>
        <Checkbox label="I accept the terms of service" />
        <Checkbox label="I agree to receive marketing emails" />
      </FormGroup.Options>
      <FormGroup.ErrorMessage>You must accept the terms to continue</FormGroup.ErrorMessage>
    </FormGroup>
  ),
};

/**
 * Privacy settings with detailed description.
 */
export const PrivacySettings: Story = {
  render: () => (
    <FormGroup>
      <FormGroup.Legend>Data Sharing Preferences</FormGroup.Legend>
      <FormGroup.Description>
        We respect your privacy. Select which types of data you're comfortable sharing.
        You can change these settings at any time.
      </FormGroup.Description>
      <FormGroup.Options>
        <Checkbox label="Basic profile information" />
        <Checkbox label="Usage analytics" />
        <Checkbox label="Marketing preferences" />
      </FormGroup.Options>
    </FormGroup>
  ),
};

// =============================================================================
// Use Cases: Nested FormFields
// =============================================================================

/**
 * Address form section with multiple labeled inputs.
 */
export const AddressSection: Story = {
  render: () => (
    <FormGroup>
      <FormGroup.Legend>Shipping Address</FormGroup.Legend>
      <FormGroup.Description>Enter your delivery address</FormGroup.Description>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <FormField required>
          <FormField.Label htmlFor="street">Street Address</FormField.Label>
          <Input id="street" placeholder="123 Main St" />
        </FormField>
        <div style={{ display: 'flex', gap: '12px' }}>
          <FormField required>
            <FormField.Label htmlFor="city">City</FormField.Label>
            <Input id="city" placeholder="New York" />
          </FormField>
          <FormField required>
            <FormField.Label htmlFor="zip">Zip Code</FormField.Label>
            <Input id="zip" placeholder="10001" />
          </FormField>
        </div>
      </div>
    </FormGroup>
  ),
};

// =============================================================================
// Interactive Examples
// =============================================================================

/**
 * Live validation demonstrating dynamic error state.
 */
export const LiveValidation: Story = {
  render: function LiveValidationExample() {
    const [selected, setSelected] = useState<string[]>([]);
    const [touched, setTouched] = useState(false);

    const hasError = touched && selected.length === 0;

    const handleChange = (value: string, checked: boolean) => {
      setTouched(true);
      setSelected((prev) =>
        checked ? [...prev, value] : prev.filter((v) => v !== value)
      );
    };

    return (
      <FormGroup required error={hasError}>
        <FormGroup.Legend>Contact Methods</FormGroup.Legend>
        <FormGroup.Description>Select at least one way to reach you</FormGroup.Description>
        <FormGroup.Options>
          <Checkbox
            label="Email"
            checked={selected.includes('email')}
            onChange={(e) => handleChange('email', e.target.checked)}
          />
          <Checkbox
            label="Phone"
            checked={selected.includes('phone')}
            onChange={(e) => handleChange('phone', e.target.checked)}
          />
          <Checkbox
            label="Mail"
            checked={selected.includes('mail')}
            onChange={(e) => handleChange('mail', e.target.checked)}
          />
        </FormGroup.Options>
        <FormGroup.ErrorMessage>Please select at least one contact method</FormGroup.ErrorMessage>
      </FormGroup>
    );
  },
};

// =============================================================================
// States Overview
// =============================================================================

/**
 * All FormGroup states for visual comparison.
 */
export const AllStates: Story = {
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <FormGroup>
        <FormGroup.Legend>Default</FormGroup.Legend>
        <FormGroup.Options>
          <Checkbox label="Option A" />
          <Checkbox label="Option B" />
        </FormGroup.Options>
      </FormGroup>

      <FormGroup required>
        <FormGroup.Legend>Required</FormGroup.Legend>
        <FormGroup.Description>Shows asterisk on legend</FormGroup.Description>
        <FormGroup.Options>
          <Checkbox label="Option A" />
          <Checkbox label="Option B" />
        </FormGroup.Options>
      </FormGroup>

      <FormGroup error>
        <FormGroup.Legend>Error</FormGroup.Legend>
        <FormGroup.Options>
          <Checkbox label="Option A" />
          <Checkbox label="Option B" />
        </FormGroup.Options>
        <FormGroup.ErrorMessage>Validation error message</FormGroup.ErrorMessage>
      </FormGroup>

      <FormGroup error required>
        <FormGroup.Legend>Required + Error</FormGroup.Legend>
        <FormGroup.Options>
          <Checkbox label="Option A" />
          <Checkbox label="Option B" />
        </FormGroup.Options>
        <FormGroup.ErrorMessage>This required group has an error</FormGroup.ErrorMessage>
      </FormGroup>

      <FormGroup disabled>
        <FormGroup.Legend>Disabled</FormGroup.Legend>
        <FormGroup.Options>
          <Checkbox label="Option A" disabled />
          <Checkbox label="Option B" disabled />
        </FormGroup.Options>
      </FormGroup>
    </>
  ),
};

/**
 * Orientation comparison side by side.
 */
export const OrientationComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px' }}>
      <FormGroup orientation="vertical">
        <FormGroup.Legend>Vertical</FormGroup.Legend>
        <FormGroup.Options>
          <Radio name="v" label="Option A" />
          <Radio name="v" label="Option B" />
          <Radio name="v" label="Option C" />
        </FormGroup.Options>
      </FormGroup>
      <FormGroup orientation="horizontal">
        <FormGroup.Legend>Horizontal</FormGroup.Legend>
        <FormGroup.Options>
          <Radio name="h" label="Option A" />
          <Radio name="h" label="Option B" />
          <Radio name="h" label="Option C" />
        </FormGroup.Options>
      </FormGroup>
    </div>
  ),
};
