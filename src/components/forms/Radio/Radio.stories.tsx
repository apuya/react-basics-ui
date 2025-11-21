import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Forms/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    name: {
      control: 'text',
      description: 'Radio group name',
    },
    value: {
      control: 'text',
      description: 'Radio value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// Default
export const Default: Story = {
  args: {
    label: 'Option',
    name: 'default',
    value: 'option',
  },
};

// Without Label
export const WithoutLabel: Story = {
  args: {
    name: 'no-label',
    value: 'option',
  },
};

// Checked
export const Checked: Story = {
  args: {
    label: 'Selected option',
    name: 'checked',
    value: 'selected',
    defaultChecked: true,
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    name: 'disabled',
    value: 'disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled selected',
    name: 'disabled-checked',
    value: 'disabled-selected',
    disabled: true,
    defaultChecked: true,
  },
};

// Radio Group Vertical
export const RadioGroupVertical: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Radio name="plan" value="free" label="Free" defaultChecked />
      <Radio name="plan" value="pro" label="Pro" />
      <Radio name="plan" value="enterprise" label="Enterprise" />
    </div>
  ),
};

// Radio Group Horizontal
export const RadioGroupHorizontal: Story = {
  render: () => (
    <div className="flex gap-6">
      <Radio name="size" value="small" label="Small" defaultChecked />
      <Radio name="size" value="medium" label="Medium" />
      <Radio name="size" value="large" label="Large" />
    </div>
  ),
};

// With Descriptions
export const WithDescriptions: Story = {
  render: () => (
    <fieldset className="space-y-4">
      <legend className="text-sm font-medium mb-2">Select a plan</legend>
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Radio name="plan-desc" value="free" defaultChecked />
          <div>
            <label className="text-sm font-medium">Free</label>
            <p className="text-xs text-gray-500">Basic features for personal use</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Radio name="plan-desc" value="pro" />
          <div>
            <label className="text-sm font-medium">Pro - $9/month</label>
            <p className="text-xs text-gray-500">Advanced features for professionals</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Radio name="plan-desc" value="enterprise" />
          <div>
            <label className="text-sm font-medium">Enterprise - $29/month</label>
            <p className="text-xs text-gray-500">Custom solutions for large teams</p>
          </div>
        </div>
      </div>
    </fieldset>
  ),
};

// Different Groups
export const MultipleGroups: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="text-sm font-medium mb-2">Size</legend>
        <div className="flex gap-4">
          <Radio name="size-group" value="s" label="S" />
          <Radio name="size-group" value="m" label="M" defaultChecked />
          <Radio name="size-group" value="l" label="L" />
          <Radio name="size-group" value="xl" label="XL" />
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-sm font-medium mb-2">Color</legend>
        <div className="flex gap-4">
          <Radio name="color-group" value="red" label="Red" defaultChecked />
          <Radio name="color-group" value="blue" label="Blue" />
          <Radio name="color-group" value="green" label="Green" />
        </div>
      </fieldset>
    </div>
  ),
};

// All States
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Radio name="states-1" value="unchecked" label="Unchecked" />
      <Radio name="states-2" value="checked" label="Checked" defaultChecked />
      <Radio name="states-3" value="disabled" label="Disabled" disabled />
      <Radio name="states-4" value="disabled-checked" label="Disabled Checked" disabled defaultChecked />
    </div>
  ),
};
