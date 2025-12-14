import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';
import { useState, useEffect } from 'react';
import { Stack } from '../../layout/Stack';
import { Flex } from '../../layout/Flex';
import { Text } from '../../typography/Text';
import { Box } from '../../layout/Box';
import { Button } from '../../forms/Button';
import { Card } from '../../data-display/Card';

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Progress bar component for displaying completion status. Supports different sizes, color variants, and optional value display.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value (0-100)',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
      table: { defaultValue: { summary: '100' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Size of the progress bar',
      table: { defaultValue: { summary: 'default' } },
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Color variant',
      table: { defaultValue: { summary: 'default' } },
    },
    showValue: {
      control: 'boolean',
      description: 'Show percentage value',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Accessibility label',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;
type StoryWithRender = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 50,
  },
  decorators: [
    (Story) => (
      <Box className="w-80">
        <Story />
      </Box>
    ),
  ],
};

export const WithValue: Story = {
  args: {
    value: 75,
    showValue: true,
  },
  decorators: [
    (Story) => (
      <Box className="w-80">
        <Story />
      </Box>
    ),
  ],
};

export const Variants: StoryWithRender = {
  render: () => (
    <Stack spacing="md" className="w-80">
      <Stack spacing="xs">
        <Text size="small" color="secondary">Default</Text>
        <Progress value={60} showValue />
      </Stack>
      <Stack spacing="xs">
        <Text size="small" color="secondary">Success</Text>
        <Progress value={100} variant="success" showValue />
      </Stack>
      <Stack spacing="xs">
        <Text size="small" color="secondary">Warning</Text>
        <Progress value={45} variant="warning" showValue />
      </Stack>
      <Stack spacing="xs">
        <Text size="small" color="secondary">Error</Text>
        <Progress value={20} variant="error" showValue />
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All color variants for different states.',
      },
    },
  },
};

export const Sizes: StoryWithRender = {
  render: () => (
    <Stack spacing="md" className="w-80">
      <Stack spacing="xs">
        <Text size="small" color="secondary">Small</Text>
        <Progress value={60} size="sm" />
      </Stack>
      <Stack spacing="xs">
        <Text size="small" color="secondary">Default</Text>
        <Progress value={60} size="default" />
      </Stack>
      <Stack spacing="xs">
        <Text size="small" color="secondary">Large</Text>
        <Progress value={60} size="lg" />
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available size variants.',
      },
    },
  },
};

export const ProgressSteps: StoryWithRender = {
  render: () => (
    <Stack spacing="md" className="w-80">
      <Progress value={0} showValue />
      <Progress value={25} showValue />
      <Progress value={50} showValue />
      <Progress value={75} showValue />
      <Progress value={100} variant="success" showValue />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bar at different completion levels.',
      },
    },
  },
};

export const Animated: StoryWithRender = {
  render: () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setValue((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 100);
      return () => clearInterval(timer);
    }, []);

    return (
      <Box className="w-80">
        <Progress value={value} showValue />
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Animated progress bar demonstrating smooth transitions.',
      },
    },
  },
};

export const FileUpload: StoryWithRender = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'complete'>('idle');

    const simulateUpload = () => {
      setProgress(0);
      setStatus('uploading');
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus('complete');
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
    };

    return (
      <Stack spacing="sm" className="w-80">
        <Flex align="center" justify="between">
          <Text size="small" weight="medium">document.pdf</Text>
          <Text size="caption" color="secondary">
            {status === 'complete' ? 'Complete' : status === 'uploading' ? 'Uploading...' : 'Ready'}
          </Text>
        </Flex>
        <Progress
          value={progress}
          variant={status === 'complete' ? 'success' : 'default'}
          showValue
        />
        <Button
          variant="primary"
          size="small"
          onClick={simulateUpload}
          disabled={status === 'uploading'}
          isLoading={status === 'uploading'}
        >
          {status === 'complete' ? 'Upload Again' : 'Upload'}
        </Button>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'File upload progress simulation.',
      },
    },
  },
};

export const MultiStepForm: StoryWithRender = {
  render: () => {
    const steps = ['Account', 'Profile', 'Preferences', 'Review'];
    const [current, setCurrent] = useState(1);
    const progress = (current / steps.length) * 100;

    return (
      <Stack spacing="md" className="w-80">
        <Flex justify="between">
          <Text size="small" weight="medium">{steps[current - 1]}</Text>
          <Text size="small" color="secondary">Step {current} of {steps.length}</Text>
        </Flex>
        <Progress value={progress} variant={current === steps.length ? 'success' : 'default'} />
        <Flex gap="xs">
          <Button
            variant="secondary"
            size="small"
            onClick={() => setCurrent((prev) => Math.max(1, prev - 1))}
            disabled={current === 1}
          >
            Back
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => setCurrent((prev) => Math.min(steps.length, prev + 1))}
            disabled={current === steps.length}
          >
            {current === steps.length ? 'Complete' : 'Next'}
          </Button>
        </Flex>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar for multi-step form wizard.',
      },
    },
  },
};

export const StorageUsage: StoryWithRender = {
  render: () => {
    const used = 7.2;
    const total = 10;
    const percentage = (used / total) * 100;
    const variant = percentage > 90 ? 'error' : percentage > 70 ? 'warning' : 'default';

    return (
      <Card variant="outlined" className="w-80">
        <Card.Content>
          <Stack spacing="sm">
            <Flex justify="between" align="center">
              <Text weight="medium">Storage</Text>
              <Text size="small" color="secondary">{used} GB of {total} GB</Text>
            </Flex>
            <Progress value={percentage} variant={variant} />
            <Text size="caption" color="secondary">
              {(total - used).toFixed(1)} GB available
            </Text>
          </Stack>
        </Card.Content>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Storage usage indicator with dynamic variant based on usage level.',
      },
    },
  },
};
