import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';
import { VStack, HStack } from '../Stack';
import { Text } from '../../typography/Text';
import { Heading } from '../../typography/Heading';
import { Button } from '../../forms/Button';

const meta: Meta<typeof Box> = {
  title: 'Layout/Box',
  component: Box,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A polymorphic primitive component that serves as a building block for layouts. Provides convenient props for spacing, sizing, colors, and common CSS properties.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'text',
      description: 'The HTML element to render as',
    },
    p: {
      control: 'text',
      description: 'Padding (all sides)',
    },
    m: {
      control: 'text',
      description: 'Margin (all sides)',
    },
    bg: {
      control: 'color',
      description: 'Background color',
    },
    color: {
      control: 'color',
      description: 'Text color',
    },
    borderRadius: {
      control: 'text',
      description: 'Border radius',
    },
    display: {
      control: 'select',
      options: ['block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid', 'none'],
      description: 'Display property',
    },
    position: {
      control: 'select',
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      description: 'Position property',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic Box with padding.',
      },
    },
  },
  args: {
    children: 'Default Box',
    p: 16,
  },
};

export const Padding: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box supports uniform padding (p) or directional padding (pt, pr, pb, pl, px, py).',
      },
    },
  },
  render: () => (
    <VStack spacing="lg">
      <VStack spacing="xs">
        <Text weight="semibold" size="small">p={24} (all sides)</Text>
        <Box p={24} bg="var(--semantic-bg-secondary)" borderRadius={8}>
          <Text>Uniform padding</Text>
        </Box>
      </VStack>
      <VStack spacing="xs">
        <Text weight="semibold" size="small">px={32} py={16} (horizontal/vertical)</Text>
        <Box px={32} py={16} bg="var(--semantic-bg-secondary)" borderRadius={8}>
          <Text>Horizontal and vertical padding</Text>
        </Box>
      </VStack>
      <VStack spacing="xs">
        <Text weight="semibold" size="small">pt={8} pr={24} pb={16} pl={32} (directional)</Text>
        <Box pt={8} pr={24} pb={16} pl={32} bg="var(--semantic-bg-secondary)" borderRadius={8}>
          <Text>Directional padding</Text>
        </Box>
      </VStack>
    </VStack>
  ),
};

export const Margin: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box supports margin props (m, mt, mr, mb, ml, mx, my).',
      },
    },
  },
  render: () => (
    <Box borderWidth={2} borderColor="var(--semantic-border-default)" borderRadius={8} p={8}>
      <Box m={16} p={16} bg="var(--semantic-bg-secondary)" borderRadius={8}>
        <Text>Box with m={16}</Text>
      </Box>
    </Box>
  ),
};

export const Background: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box with background color and text color.',
      },
    },
  },
  render: () => (
    <HStack spacing="md">
      <Box p={16} bg="var(--semantic-brand-primary-default)" color="white" borderRadius={8}>
        <Text>Primary</Text>
      </Box>
      <Box p={16} bg="var(--semantic-status-success-default)" color="white" borderRadius={8}>
        <Text>Success</Text>
      </Box>
      <Box p={16} bg="var(--semantic-status-warning-default)" color="white" borderRadius={8}>
        <Text>Warning</Text>
      </Box>
      <Box p={16} bg="var(--semantic-status-error-default)" color="white" borderRadius={8}>
        <Text>Error</Text>
      </Box>
    </HStack>
  ),
};

export const Border: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box with border and border radius.',
      },
    },
  },
  render: () => (
    <HStack spacing="md">
      <Box p={16} borderWidth={1} borderColor="var(--semantic-border-default)" borderRadius={4}>
        <Text>Subtle border</Text>
      </Box>
      <Box p={16} borderWidth={2} borderColor="var(--semantic-brand-primary-default)" borderRadius={8}>
        <Text>Primary border</Text>
      </Box>
      <Box p={16} borderWidth={2} borderColor="var(--semantic-status-error-default)" borderRadius={12}>
        <Text>Error border</Text>
      </Box>
    </HStack>
  ),
};

