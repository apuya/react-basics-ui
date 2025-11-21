import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

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

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic checkbox with label. Use for binary choices or multiple selections.',
      },
    },
  },
  args: {
    label: 'Accept terms and conditions',
  },
};

export const WithoutLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checkbox without visible label. Always provide aria-label for accessibility.',
      },
    },
  },
  args: {
    'aria-label': 'Accept terms',
  },
};

export const SizeSmall: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small size checkbox for compact interfaces or dense lists.',
      },
    },
  },
  args: {
    size: 'small',
    label: 'Small checkbox',
  },
};

export const SizeDefault: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default size checkbox for standard forms and lists.',
      },
    },
  },
  args: {
    size: 'default',
    label: 'Default checkbox',
  },
};

export const SizeLarge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Large size checkbox for touch-optimized interfaces or emphasized selections.',
      },
    },
  },
  args: {
    size: 'large',
    label: 'Large checkbox',
  },
};

export const Checked: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Checked state checkbox. Use defaultChecked for uncontrolled components.',
      },
    },
  },
  args: {
    label: 'Checked option',
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate state for partial selections, commonly used in "Select All" patterns with child checkboxes.',
      },
    },
  },
  args: {
    label: 'Select all',
    indeterminate: true,
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error state for validation feedback when checkbox selection is required.',
      },
    },
  },
  args: {
    label: 'I agree to the terms',
    error: true,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled checkbox prevents user interaction. Use for locked or unavailable options.',
      },
    },
  },
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled checkbox in checked state showing a locked selection.',
      },
    },
  },
  args: {
    label: 'Disabled checked',
    disabled: true,
    defaultChecked: true,
  },
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all checkbox sizes for choosing the appropriate size.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox size="small" label="Small checkbox" />
      <Checkbox size="default" label="Default checkbox" />
      <Checkbox size="large" label="Large checkbox" />
    </div>
  ),
};

export const AllStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Overview of all checkbox states: unchecked, checked, indeterminate, error, disabled, and disabled checked.',
      },
    },
  },
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

export const CheckboxGroup: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Group of related checkboxes using fieldset for semantic HTML and accessibility.',
      },
    },
  },
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

export const SelectAllPattern: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select all pattern with indeterminate parent checkbox controlling child checkboxes.',
      },
    },
  },
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

export const TermsExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Terms acceptance checkboxes with links embedded in labels using JSX.',
      },
    },
  },
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

export const SettingsPanel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Settings panel with multiple notification preferences using checkboxes.',
      },
    },
  },
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

export const PermissionList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Permission management interface with disabled admin option.',
      },
    },
  },
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

export const FormExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Form example with checkboxes including error state and validation message.',
      },
    },
  },
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

export const ErrorSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error state across all checkbox sizes showing consistent validation styling.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox size="small" label="Small with error" error />
      <Checkbox size="default" label="Default with error" error />
      <Checkbox size="large" label="Large with error" error />
    </div>
  ),
};

export const IndeterminateSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate state across all checkbox sizes for partial selection indicators.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox size="small" label="Small indeterminate" indeterminate />
      <Checkbox size="default" label="Default indeterminate" indeterminate />
      <Checkbox size="large" label="Large indeterminate" indeterminate />
    </div>
  ),
};

export const RequiredCheckbox: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Required checkbox with asterisk indicator for mandatory selections like terms acceptance.',
      },
    },
  },
  args: {
    label: 'I agree to the terms and conditions *',
    required: true,
  },
};

