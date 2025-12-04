import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';
import { Box } from '../Box';
import { VStack, HStack } from '../Stack';
import { Text } from '../../typography/Text';
import { Heading } from '../../typography/Heading';
import { Button } from '../../forms/Button';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CSS Grid layout component for creating two-dimensional layouts with rows and columns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    rows: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    gapX: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    gapY: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    flow: {
      control: 'select',
      options: ['row', 'col', 'dense', 'row-dense', 'col-dense'],
    },
    inline: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <Box maxW={900}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <Box
    p={12}
    bg="var(--semantic-brand-primary-default)"
    color="white"
    borderRadius={8}
    className="text-center font-semibold"
  >
    {children}
  </Box>
);

export const Default: Story = {
  args: {
    cols: 3,
    gap: 'md',
    children: (
      <>
        {Array.from({ length: 6 }, (_, i) => (
          <GridItem key={i}>{i + 1}</GridItem>
        ))}
      </>
    ),
  },
};

export const ColumnCounts: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Different column configurations from 2 to 6 columns.',
      },
    },
  },
  render: () => (
    <VStack spacing="xl">
      {([2, 3, 4, 6] as const).map((cols) => (
        <VStack key={cols} spacing="xs">
          <Text weight="semibold" size="small">cols={cols}</Text>
          <Grid cols={cols} gap="md">
            {Array.from({ length: cols * 2 }, (_, i) => (
              <GridItem key={i}>{i + 1}</GridItem>
            ))}
          </Grid>
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
          <Grid cols={3} gap={gap}>
            <GridItem>A</GridItem>
            <GridItem>B</GridItem>
            <GridItem>C</GridItem>
          </Grid>
        </VStack>
      ))}
    </VStack>
  ),
};

export const DifferentGapXY: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use gapX and gapY for different horizontal and vertical gaps.',
      },
    },
  },
  args: {
    cols: 3,
    gapX: 'lg',
    gapY: 'sm',
    children: (
      <>
        {Array.from({ length: 9 }, (_, i) => (
          <Box
            key={i}
            p={12}
            bg="var(--semantic-status-success-default)"
            color="white"
            borderRadius={8}
            className="text-center font-semibold"
          >
            Item {i + 1}
          </Box>
        ))}
      </>
    ),
  },
};

export const Alignment: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Control alignment with align (vertical) and justify (horizontal).',
      },
    },
  },
  render: () => (
    <VStack spacing="xl">
      {(['start', 'center', 'end'] as const).map((align) => (
        <VStack key={align} spacing="xs">
          <Text weight="semibold" size="small">align="{align}"</Text>
          <Grid cols={3} gap="md" align={align} style={{ minHeight: '120px' }}>
            <GridItem>Short</GridItem>
            <Box
              p={12}
              bg="var(--semantic-brand-primary-default)"
              color="white"
              borderRadius={8}
              className="text-center font-semibold"
            >
              Tall<br />Item
            </Box>
            <GridItem>Short</GridItem>
          </Grid>
        </VStack>
      ))}
    </VStack>
  ),
};

export const ProductGrid: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Real-world example: a product grid layout.',
      },
    },
  },
  render: () => (
    <Grid cols={4} gap="lg">
      {Array.from({ length: 8 }, (_, i) => (
        <Box
          key={i}
          bg="var(--semantic-surface-elevated)"
          borderRadius={12}
          borderWidth={1}
          borderColor="var(--semantic-border-default)"
          style={{ overflow: 'hidden' }}
        >
          <Box
            h={160}
            bg="var(--semantic-bg-secondary)"
            className="bg-gradient-to-br from-blue-400 to-purple-500"
          />
          <Box p={16}>
            <VStack spacing="sm">
              <Heading as="h4">Product {i + 1}</Heading>
              <Text color="secondary" size="small">Product description goes here</Text>
              <HStack justify="between" align="center">
                <Text weight="bold" size="large">${(i + 1) * 10}</Text>
                <Button size="small">Add</Button>
              </HStack>
            </VStack>
          </Box>
        </Box>
      ))}
    </Grid>
  ),
};

export const Dashboard: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Dashboard layout with spanning cells using CSS classes.',
      },
    },
  },
  render: () => (
    <Grid cols={4} gap="md">
      <Box
        className="col-span-2 row-span-2"
        p={24}
        bg="var(--semantic-status-info-default)"
        color="white"
        borderRadius={12}
      >
        <VStack spacing="sm">
          <Heading as="h3" color="inverse">Main Chart</Heading>
          <Text color="inverse">Large featured content</Text>
        </VStack>
      </Box>
      <Box
        className="col-span-2"
        p={24}
        bg="var(--semantic-status-success-default)"
        color="white"
        borderRadius={12}
      >
        <VStack spacing="sm">
          <Heading as="h4" color="inverse">Stats</Heading>
          <Text color="inverse">Statistics widget</Text>
        </VStack>
      </Box>
      <Box p={24} bg="var(--semantic-brand-primary-default)" color="white" borderRadius={12}>
        <VStack spacing="xs">
          <Text color="inverse" weight="semibold">Users</Text>
          <Text color="inverse" size="xlarge" weight="bold">1,234</Text>
        </VStack>
      </Box>
      <Box p={24} bg="var(--semantic-status-warning-default)" color="white" borderRadius={12}>
        <VStack spacing="xs">
          <Text color="inverse" weight="semibold">Revenue</Text>
          <Text color="inverse" size="xlarge" weight="bold">$56K</Text>
        </VStack>
      </Box>
      <Box
        className="col-span-2"
        p={24}
        bg="var(--semantic-status-error-default)"
        color="white"
        borderRadius={12}
      >
        <VStack spacing="sm">
          <Heading as="h4" color="inverse">Activity</Heading>
          <Text color="inverse">Recent activity feed</Text>
        </VStack>
      </Box>
      <Box
        className="col-span-2"
        p={24}
        bg="var(--semantic-bg-secondary)"
        borderRadius={12}
        borderWidth={1}
        borderColor="var(--semantic-border-default)"
      >
        <VStack spacing="sm">
          <Heading as="h4">Tasks</Heading>
          <Text color="secondary">Task list widget</Text>
        </VStack>
      </Box>
    </Grid>
  ),
};
