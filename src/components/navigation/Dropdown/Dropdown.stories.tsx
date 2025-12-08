import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dropdown } from './Dropdown';
import { DropdownErrorBoundary } from './DropdownErrorBoundary';
import { Button } from '@/components/forms/Button';
import { Avatar } from '@/components/data-display/Avatar';
import { HStack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/typography/Text';
import { BiEdit, BiCopy, BiTrash, BiDownload, BiShare, BiCheck } from 'react-icons/bi';

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
      <Box className="min-h-[450px] p-8 w-full max-w-[400px]">
        <Story />
      </Box>
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
        <Dropdown.MenuItem variant="header" label="File Actions" description="Manage your files" />
        <Dropdown.Item leadingIcon={<BiEdit />} shortcut="⌘N">
          New File
        </Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiCopy />} shortcut="⌘D" checked={true}>
          Auto-save Enabled
        </Dropdown.Item>
        <Dropdown.MenuItem variant="divider" />
        <Dropdown.MenuItem variant="header" label="Export Options" />
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
        <Dropdown.MenuItem variant="divider" />
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
    <HStack gap="xl" wrap="wrap" justify="center">
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
    </HStack>
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
        <Box
          as="button"
          className="flex items-center gap-2 px-3 py-2 rounded-md border border-[color:var(--semantic-border-default)] bg-[color:var(--semantic-surface-primary)] cursor-pointer hover:bg-[color:var(--semantic-surface-hover)] transition-colors"
        >
          <Avatar name="John Doe" size="sm" />
          <Text>John Doe</Text>
        </Box>
      </Dropdown.Trigger>
      <Dropdown.Menu align="end">
        <Dropdown.MenuItem 
          variant="header" 
          label="John Doe" 
          description="john.doe@example.com" 
        />
        <Dropdown.Item>My Profile</Dropdown.Item>
        <Dropdown.Item>Account Settings</Dropdown.Item>
        <Dropdown.MenuItem variant="divider" />
        <Dropdown.Item>Help & Support</Dropdown.Item>
        <Dropdown.MenuItem variant="divider" />
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
        <Dropdown.MenuItem variant="divider" />
        <Dropdown.Item leadingIcon={<BiDownload />} variant="success">Export</Dropdown.Item>
        <Dropdown.Item leadingIcon={<BiShare />} variant="info">Share</Dropdown.Item>
        <Dropdown.MenuItem variant="divider" />
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
        story: 'Menu with search input, interactive checkboxes, and custom footer.',
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string[]>(['Option 1']);
    
    const toggleOption = (option: string) => {
      setSelected(prev => 
        prev.includes(option) 
          ? prev.filter(o => o !== option)
          : [...prev, option]
      );
    };
    
    return (
      <Dropdown>
        <Dropdown.Trigger>
          <Button variant="tertiary">Select Options ({selected.length})</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu maxHeight={300}>
          <Dropdown.MenuItem variant="search" searchPlaceholder="Search options..." />
          <Dropdown.Item 
            checked={selected.includes('Option 1')} 
            onCheckedChange={() => toggleOption('Option 1')}
          >
            Option 1
          </Dropdown.Item>
          <Dropdown.Item 
            checked={selected.includes('Option 2')} 
            onCheckedChange={() => toggleOption('Option 2')}
          >
            Option 2
          </Dropdown.Item>
          <Dropdown.Item 
            checked={selected.includes('Option 3')} 
            onCheckedChange={() => toggleOption('Option 3')}
          >
            Option 3
          </Dropdown.Item>
          <Dropdown.Item>Option 4 (no checkbox)</Dropdown.Item>
          <Dropdown.Item>Option 5 (no checkbox)</Dropdown.Item>
          <Dropdown.MenuItem 
            variant="footer" 
            label={`${selected.length} selected`}
            footerActionLabel="Clear All"
            onFooterAction={() => setSelected([])}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  },
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
        <Dropdown.MenuItem variant="divider" />
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

// Responsive Positioning
export const ResponsivePositioning: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**Smart Viewport-Aware Positioning**

