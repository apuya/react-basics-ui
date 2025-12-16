import type { Meta, StoryObj } from '@storybook/react';
import { BiEdit, BiCopy, BiTrash, BiShare, BiDownload, BiArchive } from 'react-icons/bi';
import { Menu } from './Menu';

/**
 * ## Menu
 * 
 * A primitive for executing **actions and commands**.
 * Used when users need to trigger operations, not select values.
 * 
 * ### Architecture
 * - **Menu** - Root component managing open/close state
 * - **Menu.Container** - Action wrapper (role="menu") with keyboard navigation
 * - **Menu.Item** - Actionable command (role="menuitem") with callback
 * - **Menu.Divider** - Visual separator between sections
 * - **Menu.Label** - Non-interactive section header
 * 
 * ### When to Use Menu
 * **"What action do you want to perform?"**
 * - ✅ Context menus (Cut, Copy, Paste, Delete)
 * - ✅ Dropdown actions (Edit, Duplicate, Share)
 * - ✅ Toolbar menus (Export, Print, Download)
 * - ✅ Navigation dropdowns (Profile → Settings → Logout)
 * 
 * ### When NOT to Use (Use List instead)
 * - ❌ Selecting values (country, category, sort order)
 * - ❌ Filter/settings options that show state
 * - ❌ Autocomplete suggestions
 * 
 * ### Key Difference
 * - **Menu:** Executes actions/commands ("Do this") - no selection state
 * - **List:** Selects values/data ("Choose this") - shows check icon
 * 
 * ---
 * 
 * ## Menu.Container Props
 * 
 * | Prop | Type | Description |
 * |------|------|-------------|
 * | `className` | `string` | Additional CSS classes |
 * | `children` | `ReactNode` | Menu items |
 * 
 * ---
 * 
 * ## Menu.Item Props
 * 
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `onAction` | `() => void` | - | Callback when activated |
 * | `disabled` | `boolean` | `false` | Disable interaction |
 * | `variant` | `'default' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'default'` | Semantic color |
 * | `leadingIcon` | `ReactNode` | - | Icon before label |
 * | `trailingIcon` | `ReactNode` | - | Icon after label |
 * | `shortcut` | `string` | - | Keyboard shortcut hint |
 * | `description` | `string` | - | Secondary text |
 * | `closeOnAction` | `boolean` | `true` | Override auto-close |
 */
