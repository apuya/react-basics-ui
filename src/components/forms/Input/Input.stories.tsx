import type { Meta, StoryObj } from '@storybook/react';
import { BiSearch, BiEnvelope, BiLock, BiUser, BiPhone, BiX } from 'react-icons/bi';
import { Input } from './Input';
import { Icon } from '@/components/utility/Icon';

const meta: Meta<typeof Input> = {
  title: 'Components/Forms/Input',
  component: Input,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
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

// Default
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

// Sizes
export const SizeSmall: Story = {
  args: {
    size: 'small',
    placeholder: 'Small input',
  },
};

export const SizeMedium: Story = {
  args: {
    size: 'medium',
    placeholder: 'Medium input',
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'large',
    placeholder: 'Large input',
  },
};

// With Label
export const WithLabel: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

// With Helper Text
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
  },
};

// Error State
export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    error: true,
    helperText: 'Please enter a valid email address',
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    disabled: true,
  },
};

export const DisabledWithValue: Story = {
  args: {
    label: 'Username',
    value: 'johndoe',
    disabled: true,
  },
};

// With Icons
export const WithLeadingIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    leadingIcon: <Icon icon={BiSearch} size="sm" color="inherit" />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    trailingIcon: <Icon icon={BiEnvelope} size="sm" color="inherit" />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Search users',
    placeholder: 'Search...',
    leadingIcon: <Icon icon={BiSearch} size="sm" color="inherit" />,
    trailingIcon: <Icon icon={BiX} size="sm" color="inherit" />,
  },
};

// Input Types
export const EmailInput: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    leadingIcon: <Icon icon={BiEnvelope} size="sm" color="inherit" />,
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    leadingIcon: <Icon icon={BiLock} size="sm" color="inherit" />,
  },
};

export const PhoneInput: Story = {
  args: {
    label: 'Phone',
    type: 'tel',
    placeholder: '+1 (555) 000-0000',
    leadingIcon: <Icon icon={BiPhone} size="sm" color="inherit" />,
  },
};

// Combinations
export const FullExample: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'This will be your public display name',
    leadingIcon: <Icon icon={BiUser} size="sm" color="inherit" />,
  },
};

export const FullExampleError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    error: true,
    helperText: 'Username is already taken',
    leadingIcon: <Icon icon={BiUser} size="sm" color="inherit" />,
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input size="small" placeholder="Small input" />
      <Input size="medium" placeholder="Medium input" />
      <Input size="large" placeholder="Large input" />
    </div>
  ),
};

// Form Example
export const FormExample: Story = {
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
