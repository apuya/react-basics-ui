import type { Meta, StoryObj } from '@storybook/react';
import { Portal } from './Portal';
import { Text } from '@/components/typography/Text';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof Portal> = {
  title: 'Utility/Portal',
  component: Portal,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Portal component for rendering children into a DOM node outside the parent component hierarchy. Uses createPortal to break out of CSS constraints like overflow: hidden or z-index stacking contexts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    containerId: {
      control: 'text',
      description: 'ID of the container element to render into (creates if it doesn\'t exist)',
      table: { defaultValue: { summary: 'portal-root' } },
    },
    children: {
      control: false,
      description: 'Content to be rendered in the portal',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Portal>;

// Default portal
export const Default: Story = {
  render: () => (
    <Stack spacing="md">
      <Text>This content is in the normal React tree.</Text>
      <Portal>
        <div
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--semantic-bg-brand)',
            color: 'white',
            borderRadius: 'var(--semantic-radius-md)',
            boxShadow: 'var(--semantic-shadow-lg)',
            zIndex: 9999,
          }}
        >
          <Text color="inherit">Rendered via Portal</Text>
        </div>
      </Portal>
      <Text size="small" color="secondary">
        The notification above is rendered outside the component tree.
      </Text>
    </Stack>
  ),
};

// Custom container ID
export const CustomContainer: Story = {
  render: () => (
    <Stack spacing="md">
      <Text>Using custom containerId: "notification-root"</Text>
      <Portal containerId="notification-root">
        <div
          style={{
            position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            padding: '1rem',
            backgroundColor: 'var(--semantic-status-success-default)',
            color: 'white',
            borderRadius: 'var(--semantic-radius-md)',
            zIndex: 9999,
          }}
        >
          <Text color="inherit">Custom container portal</Text>
        </div>
      </Portal>
    </Stack>
  ),
};

// Multiple portals
export const MultiplePortals: Story = {
  render: () => (
    <Stack spacing="md">
      <Text>Multiple portals can render simultaneously:</Text>

      <Portal>
        <div
          style={{
            position: 'fixed',
            top: '1rem',
            left: '1rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--semantic-status-error-default)',
            color: 'white',
            borderRadius: 'var(--semantic-radius-md)',
            zIndex: 9999,
          }}
        >
          Portal 1
        </div>
      </Portal>

      <Portal>
        <div
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--semantic-status-warning-default)',
            color: 'white',
            borderRadius: 'var(--semantic-radius-md)',
            zIndex: 9999,
          }}
        >
          Portal 2
        </div>
      </Portal>

      <Portal>
        <div
          style={{
            position: 'fixed',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--semantic-status-info-default)',
            color: 'white',
            borderRadius: 'var(--semantic-radius-md)',
            zIndex: 9999,
          }}
        >
          Portal 3
        </div>
      </Portal>
    </Stack>
  ),
};