const meta: Meta<typeof Menu> = {
  title: 'Primitives/Menu',
  component: Menu,
  subcomponents: {
    'Menu.Container': Menu.Container as React.ComponentType<unknown>,
    'Menu.Item': Menu.Item as React.ComponentType<unknown>,
    'Menu.Divider': Menu.Divider as React.ComponentType<unknown>,
    'Menu.Label': Menu.Label as React.ComponentType<unknown>,
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the menu is initially open',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state',
      table: { category: 'State' },
    },
    onOpenChange: {
      action: 'openChange',
      description: 'Callback when open state changes',
      table: { category: 'Events' },
    },
    closeOnAction: {
      control: 'boolean',
      description: 'Close menu after action',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    id: {
      control: 'text',
      description: 'Base ID for accessibility',
      table: { category: 'Accessibility', defaultValue: { summary: 'menu' } },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '300px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Menu>;

// =============================================================================
// Default
// =============================================================================

/**
 * Basic action menu. Each item triggers an action via `onAction` callback.
 */
export const Default: Story = {
  render: () => (
    <div className="w-56">
      <Menu defaultOpen>
        <Menu.Container>
          <Menu.Item onAction={() => console.log('Edit')}>Edit</Menu.Item>
          <Menu.Item onAction={() => console.log('Duplicate')}>Duplicate</Menu.Item>
          <Menu.Item onAction={() => console.log('Delete')}>Delete</Menu.Item>
        </Menu.Container>
      </Menu>
    </div>
  ),
};

// =============================================================================
// With Icons
// =============================================================================

/**
 * Menu items with leading icons for visual context.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="w-56">
      <Menu defaultOpen>
        <Menu.Container>
          <Menu.Item leadingIcon={<BiEdit />} onAction={() => console.log('Edit')}>Edit</Menu.Item>
          <Menu.Item leadingIcon={<BiCopy />} onAction={() => console.log('Duplicate')}>Duplicate</Menu.Item>
          <Menu.Item leadingIcon={<BiTrash />} variant="danger" onAction={() => console.log('Delete')}>Delete</Menu.Item>
        </Menu.Container>
      </Menu>
    </div>
  ),
};

// =============================================================================
// With Shortcuts
// =============================================================================

/**
 * Keyboard shortcut hints displayed on the right side.
 */
export const WithShortcuts: Story = {
  render: () => (
    <div className="w-56">
      <Menu defaultOpen>
        <Menu.Container>
          <Menu.Item leadingIcon={<BiEdit />} shortcut="⌘E" onAction={() => console.log('Edit')}>Edit</Menu.Item>
          <Menu.Item leadingIcon={<BiCopy />} shortcut="⌘D" onAction={() => console.log('Duplicate')}>Duplicate</Menu.Item>
          <Menu.Divider />
          <Menu.Item leadingIcon={<BiTrash />} shortcut="⌘⌫" variant="danger" onAction={() => console.log('Delete')}>Delete</Menu.Item>
        </Menu.Container>
      </Menu>
    </div>
  ),
};

// =============================================================================
// With Sections
// =============================================================================

/**
 * Organized menu with labels, dividers, and semantic variants.
 */
export const WithSections: Story = {
  render: () => (
    <div className="w-56">
      <Menu defaultOpen>
        <Menu.Container>
          <Menu.Label>Actions</Menu.Label>
          <Menu.Item leadingIcon={<BiEdit />} onAction={() => console.log('Edit')}>
            Edit
          </Menu.Item>
          <Menu.Item leadingIcon={<BiCopy />} onAction={() => console.log('Duplicate')}>
            Duplicate
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>Share</Menu.Label>
          <Menu.Item leadingIcon={<BiShare />} onAction={() => console.log('Share Link')}>
            Share Link
          </Menu.Item>
          <Menu.Item leadingIcon={<BiDownload />} onAction={() => console.log('Export')}>
            Export
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item leadingIcon={<BiTrash />} variant="danger" onAction={() => console.log('Delete')}>
            Delete
          </Menu.Item>
        </Menu.Container>
      </Menu>
    </div>
  ),
};

// =============================================================================
// Variants
// =============================================================================

/**
 * Semantic color variants with colored text and hover backgrounds.
 */
export const Variants: Story = {
  render: () => (
    <div className="w-56">
      <Menu defaultOpen>
        <Menu.Container>
          <Menu.Item onAction={() => console.log('Default')}>Default</Menu.Item>
          <Menu.Item variant="success" onAction={() => console.log('Success')}>Success</Menu.Item>
          <Menu.Item variant="info" onAction={() => console.log('Info')}>Info</Menu.Item>
          <Menu.Item variant="warning" onAction={() => console.log('Warning')}>Warning</Menu.Item>
          <Menu.Item variant="danger" onAction={() => console.log('Danger')}>Danger</Menu.Item>
        </Menu.Container>
      </Menu>
    </div>
  ),
};

// =============================================================================
// Disabled Items
// =============================================================================

/**
 * Disabled items prevent interaction and show reduced opacity.
 */
export const DisabledItems: Story = {
  render: () => (
    <div className="w-56">
      <Menu defaultOpen>
        <Menu.Container>
          <Menu.Item leadingIcon={<BiEdit />} onAction={() => console.log('Edit')}>Edit</Menu.Item>
          <Menu.Item leadingIcon={<BiCopy />} disabled>Duplicate (Disabled)</Menu.Item>
          <Menu.Item leadingIcon={<BiShare />} onAction={() => console.log('Share')}>Share</Menu.Item>
        </Menu.Container>
      </Menu>
    </div>
  ),
};

// =============================================================================
// With Descriptions
// =============================================================================

/**
 * Secondary description text below the main label.
 */
export const WithDescriptions: Story = {
  render: () => (
    <div className="w-72">
      <Menu defaultOpen>
        <Menu.Container>
          <Menu.Item leadingIcon={<BiShare />} description="Anyone with the link" onAction={() => console.log('Share')}>Share publicly</Menu.Item>
          <Menu.Item leadingIcon={<BiDownload />} description="Save to device" onAction={() => console.log('Download')}>Download</Menu.Item>
          <Menu.Item leadingIcon={<BiArchive />} description="Move to archive" onAction={() => console.log('Archive')}>Archive</Menu.Item>
        </Menu.Container>
      </Menu>
    </div>
  ),
};
