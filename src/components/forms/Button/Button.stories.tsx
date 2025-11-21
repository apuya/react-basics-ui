import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Forms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'destructive'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'default'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Variant Stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive Button',
  },
};

// Size Stories
export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Default: Story = {
  args: {
    size: 'default',
    children: 'Default Button',
  },
};

// State Stories
export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// Icon Stories
export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: '→',
    children: 'With Leading Icon',
  },
};

export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: '←',
    children: 'With Trailing Icon',
  },
};

export const WithBothIcons: Story = {
  args: {
    leadingIcon: '→',
    trailingIcon: '←',
    children: 'Both Icons',
  },
};

// Combination Stories
export const SmallPrimary: Story = {
  args: {
    size: 'small',
    variant: 'primary',
    children: 'Small Primary',
  },
};

export const SmallSecondary: Story = {
  args: {
    size: 'small',
    variant: 'secondary',
    children: 'Small Secondary',
  },
};

export const LoadingWithIcon: Story = {
  args: {
    isLoading: true,
    leadingIcon: '→',
    children: 'Loading with Icon',
  },
};
