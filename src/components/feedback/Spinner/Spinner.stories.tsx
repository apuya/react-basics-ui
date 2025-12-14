import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { Stack } from '@/components/layout/Stack';
import { Flex } from '@/components/layout/Flex';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/typography/Text';
import { Button } from '@/components/actions/Button';
import { Card } from '@/components/data-display/Card';

const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A loading spinner component that provides visual feedback during asynchronous operations. Supports multiple sizes and color variants with proper accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the spinner',
      table: { defaultValue: { summary: 'md' } },
    },
    color: {
      control: 'select',
      options: ['default', 'inverse', 'inherit'],
      description: 'Color variant of the spinner',
      table: { defaultValue: { summary: 'default' } },
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
      table: { defaultValue: { summary: 'Loading...' } },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <Flex align="center" gap="lg">
      <Stack align="center" gap="xs">
        <Spinner size="xs" />
        <Text size="caption" color="secondary">xs</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Spinner size="sm" />
        <Text size="caption" color="secondary">sm</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Spinner size="md" />
        <Text size="caption" color="secondary">md</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Spinner size="lg" />
        <Text size="caption" color="secondary">lg</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Spinner size="xl" />
        <Text size="caption" color="secondary">xl</Text>
      </Stack>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available spinner sizes.',
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <Flex align="center" gap="xl">
      <Stack align="center" gap="xs">
        <Box p="md">
          <Spinner color="default" />
        </Box>
        <Text size="caption" color="secondary">Default</Text>
      </Stack>
      <Stack align="center" gap="xs">
        <Box p="md" className="bg-gray-900 rounded-lg">
          <Spinner color="inverse" />
        </Box>
        <Text size="caption" color="secondary">Inverse</Text>
      </Stack>
      <Stack align="center" gap="xs" className="text-purple-600">
        <Box p="md">
          <Spinner color="inherit" />
        </Box>
        <Text size="caption">Inherit</Text>
      </Stack>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Color variants: default for light backgrounds, inverse for dark backgrounds, inherit for custom colors.',
      },
    },
  },
};

export const InButton: Story = {
  render: () => (
    <Flex gap="md">
      <Button variant="primary" isLoading disabled>
        Saving...
      </Button>
      <Button variant="secondary" isLoading disabled>
        Loading...
      </Button>
      <Button variant="ghost" isLoading disabled>
        Processing...
      </Button>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons have built-in loading state with spinner. Use the `isLoading` prop.',
      },
    },
  },
};

export const InlineWithText: Story = {
  render: () => (
    <Flex align="center" gap="xs">
      <Spinner size="xs" />
      <Text color="secondary">Loading your data...</Text>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Extra small spinner used inline with text.',
      },
    },
  },
};

export const ContentLoading: Story = {
  render: () => (
    <Card variant="outlined" className="w-72">
      <Card.Content>
        <Stack align="center" gap="sm">
          <Spinner size="lg" />
          <Text size="small" color="secondary">Loading content...</Text>
        </Stack>
      </Card.Content>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner used for content area loading state within a Card.',
      },
    },
  },
};

export const FullPageOverlay: Story = {
  render: () => (
    <Box className="relative w-[400px] h-[300px] bg-gray-100 rounded-lg overflow-hidden">
      <Flex align="center" justify="center" className="absolute inset-0 bg-black/50">
        <Card variant="elevated">
          <Card.Content>
            <Stack align="center" gap="sm">
              <Spinner size="xl" />
              <Text weight="medium">Please wait...</Text>
            </Stack>
          </Card.Content>
        </Card>
      </Flex>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full-page loading overlay pattern (shown in a container for demo).',
      },
    },
  },
};
