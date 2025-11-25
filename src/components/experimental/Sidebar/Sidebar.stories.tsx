import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { BiHome, BiUser, BiCog, BiFile, BiFolder, BiChart, BiHelpCircle, BiLogOut } from 'react-icons/bi';

const meta: Meta<typeof Sidebar> = {
  title: 'Experimental/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A flexible sidebar component with collapsible state, multiple variants, and compound components for organizing navigation and content. Supports both controlled and uncontrolled modes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    collapsed: {
      control: 'boolean',
      description: 'Controlled collapsed state',
    },
    defaultCollapsed: {
      control: 'boolean',
      description: 'Default collapsed state (uncontrolled)',
    },
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
    showToggle: {
      control: 'boolean',
      description: 'Show collapse/expand toggle button',
    },
    width: {
      control: 'text',
      description: 'Width when expanded',
    },
    collapsedWidth: {
      control: 'text',
      description: 'Width when collapsed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// Demo wrapper
const DemoWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen">
    {children}
    <main className="flex-1 p-8 bg-[color:var(--semantic-surface-base)]">
      <h1 className="text-3xl font-bold mb-4 text-[color:var(--semantic-text-primary)]">
        Main Content Area
      </h1>
      <p className="text-[color:var(--semantic-text-secondary)]">
        This is the main content area. The sidebar can be collapsed to give more space.
      </p>
    </main>
  </div>
);

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic sidebar with default variant and navigation items.',
      },
    },
  },
  render: () => (
    <DemoWrapper>
      <Sidebar>
        <Sidebar.Header>
          <div className="text-xl font-bold text-[color:var(--semantic-brand-primary-default)]">
            MyApp
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Item icon={<BiHome size={20} />} active>
            Home
          </Sidebar.Item>
          <Sidebar.Item icon={<BiUser size={20} />}>Profile</Sidebar.Item>
          <Sidebar.Item icon={<BiCog size={20} />}>Settings</Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
    </DemoWrapper>
  ),
};

export const WithSections: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with multiple sections for organizing navigation items.',
      },
    },
  },
  render: () => (
    <DemoWrapper>
      <Sidebar>
        <Sidebar.Header>
          <div className="text-xl font-bold text-[color:var(--semantic-brand-primary-default)]">
            Dashboard
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Section title="Main">
            <Sidebar.Item icon={<BiHome size={20} />} active>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item icon={<BiChart size={20} />}>Analytics</Sidebar.Item>
          </Sidebar.Section>
          <Sidebar.Section title="Content">
            <Sidebar.Item icon={<BiFile size={20} />}>Documents</Sidebar.Item>
            <Sidebar.Item icon={<BiFolder size={20} />}>Projects</Sidebar.Item>
          </Sidebar.Section>
          <Sidebar.Section title="Account">
            <Sidebar.Item icon={<BiUser size={20} />}>Profile</Sidebar.Item>
            <Sidebar.Item icon={<BiCog size={20} />}>Settings</Sidebar.Item>
          </Sidebar.Section>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.Item icon={<BiHelpCircle size={20} />}>Help</Sidebar.Item>
        </Sidebar.Footer>
      </Sidebar>
    </DemoWrapper>
  ),
};

export const BorderedVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with bordered variant showing a right border.',
      },
    },
  },
  render: () => (
    <DemoWrapper>
      <Sidebar variant="bordered">
        <Sidebar.Header>
          <div className="text-xl font-bold">Bordered</div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Item icon={<BiHome size={20} />} active>
            Home
          </Sidebar.Item>
          <Sidebar.Item icon={<BiUser size={20} />}>Profile</Sidebar.Item>
          <Sidebar.Item icon={<BiCog size={20} />}>Settings</Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
    </DemoWrapper>
  ),
};

export const ElevatedVariant: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with elevated variant showing a shadow.',
      },
    },
  },
  render: () => (
    <DemoWrapper>
      <Sidebar variant="elevated">
        <Sidebar.Header>
          <div className="text-xl font-bold">Elevated</div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Item icon={<BiHome size={20} />} active>
            Home
          </Sidebar.Item>
          <Sidebar.Item icon={<BiUser size={20} />}>Profile</Sidebar.Item>
          <Sidebar.Item icon={<BiCog size={20} />}>Settings</Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
    </DemoWrapper>
  ),
};

