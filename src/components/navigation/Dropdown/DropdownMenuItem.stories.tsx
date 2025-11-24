import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownContext } from './Dropdown';
import { type ReactNode, useRef } from 'react';

const MockDropdownWrapper = ({ children }: { children: ReactNode }) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <DropdownContext.Provider value={{ 
      isOpen: true, 
      setIsOpen: () => {}, 
      triggerRef, 
      menuId: 'mock-menu-id'
    }}>
      <div role="menu" className="p-2" style={{ width: '250px', minHeight: '200px' }}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

/**
 * DropdownMenuItem provides structural elements for dropdown menus including
 * dividers, headers, search bars, and footers.
 */
const meta = {
  title: 'Navigation/Dropdown/Subcomponents/DropdownMenuItem',
  component: Dropdown.MenuItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Structural elements for organizing dropdown content: dividers, headers, search bars, and footers.

### Variants
- \`divider\` - Visual separator
- \`header\` - Section header with optional description  
- \`search\` - Search input for filtering
- \`footer\` - Footer with action button
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '300px', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['divider', 'header', 'search', 'footer'],
      description: 'The type of menu item to render',
    },
    label: {
      control: 'text',
      description: 'Label text for header/footer variants',
    },
    description: {
      control: 'text',
      description: 'Description text for header variant',
    },
    footerActionLabel: {
      control: 'text',
      description: 'Label for the footer action button',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for search input',
    },
  },
} satisfies Meta<typeof Dropdown.MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Simple divider to separate groups of items.
 */
export const Divider: Story = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.Item>Item Above</Dropdown.Item>
      <Dropdown.MenuItem variant="divider" />
      <Dropdown.Item>Item Below</Dropdown.Item>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A simple horizontal line to visually separate groups of menu items.',
      },
    },
  },
};

/**
 * Header to label a section of items.
 */
export const Header: Story = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.MenuItem variant="header" label="File Actions" />
      <Dropdown.Item>New File</Dropdown.Item>
      <Dropdown.Item>Open File</Dropdown.Item>
      <Dropdown.Item>Save File</Dropdown.Item>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A section header to organize and label groups of related menu items.',
      },
    },
  },
};

/**
 * Header with additional description text.
 */
export const HeaderWithDescription: Story = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.MenuItem
        variant="header"
        label="Recent Files"
        description="Files you've opened recently"
      />
      <Dropdown.Item>document.pdf</Dropdown.Item>
      <Dropdown.Item>image.png</Dropdown.Item>
      <Dropdown.Item>notes.txt</Dropdown.Item>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header variant with additional description text for more context.',
      },
    },
  },
};

/**
 * Embedded search bar for filtering menu items.
 */
export const Search: Story = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.MenuItem
        variant="search"
        searchPlaceholder="Search files..."
        onSearch={(value) => console.log('Search:', value)}
      />
      <Dropdown.Item>document.pdf</Dropdown.Item>
      <Dropdown.Item>image.png</Dropdown.Item>
      <Dropdown.Item>notes.txt</Dropdown.Item>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'An embedded search bar to filter menu items. Connect to onSearch to handle filtering logic.',
      },
    },
  },
};

/**
 * Footer with label and action button.
 */
export const Footer: Story = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.Item>Item 1</Dropdown.Item>
      <Dropdown.Item>Item 2</Dropdown.Item>
      <Dropdown.Item>Item 3</Dropdown.Item>
      <Dropdown.MenuItem variant="divider" />
      <Dropdown.MenuItem
        variant="footer"
        label="3 items selected"
        footerActionLabel="Clear All"
        onFooterAction={() => console.log('Clear clicked')}
      />
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Footer with a label and right-aligned action button for batch operations.',
      },
    },
  },
};

/**
 * Complete example with all variants.
 */
export const CompleteMenu: Story = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.MenuItem
        variant="search"
        searchPlaceholder="Search..."
      />
      <Dropdown.MenuItem variant="divider" />
      <Dropdown.MenuItem
        variant="header"
        label="Actions"
        description="Available file actions"
      />
      <Dropdown.Item>New File</Dropdown.Item>
      <Dropdown.Item>Open File</Dropdown.Item>
      <Dropdown.Item>Save File</Dropdown.Item>
      <Dropdown.MenuItem variant="divider" />
      <Dropdown.MenuItem variant="header" label="Recent" />
      <Dropdown.Item>document.pdf</Dropdown.Item>
      <Dropdown.Item>image.png</Dropdown.Item>
      <Dropdown.MenuItem variant="divider" />
      <Dropdown.MenuItem
        variant="footer"
        label="2 files"
        footerActionLabel="Clear"
        onFooterAction={() => console.log('Clear')}
      />
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A complete dropdown menu demonstrating all MenuItem variants working together.',
      },
    },
  },
};
