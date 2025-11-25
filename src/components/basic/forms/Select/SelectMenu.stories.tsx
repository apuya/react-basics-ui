import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select.Menu> = {
  title: 'Forms/Select/Menu',
  component: Select.Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The dropdown menu container that holds the select options. Supports keyboard navigation and click outside to close.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: '320px' }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Select.Menu>;

export const Default: Story = {
  render: () => (
    <Select>
      <Select.Trigger placeholder="Click to open menu..." />
      <Select.Menu>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
        <Select.Option value="3">Option 3</Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default menu with multiple options.',
      },
    },
  },
};

export const ManyOptions: Story = {
  render: () => (
    <Select>
      <Select.Trigger placeholder="Many options..." />
      <Select.Menu className="max-h-48 overflow-y-auto">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
        <Select.Option value="3">Option 3</Select.Option>
        <Select.Option value="4">Option 4</Select.Option>
        <Select.Option value="5">Option 5</Select.Option>
        <Select.Option value="6">Option 6</Select.Option>
        <Select.Option value="7">Option 7</Select.Option>
        <Select.Option value="8">Option 8</Select.Option>
        <Select.Option value="9">Option 9</Select.Option>
        <Select.Option value="10">Option 10</Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Scrollable menu with many options.',
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <Select>
      <Select.Trigger placeholder="Custom styled menu..." />
      <Select.Menu className="border-2 border-purple-500 shadow-xl">
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
        <Select.Option value="3">Option 3</Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu with custom border and shadow styling.',
      },
    },
  },
};

export const WithMixedOptions: Story = {
  render: () => (
    <Select>
      <Select.Trigger placeholder="Mixed options..." />
      <Select.Menu>
        <Select.Option value="active1">Active Option 1</Select.Option>
        <Select.Option value="disabled1" disabled>Disabled Option</Select.Option>
        <Select.Option value="active2">Active Option 2</Select.Option>
        <Select.Option value="disabled2" disabled>Another Disabled</Select.Option>
        <Select.Option value="active3">Active Option 3</Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu containing both enabled and disabled options.',
      },
    },
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <Select>
      <Select.Trigger placeholder="Use arrow keys to navigate..." />
      <Select.Menu>
        <Select.Option value="home">Home (Home key)</Select.Option>
        <Select.Option value="up">Up (Arrow Up)</Select.Option>
        <Select.Option value="down">Down (Arrow Down)</Select.Option>
        <Select.Option value="end">End (End key)</Select.Option>
      </Select.Menu>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Menu supports full keyboard navigation with arrow keys, Home, and End.',
      },
    },
  },
};
