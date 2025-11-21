import type { Meta, StoryObj } from '@storybook/react';
import { BiInfoCircle, BiHelpCircle } from 'react-icons/bi';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A tooltip component that displays contextual information on hover or focus. Supports four positioning options and automatically handles visibility states with smooth transitions.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <button className="px-4 py-2 bg-blue-600 text-white rounded">Hover me</button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default tooltip positioned at the top of the trigger element.',
      },
    },
  },
};

export const TopPosition: Story = {
  args: {
    content: 'Tooltip on top',
    position: 'top',
    children: <button className="px-4 py-2 bg-blue-600 text-white rounded">Top</button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip positioned above the trigger element.',
      },
    },
  },
};

export const BottomPosition: Story = {
  args: {
    content: 'Tooltip on bottom',
    position: 'bottom',
    children: <button className="px-4 py-2 bg-blue-600 text-white rounded">Bottom</button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip positioned below the trigger element.',
      },
    },
  },
};

export const LeftPosition: Story = {
  args: {
    content: 'Tooltip on left',
    position: 'left',
    children: <button className="px-4 py-2 bg-blue-600 text-white rounded">Left</button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip positioned to the left of the trigger element.',
      },
    },
  },
};

export const RightPosition: Story = {
  args: {
    content: 'Tooltip on right',
    position: 'right',
    children: <button className="px-4 py-2 bg-blue-600 text-white rounded">Right</button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip positioned to the right of the trigger element.',
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    content: 'This is a longer tooltip with more detailed information',
    children: <button className="px-4 py-2 bg-blue-600 text-white rounded">Hover me</button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with longer text content.',
      },
    },
  },
};

export const OnIcon: Story = {
  args: {
    content: 'Additional information',
    children: (
      <BiInfoCircle className="w-5 h-5 text-blue-600 cursor-help" />
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip attached to an information icon.',
      },
    },
  },
};

export const OnHelpIcon: Story = {
  args: {
    content: 'Click for help documentation',
    position: 'right',
    children: (
      <BiHelpCircle className="w-5 h-5 text-gray-500 cursor-help" />
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip on a help icon, commonly used in forms or UI elements.',
      },
    },
  },
};

export const OnText: Story = {
  args: {
    content: 'This is a helpful explanation',
    children: (
      <span className="underline decoration-dotted cursor-help">
        Hover for info
      </span>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip attached to text with dotted underline styling.',
      },
    },
  },
};

export const OnDisabledButton: Story = {
  args: {
    content: 'This feature is currently unavailable',
    children: (
      <button
        disabled
        className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
      >
        Disabled
      </button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip explaining why a button is disabled.',
      },
    },
  },
};

export const AllPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-16 p-16">
      <Tooltip content="Top tooltip" position="top">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Top</button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Right</button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Bottom</button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Left</button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all four tooltip positions.',
      },
    },
  },
};

export const FormFieldHelp: Story = {
  render: () => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium">
        Email Address
        <Tooltip content="We'll never share your email" position="right">
          <BiInfoCircle className="w-4 h-4 text-gray-400 cursor-help" />
        </Tooltip>
      </label>
      <input
        type="email"
        placeholder="you@example.com"
        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip used to provide help text for a form field.',
      },
    },
  },
};

export const InlineHelp: Story = {
  render: () => (
    <p className="text-sm max-w-md">
      This feature uses advanced{' '}
      <Tooltip content="Machine learning algorithms analyze patterns in data" position="top">
        <span className="text-blue-600 underline decoration-dotted cursor-help">
          AI technology
        </span>
      </Tooltip>{' '}
      to improve accuracy and performance over time.
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip providing inline contextual help within a paragraph.',
      },
    },
  },
};

export const ActionButtons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tooltip content="Edit item" position="bottom">
        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Delete item" position="bottom">
        <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </Tooltip>
      <Tooltip content="Share item" position="bottom">
        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips on icon-only action buttons to describe their function.',
      },
    },
  },
};

export const StatusIndicators: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Tooltip content="Server is running normally" position="right">
          <div className="w-3 h-3 bg-green-500 rounded-full cursor-help" />
        </Tooltip>
        <span className="text-sm">Production Server</span>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip content="Server is under maintenance" position="right">
          <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-help" />
        </Tooltip>
        <span className="text-sm">Staging Server</span>
      </div>
      <div className="flex items-center gap-2">
        <Tooltip content="Server is offline" position="right">
          <div className="w-3 h-3 bg-red-500 rounded-full cursor-help" />
        </Tooltip>
        <span className="text-sm">Development Server</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips providing detailed status information for status indicators.',
      },
    },
  },
};

export const ComplexContent: Story = {
  args: {
    content: (
      <div>
        <strong>Pro Tip:</strong> Use keyboard shortcuts for faster navigation
      </div>
    ),
    children: <button className="px-4 py-2 bg-blue-600 text-white rounded">Tips</button>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip with complex JSX content including formatting.',
      },
    },
  },
};
