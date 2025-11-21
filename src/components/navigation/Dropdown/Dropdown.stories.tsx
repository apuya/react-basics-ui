import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { BiEdit, BiCopy, BiTrash, BiDownload, BiShare, BiCut, BiPaste } from 'react-icons/bi';

const meta: Meta<typeof Dropdown> = {
  title: 'Navigation/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown menu component with keyboard navigation support. Built using the compound component pattern with `Dropdown.Trigger`, `Dropdown.Menu`, `Dropdown.Item`, and `Dropdown.Divider` subcomponents. Supports icons, keyboard shortcuts, disabled states, and full keyboard navigation (Arrow keys, Home, End, Escape).',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// Compound Component Overview
export const CompoundComponents: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dropdown is built using the compound component pattern. It consists of: `Dropdown` (root container), `Dropdown.Trigger` (button/element that opens the menu), `Dropdown.Menu` (menu container with positioning), `Dropdown.Item` (individual menu items), and `Dropdown.Divider` (visual separator).',
      },
    },
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <button style={{ 
          padding: '0.5rem 1rem', 
          borderRadius: 'var(--semantic-border-radius-md)',
          border: '1px solid var(--semantic-color-border-default)',
          background: 'var(--semantic-color-background-primary)',
          cursor: 'pointer',
        }}>
          Example Menu
        </button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Regular Item</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiEdit />}>Item with Icon</Dropdown.Item>
        <Dropdown.Item shortcut="⌘K">Item with Shortcut</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item disabled>Disabled Item</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// Basic Examples
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic dropdown menu with simple text items. Click the trigger to open the menu.',
      },
    },
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <button style={{ 
          padding: '0.5rem 1rem', 
          borderRadius: 'var(--semantic-border-radius-md)',
          border: '1px solid var(--semantic-color-border-default)',
          background: 'var(--semantic-color-background-primary)',
          cursor: 'pointer',
        }}>
          Open Menu
        </button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item>Menu Item 1</Dropdown.Item>
        <Dropdown.Item>Menu Item 2</Dropdown.Item>
        <Dropdown.Item>Menu Item 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dropdown items with leading icons for better visual recognition of actions.',
      },
    },
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <button style={{ 
          padding: '0.5rem 1rem', 
          borderRadius: 'var(--semantic-border-radius-md)',
          border: '1px solid var(--semantic-color-border-default)',
          background: 'var(--semantic-color-background-primary)',
          cursor: 'pointer',
        }}>
          Actions
        </button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item leadingIcon={<BiEdit />}>Edit</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiCopy />}>Copy</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiDownload />}>Download</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiShare />}>Share</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const WithShortcuts: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dropdown items with keyboard shortcuts displayed on the right side. Useful for showing power users available keyboard commands.',
      },
    },
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <button style={{ 
          padding: '0.5rem 1rem', 
          borderRadius: 'var(--semantic-border-radius-md)',
          border: '1px solid var(--semantic-color-border-default)',
          background: 'var(--semantic-color-background-primary)',
          cursor: 'pointer',
        }}>
          Edit Menu
        </button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item leadingIcon={<BiCut />} shortcut="⌘X">Cut</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiCopy />} shortcut="⌘C">Copy</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiPaste />} shortcut="⌘V">Paste</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const WithDividers: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use dividers to group related menu items and create visual separation between different action categories.',
      },
    },
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <button style={{ 
          padding: '0.5rem 1rem', 
          borderRadius: 'var(--semantic-border-radius-md)',
          border: '1px solid var(--semantic-color-border-default)',
          background: 'var(--semantic-color-background-primary)',
          cursor: 'pointer',
        }}>
          File Menu
        </button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item leadingIcon={<BiEdit />}>New File</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiCopy />}>Duplicate</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item leadingIcon={<BiDownload />}>Export</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiShare />}>Share</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item leadingIcon={<BiTrash />}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const WithDisabledItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled items are visually muted and cannot be interacted with. Use for actions that are contextually unavailable.',
      },
    },
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <button style={{ 
          padding: '0.5rem 1rem', 
          borderRadius: 'var(--semantic-border-radius-md)',
          border: '1px solid var(--semantic-color-border-default)',
          background: 'var(--semantic-color-background-primary)',
          cursor: 'pointer',
        }}>
          Options
        </button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item leadingIcon={<BiEdit />}>Edit</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiCopy />} disabled>Copy (Disabled)</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiDownload />}>Download</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiTrash />} disabled>Delete (Disabled)</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const CompleteMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example showing all features combined: icons, shortcuts, dividers, and disabled states in a single menu.',
      },
    },
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <button style={{ 
          padding: '0.5rem 1rem', 
          borderRadius: 'var(--semantic-border-radius-md)',
          border: '1px solid var(--semantic-color-border-default)',
          background: 'var(--semantic-color-background-primary)',
          cursor: 'pointer',
        }}>
          Complete Menu
        </button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item leadingIcon={<BiEdit />} shortcut="⌘E">Edit</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiCopy />} shortcut="⌘C">Copy</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiCut />} shortcut="⌘X" disabled>Cut (Disabled)</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item leadingIcon={<BiDownload />}>Download</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiShare />} shortcut="⌘⇧S">Share</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item leadingIcon={<BiTrash />}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const RightAligned: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Menu aligned to the end of the trigger button. Useful when the trigger is positioned near the right edge of the viewport.',
      },
    },
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <button style={{ 
          padding: '0.5rem 1rem', 
          borderRadius: 'var(--semantic-border-radius-md)',
          border: '1px solid var(--semantic-color-border-default)',
          background: 'var(--semantic-color-background-primary)',
          cursor: 'pointer',
        }}>
          Right Aligned
        </button>
      </Dropdown.Trigger>
      <Dropdown.Menu align="end">
        <Dropdown.Item leadingIcon={<BiEdit />}>Edit</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiCopy />}>Copy</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiTrash />}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const UserMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of a user account menu with custom trigger styling, header information, and account actions.',
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
          borderRadius: 'var(--semantic-border-radius-md)',
          border: '1px solid var(--semantic-color-border-default)',
          background: 'var(--semantic-color-background-primary)',
          cursor: 'pointer',
        }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%',
            backgroundColor: 'var(--semantic-color-primary-default)',
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
        <div style={{ 
          padding: '0.5rem 0.75rem', 
          borderBottom: '1px solid var(--semantic-color-border-default)',
          marginBottom: '0.25rem',
        }}>
          <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>John Doe</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--semantic-color-text-secondary)' }}>
            john.doe@example.com
          </div>
        </div>
        <Dropdown.Item>Profile</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Billing</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Help & Support</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates full keyboard navigation support. Use Arrow keys to move between items, Home/End for first/last item, Enter to select, and Escape to close.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <Dropdown>
        <Dropdown.Trigger>
          <button style={{ 
            padding: '0.5rem 1rem', 
            borderRadius: 'var(--semantic-border-radius-md)',
            border: '1px solid var(--semantic-color-border-default)',
            background: 'var(--semantic-color-background-primary)',
            cursor: 'pointer',
          }}>
            Try Keyboard Navigation
          </button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Item 1 (Press ↓ to go down)</Dropdown.Item>
          <Dropdown.Item>Item 2 (Press ↑ to go up)</Dropdown.Item>
          <Dropdown.Item>Item 3 (Press Home for first)</Dropdown.Item>
          <Dropdown.Item>Item 4 (Press End for last)</Dropdown.Item>
          <Dropdown.Item>Item 5 (Press Esc to close)</Dropdown.Item>
          <Dropdown.Item>Item 6 (Press Enter to select)</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div style={{ 
        fontSize: '0.875rem', 
        color: 'var(--semantic-color-text-secondary)',
        textAlign: 'center',
        maxWidth: '300px',
      }}>
        Open the menu and use Arrow keys, Home, End, Escape, or Enter to navigate.
      </div>
    </div>
  ),
};

