import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

/**
 * DropdownItem is a subcomponent designed for compound use within the Dropdown component.
 * It represents an individual actionable item in the dropdown menu.
 * 
 * **Important**: This component requires the DropdownContext provided by the parent Dropdown component.
 * It should always be used as `<Dropdown.Item>` within a `<Dropdown.Menu>`.
 * 
 * @see Use the main Dropdown component stories for complete usage examples
 */
const meta = {
  title: 'Navigation/Dropdown/Subcomponents/DropdownItem',
  component: Dropdown.Item,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The DropdownItem component is a compound subcomponent that must be used within a Dropdown parent.
It renders individual menu items with support for icons, shortcuts, and disabled states.

### Compound Usage Pattern

\`\`\`tsx
<Dropdown>
  <Dropdown.Trigger>Menu</Dropdown.Trigger>
  <Dropdown.Menu>
    <Dropdown.Item leadingIcon={icon} shortcut="⌘K">
      Action
    </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
\`\`\`

### Features
- Leading icon support for visual context
- Keyboard shortcut display
- Disabled state with visual feedback
- Destructive state for dangerous actions
- Automatic menu close on click
- Focus management for keyboard navigation

### Props
- \`leadingIcon\`: Optional icon element displayed before text
- \`shortcut\`: Optional keyboard shortcut text displayed at the end
- \`disabled\`: Prevents interaction and applies disabled styles
- \`destructive\`: Applies warning/danger styling for delete actions
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    leadingIcon: {
      control: false,
      description: 'Optional icon element to display before the item text',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    shortcut: {
      control: 'text',
      description: 'Keyboard shortcut text displayed at the end of the item',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the item and prevents interaction',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    destructive: {
      control: 'boolean',
      description: 'Applies destructive styling (typically red) for dangerous actions',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'The item content/label',
    },
  },
} satisfies Meta<typeof Dropdown.Item>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default item with text content.
 */
export const Default: Story = {
  args: {
    children: 'Menu Item',
  },
  render: (args) => (
    <Dropdown defaultOpen>
      <Dropdown.Trigger>Menu</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item {...args} />
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic dropdown item with text content. Clicking the item will close the menu.',
      },
    },
  },
};

/**
 * Item with a leading icon.
 */
export const WithIcon: Story = {
  render: () => (
    <Dropdown defaultOpen>
      <Dropdown.Trigger>Menu</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item leadingIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        }>
          Edit
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Items with leading icons for visual context. Icons help users quickly identify actions.',
      },
    },
  },
};

/**
 * Item with keyboard shortcut display.
 */
export const WithShortcut: Story = {
  render: () => (
    <Dropdown defaultOpen>
      <Dropdown.Trigger>Menu</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item shortcut="⌘N">New File</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Items displaying keyboard shortcuts. Helps users learn and remember keyboard commands.',
      },
    },
  },
};

/**
 * Item with both icon and shortcut.
 */
export const WithIconAndShortcut: Story = {
  render: () => (
    <Dropdown defaultOpen>
      <Dropdown.Trigger>Menu</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item 
          leadingIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          }
          shortcut="⌘C"
        >
          Copy
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete item configuration with both icon and keyboard shortcut for maximum clarity.',
      },
    },
  },
};

/**
 * Disabled item state.
 */
export const Disabled: Story = {
  render: () => (
    <Dropdown defaultOpen>
      <Dropdown.Trigger>Menu</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item disabled>Disabled Action</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled items are visually muted and cannot be interacted with. Use for contextually unavailable actions.',
      },
    },
  },
};

/**
 * Destructive item for dangerous actions.
 */
export const Destructive: Story = {
  render: () => (
    <Dropdown defaultOpen>
      <Dropdown.Trigger>Menu</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item 
          destructive
          leadingIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          }
          shortcut="⌘⌫"
        >
          Delete Account
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Destructive items use red/warning colors to indicate dangerous actions like deletion.',
      },
    },
  },
};

/**
 * Mixed item configurations.
 */
export const MixedStates: Story = {
  render: () => (
    <Dropdown defaultOpen>
      <Dropdown.Trigger>Menu</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item 
          leadingIcon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        >
          Profile
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example showing various item configurations: icons, shortcuts, disabled states, and plain items.',
      },
    },
  },
};
