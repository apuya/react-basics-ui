import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  BiUser,
  BiCheckCircle,
  BiCart,
  BiPackage,
  BiHome,
  BiFile,
} from 'react-icons/bi';
import { Button } from '../../actions/Button';
import { Heading } from '../../typography/Heading';
import { Text } from '../../typography/Text';
import { Box } from '../../layout/Box';
import { Flex } from '../../layout/Flex';
import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Experimental/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A visual progress indicator that guides users through multi-step workflows. Supports horizontal and vertical orientations, multiple sizes, custom icons, and automatic or manual step status management.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeStep: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'Current active step (0-indexed)',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the stepper',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of step indicators',
    },
    showConnectors: {
      control: 'boolean',
      description: 'Whether to show connectors between steps',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic horizontal stepper with labels.
 */
export const Default: Story = {
  args: {
    activeStep: 1,
    children: (
      <>
        <Stepper.Step label="Account" />
        <Stepper.Step label="Profile" />
        <Stepper.Step label="Complete" />
      </>
    ),
  },
};

/**
 * Vertical orientation for sidebar or mobile layouts.
 */
export const Vertical: Story = {
  args: {
    activeStep: 1,
    orientation: 'vertical',
    children: (
      <>
        <Stepper.Step label="Personal Info" description="Enter your details" />
        <Stepper.Step label="Account Setup" description="Create your account" />
        <Stepper.Step label="Preferences" description="Choose your settings" />
        <Stepper.Step label="Confirmation" description="Review and confirm" />
      </>
    ),
  },
};

/**
 * All three size variants.
 */
export const Sizes: Story = {
  render: () => (
    <Flex className="flex-col gap-8">
      <Box>
        <Text weight="semibold" className="mb-2">
          Small
        </Text>
        <Stepper activeStep={1} size="sm">
          <Stepper.Step label="Start" />
          <Stepper.Step label="Process" />
          <Stepper.Step label="Complete" />
        </Stepper>
      </Box>
      <Box>
        <Text weight="semibold" className="mb-2">
          Medium (default)
        </Text>
        <Stepper activeStep={1} size="md">
          <Stepper.Step label="Start" />
          <Stepper.Step label="Process" />
          <Stepper.Step label="Complete" />
        </Stepper>
      </Box>
      <Box>
        <Text weight="semibold" className="mb-2">
          Large
        </Text>
        <Stepper activeStep={1} size="lg">
          <Stepper.Step label="Start" />
          <Stepper.Step label="Process" />
          <Stepper.Step label="Complete" />
        </Stepper>
      </Box>
    </Flex>
  ),
};

/**
 * Without connector lines between steps.
 */
export const WithoutConnectors: Story = {
  args: {
    activeStep: 1,
    showConnectors: false,
    children: (
      <>
        <Stepper.Step label="Step 1" />
        <Stepper.Step label="Step 2" />
        <Stepper.Step label="Step 3" />
        <Stepper.Step label="Step 4" />
      </>
    ),
  },
};

/**
 * All steps completed state.
 */
export const Completed: Story = {
  args: {
    activeStep: 3,
    children: (
      <>
        <Stepper.Step label="Profile" icon={<BiUser />} />
        <Stepper.Step label="Settings" icon={<BiFile />} />
        <Stepper.Step label="Complete" icon={<BiCheckCircle />} />
      </>
    ),
  },
};

/**
 * Step with error state.
 */
export const WithError: Story = {
  args: {
    activeStep: 1,
    children: (
      <>
        <Stepper.Step label="Personal Info" description="Completed" />
        <Stepper.Step label="Payment" description="Error occurred" error />
        <Stepper.Step label="Confirmation" description="Pending" />
      </>
    ),
  },
};

/**
 * Many steps to show scaling behavior.
 */
export const ManySteps: Story = {
  args: {
    activeStep: 3,
    size: 'sm',
    children: (
      <>
        <Stepper.Step label="Step 1" />
        <Stepper.Step label="Step 2" />
        <Stepper.Step label="Step 3" />
        <Stepper.Step label="Step 4" />
        <Stepper.Step label="Step 5" />
        <Stepper.Step label="Step 6" />
      </>
    ),
  },
};

/**
 * Interactive horizontal stepper with navigation controls.
 */
export const Interactive: Story = {
  render: function InteractiveStory() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, 3));
    const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));
    const handleReset = () => setActiveStep(0);

    const stepTitles = ['Create Account', 'Complete Profile', 'Add Address', 'All Done!'];
    const stepDescriptions = [
      'Enter your account details to get started.',
      'Tell us more about yourself.',
      'Where should we send your orders?',
      'Registration complete! Welcome aboard.',
    ];

    return (
      <Box className="w-full max-w-3xl">
        <Stepper activeStep={activeStep}>
          <Stepper.Step label="Account" icon={<BiUser />} />
          <Stepper.Step label="Profile" icon={<BiFile />} />
          <Stepper.Step label="Address" icon={<BiHome />} />
          <Stepper.Step label="Complete" icon={<BiCheckCircle />} />
        </Stepper>

        <Box className="mt-8 p-6 bg-gray-50 rounded-lg">
          <Heading level="h3" className="mb-2">
            {stepTitles[activeStep]}
          </Heading>
          <Text color="secondary">{stepDescriptions[activeStep]}</Text>
        </Box>

        <Flex gap="sm" className="mt-4">
          <Button onClick={handleBack} disabled={activeStep === 0} variant="outline">
            Back
          </Button>
          <Button onClick={handleNext} disabled={activeStep === 3} variant="primary">
            {activeStep === 3 ? 'Finish' : 'Next'}
          </Button>
          {activeStep === 3 && (
            <Button onClick={handleReset} variant="outline" className="ml-auto">
              Reset
            </Button>
          )}
        </Flex>
      </Box>
    );
  },
};

