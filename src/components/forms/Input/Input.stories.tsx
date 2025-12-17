import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BiSearch, BiEnvelope, BiLock, BiUser, BiPhone, BiDollar } from 'react-icons/bi';
import { Input } from './Input';
import { Icon } from '@/components/utility/Icon';
import { Stack } from '@/components/layout/Stack';
import { Button } from '@/components/actions/Button';

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Input is a complete form input component with **label**, **helper text**, and **validation** support.

## Key Features
- **Labels & Helper Text** — Automatically integrated with FormField
- **Icons** — Leading and trailing icon support
- **Suffix Units** — Display units (kg, USD, %) inside the input
- **Validation States** — Error, disabled, readonly
- **Multiple Sizes** — Small, default, large
- **Input Types** — Text, email, password, number, tel, url, etc.

## Built On
Uses **BaseInputField** for core input rendering and **FormField** for labels/helper text.

## Common Use Cases
- Text entry fields
- Email/password inputs
- Numeric inputs with units
- Search fields (see SearchBar for dedicated search component)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Size variant of the input',
      table: { defaultValue: { summary: 'default' } },
    },
    error: {
      control: 'boolean',
      description: 'Shows error state. When true with helperText, shows as error message.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below input. Shows as error when error=true.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    leadingIcon: {
      description: 'Icon displayed at the start of the input',
      control: false,
    },
    trailingIcon: {
      description: 'Icon displayed at the end of the input',
      control: false,
    },
    suffix: {
      control: 'text',
      description: 'Suffix text displayed inside input (e.g., "kg", "USD", "%")',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'HTML input type',
      table: { defaultValue: { summary: 'text' } },
    },
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * Playground story provides interactive controls to test all Input props.
 * Use the controls panel to adjust label, size, error state, and other options.
 */
export const Playground: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
    helperText: 'This is helper text',
    size: 'default',
    error: false,
    disabled: false,
  },
};

/**
 * Basic input with just a placeholder.
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

/**
 * Input with label and helper text provides context and guidance to users.
 */
export const WithLabelAndHelper: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'Must be at least 3 characters',
  },
};

/**
 * Inputs support three sizes: small, default, and large.
 */
export const Sizes: Story = {
  render: () => (
    <Stack direction="vertical" spacing={4}>
      <Input size="small" label="Small" placeholder="Small input" />
      <Input size="default" label="Default" placeholder="Default input" />
      <Input size="large" label="Large" placeholder="Large input" />
    </Stack>
  ),
};

/**
 * Input states for validation and interaction feedback.
 * Error state shows helperText as an error message.
 */
export const States: Story = {
  render: () => (
    <Stack direction="vertical" spacing={4}>
      <Input label="Default" placeholder="Default state" />
      <Input label="Error" placeholder="Enter text" error helperText="This field is required" />
      <Input label="Disabled" placeholder="Cannot edit" disabled value="Disabled value" />
      <Input label="Read Only" placeholder="Read only" value="Read-only value" readOnly />
    </Stack>
  ),
};

/**
 * Leading and trailing icons enhance input meaning and functionality.
 * Icons are rendered using the Icon component for consistent sizing.
 */
export const WithIcons: Story = {
  render: () => (
    <Stack direction="vertical" spacing={4}>
      <Input
        label="Email"
        type="email"
        placeholder="email@example.com"
        leadingIcon={<Icon icon={BiEnvelope} size="sm" color="inherit" />}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        leadingIcon={<Icon icon={BiLock} size="sm" color="inherit" />}
      />
      <Input
        label="Search"
        placeholder="Search..."
        leadingIcon={<Icon icon={BiSearch} size="sm" color="inherit" />}
      />
      <Input
        label="Both Icons"
        placeholder="Username"
        leadingIcon={<Icon icon={BiUser} size="sm" color="inherit" />}
        trailingIcon={<Icon icon={BiPhone} size="sm" color="inherit" />}
      />
    </Stack>
  ),
};

/**
 * Suffix text displays units or labels inside the input field.
 * Useful for measurements, currencies, or percentages.
 */
export const WithSuffix: Story = {
  render: () => (
    <Stack direction="vertical" spacing={4}>
      <Input label="Weight" placeholder="0" suffix="kg" type="number" />
      <Input label="Price" placeholder="0.00" suffix="USD" type="number" />
      <Input label="Discount" placeholder="0" suffix="%" type="number" />
    </Stack>
  ),
};

/**
 * Different HTML input types for specific data entry scenarios.
 */
export const InputTypes: Story = {
  render: () => (
    <Stack direction="vertical" spacing={4}>
      <Input label="Text" type="text" placeholder="Plain text" />
      <Input label="Email" type="email" placeholder="email@example.com" />
      <Input label="Password" type="password" placeholder="Password" />
      <Input label="Number" type="number" placeholder="0" />
      <Input label="Phone" type="tel" placeholder="(555) 123-4567" />
      <Input label="URL" type="url" placeholder="https://example.com" />
    </Stack>
  ),
};

/**
 * Complete sign-up form demonstrating real-world usage with icons,
 * validation states, and controlled components.
 */
export const SignUpForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      password: '',
    });
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, boolean> = {};
      
      if (!formData.name) newErrors.name = true;
      if (!formData.email) newErrors.email = true;
      if (!formData.password || formData.password.length < 8) newErrors.password = true;

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
      }
    };

    return (
      <form onSubmit={handleSubmit} style={{ width: 320 }}>
        <Stack direction="vertical" spacing={4}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            leadingIcon={<Icon icon={BiUser} size="sm" color="inherit" />}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            helperText={errors.name ? 'Name is required' : ''}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            leadingIcon={<Icon icon={BiEnvelope} size="sm" color="inherit" />}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            helperText={errors.email ? 'Email is required' : "We'll never share your email"}
            required
          />
          <Input
            label="Phone"
            type="tel"
            placeholder="(555) 123-4567"
            leadingIcon={<Icon icon={BiPhone} size="sm" color="inherit" />}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            helperText="Optional"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            leadingIcon={<Icon icon={BiLock} size="sm" color="inherit" />}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            helperText={errors.password ? 'Password must be at least 8 characters' : 'At least 8 characters'}
            required
          />
          <Button type="submit" variant="primary" block>
            Sign Up
          </Button>
        </Stack>
      </form>
    );
  },
};

/**
 * Checkout form with suffix units for pricing.
 * Demonstrates how to combine icons and suffixes for specialized inputs.
 */
export const CheckoutForm: Story = {
  render: () => {
    const [amount, setAmount] = useState('99.99');
    const [tip, setTip] = useState('15');

    return (
      <div style={{ width: 320 }}>
        <Stack direction="vertical" spacing={4}>
          <Input
            label="Order Total"
            type="number"
            placeholder="0.00"
            suffix="USD"
            leadingIcon={<Icon icon={BiDollar} size="sm" color="inherit" />}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            helperText="Base order amount"
          />
          <Input
            label="Tip"
            type="number"
            placeholder="0"
            suffix="%"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            helperText="Optional gratuity"
          />
          <Input
            label="Total"
            type="number"
            value={(parseFloat(amount) * (1 + parseFloat(tip) / 100)).toFixed(2)}
            suffix="USD"
            readOnly
            helperText="Final amount to charge"
          />
          <Button variant="primary" block>
            Complete Purchase
          </Button>
        </Stack>
      </div>
    );
  },
};
