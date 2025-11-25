import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';
import { Input } from '../Input';
import { Select } from '../Select';
import { Checkbox } from '../Checkbox';

const meta: Meta<typeof FormField> = {
  title: 'Forms/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'FormField is a wrapper component that provides consistent layout for form controls with labels, helper text, and error messages. Use it to maintain visual consistency across all form inputs in your application.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic FormField with a label and input. Use this as the foundation for all form inputs.',
      },
    },
  },
  args: {
    label: 'Email',
    htmlFor: 'email',
    children: <Input id="email" placeholder="Enter your email" />,
  },
};

export const WithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'FormField with helper text to provide additional context or instructions to the user.',
      },
    },
  },
  args: {
    label: 'Password',
    htmlFor: 'password',
    helperText: 'Must be at least 8 characters',
    children: <Input id="password" type="password" placeholder="Enter password" />,
  },
};

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Required fields display an asterisk indicator next to the label to inform users the field must be completed.',
      },
    },
  },
  args: {
    label: 'Username',
    htmlFor: 'username',
    required: true,
    children: <Input id="username" placeholder="Enter username" />,
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error state displays validation messages in red. The error message replaces the helper text when present.',
      },
    },
  },
  args: {
    label: 'Email',
    htmlFor: 'email-error',
    error: true,
    errorMessage: 'Please enter a valid email address',
    children: <Input id="email-error" error placeholder="Enter your email" />,
  },
};

export const RequiredWithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Combination of required indicator and error state for form validation scenarios.',
      },
    },
  },
  args: {
    label: 'Email',
    htmlFor: 'email-required-error',
    required: true,
    error: true,
    errorMessage: 'Email is required',
    children: <Input id="email-required-error" error placeholder="Enter your email" />,
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled state for read-only or locked fields. The entire field including label appears muted.',
      },
    },
  },
  args: {
    label: 'Disabled Field',
    htmlFor: 'disabled',
    disabled: true,
    helperText: 'This field is disabled',
    children: <Input id="disabled" disabled placeholder="Cannot edit" />,
  },
};

export const LongLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Labels can wrap to multiple lines when needed for longer descriptive text.',
      },
    },
  },
  args: {
    label: 'Please enter your preferred contact email address for notifications',
    htmlFor: 'long-label',
    helperText: 'We will only use this for important updates',
    children: <Input id="long-label" placeholder="email@example.com" />,
  },
};

export const WithSelectChild: Story = {
  parameters: {
    docs: {
      description: {
        story: 'FormField works with any form control, including Select dropdowns.',
      },
    },
  },
  args: {
    label: 'Country',
    htmlFor: 'country',
    helperText: 'Select your country of residence',
    children: (
      <Select id="country">
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
      </Select>
    ),
  },
};

export const WithCheckboxChild: Story = {
  parameters: {
    docs: {
      description: {
        story: 'FormField can wrap Checkbox components for terms acceptance or single option fields.',
      },
    },
  },
  args: {
    label: 'Terms and Conditions',
    error: false,
    helperText: 'Please review our terms before continuing',
    children: <Checkbox label="I agree to the terms and conditions" />,
  },
};

export const HelperTextAndError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'When both helperText and errorMessage are provided, the error message takes priority and is displayed instead.',
      },
    },
  },
  args: {
    label: 'Phone Number',
    htmlFor: 'phone',
    helperText: 'Include country code',
    error: true,
    errorMessage: 'Invalid phone number format',
    children: <Input id="phone" error placeholder="+1 (555) 000-0000" />,
  },
};

export const AllStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Overview of all FormField states: default, with helper, required, error, and disabled.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <FormField label="Default" htmlFor="state-default">
        <Input id="state-default" placeholder="Default state" />
      </FormField>
      <FormField label="With Helper" htmlFor="state-helper" helperText="Helper text here">
        <Input id="state-helper" placeholder="With helper text" />
      </FormField>
      <FormField label="Required" htmlFor="state-required" required>
        <Input id="state-required" placeholder="Required field" />
      </FormField>
      <FormField label="Error" htmlFor="state-error" error errorMessage="Error message">
        <Input id="state-error" error placeholder="Error state" />
      </FormField>
      <FormField label="Disabled" htmlFor="state-disabled" disabled>
        <Input id="state-disabled" disabled placeholder="Disabled state" />
      </FormField>
    </div>
  ),
};
