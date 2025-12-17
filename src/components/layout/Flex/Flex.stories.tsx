import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';
import { Box } from '@/components/layout/Box';
import { VStack, HStack } from '@/components/layout/Stack';
import { Text } from '@/components/typography/Text';
import { Heading } from '@/components/typography/Heading';
import { Button } from '@/components/actions/Button';
import { Badge } from '@/components/data-display/Badge';

const meta: Meta<typeof Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Flexible layout component using CSS Flexbox. Provides control over direction, alignment, justification, and spacing.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
    },
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    inline: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <Box w={600}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const FlexItem = ({ children }: { children: React.ReactNode }) => (
  <Box p={8} px={16} bg="var(--semantic-brand-primary-default)" color="white" borderRadius={4}>
    <Text color="inverse">{children}</Text>
  </Box>
);

export const Default: Story = {
  args: {
    gap: 'md',
    children: (
      <>
        <FlexItem>Item 1</FlexItem>
        <FlexItem>Item 2</FlexItem>
        <FlexItem>Item 3</FlexItem>
      </>
    ),
  },
};

export const Directions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Flex direction: row (default), row-reverse, column, column-reverse.',
      },
    },
  },
  render: () => (
    <VStack spacing="xl">
      {(['row', 'row-reverse', 'column', 'column-reverse'] as const).map((direction) => (
        <VStack key={direction} spacing="xs">
          <Text weight="semibold" size="small">direction="{direction}"</Text>
          <Flex direction={direction} gap="sm">
            <Badge color="info">First</Badge>
            <Badge color="info">Second</Badge>
            <Badge color="info">Third</Badge>
          </Flex>
        </VStack>
      ))}
    </VStack>
  ),
};

export const Alignment: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Cross-axis alignment: start, center, end, stretch, baseline.',
      },
    },
  },
  render: () => (
    <VStack spacing="xl">
      {(['start', 'center', 'end', 'stretch'] as const).map((align) => (
        <VStack key={align} spacing="xs">
          <Text weight="semibold" size="small">align="{align}"</Text>
          <Flex
            align={align}
            gap="md"
            style={{ height: '100px' }}
            className="border border-dashed border-[color:var(--semantic-border-default)] rounded-lg p-2"
          >
            <Badge>Short</Badge>
            <Box p={8} bg="var(--semantic-brand-primary-default)" borderRadius={4}>
              <Text color="inverse">Tall<br/>Item</Text>
            </Box>
            <Badge>Short</Badge>
          </Flex>
        </VStack>
      ))}
    </VStack>
  ),
};

export const Justification: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Main-axis justification: start, center, end, between, around, evenly.',
      },
    },
  },
  render: () => (
    <VStack spacing="xl">
      {(['start', 'center', 'end', 'between', 'around', 'evenly'] as const).map((justify) => (
        <VStack key={justify} spacing="xs">
          <Text weight="semibold" size="small">justify="{justify}"</Text>
          <Box
            borderWidth={1}
            borderColor="var(--semantic-border-default)"
            borderRadius={8}
            p={8}
          >
            <Flex justify={justify}>
              <Badge color="secondary">1</Badge>
              <Badge color="secondary">2</Badge>
              <Badge color="secondary">3</Badge>
            </Flex>
          </Box>
        </VStack>
      ))}
    </VStack>
  ),
};

export const GapSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different gap sizes: xs, sm, md, lg, xl.',
      },
    },
  },
  render: () => (
    <VStack spacing="xl">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
        <VStack key={gap} spacing="xs">
          <Text weight="semibold" size="small">gap="{gap}"</Text>
          <Flex gap={gap}>
            <Badge color="info">A</Badge>
            <Badge color="info">B</Badge>
            <Badge color="info">C</Badge>
          </Flex>
        </VStack>
      ))}
    </VStack>
  ),
};

export const Wrap: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use wrap="wrap" to allow items to flow to the next line.',
      },
    },
  },
  render: () => (
    <Flex wrap="wrap" gap="md">
      {Array.from({ length: 10 }, (_, i) => (
        <Badge key={i} color="info">Item {i + 1}</Badge>
      ))}
    </Flex>
  ),
};

export const CenteredLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Center content both horizontally and vertically.',
      },
    },
  },
  render: () => (
    <Flex
      justify="center"
      align="center"
      style={{ height: '200px' }}
      className="border-2 border-dashed border-[color:var(--semantic-border-default)] rounded-lg"
    >
      <Box p={16} bg="var(--semantic-status-success-default)" borderRadius={8}>
        <Text color="inverse" weight="semibold">Perfectly Centered</Text>
      </Box>
    </Flex>
  ),
};

export const Navigation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: navigation bar layout.',
      },
    },
  },
  render: () => (
    <Flex
      justify="between"
      align="center"
      className="bg-[color:var(--semantic-surface-elevated)] p-4 rounded-lg"
    >
      <Heading as="h4">Logo</Heading>
      <HStack spacing="lg">
        <Text color="secondary">Home</Text>
        <Text color="secondary">About</Text>
        <Text color="secondary">Services</Text>
        <Text color="secondary">Contact</Text>
      </HStack>
      <Button>Sign In</Button>
    </Flex>
  ),
};

export const Card: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: card with flex layout.',
      },
    },
  },
  render: () => (
    <Flex
      direction="column"
      gap="md"
      className="p-6 bg-[color:var(--semantic-surface-elevated)] rounded-lg shadow-lg max-w-md"
    >
      <Flex justify="between" align="center">
        <Heading as="h3">Card Title</Heading>
        <Badge color="info">Badge</Badge>
      </Flex>
      <Text color="secondary">
        This is a responsive card layout built with the Flex component. It demonstrates how to
        combine different flex properties.
      </Text>
      <Flex gap="sm" justify="end">
        <Button variant="secondary">Cancel</Button>
        <Button>Confirm</Button>
      </Flex>
    </Flex>
  ),
};
