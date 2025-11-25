import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from '../../basic/forms/Button/Button';

const meta: Meta<typeof Drawer> = {
  title: 'Experimental/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A drawer component that slides in from the edges of the screen. Renders in a portal with focus trap, body scroll lock, and keyboard support. Built using the compound component pattern with `Drawer.Header`, `Drawer.Title`, `Drawer.Content`, and `Drawer.Footer` subcomponents. Supports multiple placements (left, right, top, bottom) and sizes (sm, md, lg, full).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls the visibility of the drawer',
    },
    placement: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'The placement of the drawer',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'The size of the drawer',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Whether clicking the overlay closes the drawer',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether pressing Escape closes the drawer',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button',
    },
    preventBodyScroll: {
      control: 'boolean',
      description: 'Whether to prevent body scrolling when drawer is open',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Compound Component Overview
export const CompoundComponents: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Drawer is built using the compound component pattern. It consists of: `Drawer` (root container with overlay), `Drawer.Header` (header section), `Drawer.Title` (heading element), `Drawer.Content` (main content wrapper), and `Drawer.Footer` (action buttons section). The close button is rendered automatically unless `showCloseButton={false}`.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Drawer.Header>
            <Drawer.Title>Drawer Components</Drawer.Title>
          </Drawer.Header>
          <Drawer.Content>
            <p>This demonstrates all compound components:</p>
            <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
              <li>Drawer.Header - Contains the title</li>
              <li>Drawer.Title - Heading element</li>
              <li>Drawer.Content - Main content area</li>
              <li>Drawer.Footer - Action buttons</li>
            </ul>
          </Drawer.Content>
          <Drawer.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

// Placement Examples
export const RightPlacement: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default drawer placement on the right side of the screen.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Right Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="right">
          <Drawer.Header>
            <Drawer.Title>Right Drawer</Drawer.Title>
          </Drawer.Header>
          <Drawer.Content>
            <p>This drawer slides in from the right side.</p>
          </Drawer.Content>
          <Drawer.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Save</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

export const LeftPlacement: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Drawer that slides in from the left side, ideal for navigation menus.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Left Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="left">
          <Drawer.Header>
            <Drawer.Title>Navigation</Drawer.Title>
          </Drawer.Header>
          <Drawer.Content>
            <nav>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '0.5rem 0' }}>
                  <a href="#home">Home</a>
                </li>
                <li style={{ padding: '0.5rem 0' }}>
                  <a href="#about">About</a>
                </li>
                <li style={{ padding: '0.5rem 0' }}>
                  <a href="#services">Services</a>
                </li>
                <li style={{ padding: '0.5rem 0' }}>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </nav>
          </Drawer.Content>
        </Drawer>
      </>
    );
  },
};

export const TopPlacement: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Drawer that slides down from the top of the screen.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Top Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="top">
          <Drawer.Header>
            <Drawer.Title>Announcement</Drawer.Title>
          </Drawer.Header>
          <Drawer.Content>
            <p>This drawer slides down from the top.</p>
            <p style={{ marginTop: '0.5rem' }}>Perfect for notifications or announcements.</p>
          </Drawer.Content>
          <Drawer.Footer>
            <Button onClick={() => setIsOpen(false)}>Dismiss</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

export const BottomPlacement: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Drawer that slides up from the bottom of the screen, commonly used on mobile.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Bottom Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="bottom">
          <Drawer.Header>
            <Drawer.Title>Options</Drawer.Title>
          </Drawer.Header>
          <Drawer.Content>
            <p>This drawer slides up from the bottom.</p>
            <p style={{ marginTop: '0.5rem' }}>Commonly used for mobile action sheets.</p>
          </Drawer.Content>
          <Drawer.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Select</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

// Size Examples
export const SmallSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small drawer size for compact content.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Small Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm">
          <Drawer.Header>
            <Drawer.Title>Small Drawer</Drawer.Title>
          </Drawer.Header>
          <Drawer.Content>
            <p>Compact drawer for simple content.</p>
          </Drawer.Content>
          <Drawer.Footer>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

export const MediumSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Medium drawer size (default) for standard content.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Medium Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
          <Drawer.Header>
            <Drawer.Title>Medium Drawer</Drawer.Title>
          </Drawer.Header>
          <Drawer.Content>
            <p>Standard drawer size for most use cases.</p>
          </Drawer.Content>
          <Drawer.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

