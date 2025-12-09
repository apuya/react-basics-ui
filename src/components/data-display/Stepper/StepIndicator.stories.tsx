import type { Meta, StoryObj } from '@storybook/react';
import { BiUser, BiCheckCircle, BiStar, BiHeart, BiLock } from 'react-icons/bi';
import { Text } from '../../typography/Text';
import { Box } from '../layout/Box';
import { Flex } from '../layout/Flex';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper.Indicator> = {
  title: 'Experimental/Stepper/Indicator',
  component: Stepper.Indicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A standalone step indicator circle that displays step number, icon, or checkmark. Can be used independently or as part of the Stepper compound component.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['completed', 'active', 'upcoming', 'error'],
      description: 'Current status of the indicator',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the indicator',
    },
    stepNumber: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Step number to display (1-indexed)',
    },
    icon: {
      control: false,
      description: 'Custom icon to display instead of step number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper.Indicator>;

/**
 * Default indicator showing step number.
 */
export const Default: Story = {
  args: {
    status: 'active',
    stepNumber: 1,
    size: 'md',
  },
};

/**
 * All four status variants.
 */
export const AllStatuses: Story = {
  render: () => (
    <Flex gap="lg" className="items-center">
      <Box className="text-center">
        <Stepper.Indicator status="completed" stepNumber={1} />
        <Text size="caption" color="tertiary" className="mt-2">
          Completed
        </Text>
      </Box>
      <Box className="text-center">
        <Stepper.Indicator status="active" stepNumber={2} />
        <Text size="caption" color="tertiary" className="mt-2">
          Active
        </Text>
      </Box>
      <Box className="text-center">
        <Stepper.Indicator status="upcoming" stepNumber={3} />
        <Text size="caption" color="tertiary" className="mt-2">
          Upcoming
        </Text>
      </Box>
      <Box className="text-center">
        <Stepper.Indicator status="error" stepNumber={4} />
        <Text size="caption" color="tertiary" className="mt-2">
          Error
        </Text>
      </Box>
    </Flex>
  ),
};

/**
 * All three size variants.
 */
export const AllSizes: Story = {
  render: () => (
    <Flex gap="lg" className="items-end">
      <Box className="text-center">
        <Stepper.Indicator status="active" stepNumber={1} size="sm" />
        <Text size="caption" color="tertiary" className="mt-2">
          Small
        </Text>
      </Box>
      <Box className="text-center">
        <Stepper.Indicator status="active" stepNumber={2} size="md" />
        <Text size="caption" color="tertiary" className="mt-2">
          Medium
        </Text>
      </Box>
      <Box className="text-center">
        <Stepper.Indicator status="active" stepNumber={3} size="lg" />
        <Text size="caption" color="tertiary" className="mt-2">
          Large
        </Text>
      </Box>
    </Flex>
  ),
};

/**
 * Indicators with custom icons.
 */
export const WithIcons: Story = {
  render: () => (
    <Flex gap="lg" className="items-center">
      <Box className="text-center">
        <Stepper.Indicator status="completed" icon={<BiUser />} />
        <Text size="caption" color="tertiary" className="mt-2">
          User
        </Text>
      </Box>
      <Box className="text-center">
        <Stepper.Indicator status="active" icon={<BiStar />} />
        <Text size="caption" color="tertiary" className="mt-2">
          Star
        </Text>
      </Box>
      <Box className="text-center">
        <Stepper.Indicator status="upcoming" icon={<BiHeart />} />
        <Text size="caption" color="tertiary" className="mt-2">
          Heart
        </Text>
      </Box>
      <Box className="text-center">
        <Stepper.Indicator status="error" icon={<BiLock />} />
        <Text size="caption" color="tertiary" className="mt-2">
          Lock
        </Text>
      </Box>
    </Flex>
  ),
};

/**
 * Completed indicators show checkmark by default (unless icon is provided).
 */
export const CompletedWithCheckmark: Story = {
  render: () => (
    <Flex gap="lg" className="items-center">
      <Box className="text-center">
        <Stepper.Indicator status="completed" stepNumber={1} />
        <Text size="caption" color="tertiary" className="mt-2">
          Auto checkmark
        </Text>
      </Box>
      <Box className="text-center">
        <Stepper.Indicator status="completed" icon={<BiCheckCircle />} />
        <Text size="caption" color="tertiary" className="mt-2">
          Custom icon
        </Text>
      </Box>
    </Flex>
  ),
};

/**
 * Size comparison across all statuses.
 */
export const SizeMatrix: Story = {
  render: () => (
    <Flex className="flex-col gap-6">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Flex key={size} gap="md" className="items-center">
          <Text weight="semibold" className="w-16">
            {size.toUpperCase()}
          </Text>
          <Stepper.Indicator status="completed" stepNumber={1} size={size} />
          <Stepper.Indicator status="active" stepNumber={2} size={size} />
          <Stepper.Indicator status="upcoming" stepNumber={3} size={size} />
          <Stepper.Indicator status="error" stepNumber={4} size={size} />
        </Flex>
      ))}
    </Flex>
  ),
};
