import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/typography/Text';

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Heading component for page and section titles. The `as` prop controls the HTML element, while `level` controls visual styling independently.',
      },
    },
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

export const Default: Story = {
  args: {
    as: 'h2',
    children: 'Section Heading',
  },
};

export const AllLevels: Story = {
  render: () => (
    <Stack spacing="md">
      <Heading as="h1">Heading Level 1</Heading>
      <Heading as="h2">Heading Level 2</Heading>
      <Heading as="h3">Heading Level 3</Heading>
      <Heading as="h4">Heading Level 4</Heading>
      <Heading as="h5">Heading Level 5</Heading>
      <Heading as="h6">Heading Level 6</Heading>
    </Stack>
  ),
};

export const AllColors: Story = {
  render: () => (
    <Stack spacing="sm">
      <Heading as="h3" color="primary">Primary Heading</Heading>
      <Heading as="h3" color="secondary">Secondary Heading</Heading>
      <Heading as="h3" color="tertiary">Tertiary Heading</Heading>
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
        story: 'Use `as` for semantic HTML and `level` for visual styling. Useful when you need an h3 for accessibility but h1 styling.',
      },
    },
  },
};

export const Truncated: Story = {
  args: {
    as: 'h2',
    truncate: true,
    children: 'This is a very long heading that will be truncated with an ellipsis when it exceeds width',
  },
  decorators: [(Story) => <div style={{ maxWidth: '300px' }}><Story /></div>],
};

export const PageHierarchy: Story = {
  render: () => (
    <Stack spacing="lg" style={{ maxWidth: '600px' }}>
      <Heading as="h1" align="center">Welcome to Our Platform</Heading>
      <Text color="secondary" align="center">Build amazing applications with our component library</Text>
      
      <Stack spacing="sm">
        <Heading as="h2">Getting Started</Heading>
        <Text color="secondary">Learn the basics of our component library</Text>
      </Stack>
      
      <Stack spacing="sm">
        <Heading as="h3">Installation</Heading>
        <Text fontFamily="mono" size="small" color="secondary">npm install react-basics-ui</Text>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing proper heading hierarchy for page structure.',
      },
    },
  },
};
