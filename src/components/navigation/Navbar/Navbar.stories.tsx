import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { FOCUS_RING_CLASSES, NOTIFICATION_INDICATOR_CLASSES } from './Navbar.styles';
import { FiSearch, FiBell, FiMoreVertical } from 'react-icons/fi';
import { Button } from '../forms/Button';
import { Avatar } from '../data-display/Avatar';
import { Input } from '../forms/Input';
import { Select } from '../forms/Select';
import { Heading } from '../../typography/Heading';

// Consistent icon size for navbar - 20px
const ICON_CLASS = 'w-5 h-5 shrink-0';

// Transition classes for collapsible panels
const PANEL_TRANSITION = 'transition-all duration-300 ease-in-out flex items-center justify-center';

// Collapsed button size (32px)
const COLLAPSED_SIZE = 'w-8';

const meta: Meta<typeof Navbar> = {
  title: 'Experimental/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Navbar component for site-wide navigation. Use Button with variant="nav" for navigation links.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fixed: {
      control: 'boolean',
      description: 'Whether the navbar is fixed to the top of the viewport',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether to show a bottom border',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

// Reusable navbar elements
const Brand = () => (
  <Navbar.Brand>
    <Heading level="h4" className="text-inherit h-8 flex items-center">
      Goldfather
    </Heading>
  </Navbar.Brand>
);

const NotificationButton = () => (
  <Button variant="nav" size="default" aria-label="Notifications">
    <span className="relative">
      <FiBell className={ICON_CLASS} />
      <span 
        className={NOTIFICATION_INDICATOR_CLASSES}
        aria-hidden="true"
      />
    </span>
  </Button>
);

const ProfileAvatar = () => (
  <a href="/profile" aria-label="Profile" className={FOCUS_RING_CLASSES}>
    <Avatar size="md">
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar>
  </a>
);

const ActionSection = () => (
  <Navbar.Section>
    <NotificationButton />
    <ProfileAvatar />
  </Navbar.Section>
);

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default navbar with brand, notification button, and profile avatar.',
      },
      story: {
        inline: false,
        iframeHeight: 100,
      },
    },
  },
  render: () => (
    <Navbar>
      <Navbar.Content>
        <Brand />
        <ActionSection />
      </Navbar.Content>
    </Navbar>
  ),
};

export const WithSearchBar: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Navbar with a centered search bar between the brand and action buttons.',
      },
      story: {
        inline: false,
        iframeHeight: 100,
      },
    },
  },
  render: () => (
    <Navbar>
      <Navbar.Content>
        <Brand />
        
        <Navbar.Section className="flex-1 max-w-md mx-auto">
          <Input
            placeholder="Search..."
            leadingIcon={<FiSearch className={ICON_CLASS} />}
            size="default"
            className="w-full"
          />
        </Navbar.Section>
        
        <ActionSection />
      </Navbar.Content>
    </Navbar>
  ),
};

export const WithSelect: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Navbar with collapsible select and search. Search is active by default. Click the icons to toggle between them.',
      },
      story: {
        inline: false,
        iframeHeight: 300,
      },
    },
  },
  render: function WithSelectRender() {
    const [activePanel, setActivePanel] = useState<'none' | 'select' | 'search'>('search');

    const toggleSelect = () => setActivePanel(prev => prev === 'select' ? 'none' : 'select');
    const toggleSearch = () => setActivePanel(prev => prev === 'search' ? 'none' : 'search');

    return (
      <Navbar>
        <Navbar.Content>
          <Brand />
          
          {/* Collapsible Controls - centered in navbar */}
          <div className="flex items-center gap-2 justify-center">
            {/* Select: expands when active, shrinks to button when inactive */}
            <div className={`${PANEL_TRANSITION} ${activePanel === 'select' ? 'w-72' : COLLAPSED_SIZE}`}>
              {activePanel === 'select' ? (
                <Select size="default" defaultValue="workspace-1" className="w-full">
                  <Select.Trigger placeholder="Select workspace" />
                  <Select.Menu>
                    <Select.Option value="workspace-1">Workspace 1</Select.Option>
                    <Select.Option value="workspace-2">Workspace 2</Select.Option>
                    <Select.Option value="workspace-3">Workspace 3</Select.Option>
                  </Select.Menu>
                </Select>
              ) : (
                <Button variant="nav" size="default" onClick={toggleSelect} aria-label="Open workspace selector" className={`${COLLAPSED_SIZE} justify-center`}>
                  <FiMoreVertical className={ICON_CLASS} />
                </Button>
              )}
            </div>
            
            {/* Search: expands when active, shrinks to button when inactive */}
            <div className={`${PANEL_TRANSITION} ${activePanel === 'search' ? 'w-72' : COLLAPSED_SIZE}`}>
              {activePanel === 'search' ? (
                <Input
                  placeholder="Search..."
                  leadingIcon={<FiSearch className={ICON_CLASS} />}
                  size="default"
                  className="w-full"
                  autoFocus
                />
              ) : (
                <Button variant="nav" size="default" onClick={toggleSearch} aria-label="Open search" className={`${COLLAPSED_SIZE} justify-center`}>
                  <FiSearch className={ICON_CLASS} />
                </Button>
              )}
            </div>
          </div>
          
          <ActionSection />
        </Navbar.Content>
      </Navbar>
    );
  },
};
