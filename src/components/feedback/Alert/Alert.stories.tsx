import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/typography/Text';
import { BiStar, BiRocket, BiShield } from 'react-icons/bi';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Alert displays important messages to users with semantic visual variants.

## Features
- **Four variants**: \`info\`, \`success\`, \`warning\`, \`error\`
- **Flexible content**: Title, description, or custom children
- **Icon customization**: Default variant icons, custom icons, or no icon
- **Dismissible**: Optional close button with \`onClose\` callback
- **Accessible**: Uses \`role="alert"\` and \`aria-live="polite"\`

## Usage
\`\`\`tsx
import { Alert } from '@/components/feedback/Alert';

// Basic usage
<Alert variant="success" title="Saved!" description="Your changes have been saved." />

// Dismissible
<Alert variant="warning" title="Warning" onClose={() => handleDismiss()} />

// Custom icon
<Alert variant="info" leadingIcon={<CustomIcon />} title="Custom" />

// No icon
<Alert variant="info" leadingIcon={null} title="No icon" />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual variant indicating the type of message',
      table: {
        type: { summary: "'info' | 'success' | 'warning' | 'error'" },
        defaultValue: { summary: 'info' },
      },
    },
    title: {
      control: 'text',
      description: 'Bold title text displayed at the top of the alert',
      table: { type: { summary: 'ReactNode' } },
    },
    description: {
      control: 'text',
      description: 'Secondary description text below the title',
      table: { type: { summary: 'ReactNode' } },
    },
    leadingIcon: {
      control: false,
      description:
        'Icon displayed at the start. Pass `undefined` for default variant icon, `null` to hide, or a custom ReactNode.',
      table: { type: { summary: 'ReactNode | null' } },
    },
    trailingIcon: {
      control: false,
      description: 'Icon displayed at the end (before close button if present)',
      table: { type: { summary: 'ReactNode' } },
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
  decorators: [(Story) => <Box style={{ maxWidth: '32rem' }}><Story /></Box>],
};

export default meta;
type Story = StoryObj<typeof Alert>;

// =============================================================================
// Primary Story (Default)
// =============================================================================

/**
 * Default alert with title and description. Uses the `info` variant by default.
 */
export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Heads up!',
    description: 'You can add components to your app using the CLI.',
  },
};

// =============================================================================
// Variants
// =============================================================================

/**
 * All semantic variants for different message types:
 * - **Info**: General information or tips
 * - **Success**: Positive confirmation of completed actions
 * - **Warning**: Caution about potential issues
 * - **Error**: Problems requiring attention
 */
export const Variants: Story = {
  render: () => (
    <Stack spacing="md">
      <Alert variant="info" title="Information" description="This is an informational message." />
      <Alert variant="success" title="Success!" description="Your changes have been saved." />
      <Alert variant="warning" title="Warning" description="This action cannot be undone." />
      <Alert variant="error" title="Error" description="Something went wrong. Please try again." />
    </Stack>
  ),
};

// =============================================================================
// Content Variations
// =============================================================================

/**
 * Alerts can display title only, description only, or both.
 * Use title-only for brief confirmations, description-only for simple messages.
 */
export const ContentVariations: Story = {
  render: () => (
    <Stack spacing="md">
      <Alert variant="success" title="Successfully saved!" />
      <Alert variant="info" description="This alert only has a description." />
      <Alert
        variant="warning"
        title="With Both"
        description="This alert has both title and description."
      />
    </Stack>
  ),
};

/**
 * For complex content, use `children` instead of `description`.
 * Supports any ReactNode including links, lists, and formatted text.
 */
export const CustomChildren: Story = {
  args: {
    variant: 'info',
    title: 'Update Available',
    children: (
      <Stack spacing="xs">
        <Text size="small">
          A new version is available.{' '}
          <a href="#" style={{ textDecoration: 'underline' }}>
            View release notes
          </a>
        </Text>
      </Stack>
    ),
    onClose: () => {},
  },
};

// =============================================================================
// Icons
// =============================================================================

/**
 * Icon customization options:
 * - **Default**: Each variant has a semantic default icon
 * - **Custom**: Pass any ReactNode to `leadingIcon`
 * - **Hidden**: Pass `null` to `leadingIcon` to hide the icon
 * - **Trailing**: Use `trailingIcon` for additional icons
 */
export const IconOptions: Story = {
  render: () => (
    <Stack spacing="md">
      <Alert variant="info" title="Default Icon" description="Uses the variant's default icon." />
      <Alert
        variant="success"
        title="Custom Icon"
        description="Uses a custom star icon."
        leadingIcon={<BiStar />}
      />
      <Alert
        variant="warning"
        title="No Icon"
        description="Icon hidden with leadingIcon={null}."
        leadingIcon={null}
      />
      <Alert
        variant="error"
        title="Both Icons"
        description="Leading and trailing icons."
        leadingIcon={<BiShield />}
        trailingIcon={<BiRocket />}
      />
    </Stack>
  ),
};

// =============================================================================
// Dismissible
// =============================================================================

/**
 * Provide `onClose` callback to render a close button.
 * Clicking the button triggers the callback for handling dismissal.
 */
export const Dismissible: Story = {
  args: {
    variant: 'warning',
    title: 'Dismissible Alert',
    description: 'Click the X button to dismiss this alert.',
    onClose: () => {},
  },
};

// =============================================================================
// Use Cases
// =============================================================================

/**
 * **Form Validation Error**
 *
 * Display validation errors after form submission.
 */
export const FormValidationError: Story = {
  args: {
    variant: 'error',
    title: 'Please fix the following errors:',
    children: (
      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: 'var(--semantic-text-size-small)' }}>
        <li>Email address is required</li>
        <li>Password must be at least 8 characters</li>
      </ul>
    ),
  },
  parameters: {
    docs: { description: { story: 'Error alert showing form validation messages.' } },
  },
};

/**
 * **Action Confirmation**
 *
 * Confirm successful completion of user actions.
 */
export const ActionConfirmation: Story = {
  args: {
    variant: 'success',
    title: 'Changes saved successfully!',
    description: 'Your profile has been updated.',
    onClose: () => {},
  },
  parameters: {
    docs: { description: { story: 'Success alert confirming a completed action.' } },
  },
};

/**
 * **Destructive Warning**
 *
 * Warn users before irreversible actions.
 */
export const DestructiveWarning: Story = {
  args: {
    variant: 'warning',
    title: 'Are you sure?',
    description: 'This action will permanently delete all your data and cannot be undone.',
    leadingIcon: <BiShield />,
  },
  parameters: {
    docs: { description: { story: 'Warning alert for destructive actions.' } },
  },
};

/**
 * **Feature Announcement**
 *
 * Inform users about new features or updates.
 */
export const FeatureAnnouncement: Story = {
  args: {
    variant: 'info',
    title: 'New Feature Available!',
    description: 'Try our new dark mode. Go to Settings > Appearance to enable it.',
    leadingIcon: <BiRocket />,
    onClose: () => {},
  },
  parameters: {
    docs: { description: { story: 'Info alert announcing new features.' } },
  },
};

/**
 * **Long Content**
 *
 * Alerts handle long text content with proper wrapping.
 */
export const LongContent: Story = {
  args: {
    variant: 'info',
    title: 'Important Information',
    description:
      'This is an alert with a longer description to demonstrate how the component handles text wrapping and maintains proper layout. The content will wrap naturally within the container while keeping the icon and close button properly aligned.',
    onClose: () => {},
  },
  parameters: {
    docs: { description: { story: 'Alert with long text content demonstrating text wrapping.' } },
  },
};

/**
 * **Page-Level Notice**
 *
 * Persistent notice displayed at the top of a page for important announcements.
 * Unlike Toast, Alert stays visible until explicitly dismissed.
 */
export const PageLevelNotice: Story = {
  args: {
    variant: 'info',
    title: 'Scheduled Maintenance',
    description: 'The system will be unavailable on Sunday, Dec 22 from 2-4 AM EST for maintenance.',
    leadingIcon: null,
  },
  parameters: {
    docs: { description: { story: 'Persistent page-level notice for announcements. Use Alert (not Toast) when the message should remain visible.' } },
  },
};