export const LargeSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Large drawer for detailed content or forms.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
          <Drawer.Header>
            <Drawer.Title>Large Drawer</Drawer.Title>
          </Drawer.Header>
          <Drawer.Content>
            <p>Large drawer provides more space for detailed content.</p>
            <p style={{ marginTop: '1rem' }}>
              Ideal for forms, settings panels, or comprehensive information displays.
            </p>
          </Drawer.Content>
          <Drawer.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Save Changes</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

export const FullSize: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Full-width/height drawer that covers the entire edge.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Full Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size="full">
          <Drawer.Header>
            <Drawer.Title>Full Drawer</Drawer.Title>
          </Drawer.Header>
          <Drawer.Content>
            <p>This drawer takes up the full width/height of the screen edge.</p>
            <p style={{ marginTop: '1rem' }}>
              Useful for comprehensive forms, detailed settings, or when you need maximum space.
            </p>
          </Drawer.Content>
          <Drawer.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Submit</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

// Behavior Examples
export const WithoutOverlayClose: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Drawer that cannot be closed by clicking the overlay.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} closeOnOverlayClick={false}>
          <Drawer.Header>
            <Drawer.Title>Important Form</Drawer.Title>
          </Drawer.Header>
          <Drawer.Content>
            <p>This drawer requires explicit action to close.</p>
            <p style={{ marginTop: '0.5rem' }}>
              Clicking the overlay won't close it - use the buttons or close icon.
            </p>
          </Drawer.Content>
          <Drawer.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Submit</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

export const WithoutCloseButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Drawer without the close button in the top-right corner.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} showCloseButton={false}>
          <Drawer.Header>
            <Drawer.Title>Clean Interface</Drawer.Title>
          </Drawer.Header>
          <Drawer.Content>
            <p>This drawer has no close button in the corner.</p>
            <p style={{ marginTop: '0.5rem' }}>Use the footer buttons to close.</p>
          </Drawer.Content>
          <Drawer.Footer>
            <Button onClick={() => setIsOpen(false)}>Done</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

// Use Case Examples
export const NavigationMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Using drawer as a navigation menu (hamburger menu pattern).',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>☰ Menu</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="left" size="sm">
          <Drawer.Header>
            <Drawer.Title>Menu</Drawer.Title>
          </Drawer.Header>
          <Drawer.Content>
            <nav>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee' }}>
                  <a href="#dashboard" onClick={() => setIsOpen(false)}>
                    Dashboard
                  </a>
                </li>
                <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee' }}>
                  <a href="#projects" onClick={() => setIsOpen(false)}>
                    Projects
                  </a>
                </li>
                <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee' }}>
                  <a href="#team" onClick={() => setIsOpen(false)}>
                    Team
                  </a>
                </li>
                <li style={{ padding: '0.75rem 0', borderBottom: '1px solid #eee' }}>
                  <a href="#settings" onClick={() => setIsOpen(false)}>
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </Drawer.Content>
        </Drawer>
      </>
    );
  },
};

export const FilterPanel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Using drawer as a filter panel for data tables or product listings.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>🔍 Filters</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="right" size="md">
          <Drawer.Header>
            <Drawer.Title>Filter Options</Drawer.Title>
          </Drawer.Header>
          <Drawer.Content>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                  Category
                </h3>
                <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                  <input type="checkbox" /> Electronics
                </label>
                <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                  <input type="checkbox" /> Clothing
                </label>
                <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                  <input type="checkbox" /> Books
                </label>
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>
                  Price Range
                </h3>
                <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                  <input type="checkbox" /> Under $25
                </label>
                <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                  <input type="checkbox" /> $25 - $50
                </label>
                <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                  <input type="checkbox" /> Over $50
                </label>
              </div>
            </div>
          </Drawer.Content>
          <Drawer.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Reset
            </Button>
            <Button onClick={() => setIsOpen(false)}>Apply Filters</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

export const SettingsPanel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Using drawer as a settings or preferences panel.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>⚙️ Settings</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="right" size="lg">
          <Drawer.Header>
            <Drawer.Title>Application Settings</Drawer.Title>
          </Drawer.Header>
          <Drawer.Content>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <section>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 600 }}>
                  Appearance
                </h3>
                <label
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span>Dark Mode</span>
                  <input type="checkbox" />
                </label>
                <label
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>Compact View</span>
                  <input type="checkbox" />
                </label>
              </section>
              <section>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1rem', fontWeight: 600 }}>
                  Notifications
                </h3>
                <label
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span>Email Notifications</span>
                  <input type="checkbox" defaultChecked />
                </label>
                <label
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>Push Notifications</span>
                  <input type="checkbox" defaultChecked />
                </label>
              </section>
            </div>
          </Drawer.Content>
          <Drawer.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Save Changes</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};
