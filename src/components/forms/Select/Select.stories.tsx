import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BiStar, BiUser, BiFolder } from 'react-icons/bi';
import { Select } from './Select';
import { FormField } from '@/components/forms/FormField';
import { Box } from '@/components/layout/Box';
import { Stack } from '@/components/layout/Stack';
import { Heading } from '@/components/typography/Heading';
import { Text } from '@/components/typography/Text';
import { Icon } from '@/components/utility/Icon';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Custom select with compound pattern: Select.Trigger, Select.Menu, Select.Option. Supports controlled/uncontrolled modes, sizes, error states, keyboard navigation, and custom option content. Use with FormField for labels and helper text.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'default', 'large'] },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  decorators: [(Story) => <Box w="600px" minH="450px"><Story /></Box>],
};

export default meta;
type Story = StoryObj<typeof Select>;

// =============================================================================
// DEFAULT
// =============================================================================

export const Default: Story = {
  render: () => (
    <Select>
      <Select.Trigger placeholder="Select an option..." />
      <Select.Menu>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
        <Select.Option value="option3">Option 3</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// ALL SIZES
// =============================================================================

export const AllSizes: Story = {
  render: () => (
    <Stack spacing="md">
      <FormField label="Small">
        <Select size="small">
          <Select.Trigger placeholder="Small select..." />
          <Select.Menu>
            <Select.Option value="1">Option 1</Select.Option>
            <Select.Option value="2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      </FormField>
      <FormField label="Default">
        <Select size="default">
          <Select.Trigger placeholder="Default select..." />
          <Select.Menu>
            <Select.Option value="1">Option 1</Select.Option>
            <Select.Option value="2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      </FormField>
      <FormField label="Large">
        <Select size="large">
          <Select.Trigger placeholder="Large select..." />
          <Select.Menu>
            <Select.Option value="1">Option 1</Select.Option>
            <Select.Option value="2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      </FormField>
    </Stack>
  ),
};

// =============================================================================
// STATES
// =============================================================================

export const States: Story = {
  render: () => (
    <Stack spacing="lg">
      <Stack spacing="xs">
        <Heading level="h6">Disabled</Heading>
        <Select disabled>
          <Select.Trigger placeholder="Disabled select..." />
          <Select.Menu>
            <Select.Option value="1">Option 1</Select.Option>
          </Select.Menu>
        </Select>
      </Stack>
      <Stack spacing="xs">
        <Heading level="h6">Error</Heading>
        <FormField label="Category" helperText="This field is required" error>
          <Select error>
            <Select.Trigger placeholder="Select a category..." />
            <Select.Menu>
              <Select.Option value="tech">Technology</Select.Option>
              <Select.Option value="design">Design</Select.Option>
            </Select.Menu>
          </Select>
        </FormField>
      </Stack>
    </Stack>
  ),
};

// =============================================================================
// WITH LABEL & HELPER
// =============================================================================

export const WithLabelAndHelper: Story = {
  render: () => (
    <Stack spacing="md">
      <FormField label="Country">
        <Select>
          <Select.Trigger placeholder="Select a country..." />
          <Select.Menu>
            <Select.Option value="us">United States</Select.Option>
            <Select.Option value="ca">Canada</Select.Option>
            <Select.Option value="uk">United Kingdom</Select.Option>
          </Select.Menu>
        </Select>
      </FormField>
      <FormField label="Plan" helperText="Choose the plan that works best for you">
        <Select>
          <Select.Trigger placeholder="Select a plan..." />
          <Select.Menu>
            <Select.Option value="free">Free</Select.Option>
            <Select.Option value="pro">Pro</Select.Option>
            <Select.Option value="enterprise">Enterprise</Select.Option>
          </Select.Menu>
        </Select>
      </FormField>
    </Stack>
  ),
};

// =============================================================================
// CONTROLLED
// =============================================================================

export const Controlled: Story = {
  render: function ControlledSelect() {
    const [value, setValue] = useState('');
    return (
      <Stack spacing="sm">
        <FormField 
          label="Fruit"
          helperText={value ? `Selected: ${value}` : 'No selection'}
        >
          <Select value={value} onChange={setValue}>
            <Select.Trigger placeholder="Select a fruit..." />
            <Select.Menu>
              <Select.Option value="apple">Apple</Select.Option>
              <Select.Option value="banana">Banana</Select.Option>
              <Select.Option value="cherry">Cherry</Select.Option>
            </Select.Menu>
          </Select>
        </FormField>
        {value && (
          <Text size="small" color="secondary">
            Current value: <Text as="span" weight="semibold">{value}</Text>
          </Text>
        )}
      </Stack>
    );
  },
};

// =============================================================================
// WITH DISABLED OPTIONS
// =============================================================================

export const WithDisabledOptions: Story = {
  decorators: [(Story) => <Box w="600px" minH="500px"><Story /></Box>],
  render: () => (
    <FormField label="Status">
      <Select>
        <Select.Trigger placeholder="Select status..." />
        <Select.Menu>
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="pending" disabled>Pending (unavailable)</Select.Option>
          <Select.Option value="inactive">Inactive</Select.Option>
          <Select.Option value="archived" disabled>Archived (unavailable)</Select.Option>
        </Select.Menu>
      </Select>
    </FormField>
  ),
};

// =============================================================================
// SCROLLABLE MENU (Many Options)
// =============================================================================

export const ScrollableMenu: Story = {
  decorators: [(Story) => <Box w="600px" minH="550px"><Story /></Box>],
  render: () => (
    <FormField label="Month" helperText="Select a month from the list">
      <Select>
        <Select.Trigger placeholder="Select a month..." />
        <Select.Menu className="max-h-48 overflow-y-auto">
          <Select.Option value="jan">January</Select.Option>
          <Select.Option value="feb">February</Select.Option>
          <Select.Option value="mar">March</Select.Option>
          <Select.Option value="apr">April</Select.Option>
          <Select.Option value="may">May</Select.Option>
          <Select.Option value="jun">June</Select.Option>
          <Select.Option value="jul">July</Select.Option>
          <Select.Option value="aug">August</Select.Option>
          <Select.Option value="sep">September</Select.Option>
          <Select.Option value="oct">October</Select.Option>
          <Select.Option value="nov">November</Select.Option>
          <Select.Option value="dec">December</Select.Option>
        </Select.Menu>
      </Select>
    </FormField>
  ),
};

// =============================================================================
// WITH CUSTOM CONTENT (Icons)
// =============================================================================

export const WithIcons: Story = {
  decorators: [(Story) => <Box w="600px" minH="500px"><Story /></Box>],
  render: () => (
    <FormField label="Category" helperText="Choose a category with icon">
      <Select>
        <Select.Trigger placeholder="Select category..." />
        <Select.Menu>
          <Select.Option value="user">
            <Stack spacing="sm" direction="row" align="center">
              <Icon icon={BiUser} size="sm" aria-hidden />
              <Text>Users</Text>
            </Stack>
          </Select.Option>
          <Select.Option value="folder">
            <Stack spacing="sm" direction="row" align="center">
              <Icon icon={BiFolder} size="sm" aria-hidden />
              <Text>Documents</Text>
            </Stack>
          </Select.Option>
          <Select.Option value="star">
            <Stack spacing="sm" direction="row" align="center">
              <Icon icon={BiStar} size="sm" aria-hidden />
              <Text>Favorites</Text>
            </Stack>
          </Select.Option>
        </Select.Menu>
      </Select>
    </FormField>
  ),
};

// =============================================================================
// WITH DESCRIPTIONS
// =============================================================================

export const WithDescriptions: Story = {
  decorators: [(Story) => <Box w="600px" minH="600px"><Story /></Box>],
  render: () => (
    <FormField label="Plan" helperText="Choose your subscription plan">
      <Select>
        <Select.Trigger placeholder="Select a plan..." />
        <Select.Menu>
          <Select.Option value="free">
            <Stack spacing="xs" direction="column">
              <Text weight="medium">Free</Text>
              <Text size="xs" color="secondary">Up to 5 users</Text>
            </Stack>
          </Select.Option>
          <Select.Option value="pro">
            <Stack spacing="xs" direction="column">
              <Text weight="medium">Pro</Text>
              <Text size="xs" color="secondary">Up to 25 users</Text>
            </Stack>
          </Select.Option>
          <Select.Option value="enterprise">
            <Stack spacing="xs" direction="column">
              <Text weight="medium">Enterprise</Text>
              <Text size="xs" color="secondary">Unlimited users</Text>
            </Stack>
          </Select.Option>
        </Select.Menu>
      </Select>
    </FormField>
  ),
};

// =============================================================================
// LONG OPTION TEXT
// =============================================================================

export const LongOptionText: Story = {
  decorators: [(Story) => <Box w="700px" minH="500px"><Story /></Box>],
  render: () => (
    <FormField label="Department">
      <Select>
        <Select.Trigger placeholder="Select department..." />
        <Select.Menu>
          <Select.Option value="eng">Engineering & Product Development</Select.Option>
          <Select.Option value="marketing">Marketing & Communications</Select.Option>
          <Select.Option value="hr">Human Resources & Administration</Select.Option>
        </Select.Menu>
      </Select>
    </FormField>
  ),
};

// =============================================================================
// CUSTOM PLACEHOLDER
// =============================================================================

export const CustomPlaceholder: Story = {
  render: () => (
    <Select>
      <Select.Trigger placeholder="🍎 Choose your favorite fruit..." />
      <Select.Menu>
        <Select.Option value="apple">🍎 Apple</Select.Option>
        <Select.Option value="banana">🍌 Banana</Select.Option>
        <Select.Option value="cherry">🍒 Cherry</Select.Option>
        <Select.Option value="grape">🍇 Grape</Select.Option>
      </Select.Menu>
    </Select>
  ),
};

// =============================================================================
// STANDALONE (WITHOUT FORMFIELD)
// =============================================================================

export const Standalone: Story = {
  render: () => (
    <Stack spacing="md">
      <Heading level="h6">Select without FormField wrapper</Heading>
      <Select>
        <Select.Trigger placeholder="Standalone select..." />
        <Select.Menu>
          <Select.Option value="option1">Option 1</Select.Option>
          <Select.Option value="option2">Option 2</Select.Option>
          <Select.Option value="option3">Option 3</Select.Option>
        </Select.Menu>
      </Select>
      <Text size="small" color="secondary">
        Use Select alone when you don't need labels or helper text.
      </Text>
    </Stack>
  ),
};

// =============================================================================
// COMPOSITION PATTERNS
// =============================================================================

export const CompositionPatterns: Story = {
  decorators: [(Story) => <Box w="600px" minH="1400px"><Story /></Box>],
  render: () => (
    <Stack spacing="lg">
      <Heading level="h6">Select Composition Examples</Heading>
      
      {/* Pure compound - no FormField */}
      <Stack spacing="xs">
        <Text size="small" weight="semibold">Pure Compound (no label)</Text>
        <Select>
          <Select.Trigger placeholder="Just the select..." />
          <Select.Menu>
            <Select.Option value="1">Option 1</Select.Option>
            <Select.Option value="2">Option 2</Select.Option>
          </Select.Menu>
        </Select>
      </Stack>

      {/* With FormField - label only */}
      <Stack spacing="xs">
        <Text size="small" weight="semibold">With Label</Text>
        <FormField label="Category">
          <Select>
            <Select.Trigger placeholder="Select category..." />
            <Select.Menu>
              <Select.Option value="tech">Technology</Select.Option>
              <Select.Option value="design">Design</Select.Option>
            </Select.Menu>
          </Select>
        </FormField>
      </Stack>

      {/* With FormField - label + helper */}
      <Stack spacing="xs">
        <Text size="small" weight="semibold">With Label + Helper</Text>
        <FormField label="Priority" helperText="Choose the urgency level">
          <Select>
            <Select.Trigger placeholder="Select priority..." />
            <Select.Menu>
              <Select.Option value="low">Low</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="high">High</Select.Option>
            </Select.Menu>
          </Select>
        </FormField>
      </Stack>

      {/* With FormField - error state */}
      <Stack spacing="xs">
        <Text size="small" weight="semibold">With Error</Text>
        <FormField label="Department" helperText="This field is required" error>
          <Select error>
            <Select.Trigger placeholder="Select department..." />
            <Select.Menu>
              <Select.Option value="eng">Engineering</Select.Option>
              <Select.Option value="sales">Sales</Select.Option>
            </Select.Menu>
          </Select>
        </FormField>
      </Stack>
    </Stack>
  ),
};
