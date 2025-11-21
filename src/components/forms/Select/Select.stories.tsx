import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Select component provides a dropdown menu for choosing from a list of options. Supports different sizes, labels, helper text, error states, and optgroups for organizing options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the select',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    helperText: {
      control: 'text',
      description: 'Helper or error text',
    },
  },
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic select dropdown with a placeholder option and multiple choices.',
      },
    },
  },
  args: {
    children: (
      <>
        <option value="">Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </>
    ),
  },
};

export const SizeSmall: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small size select for compact layouts or inline forms.',
      },
    },
  },
  args: {
    size: 'small',
    children: (
      <>
        <option value="">Small select</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </>
    ),
  },
};

export const SizeMedium: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Medium size (default) select balances visual presence with space efficiency.',
      },
    },
  },
  args: {
    size: 'medium',
    children: (
      <>
        <option value="">Medium select</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </>
    ),
  },
};

export const SizeLarge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Large size select for prominent fields or touch-optimized interfaces.',
      },
    },
  },
  args: {
    size: 'large',
    children: (
      <>
        <option value="">Large select</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </>
    ),
  },
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select with a label for accessibility and clarity. Always label form controls.',
      },
    },
  },
  args: {
    label: 'Country',
    children: (
      <>
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
        <option value="au">Australia</option>
      </>
    ),
  },
};

export const WithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Helper text provides additional guidance or context about the selection.',
      },
    },
  },
  args: {
    label: 'Plan',
    helperText: 'Choose the plan that fits your needs',
    children: (
      <>
        <option value="">Select a plan</option>
        <option value="free">Free</option>
        <option value="pro">Pro - $9/month</option>
        <option value="enterprise">Enterprise - $29/month</option>
      </>
    ),
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error state for validation feedback when selection is required or invalid.',
      },
    },
  },
  args: {
    label: 'Category',
    error: true,
    helperText: 'Please select a category',
    children: (
      <>
        <option value="">Select a category</option>
        <option value="tech">Technology</option>
        <option value="design">Design</option>
        <option value="business">Business</option>
      </>
    ),
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled state prevents user interaction. Use for locked or unavailable options.',
      },
    },
  },
  args: {
    label: 'Country',
    disabled: true,
    children: (
      <>
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
      </>
    ),
  },
};

export const DisabledWithValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled select with a pre-selected value showing locked selection.',
      },
    },
  },
  args: {
    label: 'Country',
    disabled: true,
    defaultValue: 'us',
    children: (
      <>
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
      </>
    ),
  },
};

export const WithOptgroups: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Optgroups organize related options into labeled categories for better UX with long lists.',
      },
    },
  },
  args: {
    label: 'Car',
    children: (
      <>
        <option value="">Select a car</option>
        <optgroup label="Swedish Cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
        </optgroup>
        <optgroup label="German Cars">
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
          <option value="bmw">BMW</option>
        </optgroup>
      </>
    ),
  },
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all select sizes for choosing the appropriate size.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Select size="small">
        <option value="">Small select</option>
        <option value="1">Option 1</option>
      </Select>
      <Select size="medium">
        <option value="">Medium select</option>
        <option value="1">Option 1</option>
      </Select>
      <Select size="large">
        <option value="">Large select</option>
        <option value="1">Option 1</option>
      </Select>
    </div>
  ),
};

export const FormExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete form example with multiple selects demonstrating consistent styling.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Select label="Country" helperText="Where are you located?">
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
      </Select>
      <Select label="Language">
        <option value="">Select a language</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </Select>
      <Select label="Timezone">
        <option value="">Select a timezone</option>
        <option value="pst">Pacific Time (PST)</option>
        <option value="mst">Mountain Time (MST)</option>
        <option value="cst">Central Time (CST)</option>
        <option value="est">Eastern Time (EST)</option>
      </Select>
    </div>
  ),
};

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Required select with asterisk indicator. Use HTML5 required attribute for validation.',
      },
    },
  },
  args: {
    label: 'Country *',
    required: true,
    helperText: 'This field is required',
    children: (
      <>
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
      </>
    ),
  },
};

export const ErrorSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error state across all select sizes showing consistent validation styling.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
      <Select
        size="small"
        label="Small with error"
        error
        helperText="This field has an error"
      >
        <option value="">Select an option</option>
        <option value="1">Option 1</option>
      </Select>
      <Select
        size="medium"
        label="Medium with error"
        error
        helperText="This field has an error"
      >
        <option value="">Select an option</option>
        <option value="1">Option 1</option>
      </Select>
      <Select
        size="large"
        label="Large with error"
        error
        helperText="This field has an error"
      >
        <option value="">Select an option</option>
        <option value="1">Option 1</option>
      </Select>
    </div>
  ),
};

