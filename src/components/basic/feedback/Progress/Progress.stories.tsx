import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';
import { useState, useEffect } from 'react';
import { Button } from '../../forms/Button';

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Progress component for displaying progress indicators with support for different sizes, variants, and optional value display.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'The current value of the progress (0-100)',
    },
    max: {
      control: 'number',
      description: 'The maximum value of the progress',
      table: {
        defaultValue: { summary: '100' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'The size variant of the progress bar',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'The color variant of the progress bar',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    showValue: {
      control: 'boolean',
      description: 'Whether to show the progress value as text',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Custom label for accessibility',
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default progress bar at 50%.',
      },
    },
  },
};

export const WithValue: Story = {
  args: {
    value: 75,
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with percentage value displayed.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div>
        <p className="text-sm mb-2 text-[var(--semantic-text-secondary)]">Default</p>
        <Progress value={60} showValue />
      </div>
      <div>
        <p className="text-sm mb-2 text-[var(--semantic-text-secondary)]">Success</p>
        <Progress value={100} variant="success" showValue />
      </div>
      <div>
        <p className="text-sm mb-2 text-[var(--semantic-text-secondary)]">Warning</p>
        <Progress value={45} variant="warning" showValue />
      </div>
      <div>
        <p className="text-sm mb-2 text-[var(--semantic-text-secondary)]">Error</p>
        <Progress value={20} variant="error" showValue />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available progress variants: default, success, warning, and error.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div>
        <p className="text-sm mb-2 text-[var(--semantic-text-secondary)]">Small</p>
        <Progress value={60} size="sm" />
      </div>
      <div>
        <p className="text-sm mb-2 text-[var(--semantic-text-secondary)]">Default</p>
        <Progress value={60} size="default" />
      </div>
      <div>
        <p className="text-sm mb-2 text-[var(--semantic-text-secondary)]">Large</p>
        <Progress value={60} size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars in different sizes: small, default, and large.',
      },
    },
  },
};

export const DifferentValues: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Progress value={0} showValue />
      <Progress value={25} showValue />
      <Progress value={50} showValue />
      <Progress value={75} showValue />
      <Progress value={100} showValue />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars showing different completion percentages.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    value: 65,
    label: 'Upload progress',
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with an accessibility label.',
      },
    },
  },
};

export const CustomMax: Story = {
  args: {
    value: 30,
    max: 50,
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with custom maximum value (30 out of 50 = 60%).',
      },
    },
  },
};

export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="w-full max-w-md">
        <Progress value={progress} showValue />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Animated progress bar that continuously updates.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    return (
      <div className="w-full max-w-md">
        <Progress value={progress} showValue className="mb-4" />
        <div className="flex gap-2">
          <Button
            size="small"
            onClick={() => setProgress((prev) => Math.max(0, prev - 10))}
          >
            -10
          </Button>
          <Button
            size="small"
            onClick={() => setProgress((prev) => Math.min(100, prev + 10))}
          >
            +10
          </Button>
          <Button
            size="small"
            variant="secondary"
            onClick={() => setProgress(0)}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive progress bar with controls to adjust the value.',
      },
    },
  },
};

export const FileUploadSimulation: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const simulateUpload = () => {
      setProgress(0);
      setIsUploading(true);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
    };

    return (
      <div className="w-full max-w-md">
        <div className="mb-2">
          <p className="text-sm font-medium mb-1">Uploading file...</p>
          <Progress
            value={progress}
            variant={progress === 100 ? 'success' : 'default'}
            showValue
          />
        </div>
        <Button
          onClick={simulateUpload}
          disabled={isUploading}
          variant="primary"
          size="small"
        >
          {isUploading ? 'Uploading...' : progress === 100 ? 'Upload Complete' : 'Start Upload'}
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Simulated file upload with progress indication.',
      },
    },
  },
};

export const MultiStep: Story = {
  render: () => {
    const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
    const [currentStep, setCurrentStep] = useState(1);
    const progress = (currentStep / steps.length) * 100;

    return (
      <div className="w-full max-w-md">
        <div className="mb-4">
          <div className="flex justify-between text-sm text-[var(--semantic-text-secondary)] mb-2">
            <span>Step {currentStep} of {steps.length}</span>
            <span>{steps[currentStep - 1]}</span>
          </div>
          <Progress value={progress} variant={progress === 100 ? 'success' : 'default'} />
        </div>
        <div className="flex gap-2">
          <Button
            size="small"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button
            size="small"
            variant="primary"
            onClick={() => setCurrentStep((prev) => Math.min(steps.length, prev + 1))}
            disabled={currentStep === steps.length}
          >
            Next
          </Button>
          <Button
            size="small"
            variant="secondary"
            onClick={() => setCurrentStep(1)}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar used for multi-step form or wizard.',
      },
    },
  },
};

export const WithCustomStyling: Story = {
  args: {
    value: 70,
    showValue: true,
    className: 'h-6',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with custom height using className.',
      },
    },
  },
};