export const CustomTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The trigger can be any custom element. This example shows a circular icon button trigger.',
      },
    },
  },
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid var(--semantic-color-border-default)',
          background: 'var(--semantic-color-background-primary)',
          cursor: 'pointer',
          fontSize: '1.25rem',
        }}>
          ⋮
        </div>
      </Dropdown.Trigger>
      <Dropdown.Menu align="end">
        <Dropdown.Item leadingIcon={<BiEdit />}>Edit</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiCopy />}>Duplicate</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item leadingIcon={<BiTrash />}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const MultipleDropdowns: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent dropdowns can coexist. Only one menu is open at a time.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Dropdown>
        <Dropdown.Trigger>
          <button style={{ 
            padding: '0.5rem 1rem', 
            borderRadius: 'var(--semantic-border-radius-md)',
            border: '1px solid var(--semantic-color-border-default)',
            background: 'var(--semantic-color-background-primary)',
            cursor: 'pointer',
          }}>
            File
          </button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>New</Dropdown.Item>
          <Dropdown.Item>Open</Dropdown.Item>
          <Dropdown.Item>Save</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Trigger>
          <button style={{ 
            padding: '0.5rem 1rem', 
            borderRadius: 'var(--semantic-border-radius-md)',
            border: '1px solid var(--semantic-color-border-default)',
            background: 'var(--semantic-color-background-primary)',
            cursor: 'pointer',
          }}>
            Edit
          </button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item leadingIcon={<BiCut />}>Cut</Dropdown.Item>
          <Dropdown.Item leadingIcon={<BiCopy />}>Copy</Dropdown.Item>
          <Dropdown.Item leadingIcon={<BiPaste />}>Paste</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Dropdown.Trigger>
          <button style={{ 
            padding: '0.5rem 1rem', 
            borderRadius: 'var(--semantic-border-radius-md)',
            border: '1px solid var(--semantic-color-border-default)',
            background: 'var(--semantic-color-background-primary)',
            cursor: 'pointer',
          }}>
            View
          </button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Zoom In</Dropdown.Item>
          <Dropdown.Item>Zoom Out</Dropdown.Item>
          <Dropdown.Item>Reset</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ),
};
