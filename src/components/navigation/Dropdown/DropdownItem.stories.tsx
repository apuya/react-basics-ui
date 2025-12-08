import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownContext } from './Dropdown';
import { type ReactNode, useRef, useState } from 'react';

const MockDropdownWrapper = ({ children }: { children: ReactNode }) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <DropdownContext.Provider value={{ 
      isOpen: true, 
      setIsOpen: () => {}, 
      triggerRef, 
      menuId: 'mock-menu-id'
    }}>
      <div role="menu" className="p-2" style={{ width: '280px', minHeight: '200px' }}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

/**
 * DropdownItem represents an individual actionable item in the dropdown menu.
 * Must be used within Dropdown.Menu.
 */
const meta = {
  title: 'Navigation/Dropdown/Subcomponents/DropdownItem',
  component: Dropdown.Item,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Actionable menu items with support for icons, shortcuts, variants, checkboxes, descriptions, and disabled states.

### Features
- Icons and keyboard shortcuts
- Semantic variants (default, success, info, warning, danger)
- Checkbox support for selection
- Secondary descriptions
- Disabled state
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '250px', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
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
    <MockDropdownWrapper>
      <Dropdown.Item {...args} />
    </MockDropdownWrapper>
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
 * All available item variants.
 */
export const Variants: Story = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.Item variant="default">Default Item</Dropdown.Item>
      <Dropdown.Item variant="danger">Danger Item</Dropdown.Item>
      <Dropdown.Item variant="warning">Warning Item</Dropdown.Item>
      <Dropdown.Item variant="success">Success Item</Dropdown.Item>
      <Dropdown.Item variant="info">Info Item</Dropdown.Item>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All semantic variants: default for standard actions, danger for destructive actions, warning for cautionary actions, success for positive actions, and info for informational items.',
      },
    },
  },
};

/**
 * Item with a leading icon.
 */
export const WithIcon: Story = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.Item leadingIcon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      }>
        Edit
      </Dropdown.Item>
    </MockDropdownWrapper>
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
    <MockDropdownWrapper>
      <Dropdown.Item shortcut="⌘N">New File</Dropdown.Item>
    </MockDropdownWrapper>
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
    <MockDropdownWrapper>
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
    </MockDropdownWrapper>
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
    <MockDropdownWrapper>
      <Dropdown.Item disabled>Disabled Action</Dropdown.Item>
    </MockDropdownWrapper>
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
    <MockDropdownWrapper>
      <Dropdown.Item
        variant="danger"
        leadingIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        }
        shortcut="⌘⌫"
      >
        Delete Account
      </Dropdown.Item>
    </MockDropdownWrapper>
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
    <MockDropdownWrapper>
      <Dropdown.Item
        leadingIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      >
        Profile
      </Dropdown.Item>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world example showing various item configurations: icons, shortcuts, disabled states, and plain items.',
      },
    },
  },
};

/**
 * Interactive checkbox items (controlled mode).
 */
export const WithCheckboxControlled: Story = {
  render: () => {
    const [sidebar, setSidebar] = useState(true);
    const [toolbar, setToolbar] = useState(false);
    const [notifications, setNotifications] = useState(true);
    
    return (
      <MockDropdownWrapper>
        <Dropdown.Item checked={sidebar} onCheckedChange={setSidebar}>
          Show Sidebar
        </Dropdown.Item>
        <Dropdown.Item checked={toolbar} onCheckedChange={setToolbar}>
          Show Toolbar
        </Dropdown.Item>
        <Dropdown.Item checked={notifications} onCheckedChange={setNotifications}>
          Enable Notifications
        </Dropdown.Item>
      </MockDropdownWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled checkbox items with `checked` and `onCheckedChange`. Click to toggle - state is managed externally.',
      },
    },
  },
};

/**
 * Uncontrolled checkbox items with defaultChecked.
 */
export const WithCheckboxUncontrolled: Story = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.Item defaultChecked={true} onCheckedChange={(checked) => console.log('Sidebar:', checked)}>
        Show Sidebar
      </Dropdown.Item>
      <Dropdown.Item defaultChecked={false} onCheckedChange={(checked) => console.log('Toolbar:', checked)}>
        Show Toolbar
      </Dropdown.Item>
      <Dropdown.Item defaultChecked={true} onCheckedChange={(checked) => console.log('Notifications:', checked)}>
        Enable Notifications
      </Dropdown.Item>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Uncontrolled checkbox items using `defaultChecked`. Click to toggle - state is managed internally. Use `onCheckedChange` to listen for changes.',
      },
    },
  },
};

/**
 * Items with description text.
 */
export const WithDescription: Story = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.Item description="Open a new empty document">New File</Dropdown.Item>
      <Dropdown.Item description="Save changes to current file">Save</Dropdown.Item>
      <Dropdown.Item description="Export as PDF, PNG, or SVG">Export</Dropdown.Item>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Items with secondary description text for additional context.',
      },
    },
  },
};

/**
 * Items with both checkbox and description.
 */
export const WithCheckboxAndDescription: Story = {
  render: () => {
    const [email, setEmail] = useState(true);
    const [push, setPush] = useState(false);
    
    return (
      <MockDropdownWrapper>
        <Dropdown.Item 
          checked={email} 
          onCheckedChange={setEmail}
          description="Receive email notifications"
        >
          Email Alerts
        </Dropdown.Item>
        <Dropdown.Item 
          checked={push} 
          onCheckedChange={setPush}
          description="Get push notifications on mobile"
        >
          Push Notifications
        </Dropdown.Item>
      </MockDropdownWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Combining checkbox indicators with descriptions for rich toggle options. Click to toggle!',
      },
    },
  },
};
