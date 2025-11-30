import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';
import { useState } from 'react';
import {
  BiUser,
  BiEnvelope,
  BiLock,
  BiCheckCircle,
  BiCart,
  BiCreditCard,
  BiPackage,
  BiHome,
  BiBuilding,
  BiFile,
} from 'react-icons/bi';
import { Button } from '../../basic/forms/Button';
import { Heading } from '../../basic/typography/Heading';
import { Text } from '../../basic/typography/Text';
import { Input } from '../../basic/forms/Input';
import { Stack } from '../../basic/layout/Stack';
import { Box } from '../../basic/layout/Box';
import { Flex } from '../../basic/layout/Flex';
import { Label } from '../../basic/forms/Label';

const meta = {
  title: 'Experimental/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    activeStep: {
      control: { type: 'number', min: 0, max: 5 },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showConnectors: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeStep: 1,
    children: (
      <>
        <Stepper.Step label="Step 1" />
        <Stepper.Step label="Step 2" />
        <Stepper.Step label="Step 3" />
      </>
    ),
  },
};

export const WithDescriptions: Story = {
  args: {
    activeStep: 1,
    children: (
      <>
        <Stepper.Step label="Personal Info" description="Enter your details" />
        <Stepper.Step label="Account Setup" description="Create your account" />
        <Stepper.Step label="Confirmation" description="Review and confirm" />
      </>
    ),
  },
};

export const WithIcons: Story = {
  args: {
    activeStep: 1,
    children: (
      <>
        <Stepper.Step label="Profile" description="Personal information" icon={<BiUser />} />
        <Stepper.Step label="Email" description="Email verification" icon={<BiEnvelope />} />
        <Stepper.Step label="Security" description="Set password" icon={<BiLock />} />
        <Stepper.Step label="Complete" description="You're all set!" icon={<BiCheckCircle />} />
      </>
    ),
  },
};

export const VerticalOrientation: Story = {
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

export const VerticalWithIcons: Story = {
  args: {
    activeStep: 2,
    orientation: 'vertical',
    children: (
      <>
        <Stepper.Step
          label="Choose Product"
          description="Browse our catalog"
          icon={<BiCart />}
        />
        <Stepper.Step
          label="Payment"
          description="Enter payment details"
          icon={<BiCreditCard />}
        />
        <Stepper.Step
          label="Shipping"
          description="Delivery information"
          icon={<BiPackage />}
        />
        <Stepper.Step
          label="Confirmation"
          description="Order complete"
          icon={<BiCheckCircle />}
        />
      </>
    ),
  },
};

export const SmallSize: Story = {
  args: {
    activeStep: 1,
    size: 'sm',
    children: (
      <>
        <Stepper.Step label="Start" />
        <Stepper.Step label="Process" />
        <Stepper.Step label="Complete" />
      </>
    ),
  },
};

export const LargeSize: Story = {
  args: {
    activeStep: 1,
    size: 'lg',
    children: (
      <>
        <Stepper.Step label="Begin" description="Get started" />
        <Stepper.Step label="Continue" description="Keep going" />
        <Stepper.Step label="Finish" description="All done" />
      </>
    ),
  },
};

export const WithoutConnectors: Story = {
  args: {
    activeStep: 1,
    showConnectors: false,
    children: (
      <>
        <Stepper.Step label="Step 1" description="First step" />
        <Stepper.Step label="Step 2" description="Second step" />
        <Stepper.Step label="Step 3" description="Third step" />
        <Stepper.Step label="Step 4" description="Final step" />
      </>
    ),
  },
};

export const AllStepsCompleted: Story = {
  args: {
    activeStep: 3,
    children: (
      <>
        <Stepper.Step label="Profile" icon={<BiUser />} />
        <Stepper.Step label="Email" icon={<BiEnvelope />} />
        <Stepper.Step label="Security" icon={<BiLock />} />
      </>
    ),
  },
};

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

export const CustomCompletion: Story = {
  args: {
    activeStep: 2,
    children: (
      <>
        <Stepper.Step label="Step 1" completed />
        <Stepper.Step label="Step 2" completed />
        <Stepper.Step label="Step 3" />
        <Stepper.Step label="Step 4" />
      </>
    ),
  },
};

export const InteractiveHorizontal: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
      setActiveStep((prev) => Math.min(prev + 1, 3));
    };

    const handleBack = () => {
      setActiveStep((prev) => Math.max(prev - 1, 0));
    };

    const handleReset = () => {
      setActiveStep(0);
    };

    return (
      <Box className="w-full max-w-3xl">
        <Stepper activeStep={activeStep}>
          <Stepper.Step
            label="Account"
            description="Create your account"
            icon={<BiUser />}
          />
          <Stepper.Step
            label="Profile"
            description="Complete your profile"
            icon={<BiFile />}
          />
          <Stepper.Step
            label="Address"
            description="Add your address"
            icon={<BiHome />}
          />
          <Stepper.Step
            label="Complete"
            description="You're all set!"
            icon={<BiCheckCircle />}
          />
        </Stepper>

        <Box className="mt-8 p-6 bg-gray-50 rounded-lg">
          <Heading level={3} className="mb-2">
            Step {activeStep + 1}: {['Account', 'Profile', 'Address', 'Complete'][activeStep]}
          </Heading>
          <Text color="secondary" className="mb-4">
            {[
              'Enter your account details to get started.',
              'Tell us more about yourself.',
              'Where should we send your orders?',
              'Registration complete! Welcome aboard.',
            ][activeStep]}
          </Text>
        </Box>

        <Flex gap="sm" className="mt-4">
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            variant="outline"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={activeStep === 3}
            variant="primary"
          >
            {activeStep === 3 ? 'Finish' : 'Next'}
          </Button>
          {activeStep === 3 && (
            <Button
              onClick={handleReset}
              variant="outline"
              className="ml-auto"
            >
              Reset
            </Button>
          )}
        </Flex>
      </Box>
    );
  },
};

