import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/typography/Text';

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    level: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'inverse', 'inherit'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    fontFamily: {
      control: 'select',
      options: ['heading', 'body', 'mono'],
    },
    truncate: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

// =============================================================================
// Default - Playground
// =============================================================================

export const Default: Story = {
  args: {
    as: 'h2',
    children: 'Section Heading',
    color: 'primary',
  },
};

// =============================================================================
// Variants
// =============================================================================

export const Levels: Story = {
  render: () => (
    <Stack spacing="md">
      <Heading as="h1">Heading 1 – Page Title</Heading>
      <Heading as="h2">Heading 2 – Section</Heading>
      <Heading as="h3">Heading 3 – Subsection</Heading>
      <Heading as="h4">Heading 4 – Group</Heading>
      <Heading as="h5">Heading 5 – Detail</Heading>
      <Heading as="h6">Heading 6 – Minor</Heading>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack spacing="sm">
      <Heading as="h3" color="primary">Primary – Main headings</Heading>
      <Heading as="h3" color="secondary">Secondary – Supporting sections</Heading>
      <Heading as="h3" color="tertiary">Tertiary – Subtle headers</Heading>
    </Stack>
  ),
};

export const SemanticVsVisual: Story = {
  args: {
    as: 'h3',
    level: 'h1',
    children: 'Visually H1, Semantically H3',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use `as` for semantic HTML and `level` for visual styling. Useful when you need proper document outline but different visual weight.',
      },
    },
  },
};

// =============================================================================
// Use Case: Landing Page Hero
// =============================================================================

export const LandingPageHero: Story = {
  render: () => (
    <Stack spacing="lg" style={{ maxWidth: '700px', textAlign: 'center' }}>
      <Heading as="h1" align="center">
        Build Beautiful UIs Faster
      </Heading>
      <Text size="subtitle" color="secondary" align="center">
        A comprehensive React component library with accessibility, theming, 
        and developer experience at its core.
      </Text>
      <Stack spacing="md">
        <Heading as="h2" level="h4" color="secondary" align="center">
          Trusted by teams at leading companies
        </Heading>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of heading hierarchy in a landing page hero section.',
      },
    },
  },
};

// =============================================================================
// Features
// =============================================================================

export const Truncated: Story = {
  args: {
    as: 'h2',
    truncate: true,
    children: 'This is a very long heading that will be truncated with an ellipsis when it exceeds the container width',
  },
  decorators: [(Story) => <div style={{ maxWidth: '300px' }}><Story /></div>],
};
