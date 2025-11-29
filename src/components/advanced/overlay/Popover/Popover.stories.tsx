import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Popover } from './Popover';
import { Button } from '../../../basic/forms/Button/Button';
import { Badge } from '../../../basic/feedback/Badge/Badge';

// Shared button-like styling for Popover.Trigger
const triggerClassName = 'inline-flex items-center justify-center rounded-md text-sm font-medium bg-[var(--component-button-primary-bg)] text-[var(--component-button-primary-text)] hover:bg-[var(--component-button-primary-hover-bg)] px-4 py-2 transition-colors';

const meta: Meta<typeof Popover> = {
  title: 'Overlay/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component: 'A floating overlay component that displays rich content in a portal. Supports 4 sides (top, right, bottom, left) and 3 alignments (start, center, end) for flexible positioning. Use for tooltips with interactive content, context menus, or any floating UI that requires more than plain text.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

// ============================================================================
// BASIC USAGE
// ============================================================================

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic popover with default bottom-center positioning. Click the trigger to open.',
      },
    },
  },
  render: () => (
    <Popover>
      <Popover.Trigger className={triggerClassName}>
        Open Popover
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

export const WithArrow: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover with an arrow indicator pointing to the trigger element.',
      },
    },
  },
  render: () => (
    <Popover>
      <Popover.Trigger className={triggerClassName}>
        With Arrow
      </Popover.Trigger>
      <Popover.Content showArrow>
        <Popover.Title>Arrow Indicator</Popover.Title>
        <Popover.Description>
          The arrow helps visually connect the popover to its trigger.
        </Popover.Description>
      </Popover.Content>
    </Popover>
  ),
};

// ============================================================================
// POSITIONING
// ============================================================================

export const AllPositions: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Visual overview of all 12 position combinations (4 sides × 3 alignments). The \`side\` prop controls which edge the popover appears on, while \`align\` controls the alignment along that edge.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '600px', padding: '8rem 4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '3rem',
    }}>
      {/* Top row */}
      <Popover>
        <Popover.Trigger className={triggerClassName}>Top-Start</Popover.Trigger>
        <Popover.Content side="top" align="start" showArrow>
          <Popover.Description>side="top" align="start"</Popover.Description>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger className={triggerClassName}>Top-Center</Popover.Trigger>
        <Popover.Content side="top" align="center" showArrow>
          <Popover.Description>side="top" align="center"</Popover.Description>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger className={triggerClassName}>Top-End</Popover.Trigger>
        <Popover.Content side="top" align="end" showArrow>
          <Popover.Description>side="top" align="end"</Popover.Description>
        </Popover.Content>
      </Popover>

      {/* Middle row */}
      <Popover>
        <Popover.Trigger className={triggerClassName}>Left</Popover.Trigger>
        <Popover.Content side="left" align="center" showArrow>
          <Popover.Description>side="left"</Popover.Description>
        </Popover.Content>
      </Popover>

      <div />

      <Popover>
        <Popover.Trigger className={triggerClassName}>Right</Popover.Trigger>
        <Popover.Content side="right" align="center" showArrow>
          <Popover.Description>side="right"</Popover.Description>
        </Popover.Content>
      </Popover>

      {/* Bottom row */}
      <Popover>
        <Popover.Trigger className={triggerClassName}>Bottom-Start</Popover.Trigger>
        <Popover.Content side="bottom" align="start" showArrow>
          <Popover.Description>side="bottom" align="start"</Popover.Description>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger className={triggerClassName}>Bottom-Center</Popover.Trigger>
        <Popover.Content side="bottom" align="center" showArrow>
          <Popover.Description>side="bottom" align="center"</Popover.Description>
        </Popover.Content>
      </Popover>

      <Popover>
        <Popover.Trigger className={triggerClassName}>Bottom-End</Popover.Trigger>
        <Popover.Content side="bottom" align="end" showArrow>
          <Popover.Description>side="bottom" align="end"</Popover.Description>
        </Popover.Content>
      </Popover>
    </div>
  ),
};

// ============================================================================
// RICH CONTENT EXAMPLES
// ============================================================================

export const UserProfile: Story = {
  parameters: {
    docs: {
      description: {
        story: 'User profile card with avatar, role, skill badges, and action button. Common pattern for user hover cards.',
      },
    },
  },
  render: () => (
    <Popover>
      <Popover.Trigger className={triggerClassName}>
        View Profile
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
        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--semantic-color-border-default)' }}>
          <Button size="small" style={{ width: '100%' }}>View Full Profile</Button>
        </div>
      </Popover.Content>
    </Popover>
  ),
};

export const WithForm: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Popover containing a form with textarea and action buttons. Useful for quick input modals like comments or feedback.',
      },
    },
  },
  render: () => (
    <Popover>
      <Popover.Trigger className={triggerClassName}>
        Add Comment
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
              resize: 'vertical',
            }}
          />
        </div>
        <div style={{ 
          paddingTop: '0.75rem', 
          borderTop: '1px solid var(--semantic-color-border-default)', 
          display: 'flex', 
          gap: '0.5rem', 
          justifyContent: 'flex-end' 
        }}>
          <Button variant="secondary" size="small">Cancel</Button>
          <Button size="small">Submit</Button>
        </div>
      </Popover.Content>
    </Popover>
  ),
};

// ============================================================================
// CONTROLLED STATE
// ============================================================================

export const Controlled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Programmatically control the popover open state using the \`open\` and \`onOpenChange\` props. Useful when you need to close the popover from within its content or based on external events.',
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger className={triggerClassName}>
            Controlled Popover
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Title>Controlled State</Popover.Title>
            <Popover.Description>
              Click the button below to close programmatically.
            </Popover.Description>
            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--semantic-color-border-default)' }}>
              <Button size="small" onClick={() => setIsOpen(false)}>
                Close Popover
              </Button>
            </div>
          </Popover.Content>
        </Popover>
        <div style={{ fontSize: '0.875rem', color: 'var(--semantic-color-text-secondary)' }}>
          State: <strong>{isOpen ? 'Open' : 'Closed'}</strong>
        </div>
      </div>
    );
  },
};
