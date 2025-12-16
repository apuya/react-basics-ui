import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Toast displays temporary notification messages that appear briefly and auto-dismiss.

## Features
- **Five variants**: \`success\`, \`error\`, \`warning\`, \`info\`, \`default\`
- **Flexible content**: Title, description, or custom children
- **Icon control**: Show/hide with \`showIcon\` prop
- **Dismissible**: Optional close button with \`onClose\` callback
- **Accessible**: Uses \`role="alert"\` and \`aria-live="polite"\`

## Usage
\`\`\`tsx
import { Toast } from '@/components/feedback/Toast';

// Basic usage
<Toast variant="success" title="Saved!" description="Changes have been saved." />

// Dismissible
<Toast variant="info" title="New message" onClose={() => dismiss()} />

// Without icon
<Toast variant="success" title="Done" showIcon={false} />

// Custom content
<Toast variant="success">
  <strong>Order confirmed!</strong> Ref: #12345
</Toast>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info', 'default'],
      description: 'Visual variant indicating the type of notification',
      table: {
        type: { summary: "'success' | 'error' | 'warning' | 'info' | 'default'" },
        defaultValue: { summary: 'default' },
      },
    },
    title: {
      control: 'text',
      description: 'Bold title text displayed at the top of the toast',
      table: { type: { summary: 'ReactNode' } },
    },
    description: {
      control: 'text',
      description: 'Secondary description text below the title',
      table: { type: { summary: 'ReactNode' } },
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the variant icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback when close button is clicked. Renders close button when provided.',
      table: { type: { summary: '() => void' } },
    },
    children: {
      control: false,
      description: 'Custom content. Used as body when `description` is not provided.',
      table: { type: { summary: 'ReactNode' } },
    },
  },
  decorators: [(Story) => <Box style={{ width: '24rem' }}><Story /></Box>],
};

export default meta;
type Story = StoryObj<typeof Toast>;

// =============================================================================
// Primary Story (Default)
// =============================================================================

/**
 * Default toast notification. Uses the `default` variant with neutral styling.
 */
export const Default: Story = {
  args: {
    title: 'Notification',
    description: 'This is a default toast notification.',
  },
};

// =============================================================================
// Variants
// =============================================================================

/**
 * All semantic variants for different notification types:
 * - **Success**: Positive confirmation
 * - **Error**: Problems requiring attention
 * - **Warning**: Caution messages
 * - **Info**: General information
 * - **Default**: Neutral notifications
 */
export const Variants: Story = {
  render: () => (
    <Stack spacing="sm">
      <Toast variant="success" title="Success" description="Operation completed successfully." />
      <Toast variant="error" title="Error" description="An error occurred during processing." />
      <Toast variant="warning" title="Warning" description="Please review before proceeding." />
      <Toast variant="info" title="Info" description="Here's some useful information." />
      <Toast variant="default" title="Notification" description="This is a notification." />
    </Stack>
  ),
};

// =============================================================================
// Content Variations
// =============================================================================

/**
 * Toasts can display title only, description only, or both.
 * Use title-only for brief confirmations.
 */
export const ContentVariations: Story = {
  render: () => (
    <Stack spacing="sm">
      <Toast variant="success" title="Profile updated" />
      <Toast variant="info" description="You have 3 new messages waiting." />
      <Toast variant="warning" title="Low storage" description="Less than 10% remaining." />
    </Stack>
  ),
};

/**
 * For complex content, use `children` for full control over the body content.
 */
export const CustomChildren: Story = {
  args: {
    variant: 'success',
    children: (
      <div>
        <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Payment Successful</div>
        <div style={{ fontSize: 'var(--semantic-text-size-small)', opacity: 0.9 }}>
          Order <strong>#12345</strong> has been confirmed.
        </div>
      </div>
    ),
  },
};

// =============================================================================
// Icon Control
// =============================================================================

/**
 * Use `showIcon={false}` to hide the default variant icon.
 * Useful for minimal toast designs or when icons aren't needed.
 */
export const WithoutIcon: Story = {
  args: {
    variant: 'success',
    title: 'Saved',
    description: 'Your preferences have been updated.',
    showIcon: false,
  },
};

// =============================================================================
// Dismissible
// =============================================================================

/**
 * Provide `onClose` callback to render a close button.
 * User can manually dismiss the toast.
 */
export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Cookie Policy',
    description: 'We use cookies to improve your experience.',
    onClose: () => {},
  },
};

// =============================================================================
// Use Cases
// =============================================================================

/**
 * **File Upload Success**
 *
 * Confirm successful file uploads with file details.
 */
export const FileUploadSuccess: Story = {
  args: {
    variant: 'success',
    title: 'File uploaded',
    description: 'document.pdf has been uploaded successfully.',
    onClose: () => {},
  },
  parameters: {
    docs: { description: { story: 'Success toast for file upload confirmation.' } },
  },
};

/**
 * **Error Notification**
 *
 * Alert users to errors that need attention.
 */
export const ErrorNotification: Story = {
  args: {
    variant: 'error',
    title: 'Upload failed',
    description: 'The file could not be uploaded. Please try again.',
    onClose: () => {},
  },
  parameters: {
    docs: { description: { story: 'Error toast for failed operations.' } },
  },
};

/**
 * **New Activity**
 *
 * Notify users of new activity or messages.
 */
export const NewActivity: Story = {
  args: {
    variant: 'info',
    title: 'New comment',
    description: 'John commented on your post.',
    onClose: () => {},
  },
  parameters: {
    docs: { description: { story: 'Info toast for new activity notifications.' } },
  },
};

/**
 * **System Warning**
 *
 * Warn users about system status or resource limits.
 */
export const SystemWarning: Story = {
  args: {
    variant: 'warning',
    title: 'Low storage',
    description: 'You have less than 10% storage remaining.',
    onClose: () => {},
  },
  parameters: {
    docs: { description: { story: 'Warning toast for system alerts.' } },
  },
};

/**
 * **Toast Stack**
 *
 * Multiple toasts displayed together, as they might appear in a toast container.
 */
export const ToastStack: Story = {
  render: () => (
    <Stack spacing="xs">
      <Toast
        variant="success"
        title="File uploaded"
        description="document.pdf uploaded."
        onClose={() => {}}
      />
      <Toast
        variant="info"
        title="New comment"
        description="John commented on your post."
        onClose={() => {}}
      />
      <Toast
        variant="warning"
        title="Low storage"
        description="10% storage remaining."
        onClose={() => {}}
      />
    </Stack>
  ),
  parameters: {
    docs: { description: { story: 'Multiple toasts stacked as they appear in a toast container.' } },
  },
};

/**
 * **Undo Action**
 *
 * Temporary feedback with an undo opportunity.
 * Toast is ideal because it auto-dismisses but gives users time to undo.
 */
export const UndoAction: Story = {
  args: {
    variant: 'default',
    title: 'Email archived',
    children: (
      <div style={{ fontSize: 'var(--semantic-text-size-small)' }}>
        Message moved to archive.{' '}
        <button 
          style={{ 
            textDecoration: 'underline', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            color: 'inherit',
            padding: 0,
          }}
          onClick={() => console.log('Undo clicked')}
        >
          Undo
        </button>
      </div>
    ),
    onClose: () => {},
  },
  parameters: {
    docs: { description: { story: 'Toast with undo action for reversible operations. Use Toast (not Alert) for temporary feedback.' } },
  },
};

/**
 * **Auto-Save Notification**
 *
 * Brief confirmation that content has been automatically saved.
 * Toast is ideal for non-intrusive, temporary confirmations.
 */
export const AutoSaveNotification: Story = {
  args: {
    variant: 'success',
    title: 'Draft saved',
    showIcon: false,
  },
  parameters: {
    docs: { description: { story: 'Minimal toast for auto-save confirmations. Use Toast (not Alert) for brief, non-blocking feedback.' } },
  },
};

