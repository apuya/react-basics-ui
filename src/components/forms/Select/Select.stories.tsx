import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Forms/Select',
  component: Select,
  parameters: { layout: 'centered' },
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

// Default
export const Default: Story = {
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

// Sizes
export const SizeSmall: Story = {
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

// With Label
export const WithLabel: Story = {
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

// With Helper Text
export const WithHelperText: Story = {
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

// Error State
export const WithError: Story = {
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

// Disabled
export const Disabled: Story = {
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

// With Optgroups
export const WithOptgroups: Story = {
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

// All Sizes
export const AllSizes: Story = {
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

// Form Example
export const FormExample: Story = {
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
