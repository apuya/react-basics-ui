import type { Meta, StoryObj } from '@storybook/react';
import { FormGroup } from './FormGroup';
import { Radio } from '../Radio';
import { Checkbox } from '../Checkbox';
import { FormField } from '../FormField';
import { Input } from '../Input';

const meta: Meta<typeof FormGroup> = {
  title: 'Forms/FormGroup',
  component: FormGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'FormGroup uses a semantic fieldset element to group related form controls together. It provides accessible labeling via legend and supports both vertical and horizontal layouts for radio buttons, checkboxes, and other related inputs.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormGroup>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic FormGroup with a legend and vertically stacked checkboxes. Use this for grouping related options.',
      },
    },
  },
  args: {
    legend: 'Select your preferences',
    children: (
      <>
        <Checkbox label="Option 1" />
        <Checkbox label="Option 2" />
        <Checkbox label="Option 3" />
      </>
    ),
  },
};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Add a description below the legend to provide additional context about the group of options.',
      },
    },
  },
  args: {
    legend: 'Notification Settings',
    description: 'Choose how you want to be notified about updates',
    children: (
      <>
        <Checkbox label="Email notifications" />
        <Checkbox label="SMS notifications" />
        <Checkbox label="Push notifications" />
      </>
    ),
  },
};

export const RadioGroup: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use FormGroup to create accessible radio button groups where only one option can be selected.',
      },
    },
  },
  args: {
    legend: 'Select payment method',
    children: (
      <>
        <Radio name="payment" label="Credit Card" />
        <Radio name="payment" label="PayPal" />
        <Radio name="payment" label="Bank Transfer" />
      </>
    ),
  },
};

export const CheckboxGroup: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use FormGroup for multiple selection scenarios where users can choose several options.',
      },
    },
  },
  args: {
    legend: 'Select interests',
    description: 'Choose all that apply',
    children: (
      <>
        <Checkbox label="Technology" />
        <Checkbox label="Design" />
        <Checkbox label="Business" />
        <Checkbox label="Marketing" />
      </>
    ),
  },
};

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Horizontal orientation displays options in a row. Best for small sets of options with short labels.',
      },
    },
  },
  args: {
    legend: 'Choose size',
    orientation: 'horizontal',
    children: (
      <>
        <Radio name="size" label="Small" />
        <Radio name="size" label="Medium" />
        <Radio name="size" label="Large" />
      </>
    ),
  },
};

export const VerticalCheckboxes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Vertical orientation (default) stacks options vertically for better readability with longer labels.',
      },
    },
  },
  args: {
    legend: 'Privacy Settings',
    orientation: 'vertical',
    children: (
      <>
        <Checkbox label="Allow personalized recommendations" />
        <Checkbox label="Share usage data for product improvement" />
        <Checkbox label="Receive promotional emails" />
      </>
    ),
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error state for validation when a required selection is not made or is invalid.',
      },
    },
  },
  args: {
    legend: 'Accept terms',
    error: true,
    errorMessage: 'You must accept the terms to continue',
    children: <Checkbox label="I accept the terms and conditions" />,
  },
};

export const ErrorWithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error message is displayed in addition to the description, not as a replacement.',
      },
    },
  },
  args: {
    legend: 'Select at least one option',
    description: 'Choose your preferred contact methods',
    error: true,
    errorMessage: 'Please select at least one contact method',
    children: (
      <>
        <Checkbox label="Email" />
        <Checkbox label="Phone" />
        <Checkbox label="Mail" />
      </>
    ),
  },
};

export const LongDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Descriptions can contain longer text to provide detailed instructions or context.',
      },
    },
  },
  args: {
    legend: 'Data Sharing Preferences',
    description:
      'We respect your privacy. Select which types of data you are comfortable sharing with our partners. You can change these settings at any time from your account preferences.',
    children: (
      <>
        <Checkbox label="Basic profile information" />
        <Checkbox label="Usage analytics" />
        <Checkbox label="Marketing preferences" />
      </>
    ),
  },
};

export const NestedFormFields: Story = {
  parameters: {
    docs: {
      description: {
        story: 'FormGroup can contain FormField components for complex form sections with multiple labeled inputs.',
      },
    },
  },
  args: {
    legend: 'Shipping Address',
    description: 'Enter your delivery address',
    children: (
      <>
        <FormField label="Street Address" htmlFor="street">
          <Input id="street" placeholder="123 Main St" />
        </FormField>
        <FormField label="City" htmlFor="city">
          <Input id="city" placeholder="New York" />
        </FormField>
        <FormField label="Zip Code" htmlFor="zip">
          <Input id="zip" placeholder="10001" />
        </FormField>
      </>
    ),
  },
};

export const MixedChildren: Story = {
  parameters: {
    docs: {
      description: {
        story: 'FormGroup can contain a mix of different form control types when semantically appropriate.',
      },
    },
  },
  args: {
    legend: 'Account Preferences',
    children: (
      <>
        <Checkbox label="Enable two-factor authentication" />
        <Checkbox label="Show online status" />
        <FormField label="Display Name" htmlFor="display-name">
          <Input id="display-name" placeholder="Your public name" />
        </FormField>
      </>
    ),
  },
};

export const AllOrientations: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of vertical and horizontal orientations side by side.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '48px' }}>
      <FormGroup legend="Vertical (Default)" orientation="vertical">
        <Radio name="v-size" label="Small" />
        <Radio name="v-size" label="Medium" />
        <Radio name="v-size" label="Large" />
      </FormGroup>
      <FormGroup legend="Horizontal" orientation="horizontal">
        <Radio name="h-size" label="Small" />
        <Radio name="h-size" label="Medium" />
        <Radio name="h-size" label="Large" />
      </FormGroup>
    </div>
  ),
};

export const RequiredGroup: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Indicate that at least one selection is required within the group.',
      },
    },
  },
  args: {
    legend: 'Subscription Type *',
    description: 'Please select your preferred plan',
    children: (
      <>
        <Radio name="plan" label="Free" />
        <Radio name="plan" label="Pro - $9/month" />
        <Radio name="plan" label="Enterprise - Contact us" />
      </>
    ),
  },
};
