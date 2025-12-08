import type { Meta, StoryObj } from '@storybook/react';
import { BiHome, BiUser, BiSearch, BiHeart, BiStar, BiCheck, BiX } from 'react-icons/bi';
import { Icon } from './Icon';
import { Flex } from '../../layout/Flex';

const meta: Meta<typeof Icon> = {
  title: 'Utility/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Icon component for displaying SVG icons from react-icons library. Supports multiple sizes, semantic colors, and accessibility features. Icons automatically inherit dimensions and can be used inline with text or standalone.',
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story: 'Default icon configuration with medium size and primary color. Use this as the baseline for most icon implementations in your application.',
      },
    },
  },
  args: {
    icon: BiHome,
    size: 'md',
    color: 'primary',
  },
};

// Sizes
export const SizeXS: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Extra small icon (16px). Use for tight spaces like table cells, compact lists, or inline with small text.',
      },
    },
  },
  args: {
    icon: BiStar,
    size: 'xs',
    color: 'primary',
  },
};

export const SizeSM: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Small icon (20px). Ideal for buttons, form inputs, and navigation items where space is limited but clarity is important.',
      },
    },
  },
  args: {
    icon: BiStar,
    size: 'sm',
    color: 'primary',
  },
};

export const SizeMD: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Medium icon (24px). The default size for most use cases including buttons, cards, and general UI elements.',
      },
    },
  },
  args: {
    icon: BiStar,
    size: 'md',
    color: 'primary',
  },
};

export const SizeLG: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Large icon (32px). Use for prominent features, headers, or when icons need to stand out as primary visual elements.',
      },
    },
  },
  args: {
    icon: BiStar,
    size: 'lg',
    color: 'primary',
  },
};

export const SizeXL: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Extra large icon (40px). Best for empty states, feature highlights, or hero sections where visual impact is needed.',
      },
    },
  },
  args: {
    icon: BiStar,
    size: 'xl',
    color: 'primary',
  },
};

export const Size2XL: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Double extra large icon (48px). Ideal for splash screens, large empty states, or decorative elements requiring maximum visibility.',
      },
    },
  },
  args: {
    icon: BiStar,
    size: '2xl',
    color: 'primary',
  },
};

// Colors
export const ColorPrimary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Primary color icon for main brand actions and key interface elements. Use for primary buttons, active states, and important features.',
      },
    },
  },
  args: {
    icon: BiHeart,
    size: 'lg',
    color: 'primary',
  },
};

export const ColorSecondary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Secondary color icon for supporting actions and alternative interface elements. Use for secondary buttons and complementary features.',
      },
    },
  },
  args: {
    icon: BiHeart,
    size: 'lg',
    color: 'secondary',
  },
};

export const ColorTertiary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Tertiary color icon for subtle, low-emphasis elements. Use for less important actions or decorative icons that should not dominate the interface.',
      },
    },
  },
  args: {
    icon: BiHeart,
    size: 'lg',
    color: 'tertiary',
  },
};

export const ColorSuccess: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Success color icon for positive feedback and confirmations. Use with checkmarks, success messages, and completion indicators.',
      },
    },
  },
  args: {
    icon: BiCheck,
    size: 'lg',
    color: 'success',
  },
};

export const ColorWarning: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Warning color icon for cautionary messages and alerts. Use to draw attention to important information that requires user awareness.',
      },
    },
  },
  args: {
    icon: BiStar,
    size: 'lg',
    color: 'warning',
  },
};

export const ColorError: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error color icon for error states and destructive actions. Use with error messages, validation failures, and delete confirmations.',
      },
    },
  },
  args: {
    icon: BiX,
    size: 'lg',
    color: 'error',
  },
};

export const ColorInfo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Info color icon for informational messages and neutral notifications. Use for help text, tooltips, and general information.',
      },
    },
  },
  args: {
    icon: BiSearch,
    size: 'lg',
    color: 'info',
  },
};

export const ColorDisabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disabled color icon for inactive or unavailable elements. Use to indicate features that are currently disabled or inaccessible.',
      },
    },
  },
  args: {
    icon: BiUser,
    size: 'lg',
    color: 'disabled',
  },
};

// Accessible
export const WithAriaLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Icon with aria-label for accessibility. Always provide aria-label when icons convey meaning without accompanying text, ensuring screen reader users understand the icon\'s purpose.',
      },
    },
  },
  args: {
    icon: BiSearch,
    size: 'lg',
    color: 'primary',
    'aria-label': 'Search',
  },
};

// All Sizes Grid
export const AllSizes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available icon sizes (xs, sm, md, lg, xl, 2xl). Use this as a reference to select the appropriate size for your specific layout needs.',
      },
    },
  },
  render: () => (
    <Flex align="end" gap="md">
      <Icon icon={BiStar} size="xs" color="primary" />
      <Icon icon={BiStar} size="sm" color="primary" />
      <Icon icon={BiStar} size="md" color="primary" />
      <Icon icon={BiStar} size="lg" color="primary" />
      <Icon icon={BiStar} size="xl" color="primary" />
      <Icon icon={BiStar} size="2xl" color="primary" />
    </Flex>
  ),
};

// All Colors Grid
export const AllColors: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all semantic color variants. Use this palette guide to maintain consistent color usage across your application based on context and meaning.',
      },
    },
  },
  render: () => (
    <Flex align="center" gap="md">
      <Icon icon={BiHeart} size="lg" color="primary" />
      <Icon icon={BiHeart} size="lg" color="secondary" />
      <Icon icon={BiHeart} size="lg" color="tertiary" />
      <Icon icon={BiHeart} size="lg" color="success" />
      <Icon icon={BiHeart} size="lg" color="warning" />
      <Icon icon={BiHeart} size="lg" color="error" />
      <Icon icon={BiHeart} size="lg" color="info" />
      <Icon icon={BiHeart} size="lg" color="disabled" />
    </Flex>
  ),
};