Set \`responsive={true}\` on \`Dropdown.Menu\` to enable automatic repositioning when the menu would overflow the viewport.

**Supported flips:**
- \`side="bottom"\` → flips to \`top\` when insufficient space below
- \`side="left"\` → flips to \`right\` when insufficient space on left
- \`side="right"\` → flips to \`left\` when insufficient space on right
- Alignment adjusts to prevent horizontal/vertical overflow

**Note:** \`side="top"\` does not flip to bottom (rarely needed use case).

**When to use:**
- Dropdown menus that may appear near screen edges (e.g., in tables, sidebars)
- Dynamic layouts where trigger position varies
- Mobile-responsive interfaces
        `,
      },
    },
  },
  render: () => (
    <Box style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
      {/* Center info */}
      <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
        <Box className="flex flex-col items-center gap-3 text-center">
          <Box className="px-3 py-1 rounded-full bg-[color:var(--semantic-bg-secondary)] text-[color:var(--semantic-text-secondary)] text-xs font-medium">
            responsive=true
          </Box>
          <Text size="small" color="secondary" style={{ maxWidth: '280px' }}>
            Click buttons at the edges. The menu will flip sides when there's no room in the preferred direction.
          </Text>
        </Box>
      </Box>

      {/* Bottom-left corner */}
      <Box style={{ position: 'absolute', bottom: '8px', left: '8px' }}>
        <Dropdown>
          <Dropdown.Trigger>
            <Button variant="tertiary" size="small">↙ Bottom-Left</Button>
          </Dropdown.Trigger>
          <Dropdown.Menu responsive side="bottom" align="start">
            <Dropdown.MenuItem variant="header" label="side='bottom' → flipped to top" />
            <Dropdown.Item leadingIcon={<BiEdit />}>Edit</Dropdown.Item>
            <Dropdown.Item leadingIcon={<BiCopy />}>Copy</Dropdown.Item>
            <Dropdown.Item leadingIcon={<BiTrash />} variant="danger">Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Box>

      {/* Bottom-right corner */}
      <Box style={{ position: 'absolute', bottom: '8px', right: '8px' }}>
        <Dropdown>
          <Dropdown.Trigger>
            <Button variant="tertiary" size="small">Bottom-Right ↘</Button>
          </Dropdown.Trigger>
          <Dropdown.Menu responsive side="bottom" align="end">
            <Dropdown.MenuItem variant="header" label="side='bottom' → flipped to top" />
            <Dropdown.Item leadingIcon={<BiEdit />}>Edit</Dropdown.Item>
            <Dropdown.Item leadingIcon={<BiCopy />}>Copy</Dropdown.Item>
            <Dropdown.Item leadingIcon={<BiTrash />} variant="danger">Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Box>

      {/* Left edge */}
      <Box style={{ position: 'absolute', top: '50%', left: '8px', transform: 'translateY(-50%)' }}>
        <Dropdown>
          <Dropdown.Trigger>
            <Button variant="tertiary" size="small">← Left</Button>
          </Dropdown.Trigger>
          <Dropdown.Menu responsive side="left" align="center">
            <Dropdown.MenuItem variant="header" label="side='left' → flipped to right" />
            <Dropdown.Item leadingIcon={<BiEdit />}>Edit</Dropdown.Item>
            <Dropdown.Item leadingIcon={<BiCopy />}>Copy</Dropdown.Item>
            <Dropdown.Item leadingIcon={<BiTrash />} variant="danger">Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Box>

      {/* Right edge */}
      <Box style={{ position: 'absolute', top: '50%', right: '8px', transform: 'translateY(-50%)' }}>
        <Dropdown>
          <Dropdown.Trigger>
            <Button variant="tertiary" size="small">Right →</Button>
          </Dropdown.Trigger>
          <Dropdown.Menu responsive side="right" align="center">
            <Dropdown.MenuItem variant="header" label="side='right' → flipped to left" />
            <Dropdown.Item leadingIcon={<BiEdit />}>Edit</Dropdown.Item>
            <Dropdown.Item leadingIcon={<BiCopy />}>Copy</Dropdown.Item>
            <Dropdown.Item leadingIcon={<BiTrash />} variant="danger">Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Box>
    </Box>
  ),
};
