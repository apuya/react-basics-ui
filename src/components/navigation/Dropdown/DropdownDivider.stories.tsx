import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

/**
 * DropdownDivider is a subcomponent designed for compound use within the Dropdown component.
 * It provides a visual separator between groups of dropdown items.
 * 
 * **Important**: This component is designed for use within a `<Dropdown.Menu>`.
 * It should always be used as `<Dropdown.Divider>` between `<Dropdown.Item>` elements.
 * 
 * @see Use the main Dropdown component stories for complete usage examples
 */
const meta = {
  title: 'Navigation/Dropdown/Subcomponents/DropdownDivider',
  component: Dropdown.Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The DropdownDivider component is a compound subcomponent used to visually separate groups of items in a dropdown menu.
It renders as a horizontal line with appropriate spacing.

### Compound Usage Pattern

\`\`\`tsx
<Dropdown>
  <Dropdown.Trigger>Menu</Dropdown.Trigger>
  <Dropdown.Menu>
    <Dropdown.Item>Action 1</Dropdown.Item>
    <Dropdown.Item>Action 2</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item>Destructive Action</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
\`\`\`

### Features
- Semantic HTML separator (hr element)
- Consistent spacing above and below
- Theme-aware styling
- Improves visual hierarchy in menus

### Best Practices
- Use to group related actions together
- Separate destructive actions from regular ones
- Don't overuse - too many dividers can clutter the menu
- Place between logical groups of items
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown.Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Divider separating different groups of actions.
 */
export const Default: Story = {
  render: () => (
    <Dropdown defaultOpen>
      <Dropdown.Trigger>File Menu</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>New</Dropdown.Item>
        <Dropdown.Item>Open</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Save</Dropdown.Item>
        <Dropdown.Item>Save As...</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic divider usage separating create/open actions from save actions.',
      },
    },
  },
};

/**
 * Multiple dividers for complex menus.
 */
export const MultipleDividers: Story = {
  render: () => (
    <Dropdown defaultOpen>
      <Dropdown.Trigger>Edit Menu</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item shortcut="⌘Z">Undo</Dropdown.Item>
        <Dropdown.Item shortcut="⌘⇧Z">Redo</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item shortcut="⌘X">Cut</Dropdown.Item>
        <Dropdown.Item shortcut="⌘C">Copy</Dropdown.Item>
        <Dropdown.Item shortcut="⌘V">Paste</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item shortcut="⌘A">Select All</Dropdown.Item>
        <Dropdown.Item>Deselect All</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple dividers creating clear visual groups: history operations, clipboard operations, and selection operations.',
      },
    },
  },
};

/**
 * Divider before destructive action.
 */
export const BeforeDestructiveAction: Story = {
  render: () => (
    <Dropdown defaultOpen>
      <Dropdown.Trigger>Actions</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Duplicate</Dropdown.Item>
        <Dropdown.Item>Archive</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item destructive>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common pattern: divider separates safe operations from destructive action (delete).',
      },
    },
  },
};

/**
 * Divider in settings menu.
 */
export const SettingsMenu: Story = {
  render: () => (
    <Dropdown defaultOpen>
      <Dropdown.Trigger>Settings</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Preferences</Dropdown.Item>
        <Dropdown.Item>Notifications</Dropdown.Item>
        <Dropdown.Item>Privacy</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Help Center</Dropdown.Item>
        <Dropdown.Item>About</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Divider separates main settings from help/info sections.',
      },
    },
  },
};

/**
 * User menu with account management.
 */
export const UserMenu: Story = {
  render: () => (
    <Dropdown defaultOpen>
      <Dropdown.Trigger>User Menu</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Profile</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Switch Account</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world user menu showing multiple logical groups: profile actions, account switching, and sign out.',
      },
    },
  },
};
