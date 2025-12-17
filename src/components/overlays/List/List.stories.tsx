import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BiHome, BiUser, BiCog, BiHelpCircle, BiStar, BiTrash } from 'react-icons/bi';
import { List } from './List';

/**
 * ## List
 * 
 * A primitive for selecting **values and data** from options.
 * Used when users need to choose from a list of items.
 * 
 * ### Architecture
 * - **List** - Root component managing selection state
 * - **List.Container** - Container with keyboard navigation (role="listbox")
 * - **List.Item** - Selectable option (role="option") with check indicator
 * 
 * ### When to Use List
 * **"What value do you want to select?"**
 * - ✅ Select dropdowns (country, category, status)
 * - ✅ Autocomplete suggestions
 * - ✅ Filter/sort options (Sort by: Name, Date, Size)
 * - ✅ Settings selectors (language, theme, view mode)
 * 
 * ### When NOT to Use (Use Menu instead)
 * - ❌ Action commands (Edit, Delete, Share)
 * - ❌ Context menus (right-click actions)
 * - ❌ Navigation dropdowns (Profile → Logout)
 * 
 * ### Key Difference
 * - **List:** Displays data/values to choose from (shows selection with check icon)
 * - **Menu:** Displays actions/commands to execute (no selection state)
 * 
 * ---
 * 
 * ## List.Container Props
 * 
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `className` | `string` | - | Additional CSS classes |
 * | `children` | `ReactNode` | - | List.Item elements |
 * | `...props` | `HTMLDivElement` | - | All div attributes supported |
 * 
 * **Built-in behaviors:**
 * - Keyboard navigation (Arrow Up/Down)
 * - Click outside to close (standalone mode)
 * - Escape key to close (standalone mode)
 * - ARIA `role="listbox"`
 * 
 * ---
 * 
 * ## List.Item Props
 * 
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `value` | `string` | **required** | Unique value for selection |
 * | `disabled` | `boolean` | `false` | Disable interaction |
 * | `selected` | `boolean` | - | Selection state (standalone mode) |
 * | `onOptionSelect` | `(value: string) => void` | - | Selection callback (standalone mode) |
 * | `leadingIcon` | `ReactNode` | - | Icon before label |
 * | `trailingIcon` | `ReactNode` | - | Icon after label |
 * | `description` | `string` | - | Secondary text below label |
 * | `hideCheckIcon` | `boolean` | `false` | Hide check icon when selected |
 * | `className` | `string` | - | Additional CSS classes |
 * | `children` | `ReactNode` | - | Label content |
 */