export const DefaultCollapsed: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sidebar that starts in collapsed state (uncontrolled).',
      },
    },
  },
  render: () => (
    <DemoWrapper>
      <Sidebar defaultCollapsed>
        <Sidebar.Header>
          <div className="text-xl font-bold text-[color:var(--semantic-brand-primary-default)]">
            App
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Item icon={<BiHome size={20} />} active>
            Home
          </Sidebar.Item>
          <Sidebar.Item icon={<BiUser size={20} />}>Profile</Sidebar.Item>
          <Sidebar.Item icon={<BiCog size={20} />}>Settings</Sidebar.Item>
          <Sidebar.Item icon={<BiFile size={20} />}>Documents</Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
    </DemoWrapper>
  ),
};

export const ControlledState: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with controlled collapsed state. Toggle the sidebar using external controls.',
      },
    },
  },
  render: () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <div className="flex h-screen flex-col">
        <div className="p-4 border-b border-[color:var(--semantic-border-default)] bg-[color:var(--semantic-surface-elevated)]">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="px-4 py-2 bg-[color:var(--semantic-brand-primary-default)] text-white rounded hover:opacity-90"
          >
            {collapsed ? 'Expand' : 'Collapse'} Sidebar
          </button>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed}>
            <Sidebar.Header>
              <div className="text-xl font-bold">Controlled</div>
            </Sidebar.Header>
            <Sidebar.Content>
              <Sidebar.Item icon={<BiHome size={20} />} active>
                Home
              </Sidebar.Item>
              <Sidebar.Item icon={<BiUser size={20} />}>Profile</Sidebar.Item>
              <Sidebar.Item icon={<BiCog size={20} />}>Settings</Sidebar.Item>
            </Sidebar.Content>
          </Sidebar>
          <main className="flex-1 p-8 overflow-auto">
            <h1 className="text-3xl font-bold mb-4">Main Content</h1>
            <p className="text-[color:var(--semantic-text-secondary)]">
              Collapsed state: {collapsed ? 'Yes' : 'No'}
            </p>
          </main>
        </div>
      </div>
    );
  },
};

export const RightPosition: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sidebar positioned on the right side of the screen.',
      },
    },
  },
  render: () => (
    <div className="flex h-screen">
      <main className="flex-1 p-8 bg-[color:var(--semantic-surface-base)]">
        <h1 className="text-3xl font-bold mb-4">Main Content</h1>
        <p className="text-[color:var(--semantic-text-secondary)]">
          Sidebar is on the right side
        </p>
      </main>
      <Sidebar position="right" variant="bordered">
        <Sidebar.Header>
          <div className="text-xl font-bold">Right Side</div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Item icon={<BiHome size={20} />} active>
            Home
          </Sidebar.Item>
          <Sidebar.Item icon={<BiUser size={20} />}>Profile</Sidebar.Item>
          <Sidebar.Item icon={<BiCog size={20} />}>Settings</Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
    </div>
  ),
};

export const CustomWidths: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with custom widths for expanded and collapsed states.',
      },
    },
  },
  render: () => (
    <DemoWrapper>
      <Sidebar width="320px" collapsedWidth="60px">
        <Sidebar.Header>
          <div className="text-xl font-bold">Wide Sidebar</div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Item icon={<BiHome size={20} />} active>
            Home
          </Sidebar.Item>
          <Sidebar.Item icon={<BiUser size={20} />}>Profile</Sidebar.Item>
          <Sidebar.Item icon={<BiCog size={20} />}>Settings</Sidebar.Item>
          <Sidebar.Item icon={<BiFile size={20} />}>Documents</Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
    </DemoWrapper>
  ),
};

