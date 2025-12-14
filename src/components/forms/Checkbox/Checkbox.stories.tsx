import type { Meta, StoryObj } from '@storybook/react';
import type { JSX } from 'react';
import { Checkbox } from './Checkbox';
import type { CheckboxSize } from './Checkbox.types';
import { Text } from '@/components/typography/Text';
import { Stack } from '@/components/layout/Stack';

// =============================================================================
// Storybook Meta Configuration
// =============================================================================

type StoryWithRender = StoryObj<typeof Checkbox> & { render: () => JSX.Element };

const CHECKBOX_SIZES: CheckboxSize[] = ['small', 'default', 'large'];

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Checkbox component for multiple selections from a set of options. Supports three sizes, indeterminate state for partial selections, error states, and flexible label content including JSX.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: CHECKBOX_SIZES,
      description: 'Size of the checkbox',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state (partial selection)',
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
type Story = StoryObj<typeof Checkbox>;

// =============================================================================
// Default Story
// =============================================================================

/**
 * Basic checkbox with label. Interactive controls available in Storybook.
 */
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

// =============================================================================
// Size & State Variants
// =============================================================================

/**
 * Checkbox without visible label. Always provide aria-label for accessibility.
 */
export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Accept terms',
  },
};

/**
 * Comparison of all checkbox sizes for choosing the appropriate size.
 */
export const AllSizes: StoryWithRender = {
  render: () => (
    <Stack gap="md">
      <Checkbox size="small" label="Small checkbox" />
      <Checkbox size="default" label="Default checkbox" />
      <Checkbox size="large" label="Large checkbox" />
    </Stack>
  ),
};

/**
 * Overview of all checkbox states: unchecked, checked, indeterminate, error, disabled, and disabled checked.
 */
export const AllStates: StoryWithRender = {
  render: () => (
    <Stack gap="md">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Error" error />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled Checked" disabled defaultChecked />
    </Stack>
  ),
};

// =============================================================================
// Usage Patterns
// =============================================================================

/**
 * Group of related checkboxes using fieldset for semantic HTML and accessibility.
 */
export const CheckboxGroup: StoryWithRender = {
  render: () => (
    <Stack as="fieldset" gap="md">
      <legend style={{ marginBottom: 'var(--semantic-space-compact)' }}>
        <Text weight="medium">Select your interests</Text>
      </legend>
      <Checkbox label="Technology" defaultChecked />
      <Checkbox label="Design" />
      <Checkbox label="Business" defaultChecked />
      <Checkbox label="Marketing" />
      <Checkbox label="Finance" />
    </Stack>
  ),
};

/**
 * Select all pattern with indeterminate parent checkbox controlling child checkboxes.
 */
export const SelectAllPattern: StoryWithRender = {
  render: () => (
    <Stack gap="md">
      <Checkbox label="Select all" indeterminate />
      <Stack gap="sm" className="ml-6">
        <Checkbox label="Item 1" defaultChecked />
        <Checkbox label="Item 2" defaultChecked />
        <Checkbox label="Item 3" />
        <Checkbox label="Item 4" />
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// Advanced Examples
// =============================================================================

/**
 * Checkboxes with JSX labels containing interactive elements like links.
 */
export const WithJSXLabel: StoryWithRender = {
  render: () => (
    <Stack gap="md" className="max-w-[24rem]">
      <Checkbox
        label={
          <span>
            I agree to the{' '}
            <a href="#" style={{ color: 'var(--semantic-status-info-default)', textDecoration: 'underline' }}>
              Terms of Service
            </a>
          </span>
        }
      />
      <Checkbox
        label={
          <span>
            I agree to the{' '}
            <a href="#" style={{ color: 'var(--semantic-status-info-default)', textDecoration: 'underline' }}>
              Privacy Policy
            </a>
          </span>
        }
      />
      <Checkbox label="Send me marketing emails" />
    </Stack>
  ),
};

/**
 * Form example with checkboxes including error state and validation message.
 */
export const FormIntegration: StoryWithRender = {
  render: () => (
    <Stack as="form" gap="md" className="w-80">
      <Text as="strong" weight="semibold">Account Preferences</Text>
      <Stack gap="md">
        <Checkbox label="Remember me" />
        <Checkbox label="Email notifications" defaultChecked />
        <Checkbox label="Push notifications" defaultChecked />
        <Checkbox
          label={
            <span>
              I accept the{' '}
              <a href="#" style={{ color: 'var(--semantic-status-info-default)', textDecoration: 'underline' }}>
                terms and conditions
              </a>
            </span>
          }
          error
        />
      </Stack>
      <Text as="p" size="caption" color="error">Please accept the terms to continue</Text>
    </Stack>
  ),
};

/**
 * Required checkbox with asterisk indicator for mandatory selections.
 */
export const RequiredCheckbox: Story = {
  args: {
    label: 'I agree to the terms and conditions *',
    required: true,
  },
};
