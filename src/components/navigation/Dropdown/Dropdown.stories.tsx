import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { DropdownErrorBoundary } from './DropdownErrorBoundary';
import { Button } from '../../forms/Button';
import { Text } from '../../typography/Text';
import { BiEdit, BiCopy, BiTrash, BiDownload, BiShare, BiCut, BiPaste, BiCheck } from 'react-icons/bi';

const meta: Meta<typeof Dropdown> = {
  title: 'Navigation/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component: 'A dropdown menu component with keyboard navigation support. Built using the compound component pattern with `Dropdown.Trigger`, `Dropdown.Menu`, `Dropdown.Item`, and `Dropdown.MenuItem` subcomponents. Supports icons, keyboard shortcuts, disabled states, variants, checkboxes, descriptions, and full keyboard navigation.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '450px', padding: '2rem', width: '100%', maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// Basic Usage
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic dropdown menu with simple text items.',
      },
    },
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="tertiary">Open Menu</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>New File</Dropdown.Item>
        <Dropdown.Item>Open File</Dropdown.Item>
        <Dropdown.Item>Save</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// All Features Combined
export const CompleteExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive example showing icons, shortcuts, variants, dividers, disabled states, checkboxes, and descriptions all in one menu.',
      },
    },
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="tertiary">Actions Menu</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.MenuItem variant="header" title="File Actions" description="Manage your files" />
        <Dropdown.Item leadingIcon={<BiEdit />} shortcut="⌘N">
          New File
        </Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiCopy />} shortcut="⌘D" checked={true}>
          Auto-save Enabled
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.MenuItem variant="header" title="Export Options" />
        <Dropdown.Item 
          leadingIcon={<BiDownload />} 
          variant="success"
          description="Download as PDF"
        >
          Export Document
        </Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiShare />} variant="info" disabled>
          Share (Coming Soon)
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item leadingIcon={<BiTrash />} variant="danger" shortcut="⌘⌫">
          Delete File
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// Semantic Variants
export const ItemVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All available semantic variants: default, success, info, warning, and danger.',
      },
    },
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="tertiary">Variants</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item variant="default">Default Action</Dropdown.Item>
        <Dropdown.Item variant="success" leadingIcon={<BiCheck />}>Success Action</Dropdown.Item>
        <Dropdown.Item variant="info" leadingIcon={<BiShare />}>Info Action</Dropdown.Item>
        <Dropdown.Item variant="warning" leadingIcon={<BiDownload />}>Warning Action</Dropdown.Item>
        <Dropdown.Item variant="danger" leadingIcon={<BiTrash />}>Danger Action</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// Positioning
export const Positioning: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Menus can be positioned on different sides and aligned to start, center, or end.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
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
          <Button variant="tertiary" size="small">Right Start</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu side="right" align="start">
          <Dropdown.Item>Item 1</Dropdown.Item>
          <Dropdown.Item>Item 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ),
};

// Scrollable Long List
export const ScrollableLongList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Menu with maxHeight constraint for long lists.',
      },
    },
  },
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

// Real-World Examples
export const UserAccountMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'User account menu with custom trigger, header, and sign-out action.',
      },
    },
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem', 
          borderRadius: 'var(--semantic-radius-md)',
          border: '1px solid var(--semantic-border-default)',
          background: 'var(--semantic-surface-primary)',
          cursor: 'pointer',
        }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%',
            backgroundColor: 'var(--semantic-accent-blue-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: 600,
          }}>
            JD
          </div>
          <span>John Doe</span>
        </div>
      </Dropdown.Trigger>
      <Dropdown.Menu align="end">
        <Dropdown.MenuItem 
          variant="header" 
          title="John Doe" 
          description="john.doe@example.com" 
        />
        <Dropdown.Item>My Profile</Dropdown.Item>
        <Dropdown.Item>Account Settings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Help & Support</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item variant="danger">Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const ContextMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Context menu example with various actions and keyboard shortcuts.',
      },
    },
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="tertiary" size="small">⋮</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu align="end">
        <Dropdown.Item leadingIcon={<BiEdit />} shortcut="⌘E">Edit</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiCopy />} shortcut="⌘D">Duplicate</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item leadingIcon={<BiDownload />} variant="success">Export</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiShare />} variant="info">Share</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item leadingIcon={<BiTrash />} variant="danger" shortcut="⌘⌫">Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// Advanced Features
export const WithSearchAndFooter: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Menu with search input and custom footer for advanced filtering.',
      },
    },
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="tertiary">Select Option</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu maxHeight={300}>
        <Dropdown.MenuItem variant="search" searchPlaceholder="Search options..." />
        <Dropdown.Item checked={true}>Option 1 (Selected)</Dropdown.Item>
        <Dropdown.Item checked={false}>Option 2</Dropdown.Item>
        <Dropdown.Item checked={false}>Option 3</Dropdown.Item>
        <Dropdown.Item>Option 4</Dropdown.Item>
        <Dropdown.Item>Option 5</Dropdown.Item>
        <Dropdown.MenuItem 
          variant="footer" 
          footerActionLabel="View All Options"
        />
      </Dropdown.Menu>
    </Dropdown>
  ),
};

/**
 * Dropdown without animations for accessibility.
 */
export const ReducedMotion: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disable animations for users who prefer reduced motion.',
      },
    },
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="tertiary">No Animation</Button>
      </Dropdown.Trigger>
      <Dropdown.Menu enableAnimation={false}>
        <Dropdown.Item>Profile</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

/**
 * Dropdown wrapped in error boundary for graceful error handling.
 */
export const WithErrorBoundary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error boundary wrapper to prevent crashes and provide fallback UI.',
      },
    },
  },
  render: () => (
    <DropdownErrorBoundary>
      <Dropdown>
        <Dropdown.Trigger>
          <Button variant="tertiary">Protected Menu</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Safe Item 1</Dropdown.Item>
          <Dropdown.Item>Safe Item 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </DropdownErrorBoundary>
  ),
};
