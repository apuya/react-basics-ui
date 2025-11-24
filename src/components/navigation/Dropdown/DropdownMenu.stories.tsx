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
      <div className="relative flex items-center justify-center" style={{ minHeight: '350px', width: '100%', maxWidth: '350px' }}>
        <div>
          {children}
        </div>
      </div>
    </DropdownContext.Provider>
  );
};

/**
 * DropdownMenu contains dropdown items and manages positioning and keyboard navigation.
 * Must be used within Dropdown.
 */
const meta = {
  title: 'Navigation/Dropdown/Subcomponents/DropdownMenu',
  component: Dropdown.Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Menu container with items, positioning, keyboard navigation, and click-outside handling.

### Features
- Keyboard navigation (Arrow keys, Home, End, Escape)
- Flexible positioning (side and align props)
- Scrollable with maxHeight
- Focus management
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Position of the menu relative to the trigger',
      table: {
        type: { summary: 'top | right | bottom | left' },
        defaultValue: { summary: 'bottom' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alignment of the menu along the positioning axis',
      table: {
        type: { summary: 'start | center | end' },
        defaultValue: { summary: 'start' },
      },
    },
    children: {
      control: false,
      description: 'Menu items and dividers',
    },
  },
} satisfies Meta<typeof Dropdown.Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default menu positioned at the bottom-start of the trigger.
 */
export const Default: Story = {
  args: {
    side: 'bottom',
    align: 'start',
  },
  render: (args) => (
    <MockDropdownWrapper>
      <Dropdown.Menu {...args}>
        <Dropdown.Item>New File</Dropdown.Item>
        <Dropdown.Item>Save</Dropdown.Item>
        <Dropdown.Item>Export</Dropdown.Item>
      </Dropdown.Menu>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default menu positioned below the trigger, aligned to the start. Click the trigger to open.',
      },
    },
  },
};

/**
 * Menu positioned at the top of the trigger.
 */
export const TopPosition: Story = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.Menu side="top" align="start">
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
        <Dropdown.Item>Option 3</Dropdown.Item>
      </Dropdown.Menu>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu opens above the trigger. Useful when the trigger is near the bottom of the viewport.',
      },
    },
  },
};

/**
 * Menu positioned to the right of the trigger.
 */
export const RightPosition: Story = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.Menu side="right" align="start">
        <Dropdown.Item>Option 1</Dropdown.Item>
        <Dropdown.Item>Option 2</Dropdown.Item>
        <Dropdown.Item>Option 3</Dropdown.Item>
      </Dropdown.Menu>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu opens to the right of the trigger. Common in sidebar navigation.',
      },
    },
  },
};

/**
 * Menu with center alignment.
 */
export const CenterAligned: Story = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.Menu side="bottom" align="center">
        <Dropdown.Item>Center Option 1</Dropdown.Item>
        <Dropdown.Item>Center Option 2</Dropdown.Item>
        <Dropdown.Item>Center Option 3</Dropdown.Item>
      </Dropdown.Menu>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu aligned to the center of the trigger. Useful for symmetrical layouts.',
      },
    },
  },
};

/**
 * Menu with end alignment.
 */
export const EndAligned: Story = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.Menu side="bottom" align="end">
        <Dropdown.Item>End Option 1</Dropdown.Item>
        <Dropdown.Item>End Option 2</Dropdown.Item>
        <Dropdown.Item>End Option 3</Dropdown.Item>
      </Dropdown.Menu>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu aligned to the end (right edge) of the trigger. Common for user menus in headers.',
      },
    },
  },
};

/**
 * Menu with keyboard navigation demonstration.
 */
export const WithKeyboardNavigation: Story = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.Menu>
        <Dropdown.Item>First Item (Home key jumps here)</Dropdown.Item>
        <Dropdown.Item>Second Item</Dropdown.Item>
        <Dropdown.Item>Third Item</Dropdown.Item>
        <Dropdown.Item>Fourth Item</Dropdown.Item>
        <Dropdown.Item>Last Item (End key jumps here)</Dropdown.Item>
      </Dropdown.Menu>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: `Demonstrates keyboard navigation features:
- Arrow Down/Up: Navigate between items
- Home: Jump to first item
- End: Jump to last item
- Escape: Close menu
- Enter/Space: Activate focused item`,
      },
    },
  },
};

/**
 * Menu with complex content including icons and dividers.
 */
export const WithComplexContent: Story = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.Menu>
        <Dropdown.Item leadingIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        }>
          Edit
        </Dropdown.Item>
        <Dropdown.Item leadingIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        }>
          Duplicate
        </Dropdown.Item>
        <Dropdown.MenuItem variant="divider" />
        <Dropdown.Item leadingIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        } shortcut="⌘⌫">
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu containing items with icons, keyboard shortcuts, and dividers for visual grouping.',
      },
    },
  },
};

/**
 * Menu with custom max-height enabling scrolling for long lists.
 * The menu will scroll when content exceeds the specified height.
 */
export const WithMaxHeight: StoryObj<typeof Dropdown.Menu> = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.Menu maxHeight={200}>
        <Dropdown.Item>Item 1</Dropdown.Item>
        <Dropdown.Item>Item 2</Dropdown.Item>
        <Dropdown.Item>Item 3</Dropdown.Item>
        <Dropdown.Item>Item 4</Dropdown.Item>
        <Dropdown.Item>Item 5</Dropdown.Item>
        <Dropdown.Item>Item 6</Dropdown.Item>
        <Dropdown.Item>Item 7</Dropdown.Item>
        <Dropdown.Item>Item 8</Dropdown.Item>
        <Dropdown.Item>Item 9</Dropdown.Item>
        <Dropdown.Item>Item 10</Dropdown.Item>
        <Dropdown.Item>Item 11</Dropdown.Item>
        <Dropdown.Item>Item 12</Dropdown.Item>
      </Dropdown.Menu>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates max-height configuration with scrollable content for long menus.',
      },
    },
  },
};

/**
 * Menu without animations for reduced motion preferences.
 */
export const WithoutAnimation: StoryObj<typeof Dropdown.Menu> = {
  render: () => (
    <MockDropdownWrapper>
      <Dropdown.Menu enableAnimation={false}>
        <Dropdown.Item>Profile</Dropdown.Item>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.MenuItem variant="divider" />
        <Dropdown.Item>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </MockDropdownWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disable animations for accessibility and reduced motion preferences.',
      },
    },
  },
};
