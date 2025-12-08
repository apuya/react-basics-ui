import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import {
  BiHome,
  BiUser,
  BiCog,
  BiFile,
  BiFolder,
  BiChart,
  BiGridAlt,
} from 'react-icons/bi';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';

const meta: Meta<typeof Sidebar> = {
  title: 'Experimental/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A flexible sidebar component with multiple variants and compound components for organizing navigation and content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated'],
      description: 'Visual variant of the sidebar',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the sidebar',
    },
    width: {
      control: 'text',
      description: 'Width of the sidebar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// Demo wrapper for showing sidebar with main content
const DemoWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen">
    {children}
    <main className="flex-1 p-8 bg-[color:var(--semantic-surface-base)]">
      <Heading level="h1" className="mb-4">
        Main Content Area
      </Heading>
      <Text color="secondary">
        This is the main content area next to the sidebar.
      </Text>
    </main>
  </div>
);

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic sidebar with navigation items.',
      },
    },
  },
  render: () => (
    <DemoWrapper>
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Item icon={BiHome} active>Home</Sidebar.Item>
          <Sidebar.Item icon={BiUser}>Profile</Sidebar.Item>
          <Sidebar.Item icon={BiCog}>Settings</Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
    </DemoWrapper>
  ),
};

export const WithSections: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with section headers for organizing navigation groups.',
      },
    },
  },
  render: () => (
    <DemoWrapper>
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Section>
            <Sidebar.SectionHeader icon={BiGridAlt}>Main</Sidebar.SectionHeader>
            <Sidebar.Item icon={BiHome} active>Dashboard</Sidebar.Item>
            <Sidebar.Item icon={BiChart}>Analytics</Sidebar.Item>
          </Sidebar.Section>
          <Sidebar.Section>
            <Sidebar.SectionHeader icon={BiFolder}>Content</Sidebar.SectionHeader>
            <Sidebar.Item icon={BiFile}>Documents</Sidebar.Item>
            <Sidebar.Item icon={BiFolder}>Projects</Sidebar.Item>
          </Sidebar.Section>
        </Sidebar.Content>
      </Sidebar>
    </DemoWrapper>
  ),
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story: 'All sidebar variants: default, bordered, and elevated.',
      },
    },
  },
  render: () => (
    <div className="flex h-screen gap-4 p-4 bg-[color:var(--semantic-surface-base)]">
      <Sidebar variant="default" width="200px">
        <Sidebar.Content>
          <Sidebar.SectionHeader>Default</Sidebar.SectionHeader>
          <Sidebar.Item icon={BiHome}>Home</Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
      <Sidebar variant="bordered" width="200px">
        <Sidebar.Content>
          <Sidebar.SectionHeader>Bordered</Sidebar.SectionHeader>
          <Sidebar.Item icon={BiHome}>Home</Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
      <Sidebar variant="elevated" width="200px">
        <Sidebar.Content>
          <Sidebar.SectionHeader>Elevated</Sidebar.SectionHeader>
          <Sidebar.Item icon={BiHome}>Home</Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
    </div>
  ),
};

export const CompleteExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete sidebar with sections, footer, and all features.',
      },
    },
  },
  render: () => (
    <DemoWrapper>
      <Sidebar variant="bordered">
        <Sidebar.Content>
          <Sidebar.Section>
            <Sidebar.SectionHeader icon={BiGridAlt}>Overview</Sidebar.SectionHeader>
            <Sidebar.Item icon={BiHome} active>Dashboard</Sidebar.Item>
            <Sidebar.Item icon={BiChart}>Analytics</Sidebar.Item>
          </Sidebar.Section>
          <Sidebar.Section>
            <Sidebar.SectionHeader icon={BiFolder}>Management</Sidebar.SectionHeader>
            <Sidebar.Item icon={BiUser}>Users</Sidebar.Item>
            <Sidebar.Item icon={BiFile}>Documents</Sidebar.Item>
            <Sidebar.Item icon={BiFolder}>Projects</Sidebar.Item>
          </Sidebar.Section>
          <Sidebar.Section>
            <Sidebar.SectionHeader>Settings</Sidebar.SectionHeader>
            <Sidebar.Item icon={BiCog}>Preferences</Sidebar.Item>
          </Sidebar.Section>
        </Sidebar.Content>
      </Sidebar>
    </DemoWrapper>
  ),
};
