import type { Meta, StoryObj } from '@storybook/react';
import { Portal } from './Portal';
import { Text } from '../../typography/Text';
import { Heading } from '../../typography/Heading';
import { Button } from '../../forms/Button';
import { Box } from '../../layout/Box';

const meta: Meta<typeof Portal> = {
  title: 'Components/Utility/Portal',
  component: Portal,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Portal component for rendering children into a DOM node that exists outside the parent component hierarchy. Built on React\'s `createPortal`, it automatically creates and manages portal containers. Commonly used by Modal, Tooltip, Popover, and Drawer components to render overlays at the document root, breaking out of CSS constraints like `overflow: hidden` or `z-index` stacking contexts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    containerId: {
      control: 'text',
      description: 'ID of the container element to render into (creates if doesn\'t exist)',
      table: {
        defaultValue: { summary: 'portal-root' },
      },
    },
    children: {
      control: false,
      description: 'Content to be rendered in the portal',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Portal>;

// Basic Examples
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic portal rendering content into the default portal-root container at the end of document.body.',
      },
    },
  },
  render: () => (
    <Box>
      <Text className="mb-4">This content is in the normal React tree.</Text>
      <Portal>
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '1rem',
          backgroundColor: 'var(--semantic-bg-brand)',
          color: 'white',
          borderRadius: 'var(--semantic-radius-md)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 9999,
        }}>
          This content is rendered in a portal!
        </div>
      </Portal>
      <Text size="sm" color="secondary">
        Check the DOM - the fixed notification is rendered outside the component tree.
      </Text>
    </Box>
  ),
};

export const CustomContainer: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Portal with a custom container ID. Useful for rendering into specific DOM locations.',
      },
    },
  },
  render: () => (
    <Box>
      <Text className="mb-4">Using a custom container ID: "custom-portal-container"</Text>
      <Portal containerId="custom-portal-container">
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--semantic-status-info-default)',
          color: 'white',
          borderRadius: 'var(--semantic-radius-md)',
          fontSize: '0.875rem',
        }}>
          Rendered in custom-portal-container
        </div>
      </Portal>
      <Text size="sm" color="secondary">
        This creates a div with id="custom-portal-container" if it doesn't exist.
      </Text>
    </Box>
  ),
};

// Visual Demonstrations
export const BreakingOverflowHidden: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how Portal breaks out of a parent container with `overflow: hidden`. The tooltip escapes the constrained box.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'start' }}>
      <div>
        <Text weight="medium" className="mb-2">Without Portal (clipped):</Text>
        <div style={{
          width: '200px',
          height: '150px',
          padding: '1rem',
          border: '2px solid var(--semantic-border-default)',
          borderRadius: 'var(--semantic-radius-md)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <Text>Parent with overflow: hidden</Text>
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            left: '10px',
            padding: '0.5rem',
            backgroundColor: 'var(--semantic-bg-inverse)',
            color: 'var(--semantic-text-inverse)',
            borderRadius: 'var(--semantic-radius-sm)',
            fontSize: '0.75rem',
            whiteSpace: 'nowrap',
          }}>
            I'm clipped! 😞
          </div>
        </div>
      </div>

      <div>
        <Text weight="medium" className="mb-2">With Portal (free):</Text>
        <div style={{
          width: '200px',
          height: '150px',
          padding: '1rem',
          border: '2px solid var(--semantic-border-brand)',
          borderRadius: 'var(--semantic-radius-md)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <Text>Parent with overflow: hidden</Text>
          <Portal>
            <div style={{
              position: 'fixed',
              bottom: '120px',
              left: '470px',
              padding: '0.5rem',
              backgroundColor: 'var(--semantic-bg-brand)',
              color: 'white',
              borderRadius: 'var(--semantic-radius-sm)',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
            }}>
              I escaped! 🎉
            </div>
          </Portal>
        </div>
      </div>
    </div>
  ),
};

export const NotificationToast: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of using Portal for a notification toast positioned at the top-right of the viewport.',
      },
    },
  },
  render: () => (
    <div>
      <p>This component renders a notification toast using Portal.</p>
      <Portal>
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          minWidth: '300px',
          padding: '1rem',
          backgroundColor: 'var(--semantic-status-success-default)',
          color: 'white',
          borderRadius: 'var(--semantic-radius-md)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          alignItems: 'start',
          gap: '0.75rem',
        }}>
          <span style={{ fontSize: '1.25rem' }}>✓</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Success!</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.95 }}>Your changes have been saved.</div>
          </div>
        </div>
      </Portal>
    </div>
  ),
};

export const MultiplePortals: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple portals can coexist, each rendering into different locations or the same container.',
      },
    },
  },
  render: () => (
    <Box>
      <Text className="mb-4">This example shows three different portals rendering simultaneously.</Text>
      
      <Portal>
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--semantic-status-error-default)',
          color: 'white',
          borderRadius: 'var(--semantic-radius-md)',
          fontSize: '0.875rem',
        }}>
          Portal 1: Top Left
        </div>
      </Portal>

      <Portal>
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--semantic-status-warning-default)',
          color: 'white',
          borderRadius: 'var(--semantic-radius-md)',
          fontSize: '0.875rem',
        }}>
          Portal 2: Top Right
        </div>
      </Portal>

      <Portal>
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--semantic-status-info-default)',
          color: 'white',
          borderRadius: 'var(--semantic-radius-md)',
          fontSize: '0.875rem',
        }}>
          Portal 3: Bottom Center
        </div>
      </Portal>

      <Text size="sm" color="secondary" className="mt-4">
        All three notifications are rendered via portals at different positions.
      </Text>
    </Box>
  ),
};

// Practical Examples
export const ModalOverlay: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Example of how Portal is used internally by Modal components to render overlays.',
      },
    },
  },
  render: () => (
    <Box>
      <Text className="mb-4">Portal enables modals to render at the root level:</Text>
      <Portal>
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            backgroundColor: 'var(--semantic-bg-primary)',
            borderRadius: 'var(--semantic-radius-lg)',
            padding: '2rem',
            maxWidth: '400px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          }}>
            <Heading level={3} className="mb-2">
              Modal Example
            </Heading>
            <Text color="secondary" className="mb-6">
              This modal is rendered via Portal, allowing it to appear above all other content.
            </Text>
            <Button variant="primary">
              OK
            </Button>
          </div>
        </div>
      </Portal>
    </Box>
  ),
};

export const TooltipPositioning: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Portal allows tooltips to be positioned freely without being constrained by parent elements.',
      },
    },
  },
  render: () => (
    <Box style={{ padding: '2rem' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <Button variant="primary">
          Hover me
        </Button>
        <Portal>
          <div style={{
            position: 'fixed',
            top: '200px',
            left: '150px',
            padding: '0.5rem 0.75rem',
            backgroundColor: 'var(--semantic-bg-inverse)',
            color: 'var(--semantic-text-inverse)',
            borderRadius: 'var(--semantic-radius-sm)',
            fontSize: '0.875rem',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}>
            This tooltip is rendered via Portal
            <div style={{
              position: 'absolute',
              top: '-4px',
              left: '20px',
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--semantic-bg-inverse)',
              transform: 'rotate(45deg)',
            }} />
          </div>
        </Portal>
      </div>
      <Text size="sm" color="secondary" className="mt-16">
        Portal enables tooltips to escape overflow containers and position absolutely anywhere.
      </Text>
    </Box>
  ),
};
