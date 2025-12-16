import type { Meta, StoryObj } from '@storybook/react';
import { BaseAlertBox } from './BaseAlertBox';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { BiStar, BiHeart } from 'react-icons/bi';

/**
 * Demo variant styles for Storybook visualization
 * In production, Alert and Toast provide their own variant styles via design tokens
 */
const DEMO_VARIANT_STYLES = {
  info: 'bg-blue-50 border border-blue-200 text-blue-900',
  success: 'bg-green-50 border border-green-200 text-green-900',
  warning: 'bg-yellow-50 border border-yellow-200 text-yellow-900',
  error: 'bg-red-50 border border-red-200 text-red-900',
  default: 'bg-gray-50 border border-gray-200 text-gray-900',
};

const DEMO_ICON_COLOR_STYLES = {
  info: 'text-blue-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
  default: 'text-gray-600',
};

/**
 * Demo container styles for Storybook visualization
 * Uses semantic tokens directly since BaseAlertBox tokens were removed
 */
const DEMO_CONTAINER_STYLES: React.CSSProperties = {
  paddingBlock: 'var(--semantic-space-default)',
  paddingInline: 'var(--semantic-space-default)',
  gap: 'var(--semantic-space-compact)',
};

const DEMO_TITLE_STYLES: React.CSSProperties = {
  fontSize: 'var(--semantic-text-size-body)',
  fontWeight: 'var(--semantic-text-weight-semibold)',
  lineHeight: 'var(--semantic-line-height-tight)',
};

const DEMO_BODY_STYLES: React.CSSProperties = {
  fontSize: 'var(--semantic-text-size-small)',
  fontWeight: 'var(--semantic-text-weight-regular)',
  lineHeight: 'var(--semantic-line-height-normal)',
  marginTop: 'var(--semantic-space-tight)',
};

const DEMO_ICON_SIZE_STYLE: React.CSSProperties = {
  fontSize: 'var(--semantic-icon-medium)',
};

/**
 * Common demo props for all stories
 */
const DEMO_STYLE_PROPS = {
  variantClasses: DEMO_VARIANT_STYLES,
  iconColorClasses: DEMO_ICON_COLOR_STYLES,
  containerStyles: DEMO_CONTAINER_STYLES,
  titleStyles: DEMO_TITLE_STYLES,
  bodyStyles: DEMO_BODY_STYLES,
  iconSizeStyle: DEMO_ICON_SIZE_STYLE,
};

const meta = {
  title: 'Feedback/BaseAlertBox',
  component: BaseAlertBox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'BaseAlertBox is the shared base component for Alert and Toast. It provides the common structure: flex container, leading/trailing icons, content area (title + body), and close button. Uses `--component-alertbox-*` design tokens for sizing and typography. Alert and Toast override colors with their own tokens.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info', 'default'],
      description: 'Visual variant',
      table: { defaultValue: { summary: 'default' } },
    },
    title: {
      control: 'text',
      description: 'Title content',
    },
    description: {
      control: 'text',
      description: 'Description/body content',
    },
    leadingIcon: {
      control: false,
      description: 'Leading icon. Pass undefined for default, null to hide.',
    },
    trailingIcon: {
      control: false,
      description: 'Trailing icon',
    },
    onClose: {
      action: 'closed',
      description: 'Close button callback. Shows close button when provided.',
    },
  },
} satisfies Meta<typeof BaseAlertBox>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// Basic Usage
// ============================================================================

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Heads up!',
    description: 'You can add components to your app using the CLI.',
    ...DEMO_STYLE_PROPS,
  },
  decorators: [(Story) => <Box style={{ maxWidth: '32rem' }}><Story /></Box>],
};

export const AllVariants: Story = {
  args: {
    ...DEMO_STYLE_PROPS,
  },
  render: () => (
    <Box style={{ maxWidth: '32rem' }}>
      <Stack spacing="md">
        <BaseAlertBox
          variant="info"
          title="Information"
          description="This is an informational message."
          {...DEMO_STYLE_PROPS}
        />
        <BaseAlertBox
          variant="success"
          title="Success!"
          description="Your changes have been saved successfully."
          {...DEMO_STYLE_PROPS}
        />
        <BaseAlertBox
          variant="warning"
          title="Warning"
          description="This action cannot be undone."
          {...DEMO_STYLE_PROPS}
        />
        <BaseAlertBox
          variant="error"
          title="Error"
          description="Something went wrong. Please try again."
          {...DEMO_STYLE_PROPS}
        />
        <BaseAlertBox
          variant="default"
          title="Default"
          description="A neutral notification message."
          {...DEMO_STYLE_PROPS}
        />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available variants with default icons.',
      },
    },
  },
};

// ============================================================================
// Content Variations
// ============================================================================

