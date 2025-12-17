import type { Meta, StoryObj } from '@storybook/react';
import { HStack, Stack, VStack } from './Stack';
import { Box } from '@/components/layout/Box';
import { Divider } from '@/components/layout/Divider';
import { Text } from '@/components/typography/Text';
import { Button } from '@/components/actions/Button';
import { Input } from '@/components/forms/Input';
import { Badge } from '@/components/data-display/Badge';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Flexbox layout component for stacking elements with consistent spacing. Includes `HStack` (horizontal) and `VStack` (vertical) shortcuts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Stack direction',
      table: { defaultValue: { summary: 'vertical' } },
    },
    spacing: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Gap between items',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Cross-axis alignment (align-items)',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Main-axis alignment (justify-content)',
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Flex wrap behavior',
    },
    inline: {
      control: 'boolean',
      description: 'Use inline-flex instead of flex',
      table: { defaultValue: { summary: 'false' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  args: {
    spacing: 'md',
    children: (
      <>
        <Badge color="info">Item 1</Badge>
        <Badge color="info">Item 2</Badge>
        <Badge color="info">Item 3</Badge>
      </>
    ),
  },
};

export const Directions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Stack can be `vertical` (default) or `horizontal`. Use `VStack` and `HStack` shortcuts.',
      },
    },
  },
  render: () => (
    <VStack spacing="xl">
      <VStack spacing="sm">
        <Text weight="semibold" size="small">VStack (vertical)</Text>
        <VStack spacing="sm">
          <Badge color="secondary">First</Badge>
          <Badge color="secondary">Second</Badge>
          <Badge color="secondary">Third</Badge>
        </VStack>
      </VStack>
      <VStack spacing="sm">
        <Text weight="semibold" size="small">HStack (horizontal)</Text>
        <HStack spacing="sm">
          <Badge color="warning">First</Badge>
          <Badge color="warning">Second</Badge>
          <Badge color="warning">Third</Badge>
        </HStack>
      </VStack>
    </VStack>
  ),
};

export const SpacingSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Preset spacing sizes: `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`.',
      },
    },
  },
  render: () => (
    <VStack spacing="lg">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <VStack key={size} spacing="xs">
          <Text weight="semibold" size="small">spacing="{size}"</Text>
          <HStack spacing={size}>
            <Badge color="info">A</Badge>
            <Badge color="info">B</Badge>
            <Badge color="info">C</Badge>
          </HStack>
        </VStack>
      ))}
    </VStack>
  ),
};

export const Alignment: Story = {
  parameters: {
    docs: {
      description: {
        story: '`align` controls cross-axis alignment. `justify` controls main-axis distribution.',
      },
    },
  },
  render: () => (
    <VStack spacing="xl">
      <VStack spacing="xs">
        <Text weight="semibold" size="small">align="center"</Text>
        <VStack spacing="sm" align="center">
          <Badge>Short</Badge>
          <Badge>Medium length</Badge>
          <Badge>Very long item here</Badge>
        </VStack>
      </VStack>
      <VStack spacing="xs">
        <Text weight="semibold" size="small">justify="between"</Text>
        <Box
          borderWidth={1}
          borderColor="var(--semantic-border-default)"
          borderRadius={4}
          p={8}
        >
          <HStack justify="between">
            <Badge color="success">Left</Badge>
            <Badge color="success">Center</Badge>
            <Badge color="success">Right</Badge>
          </HStack>
        </Box>
      </VStack>
      <VStack spacing="xs">
        <Text weight="semibold" size="small">justify="evenly"</Text>
        <Box
          borderWidth={1}
          borderColor="var(--semantic-border-default)"
          borderRadius={4}
          p={8}
        >
          <HStack justify="evenly">
            <Badge color="secondary">A</Badge>
            <Badge color="secondary">B</Badge>
            <Badge color="secondary">C</Badge>
          </HStack>
        </Box>
      </VStack>
    </VStack>
  ),
};

export const WithDivider: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Insert a divider element between all children.',
      },
    },
  },
  render: () => (
    <VStack spacing="xl">
      <VStack spacing="xs">
        <Text weight="semibold" size="small">Vertical with Divider</Text>
        <VStack divider={<Divider spacing="none" />}>
          <Box py={8}><Text>Section 1</Text></Box>
          <Box py={8}><Text>Section 2</Text></Box>
          <Box py={8}><Text>Section 3</Text></Box>
        </VStack>
      </VStack>
      <VStack spacing="xs">
        <Text weight="semibold" size="small">Horizontal with vertical Divider</Text>
        <HStack align="center" divider={<Divider orientation="vertical" spacing="none" className="h-6" />}>
          <Badge color="error">Item 1</Badge>
          <Badge color="error">Item 2</Badge>
          <Badge color="error">Item 3</Badge>
        </HStack>
      </VStack>
    </VStack>
  ),
};

export const WrapBehavior: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use `wrap="wrap"` to allow items to flow to the next line.',
      },
    },
  },
  render: () => (
    <Box maxW={400}>
      <HStack spacing="sm" wrap="wrap">
        {Array.from({ length: 12 }, (_, i) => (
          <Badge key={i} color="info">
            Item {i + 1}
          </Badge>
        ))}
      </HStack>
    </Box>
  ),
};

export const FormLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common use case: stacking form fields with consistent spacing.',
      },
    },
  },
  render: () => (
    <Box maxW={320}>
      <VStack spacing="md">
        <Input label="Name" placeholder="Your name" />
        <Input label="Email" type="email" placeholder="you@example.com" />
        <HStack spacing="sm" justify="end" className="w-full">
          <Button variant="secondary">Cancel</Button>
          <Button>Submit</Button>
        </HStack>
      </VStack>
    </Box>
  ),
};
