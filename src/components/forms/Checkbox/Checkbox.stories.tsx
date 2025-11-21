import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
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

// Default
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

// Without Label
export const WithoutLabel: Story = {
  args: {},
};

// Sizes
export const SizeSmall: Story = {
  args: {
    size: 'small',
    label: 'Small checkbox',
  },
};

export const SizeDefault: Story = {
  args: {
    size: 'default',
    label: 'Default checkbox',
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'large',
    label: 'Large checkbox',
  },
};

// Checked
export const Checked: Story = {
  args: {
    label: 'Checked option',
    defaultChecked: true,
  },
};

// Indeterminate
export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
  },
};

// Error
export const WithError: Story = {
  args: {
    label: 'I agree to the terms',
    error: true,
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    disabled: true,
    defaultChecked: true,
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox size="small" label="Small checkbox" />
      <Checkbox size="default" label="Default checkbox" />
      <Checkbox size="large" label="Large checkbox" />
    </div>
  ),
};

// All States
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Error" error />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled Checked" disabled defaultChecked />
    </div>
  ),
};

// Checkbox Group
export const CheckboxGroup: Story = {
  render: () => (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium mb-2">Select your interests</legend>
      <Checkbox label="Technology" defaultChecked />
      <Checkbox label="Design" />
      <Checkbox label="Business" defaultChecked />
      <Checkbox label="Marketing" />
      <Checkbox label="Finance" />
    </fieldset>
  ),
};

// Select All Pattern
export const SelectAllPattern: Story = {
  render: () => (
    <div className="space-y-3">
      <Checkbox label="Select all" indeterminate />
      <div className="ml-6 space-y-2">
        <Checkbox label="Item 1" defaultChecked />
        <Checkbox label="Item 2" defaultChecked />
        <Checkbox label="Item 3" />
        <Checkbox label="Item 4" />
      </div>
    </div>
  ),
};

// Terms and Conditions
export const TermsExample: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <Checkbox
        label={
          <span>
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>
          </span>
        }
      />
      <Checkbox
        label={
          <span>
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </span>
        }
      />
      <Checkbox label="Send me marketing emails" />
    </div>
  ),
};

// Settings Panel
export const SettingsPanel: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <h3 className="text-sm font-semibold">Notification Settings</h3>
      <div className="space-y-3">
        <Checkbox label="Email notifications" defaultChecked />
        <Checkbox label="Push notifications" defaultChecked />
        <Checkbox label="SMS notifications" />
        <Checkbox label="Weekly digest" />
      </div>
    </div>
  ),
};

// Permission List
export const PermissionList: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <h3 className="text-sm font-semibold">User Permissions</h3>
      <div className="space-y-3">
        <Checkbox label="Read" defaultChecked />
        <Checkbox label="Write" defaultChecked />
        <Checkbox label="Delete" />
        <Checkbox label="Admin" disabled />
      </div>
    </div>
  ),
};

// Form Example
export const FormExample: Story = {
  render: () => (
    <form className="flex flex-col gap-4 w-80">
      <div className="space-y-3">
        <Checkbox label="Remember me" />
        <Checkbox
          label="I agree to receive updates via email"
          defaultChecked
        />
        <Checkbox
          label={
            <span>
              I accept the{' '}
              <a href="#" className="text-blue-600 hover:underline">
                terms and conditions
              </a>
            </span>
          }
          error
        />
      </div>
      <p className="text-xs text-red-500">Please accept the terms to continue</p>
    </form>
  ),
};
