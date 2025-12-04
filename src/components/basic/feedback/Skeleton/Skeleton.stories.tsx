import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { Stack } from '../../layout/Stack';
import { Flex } from '../../layout/Flex';
import { Box } from '../../layout/Box';
import { Grid } from '../../layout/Grid';
import { Text } from '../../typography/Text';
import { Card } from '../../data-display/Card';
import { Divider } from '../../layout/Divider';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A skeleton loading placeholder component that displays during content loading states. Supports multiple shapes, animations, and flexible sizing.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['rectangle', 'rounded', 'circle', 'text'],
      description: 'The visual variant of the skeleton',
      table: { defaultValue: { summary: 'rectangle' } },
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none', false],
      description: 'The animation type',
      table: { defaultValue: { summary: 'pulse' } },
    },
    width: {
      control: 'text',
      description: 'Width of the skeleton (CSS units or number for px)',
    },
    height: {
      control: 'text',
      description: 'Height of the skeleton (CSS units or number for px)',
    },
    count: {
      control: 'number',
      description: 'Number of lines (only for text variant)',
      table: { defaultValue: { summary: '1' } },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 200,
    height: 100,
  },
};

export const Variants: Story = {
  render: () => (
    <Flex align="start" gap="xl">
      <Stack align="center" gap="xs">
        <Skeleton variant="rectangle" width={100} height={80} />
        <Text size="caption" color="secondary">Rectangle</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Skeleton variant="rounded" width={100} height={80} />
        <Text size="caption" color="secondary">Rounded</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Skeleton variant="circle" width={80} height={80} />
        <Text size="caption" color="secondary">Circle</Text>
      </Stack>
      <Stack gap="xs" style={{ width: 128 }}>
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
        <Text size="caption" color="secondary">Text</Text>
      </Stack>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available skeleton variants: rectangle, rounded, circle, and text.',
      },
    },
  },
};

export const Animations: Story = {
  render: () => (
    <Flex gap="xl">
      <Stack align="center" gap="xs">
        <Skeleton animation="pulse" width={120} height={80} variant="rounded" />
        <Text size="caption" color="secondary">Pulse</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Skeleton animation="wave" width={120} height={80} variant="rounded" />
        <Text size="caption" color="secondary">Wave</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Skeleton animation={false} width={120} height={80} variant="rounded" />
        <Text size="caption" color="secondary">None</Text>
      </Stack>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animation styles: pulse (default), wave shimmer, or disabled.',
      },
    },
  },
};

export const TextLines: Story = {
  render: () => (
    <Box style={{ width: 320 }}>
      <Skeleton variant="text" count={4} />
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use `count` prop for multiple text lines. Last line is automatically 80% width.',
      },
    },
  },
};

export const CommonPatterns: Story = {
  render: () => (
    <Flex gap="xl" align="start" style={{ flexWrap: 'wrap' }}>
      {/* Card Pattern */}
      <Stack gap="xs">
        <Text size="caption" color="secondary" weight="medium">Card</Text>
        <Card variant="outlined" style={{ width: 240 }}>
          <Skeleton variant="rounded" width="100%" height={120} />
          <Card.Content>
            <Stack gap="xs">
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="text" width="80%" />
            </Stack>
          </Card.Content>
        </Card>
      </Stack>

      {/* List Pattern */}
      <Stack gap="xs">
        <Text size="caption" color="secondary" weight="medium">List</Text>
        <Stack gap="sm" style={{ width: 280 }}>
          {[1, 2, 3].map((i) => (
            <Flex key={i} align="center" gap="sm">
              <Skeleton variant="circle" width={40} height={40} />
              <Stack gap="xs" style={{ flex: 1 }}>
                <Skeleton variant="text" width="50%" />
                <Skeleton variant="text" width="80%" />
              </Stack>
            </Flex>
          ))}
        </Stack>
      </Stack>

      {/* Grid Pattern */}
      <Stack gap="xs">
        <Text size="caption" color="secondary" weight="medium">Grid</Text>
        <Grid columns={2} gap="sm" style={{ width: 200 }}>
          {[1, 2, 3, 4].map((i) => (
            <Stack key={i} gap="xs">
              <Skeleton variant="rounded" width="100%" height={60} />
              <Skeleton variant="text" />
            </Stack>
          ))}
        </Grid>
      </Stack>

      {/* Table Pattern */}
      <Stack gap="xs">
        <Text size="caption" color="secondary" weight="medium">Table</Text>
        <Stack gap="xs" style={{ width: 320 }}>
          <Flex gap="sm">
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="30%" />
          </Flex>
          <Divider />
          {[1, 2, 3].map((i) => (
            <Flex key={i} gap="sm" align="center">
              <Skeleton variant="circle" width={24} height={24} />
              <Skeleton variant="text" width="25%" />
              <Skeleton variant="text" width="35%" />
              <Skeleton variant="rounded" width={60} height={24} />
            </Flex>
          ))}
        </Stack>
      </Stack>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common skeleton patterns: cards, lists, grids, and tables.',
      },
    },
  },
};
