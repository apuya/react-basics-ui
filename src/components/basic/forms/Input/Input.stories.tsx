import type { Meta, StoryObj } from '@storybook/react';
import { BiSearch, BiEnvelope, BiLock, BiUser, BiPhone, BiX } from 'react-icons/bi';
import { Input } from './Input';
import { Icon } from '../../utility/Icon';
import { Stack } from '../../layout/Stack';
import { Flex } from '../../layout/Flex';
import { Text } from '../../typography/Text';

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Input component for text entry with support for different sizes, icons, labels, helper text, suffix units, and error states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'default', 'large'] },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    suffix: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'tel', 'url'] },
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Input>;

// =============================================================================
// BASIC
// =============================================================================

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const AllSizes: Story = {
  render: () => (
    <Stack gap="md">
      <Input size="small" placeholder="Small input" label="Small" />
      <Input size="default" placeholder="Default input" label="Default" />
      <Input size="large" placeholder="Large input" label="Large" />
    </Stack>
  ),
};

// =============================================================================
// STATES
// =============================================================================

export const States: Story = {
  render: () => (
    <Stack gap="lg">
      <Stack gap="xs">
        <Text size="caption" color="secondary" weight="medium">With Label & Helper</Text>
        <Input
          label="Email address"
          placeholder="you@example.com"
          helperText="We'll never share your email"
        />
      </Stack>
      <Stack gap="xs">
        <Text size="caption" color="secondary" weight="medium">Error</Text>
        <Input
          label="Email"
          placeholder="you@example.com"
          error
          helperText="Please enter a valid email address"
        />
      </Stack>
      <Stack gap="xs">
        <Text size="caption" color="secondary" weight="medium">Disabled</Text>
        <Input label="Username" value="johndoe" disabled />
      </Stack>
      <Stack gap="xs">
        <Text size="caption" color="secondary" weight="medium">Read Only</Text>
        <Input
          label="Account ID"
          value="ACC-2024-00123"
          readOnly
          helperText="This value cannot be changed"
        />
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// WITH ICONS
// =============================================================================

export const WithIcons: Story = {
  render: () => (
    <Stack gap="md">
      <Stack gap="xs">
        <Text size="caption" color="secondary">Leading Icon</Text>
        <Input
          placeholder="Search..."
          leadingIcon={<Icon icon={BiSearch} size="sm" color="inherit" />}
        />
      </Stack>
      <Stack gap="xs">
        <Text size="caption" color="secondary">Trailing Icon</Text>
        <Input
          placeholder="you@example.com"
          trailingIcon={<Icon icon={BiEnvelope} size="sm" color="inherit" />}
        />
      </Stack>
      <Stack gap="xs">
        <Text size="caption" color="secondary">Both Icons</Text>
        <Input
          placeholder="Search..."
          leadingIcon={<Icon icon={BiSearch} size="sm" color="inherit" />}
          trailingIcon={<Icon icon={BiX} size="sm" color="inherit" />}
        />
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// WITH SUFFIX (UNIT LABELS)
// =============================================================================

export const WithSuffix: Story = {
  render: () => (
    <Stack gap="md">
      <Stack gap="xs">
        <Text size="caption" color="secondary" weight="medium">Weight</Text>
        <Flex gap="sm">
          <Input type="number" placeholder="0" suffix="kg" label="Kilograms" />
          <Input type="number" placeholder="0" suffix="lbs" label="Pounds" />
        </Flex>
      </Stack>
      <Stack gap="xs">
        <Text size="caption" color="secondary" weight="medium">Dimensions</Text>
        <Flex gap="sm">
          <Input type="number" placeholder="0" suffix="cm" label="Width" />
          <Input type="number" placeholder="0" suffix="cm" label="Height" />
        </Flex>
      </Stack>
      <Stack gap="xs">
        <Text size="caption" color="secondary" weight="medium">Currency & Percentage</Text>
        <Flex gap="sm">
          <Input type="number" placeholder="0.00" suffix="USD" label="Price" />
          <Input type="number" placeholder="0" suffix="%" label="Discount" />
        </Flex>
      </Stack>
      <Stack gap="xs">
        <Text size="caption" color="secondary" weight="medium">Time</Text>
        <Flex gap="sm">
          <Input type="number" placeholder="0" suffix="hrs" label="Hours" />
          <Input type="number" placeholder="0" suffix="min" label="Minutes" />
        </Flex>
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use the `suffix` prop to display unit labels inside the input, aligned to the right. Common use cases include measurements, currency, and time units.',
      },
    },
  },
};

// =============================================================================
// INPUT TYPES
// =============================================================================

export const InputTypes: Story = {
  render: () => (
    <Stack gap="md">
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
        leadingIcon={<Icon icon={BiLock} size="sm" color="inherit" />}
        helperText="Must be at least 8 characters"
      />
      <Input
        label="Phone"
        type="tel"
        placeholder="+1 (555) 000-0000"
        leadingIcon={<Icon icon={BiPhone} size="sm" color="inherit" />}
      />
    </Stack>
  ),
};

// =============================================================================
// FORM EXAMPLE
// =============================================================================

export const FormExample: Story = {
  render: () => (
    <Stack gap="md">
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
    </Stack>
  ),
};