export const WithoutToggle: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Sidebar without the toggle button. Can only be controlled externally.',
      },
    },
  },
  render: () => (
    <DemoWrapper>
      <Sidebar showToggle={false} defaultCollapsed={false}>
        <Sidebar.Header>
          <div className="text-xl font-bold">No Toggle</div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Item icon={<BiHome size={20} />} active>
            Home
          </Sidebar.Item>
          <Sidebar.Item icon={<BiUser size={20} />}>Profile</Sidebar.Item>
          <Sidebar.Item icon={<BiCog size={20} />}>Settings</Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
    </DemoWrapper>
  ),
};

export const CompleteExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Complete sidebar example with header, multiple sections, footer, and all features.',
      },
    },
  },
  render: () => {
    const [activeItem, setActiveItem] = useState('dashboard');

    return (
      <DemoWrapper>
        <Sidebar variant="bordered">
          <Sidebar.Header>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[color:var(--semantic-brand-primary-default)] flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-xl font-bold">AdminPanel</span>
            </div>
          </Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Section title="Overview">
              <Sidebar.Item
                icon={<BiHome size={20} />}
                active={activeItem === 'dashboard'}
                onClick={() => setActiveItem('dashboard')}
              >
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item
                icon={<BiChart size={20} />}
                active={activeItem === 'analytics'}
                onClick={() => setActiveItem('analytics')}
              >
                Analytics
              </Sidebar.Item>
            </Sidebar.Section>
            <Sidebar.Section title="Management">
              <Sidebar.Item
                icon={<BiUser size={20} />}
                active={activeItem === 'users'}
                onClick={() => setActiveItem('users')}
              >
                Users
              </Sidebar.Item>
              <Sidebar.Item
                icon={<BiFile size={20} />}
                active={activeItem === 'documents'}
                onClick={() => setActiveItem('documents')}
              >
                Documents
              </Sidebar.Item>
              <Sidebar.Item
                icon={<BiFolder size={20} />}
                active={activeItem === 'projects'}
                onClick={() => setActiveItem('projects')}
              >
                Projects
              </Sidebar.Item>
            </Sidebar.Section>
            <Sidebar.Section title="Settings">
              <Sidebar.Item
                icon={<BiCog size={20} />}
                active={activeItem === 'settings'}
                onClick={() => setActiveItem('settings')}
              >
                Settings
              </Sidebar.Item>
            </Sidebar.Section>
          </Sidebar.Content>
          <Sidebar.Footer>
            <Sidebar.Item icon={<BiHelpCircle size={20} />}>Help & Support</Sidebar.Item>
            <Sidebar.Item icon={<BiLogOut size={20} />}>Logout</Sidebar.Item>
          </Sidebar.Footer>
        </Sidebar>
      </DemoWrapper>
    );
  },
};

export const CollapsedBehavior: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how the sidebar behaves when collapsed. Section titles are hidden and items show only icons with tooltips.',
      },
    },
  },
  render: () => {
    const [collapsed, setCollapsed] = useState(true);

    return (
      <div className="flex h-screen flex-col">
        <div className="p-4 border-b border-[color:var(--semantic-border-default)]">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="px-4 py-2 bg-[color:var(--semantic-brand-primary-default)] text-white rounded"
          >
            Toggle: Currently {collapsed ? 'Collapsed' : 'Expanded'}
          </button>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed} variant="bordered">
            <Sidebar.Header>
              <div className="w-8 h-8 rounded bg-[color:var(--semantic-brand-primary-default)] flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-xl font-bold">App</span>
            </Sidebar.Header>
            <Sidebar.Content>
              <Sidebar.Section title="Main Menu">
                <Sidebar.Item icon={<BiHome size={20} />}>Dashboard</Sidebar.Item>
                <Sidebar.Item icon={<BiChart size={20} />}>Analytics</Sidebar.Item>
                <Sidebar.Item icon={<BiUser size={20} />}>Users</Sidebar.Item>
              </Sidebar.Section>
            </Sidebar.Content>
          </Sidebar>
          <main className="flex-1 p-8 overflow-auto">
            <h1 className="text-3xl font-bold mb-4">Content Area</h1>
            <p className="text-[color:var(--semantic-text-secondary)]">
              When collapsed, section titles are hidden and items show only icons. Hover over items
              to see tooltips.
            </p>
          </main>
        </div>
      </div>
    );
  },
};
