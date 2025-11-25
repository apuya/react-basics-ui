import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Popover } from './Popover';
import { Button } from '../../forms/Button/Button';
import { Badge } from '../../feedback/Badge/Badge';

const meta: Meta<typeof Popover> = {
  title: 'Overlay/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A floating overlay component that displays rich content in a portal. Supports 4 sides (top, right, bottom, left) and 3 alignments (start, center, end) for flexible positioning. Use for tooltips with interactive content, context menus, or any floating UI that requires more than plain text.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the popover is open (controlled mode)',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the popover is open by default (uncontrolled mode)',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when the open state changes',
    },
  },
};

export default meta;

export const Default = {
  parameters: {
    docs: {
      description: {
        story: 'Basic popover with default bottom-center positioning. Click the trigger to open.',
      },
    },
  },
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button>Open Popover</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Default Popover</Popover.Title>
        <Popover.Description>
          This is a basic popover with default positioning (bottom-center).
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
};

export const TopPosition = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button>Top Popover</Button>
      </Popover.Trigger>
      <Popover.Content side="top">
        <Popover.Title>Top Position</Popover.Title>
        <Popover.Description>
          This popover appears above the trigger element.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
};

export const RightPosition = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button>Right Popover</Button>
      </Popover.Trigger>
      <Popover.Content side="right">
        <Popover.Title>Right Position</Popover.Title>
        <Popover.Description>
          This popover appears to the right of the trigger element.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
};

export const LeftPosition = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button>Left Popover</Button>
      </Popover.Trigger>
      <Popover.Content side="left">
        <Popover.Title>Left Position</Popover.Title>
        <Popover.Description>
          This popover appears to the left of the trigger element.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
};

export const StartAlignment = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button>Start Aligned</Button>
      </Popover.Trigger>
      <Popover.Content side="bottom" align="start">
        <Popover.Title>Start Alignment</Popover.Title>
        <Popover.Description>
          This popover is aligned to the start (left edge) of the trigger.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
};

export const EndAlignment = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button>End Aligned</Button>
      </Popover.Trigger>
      <Popover.Content side="bottom" align="end">
        <Popover.Title>End Alignment</Popover.Title>
        <Popover.Description>
          This popover is aligned to the end (right edge) of the trigger.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
};

export const WithArrow = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button>With Arrow</Button>
      </Popover.Trigger>
      <Popover.Content showArrow>
        <Popover.Title>Arrow Indicator</Popover.Title>
        <Popover.Description>
          This popover includes an arrow pointing to the trigger element.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
};

export const RichContent = {
  parameters: {
    docs: {
      description: {
        story: 'User profile card with avatar, badges, and action button. Demonstrates complex content layouts.',
      },
    },
  },
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button>User Info</Button>
      </Popover.Trigger>
      <Popover.Content showArrow>
        <div style={{ display: 'flex', gap: '0.75rem', padding: '0.5rem' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '50%',
            backgroundColor: 'var(--semantic-color-primary-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 600,
            flexShrink: 0,
          }}>
            JD
          </div>
          <div>
            <Popover.Title>John Doe</Popover.Title>
            <Popover.Description>Senior Developer</Popover.Description>
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
              <Badge variant="primary">React</Badge>
              <Badge variant="primary">TypeScript</Badge>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--semantic-color-border-default)' }}>
          <Button size="small" style={{ width: '100%' }}>View Profile</Button>
        </div>
      </Popover.Content>
    </Popover>
  ),
};

export const WithCustomContent = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button>Settings</Button>
      </Popover.Trigger>
      <Popover.Content showArrow side="bottom" align="end">
        <Popover.Title>Quick Settings</Popover.Title>
        <div style={{ padding: '0.75rem 0' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '0.5rem 0',
          }}>
            <span>Notifications</span>
            <input type="checkbox" defaultChecked />
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '0.5rem 0',
          }}>
            <span>Dark Mode</span>
            <input type="checkbox" />
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '0.5rem 0',
          }}>
            <span>Sound Effects</span>
            <input type="checkbox" defaultChecked />
          </div>
        </div>
        <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--semantic-color-border-default)' }}>
          <Button variant="secondary" size="small" style={{ width: '100%' }}>
            Advanced Settings
          </Button>
        </div>
      </Popover.Content>
    </Popover>
  ),
};

