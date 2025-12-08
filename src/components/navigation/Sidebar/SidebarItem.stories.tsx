import type { Meta, StoryObj } from '@storybook/react';
import { SidebarItem, SidebarSectionHeader } from './SidebarItem';
import {
  BiHome,
  BiUser,
  BiCog,
  BiGridAlt,
  BiFolder,
} from 'react-icons/bi';

const meta: Meta<typeof SidebarItem> = {
  title: 'Experimental/Sidebar/SidebarItem',
  component: SidebarItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Sidebar subcomponents: SectionHeader and Item. Uses Icon component with inline padding via CSS variables.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'boolean',
      description: 'Whether the item is active/selected',
    },
    icon: {
      control: false,
      description: 'Leading icon component (react-icons IconType)',
    },
    children: {
      control: 'text',
      description: 'Item label text',
    },
    disabled: {
      table: { disable: true },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-64 flex flex-col bg-[color:var(--semantic-surface-elevated)] rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SidebarItem>;

// =============================================================================
// SECTION HEADER
// =============================================================================

export const SectionHeader: Story = {
  render: () => (
    <SidebarSectionHeader icon={BiGridAlt}>Navigation</SidebarSectionHeader>
  ),
};

export const SectionHeaderTextOnly: Story = {
  render: () => <SidebarSectionHeader>Settings</SidebarSectionHeader>,
};

// =============================================================================
// ITEM
// =============================================================================

export const Default: Story = {
  args: {
    children: 'Dashboard',
    icon: BiHome,
  },
};

export const Active: Story = {
  args: {
    children: 'Dashboard',
    icon: BiHome,
    active: true,
  },
};

// =============================================================================
// ALL STATES
// =============================================================================

export const AllStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All SidebarItem states: default and active.',
      },
    },
  },
  render: () => (
    <>
      <SidebarItem icon={BiHome}>Default</SidebarItem>
      <SidebarItem icon={BiUser} active>Active</SidebarItem>
    </>
  ),
};

// =============================================================================
// COMPLETE EXAMPLE
// =============================================================================

export const CompleteExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All subcomponents together: SectionHeader and Items.',
      },
    },
  },
  render: () => (
    <>
      <SidebarSectionHeader icon={BiGridAlt}>Main</SidebarSectionHeader>
      <SidebarItem icon={BiHome} active>Dashboard</SidebarItem>
      <SidebarItem icon={BiUser}>Users</SidebarItem>
      <SidebarItem icon={BiFolder}>Projects</SidebarItem>
      <SidebarSectionHeader className="mt-4">Settings</SidebarSectionHeader>
      <SidebarItem icon={BiCog}>Preferences</SidebarItem>
    </>
  ),
};
