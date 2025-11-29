import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A skeleton loading placeholder component that displays during content loading states. Supports multiple shapes, animations, and flexible sizing.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['rectangle', 'rounded', 'circle', 'text'],
      description: 'The visual variant of the skeleton',
      table: { defaultValue: { summary: 'rectangle' } },
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none', false],
      description: 'The animation type',
      table: { defaultValue: { summary: 'pulse' } },
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
      table: { defaultValue: { summary: '1' } },
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 200,
    height: 100,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex items-start gap-8">
      <div className="flex flex-col items-center gap-2">
        <Skeleton variant="rectangle" width={100} height={80} />
        <span className="text-xs text-gray-500">Rectangle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Skeleton variant="rounded" width={100} height={80} />
        <span className="text-xs text-gray-500">Rounded</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Skeleton variant="circle" width={80} height={80} />
        <span className="text-xs text-gray-500">Circle</span>
      </div>
      <div className="flex flex-col gap-2 w-32">
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
        <span className="text-xs text-gray-500">Text</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available skeleton variants.',
      },
    },
  },
};

export const Animations: Story = {
  render: () => (
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-2">
        <Skeleton animation="pulse" width={120} height={80} variant="rounded" />
        <span className="text-xs text-gray-500">Pulse</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Skeleton animation="wave" width={120} height={80} variant="rounded" />
        <span className="text-xs text-gray-500">Wave</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Skeleton animation={false} width={120} height={80} variant="rounded" />
        <span className="text-xs text-gray-500">None</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Animation styles: pulse (default), wave shimmer, or no animation.',
      },
    },
  },
};

export const TextLines: Story = {
  render: () => (
    <div className="w-80">
      <Skeleton variant="text" count={4} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple text lines with the last line automatically shorter (80%).',
      },
    },
  },
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-72 space-y-3">
      <Skeleton variant="rounded" width="100%" height={160} />
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" count={2} />
      <div className="flex gap-2 pt-2">
        <Skeleton variant="rounded" width={80} height={32} />
        <Skeleton variant="rounded" width={80} height={32} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card loading skeleton with image, title, description, and action buttons.',
      },
    },
  },
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div className="flex gap-4 w-80">
      <Skeleton variant="circle" width={64} height={64} />
      <div className="flex-1 space-y-2 py-1">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'User profile skeleton with avatar and text.',
      },
    },
  },
};

export const ListSkeleton: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton variant="circle" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="text" width="80%" />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'List items skeleton with avatars.',
      },
    },
  },
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="w-[500px] space-y-3">
      {/* Header */}
      <div className="flex gap-4 pb-2 border-b border-gray-200">
        <Skeleton variant="text" width="25%" />
        <Skeleton variant="text" width="35%" />
        <Skeleton variant="text" width="20%" />
        <Skeleton variant="text" width="20%" />
      </div>
      {/* Rows */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="w-[25%] flex items-center gap-2">
            <Skeleton variant="circle" width={28} height={28} />
            <Skeleton variant="text" width="60%" />
          </div>
          <Skeleton variant="text" width="35%" />
          <Skeleton variant="text" width="20%" />
          <Skeleton variant="rounded" width={70} height={28} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Table skeleton with header and rows.',
      },
    },
  },
};

export const GridSkeleton: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-[450px]">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton variant="rounded" width="100%" height={100} />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="60%" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Product grid skeleton.',
      },
    },
  },
};

export const ArticleSkeleton: Story = {
  render: () => (
    <div className="w-[500px] space-y-4">
      <Skeleton variant="text" width="70%" height={32} />
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" width={40} height={40} />
        <div className="space-y-1">
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={80} />
        </div>
      </div>
      <Skeleton variant="rounded" width="100%" height={250} />
      <Skeleton variant="text" count={5} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Article page skeleton with title, author, image, and content.',
      },
    },
  },
};
