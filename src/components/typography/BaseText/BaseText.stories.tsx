import type { Meta, StoryObj } from '@storybook/react';
import { BaseText } from './BaseText';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof BaseText> = {
  title: 'Typography/BaseText',
  component: BaseText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'BaseText is the foundational typography primitive that all text components (Text, Heading, Label) are built upon. It provides consistent styling through CSS variables and serves as the base for all text-based components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['span', 'p', 'div', 'label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'small'],
    },
    variant: {
      control: 'select',
      options: ['text', 'heading'],
    },
    size: {
      control: 'select',
      options: ['caption', 'small', 'body', 'subtitle', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'inverse', 'disabled', 'link', 'error', 'warning', 'success', 'inherit'],
    },
    lineHeight: {
      control: 'select',
      options: ['tight', 'normal', 'relaxed'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    fontFamily: {
      control: 'select',
      options: ['body', 'mono'],
    },
    truncate: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BaseText>;

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
};

// =============================================================================
// TEXT SIZES
// =============================================================================

export const TextSizes: Story = {
  render: () => (
    <Stack spacing="sm">
      <BaseText size="caption">Caption text – Smallest size for helper text and fine print</BaseText>
      <BaseText size="small">Small text – Labels and secondary content</BaseText>
      <BaseText size="body">Body text – Default paragraph text</BaseText>
      <BaseText size="subtitle">Subtitle text – Emphasized lead text</BaseText>
    </Stack>
  ),
};

// =============================================================================
// HEADING SIZES
// =============================================================================

export const HeadingSizes: Story = {
  render: () => (
    <Stack spacing="sm">
      <BaseText as="h1" size="h1" variant="heading">Heading 1 – Page title</BaseText>
      <BaseText as="h2" size="h2" variant="heading">Heading 2 – Section title</BaseText>
      <BaseText as="h3" size="h3" variant="heading">Heading 3 – Subsection title</BaseText>
      <BaseText as="h4" size="h4" variant="heading">Heading 4 – Card title</BaseText>
      <BaseText as="h5" size="h5" variant="heading">Heading 5 – Small heading</BaseText>
      <BaseText as="h6" size="h6" variant="heading">Heading 6 – Smallest heading</BaseText>
    </Stack>
  ),
};

// =============================================================================
// WEIGHTS
// =============================================================================

export const Weights: Story = {
  render: () => (
    <Stack spacing="sm">
      <BaseText weight="light">Light weight text</BaseText>
      <BaseText weight="normal">Normal weight text (default)</BaseText>
      <BaseText weight="medium">Medium weight text</BaseText>
      <BaseText weight="semibold">Semibold weight text</BaseText>
      <BaseText weight="bold">Bold weight text</BaseText>
    </Stack>
  ),
};

// =============================================================================
// COLORS
// =============================================================================

export const Colors: Story = {
  render: () => (
    <Stack spacing="sm">
      <BaseText color="primary">Primary color – Default text</BaseText>
      <BaseText color="secondary">Secondary color – Supporting text</BaseText>
      <BaseText color="tertiary">Tertiary color – Subtle text</BaseText>
      <BaseText color="disabled">Disabled color – Inactive text</BaseText>
      <BaseText color="link">Link color – Interactive text</BaseText>
      <BaseText color="error">Error color – Error messages</BaseText>
      <BaseText color="warning">Warning color – Warning messages</BaseText>
      <BaseText color="success">Success color – Success messages</BaseText>
    </Stack>
  ),
};

// =============================================================================
// LINE HEIGHTS
// =============================================================================

export const LineHeights: Story = {
  render: () => (
    <Stack spacing="md">
      <div style={{ width: 300 }}>
        <BaseText lineHeight="tight" size="body">
          Tight line height – Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
        </BaseText>
      </div>
      <div style={{ width: 300 }}>
        <BaseText lineHeight="normal" size="body">
          Normal line height – Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
        </BaseText>
      </div>
      <div style={{ width: 300 }}>
        <BaseText lineHeight="relaxed" size="body">
          Relaxed line height – Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
        </BaseText>
      </div>
    </Stack>
  ),
};

// =============================================================================
// ALIGNMENT
// =============================================================================

export const Alignment: Story = {
  render: () => (
    <Stack spacing="md">
      <div style={{ width: 300, border: '1px solid #e0e0e0', padding: '8px' }}>
        <BaseText align="left">Left aligned text</BaseText>
      </div>
      <div style={{ width: 300, border: '1px solid #e0e0e0', padding: '8px' }}>
        <BaseText align="center">Center aligned text</BaseText>
      </div>
      <div style={{ width: 300, border: '1px solid #e0e0e0', padding: '8px' }}>
        <BaseText align="right">Right aligned text</BaseText>
      </div>
    </Stack>
  ),
};

// =============================================================================
// FONT FAMILIES
// =============================================================================

export const FontFamilies: Story = {
  render: () => (
    <Stack spacing="sm">
      <BaseText fontFamily="body">Body font – Default readable font</BaseText>
      <BaseText fontFamily="mono">Mono font – Code and technical content</BaseText>
    </Stack>
  ),
};

// =============================================================================
// TRUNCATE
// =============================================================================

export const Truncate: Story = {
  render: () => (
    <Stack spacing="md">
      <div style={{ width: 300, border: '1px solid #e0e0e0', padding: '8px' }}>
        <BaseText>
          Without truncate – This is a very long text that will wrap to multiple lines when the container is too narrow to fit it all on one line.
        </BaseText>
      </div>
      <div style={{ width: 300, border: '1px solid #e0e0e0', padding: '8px' }}>
        <BaseText truncate>
          With truncate – This is a very long text that will be truncated with an ellipsis when it exceeds the container width.
        </BaseText>
      </div>
    </Stack>
  ),
};

// =============================================================================
// VARIANTS
// =============================================================================

export const Variants: Story = {
  render: () => (
    <Stack spacing="md">
      <div>
        <BaseText size="small" color="secondary" weight="medium">Text Variant</BaseText>
        <BaseText variant="text" size="body">
          Uses text color tokens for consistent body text styling
        </BaseText>
      </div>
      <div>
        <BaseText size="small" color="secondary" weight="medium">Heading Variant</BaseText>
        <BaseText variant="heading" size="h3">
          Uses heading color tokens for stronger visual hierarchy
        </BaseText>
      </div>
    </Stack>
  ),
};

// =============================================================================
// SEMANTIC HTML
// =============================================================================

export const SemanticHTML: Story = {
  render: () => (
    <Stack spacing="sm">
      <BaseText as="p">Paragraph element</BaseText>
      <BaseText as="span">Span element (default)</BaseText>
      <BaseText as="label">Label element</BaseText>
      <BaseText as="strong" weight="bold">Strong element</BaseText>
      <BaseText as="em">Emphasis element</BaseText>
      <BaseText as="small" size="caption">Small element</BaseText>
    </Stack>
  ),
};

// =============================================================================
// COMBINATIONS
// =============================================================================

export const Combinations: Story = {
  render: () => (
    <Stack spacing="md">
      <BaseText size="h2" variant="heading" color="primary" weight="bold">
        Large Bold Heading
      </BaseText>
      <BaseText size="subtitle" color="secondary" lineHeight="relaxed">
        Subtitle with relaxed line height and secondary color
      </BaseText>
      <BaseText size="body" color="primary" fontFamily="body">
        Regular body text with default styling for readable paragraph content
      </BaseText>
      <BaseText size="caption" color="tertiary" fontFamily="mono">
        Monospace caption for code snippets or technical details
      </BaseText>
    </Stack>
  ),
};

// =============================================================================
// INTERACTIVE PLAYGROUND
// =============================================================================

export const Interactive: Story = {
  args: {
    children: 'Customize me using the controls below!',
    size: 'body',
    weight: 'normal',
    color: 'primary',
    lineHeight: 'normal',
    align: 'left',
    fontFamily: 'body',
    truncate: false,
  },
};

// =============================================================================
// DARK BACKGROUND
// =============================================================================

export const OnDarkBackground: Story = {
  render: () => (
    <div style={{ background: '#1a1a1a', padding: '24px', borderRadius: '8px' }}>
      <Stack spacing="sm">
        <BaseText color="inverse" size="h4" variant="heading">
          Inverse color for dark backgrounds
        </BaseText>
        <BaseText color="inverse" size="body">
          This text uses inverse color tokens to maintain readability on dark surfaces.
        </BaseText>
        <BaseText color="inverse" size="caption" weight="medium">
          Perfect for cards, modals, and dark theme interfaces.
        </BaseText>
      </Stack>
    </div>
  ),
};
