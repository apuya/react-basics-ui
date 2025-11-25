import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Forms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Radio buttons allow users to select a single option from a set of mutually exclusive choices. Always use within a group with a shared name attribute.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text displayed next to the radio button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the radio button',
    },
    name: {
      control: 'text',
      description: 'Groups radios together - only one can be selected',
    },
    value: {
      control: 'text',
      description: 'Value submitted when this option is selected',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic radio button with a label. Use as part of a radio group.',
      },
    },
  },
  args: {
    label: 'Option',
    name: 'default',
    value: 'option',
  },
};

export const WithoutLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Radio without visible label. Ensure accessible name is provided via aria-label.',
      },
    },
  },
  args: {
    name: 'no-label',
    value: 'option',
    'aria-label': 'Option without visible label',
  },
};

export const Checked: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Pre-selected radio button. Use defaultChecked for uncontrolled forms.',
      },
    },
  },
  args: {
    label: 'Selected option',
    name: 'checked',
    value: 'selected',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled radio cannot be selected. Use when an option is temporarily unavailable.',
      },
    },
  },
  args: {
    label: 'Disabled option',
    name: 'disabled',
    value: 'disabled',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled but selected state. Shows a locked selection that cannot be changed.',
      },
    },
  },
  args: {
    label: 'Disabled selected',
    name: 'disabled-checked',
    value: 'disabled-selected',
    disabled: true,
    defaultChecked: true,
  },
};

export const RadioGroupVertical: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Vertical layout for radio groups. Best for longer lists or when labels vary in length.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Radio name="plan" value="free" label="Free" defaultChecked />
      <Radio name="plan" value="pro" label="Pro" />
      <Radio name="plan" value="enterprise" label="Enterprise" />
    </div>
  ),
};

export const RadioGroupHorizontal: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Horizontal layout for compact radio groups. Best for 3-4 short options.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '24px' }}>
      <Radio name="size" value="small" label="Small" defaultChecked />
      <Radio name="size" value="medium" label="Medium" />
      <Radio name="size" value="large" label="Large" />
    </div>
  ),
};

export const WithDescriptions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Radio options with additional descriptive text for complex choices.',
      },
    },
  },
  render: () => (
    <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
      <legend style={{ fontSize: '14px', fontWeight: 500, marginBottom: '12px' }}>Select a plan</legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <Radio name="plan-desc" value="free" defaultChecked />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>Free</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Basic features for personal use</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <Radio name="plan-desc" value="pro" />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>Pro - $9/month</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Advanced features for professionals</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <Radio name="plan-desc" value="enterprise" />
          <div>
            <div style={{ fontSize: '14px', fontWeight: 500 }}>Enterprise - $29/month</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Custom solutions for large teams</div>
          </div>
        </div>
      </div>
    </fieldset>
  ),
};

export const MultipleGroups: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent radio groups on the same page. Each group has its own name.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Size</legend>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Radio name="size-group" value="s" label="S" />
          <Radio name="size-group" value="m" label="M" defaultChecked />
          <Radio name="size-group" value="l" label="L" />
          <Radio name="size-group" value="xl" label="XL" />
        </div>
      </fieldset>
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Color</legend>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Radio name="color-group" value="red" label="Red" defaultChecked />
          <Radio name="color-group" value="blue" label="Blue" />
          <Radio name="color-group" value="green" label="Green" />
        </div>
      </fieldset>
    </div>
  ),
};

export const AllStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Overview of all radio button states for visual reference.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Radio name="states-1" value="unchecked" label="Unchecked" />
      <Radio name="states-2" value="checked" label="Checked" defaultChecked />
      <Radio name="states-3" value="disabled" label="Disabled" disabled />
      <Radio name="states-4" value="disabled-checked" label="Disabled Checked" disabled defaultChecked />
    </div>
  ),
};
