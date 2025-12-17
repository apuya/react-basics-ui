import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown } from './Dropdown';
import { Button } from '@/components/actions/Button';
import { Avatar } from '@/components/data-display/Avatar';
import { HStack, VStack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/typography/Text';
import { BiEdit, BiCopy, BiTrash, BiDownload, BiShare, BiCheck, BiArchive } from 'react-icons/bi';

/**
 * ## Dropdown
 * 
 * A positioned **action menu** that opens from a trigger element.
 * Wraps Menu primitive with positioning, click-outside, and keyboard interaction.
 * 
 * ### Architecture
 * - **Dropdown** - Root managing open/close state
 * - **Dropdown.Trigger** - Enhances child with dropdown behavior (cloneElement)
 * - **Dropdown.Menu** - Positioned container with click-outside and keyboard handling
 * - **Dropdown.Item** - Menu items (delegates to Menu.Item)
 * - **Dropdown.MenuItem** - Dividers, labels, search, footer (delegates to Menu)
 * 
 * ### When to Use Dropdown
 * - ✅ Action menus triggered by buttons (Edit, Share, Delete)
 * - ✅ User account menus (Profile, Settings, Logout)
 * - ✅ Context menus for table rows/cards
 * - ✅ Navigation dropdowns
 * 
 * ### Features
 * - Keyboard navigation (Arrow keys, Home, End, Escape, Enter/Space)
 * - Click-outside detection
 * - Focus management
 * - Flexible positioning (4 sides × 3 alignments)
 * - Responsive viewport-aware positioning
 * - Icons, shortcuts, descriptions, variants
 * - Checkbox support
 * - Controlled/uncontrolled modes
 * 
 * ---
 * 
 * ## Dropdown.Menu Props
 * 
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Menu position relative to trigger |
 * | `align` | `'start' \| 'center' \| 'end'` | `'start'` | Alignment along the side |
 * | `responsive` | `boolean` | `false` | Auto-flip to avoid viewport overflow |
 * | `maxHeight` | `number` | - | Max height with scrolling |
 * | `enableAnimation` | `boolean` | `true` | Fade/scale animation |
 * 
 * ---
 * 
 * ## Dropdown.Item Props
 * 
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | `leadingIcon` | `ReactNode` | - | Icon before label |
 * | `trailingIcon` | `ReactNode` | - | Icon after label |
 * | `shortcut` | `string` | - | Keyboard shortcut hint |
 * | `description` | `string` | - | Secondary text |
 * | `variant` | `'default' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'default'` | Semantic color |
 * | `disabled` | `boolean` | `false` | Disable interaction |
 * | `checked` | `boolean` | - | Show checkbox |
 * | `onCheckedChange` | `(checked: boolean) => void` | - | Checkbox callback |
 */
const meta: Meta<typeof Dropdown> = {
  title: 'Overlays/Dropdown',
  component: Dropdown,
  subcomponents: {
    'Dropdown.Trigger': Dropdown.Trigger as any,
    'Dropdown.Menu': Dropdown.Menu as any,
    'Dropdown.Item': Dropdown.Item as any,
    'Dropdown.MenuItem': Dropdown.MenuItem as any,
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the dropdown is initially open',
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
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400px', padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// =============================================================================
// Default
// =============================================================================

/**
 * Basic action dropdown menu.
 */
export const Default: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="tertiary">Actions</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item>Duplicate</Dropdown.Item>
        <Dropdown.Item>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
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
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="tertiary">Actions</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item leadingIcon={<BiEdit />}>Edit</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiCopy />}>Duplicate</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiTrash />} variant="danger">Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// =============================================================================
// With Shortcuts
// =============================================================================

/**
 * Keyboard shortcut hints displayed on the right.
 */
export const WithShortcuts: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="tertiary">Document</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item leadingIcon={<BiEdit />} shortcut="⌘E">Edit</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiCopy />} shortcut="⌘D">Duplicate</Dropdown.Item>
        <Dropdown.MenuItem variant="divider" />
        <Dropdown.Item leadingIcon={<BiTrash />} shortcut="⌘⌫" variant="danger">Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// =============================================================================
// With Sections
// =============================================================================

/**
 * Organized menu with headers, dividers, and semantic variants.
 */
