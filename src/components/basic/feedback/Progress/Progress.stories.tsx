import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';
import { useState, useEffect } from 'react';

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
      <div className="w-80">
        <Story />
      </div>
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
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const Variants: StoryWithRender = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <span className="text-sm text-gray-500 mb-1 block">Default</span>
        <Progress value={60} showValue />
      </div>
      <div>
        <span className="text-sm text-gray-500 mb-1 block">Success</span>
        <Progress value={100} variant="success" showValue />
      </div>
      <div>
        <span className="text-sm text-gray-500 mb-1 block">Warning</span>
        <Progress value={45} variant="warning" showValue />
      </div>
      <div>
        <span className="text-sm text-gray-500 mb-1 block">Error</span>
        <Progress value={20} variant="error" showValue />
      </div>
    </div>
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
    <div className="w-80 space-y-4">
      <div>
        <span className="text-sm text-gray-500 mb-1 block">Small</span>
        <Progress value={60} size="sm" />
      </div>
      <div>
        <span className="text-sm text-gray-500 mb-1 block">Default</span>
        <Progress value={60} size="default" />
      </div>
      <div>
        <span className="text-sm text-gray-500 mb-1 block">Large</span>
        <Progress value={60} size="lg" />
      </div>
    </div>
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
    <div className="w-80 space-y-4">
      <Progress value={0} showValue />
      <Progress value={25} showValue />
      <Progress value={50} showValue />
      <Progress value={75} showValue />
      <Progress value={100} variant="success" showValue />
    </div>
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
      <div className="w-80">
        <Progress value={value} showValue />
      </div>
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
      <div className="w-80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">document.pdf</span>
          <span className="text-xs text-gray-500">
            {status === 'complete' ? 'Complete' : status === 'uploading' ? 'Uploading...' : 'Ready'}
          </span>
        </div>
        <Progress
          value={progress}
          variant={status === 'complete' ? 'success' : 'default'}
          showValue
        />
        <button
          onClick={simulateUpload}
          disabled={status === 'uploading'}
          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {status === 'complete' ? 'Upload Again' : status === 'uploading' ? 'Uploading...' : 'Upload'}
        </button>
      </div>
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
      <div className="w-80 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="font-medium">{steps[current - 1]}</span>
          <span className="text-gray-500">Step {current} of {steps.length}</span>
        </div>
        <Progress value={progress} variant={current === steps.length ? 'success' : 'default'} />
        <div className="flex gap-2">
          <button
            onClick={() => setCurrent((prev) => Math.max(1, prev - 1))}
            disabled={current === 1}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={() => setCurrent((prev) => Math.min(steps.length, prev + 1))}
            disabled={current === steps.length}
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {current === steps.length ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
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
      <div className="w-80 p-4 border border-gray-200 rounded-lg space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-medium">Storage</span>
          <span className="text-sm text-gray-500">{used} GB of {total} GB</span>
        </div>
        <Progress value={percentage} variant={variant} />
        <p className="text-xs text-gray-500">
          {(total - used).toFixed(1)} GB available
        </p>
      </div>
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