export const InteractiveVertical: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
      setActiveStep((prev) => Math.min(prev + 1, 2));
    };

    const handleBack = () => {
      setActiveStep((prev) => Math.max(prev - 1, 0));
    };

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
            <Heading level={3} className="mb-3">
              {['Order Received', 'Processing Order', 'Order Shipped'][activeStep]}
            </Heading>
            <Text color="secondary" className="mb-6">
              {[
                'Thank you for your order! We have received your purchase and will begin processing it shortly.',
                'Your order is being prepared by our team. This usually takes 1-2 business days.',
                'Your order has been shipped and is on its way to you. You should receive it within 3-5 business days.',
              ][activeStep]}
            </Text>

            <Flex gap="sm">
              {activeStep > 0 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                >
                  Previous
                </Button>
              )}
              {activeStep < 2 && (
                <Button
                  onClick={handleNext}
                  variant="primary"
                >
                  Simulate Next Step
                </Button>
              )}
            </Flex>
          </Box>
        </Box>
      </Flex>
    );
  },
};

export const OnboardingFlow: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      company: '',
    });

    const handleNext = () => {
      setActiveStep((prev) => Math.min(prev + 1, 2));
    };

    const handleBack = () => {
      setActiveStep((prev) => Math.max(prev - 1, 0));
    };

    return (
      <Box className="w-full max-w-2xl">
        <Stepper activeStep={activeStep}>
          <Stepper.Step label="Personal" description="Your information" />
          <Stepper.Step label="Company" description="Business details" />
          <Stepper.Step label="Complete" description="All done!" />
        </Stepper>

        <Box className="mt-8 p-6 bg-white border rounded-lg">
          {activeStep === 0 && (
            <Stack gap="md">
              <Heading level={3}>Personal Information</Heading>
              <Stack gap="md">
                <Box>
                  <Label htmlFor="onboarding-name">Full Name</Label>
                  <Input
                    id="onboarding-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </Box>
                <Box>
                  <Label htmlFor="onboarding-email">Email</Label>
                  <Input
                    id="onboarding-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </Box>
              </Stack>
            </Stack>
          )}

          {activeStep === 1 && (
            <Stack gap="md">
              <Heading level={3}>Company Details</Heading>
              <Stack gap="md">
                <Box>
                  <Label htmlFor="onboarding-company">Company Name</Label>
                  <Input
                    id="onboarding-company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Inc."
                  />
                </Box>
              </Stack>
            </Stack>
          )}

          {activeStep === 2 && (
            <Box className="text-center py-8">
              <BiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <Heading level={3} className="mb-2">All Set!</Heading>
              <Text color="secondary">
                Thank you for completing the onboarding process.
              </Text>
            </Box>
          )}
        </Box>

        <Flex gap="sm" className="mt-4">
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            variant="outline"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={activeStep === 2}
            variant="primary"
          >
            {activeStep === 2 ? 'Finish' : 'Continue'}
          </Button>
        </Flex>
      </Box>
    );
  },
};

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
