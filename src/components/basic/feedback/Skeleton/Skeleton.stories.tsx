import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A skeleton loading placeholder component that displays during content loading states.

## Features
- **Multiple Variants** - Rectangle, rounded, circle, and text shapes
- **Animations** - Pulse and wave animations with option to disable
- **Flexible Sizing** - Custom width and height with CSS units or numbers
- **Text Lines** - Support for multiple text line skeletons
- **Accessible** - Includes proper ARIA attributes for loading states

## Usage
\`\`\`tsx
import { Skeleton } from '@/components/basic/feedback/Skeleton';

// Basic rectangle
<Skeleton width={200} height={100} />

// Circle avatar
<Skeleton variant="circle" width={40} height={40} />

// Text lines
<Skeleton variant="text" count={3} />

// Wave animation
<Skeleton animation="wave" width="100%" height={200} />
\`\`\`

## When to Use
- Loading states for content
- Placeholder for images, text, or cards
- Improving perceived performance
- Progressive content loading
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['rectangle', 'rounded', 'circle', 'text'],
      description: 'The visual variant of the skeleton',
      table: {
        defaultValue: { summary: 'rectangle' },
      },
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none', false],
      description: 'The animation type',
      table: {
        defaultValue: { summary: 'pulse' },
      },
    },
    width: {
      control: 'text',
      description: 'Width of the skeleton (CSS units or number for px)',
    },
    height: {
      control: 'text',
      description: 'Height of the skeleton (CSS units or number for px)',
    },
    count: {
      control: 'number',
      description: 'Number of lines (only for text variant)',
      table: {
        defaultValue: { summary: 1 },
      },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default skeleton with pulse animation.
 */
export const Default: Story = {
  args: {
    width: 200,
    height: 100,
  },
};

/**
 * Rectangle skeleton with custom dimensions.
 */
export const Rectangle: Story = {
  args: {
    variant: 'rectangle',
    width: 300,
    height: 150,
  },
  parameters: {
    docs: {
      description: {
        story: 'Sharp corners, suitable for strict geometric layouts.',
      },
    },
  },
};

/**
 * Rounded skeleton for cards and containers.
 */
export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: 300,
    height: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'Rounded corners matching card and container designs.',
      },
    },
  },
};

/**
 * Circle skeleton for avatars and icons.
 */
export const Circle: Story = {
  args: {
    variant: 'circle',
    width: 80,
    height: 80,
  },
  parameters: {
    docs: {
      description: {
        story: 'Perfect for avatar and icon placeholders.',
      },
    },
  },
};

/**
 * Text line skeleton.
 */
export const TextLine: Story = {
  args: {
    variant: 'text',
    width: '100%',
  },
  parameters: {
    docs: {
      description: {
        story: 'Single line of text placeholder.',
      },
    },
  },
};

/**
 * Multiple text lines.
 */
export const TextLines: Story = {
  args: {
    variant: 'text',
    count: 4,
    width: '100%',
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple text lines with the last line shorter (80%).',
      },
    },
  },
};

/**
 * Wave animation instead of pulse.
 */
export const WaveAnimation: Story = {
  args: {
    animation: 'wave',
    width: 300,
    height: 200,
    variant: 'rounded',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shimmer wave animation effect.',
      },
    },
  },
};

/**
 * No animation for static placeholders.
 */
export const NoAnimation: Story = {
  args: {
    animation: false,
    width: 200,
    height: 100,
  },
  parameters: {
    docs: {
      description: {
        story: 'Static skeleton without animation.',
      },
    },
  },
};

/**
 * Card loading skeleton example.
 */
export const CardSkeleton: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <Skeleton variant="rounded" width="100%" height={200} />
      <div className="space-y-3">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example card loading state with image and text placeholders.',
      },
    },
  },
};

/**
 * User profile skeleton.
 */
export const ProfileSkeleton: Story = {
  render: () => (
    <div className="flex items-start gap-4">
      <Skeleton variant="circle" width={60} height={60} />
      <div className="flex-1 space-y-3">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" count={2} width="100%" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'User profile with avatar and bio loading state.',
      },
    },
  },
};

/**
 * List item skeletons.
 */
export const ListSkeleton: Story = {
  render: () => (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center gap-3">
          <Skeleton variant="circle" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="90%" />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple list items with avatar and text loading states.',
      },
    },
  },
};

/**
 * Article skeleton.
 */
export const ArticleSkeleton: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Skeleton variant="text" width="70%" height="2em" />
      <Skeleton variant="rounded" width="100%" height={300} />
      <div className="space-y-3 pt-4">
        <Skeleton variant="text" count={5} width="100%" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Article with title, featured image, and content loading state.',
      },
    },
  },
};

/**
 * Different sizes comparison.
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm mb-2 font-semibold">Small (40x40)</p>
        <Skeleton variant="circle" width={40} height={40} />
      </div>
      <div>
        <p className="text-sm mb-2 font-semibold">Medium (80x80)</p>
        <Skeleton variant="circle" width={80} height={80} />
      </div>
      <div>
        <p className="text-sm mb-2 font-semibold">Large (120x120)</p>
        <Skeleton variant="circle" width={120} height={120} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various skeleton sizes for different use cases.',
      },
    },
  },
};

/**
 * Responsive width using percentages.
 */
export const ResponsiveWidth: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton width="100%" height={100} variant="rounded" />
      <Skeleton width="75%" height={80} variant="rounded" />
      <Skeleton width="50%" height={60} variant="rounded" />
      <Skeleton width="25%" height={40} variant="rounded" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeletons with percentage-based widths for responsive layouts.',
      },
    },
  },
};

/**
 * Grid layout skeleton.
 */
export const GridSkeleton: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="space-y-2">
          <Skeleton variant="rounded" width="100%" height={120} />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="60%" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grid of product cards loading state.',
      },
    },
  },
};

/**
 * Table row skeletons.
 */
export const TableSkeleton: Story = {
  render: () => (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="flex gap-4 items-center">
          <Skeleton variant="circle" width={32} height={32} />
          <Skeleton variant="text" width="20%" />
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" width="15%" />
          <Skeleton variant="rounded" width={80} height={32} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table rows with mixed content types loading.',
      },
    },
  },
};