export const Sizing: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box supports explicit sizing (w, h) and constraints (minW, maxW, minH, maxH).',
      },
    },
  },
  render: () => (
    <VStack spacing="lg">
      <VStack spacing="xs">
        <Text weight="semibold" size="small">Fixed size (w={200} h={100})</Text>
        <Box
          w={200}
          h={100}
          p={16}
          bg="var(--semantic-bg-secondary)"
          borderRadius={8}
          display="flex"
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>200×100</Text>
        </Box>
      </VStack>
      <VStack spacing="xs">
        <Text weight="semibold" size="small">Constrained (minW={200} maxW={400})</Text>
        <Box minW={200} maxW={400} p={16} bg="var(--semantic-bg-secondary)" borderRadius={8}>
          <Text>This box has min-width of 200px and max-width of 400px</Text>
        </Box>
      </VStack>
    </VStack>
  ),
};

export const PolymorphicAs: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box can render as different HTML elements using the `as` prop.',
      },
    },
  },
  render: () => (
    <VStack spacing="md">
      <Box as="section" p={16} bg="var(--semantic-bg-secondary)" borderRadius={8}>
        <Text>Rendered as &lt;section&gt;</Text>
      </Box>
      <Box as="article" p={16} bg="var(--semantic-bg-secondary)" borderRadius={8}>
        <Text>Rendered as &lt;article&gt;</Text>
      </Box>
      <Box as="aside" p={16} bg="var(--semantic-bg-secondary)" borderRadius={8}>
        <Text>Rendered as &lt;aside&gt;</Text>
      </Box>
    </VStack>
  ),
};

export const FlexContainer: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box used as a flex container with display="flex".',
      },
    },
  },
  render: () => (
    <Box display="flex" p={16} bg="var(--semantic-bg-secondary)" borderRadius={8} style={{ gap: '8px' }}>
      <Box p={12} bg="var(--semantic-brand-primary-default)" color="white" borderRadius={4}>
        <Text>Item 1</Text>
      </Box>
      <Box p={12} bg="var(--semantic-brand-primary-default)" color="white" borderRadius={4}>
        <Text>Item 2</Text>
      </Box>
      <Box p={12} bg="var(--semantic-brand-primary-default)" color="white" borderRadius={4}>
        <Text>Item 3</Text>
      </Box>
    </Box>
  ),
};

export const CardExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Box component used to create a card-like layout.',
      },
    },
  },
  render: () => (
    <Box
      w={320}
      p={24}
      bg="var(--semantic-surface-elevated)"
      borderWidth={1}
      borderColor="var(--semantic-border-default)"
      borderRadius={12}
      style={{ boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}
    >
      <VStack spacing="md">
        <Heading as="h3">Card Title</Heading>
        <Text color="secondary">
          This is a card built using the Box component with various styling props.
        </Text>
        <HStack spacing="sm">
          <Button>Action</Button>
          <Button variant="secondary">Cancel</Button>
        </HStack>
      </VStack>
    </Box>
  ),
};

export const NestedBoxes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Nested Box components for complex layouts.',
      },
    },
  },
  render: () => (
    <Box p={24} bg="var(--semantic-bg-secondary)" borderRadius={12}>
      <VStack spacing="md">
        <Box p={16} bg="var(--semantic-status-info-alpha)" borderRadius={8}>
          <VStack spacing="xs">
            <Heading as="h4">Header</Heading>
            <Text color="secondary">This is the header section</Text>
          </VStack>
        </Box>
        <Box p={16} bg="var(--semantic-status-warning-alpha)" borderRadius={8}>
          <VStack spacing="xs">
            <Heading as="h4">Content</Heading>
            <Text color="secondary">This is the main content section</Text>
          </VStack>
        </Box>
        <Box p={16} bg="var(--semantic-status-success-alpha)" borderRadius={8}>
          <VStack spacing="xs">
            <Heading as="h4">Footer</Heading>
            <Text color="secondary">This is the footer section</Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  ),
};
