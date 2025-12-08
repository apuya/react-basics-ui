import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { Select, useSelectContext } from './Select';
import { cn } from '@/lib/cn';
import {
  MENU_BASE_CLASSES,
  MENU_VISIBLE_CLASS,
  MENU_WRAPPER_CLASSES,
} from './Select.styles';

/**
 * Helper component that auto-opens the Select menu for isolated testing.
 */
const AutoOpenMenu = ({ children }: { children: React.ReactNode }) => {
  const { setIsOpen } = useSelectContext();
  useEffect(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  return <>{children}</>;
};

/**
 * Wrapper that provides Select context and auto-opens the menu.
 */
const MenuTestWrapper = ({
  children,
  defaultValue,
}: {
  children: React.ReactNode;
  defaultValue?: string;
}) => (
  <Select defaultValue={defaultValue}>
    <AutoOpenMenu>{children}</AutoOpenMenu>
  </Select>
);

/**
 * Standalone menu component for visual testing without context dependency.
 */
const StandaloneMenu = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    role="listbox"
    className={cn(MENU_BASE_CLASSES, MENU_VISIBLE_CLASS, 'relative', className)}
    style={{
      paddingInline: 'var(--component-dropdown-padding-inline)',
      paddingBlock: 'var(--component-dropdown-padding-block)',
    }}
  >
    <div className={MENU_WRAPPER_CLASSES}>{children}</div>
  </div>
);

/**
 * The dropdown menu container that holds the select options.
 *
 * **Features:**
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Click outside to close
 * - Escape key to close
 *
 * **Note:** Select.Menu must be used within a Select context.
 * These stories show the menu in an always-visible state for isolated testing.
 */
const meta: Meta<typeof Select.Menu> = {
  title: 'Forms/Select/Menu',
  component: Select.Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The dropdown menu container that holds the select options. Supports keyboard navigation and click outside to close. Stories show the menu in an always-visible state for isolated testing.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
    },
  },
  decorators: [(Story) => <div style={{ width: '320px', minHeight: '280px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Select.Menu>;

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {
  render: (args) => (
    <MenuTestWrapper>
      <Select.Menu {...args}>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
        <Select.Option value="3">Option 3</Select.Option>
      </Select.Menu>
    </MenuTestWrapper>
  ),
};

// =============================================================================
// WITH MANY OPTIONS
// =============================================================================

export const ManyOptions: Story = {
  render: (args) => (
    <MenuTestWrapper>
      <Select.Menu {...args}>
        <Select.Option value="jan">January</Select.Option>
        <Select.Option value="feb">February</Select.Option>
        <Select.Option value="mar">March</Select.Option>
        <Select.Option value="apr">April</Select.Option>
        <Select.Option value="may">May</Select.Option>
        <Select.Option value="jun">June</Select.Option>
        <Select.Option value="jul">July</Select.Option>
        <Select.Option value="aug">August</Select.Option>
      </Select.Menu>
    </MenuTestWrapper>
  ),
};

// =============================================================================
// WITH SCROLLABLE CONTENT
// =============================================================================

export const Scrollable: Story = {
  render: () => (
    <MenuTestWrapper>
      <Select.Menu className="max-h-48 overflow-y-auto">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
        <Select.Option value="3">Option 3</Select.Option>
        <Select.Option value="4">Option 4</Select.Option>
        <Select.Option value="5">Option 5</Select.Option>
        <Select.Option value="6">Option 6</Select.Option>
        <Select.Option value="7">Option 7</Select.Option>
        <Select.Option value="8">Option 8</Select.Option>
        <Select.Option value="9">Option 9</Select.Option>
        <Select.Option value="10">Option 10</Select.Option>
      </Select.Menu>
    </MenuTestWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use className to add max-height and overflow for scrollable menus with many options.',
      },
    },
  },
};

// =============================================================================
// WITH MIXED OPTION STATES
// =============================================================================

export const WithMixedOptions: Story = {
  render: (args) => (
    <MenuTestWrapper>
      <Select.Menu {...args}>
        <Select.Option value="active1">Active Option 1</Select.Option>
        <Select.Option value="disabled1" disabled>Disabled Option</Select.Option>
        <Select.Option value="active2">Active Option 2</Select.Option>
        <Select.Option value="disabled2" disabled>Another Disabled</Select.Option>
        <Select.Option value="active3">Active Option 3</Select.Option>
      </Select.Menu>
    </MenuTestWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu containing both enabled and disabled options.',
      },
    },
  },
};

// =============================================================================
// WITH PRE-SELECTED OPTION
// =============================================================================

export const WithSelectedOption: Story = {
  render: (args) => (
    <MenuTestWrapper defaultValue="2">
      <Select.Menu {...args}>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2 (selected)</Select.Option>
        <Select.Option value="3">Option 3</Select.Option>
      </Select.Menu>
    </MenuTestWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu showing a pre-selected option with checkmark indicator.',
      },
    },
  },
};

// =============================================================================
// WITH LONG OPTION TEXT
// =============================================================================

export const LongOptions: Story = {
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
  render: (args) => (
    <MenuTestWrapper>
      <Select.Menu {...args}>
        <Select.Option value="1">Engineering & Product Development</Select.Option>
        <Select.Option value="2">Marketing & Communications</Select.Option>
        <Select.Option value="3">Human Resources & Administration</Select.Option>
      </Select.Menu>
    </MenuTestWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu with options that have longer text content.',
      },
    },
  },
};

// =============================================================================
// STANDALONE (Visual only - no context)
// =============================================================================

export const Standalone: Story = {
  render: () => (
    <StandaloneMenu>
      <div
        className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
        role="option"
      >
        Option 1
      </div>
      <div
        className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
        role="option"
      >
        Option 2
      </div>
      <div
        className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
        role="option"
      >
        Option 3
      </div>
    </StandaloneMenu>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Standalone menu styling without Select context - for visual testing of menu container styles only.',
      },
    },
  },
};
