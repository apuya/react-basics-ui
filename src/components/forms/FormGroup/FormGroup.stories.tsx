import type { Meta, StoryObj } from '@storybook/react';
import { FormGroup } from './FormGroup';
import { Radio } from '@/components/forms/Radio';
import { Checkbox } from '@/components/forms/Checkbox';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/forms/Input';

const meta: Meta<typeof FormGroup> = {
  title: 'Forms/FormGroup',
  component: FormGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'FormGroup is a compound component that uses a semantic fieldset element to group related form controls together. It provides accessible labeling via Legend sub-component and supports both vertical and horizontal layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout direction for child elements',
    },
    error: {
      control: 'boolean',
      description: 'Enables error state styling',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the entire form group',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormGroup>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic FormGroup with Legend sub-component and vertically stacked checkboxes.',
      },
    },
  },
  render: () => (
    <FormGroup>
      <FormGroup.Legend>Select your preferences</FormGroup.Legend>
      <Checkbox label="Option 1" />
      <Checkbox label="Option 2" />
      <Checkbox label="Option 3" />
    </FormGroup>
  ),
};

export const WithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Add a Description sub-component to provide additional context about the group of options.',
      },
    },
  },
  render: () => (
    <FormGroup>
      <FormGroup.Legend>Notification Settings</FormGroup.Legend>
      <FormGroup.Description>
        Choose how you want to be notified about updates
      </FormGroup.Description>
      <Checkbox label="Email notifications" />
      <Checkbox label="SMS notifications" />
      <Checkbox label="Push notifications" />
    </FormGroup>
  ),
};

export const RadioGroup: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use FormGroup to create accessible radio button groups where only one option can be selected.',
      },
    },
  },
  render: () => (
    <FormGroup>
      <FormGroup.Legend>Select payment method</FormGroup.Legend>
      <Radio name="payment" label="Credit Card" />
      <Radio name="payment" label="PayPal" />
      <Radio name="payment" label="Bank Transfer" />
    </FormGroup>
  ),
};

export const CheckboxGroup: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use FormGroup for multiple selection scenarios where users can choose several options.',
      },
    },
  },
  render: () => (
    <FormGroup>
      <FormGroup.Legend>Select interests</FormGroup.Legend>
      <FormGroup.Description>Choose all that apply</FormGroup.Description>
      <Checkbox label="Technology" />
      <Checkbox label="Design" />
      <Checkbox label="Business" />
      <Checkbox label="Marketing" />
    </FormGroup>
  ),
};

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Horizontal orientation displays options in a row. Best for small sets of options with short labels.',
      },
    },
  },
  render: () => (
    <FormGroup orientation="horizontal">
      <FormGroup.Legend>Choose size</FormGroup.Legend>
      <Radio name="size" label="Small" />
      <Radio name="size" label="Medium" />
      <Radio name="size" label="Large" />
    </FormGroup>
  ),
};

export const VerticalCheckboxes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Vertical orientation (default) stacks options vertically for better readability with longer labels.',
      },
    },
  },
  render: () => (
    <FormGroup orientation="vertical">
      <FormGroup.Legend>Privacy Settings</FormGroup.Legend>
      <Checkbox label="Allow personalized recommendations" />
      <Checkbox label="Share usage data for product improvement" />
      <Checkbox label="Receive promotional emails" />
    </FormGroup>
  ),
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error state for validation when a required selection is not made or is invalid.',
      },
    },
  },
  render: () => (
    <FormGroup error>
      <FormGroup.Legend>Accept terms</FormGroup.Legend>
      <Checkbox label="I accept the terms and conditions" />
      <FormGroup.ErrorMessage>You must accept the terms to continue</FormGroup.ErrorMessage>
    </FormGroup>
  ),
};

export const ErrorWithDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error message is displayed in addition to the description, not as a replacement.',
      },
    },
  },
  render: () => (
    <FormGroup error>
      <FormGroup.Legend>Select at least one option</FormGroup.Legend>
      <FormGroup.Description>Choose your preferred contact methods</FormGroup.Description>
      <Checkbox label="Email" />
      <Checkbox label="Phone" />
      <Checkbox label="Mail" />
      <FormGroup.ErrorMessage>Please select at least one contact method</FormGroup.ErrorMessage>
    </FormGroup>
  ),
};

export const LongDescription: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Description can be longer text that provides detailed context for the form group.',
      },
    },
  },
  render: () => (
    <FormGroup>
      <FormGroup.Legend>Data Sharing Preferences</FormGroup.Legend>
      <FormGroup.Description>
        We respect your privacy. Select which types of data you are comfortable sharing with our
        partners. You can change these settings at any time from your account preferences.
      </FormGroup.Description>
      <Checkbox label="Basic profile information" />
      <Checkbox label="Usage analytics" />
      <Checkbox label="Marketing preferences" />
    </FormGroup>
  ),
};

export const NestedFormFields: Story = {
  parameters: {
    docs: {
      description: {
        story: 'FormGroup can contain FormField components for complex form sections with multiple labeled inputs.',
      },
    },
  },
  render: () => (
    <FormGroup>
      <FormGroup.Legend>Shipping Address</FormGroup.Legend>
      <FormGroup.Description>Enter your delivery address</FormGroup.Description>
      <FormField>
        <FormField.Label htmlFor="street">Street Address</FormField.Label>
        <Input id="street" placeholder="123 Main St" />
      </FormField>
      <FormField>
        <FormField.Label htmlFor="city">City</FormField.Label>
        <Input id="city" placeholder="New York" />
      </FormField>
      <FormField>
        <FormField.Label htmlFor="zip">Zip Code</FormField.Label>
        <Input id="zip" placeholder="10001" />
      </FormField>
    </FormGroup>
  ),
};

export const MixedChildren: Story = {
  parameters: {
    docs: {
      description: {
        story: 'FormGroup can contain a mix of different form control types when semantically appropriate.',
      },
    },
  },
  render: () => (
    <FormGroup>
      <FormGroup.Legend>Account Preferences</FormGroup.Legend>
      <Checkbox label="Enable two-factor authentication" />
      <Checkbox label="Show online status" />
      <FormField>
        <FormField.Label htmlFor="display-name">Display Name</FormField.Label>
        <Input id="display-name" placeholder="Your public name" />
      </FormField>
    </FormGroup>
  ),
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
      <FormGroup orientation="vertical">
        <FormGroup.Legend>Vertical (Default)</FormGroup.Legend>
        <Radio name="v-size" label="Small" />
        <Radio name="v-size" label="Medium" />
        <Radio name="v-size" label="Large" />
      </FormGroup>
      <FormGroup orientation="horizontal">
        <FormGroup.Legend>Horizontal</FormGroup.Legend>
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
  render: () => (
    <FormGroup>
      <FormGroup.Legend>Subscription Type *</FormGroup.Legend>
      <FormGroup.Description>Please select your preferred plan</FormGroup.Description>
      <Radio name="plan" label="Free" />
      <Radio name="plan" label="Pro - $9/month" />
      <Radio name="plan" label="Enterprise - Contact us" />
    </FormGroup>
  ),
};
