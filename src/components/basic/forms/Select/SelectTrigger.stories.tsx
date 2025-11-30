import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

/**
 * The trigger button that opens the select dropdown menu.
 * Displays the selected value or placeholder text.
 *
 * **Note:** Select.Trigger must be used within a Select context.
 * Size, disabled, and error states are inherited from the parent Select.
 */
const meta: Meta<typeof Select.Trigger> = {
  title: 'Forms/Select/Trigger',
  component: Select.Trigger,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The trigger button that opens the select dropdown menu. Displays the selected value or placeholder.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when no value is selected',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  decorators: [(Story) => <div style={{ width: '280px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Select.Trigger>;

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {
  args: {
    placeholder: 'Select an option...',
  },
  render: (args) => (
    <Select>
      <Select.Trigger {...args} />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// PLACEHOLDER VARIATIONS
// =============================================================================

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Choose your favorite fruit...',
  },
  render: (args) => (
    <Select>
      <Select.Trigger {...args} />
      <Select.Menu>
        <Select.Option value="apple">Apple</Select.Option>
        <Select.Option value="banana">Banana</Select.Option>
        <Select.Option value="cherry">Cherry</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const WithSelectedValue: Story = {
  args: {
    placeholder: 'Select a fruit...',
  },
  render: (args) => (
    <Select defaultValue="banana">
      <Select.Trigger {...args} />
      <Select.Menu>
        <Select.Option value="apple">Apple</Select.Option>
        <Select.Option value="banana">Banana</Select.Option>
        <Select.Option value="cherry">Cherry</Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'When a value is selected, the trigger displays the option label instead of the placeholder.',
      },
    },
  },
};

// =============================================================================
// SIZE VARIANTS (inherited from parent Select)
// =============================================================================

export const Small: Story = {
  args: {
    placeholder: 'Small trigger...',
  },
  render: (args) => (
    <Select size="small">
      <Select.Trigger {...args} />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const DefaultSize: Story = {
  args: {
    placeholder: 'Default trigger...',
  },
  render: (args) => (
    <Select size="default">
      <Select.Trigger {...args} />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const Large: Story = {
  args: {
    placeholder: 'Large trigger...',
  },
  render: (args) => (
    <Select size="large">
      <Select.Trigger {...args} />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// STATES (inherited from parent Select)
// =============================================================================

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled trigger...',
  },
  render: (args) => (
    <Select disabled>
      <Select.Trigger {...args} />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

export const ErrorState: Story = {
  args: {
    placeholder: 'Error state...',
  },
  render: (args) => (
    <Select error>
      <Select.Trigger {...args} />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// CUSTOM STYLING
// =============================================================================

export const WithCustomClassName: Story = {
  args: {
    placeholder: 'Custom styled...',
    className: 'font-bold',
  },
  render: (args) => (
    <Select>
      <Select.Trigger {...args} />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
      </Select.Menu>
    </Select>
  ),
};
