import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['span', 'p', 'label', 'div', 'strong', 'em', 'small'],
    },
    size: {
      control: 'select',
      options: ['caption', 'small', 'body', 'subtitle'],
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
type Story = StoryObj<typeof Text>;

// =============================================================================
// Default - Playground
// =============================================================================

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    size: 'body',
    weight: 'normal',
    color: 'primary',
  },
};

// =============================================================================
// Variants
// =============================================================================

export const Sizes: Story = {
  render: () => (
    <Stack spacing="sm">
      <Text size="caption" color="secondary">Caption – Helper text, fine print</Text>
      <Text size="small">Small – Labels, secondary content</Text>
      <Text size="body">Body – Default paragraph text</Text>
      <Text size="subtitle">Subtitle – Emphasized, lead text</Text>
    </Stack>
  ),
};

export const Weights: Story = {
  render: () => (
    <Stack spacing="sm">
      <Text weight="light">Light – Delicate emphasis</Text>
      <Text weight="normal">Normal – Default reading weight</Text>
      <Text weight="medium">Medium – Slight emphasis</Text>
      <Text weight="semibold">Semibold – Strong emphasis</Text>
      <Text weight="bold">Bold – Maximum emphasis</Text>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack spacing="xs">
      <Text color="primary">Primary – Main content</Text>
      <Text color="secondary">Secondary – Supporting content</Text>
      <Text color="tertiary">Tertiary – Subtle hints</Text>
      <Text color="link">Link – Clickable text</Text>
      <Text color="success">Success – Positive feedback</Text>
      <Text color="warning">Warning – Caution needed</Text>
      <Text color="error">Error – Problem occurred</Text>
      <Text color="disabled">Disabled – Inactive state</Text>
    </Stack>
  ),
};

// =============================================================================
// Use Case: Article Content
// =============================================================================

export const ArticleContent: Story = {
  render: () => (
    <Stack spacing="md" style={{ maxWidth: '600px' }}>
      <Text size="subtitle" weight="medium">
        Building Accessible React Components
      </Text>
      <Text color="secondary" size="small">
        Published on December 14, 2024 · 5 min read
      </Text>
      <Text as="p">
        Creating accessible components is essential for building inclusive web applications. 
        This guide covers the key principles of accessible design and how to implement them 
        in your React component library.
      </Text>
      <Text as="p">
        When designing components, consider users who rely on screen readers, keyboard 
        navigation, or other assistive technologies. Small details like proper labeling, 
        focus management, and semantic HTML make a significant difference.
      </Text>
      <Text size="small" color="secondary">
        Tags: <Text as="span" color="link">accessibility</Text>, <Text as="span" color="link">react</Text>, <Text as="span" color="link">components</Text>
      </Text>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of Text component used in article/blog content with mixed sizes and colors.',
      },
    },
  },
};

// =============================================================================
// Features
// =============================================================================

export const Monospace: Story = {
  args: {
    fontFamily: 'mono',
    size: 'small',
    color: 'secondary',
    children: 'const greeting = "Hello, World!";',
  },
};

export const Truncated: Story = {
  args: {
    truncate: true,
    children: 'This is a very long text that will be truncated with an ellipsis when it overflows its container',
  },
  decorators: [(Story) => <div style={{ width: '250px' }}><Story /></div>],
};