const meta: Meta<typeof List> = {
  title: 'Primitives/List',
  component: List,
  subcomponents: {
    'List.Container': List.Container as React.ComponentType<unknown>,
    'List.Item': List.Item as React.ComponentType<unknown>,
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // List Props
    value: {
      control: 'text',
      description: 'Controlled selected value',
      table: { category: 'List' },
    },
    defaultValue: {
      control: 'text',
      description: 'Initial value for uncontrolled mode',
      table: { category: 'List' },
    },
    onChange: {
      action: 'changed',
      description: 'Callback when selection changes',
      table: { category: 'List' },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the list container is initially open',
      table: { category: 'List', defaultValue: { summary: 'false' } },
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Close the list when an item is selected',
      table: { category: 'List', defaultValue: { summary: 'false' } },
    },
    id: {
      control: 'text',
      description: 'Base ID for accessibility attributes',
      table: { category: 'List', defaultValue: { summary: 'list' } },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the root element',
      table: { category: 'List' },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '320px', paddingBottom: '100px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof List>;

// =============================================================================
// Default
// =============================================================================

/**
 * Basic list with selectable options. Click an option to select it.
 * The check icon indicates the currently selected item.
 */
export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState('');

    return (
      <div className="w-64">
        <List value={selected} onChange={setSelected} defaultOpen>
          <List.Container>
            <List.Item value="option-1">Option 1</List.Item>
            <List.Item value="option-2">Option 2</List.Item>
            <List.Item value="option-3">Option 3</List.Item>
            <List.Item value="option-4">Option 4</List.Item>
          </List.Container>
        </List>
        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
          Selected: {selected || 'None'}
        </p>
      </div>
    );
  },
};

// =============================================================================
// With Icons
// =============================================================================

/**
 * List items can include leading and/or trailing icons for visual context.
 * Use `leadingIcon` for primary icons and `trailingIcon` for secondary actions.
 */
export const WithIcons: Story = {
  render: () => {
    const [selected, setSelected] = useState('');

    return (
      <div className="w-64">
        <List value={selected} onChange={setSelected} defaultOpen>
          <List.Container>
            <List.Item value="home" leadingIcon={<BiHome />}>
              Home
            </List.Item>
            <List.Item value="profile" leadingIcon={<BiUser />}>
              Profile
            </List.Item>
            <List.Item value="settings" leadingIcon={<BiCog />}>
              Settings
            </List.Item>
            <List.Item value="help" leadingIcon={<BiHelpCircle />}>
              Help
            </List.Item>
          </List.Container>
        </List>
      </div>
    );
  },
};

// =============================================================================
// With Descriptions
// =============================================================================

/**
 * Items can include secondary description text below the main label
 * for additional context or details.
 */
export const WithDescriptions: Story = {
  render: () => {
    const [selected, setSelected] = useState('');

    return (
      <div className="w-80">
        <List value={selected} onChange={setSelected} defaultOpen>
          <List.Container>
            <List.Item 
              value="free" 
              leadingIcon={<BiStar />}
              description="Basic features, up to 3 projects"
            >
              Free Plan
            </List.Item>
            <List.Item 
              value="pro" 
              leadingIcon={<BiStar />}
              description="Advanced features, unlimited projects"
            >
              Pro Plan
            </List.Item>
            <List.Item 
              value="enterprise" 
              leadingIcon={<BiStar />}
              description="Custom solutions, dedicated support"
            >
              Enterprise
            </List.Item>
          </List.Container>
        </List>
      </div>
    );
  },
};

// =============================================================================
// With Disabled Items
// =============================================================================

/**
 * Individual items can be disabled. Disabled items cannot be selected
 * and are visually dimmed. Keyboard navigation skips disabled items.
 */
export const WithDisabledItems: Story = {
  render: () => {
    const [selected, setSelected] = useState('');

    return (
      <div className="w-64">
        <List value={selected} onChange={setSelected} defaultOpen>
          <List.Container>
            <List.Item value="edit" leadingIcon={<BiCog />}>
              Edit
            </List.Item>
            <List.Item value="duplicate" leadingIcon={<BiCog />}>
              Duplicate
            </List.Item>
            <List.Item value="archive" leadingIcon={<BiCog />} disabled>
              Archive (Disabled)
            </List.Item>
            <List.Item value="delete" leadingIcon={<BiTrash />} disabled>
              Delete (Disabled)
            </List.Item>
          </List.Container>
        </List>
      </div>
    );
  },
};

// =============================================================================
// Close on Select
// =============================================================================

/**
 * With `closeOnSelect`, the list automatically closes when an item is selected.
 * Useful for dropdown menus and single-action selections.
 * 
 * Note: In a real implementation, you'd have a trigger button to reopen.
 * This demo keeps the list always open for visibility.
 */
export const CloseOnSelect: Story = {
  render: () => {
    const [selected, setSelected] = useState('');

    return (
      <div className="w-64">
        <p className="mb-2 text-sm text-[var(--color-text-secondary)]">
          Select an item - list will close (refresh to reset)
        </p>
        <List 
          value={selected} 
          onChange={setSelected} 
          defaultOpen
          closeOnSelect
        >
          <List.Container>
            <List.Item value="action-1">Action 1</List.Item>
            <List.Item value="action-2">Action 2</List.Item>
            <List.Item value="action-3">Action 3</List.Item>
          </List.Container>
        </List>
        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
          Selected: {selected || 'None'}
        </p>
      </div>
    );
  },
};

// =============================================================================
// Hide Check Icon
// =============================================================================

/**
 * The check icon can be hidden per item using `hideCheckIcon`.
 * Useful for action menus where selection state isn't relevant.
 */
export const HideCheckIcon: Story = {
  render: () => {
    const [selected, setSelected] = useState('');

    return (
      <div className="w-64">
        <List value={selected} onChange={setSelected} defaultOpen>
          <List.Container>
            <List.Item value="cut" hideCheckIcon>
              Cut
            </List.Item>
            <List.Item value="copy" hideCheckIcon>
              Copy
            </List.Item>
            <List.Item value="paste" hideCheckIcon>
              Paste
            </List.Item>
          </List.Container>
        </List>
      </div>
    );
  },
};

// =============================================================================
// Standalone Item Usage
// =============================================================================

/**
 * `List.Item` can be used standalone outside of a List context
 * using `selected` and `onOptionSelect` props directly.
 */
export const StandaloneItems: Story = {
  render: () => {
    const [selected, setSelected] = useState('option-2');

    return (
      <div className="w-64 flex flex-col gap-1 p-2 border rounded-md">
        <List.Item 
          value="option-1" 
          selected={selected === 'option-1'}
          onOptionSelect={setSelected}
        >
          Option 1
        </List.Item>
        <List.Item 
          value="option-2" 
          selected={selected === 'option-2'}
          onOptionSelect={setSelected}
        >
          Option 2
        </List.Item>
        <List.Item 
          value="option-3" 
          selected={selected === 'option-3'}
          onOptionSelect={setSelected}
        >
          Option 3
        </List.Item>
      </div>
    );
  },
};

// =============================================================================
// Keyboard Navigation
// =============================================================================

/**
 * Full keyboard support is built-in:
 * - **Arrow Up/Down**: Navigate between options
 * - **Enter/Space**: Select focused option
 * - **Escape**: Close the list
 * - **Tab**: Move focus out of the list
 * 
 * Try clicking inside the list and using arrow keys!
 */
export const KeyboardNavigation: Story = {
  render: () => {
    const [selected, setSelected] = useState('');

    return (
      <div className="w-64">
        <p className="mb-2 text-sm text-[var(--color-text-secondary)]">
          Click inside, then use ↑↓ arrows and Enter
        </p>
        <List value={selected} onChange={setSelected} defaultOpen>
          <List.Container>
            <List.Item value="first">First Item</List.Item>
            <List.Item value="second">Second Item</List.Item>
            <List.Item value="third" disabled>Third (Disabled)</List.Item>
            <List.Item value="fourth">Fourth Item</List.Item>
            <List.Item value="fifth">Fifth Item</List.Item>
          </List.Container>
        </List>
        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
          Selected: {selected || 'None'}
        </p>
      </div>
    );
  },
};

// =============================================================================
// Long List (Scrollable)
// =============================================================================

/**
 * For long lists, apply max-height and overflow to enable scrolling.
 * Keyboard navigation works seamlessly with scrollable containers.
 */
export const LongList: Story = {
  render: () => {
    const [selected, setSelected] = useState('');
    const items = Array.from({ length: 20 }, (_, i) => ({
      value: `item-${i + 1}`,
      label: `Item ${i + 1}`,
    }));

    return (
      <div className="w-64">
        <List value={selected} onChange={setSelected} defaultOpen>
          <List.Container className="max-h-60 overflow-y-auto">
            {items.map((item) => (
              <List.Item key={item.value} value={item.value}>
                {item.label}
              </List.Item>
            ))}
          </List.Container>
        </List>
      </div>
    );
  },
};
