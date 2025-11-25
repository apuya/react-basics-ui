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
      <div className="w-full max-w-3xl">
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

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            Step {activeStep + 1}: {['Account', 'Profile', 'Address', 'Complete'][activeStep]}
          </h3>
          <p className="text-gray-600 mb-4">
            {[
              'Enter your account details to get started.',
              'Tell us more about yourself.',
              'Where should we send your orders?',
              'Registration complete! Welcome aboard.',
            ][activeStep]}
          </p>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={activeStep === 3}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {activeStep === 3 ? 'Finish' : 'Next'}
          </button>
          {activeStep === 3 && (
            <button
              onClick={handleReset}
              className="ml-auto px-4 py-2 border rounded hover:bg-gray-100"
            >
              Reset
            </button>
          )}
        </div>
      </div>
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
      <div className="flex gap-8">
        <div className="w-64">
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
        </div>

        <div className="flex-1">
          <div className="p-6 bg-white border rounded-lg">
            <h3 className="text-xl font-bold mb-3">
              {['Order Received', 'Processing Order', 'Order Shipped'][activeStep]}
            </h3>
            <p className="text-gray-600 mb-6">
              {[
                'Thank you for your order! We have received your purchase and will begin processing it shortly.',
                'Your order is being prepared by our team. This usually takes 1-2 business days.',
                'Your order has been shipped and is on its way to you. You should receive it within 3-5 business days.',
              ][activeStep]}
            </p>

            <div className="flex gap-3">
              {activeStep > 0 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Previous
                </button>
              )}
              {activeStep < 2 && (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Simulate Next Step
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
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
      <div className="w-full max-w-2xl">
        <Stepper activeStep={activeStep}>
          <Stepper.Step label="Personal" description="Your information" />
          <Stepper.Step label="Company" description="Business details" />
          <Stepper.Step label="Complete" description="All done!" />
        </Stepper>

        <div className="mt-8 p-6 bg-white border rounded-lg">
          {activeStep === 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Company Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Acme Inc."
                  />
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="text-center py-8">
              <BiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">All Set!</h3>
              <p className="text-gray-600">
                Thank you for completing the onboarding process.
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={activeStep === 2}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {activeStep === 2 ? 'Finish' : 'Continue'}
          </button>
        </div>
      </div>
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
