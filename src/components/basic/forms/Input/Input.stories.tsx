import type { Meta, StoryObj } from '@storybook/react';
import { BiSearch, BiEnvelope, BiLock, BiUser, BiPhone, BiX } from 'react-icons/bi';
import { Input } from './Input';
import { Icon } from '../../utility/Icon';

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Input component for text entry with support for different sizes, icons, labels, helper text, and error states. Supports all standard HTML input types and provides consistent styling across your application.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Size of the input',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    helperText: {
      control: 'text',
      description: 'Helper or error text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input type',
    },
  },
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic input with placeholder text. Use for simple text entry fields.',
      },
    },
  },
  args: {
    placeholder: 'Enter text...',
  },
};

export const SizeSmall: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small size input for compact interfaces or inline editing scenarios.',
      },
    },
  },
  args: {
    size: 'small',
    placeholder: 'Small input',
  },
};

export const SizeDefault: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default size for standard form fields. Provides good balance of compactness and usability.',
      },
    },
  },
  args: {
    size: 'default',
    placeholder: 'Default input',
  },
};

export const SizeLarge: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Large size for prominent fields or touch-optimized interfaces. Better accessibility for users with motor impairments.',
      },
    },
  },
  args: {
    size: 'large',
    placeholder: 'Large input',
  },
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Input with a label for accessibility and clarity. Always include labels for form inputs.',
      },
    },
  },
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const WithHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Helper text provides additional context or instructions below the input field.',
      },
    },
  },
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error state displays validation messages. Use when user input does not meet requirements.',
      },
    },
  },
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    error: true,
    helperText: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled state prevents user interaction. Use for read-only or locked fields.',
      },
    },
  },
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled input with a pre-filled value. Useful for displaying locked data.',
      },
    },
  },
  args: {
    label: 'Username',
    value: 'johndoe',
    disabled: true,
  },
};

export const WithLeadingIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Leading icon provides visual context for the input type or purpose. Common for search or email fields.',
      },
    },
  },
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leadingIcon: <Icon icon={BiSearch} size="sm" color="inherit" />,
  },
};

export const WithTrailingIcon: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Trailing icon can indicate status, provide actions, or show input validation.',
      },
    },
  },
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    trailingIcon: <Icon icon={BiEnvelope} size="sm" color="inherit" />,
  },
};

export const WithBothIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Both leading and trailing icons. Leading for context, trailing for actions like clear or submit.',
      },
    },
  },
  args: {
    label: 'Search users',
    placeholder: 'Search...',
    leadingIcon: <Icon icon={BiSearch} size="sm" color="inherit" />,
    trailingIcon: <Icon icon={BiX} size="sm" color="inherit" />,
  },
};

export const EmailInput: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Email input type with appropriate icon and placeholder. Provides email-specific keyboard on mobile.',
      },
    },
  },
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    leadingIcon: <Icon icon={BiEnvelope} size="sm" color="inherit" />,
  },
};

export const PasswordInput: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Password input type obscures entered text. Essential for secure credential entry.',
      },
    },
  },
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    leadingIcon: <Icon icon={BiLock} size="sm" color="inherit" />,
  },
};

export const PhoneInput: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Phone input type (tel) triggers numeric keyboard on mobile devices for easier phone number entry.',
      },
    },
  },
  args: {
    label: 'Phone',
    type: 'tel',
    placeholder: '+1 (555) 000-0000',
    leadingIcon: <Icon icon={BiPhone} size="sm" color="inherit" />,
  },
};

export const FullExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete example combining label, helper text, and leading icon for a polished user experience.',
      },
    },
  },
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'This will be your public display name',
    leadingIcon: <Icon icon={BiUser} size="sm" color="inherit" />,
  },
};

export const FullExampleError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete example in error state showing validation feedback with icon and error message.',
      },
    },
  },
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    error: true,
    helperText: 'Username is already taken',
    leadingIcon: <Icon icon={BiUser} size="sm" color="inherit" />,
  },
};

export const Required: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Required input with asterisk indicator. Use HTML5 required attribute for form validation.',
      },
    },
  },
  args: {
    label: 'Email address *',
    type: 'email',
    placeholder: 'you@example.com',
    required: true,
    helperText: 'This field is required',
  },
};

export const ReadOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Read-only input allows text selection and copy but prevents editing. Different from disabled - stays focusable.',
      },
    },
  },
  args: {
    label: 'Account ID',
    value: 'ACC-2024-00123',
    readOnly: true,
    helperText: 'This value cannot be changed',
  },
};

export const ErrorSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error state across all input sizes showing consistent validation styling.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
      <Input
        size="small"
        label="Small with error"
        placeholder="Small input"
        error
        helperText="This field has an error"
      />
      <Input
        size="default"
        label="Default with error"
        placeholder="Default input"
        error
        helperText="This field has an error"
      />
      <Input
        size="large"
        label="Large with error"
        placeholder="Large input"
        error
        helperText="This field has an error"
      />
    </div>
  ),
};

export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all three input sizes for choosing the right size for your interface.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Input size="small" placeholder="Small input" />
      <Input size="default" placeholder="Default input" />
      <Input size="large" placeholder="Large input" />
    </div>
  ),
};

export const FormExample: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete form example showing consistent styling across multiple input types with labels, icons, and helper text.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Input
        label="Full name"
        placeholder="John Doe"
        leadingIcon={<Icon icon={BiUser} size="sm" color="inherit" />}
      />
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        leadingIcon={<Icon icon={BiEnvelope} size="sm" color="inherit" />}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        helperText="Must be at least 8 characters"
        leadingIcon={<Icon icon={BiLock} size="sm" color="inherit" />}
      />
    </div>
  ),
};
