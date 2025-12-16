import type { Meta, StoryObj } from '@storybook/react';
import { BiSearch, BiEnvelope, BiLock, BiDollar, BiUser } from 'react-icons/bi';
import { BaseInputField } from './BaseInputField';
import { Icon } from '@/components/utility/Icon';
import { Stack } from '@/components/layout/Stack';
import { Text } from '@/components/typography/Text';

const meta: Meta<typeof BaseInputField> = {
  title: 'Forms/BaseInputField',
  component: BaseInputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'BaseInputField is the foundational input component that all text-based input components (Input, SearchBar, AutocompleteInput) are built upon. It provides shared styling, icon positioning, and state management.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'default', 'large'] },
    variant: { control: 'select', options: ['input', 'searchbar'] },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    cssPrefix: { control: 'text' },
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof BaseInputField>;

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
    <Stack spacing="md">
      <div>
        <Text size="caption" color="secondary" weight="medium">Small</Text>
        <BaseInputField size="small" placeholder="Small input" />
      </div>
      <div>
        <Text size="caption" color="secondary" weight="medium">Default</Text>
        <BaseInputField size="default" placeholder="Default input" />
      </div>
      <div>
        <Text size="caption" color="secondary" weight="medium">Large</Text>
        <BaseInputField size="large" placeholder="Large input" />
      </div>
    </Stack>
  ),
};

// =============================================================================
// VARIANTS
// =============================================================================

export const Variants: Story = {
  render: () => (
    <Stack spacing="md">
      <div>
        <Text size="caption" color="secondary" weight="medium">Input Variant</Text>
        <BaseInputField variant="input" placeholder="Input variant" cssPrefix="input" />
      </div>
      <div>
        <Text size="caption" color="secondary" weight="medium">SearchBar Variant</Text>
        <BaseInputField variant="searchbar" placeholder="SearchBar variant" cssPrefix="searchbar" type="search" />
      </div>
    </Stack>
  ),
};

// =============================================================================
// STATES
// =============================================================================

export const States: Story = {
  render: () => (
    <Stack spacing="md">
      <div>
        <Text size="caption" color="secondary" weight="medium">Default</Text>
        <BaseInputField placeholder="Default state" />
      </div>
      <div>
        <Text size="caption" color="secondary" weight="medium">Error</Text>
        <BaseInputField placeholder="Error state" error />
      </div>
      <div>
        <Text size="caption" color="secondary" weight="medium">Disabled</Text>
        <BaseInputField placeholder="Disabled state" disabled />
      </div>
    </Stack>
  ),
};

// =============================================================================
// WITH ICONS
// =============================================================================

export const WithIcons: Story = {
  render: () => (
    <Stack spacing="md">
      <div>
        <Text size="caption" color="secondary" weight="medium">Leading Icon</Text>
        <BaseInputField
          placeholder="Search..."
          leadingIcon={<Icon icon={BiSearch} />}
        />
      </div>
      <div>
        <Text size="caption" color="secondary" weight="medium">Trailing Icon</Text>
        <BaseInputField
          placeholder="Enter email"
          trailingIcon={<Icon icon={BiEnvelope} />}
        />
      </div>
      <div>
        <Text size="caption" color="secondary" weight="medium">Both Icons</Text>
        <BaseInputField
          placeholder="Username"
          leadingIcon={<Icon icon={BiUser} />}
          trailingIcon={<Icon icon={BiLock} />}
        />
      </div>
    </Stack>
  ),
};

// =============================================================================
// WITH SUFFIX
// =============================================================================

export const WithSuffix: Story = {
  render: () => (
    <Stack spacing="md">
      <div>
        <Text size="caption" color="secondary" weight="medium">Currency</Text>
        <BaseInputField
          placeholder="0.00"
          leadingIcon={<Icon icon={BiDollar} />}
          suffix="USD"
        />
      </div>
      <div>
        <Text size="caption" color="secondary" weight="medium">Weight</Text>
        <BaseInputField
          placeholder="Enter weight"
          suffix="kg"
        />
      </div>
      <div>
        <Text size="caption" color="secondary" weight="medium">Percentage</Text>
        <BaseInputField
          placeholder="Enter percentage"
          suffix="%"
        />
      </div>
    </Stack>
  ),
};

// =============================================================================
// COMBINATIONS
// =============================================================================

export const AllCombinations: Story = {
  render: () => (
    <Stack spacing="md">
      <div>
        <Text size="caption" color="secondary" weight="medium">Small + Icon + Error</Text>
        <BaseInputField
          size="small"
          placeholder="Small with icon"
          leadingIcon={<Icon icon={BiSearch} />}
          error
        />
      </div>
      <div>
        <Text size="caption" color="secondary" weight="medium">Default + Suffix + Disabled</Text>
        <BaseInputField
          placeholder="Enter amount"
          suffix="USD"
          disabled
        />
      </div>
      <div>
        <Text size="caption" color="secondary" weight="medium">Large + Both Icons</Text>
        <BaseInputField
          size="large"
          placeholder="Username"
          leadingIcon={<Icon icon={BiUser} />}
          trailingIcon={<Icon icon={BiLock} />}
        />
      </div>
    </Stack>
  ),
};

// =============================================================================
// INTERACTIVE
// =============================================================================

export const Interactive: Story = {
  args: {
    placeholder: 'Try me...',
    size: 'default',
    variant: 'input',
    error: false,
    disabled: false,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Pre-filled value',
    placeholder: 'Enter text...',
  },
};

export const TypeVariations: Story = {
  render: () => (
    <Stack spacing="md">
      <div>
        <Text size="caption" color="secondary" weight="medium">Text</Text>
        <BaseInputField type="text" placeholder="Enter text" />
      </div>
      <div>
        <Text size="caption" color="secondary" weight="medium">Email</Text>
        <BaseInputField type="email" placeholder="email@example.com" />
      </div>
      <div>
        <Text size="caption" color="secondary" weight="medium">Password</Text>
        <BaseInputField type="password" placeholder="Enter password" />
      </div>
      <div>
        <Text size="caption" color="secondary" weight="medium">Number</Text>
        <BaseInputField type="number" placeholder="Enter number" />
      </div>
      <div>
        <Text size="caption" color="secondary" weight="medium">Search</Text>
        <BaseInputField type="search" placeholder="Search..." variant="searchbar" cssPrefix="searchbar" />
      </div>
    </Stack>
  ),
};
