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
          'Select component provides a dropdown menu for choosing from a list of options. Uses a compound component pattern with Select.Trigger, Select.Menu, and Select.Option for flexible composition.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
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
  render: () => (
    <Select>
      <Select.Trigger placeholder="Select an option..." />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
        <Select.Option value="3">Option 3</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const SizeSmall: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small size select for compact layouts or inline forms.',
      },
    },
  },
  render: () => (
    <Select size="small">
      <Select.Trigger placeholder="Small select..." />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const SizeDefault: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default size select balances visual presence with space efficiency.',
      },
    },
  },
  render: () => (
    <Select size="default">
      <Select.Trigger placeholder="Default select..." />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const SizeLarge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Large size select for prominent fields or touch-optimized interfaces.',
      },
    },
  },
  render: () => (
    <Select size="large">
      <Select.Trigger placeholder="Large select..." />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select with a label for accessibility and clarity. Always label form controls.',
      },
    },
  },
  render: () => (
    <Select label="Country">
      <Select.Trigger placeholder="Select a country..." />
      <Select.Menu>
        <Select.Option value="us">United States</Select.Option>
        <Select.Option value="ca">Canada</Select.Option>
        <Select.Option value="uk">United Kingdom</Select.Option>
        <Select.Option value="au">Australia</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const WithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Helper text provides additional guidance or context about the selection.',
      },
    },
  },
  render: () => (
    <Select label="Plan" helperText="Choose the plan that fits your needs">
      <Select.Trigger placeholder="Select a plan..." />
      <Select.Menu>
        <Select.Option value="free">Free</Select.Option>
        <Select.Option value="pro">Pro - $9/month</Select.Option>
        <Select.Option value="enterprise">Enterprise - $29/month</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error state for validation feedback when selection is required or invalid.',
      },
    },
  },
  render: () => (
    <Select label="Category" error helperText="Please select a category">
      <Select.Trigger placeholder="Select a category..." />
      <Select.Menu>
        <Select.Option value="tech">Technology</Select.Option>
        <Select.Option value="design">Design</Select.Option>
        <Select.Option value="business">Business</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled state prevents user interaction. Use for locked or unavailable options.',
      },
    },
  },
  render: () => (
    <Select label="Country" disabled>
      <Select.Trigger placeholder="Select a country..." />
      <Select.Menu>
        <Select.Option value="us">United States</Select.Option>
        <Select.Option value="ca">Canada</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const DisabledWithValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled select with a pre-selected value showing locked selection.',
      },
    },
  },
  render: () => (
    <Select label="Country" disabled defaultValue="us">
      <Select.Trigger placeholder="Select a country..." />
      <Select.Menu>
        <Select.Option value="us">United States</Select.Option>
        <Select.Option value="ca">Canada</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const WithDisabledOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Individual options can be disabled while keeping the select functional.',
      },
    },
  },
  render: () => (
    <Select label="Car">
      <Select.Trigger placeholder="Select a car..." />
      <Select.Menu>
        <Select.Option value="volvo">Volvo</Select.Option>
        <Select.Option value="saab" disabled>Saab (Unavailable)</Select.Option>
        <Select.Option value="mercedes">Mercedes</Select.Option>
        <Select.Option value="audi">Audi</Select.Option>
        <Select.Option value="bmw" disabled>BMW (Unavailable)</Select.Option>
      </Select.Menu>
    </Select>
  ),
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
        <Select.Trigger placeholder="Small select..." />
        <Select.Menu>
          <Select.Option value="1">Option 1</Select.Option>
        </Select.Menu>
      </Select>
      <Select size="default">
        <Select.Trigger placeholder="Default select..." />
        <Select.Menu>
          <Select.Option value="1">Option 1</Select.Option>
        </Select.Menu>
      </Select>
      <Select size="large">
        <Select.Trigger placeholder="Large select..." />
        <Select.Menu>
          <Select.Option value="1">Option 1</Select.Option>
        </Select.Menu>
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
        <Select.Trigger placeholder="Select a country..." />
        <Select.Menu>
          <Select.Option value="us">United States</Select.Option>
          <Select.Option value="ca">Canada</Select.Option>
          <Select.Option value="uk">United Kingdom</Select.Option>
        </Select.Menu>
      </Select>
      <Select label="Language">
        <Select.Trigger placeholder="Select a language..." />
        <Select.Menu>
          <Select.Option value="en">English</Select.Option>
          <Select.Option value="es">Spanish</Select.Option>
          <Select.Option value="fr">French</Select.Option>
        </Select.Menu>
      </Select>
      <Select label="Timezone">
        <Select.Trigger placeholder="Select a timezone..." />
        <Select.Menu>
          <Select.Option value="pst">Pacific Time (PST)</Select.Option>
          <Select.Option value="mst">Mountain Time (MST)</Select.Option>
          <Select.Option value="cst">Central Time (CST)</Select.Option>
          <Select.Option value="est">Eastern Time (EST)</Select.Option>
        </Select.Menu>
      </Select>
    </div>
  ),
};

export const WithDefaultValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Select with a pre-selected default value.',
      },
    },
  },
  render: () => (
    <Select label="Country" defaultValue="ca">
      <Select.Trigger placeholder="Select a country..." />
      <Select.Menu>
        <Select.Option value="us">United States</Select.Option>
        <Select.Option value="ca">Canada</Select.Option>
        <Select.Option value="uk">United Kingdom</Select.Option>
      </Select.Menu>
    </Select>
  ),
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
    <div className="flex flex-col gap-4">
      <Select size="small" label="Small with error" error helperText="This field has an error">
        <Select.Trigger placeholder="Select an option..." />
        <Select.Menu>
          <Select.Option value="1">Option 1</Select.Option>
        </Select.Menu>
      </Select>
      <Select size="default" label="Default with error" error helperText="This field has an error">
        <Select.Trigger placeholder="Select an option..." />
        <Select.Menu>
          <Select.Option value="1">Option 1</Select.Option>
        </Select.Menu>
      </Select>
      <Select size="large" label="Large with error" error helperText="This field has an error">
        <Select.Trigger placeholder="Select an option..." />
        <Select.Menu>
          <Select.Option value="1">Option 1</Select.Option>
        </Select.Menu>
      </Select>
    </div>
  ),
};