/**
 * Interactive vertical stepper for order tracking.
 */
export const InteractiveVertical: Story = {
  render: function InteractiveVerticalStory() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, 2));
    const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

    const stepLabels = ['Order Placed', 'Processing', 'Shipped'];
    const stepContents = [
      'Thank you for your order! We have received your purchase and will begin processing it shortly.',
      'Your order is being prepared by our team. This usually takes 1-2 business days.',
      'Your order has been shipped and is on its way to you. You should receive it within 3-5 business days.',
    ];

    return (
      <Flex gap="lg">
        <Box className="w-64">
          <Stepper activeStep={activeStep} orientation="vertical">
            <Stepper.Step
              label="Order Placed"
              description="Your order has been received"
              icon={<BiCart />}
            />
            <Stepper.Step
              label="Processing"
              description="We're preparing your items"
              icon={<BiPackage />}
            />
            <Stepper.Step
              label="Shipped"
              description="Your order is on the way"
              icon={<BiCheckCircle />}
            />
          </Stepper>
        </Box>

        <Box className="flex-1">
          <Box className="p-6 bg-white border rounded-lg">
            <Heading level="h3" className="mb-3">
              {stepLabels[activeStep]}
            </Heading>
            <Text color="secondary" className="mb-6">
              {stepContents[activeStep]}
            </Text>

            <Flex gap="sm">
              {activeStep > 0 && (
                <Button onClick={handleBack} variant="outline">
                  Previous
                </Button>
              )}
              {activeStep < 2 && (
                <Button onClick={handleNext} variant="primary">
                  Simulate Next
                </Button>
              )}
            </Flex>
          </Box>
        </Box>
      </Flex>
    );
  },
};

// =============================================================================
// SUBCOMPONENTS
// =============================================================================

/**
 * Standalone step indicator showing all statuses.
 */
export const SubcomponentIndicatorStatuses: Story = {
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
 * Standalone step indicator in all sizes.
 */
export const SubcomponentIndicatorSizes: Story = {
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
 * Standalone step indicator with custom icons.
 */
export const SubcomponentIndicatorWithIcons: Story = {
  render: () => (
    <Flex gap="lg" className="items-center">
      <Stepper.Indicator status="completed" stepNumber={1} size="lg" icon={<BiUser />} />
      <Stepper.Indicator status="active" stepNumber={2} size="lg" icon={<BiCart />} />
      <Stepper.Indicator status="upcoming" stepNumber={3} size="lg" icon={<BiPackage />} />
      <Stepper.Indicator status="error" stepNumber={4} size="lg" icon={<BiCheckCircle />} />
    </Flex>
  ),
};
