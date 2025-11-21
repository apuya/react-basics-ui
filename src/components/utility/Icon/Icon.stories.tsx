import type { Meta, StoryObj } from '@storybook/react';
import { BiHome, BiUser, BiSearch, BiHeart, BiStar, BiCheck, BiX } from 'react-icons/bi';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Utility/Icon',
  component: Icon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: ['BiHome', 'BiUser', 'BiSearch', 'BiHeart', 'BiStar', 'BiCheck', 'BiX'],
      mapping: { BiHome, BiUser, BiSearch, BiHeart, BiStar, BiCheck, BiX },
      description: 'The icon component to render',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size of the icon',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'inverse', 'disabled', 'success', 'warning', 'error', 'info', 'inherit'],
      description: 'Color of the icon',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for the icon',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// Default
export const Default: Story = {
  args: {
    icon: BiHome,
    size: 'md',
    color: 'primary',
  },
};

// Sizes
export const SizeXS: Story = {
  args: {
    icon: BiStar,
    size: 'xs',
    color: 'primary',
  },
};

export const SizeSM: Story = {
  args: {
    icon: BiStar,
    size: 'sm',
    color: 'primary',
  },
};

export const SizeMD: Story = {
  args: {
    icon: BiStar,
    size: 'md',
    color: 'primary',
  },
};

export const SizeLG: Story = {
  args: {
    icon: BiStar,
    size: 'lg',
    color: 'primary',
  },
};

export const SizeXL: Story = {
  args: {
    icon: BiStar,
    size: 'xl',
    color: 'primary',
  },
};

export const Size2XL: Story = {
  args: {
    icon: BiStar,
    size: '2xl',
    color: 'primary',
  },
};

// Colors
export const ColorPrimary: Story = {
  args: {
    icon: BiHeart,
    size: 'lg',
    color: 'primary',
  },
};

export const ColorSecondary: Story = {
  args: {
    icon: BiHeart,
    size: 'lg',
    color: 'secondary',
  },
};

export const ColorTertiary: Story = {
  args: {
    icon: BiHeart,
    size: 'lg',
    color: 'tertiary',
  },
};

export const ColorSuccess: Story = {
  args: {
    icon: BiCheck,
    size: 'lg',
    color: 'success',
  },
};

export const ColorWarning: Story = {
  args: {
    icon: BiStar,
    size: 'lg',
    color: 'warning',
  },
};

export const ColorError: Story = {
  args: {
    icon: BiX,
    size: 'lg',
    color: 'error',
  },
};

export const ColorInfo: Story = {
  args: {
    icon: BiSearch,
    size: 'lg',
    color: 'info',
  },
};

export const ColorDisabled: Story = {
  args: {
    icon: BiUser,
    size: 'lg',
    color: 'disabled',
  },
};

// Accessible
export const WithAriaLabel: Story = {
  args: {
    icon: BiSearch,
    size: 'lg',
    color: 'primary',
    'aria-label': 'Search',
  },
};

// All Sizes Grid
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Icon icon={BiStar} size="xs" color="primary" />
      <Icon icon={BiStar} size="sm" color="primary" />
      <Icon icon={BiStar} size="md" color="primary" />
      <Icon icon={BiStar} size="lg" color="primary" />
      <Icon icon={BiStar} size="xl" color="primary" />
      <Icon icon={BiStar} size="2xl" color="primary" />
    </div>
  ),
};

// All Colors Grid
export const AllColors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon icon={BiHeart} size="lg" color="primary" />
      <Icon icon={BiHeart} size="lg" color="secondary" />
      <Icon icon={BiHeart} size="lg" color="tertiary" />
      <Icon icon={BiHeart} size="lg" color="success" />
      <Icon icon={BiHeart} size="lg" color="warning" />
      <Icon icon={BiHeart} size="lg" color="error" />
      <Icon icon={BiHeart} size="lg" color="info" />
      <Icon icon={BiHeart} size="lg" color="disabled" />
    </div>
  ),
};
