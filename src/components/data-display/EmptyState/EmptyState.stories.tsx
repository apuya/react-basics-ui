import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { BiBox, BiSearchAlt, BiFolder, BiCart, BiCloudUpload } from 'react-icons/bi';
import { Button } from '@/components/actions/Button';
import { Flex } from '@/components/layout/Flex';
import { Stack } from '@/components/layout/Stack';
import { Box } from '@/components/layout/Box';
import { Text } from '@/components/typography/Text';
import { Card } from '@/components/data-display/Card';

const meta = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'EmptyState component for displaying placeholder content when there is no data. Supports icons, titles, descriptions, and action buttons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
    icon: {
      control: false,
      description: 'Icon element to display',
    },
    action: {
      control: false,
      description: 'Action element (button, link)',
    },
    iconSize: {
      control: 'number',
      description: 'Icon size in pixels',
      table: { defaultValue: { summary: '48' } },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;
type StoryWithRender = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: <BiBox />,
    title: 'No items found',
    description: 'Get started by creating your first item.',
  },
  decorators: [
    (Story) => (
      <Box className="w-96">
        <Story />
      </Box>
    ),
  ],
};

export const WithAction: Story = {
  args: {
    icon: <BiFolder />,
    title: 'No projects yet',
    description: "You haven't created any projects. Start by creating your first project.",
    action: <Button variant="primary">Create Project</Button>,
  },
  decorators: [
    (Story) => (
      <Box className="w-96">
        <Story />
      </Box>
    ),
  ],
};

export const SearchNoResults: Story = {
  args: {
    icon: <BiSearchAlt />,
    title: 'No results found',
    description: 'Try adjusting your search terms or filters.',
  },
  decorators: [
    (Story) => (
      <Box className="w-96">
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Empty state for search with no matching results.',
      },
    },
  },
};

export const EmptyCart: Story = {
  args: {
    icon: <BiCart />,
    title: 'Your cart is empty',
    description: 'Add items to your cart to get started.',
    action: <Button variant="primary">Start Shopping</Button>,
  },
  decorators: [
    (Story) => (
      <Box className="w-96">
        <Story />
      </Box>
    ),
  ],
};

export const MultipleActions: Story = {
  args: {
    icon: <BiCloudUpload />,
    title: 'No documents',
    description: 'Upload your first document to get started.',
    action: (
      <Flex gap="sm">
        <Button variant="primary">Upload Document</Button>
        <Button variant="secondary">Learn More</Button>
      </Flex>
    ),
  },
  decorators: [
    (Story) => (
      <Box className="w-96">
        <Story />
      </Box>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Empty state with multiple action buttons.',
      },
    },
  },
};

export const IconSizes: StoryWithRender = {
  render: () => (
    <Flex gap="lg">
      <Stack spacing="sm" className="w-64">
        <Text size="small" color="secondary">Small (32px)</Text>
        <EmptyState icon={<BiBox />} iconSize={32} title="Small Icon" description="Compact empty state." />
      </Stack>
      <Stack spacing="sm" className="w-64">
        <Text size="small" color="secondary">Default (48px)</Text>
        <EmptyState icon={<BiBox />} title="Default Icon" description="Standard empty state." />
      </Stack>
      <Stack spacing="sm" className="w-64">
        <Text size="small" color="secondary">Large (80px)</Text>
        <EmptyState icon={<BiBox />} iconSize={80} title="Large Icon" description="Prominent empty state." />
      </Stack>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different icon sizes for various contexts.',
      },
    },
  },
};

export const WithoutIcon: Story = {
  args: {
    title: 'No data available',
    description: 'There is currently no data to display.',
  },
  decorators: [
    (Story) => (
      <Box className="w-96">
        <Story />
      </Box>
    ),
  ],
};

export const TitleOnly: Story = {
  args: {
    icon: <BiBox />,
    title: 'Nothing here yet',
  },
  decorators: [
    (Story) => (
      <Box className="w-96">
        <Story />
      </Box>
    ),
  ],
};

export const InContainer: StoryWithRender = {
  render: () => (
    <Card variant="outlined" className="min-h-80 w-full max-w-lg">
      <Card.Content className="h-full flex items-center justify-center">
        <EmptyState icon={<BiBox />} title="No messages" description="You don't have any messages yet." />
      </Card.Content>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty state centered within a container.',
      },
    },
  },
};
