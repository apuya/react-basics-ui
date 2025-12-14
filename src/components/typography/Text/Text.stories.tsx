import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';
import { Stack } from '@/components/layout/Stack';

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Text component for body text and inline elements. Supports sizes, weights, colors, alignments, and semantic HTML elements.',
      },
    },
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
      options: ['light', 'regular', 'medium', 'semibold', 'bold'],
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

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
};

export const AllSizes: Story = {
  render: () => (
    <Stack spacing="sm">
      <Text size="caption">Caption - The quick brown fox</Text>
      <Text size="small">Small - The quick brown fox</Text>
      <Text size="body">Body - The quick brown fox</Text>
      <Text size="subtitle">Subtitle - The quick brown fox</Text>
    </Stack>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <Stack spacing="sm">
      <Text weight="light" size="subtitle">Light weight</Text>
      <Text weight="regular" size="subtitle">Regular weight</Text>
      <Text weight="medium" size="subtitle">Medium weight</Text>
      <Text weight="semibold" size="subtitle">Semibold weight</Text>
      <Text weight="bold" size="subtitle">Bold weight</Text>
    </Stack>
  ),
};

export const AllColors: Story = {
  render: () => (
    <Stack spacing="sm">
      <Text color="primary">Primary color</Text>
      <Text color="secondary">Secondary color</Text>
      <Text color="tertiary">Tertiary color</Text>
      <Text color="link">Link color</Text>
      <Text color="error">Error color</Text>
      <Text color="warning">Warning color</Text>
      <Text color="success">Success color</Text>
      <Text color="disabled">Disabled color</Text>
    </Stack>
  ),
};

export const Monospace: Story = {
  args: {
    fontFamily: 'mono',
    size: 'small',
    color: 'secondary',
    children: 'npm install react-basics-ui',
  },
};

export const Truncated: Story = {
  args: {
    truncate: true,
    children: 'This is a very long text that will be truncated with an ellipsis when it overflows',
  },
  decorators: [(Story) => <div style={{ width: '200px' }}><Story /></div>],
};

export const SemanticElements: Story = {
  render: () => (
    <Stack spacing="sm">
      <Text as="p">Paragraph element</Text>
      <Text as="strong" weight="bold">Strong element</Text>
      <Text as="em">Emphasis element</Text>
      <Text as="small" size="small">Small element</Text>
    </Stack>
  ),
};