export const WithSections: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="tertiary">Options</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.MenuItem variant="header" label="Actions" />
        <Dropdown.Item leadingIcon={<BiEdit />}>Edit</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiCopy />}>Duplicate</Dropdown.Item>
        <Dropdown.MenuItem variant="divider" />
        <Dropdown.MenuItem variant="header" label="Share" />
        <Dropdown.Item leadingIcon={<BiShare />} variant="info">Share Link</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiDownload />}>Download</Dropdown.Item>
        <Dropdown.MenuItem variant="divider" />
        <Dropdown.Item leadingIcon={<BiTrash />} variant="danger">Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
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
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="tertiary">Variants</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Default</Dropdown.Item>
        <Dropdown.Item variant="success" leadingIcon={<BiCheck />}>Success</Dropdown.Item>
        <Dropdown.Item variant="info" leadingIcon={<BiShare />}>Info</Dropdown.Item>
        <Dropdown.Item variant="warning" leadingIcon={<BiArchive />}>Warning</Dropdown.Item>
        <Dropdown.Item variant="danger" leadingIcon={<BiTrash />}>Danger</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
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
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="tertiary">Actions</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item leadingIcon={<BiEdit />}>Edit</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiCopy />} disabled>Duplicate (Disabled)</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiShare />}>Share</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
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
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="tertiary">Share</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item 
          leadingIcon={<BiShare />} 
          description="Anyone with the link"
        >
          Share Publicly
        </Dropdown.Item>
        <Dropdown.Item 
          leadingIcon={<BiDownload />} 
          description="Save to device"
        >
          Download
        </Dropdown.Item>
        <Dropdown.Item 
          leadingIcon={<BiArchive />} 
          description="Move to archive"
        >
          Archive
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// =============================================================================
// With Checkboxes
// =============================================================================

/**
 * Interactive checkboxes for multi-select scenarios.
 */
export const WithCheckboxes: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['notifications']);
    
    const toggle = (key: string) => {
      setSelected(prev => 
        prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
      );
    };
    
    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button variant="tertiary">Preferences</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.MenuItem variant="header" label="Settings" />
          <Dropdown.Item 
            checked={selected.includes('notifications')} 
            onCheckedChange={() => toggle('notifications')}
          >
            Enable Notifications
          </Dropdown.Item>
          <Dropdown.Item 
            checked={selected.includes('autosave')} 
            onCheckedChange={() => toggle('autosave')}
          >
            Auto-save
          </Dropdown.Item>
          <Dropdown.Item 
            checked={selected.includes('darkmode')} 
            onCheckedChange={() => toggle('darkmode')}
          >
            Dark Mode
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  },
};

// =============================================================================
// Scrollable List
// =============================================================================

/**
 * Menu with maxHeight constraint for long lists.
 */
export const ScrollableList: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="tertiary">Countries</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu maxHeight={250}>
        {['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 
          'Italy', 'Spain', 'Japan', 'China', 'India', 'Brazil', 'Mexico'].map((country) => (
          <Dropdown.Item key={country}>{country}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// =============================================================================
// Positioning
// =============================================================================

/**
 * Position menu on different sides and alignments.
 */
export const Positioning: Story = {
  render: () => (
    <HStack gap="xl" wrap="wrap">
      <Dropdown>
        <Dropdown.Trigger>
          <Button variant="tertiary" size="small">Bottom Start</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu side="bottom" align="start">
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
      <Dropdown>
        <Dropdown.Trigger>
          <Button variant="tertiary" size="small">Bottom End</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu side="bottom" align="end">
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
      <Dropdown>
        <Dropdown.Trigger>
          <Button variant="tertiary" size="small">Right</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu side="right" align="center">
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </HStack>
  ),
};

// =============================================================================
// User Account Menu
// =============================================================================

/**
 * Real-world user menu with avatar trigger.
 */
export const UserAccountMenu: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Box
          as="button"
          className="flex items-center gap-2 px-3 py-2 rounded-md border border-[color:var(--semantic-border-default)] bg-[color:var(--semantic-surface-primary)] cursor-pointer hover:bg-[color:var(--semantic-surface-hover)] transition-colors"
        >
          <Avatar size="sm">
            <Avatar.Fallback>JD</Avatar.Fallback>
          </Avatar>
          <Text>John Doe</Text>
        </Box>
      </Dropdown.Trigger>
      <Dropdown.Menu align="end">
        <Dropdown.MenuItem variant="header" label="John Doe" description="john.doe@example.com" />
        <Dropdown.Item>Profile</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.MenuItem variant="divider" />
        <Dropdown.Item>Help</Dropdown.Item>
        <Dropdown.MenuItem variant="divider" />
        <Dropdown.Item variant="danger">Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// =============================================================================
// Quick Actions
// =============================================================================

/**
 * Compact menu with icon trigger, perfect for table rows.
 */
export const QuickActions: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="tertiary" size="small">⋮</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu align="end">
        <Dropdown.Item leadingIcon={<BiEdit />}>Edit</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiCopy />}>Duplicate</Dropdown.Item>
        <Dropdown.MenuItem variant="divider" />
        <Dropdown.Item leadingIcon={<BiShare />} variant="info">Share</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiTrash />} variant="danger">Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};