export const ControlledState = {
  parameters: {
    docs: {
      description: {
        story: 'Programmatically control the popover open state. Useful when you need to close the popover from within its content.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger>
            <Button>Controlled Popover</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Title>Controlled State</Popover.Title>
            <Popover.Description>
              This popover's open state is controlled externally.
            </Popover.Description>
            <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--semantic-color-border-default)' }}>
              <Button size="small" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </Popover.Content>
        </Popover>
        <div style={{ fontSize: '0.875rem', color: 'var(--semantic-color-text-secondary)' }}>
          Popover is {isOpen ? 'open' : 'closed'}
        </div>
      </div>
    );
  },
};

export const MultiplePopovers = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Popover>
        <Popover.Trigger>
          <Button>Info</Button>
        </Popover.Trigger>
        <Popover.Content side="top" showArrow>
          <Popover.Title>Information</Popover.Title>
          <Popover.Description>
            Additional context and details.
          </Popover.Description>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger>
          <Button>Help</Button>
        </Popover.Trigger>
        <Popover.Content side="top" showArrow>
          <Popover.Title>Help & Support</Popover.Title>
          <Popover.Description>
            Contact us for assistance.
          </Popover.Description>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger>
          <Button>Share</Button>
        </Popover.Trigger>
        <Popover.Content side="top" showArrow>
          <Popover.Title>Share Options</Popover.Title>
          <Popover.Description>
            Share via email or social media.
          </Popover.Description>
        </Popover.Content>
      </Popover>
    </div>
  ),
};

export const WithForm = {
  render: () => (
    <Popover>
      <Popover.Trigger>
        <Button>Add Comment</Button>
      </Popover.Trigger>
      <Popover.Content showArrow>
        <Popover.Title>Leave a Comment</Popover.Title>
        <div style={{ padding: '0.75rem 0' }}>
          <textarea
            placeholder="Type your comment here..."
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '0.5rem',
              borderRadius: 'var(--semantic-border-radius-sm)',
              border: '1px solid var(--semantic-color-border-default)',
              fontFamily: 'inherit',
              fontSize: '0.875rem',
            }}
          />
        </div>
        <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--semantic-color-border-default)', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <Button variant="secondary" size="small">Cancel</Button>
          <Button size="small">Submit</Button>
        </div>
      </Popover.Content>
    </Popover>
  ),
};

export const AllPositions = {
  parameters: {
    docs: {
      description: {
        story: 'Visual overview of all 12 position combinations (4 sides × 3 alignments). Use this to compare positioning options.',
      },
    },
  },
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '3rem',
      padding: '4rem',
    }}>
      {/* Top row */}
      <Popover>
        <Popover.Trigger>
          <Button>Top-Start</Button>
        </Popover.Trigger>
        <Popover.Content side="top" align="start" showArrow>
          <Popover.Description>Top-Start</Popover.Description>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger>
          <Button>Top-Center</Button>
        </Popover.Trigger>
        <Popover.Content side="top" align="center" showArrow>
          <Popover.Description>Top-Center</Popover.Description>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger>
          <Button>Top-End</Button>
        </Popover.Trigger>
        <Popover.Content side="top" align="end" showArrow>
          <Popover.Description>Top-End</Popover.Description>
        </Popover.Content>
      </Popover>

      {/* Middle row */}
      <Popover>
        <Popover.Trigger>
          <Button>Left-Center</Button>
        </Popover.Trigger>
        <Popover.Content side="left" align="center" showArrow>
          <Popover.Description>Left-Center</Popover.Description>
        </Popover.Content>
      </Popover>

      <div />

      <Popover>
        <Popover.Trigger>
          <Button>Right-Center</Button>
        </Popover.Trigger>
        <Popover.Content side="right" align="center" showArrow>
          <Popover.Description>Right-Center</Popover.Description>
        </Popover.Content>
      </Popover>

      {/* Bottom row */}
      <Popover>
        <Popover.Trigger>
          <Button>Bottom-Start</Button>
        </Popover.Trigger>
        <Popover.Content side="bottom" align="start" showArrow>
          <Popover.Description>Bottom-Start</Popover.Description>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger>
          <Button>Bottom-Center</Button>
        </Popover.Trigger>
        <Popover.Content side="bottom" align="center" showArrow>
          <Popover.Description>Bottom-Center</Popover.Description>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger>
          <Button>Bottom-End</Button>
        </Popover.Trigger>
        <Popover.Content side="bottom" align="end" showArrow>
          <Popover.Description>Bottom-End</Popover.Description>
        </Popover.Content>
      </Popover>
    </div>
  ),
};
