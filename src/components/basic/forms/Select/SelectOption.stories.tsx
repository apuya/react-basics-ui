import type { Meta, StoryObj } from '@storybook/react';
import { BiStar, BiUser, BiFolder } from 'react-icons/bi';
import { Select } from './Select';
import { Icon } from '../../utility/Icon';

/**
 * Individual selectable option within the select menu.
 * Shows a checkmark when selected.
 *
 * Select.Option can be used standalone with `selected` and `onOptionSelect` props,
 * or within a Select compound component where it gets state from context.
 */
const meta: Meta<typeof Select.Option> = {
  title: 'Forms/Select/Option',
  component: Select.Option,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Individual selectable option within the select menu. Shows a checkmark when selected. Can be used standalone with `selected` prop or within a Select compound component.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The value of the option (required)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the option is disabled',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the option is selected (standalone mode)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    children: {
      control: 'text',
      description: 'The option label content',
    },
  },
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Select.Option>;

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {
  args: {
    value: 'option1',
    children: 'Option 1',
  },
  render: (args) => (
    <>
      <Select.Option {...args} />
      <Select.Option value="option2">Option 2</Select.Option>
      <Select.Option value="option3">Option 3</Select.Option>
    </>
  ),
};

// =============================================================================
// STATES
// =============================================================================

export const Selected: Story = {
  args: {
    value: 'selected',
    children: 'Selected Option',
    selected: true,
  },
  render: (args) => (
    <>
      <Select.Option {...args} />
      <Select.Option value="unselected">Unselected Option</Select.Option>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'When selected, the option displays a checkmark indicator.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    value: 'disabled',
    disabled: true,
    children: 'Disabled Option',
  },
  render: (args) => (
    <>
      <Select.Option value="enabled">Enabled Option</Select.Option>
      <Select.Option {...args} />
      <Select.Option value="another">Another Option</Select.Option>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled options cannot be selected and have reduced opacity.',
      },
    },
  },
};

// =============================================================================
// WITH CUSTOM CONTENT
// =============================================================================

export const WithIcons: Story = {
  render: () => (
    <>
      <Select.Option value="user">
        <span className="flex items-center gap-2">
          <Icon icon={BiUser} size="sm" aria-hidden />
          Users
        </span>
      </Select.Option>
      <Select.Option value="folder">
        <span className="flex items-center gap-2">
          <Icon icon={BiFolder} size="sm" aria-hidden />
          Documents
        </span>
      </Select.Option>
      <Select.Option value="star">
        <span className="flex items-center gap-2">
          <Icon icon={BiStar} size="sm" aria-hidden />
          Favorites
        </span>
      </Select.Option>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Options can contain custom content like icons alongside text.',
      },
    },
  },
};

export const WithDescriptions: Story = {
  decorators: [(Story) => <div style={{ width: '360px' }}><Story /></div>],
  render: () => (
    <>
      <Select.Option value="free">
        <div className="flex flex-col">
          <span className="font-medium">Free</span>
          <span className="text-xs text-gray-500">Up to 5 users</span>
        </div>
      </Select.Option>
      <Select.Option value="pro">
        <div className="flex flex-col">
          <span className="font-medium">Pro</span>
          <span className="text-xs text-gray-500">Up to 25 users</span>
        </div>
      </Select.Option>
      <Select.Option value="enterprise">
        <div className="flex flex-col">
          <span className="font-medium">Enterprise</span>
          <span className="text-xs text-gray-500">Unlimited users</span>
        </div>
      </Select.Option>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Options with title and description text for more context.',
      },
    },
  },
};

// =============================================================================
// LONG TEXT
// =============================================================================

export const LongText: Story = {
  args: {
    value: 'long',
    children: 'Engineering & Product Development Department',
  },
  decorators: [(Story) => <div style={{ width: '380px' }}><Story /></div>],
  render: (args) => (
    <>
      <Select.Option {...args} />
      <Select.Option value="marketing">Marketing & Communications</Select.Option>
      <Select.Option value="hr">Human Resources & Administration</Select.Option>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Options with longer text content.',
      },
    },
  },
};

// =============================================================================
// CUSTOM STYLING
// =============================================================================

export const WithCustomClassName: Story = {
  args: {
    value: 'custom',
    children: 'Custom Styled Option',
    className: 'font-semibold',
  },
  render: (args) => (
    <>
      <Select.Option {...args} />
      <Select.Option value="normal">Normal Option</Select.Option>
    </>
  ),
};

// =============================================================================
// ALL STATES COMPARISON
// =============================================================================

export const AllStates: Story = {
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
  render: () => (
    <>
      <Select.Option value="default">Default Option</Select.Option>
      <Select.Option value="selected" selected>Selected Option</Select.Option>
      <Select.Option value="disabled" disabled>Disabled Option</Select.Option>
    </>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all option states: default, selected, and disabled.',
      },
    },
  },
};