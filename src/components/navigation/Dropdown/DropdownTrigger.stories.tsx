import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

/**
 * DropdownTrigger is a subcomponent designed for compound use within the Dropdown component.
 * It acts as the clickable element that toggles the dropdown menu visibility.
 * 
 * **Important**: This component requires the DropdownContext provided by the parent Dropdown component.
 * It should always be used as `<Dropdown.Trigger>` within a `<Dropdown>` wrapper.
 * 
 * @see Use the main Dropdown component stories for complete usage examples
 */
const meta = {
  title: 'Navigation/Dropdown/Subcomponents/DropdownTrigger',
  component: Dropdown.Trigger,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The DropdownTrigger component is a compound subcomponent that must be used within a Dropdown parent.
It provides the interactive trigger element for opening and closing the dropdown menu.

### Compound Usage Pattern

\`\`\`tsx
<Dropdown>
  <Dropdown.Trigger>Click me</Dropdown.Trigger>
  <Dropdown.Menu>
    <Dropdown.Item>Option 1</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
\`\`\`

### Features
- Accessible button with proper ARIA attributes
- Supports polymorphic rendering with \`asChild\` prop
- Automatically manages focus and keyboard interaction
- Context-aware toggle behavior

### Props
- \`asChild\`: Render as a different element using Slot pattern
- All standard button HTML attributes are supported
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    asChild: {
      control: 'boolean',
      description: 'Merge props with child element instead of rendering a button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'The trigger content',
    },
  },
} satisfies Meta<typeof Dropdown.Trigger>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default trigger with text content within a Dropdown wrapper.
 */
export const Default: Story = {
  args: {
    children: 'Open Menu',
  },
  render: (args) => (
    <Dropdown>
      <Dropdown.Trigger {...args} />
      <Dropdown.Menu>
        <Dropdown.Item>Action 1</Dropdown.Item>
        <Dropdown.Item>Action 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic trigger with text content. Click to toggle the dropdown menu.',
      },
    },
  },
};

/**
 * Trigger with an icon and text using asChild for custom styling.
 */
export const WithCustomButton: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
          Options
        </button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using `asChild` prop to render a custom button with icon. The trigger merges its props with the child button element.',
      },
    },
  },
};

/**
 * Icon-only trigger button for compact UIs.
 */
export const IconOnly: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger 
        className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-label="More options"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Action</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only trigger with proper aria-label for accessibility. Useful for compact toolbars and action menus.',
      },
    },
  },
};

/**
 * Disabled trigger state.
 */
export const Disabled: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger disabled>
        Disabled Trigger
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Action</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled trigger prevents dropdown interaction. The menu cannot be opened when the trigger is disabled.',
      },
    },
  },
};