export const TitleOnly: Story = {
  args: {
    variant: 'success',
    title: 'Successfully saved!',
    ...DEMO_STYLE_PROPS,
  },
  decorators: [(Story) => <Box style={{ maxWidth: '32rem' }}><Story /></Box>],
  parameters: {
    docs: { description: { story: 'Alert with only a title, no description.' } },
  },
};

export const DescriptionOnly: Story = {
  args: {
    variant: 'info',
    description: 'This is a simple notification without a title.',
    ...DEMO_STYLE_PROPS,
  },
  decorators: [(Story) => <Box style={{ maxWidth: '32rem' }}><Story /></Box>],
  parameters: {
    docs: { description: { story: 'Alert with only a description, no title.' } },
  },
};

export const WithChildren: Story = {
  args: {
    variant: 'info',
    title: 'Custom Content',
    ...DEMO_STYLE_PROPS,
    children: (
      <div>
        <p style={{ marginBottom: '0.5rem' }}>You can pass custom content as children.</p>
        <ul style={{ marginLeft: '1.25rem', listStyle: 'disc' }}>
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ul>
      </div>
    ),
  },
  decorators: [(Story) => <Box style={{ maxWidth: '32rem' }}><Story /></Box>],
  parameters: {
    docs: { description: { story: 'Using children for custom body content.' } },
  },
};

// ============================================================================
// Icon Variations
// ============================================================================

export const NoIcon: Story = {
  args: {
    variant: 'default',
    title: 'Simple Message',
    description: 'This alert has no leading icon.',
    leadingIcon: null,
    ...DEMO_STYLE_PROPS,
  },
  decorators: [(Story) => <Box style={{ maxWidth: '32rem' }}><Story /></Box>],
  parameters: {
    docs: { description: { story: 'Pass `leadingIcon={null}` to hide the default icon.' } },
  },
};

export const CustomIcon: Story = {
  args: {
    variant: 'info',
    title: 'New Feature',
    description: 'Check out this amazing new feature!',
    leadingIcon: <BiStar />,
    ...DEMO_STYLE_PROPS,
  },
  decorators: [(Story) => <Box style={{ maxWidth: '32rem' }}><Story /></Box>],
  parameters: {
    docs: { description: { story: 'Pass a custom icon to override the default variant icon.' } },
  },
};

export const WithTrailingIcon: Story = {
  args: {
    variant: 'success',
    title: 'Favorite Added',
    description: 'Item has been added to your favorites.',
    trailingIcon: <BiHeart />,
    ...DEMO_STYLE_PROPS,
  },
  decorators: [(Story) => <Box style={{ maxWidth: '32rem' }}><Story /></Box>],
  parameters: {
    docs: { description: { story: 'Both leading and trailing icons displayed.' } },
  },
};

// ============================================================================
// Interactive
// ============================================================================

export const Dismissible: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'This message can be dismissed.',
    onClose: () => console.log('Closed'),
    ...DEMO_STYLE_PROPS,
  },
  decorators: [(Story) => <Box style={{ maxWidth: '32rem' }}><Story /></Box>],
  parameters: {
    docs: { description: { story: 'Provide `onClose` callback to show dismiss button.' } },
  },
};

export const FullFeatured: Story = {
  args: {
    variant: 'info',
    title: 'Full Featured Example',
    description: 'This alert has a custom icon, trailing icon, and close button.',
    leadingIcon: <BiStar />,
    trailingIcon: <BiHeart />,
    onClose: () => console.log('Closed'),
    ...DEMO_STYLE_PROPS,
  },
  decorators: [(Story) => <Box style={{ maxWidth: '32rem' }}><Story /></Box>],
  parameters: {
    docs: { description: { story: 'Combining custom icons with close button.' } },
  },
};

// ============================================================================
// Design Token Demo
// ============================================================================

export const UsingDesignTokens: Story = {
  args: {
    ...DEMO_STYLE_PROPS,
  },
  render: () => (
    <Box style={{ maxWidth: '32rem' }}>
      <Stack spacing="md">
        <div className="text-sm text-gray-600 mb-2">
          BaseAlertBox uses <code>--component-alertbox-*</code> tokens for sizing and typography.
          Alert and Toast override these with their own component-specific tokens.
        </div>
        <BaseAlertBox
          variant="info"
          title="Default Token Values"
          description="This uses the BaseAlertBox design tokens for padding, gap, and typography."
          {...DEMO_STYLE_PROPS}
        />
        <div className="text-xs text-gray-500 font-mono mt-2">
          <div>containerStyles: {JSON.stringify(DEMO_CONTAINER_STYLES)}</div>
          <div>titleStyles: {JSON.stringify(DEMO_TITLE_STYLES)}</div>
          <div>bodyStyles: {JSON.stringify(DEMO_BODY_STYLES)}</div>
          <div>iconSizeStyle: {JSON.stringify(DEMO_ICON_SIZE_STYLE)}</div>
        </div>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows the design token values used by BaseAlertBox. Alert and Toast override these with their own component-specific tokens.',
      },
    },
  },
};
