import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';
import { Stack } from '../../layout/Stack';
import { Flex } from '../../layout/Flex';
import { Text } from '../../typography/Text';
import { Heading } from '../../typography/Heading';

const meta: Meta<typeof Radio> = {
  title: 'Forms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Radio buttons allow users to select a single option from a set of mutually exclusive choices. Always use within a group with a shared name attribute.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'default', 'large'] },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    name: { control: 'text' },
    value: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// ============================================================================
// Basic Examples
// ============================================================================

export const Default: Story = {
  args: {
    label: 'Option',
    name: 'default',
    value: 'option',
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing="sm">
      <Radio size="small" name="sizes-sm" label="Small" defaultChecked />
      <Radio size="default" name="sizes-md" label="Default" defaultChecked />
      <Radio size="large" name="sizes-lg" label="Large" defaultChecked />
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack spacing="sm">
      <Radio name="states-1" value="unchecked" label="Unchecked" />
      <Radio name="states-2" value="checked" label="Checked" defaultChecked />
      <Radio name="states-3" value="disabled" label="Disabled" disabled />
      <Radio name="states-4" value="disabled-checked" label="Disabled Checked" disabled defaultChecked />
    </Stack>
  ),
};

// ============================================================================
// Layout Patterns
// ============================================================================

export const RadioGroupVertical: Story = {
  render: () => (
    <Stack spacing="sm">
      <Radio name="plan" value="free" label="Free" defaultChecked />
      <Radio name="plan" value="pro" label="Pro" />
      <Radio name="plan" value="enterprise" label="Enterprise" />
    </Stack>
  ),
};

export const RadioGroupHorizontal: Story = {
  render: () => (
    <Flex className="gap-6">
      <Radio name="size" value="small" label="Small" defaultChecked />
      <Radio name="size" value="medium" label="Medium" />
      <Radio name="size" value="large" label="Large" />
    </Flex>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <Stack spacing="lg">
      <Heading level="h4">Select a plan</Heading>
      <Stack spacing="md">
        {[
          { value: 'free', title: 'Free', desc: 'Basic features for personal use', checked: true },
          { value: 'pro', title: 'Pro - $9/month', desc: 'Advanced features for professionals', checked: false },
          { value: 'enterprise', title: 'Enterprise - $29/month', desc: 'Custom solutions for large teams', checked: false },
        ].map(({ value, title, desc, checked }) => (
          <Flex key={value} align="start" className="gap-3">
            <Radio name="plan-desc" value={value} defaultChecked={checked} aria-label={title} />
            <Stack spacing="none">
              <Text size="small" weight="medium">{title}</Text>
              <Text size="caption" color="secondary">{desc}</Text>
            </Stack>
          </Flex>
        ))}
      </Stack>
    </Stack>
  ),
};
